import { User as UserRequest } from "../validators/user";
import userModel from "../db/models/user";
import HttpError from "../errors/http-error";
import authService from "./auth-service";

const userService = {
  createUser: async (userData: UserRequest) => {
    const userExist = await userModel.findByEmail(userData.email);
    if (userExist) {
      throw new HttpError("Email is already in use", 400);
    }
    const user = new userModel(userData);
    await user.setPassword(userData.password);

    const savedObj = (await user.save()).toObject();
    return savedObj._id;
  },

  login: async (email: string, password: string) => {
    const detectedUser = await userModel.findOne({ email }).select({ password: 1, _id: 1, email: 1, isAdmin: 1 });
    if (!detectedUser) {
      throw new HttpError(`User with ${email} not found in DB`, 400);
    }

    const isPassValid = await authService.validatePassword(password, detectedUser.password);
    if (!isPassValid) {
      throw new HttpError("You've been not authenticated!", 401);
    }

    return authService.generateJWT({ email: detectedUser.email, admin: detectedUser.isAdmin });
  },

  getListOfUsers: async () => {
    return await userModel.find({});
  },

  getUser: async (id: string) => {
    const detectedUser = await userModel.findById(id);
    if (!detectedUser) {
      throw new HttpError(`User with ${id} not found in DB`, 400);
    }
    return detectedUser;
  },

  updateUser: async (id: string, user: Partial<UserRequest>) => {
    const updatedUser = await userModel.findByIdAndUpdate({ _id: id }, user, { new: true });
    if (!updatedUser) {
      throw new HttpError(`User with ${id} was NOT updated`, 400);
    }
    return updatedUser;
  },

  changeUserBusinessStatus: async (id: string) => {
    const userWithChangedBS = await userModel.findByIdAndUpdate({ _id: id }, { $bit: { isBusiness: { xor: 1 } } });
    if (!userWithChangedBS) {
      throw new HttpError(`User with ${id} was NOT updated`, 400);
    }
    return userWithChangedBS;
  },

  deleteUser: async (id: string) => {
    const detectedUser = await userModel.findOneAndDelete({ _id: id });
    if (!detectedUser) {
      throw new HttpError(`User with ${id} was NOT updated`, 400);
    }
    return detectedUser;
  }
};

export default userService;
