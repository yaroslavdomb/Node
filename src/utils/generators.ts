export function get100Random(): number {
  return Math.floor(Math.random() * 101);
}

export function get10000Random(): number {
  return Math.floor(Math.random() * 10001);
}

export function getRandomNumUpToBillion(): number {
  return Math.floor(Math.random() * 1_000_000_000_1);
}

export function generate4RandomDigits(): number {
  return Math.floor(1000 + Math.random() * 9000);
}

export function generate4RandomLetters(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let randomLetters = "";
  for (let i = 0; i < 4; i++) {
    randomLetters += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return randomLetters.charAt(0).toUpperCase() + randomLetters.slice(1, 3) + randomLetters.charAt(0).toLowerCase();
}
