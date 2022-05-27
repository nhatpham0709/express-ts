import { Response } from 'express';
import { SuccessResource } from '../success.resource';

class UserResource extends SuccessResource {
  constructor(public data: any, public message: string) {
    super(data, message);
  }
}

export default UserResource;
