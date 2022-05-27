import userModel from '@models/users.model';

export class UserRepository {
  private users = userModel;
  public findOneByEmail(email: string) {
    return this.users.findOne({ email: email });
  }

  public create(email: string, password: string) {
    return this.users.create({ email, password });
  }

  public findAll() {
    return this.users.find();
  }

  public delete(id: Number) {
    return this.users.deleteOne(id);
  }

  public update(id: Number, email: string, password: string) {
    return this.users.updateOne({ email: email, pasword: password });
  }
}
