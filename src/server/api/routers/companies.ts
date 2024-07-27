import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { companies } from "~/server/db/schema";
import { createCompanySchema } from "~/lib/zodSchemas";

export const companyRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createCompanySchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(companies).values({
        name: input.name,
        website: input.website,
        adminId: ctx.session.user.id,
      });
    }),
});
