import { z } from "zod";

// Schema for URL parameters containing a CUID
const params = z.object({
  id: z
    .string({ required_error: "ID is required" })
    .cuid("Invalid CUID format for ID"),
});
export const createCompanySchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }).min(3),
    description: z.string().optional(),
    logoUrl: z.string().url().optional(),
    address: z.string().optional(),
    totalAssetsUnderManagement: z.number().optional(),
    fundCount: z.number().int().optional(),
    majorityShareholder: z.string().optional(),
  }),
});

export const updateCompanySchema = z.object({
  body: createCompanySchema.shape.body.partial(),
  params,
});
export const companyParamsSchema = z.object({
  params,
});

export type CreateCompanyInput = z.infer<typeof createCompanySchema>["body"];
export type UpdateCompanyInput = z.infer<typeof updateCompanySchema>["body"];
export type CompanyParams = z.infer<typeof companyParamsSchema>["params"];
