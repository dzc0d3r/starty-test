import { prisma } from "db/client";
import { CreateScpiInput, UpdateScpiInput } from "schemas";
import { AppError } from "../utils/AppError.js";

const includeCompany = {
  managementCompany: true,
};

export const getAllScpis = async () => {
  return await prisma.sCPI.findMany({ include: includeCompany });
};

export const getScpiById = async (id: string) => {
  const scpi = await prisma.sCPI.findUnique({
    where: { id },
    include: includeCompany,
  });
  if (!scpi) {
    throw new AppError(404, "SCPI not found");
  }
  return scpi;
};

export const createScpi = async (input: CreateScpiInput) => {
  const company = await prisma.managementCompany.findUnique({
    where: { id: input.managementCompanyId },
  });
  if (!company) {
    throw new AppError(
      400,
      "Invalid managementCompanyId: Company does not exist.",
    );
  }

  return await prisma.sCPI.create({ data: input, include: includeCompany });
};

export const updateScpi = async (id: string, input: UpdateScpiInput) => {
  await getScpiById(id);
  if (input.managementCompanyId) {
    const company = await prisma.managementCompany.findUnique({
      where: { id: input.managementCompanyId },
    });
    if (!company) {
      throw new AppError(
        400,
        "Invalid managementCompanyId: Company does not exist.",
      );
    }
  }

  return await prisma.sCPI.update({
    where: { id },
    data: input,
    include: includeCompany,
  });
};

export const deleteScpi = async (id: string) => {
  await getScpiById(id);
  await prisma.sCPI.delete({ where: { id } });
  return;
};
