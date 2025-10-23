import { z } from "zod";

export const baseUserSchema = z.object({
  id: z.string().cuid(),
  name: z.string().nullable(),
  email: z.string().email().nullable(),
  role: z.enum(["USER", "ADMIN"]),
});

export const baseCompanySchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  description: z.string().nullable(),
  logoUrl: z.string().url().nullable(),
  address: z.string().nullable(),
  totalAssetsUnderManagement: z.number().nullable(),
  fundCount: z.number().int().nullable(),
  majorityShareholder: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const baseScpiSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  type: z.string(),
  capitalization: z.number().nullable(),
  distributionRate: z.number().nullable(),
  subscriptionMinimum: z.number().int().nullable(),
  partPrice: z.number().nullable(),
  associateCount: z.number().int().nullable(),
  partCount: z.number().int().nullable(),
  buildingCount: z.number().int().nullable(),
  tenantCount: z.number().int().nullable(),
  occupancyRate: z.number().nullable(),
  managementCompanyId: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
