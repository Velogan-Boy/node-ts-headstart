import { ValidationError, validationResult } from 'express-validator';

import { Request, Response, NextFunction } from 'express';

interface ExtractedError {
   [param: string]: string;
}

export const validate = (req: Request, res: Response, next: NextFunction) => {
   const errors = validationResult(req);

   if (errors.isEmpty()) {
      return next();
   }

   const extractedErrors: ExtractedError[] = [];

   errors.array().map((err: ValidationError) => extractedErrors.push(err.msg));

   return res.status(400).send({
      message: 'Bad Request',
      errors: extractedErrors,
   });
};

export * from './sample.validator';

