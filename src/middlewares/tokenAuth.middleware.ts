import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { Sample } from '../models';
import AppDataSource from '../data-source';
import { verifyJWT } from '../services/jwtAuth';

interface MyRequest extends Request {
   sample: Sample;
}

export const tokenAuth = async (req: MyRequest, res: Response, next: NextFunction) => {
   try {
      const token: string = req.headers['authorization'];

      if (!token) return res.status(400).send({ auth: false, message: 'Bad Request' });

      let tokenPayload: JwtPayload | string = verifyJWT(token);

      if (!tokenPayload) {
         return res.status(400).send({
            auth: false,
            message: 'Invalid token.',
         });
      }

      const sampleRepository: Repository<Sample> = AppDataSource?.getRepository(Sample);

      const sample = await sampleRepository.findOne({
         where: {
            id: +tokenPayload,
         },
      });

      if (!sample) {
         return res.status(401).json({
            auth: false,
            message: 'Sample Not found',
         });
      }

      req.sample = sample;
      next();
   } catch (err) {
      next(err);
   }
};

