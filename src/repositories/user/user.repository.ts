import { User } from '@/interfaces/users.interface';
import userModel from '@models/users.model';
import { Collection } from 'mongoose';

export class UserRepository {
  private users = userModel;
  public findOneByEmail(email: string): Collection {
    return this.users.findOne({ email: email });
  }

  public create(email: string, password: string) {
    return this.users.create({ email, password });
  }
}
