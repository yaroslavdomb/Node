import { type Request, type Response, Router } from "express";
import userModel from "../db/models/user";

const usersRouter = Router();

usersRouter.post("/", async (req, res) => {
  try {
    const userBody = req.body;
    const user = new userModel(userBody);
    const saved = await user.save();
    res.json({ "new user id": saved._id });
  } catch (error: any) {
    console.error("Error creating user:", error);
    res.status(400).json({ error: error.message || error });
  }
});

usersRouter.get("/all", async (req, res) => {
  const users = await userModel.find();
  const detectedUsers = users.forEach((currUser) => {
    return currUser._id;
  });
  res.json({ msg: detectedUsers });
});

export default usersRouter;
