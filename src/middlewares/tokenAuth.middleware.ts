import { Request, Response, NextFunction } from 'express';

import { catchAsync, AppError, verifyJWT } from '@/utils';

import { findSampleById } from '@/services';

export const tokenAuth = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   const token = req.headers['authorization'];

   // check if the token exists
   if (!token) return next(new AppError(401, 'You are not logged in'));

   // decrypt token and get the payload
   let tokenPayload = verifyJWT(token);

   if (!tokenPayload) {
      return next(new AppError(401, `Invalid token or user doesn't exist`));
   }

   // check if the sample exists
   const sample = await findSampleById(+tokenPayload);

   if (!sample) return next(new AppError(401, `Invalid token or session has expired`));

   res.locals.sample = sample;

   next();
});

