export function get100Random() {
    return Math.floor(Math.random() * 101);
}
export function get10000Random() {
    return Math.floor(Math.random() * 10001);
}
export function generate4RandomDigits() {
    return Math.floor(1000 + Math.random() * 9000);
}
export function getRandomISRPhone() {
    return `050${Math.floor(1000000 + Math.random() * 9000000)}`;
}
export function generate4RandomLetters() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let randomLetters = "";
    for (let i = 0; i < 4; i++) {
        randomLetters += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return randomLetters.charAt(0).toUpperCase() + randomLetters.slice(1, 3) + randomLetters.charAt(0).toLowerCase();
}
