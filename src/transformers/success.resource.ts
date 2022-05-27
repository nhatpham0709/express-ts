import { Response } from 'express';
import { Resource } from './resource';

export class SuccessResource extends Resource {
  constructor(public data: any, public message: string) {
    super(data, 200, message);
  }
}
