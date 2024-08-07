import { type DefaultSession, getServerSession, type NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import { env } from "~/env";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { accounts, sessions, users, verificationTokens } from "~/server/db/schema";
import { db } from "~/server/db";
import { type Adapter } from "next-auth/adapters";
import { and, eq } from "drizzle-orm";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      // add custom session properties here
      id: string;
    } & DefaultSession["user"];
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session }) => {
      if (!session.user || !session.user.email || !session.user.name) {
        return session;
      }

      const user = await db
        .select()
        .from(users)
        .where(
          and(
            eq(users.email, session.user.email),
            eq(users.name, session.user.name),
          ),
        );

      if (!user[0]?.id) return session;

      session.user.id = user[0]?.id;

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  theme: {
    brandColor: "#FACC14",
    colorScheme: "light",
    logo: "/logo.svg",
  },
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }) as Adapter,
  providers: [
    Google({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
