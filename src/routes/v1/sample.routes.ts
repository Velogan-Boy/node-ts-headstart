import express from 'express';

import { createSample, getSample, getAllSample, updateSample, deleteSample } from '@/controllers/sample.controllers';

import { createSampleSchema, getSampleSchema, updateSampleSchema, deleteSampleSchema, validate } from '@/validators';

const router = express.Router();

router.get('/', getAllSample);
router.get('/:id', validate(getSampleSchema), getSample);
router.post('/', validate(createSampleSchema), createSample);
router.patch('/:id', validate(updateSampleSchema), updateSample);
router.delete('/:id', validate(deleteSampleSchema), deleteSample);

export default router;

