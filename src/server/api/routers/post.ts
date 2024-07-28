import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { posts } from "~/server/db/schema";
import { db } from "~/server/db";
import { desc, eq } from "drizzle-orm";
import { createPostSchema } from "~/lib/zodSchemas";

export const postRouter = createTRPCRouter({
  getAllByCompanyId: publicProcedure
    .input(z.object({ companyId: z.string() }))
    .query(({ input }) => {
      return db.query.posts.findMany({
        where: eq(posts.companyId, input.companyId),
        orderBy: [desc(posts.createdAt)],
        with: {
          user: true,
        },
      });
    }),
  create: protectedProcedure
    .input(
      z.intersection(createPostSchema, z.object({ companyId: z.string() })),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(posts).values({
        title: input.title,
        content: input.content,
        tags: input.tag,
        companyId: input.companyId,
        userId: ctx.session.user.id,
      });
    }),
});
