import { Request, Response, NextFunction } from 'express';
import { Repository } from 'typeorm';

import AppDataSource from '../data-source';
import { Sample} from '../models';

// @route GET /sample
// @desc Get all Sample
// @body none
// @access Public

export const getAllSample = async (_req: Request, res: Response, next: NextFunction) => {
   try {
      const sampleRepository: Repository<Sample> = AppDataSource?.getRepository(Sample);

      const sample: Sample[] = await sampleRepository.find();

      return res.status(200).json({
         message: 'Data fetched successfully',
         sample: sample,
      });
   } catch (err) {
      next(err);
   }
};

// @route POST /sample
// @desc Create new Sample
// @body sample
// @access Public

export const createNewSample = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const sampleRepository: Repository<Sample> = AppDataSource?.getRepository(Sample);
      
      const sample: string = req.body.sample;

      const newSample: Sample = sampleRepository.create({
         sample: sample,
      });

      const result = await sampleRepository.save(newSample);

      return res.status(201).json({
         message: 'Data Create successfully',
         sample: result,
      });
   } catch (err) {
      next(err);
   }
};


