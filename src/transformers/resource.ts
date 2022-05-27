import { Response, Request } from 'express';
export class Resource {
  constructor(public data: any, public status: number, public message: string) {
    this.data = data;
    this.status = status;
    this.message = message;
  }

  public make(): Response {
    let res: Response;
    return res.status(this.status).json({
      data: this.data,
      meta: {
        status: this.status,
        message: this.message,
      },
    });
  }

  public toArray(req: Request): Array<string> {
    return [req.body];
  }
}
