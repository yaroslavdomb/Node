const { Router } = require("express");

const usersRouter = Router();

usersRouter.get("/first", (req, res) => {
  res.json({ user1: "U1" });
});

usersRouter.get("/all", (req, res) => {
  res.json({ usersList: [{ user1: "U1" }, { user2: "U2" }, { user3: "U3" }] });
});

module.exports = usersRouter;
