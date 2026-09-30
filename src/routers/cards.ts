import { Router } from "express";
import { logger } from "../logs/logger.js";
import cardService from "../services/card-service.js";
import { hasOwnerRoleForCard, hasBusinessRole, hasOwnerOrAdminRole } from "../middleware/guards.js";
import validateToken from "../middleware/auth-validation.js";
import { validateFullCard } from "../middleware/input-validations.js";

const cardRouter = Router();

cardRouter.get("/", async (req, res) => {
  logger.info("getListOfAllCards called");
  const listOfAllCards = await cardService.getListOfAllCards();
  res.json({ list: listOfAllCards });
});

cardRouter.get("/my-cards", validateToken, async (req, res) => {
  logger.info("getOwnerCards called");
  const ownerCards = await cardService.getOwnerCards(req.user!._id.toString());
  res.json({ list: ownerCards });
});

cardRouter.get("/:id", async (req, res) => {
  logger.info("getCardById called");
  const cardById = await cardService.getCardById(req.params.id as string);
  res.json({ card: cardById });
});

cardRouter.post("/", ...hasBusinessRole, async (req, res) => {
  logger.info("createCard called");
  const createdCard = await cardService.createCard(req.body, req.user!._id.toString());
  res.json({ createdCard: createdCard });
});

cardRouter.put("/:id", validateFullCard, ...hasOwnerRoleForCard, async (req, res) => {
  logger.info("updateCard called");
  const updatedCard = await cardService.updateCard(req.params.id as string, req.body);
  res.json({ updatedCard: updatedCard });
});

cardRouter.patch("/:id", validateToken, async (req, res) => {
  logger.info("changeLikeStatus called");
  const likedCard = await cardService.changeLikeStatus(req.params.id as string, req.user!);
  res.json({ updatedCard: likedCard });
});

cardRouter.delete("/:id", ...hasOwnerOrAdminRole, async (req, res) => {
  logger.info("deleteCard called");
  const deletedCard = await cardService.deleteCard(req.params.id as string);
  res.json({ deletedCard: deletedCard });
});

export default cardRouter;
