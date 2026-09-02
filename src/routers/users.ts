import { Router } from "express";
import { type Request, type Response, type NextFunction } from "express";

const usersRouter = Router();

usersRouter.get("/first", (req:Request, res:Response) => {
  res.json({ user1: "U1" });
});

usersRouter.get("/all", (req:Request, res:Response) => {
  res.json({ usersList: [{ user1: "U1" }, { user2: "U2" }, { user3: "U3" }] });
});

export default usersRouter;
