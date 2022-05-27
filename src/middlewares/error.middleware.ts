import { NextFunction, Request, Response } from 'express';
import { ApiException } from '@exceptions/ApiException';
import { logger } from '@utils/logger';

const errorMiddleware = (error: ApiException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong';

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    switch (status) {
      case 400:
        res.badRequest(message);
      case 401:
        res.unauthorized(message);
      case 403:
        res.forbidden(message);
      case 404:
        res.notFound(message);
      case 409:
        res.conflict(message);
      case 500:
        res.serverError(message);
      default:
        res.serverError(message);
    }
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
