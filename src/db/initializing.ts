import envConfig from "../config/env.config";
import mongoose from "mongoose";
import userModel from "../db/models/user";
import authService from "../services/auth-service";

function get100Random(): number {
  return Math.floor(Math.random() * 101);
}

function get10000Random(): number {
  return Math.floor(Math.random() * 10001);
}

function generate4RandomDigits(): number {
  return Math.floor(1000 + Math.random() * 9000);
}

function generate4RandomLetters(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let randomLetters = "";
  for (let i = 0; i < 4; i++) {
    randomLetters += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return randomLetters.charAt(0).toUpperCase() + randomLetters.slice(1, 3) + randomLetters.charAt(0).toLowerCase();
}

function generateUser(digits: number, letters: string, password: string) {
  return {
    name: {
      firstName: `${letters}`,
      middle: `${letters}`,
      lastName: `${letters}`
    },
    address: {
      state: "State",
      country: "Israel",
      countryCode: "ISL",
      city: "Tel-Aviv",
      street: "Ben-Gurion",
      houseNumber: get100Random(),
      zipCode: String(get10000Random())
    },
    image: {
      url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      alt: "User profile image"
    },
    email: `${letters}${digits}@test.com`,
    password: password,
    phone: `050${Math.floor(1000000 + Math.random() * 9000000)}`,
    isBusiness: Math.random() > 0.5,
    isAdmin: Math.random() > 0.5,
    createdAt: new Date()
  };
}

const initDB = async () => {
  if (envConfig.ENV_TYPE !== "prod") {
    console.log(`Start populating DB...`);

    if (envConfig.DB_INIT_INFRA) {
      console.log(`Start to (re)create DB ...`);
      const testCollection = mongoose.connection.collection(envConfig.DB_TEST_TABLE);
      await testCollection.insertOne({
        test: true,
        insertedAt: new Date().toLocaleString()
      });
      console.log(`Finish to (re)create DB ...`);
      console.log(`Please check "${envConfig.DB_TEST_TABLE}" collection`);
    }

    if (envConfig.DB_INIT_USERS > 0) {
      console.log(`Start to init ${envConfig.DB_INIT_USERS} users ...`);
      const usersList: ReturnType<typeof generateUser>[] = [];

      for (let i = 0; i < envConfig.DB_INIT_USERS; i++) {
        const digits = generate4RandomDigits();
        const letters = generate4RandomLetters();
        const hashedPass = await authService.hashPassword(letters + digits.toString() + "!");

        usersList.push(generateUser(digits, letters, hashedPass));
      }

      await userModel.insertMany(usersList);
      console.log(`Finish to init ${envConfig.DB_INIT_USERS} users ...`);
    }

    //TODO: add cards
    console.log(`Finished populating DB`);
  }
};

export default initDB;
