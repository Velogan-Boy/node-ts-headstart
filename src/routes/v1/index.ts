import express, { Router, Request, Response } from 'express';

import SampleRouter from './sample.routes'

const router: Router = express.Router();

router.get("/", (_req: Request,res: Response) => {
      res.send("<h1>You hit V1 route</h1>")
})

router.use('/sample', SampleRouter);

export default router;
