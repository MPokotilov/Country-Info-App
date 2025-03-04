// src/middlewares/errorHandler.ts
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { HttpError } from '../errors/HttpError';

export const errorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void => {
  console.error(err);

  if (err instanceof HttpError) {
    res.status(err.status).json({
      code: err.code,
      message: err.message,
    });
    return;
  }

  res.status(500).json({
    code: 'E_UNKNOWN',
    message: 'An unexpected error occurred.',
  });
};
