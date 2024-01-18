import { Request, Response, NextFunction } from 'express';

import { findAllSamples, createNewSample, updateSampleUsingPrevSample, deleteSampleBySampleObj, findSampleById } from '@/services/sample.services';

import { catchAsync } from '@/utils/catchAsync';
import { CreateSampleInput, DeleteSampleInput, GetSampleInput, UpdateSampleInput } from '@/validators';
import { AppError } from '@/utils';

// @route GET /sample
// @desc Get all Sample
// @body none
// @access Public

export const getAllSample = catchAsync(async (_req: Request, res: Response) => {
   const samples = await findAllSamples();

   return res.status(200).json({
      status: 'success',
      message: 'Data fetched successfully',
      data: {
         result: samples.length,
         samples,
      },
   });
});

// @route GET /sample/:id
// @desc Get Sample By Id
// @body none
// @access Public

export const getSample = catchAsync(async (req: Request<GetSampleInput>, res: Response) => {
   const sample = await findSampleById(+req.params.id);

   return res.status(200).json({
      message: 'Data fetched successfully',
      data: {
         sample,
      },
   });
});

// @route POST /sample
// @desc Create new Sample
// @body sample
// @access Public

export const createSample = catchAsync(async (req: Request<{}, {}, CreateSampleInput>, res: Response) => {
   const newSample = await createNewSample(req.body);

   return res.status(201).json({
      message: 'Sample created successfully',
      data: {
         sample: newSample,
      },
   });
});

// @route PATCH /sample/:id
// @desc Update a Sample using id
// @body sample
// @params id

export const updateSample = catchAsync(async (req: Request<UpdateSampleInput['params'], {}, UpdateSampleInput['body']>, res: Response) => {
   const sampleToUpdate = await findSampleById(+req.params.id);

   if (!sampleToUpdate) {
      throw new AppError(404, 'Sample with that ID not found');
   }

   const updatedSample = await updateSampleUsingPrevSample(sampleToUpdate, req.body);

   return res.status(200).json({
      message: 'Sample updated successfully',
      data: {
         sample: updatedSample,
      },
   });
});

// @route DELETE /sample/:id
// @desc Delete a Sample using id
// @body none
// @params id

export const deleteSample = catchAsync(async (req: Request<DeleteSampleInput>, res: Response, next: NextFunction) => {
   const sampleToDelete = await findSampleById(+req.params.id);

   if (!sampleToDelete) {
      throw new AppError(404, 'Sample with that ID not found');
   }

   const deletedSample = await deleteSampleBySampleObj(sampleToDelete);

   return res.status(200).json({
      message: 'Sample deleted successfully',
      data: { sample: deletedSample },
   });
});

