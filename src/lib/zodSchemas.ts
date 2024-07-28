import { z } from "zod";
import { postTypeOptions } from "~/lib/constants";

export const createCompanySchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  website: z.union([z.string().url(), z.string().max(0)]), // allow empty string or a valid URL
});

export const createPostSchema = z.object({
  title: z.string().min(3, {
    message: "Must be at least 3 characters.",
  }),
  content: z.string().min(3, {
    message: "Must be at least 3 characters.",
  }),
  tag: z.enum(postTypeOptions),
});

export const createFeedbackSchema = z.object({
  title: z.string().min(3, {
    message: "Must be at least 3 characters.",
  }),
  description: z.string().min(3, {
    message: "Must be at least 3 characters.",
  }),
});
