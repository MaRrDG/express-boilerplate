import { APIError } from "@/generic/APIError";
import UserModel, { User } from "@/modules/users/models/users.model";
import { GenericService, RequestData } from "@generic/models/generic.model";

class UserService implements GenericService {
  public users = UserModel;

  public async isEmailAvailable(email: string, resourceId?: string) {
    const findUser: User = await this.users.findOne({ email: email });

    if (findUser && findUser._id != resourceId)
      throw new APIError(409, `This email ${email} already exists`);
    else if (findUser) throw new APIError(409, `This email ${email} already exists`);

    return true;
  }

  public async getEntities(): Promise<User[]> {
    return this.users.find();
  }

  public async getEntityById(requestData: RequestData): Promise<User> {
    const { params } = requestData;

    const findUser: User = await this.users.findOne({ _id: params.resourceId });
    if (!findUser) throw new APIError(409, "User doesn't exist");

    return findUser;
  }

  public async patchEntity(requestData: RequestData): Promise<User> {
    const { params, data } = requestData;
    try {
      await this.isEmailAvailable(data.email, params.resourceId);

      const updateUserById: User = await this.users.findByIdAndUpdate(
        params.resourceId,
        data,
      );
      if (!updateUserById) throw new APIError(409, "User doesn't exist");

      return updateUserById;
    } catch (e) {
      if (e.httpCode && e.message) {
        throw new APIError(e.httpCode, e.message);
      }

      throw new APIError(500, "Internal server error");
    }
  }

  public async putEntity(requestData: RequestData): Promise<User> {
    const { params, data } = requestData;

    try {
      const user = new UserModel(data);
      const validation = user.validateSync();

      if (validation?.errors)
        throw new APIError(409, `Bad Request - Missing required fields`);

      await this.isEmailAvailable(data.email, params.resourceId);

      const updateUserById: User = await this.users.findByIdAndUpdate(
        params.resourceId,
        data,
      );
      if (!updateUserById) throw new APIError(409, "User doesn't exist");

      return updateUserById;
    } catch (e) {
      if (e.httpCode && e.message) {
        throw new APIError(e.httpCode, e.message);
      }

      throw new APIError(500, "Internal server error");
    }
  }

  public async deleteEntity(requestData: RequestData): Promise<User> {
    const { params } = requestData;

    const deleteUserById: User = await this.users.findByIdAndDelete(params.resourceId);
    if (!deleteUserById) throw new APIError(409, "User doesn't exist");

    return deleteUserById;
  }
}

export default UserService;
