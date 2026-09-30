import { get100Random, get10000Random, generate4RandomDigits, generate4RandomLetters, getRandomISRPhone } from "../utils/generators.js";
import authService from "../services/auth-service.js";
function generateUser(digits, letters, password) {
    return {
        name: {
            first: letters,
            middle: letters,
            last: letters
        },
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
        email: `${letters}${digits}@test.com`,
        password: password,
        phone: getRandomISRPhone(),
        isBusiness: Math.random() > 0.5,
        isAdmin: Math.random() > 0.5,
        createdAt: new Date()
    };
}
export async function generateUsersList(usersToBeCreated) {
    const usersList = [];
    for (let i = 0; i < usersToBeCreated; i++) {
        const digits = generate4RandomDigits();
        const letters = generate4RandomLetters();
        const hashedPass = await authService.hashPassword(letters + digits.toString() + "!");
        usersList.push(generateUser(digits, letters, hashedPass));
    }
    if (usersToBeCreated >= 3) {
        usersList[0].isBusiness = false;
        usersList[0].isAdmin = false;
        usersList[1].isBusiness = true;
        usersList[1].isAdmin = false;
        usersList[2].isBusiness = false;
        usersList[2].isAdmin = true;
    }
    return usersList;
}
