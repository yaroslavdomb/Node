import { Router } from "express";
import UserDb from "../db/models/user";
import { user } from "../validators/user";
import bcrypt from "bcrypt";
import { login } from "../validators/login";
import userService from "../services/user-service";
import { validateLogin, validateUser } from "../middleware/input-validations";
import validateToken from "../middleware/auth-validation";

const usersRouter = Router();

//login
usersRouter.post("/login", validateLogin, async (req, res) => {
  const token = await userService.login(req.body.email, req.body.password);
  res.json({ msg: "Logged in successfully!", token: `${token}` });
});

usersRouter.post("/", validateUser, async (req, res) => {
  const userResponse = await userService.createUser(req.body);
  res.json({ "new user id": userResponse });
});

usersRouter.post("/full", async (req, res) => {
  //Preparing
  const validatedBody = await user.parseAsync(req.body);
  const dbUser = new UserDb(validatedBody);
  dbUser.password = await bcrypt.hash(dbUser.password, 12);

  //Saving
  const savedUser = await dbUser.save();

  //Postsaving
  res.json({ "Saved user": savedUser });
});

usersRouter.post("/fullSafe", async (req, res) => {
  //Preparing
  const userBody = req.body;
  await user.parseAsync(userBody);
  const userModelProcessed = new UserDb(userBody);
  userModelProcessed.password = await bcrypt.hash(userModelProcessed.password, 12);

  //Saving
  const savedUser = await userModelProcessed.save();

  //Postsaving
  const { password, ...userWithoutPass } = savedUser.toObject();
  res.json({ "User without pass": userWithoutPass });
});

usersRouter.post("/pass", async (req, res) => {
  //Preparing
  const validatedUser = await user.parseAsync(req.body);
  const hashedPass = await bcrypt.hash(validatedUser.password, 12);

  //Saving
  const newUser = new UserDb({ ...validatedUser, password: hashedPass });
  const savedUser = await newUser.save();
  const password = await UserDb.findOne({ _id: savedUser._id }).select("+password password");

  //Postsaving
  res.json({ password: password });
});

//Return from DB array of full document
usersRouter.get("/allIds", validateToken, async (req, res) => {
  const users = await UserDb.find();
  const detectedUsers = users.map((currUser) => currUser._id);
  res.json({ msg: detectedUsers });
});

// Covered request, return array of Objects having the single field inside (id)
usersRouter.get("/allIds2", async (req, res) => {
  const users = await UserDb.find().select("_id");
  const detectedUsers = users.map((currUser) => currUser._id);
  res.json({ msg: detectedUsers });
});

// Immediatly return array of all Ids, but it slower then select
usersRouter.get("/allIds3", async (req, res) => {
  const users = await UserDb.distinct("_id");
  res.json({ msg: users });
});

usersRouter.get("/allFully", async (req, res) => {
  const allUsers = await userService.getUsers();
  res.json({ allUsers: `${allUsers}` });
});

export default usersRouter;
