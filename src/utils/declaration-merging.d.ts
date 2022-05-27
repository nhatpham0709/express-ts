declare namespace Express {
  export interface Response {
    success?: any;
    fail?: any;
    created?: any;
    deleted?: any;
    updated?: any;
    noContent?: any;
    unauthorized?: any;
    forbidden?: any;
    notFound?: any;
    validationError?: any;
    conflict?: any;
    tooManyRequests?: any;
    serverError?: any;
    badRequest?: any;
  }
}
