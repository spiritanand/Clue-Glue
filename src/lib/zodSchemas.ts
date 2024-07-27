import { z } from "zod";

export const createCompanySchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  website: z.union([z.string().url(), z.string().max(0)]), // allow empty string or a valid URL
});
