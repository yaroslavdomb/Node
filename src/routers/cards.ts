import { Router } from "express";

const cardRouter = Router();

cardRouter.get("/", (req, res) => {
  res.json({ msg: "cards path" });
});

export default cardRouter;
