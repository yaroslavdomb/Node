import { Router } from "express";
import { logger } from "../logs/logger";
import cardService from "../services/card-service";
import { hasOwnerRole, hasBusinessRole, hasOwnerOrAdminRole } from "../middleware/guards";
import validateToken from "../middleware/auth-validation";
import { validateFullCard, validatePartCard } from "../middleware/input-validations";

const cardRouter = Router();

cardRouter.get("/", (req, res) => {
  logger.info("getListOfAllCards called");
  const listOfAllCards = cardService.getListOfAllCards();
  res.json({ list: listOfAllCards });
});

cardRouter.get("/my-cards", validateToken, (req, res) => {
  logger.info("getOwnerCards called");
  const ownerCards = cardService.getOwnerCards(req.body.id as string);
  res.json({ list: ownerCards });
});

cardRouter.get("/:id", async (req, res) => {
  logger.info("getCardById called");
  const cardById = cardService.getCardById(req.params.id as string);
  res.json({ card: cardById });
});

cardRouter.post("/", ...hasBusinessRole, async (req, res) => {
  logger.info("createCard called");
  const createdCard = cardService.createCard(req.body);
  res.json({ createdCard: createdCard });
});

cardRouter.put("/:id", validateFullCard, ...hasOwnerRole, async (req, res) => {
  logger.info("updateCard called");
  const updatedCard = cardService.updateCard(req.params.id as string, req.body);
  res.json({ updatedCard: updatedCard });
});

cardRouter.patch("/:id", validatePartCard, validateToken, async (req, res) => {
  logger.info("changeLikeStatus called");
  const likedCard = cardService.changeLikeStatus(req.params.id as string, req.body);
  res.json({ updatedCard: likedCard });
});

cardRouter.delete("/:id", ...hasOwnerOrAdminRole, async (req, res) => {
  logger.info("deleteCard called");
  const deletedCard = cardService.deleteCard(req.params.id as string);
  res.json({ deletedCard: deletedCard });
});

export default cardRouter;
