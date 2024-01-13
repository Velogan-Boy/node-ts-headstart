import { NextFunction, Request, Response } from 'express';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
   console.error(err.message);
   console.error(process.env.NODE_ENV === 'development' ? err.stack : "");

   res.status(500).json({
      message: 'Internal Server Error',
   });
};

