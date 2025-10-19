import { Request, Response, NextFunction } from 'express';
import * as CompanyService from '../services/company.service';
import { CreateCompanyInput } from '../validations/company.schema';


/*
 *  GET ('/companies')
 * */
export const getAllCompaniesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
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
  next: NextFunction
) => {
  try {
    const newCompany = await CompanyService.createCompany(req.body);
    res.status(201).json(newCompany);
  } catch (error) {
    next(error);
  }
};
