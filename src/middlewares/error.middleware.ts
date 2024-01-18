import { AppError } from '@/utils';

import { NextFunction, Request, Response } from 'express';

export const errorHandler = (error: AppError, _req: Request, res: Response, _next: NextFunction) => {
   error.status = error.status || 'error';
   error.statusCode = error.statusCode || 500;

   console.error(error.message);
   console.error(process.env.NODE_ENV === 'development' ? error.stack : '');

   res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
   });
};

