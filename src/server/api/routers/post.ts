import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { posts } from "~/server/db/schema";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";

export const postRouter = createTRPCRouter({
  getAllByCompanyId: publicProcedure
    .input(z.object({ companyId: z.string() }))
    .query(({ input }) => {
      return db.query.posts.findMany({
        where: eq(posts.companyId, input.companyId),
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(posts).values({
        title: input.name,
        content: "This is a post",
        companyId: "company_id",
        userId: ctx.session.user.id,
      });
    }),
});
