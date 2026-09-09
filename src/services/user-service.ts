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

  getUsers: async () => {
    return await userModel.find({});
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
  }
};

export default userService;
