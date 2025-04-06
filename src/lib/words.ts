export const WORDS = [
  "REACT",
  "TYPES",
  "STATE",
  "HOOKS",
  "STORE",
  "BUILD",
  "ROUTE",
  "QUERY",
  "CACHE",
  "PROPS",
  "ERROR",
  "FETCH",
];

export const generateWord = () =>
  WORDS[Math.floor(Math.random() * WORDS.length)];
