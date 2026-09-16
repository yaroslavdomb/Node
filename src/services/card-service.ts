import cardModel from "../db/models/card";
import HttpError from "../errors/http-error";
import { Card as CardRequest } from "../validators/card";
import { userDB } from "../db/schemas/user";

const cardService = {
  getListOfAllCards: async () => {
    return await cardModel.find({});
  },

  getOwnerCards: async (id: string) => {
    const ownerCards = await cardModel.find({ userId: id });
    if (!ownerCards) {
      throw new HttpError(`Cards for user with id = ${id} were NOT found in DB`, 404);
    }

    return ownerCards;
  },

  getCardById: async (id: string) => {
    const card = await cardModel.find({ _id: id });
    if (!card) {
      throw new HttpError(`Card with id = ${id} was NOT found in DB`, 404);
    }

    return card;
  },

  createCard: async (cardData: CardRequest) => {
    const card = new cardModel(cardData);
    const savedCard = (await card.save()).toObject();
    return savedCard;
  },

  updateCard: async (cardId: string, card: Partial<CardRequest>) => {
    const updatedCard = await cardModel.findByIdAndUpdate({ _id: cardId }, card, { new: true });
    if (!updatedCard) {
      throw new HttpError(`Card with id = ${cardId} was NOT updated`, 400);
    }
    return updatedCard;
  },

  changeLikeStatus: async (cardId: string, user: userDB) => {
    const cardDetected = await cardModel.findById(cardId);
    if (!cardDetected) {
      throw new HttpError(`Card with id = ${cardId} was not found`, 404);
    }

    const userID = user._id.toString();
    const userIdIndex = cardDetected.likes.indexOf(userID);

    if (userIdIndex === -1) {
      cardDetected.likes.push(userID);
    } else {
      cardDetected.likes.splice(userIdIndex, 1);
    }
    return (await cardDetected.save()).toObject();
  },

  deleteCard: async (cardId: string) => {
    const cardDetected = await cardModel.findOneAndDelete({ _id: cardId });
    if (!cardDetected) {
      throw new HttpError(`Card with id = ${cardId} was not found`, 404);
    }
    return cardDetected;
  }
};

export default cardService;
