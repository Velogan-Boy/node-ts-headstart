import z, { TypeOf } from 'zod';

export const createSampleSchema = z.object({
   body: z.object({
      sample: z.string({
         required_error: 'Sample is required',
      }),
   }),
});

export const getSampleSchema = z.object({
   params: z.object({
      id: z.string(),
   }),
});

export const updateSampleSchema = z.object({
   params: z.object({
      id: z.string(),
   }),
   body: z.object({
      sample: z.string(),
   }),
});

export const deleteSampleSchema = z.object({
   params: z.object({
      id: z.string(),
   }),
});

export type CreateSampleInput = TypeOf<typeof createSampleSchema>['body'];

export type GetSampleInput = TypeOf<typeof getSampleSchema>['params'];

export type UpdateSampleInput = TypeOf<typeof updateSampleSchema>;

export type DeleteSampleInput = TypeOf<typeof deleteSampleSchema>['params'];

