import { NextFunction, Request, Response } from "express";
import * as ScpiService from "../services/scpi.service.js";
import {
  CreateScpiInput,
  ScpiParams,
  UpdateScpiInput,
} from "../validations/scpi.schema.js";

export const getAllScpisHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const scpis = await ScpiService.getAllScpis();
    res.status(200).json(scpis);
  } catch (error) {
    next(error);
  }
};

export const getScpiHandler = async (
  req: Request<ScpiParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const scpi = await ScpiService.getScpiById(req.params.id);
    res.status(200).json(scpi);
  } catch (error) {
    next(error);
  }
};

export const createScpiHandler = async (
  req: Request<{}, {}, CreateScpiInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const scpi = await ScpiService.createScpi(req.body);
    res.status(201).json(scpi);
  } catch (error) {
    next(error);
  }
};

export const updateScpiHandler = async (
  req: Request<ScpiParams, {}, UpdateScpiInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const scpi = await ScpiService.updateScpi(req.params.id, req.body);
    res.status(200).json(scpi);
  } catch (error) {
    next(error);
  }
};

export const deleteScpiHandler = async (
  req: Request<ScpiParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    await ScpiService.deleteScpi(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
