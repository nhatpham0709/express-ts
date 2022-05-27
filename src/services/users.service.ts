import { hash } from 'bcrypt';
import { CreateUserDto } from '@dtos/users.dto';
import { ApiException } from '@exceptions/ApiException';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';
import { UserRepository } from '@/repositories/user/user.repository';

class UserService {
  public users = userModel;
  private userRepository: UserRepository = new UserRepository();

  public async findAllUser(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  public async findUserById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new ApiException(400, "You're not userId");

    const findUser: User = await this.users.findOne({ _id: userId });
    if (!findUser) throw new ApiException(409, "You're not user");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new ApiException(400, "You're not userData");

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser) throw new ApiException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async updateUser(userId: string, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new ApiException(400, "You're not userData");

    if (userData.email) {
      const findUser: User = await this.users.findOne({ email: userData.email });
      if (findUser && findUser._id != userId) throw new ApiException(409, `You're email ${userData.email} already exists`);
    }

    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10);
      userData = { ...userData, password: hashedPassword };
    }

    const updateUserById: User = await this.users.findByIdAndUpdate(userId, { userData });
    if (!updateUserById) throw new ApiException(409, "You're not user");

    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById: User = await this.users.findByIdAndDelete(userId);
    if (!deleteUserById) throw new ApiException(409, "You're not user");

    return deleteUserById;
  }
}

export default UserService;
