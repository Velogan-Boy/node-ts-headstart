require('dotenv-flow').config();
import express, { Request, Response, NextFunction } from 'express';
import './paths';

import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import AppDataSource from '@/data-source';
import APIRouter from '@/routes';
import { errorHandler } from '@/middlewares';
import { validateEnv, AppError } from '@/utils';

// VALIDATE ENV
validateEnv();

AppDataSource.initialize()
   .then(() => {
      console.log('✅ Database connected successfully !');

      const App = express();

      // MIDDLEWARES
      App.use(express.json());
      App.use(express.urlencoded({ extended: true }));
      App.use(cors());
      App.use(helmet());
      if (process.env.NODE_ENV === 'development') App.use(morgan('dev'));

      // ROUTE
      App.use('/api', APIRouter);

      // HEALTH CHECK
      App.get('/', (_req: Request, res: Response) => {
         res.send('<h1>Vanakkam da Maple!</h1>');
      });

      // UNHANDLED ROUTE
      App.all('*', (req: Request, _res: Response, next: NextFunction) => {
         next(new AppError(404, `Route ${req.originalUrl} not found`));
      });

      // GLOBAL ERROR HANDLER
      App.use(errorHandler); // Should be last middleware

      const port = +process.env.PORT || 8000;

      App.listen(port, () => {
         console.log(`✅ Server listing on port ${port}`);
      });
   })
   .catch((err) => {
      console.error('❌ Database connection failed', err);
   });

