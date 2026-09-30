import {
  get100Random,
  get10000Random,
  generate4RandomDigits,
  generate4RandomLetters,
  getRandomISRPhone
} from "../utils/generators.js";
import userModel from "../db/models/user.js";
import { reserveAndGetBizNumbers } from "../factories/bizNumberCounter.js";
import { logger } from "../logs/logger.js";

function generateCard(userId: string, grantedUniqueBizNumber: string) {
  return {
    title: generate4RandomLetters(),
    subtitle: generate4RandomLetters(),
    description: generate4RandomLetters(),
    phone: getRandomISRPhone(),
    email: generate4RandomLetters() + generate4RandomDigits() + ".test@gmail.com",
    web: "http://" + generate4RandomLetters() + ".test.com",
    address: {
      state: "State",
      country: "Israel",
      city: "Tel-Aviv",
      street: "Ben-Gurion",
      houseNumber: get100Random(),
      zipCode: String(get10000Random())
    },
    image: {
      url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      alt: "User profile image"
    },
    bizNumber: grantedUniqueBizNumber,
    likes: [],
    userId: userId,
    createdAt: new Date()
  };
}

export async function generateCardsList(cardsToBeCreated: number) {
  const businessUsersIdsObj = await userModel.find({ isBusiness: true }, { _id: 1 }).lean();
  const businessUsersIds = businessUsersIdsObj.map((user) => user._id.toString());
  if (!businessUsersIds || businessUsersIds.length === 0) {
    throw new Error("Cannot create cards - no business users found in DB!");
  } else {
    logger.info(`Found ${businessUsersIds.length} business users`);
  }

  const cardsList: ReturnType<typeof generateCard>[] = [];
  const firstFreeBizNumberObj = await reserveAndGetBizNumbers(cardsToBeCreated);

  for (let i = 0; i < cardsToBeCreated; i++) {
    const cardOwnerId = businessUsersIds[Math.floor(Math.random() * businessUsersIds.length)];
    cardsList.push(generateCard(cardOwnerId, String(firstFreeBizNumberObj.firstReserved + i)));
  }

  return cardsList;
}
