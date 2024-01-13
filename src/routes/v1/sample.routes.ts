import express, { Router } from 'express';

import { getAllSample, createNewSample } from '../../controllers/sample.controllers';
import { tokenAuth } from '../../middlewares';
import { createSampleValidator, validate } from '../../validators';

const router: Router = express.Router();

router.get('/', getAllSample);
router.post('/', tokenAuth, createSampleValidator, validate, createNewSample);

export default router;

