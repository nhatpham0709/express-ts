import { NextFunction, Request, Response } from 'express';

const responseCodes = {
  CREATED: 201,
  DELETED: 200,
  UPDATED: 200,
  NO_CONTENT: 204,
  INVALID_REQUEST: 400,
  UNSUPPORTED_RESPONSE_TYPE: 400,
  INVALID_SCOPE: 400,
  INVALID_GRANT: 400,
  INVALID_CREDENTIALS: 400,
  INVALID_REFRESH: 400,
  NO_DATA: 400,
  INVALID_DATA: 400,
  ACCESS_DENIED: 401,
  UNAUTHORIZED: 401,
  INVALID_CLIENT: 401,
  FORBIDDEN: 403,
  RESOURCE_NOT_FOUND: 404,
  NOT_ACCEPTABLE: 406,
  CONFLICT: 409,
  RESOURCE_GONE: 410,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  TOO_MANY_REQUESTS: 429,
  SERVER_ERROR: 500,
  UNSUPPORTED_GRANT_TYPE: 501,
  NOT_IMPLEMENTED: 501,
  TEMPORARILY_UNAVAILABLE: 503,
};

const responseHelper = (req: Request, res: Response, next: NextFunction = null) => {
  if (res.json === undefined) {
    res.json = (data: any) => {
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify(data));
      return;
    };
  }

  res.success = (data: any = null, status = 200, message: String = '') => {
    res.statusCode = status;
    if (!message) message = 'Successful';
    if (data === null) res.end(message);
    else res.json({ data: data, meta: { message: message, status: status } });
  };

  res.fail = (message: String, status = 400) => {
    res.status(status).json({ message: message, status: status });
  };

  res.created = (data: any = null, message: String = '') => {
    res.success(data, responseCodes.CREATED, message);
  };

  res.deleted = (data: any = null, message: String = '') => {
    res.success(data, responseCodes.DELETED, message);
  };

  res.updated = (data: any = null, message: String = '') => {
    res.success(data, responseCodes.UPDATED, message);
  };

  res.noContent = () => {
    res.success(null, responseCodes.NO_CONTENT);
  };

  res.unauthorized = (description: String = 'Unauthorized') => {
    res.fail(description, responseCodes.UNAUTHORIZED);
  };

  res.forbidden = (description: String = 'Forbidden') => {
    res.fail(description, responseCodes.FORBIDDEN);
  };

  res.notFound = (description: String = 'Not Found') => {
    res.fail(description, responseCodes.RESOURCE_NOT_FOUND);
  };

  res.badRequest = (description: String = 'Bad Request') => {
    res.fail(description, responseCodes.INVALID_DATA);
  };

  res.conflict = (description: String = 'Conflict') => {
    res.fail(description, responseCodes.CONFLICT);
  };

  res.tooManyRequests = (description: String = 'Too Many Requests') => {
    res.fail(description, responseCodes.TOO_MANY_REQUESTS);
  };

  res.serverError = (description: String = 'Internal Server Error') => {
    res.fail(description, responseCodes.SERVER_ERROR);
  };

  if (next !== null) next();
};

module.exports = {
  helper: () => responseHelper,
  responseCodes: responseCodes,
};
