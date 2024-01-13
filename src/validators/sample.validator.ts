import { Request, Response, NextFunction } from 'express';
const { body } = require('express-validator');

export const createSampleValidator = async (req: Request, res: Response, next: NextFunction) => {
   await body('sample').notEmpty().withMessage('Sample is not defined in body').trim().run(req);

   next();
};

