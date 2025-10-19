import { Router } from 'express';
import { getAllCompaniesHandler, createCompanyHandler } from '../../controllers/company.controller';
import { validate } from '../../middleware/validateResource';
import { createCompanySchema } from '../../validations/company.schema';

const router = Router();

router.get('/', getAllCompaniesHandler);
router.post('/', validate(createCompanySchema), createCompanyHandler);
export default router;
