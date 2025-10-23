import { prisma } from "db/client";
import { AppError } from "../utils/AppError.js";
import {
  CreateCompanyInput,
  UpdateCompanyInput,
} from "../validations/company.schema.js";

const includeScpis = {
  scpis: true,
};

export const getAllCompanies = async () => {
  return await prisma.managementCompany.findMany({ include: includeScpis });
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

export const getCompanyById = async (id: string) => {
  const company = await prisma.managementCompany.findUnique({
    where: { id },
    include: includeScpis,
  });

  if (!company) {
    throw new AppError(404, "Company not found");
  }

  return company;
};

export const updateCompany = async (id: string, input: UpdateCompanyInput) => {
  const company = await getCompanyById(id);

  // if the name is being changed, ensure it's not a duplicate.
  if (input.name && input.name !== company.name) {
    const existing = await prisma.managementCompany.findFirst({
      where: { name: input.name, NOT: { id } },
    });
    if (existing) {
      throw new AppError(409, "Another company with this name already exists.");
    }
  }

  const updatedCompany = await prisma.managementCompany.update({
    where: { id },
    data: input,
  });

  return updatedCompany;
};

export const deleteCompany = async (id: string) => {
  await getCompanyById(id);

  await prisma.managementCompany.delete({
    where: { id },
  });

  return;
};
