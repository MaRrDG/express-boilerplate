import { hash } from "bcrypt";
import { APIError } from "@/generic/APIError";
import userModel, { User } from "@/modules/users/models/users.model";
import { isEmpty } from "@utils/util";

class UserService {
  public users = userModel;

  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this.users.find();
    return users;
  }

  public async findUserById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new APIError(400, "UserId is empty");

    const findUser: User = await this.users.findOne({ _id: userId });
    if (!findUser) throw new APIError(409, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData): Promise<User> {
    if (isEmpty(userData)) throw new APIError(400, "userData is empty");

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser) throw new APIError(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({
      ...userData,
      password: hashedPassword,
    });

    return createUserData;
  }

  public async updateUser(userId: string, userData): Promise<User> {
    if (isEmpty(userData)) throw new APIError(400, "userData is empty");

    if (userData.email) {
      const findUser: User = await this.users.findOne({ email: userData.email });
      if (findUser && findUser._id != userId)
        throw new APIError(409, `This email ${userData.email} already exists`);
    }

    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10);
      userData = { ...userData, password: hashedPassword };
    }

    const updateUserById: User = await this.users.findByIdAndUpdate(userId, { userData });
    if (!updateUserById) throw new APIError(409, "User doesn't exist");

    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById: User = await this.users.findByIdAndDelete(userId);
    if (!deleteUserById) throw new APIError(409, "User doesn't exist");

    return deleteUserById;
  }
}

export default UserService;
