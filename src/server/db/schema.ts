import { relations, sql } from "drizzle-orm";
import {
  index, integer, json, pgTableCreator, primaryKey, text, timestamp, varchar
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";
import { nanoid } from "nanoid";
import { feedbackStatus, feedbackStatusOptions, postType, postTypeOptions } from "~/lib/constants";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `clue_glue_${name}`);

// Users
export const users = createTable("user", {
  id: text("id")
    .$defaultFn(() => nanoid())
    .primaryKey()
    .notNull(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: timestamp("email_verified", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = createTable(
  "account",
  {
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_user_id_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("session_token", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_user_id_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const verificationTokens = createTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

// TODO: Add Logo
// Company
export const companies = createTable("company", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => nanoid()),
  adminId: text("admin_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").unique().notNull(),
  website: text("website"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
export type SelectCompany = typeof companies.$inferSelect;

// Boards (Public Boards that users can post feedback to)
export const boards = createTable("board", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => nanoid()),
  companyId: text("company_id")
    .notNull()
    .references(() => companies.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
export type SelectBoard = typeof boards.$inferSelect;

// Posts (announcements)
export const posts = createTable("post", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => nanoid()),
  title: text("title").notNull(),
  content: text("content").notNull(),
  tags: text("tags", { enum: postTypeOptions }).default(postType.NEW).notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  companyId: text("company_id")
    .notNull()
    .references(() => companies.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  }).$onUpdate(() => new Date()),
});

// Feedback (User issues/feedback posted on boards)
export const feedbacks = createTable("feedback", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => nanoid()),
  boardId: text("board_id")
    .notNull()
    .references(() => boards.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  status: text("status", { enum: feedbackStatusOptions })
    .default(feedbackStatus.REVIEW)
    .notNull(),
  upvotes: json("upvotes").$type<string[]>().default([]).notNull(), // holds all the users who have upvoted this feedback
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  }).$onUpdate(() => new Date()),
});
export type SelectFeedback = typeof feedbacks.$inferSelect;

// Relations

// Admin to Company
export const companiesRelations = relations(companies, ({ one }) => ({
  admin: one(users, {
    fields: [companies.adminId],
    references: [users.id],
  }),
}));

// Board to Company
export const boardsRelations = relations(boards, ({ one }) => ({
  company: one(companies, {
    fields: [boards.companyId],
    references: [companies.id],
  }),
}));

// Feedback to (Board + User)
export const feedbacksRelations = relations(feedbacks, ({ one }) => ({
  board: one(boards, {
    fields: [feedbacks.boardId],
    references: [boards.id],
  }),
  user: one(users, {
    fields: [feedbacks.userId],
    references: [users.id],
  }),
}));

// Post to (User + Company)
export const postsRelations = relations(posts, ({ one }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
  company: one(companies, {
    fields: [posts.companyId],
    references: [companies.id],
  }),
}));
