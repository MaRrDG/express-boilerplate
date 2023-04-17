import { hash } from "bcrypt";
import { APIError } from "@/generic/APIError";
import userModel, { User } from "@/modules/users/models/users.model";
import { isEmpty } from "@utils/util";
import jwt from "jsonwebtoken";

class AuthService {
  public users = userModel;

  public async register(userData): Promise<any> {
    if (isEmpty(userData)) throw new APIError(400, "userData is empty");

    if (userData.email) {
      const findUser: User = await this.users.findOne({ email: userData.email });
      if (findUser)
        throw new APIError(409, `This email ${userData.email} already exists`);
    }

    const user = await this.users.create(userData);

    // Create token, scopes is the permission for that user, is not required.
    const token = jwt.sign({ scopes: ["read:Users"] }, process.env.JWT_TOKEN, {
      expiresIn: process.env.JWT_EXPIRE_TOKEN,
    });

    return { ...user._doc, token };
  }

  public async login(userData): Promise<User> {
    if (isEmpty(userData) || !userData.email || !userData.password)
      throw new APIError(400, "You need an email and a password for login in.");

    const findUser: User = await this.users
      .findOne({
        email: userData.email,
        password: userData.password,
      })
      .exec();
    if (!findUser) throw new APIError(409, `Email or password is wrong.`);

    // Create token, scopes is the permission for that user, is not required.
    const token = jwt.sign({ scopes: ["read:Users"] }, process.env.JWT_TOKEN, {
      expiresIn: process.env.JWT_EXPIRE_TOKEN,
    });

    return { ...findUser._doc, token };
  }
}

export default AuthService;
