import { NextFunction, Request, Response } from "express";
import { CompanyParams, CreateCompanyInput, UpdateCompanyInput } from "schemas";
import * as CompanyService from "../services/company.service.js";

/*
 *  GET ('/companies')
 * */
export const getAllCompaniesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const companies = await CompanyService.getAllCompanies();
    res.status(200).json(companies);
  } catch (error) {
    next(error);
  }
};

/**
 *   POST ("/companies")
 * */
export const createCompanyHandler = async (
  req: Request<{}, {}, CreateCompanyInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newCompany = await CompanyService.createCompany(req.body);
    res.status(201).json(newCompany);
  } catch (error) {
    next(error);
  }
};

export const getCompanyHandler = async (
  req: Request<CompanyParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const company = await CompanyService.getCompanyById(req.params.id);
    res.status(200).json(company);
  } catch (error) {
    next(error);
  }
};

export const updateCompanyHandler = async (
  req: Request<CompanyParams, {}, UpdateCompanyInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const updatedCompany = await CompanyService.updateCompany(
      req.params.id,
      req.body,
    );
    res.status(200).json(updatedCompany);
  } catch (error) {
    next(error);
  }
};

export const deleteCompanyHandler = async (
  req: Request<CompanyParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    await CompanyService.deleteCompany(req.params.id);
    res.status(204).send(); // Send 204 No Content
  } catch (error) {
    next(error);
  }
};
