import { User as UserRequest } from "../validators/user";
import userModel from "../db/models/user";
import HttpError from "../errors/http-error";
import authService from "./auth-service";
import { error } from "node:console";
import { logger } from "../logs/logger";

const userService = {
  createUser: async (userData: UserRequest) => {
    const userExist = await userModel.findByEmail(userData.email);
    if (userExist) {
      throw new HttpError("Email is already in use", 400);
    }
    const user = new userModel(userData);
    await user.setPassword(userData.password);

    const savedUser = (await user.save()).toObject();
    return savedUser;
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
      throw new HttpError(`User with id = ${id} was not found in DB`, 400);
    }
    return detectedUser;
  },

  updateUser: async (id: string, user: Partial<UserRequest>) => {
    try {
      const updatedUser = await userModel.findByIdAndUpdate(id, user, { returnDocument: "after", runValidators: true });
      if (!updatedUser) {
        throw new HttpError(`User with id = ${id} was NOT updated`, 400);
      }
      return updatedUser;
    } catch (error: any) {
      if (error.code === 11000) {
        throw new HttpError("User with this email already exists", 409);
      }
      logger.error(error);
      throw new HttpError(`Internal error while user update`, 500);
    }
  },

  changeUserBusinessStatus: async (id: string) => {
    const userWithChangedBS = await userModel.findByIdAndUpdate(
      id,
      [{ $set: { isBusiness: { $not: "$isBusiness" } } }],
      { updatePipeline: true, returnDocument: "after" }
    );
    if (!userWithChangedBS) {
      throw new HttpError(`Business status for user with id = ${id} was NOT updated`, 400);
    }
    return userWithChangedBS;
  },

  deleteUser: async (id: string) => {
    const deletedUser = await userModel.findOneAndDelete({ _id: id });
    if (!deletedUser) {
      throw new HttpError(`User with id = ${id} was NOT deleted`, 400);
    }
    return deletedUser;
  }
};

export default userService;
