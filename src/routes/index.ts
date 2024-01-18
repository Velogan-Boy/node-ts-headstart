import express, { Request, Response } from 'express';

import V1Router from '@/routes/v1';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
   res.send('<h1>You hit API route</h1>');
});

router.use('/v1', V1Router);

export default router;
