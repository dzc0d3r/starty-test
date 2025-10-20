import { z } from "zod";

export const createCompanySchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }).min(3),
    description: z.string().optional(),
    logoUrl: z.string().url().optional(),
  }),
});

// Generate a TypeScript type from the schema
export type CreateCompanyInput = z.infer<typeof createCompanySchema>["body"];
