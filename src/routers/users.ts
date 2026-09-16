import { Router } from "express";
import userService from "../services/user-service";
import { validateLoginSchema, validateFullUser, validatePartUser } from "../middleware/input-validations";
import { hasAdminRole, hasOwnerRole, hasOwnerOrAdminRole } from "../middleware/guards";
import { logger } from "../logs/logger";

const usersRouter = Router();

usersRouter.post("/", validateFullUser, async (req, res) => {
  logger.info("createUser called");
  const userResponse = await userService.createUser(req.body);
  res.json({ "new user id": userResponse });
});

usersRouter.post("/login", validateLoginSchema, async (req, res) => {
  logger.info("login called");
  const token = await userService.login(req.body.email, req.body.password);
  res.json({ Token: token });
});

usersRouter.get("/", ...hasAdminRole, async (req, res) => {
  logger.info("getListOfUsers called");
  const response = await userService.getListOfUsers();
  res.json({ "List of users": response });
});

usersRouter.get("/:id", ...hasOwnerOrAdminRole, async (req, res) => {
  logger.info("getUser with ID called");
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const detectedUser = await userService.getUser(id);
  res.json({ user: detectedUser });
});

usersRouter.put("/:id", validatePartUser, ...hasOwnerRole, async (req, res) => {
  logger.info("updateUser called");
  const user = await userService.updateUser(req.body.id as string, req.body);
  res.json({ user });
});

usersRouter.patch("/:id", ...hasOwnerRole, async (req, res) => {
  logger.info("changeUserBusinessStatus called");
  const user = await userService.changeUserBusinessStatus(req.body.id as string);
  res.json({ user });
});

usersRouter.delete("/:id", ...hasOwnerOrAdminRole, async (req, res) => {
  logger.info("deleteUser called");
  const user = await userService.deleteUser(req.params.id as string);
  res.json({ user });
});

export default usersRouter;
