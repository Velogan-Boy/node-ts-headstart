import AppDataSource from '@/data-source';

import { Sample } from '@/models';

export const sampleRepository = AppDataSource.getRepository(Sample);

export const findAllSamples = async () => {
   return await sampleRepository.find();
};

export const findSampleById = async (id: number) => {
   return await sampleRepository.findOneBy({ id });
};

export const createNewSample = async (data: Partial<Sample>) => {
   const sample = new Sample();
   sample.sample = data.sample;
   return await sampleRepository.save(sample);
};

export const updateSampleUsingPrevSample = async (prev: Sample, data: Partial<Sample>) => {
   prev.sample = data.sample || prev.sample;
   return await sampleRepository.save(prev);
};

export const deleteSampleBySampleObj = async (SampleToDelete: Sample) => {
   return await sampleRepository.remove(SampleToDelete);
};

