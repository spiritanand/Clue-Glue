import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { feedbacks } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { createFeedbackSchema } from "~/lib/zodSchemas";

export const feedbackRouter = createTRPCRouter({
  getAllByBoardId: publicProcedure
    .input(z.object({ boardId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.feedbacks.findMany({
        where: eq(feedbacks.boardId, input.boardId),
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
});
