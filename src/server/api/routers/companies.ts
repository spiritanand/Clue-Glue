import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { boards, companies } from "~/server/db/schema";
import { createCompanySchema } from "~/lib/zodSchemas";
import { eq } from "drizzle-orm";

export const companyRouter = createTRPCRouter({
  getMyCompany: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.query.companies.findFirst({
      where: eq(companies.adminId, ctx.session.user.id),
    });
  }),
  create: protectedProcedure
    .input(createCompanySchema)
    .mutation(async ({ ctx, input }) => {
      const id = await ctx.db
        .insert(companies)
        .values({
          name: input.name,
          website: input.website,
          adminId: ctx.session.user.id,
        })
        .returning({ insertedId: companies.id });

      if (!id[0]) throw new Error("Failed to create company");

      await ctx.db.insert(boards).values({
        companyId: id[0].insertedId,
        name: "Feature Requests",
        description: "Post your feature requests here!",
      });
    }),
});
