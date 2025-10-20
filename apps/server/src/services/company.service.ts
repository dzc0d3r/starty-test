import { prisma } from "db/client";
import { AppError } from "../utils/AppError.js";
import { CreateCompanyInput } from "../validations/company.schema.js"; // We will create this soon

export const getAllCompanies = async () => {
  return await prisma.managementCompany.findMany();
};

export const createCompany = async (input: CreateCompanyInput) => {
  const existingCompany = await prisma.managementCompany.findUnique({
    where: { name: input.name },
  });

  if (existingCompany) {
    throw new AppError(
      409,
      "A management company with this name already exists.",
    );
  }

  return await prisma.managementCompany.create({
    data: input,
  });
};
