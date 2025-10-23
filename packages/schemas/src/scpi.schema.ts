import { z } from "zod";
import { baseCompanySchema, baseScpiSchema } from "./base.schema.js";

export const scpiSchema = baseScpiSchema;

export const scpiResponseSchema = baseScpiSchema.extend({
  managementCompany: baseCompanySchema,
});

const params = z.object({
  id: z
    .string({ required_error: "ID is required" })
    .cuid("Invalid CUID format for ID"),
});

const body = z.object({
  name: z.string({ required_error: "Name is required" }).min(3),
  type: z.string({ required_error: "Type is required" }),
  managementCompanyId: z
    .string({ required_error: "managementCompanyId is required" })
    .cuid(),
  capitalization: z.number().optional(),
  distributionRate: z.number().optional(),
  subscriptionMinimum: z.number().int().optional(),
  partPrice: z.number().optional(),
  associateCount: z.number().int().optional(),
  partCount: z.number().int().optional(),
  buildingCount: z.number().int().optional(),
  tenantCount: z.number().int().optional(),
  occupancyRate: z.number().optional(),
});

export const createScpiSchema = z.object({ body });
export const updateScpiSchema = z.object({ body: body.partial(), params });
export const scpiParamsSchema = z.object({ params });

export type SCPIResponse = z.infer<typeof scpiResponseSchema>;
export type CreateScpiInput = z.infer<typeof createScpiSchema>["body"];
export type UpdateScpiInput = z.infer<typeof updateScpiSchema>["body"];
export type ScpiParams = z.infer<typeof scpiParamsSchema>["params"];
