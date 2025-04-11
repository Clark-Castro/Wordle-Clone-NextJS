import { WORDS } from "./List";

export const generateWord = () =>
  WORDS[Math.floor(Math.random() * WORDS.length)];

export const encryptWord = (word: string): string => {
  const charCodes = word
    .split("")
    .map(
      (char, i) =>
        char.charCodeAt(0) ^
        (process.env.SECRET?.charCodeAt(i % process.env.SECRET.length) || 0)
    );
  return btoa(String.fromCharCode(...charCodes));
};

export const decryptWord = (): string => {
  const encoded = window.location.pathname.slice(6);
  const bytes = atob(encoded)
    .split("")
    .map(
      (char, i) =>
        char.charCodeAt(0) ^
        (process.env.SECRET?.charCodeAt(i % process.env.SECRET.length) || 0)
    );
  return String.fromCharCode(...bytes);
};
