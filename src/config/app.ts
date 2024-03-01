import bodyParser from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'express-validation';
import helmet from 'helmet';
import morgan from 'morgan';
import router from '../../src/index.route';
import config from './config';

import cors from 'cors';
import { MyCustomError } from '../interfaces/index';

const app = express();

const allowList = config.CORS.split(',');

app.use(helmet());

app.use(
  cors((req: Request, cb) => {
    let corsOptions: null | Record<string, boolean>;
    if (allowList.indexOf('*') !== -1) {
      corsOptions = { origin: true };
    } else if (allowList.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true };
    } else {
      corsOptions = { origin: false };
    }
    cb(null, corsOptions);
  })
);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

if (config.NODE_ENV === 'local' || config.NODE_ENV === 'develop') {
  app.use(morgan('dev'));
}

app.use('/api', router);

// Catch-all route
app.use((req: Request, res: Response, next: NextFunction) => {
  return next(new MyCustomError('API not found', 404));
});

// Handle error
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ValidationError) {
    const newError = new MyCustomError(err.message, 400);
    return next(newError);
  }
  if (err.name !== 'MyCustomError') {
    return next(new MyCustomError(err.message, 500));
  }
  return next(err);
});

app.use(
  (err: MyCustomError, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    return res.status(err.status).json({
      name: err.name,
      message: err.message,
      status: err.status,
      stack:
        config.NODE_ENV === 'develop' || config.NODE_ENV === 'local'
          ? err?.stack
          : undefined,
    });
  }
);

export default app;
