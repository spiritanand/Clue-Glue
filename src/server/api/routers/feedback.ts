import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { feedbacks } from "~/server/db/schema";
import { desc, eq } from "drizzle-orm";
import { createFeedbackSchema } from "~/lib/zodSchemas";

export const feedbackRouter = createTRPCRouter({
  getAllByBoardId: publicProcedure
    .input(z.object({ boardId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.feedbacks.findMany({
        where: eq(feedbacks.boardId, input.boardId),
        orderBy: [desc(feedbacks.createdAt)],
      });
    }),
  create: protectedProcedure
    .input(
      z.intersection(
        z.object({
          boardId: z.string(),
        }),
        createFeedbackSchema,
      ),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(feedbacks).values({
        title: input.title,
        description: input.description,
        boardId: input.boardId,
        userId: ctx.session.user.id,
        upvotes: [ctx.session.user.id],
      });
    }),
  toggleUpvote: protectedProcedure
    .input(z.object({ feedbackId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const feedback = await ctx.db.query.feedbacks.findFirst({
        where: eq(feedbacks.id, input.feedbackId),
      });

      if (!feedback) throw new Error("Feedback not found");

      const upvotes = feedback.upvotes.includes(ctx.session.user.id)
        ? feedback.upvotes.filter((id) => id !== ctx.session.user.id)
        : [...feedback.upvotes, ctx.session.user.id];

      await ctx.db
        .update(feedbacks)
        .set({
          upvotes,
        })
        .where(eq(feedbacks.id, input.feedbackId));
    }),
});
