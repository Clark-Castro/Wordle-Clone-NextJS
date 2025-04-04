export const WORDS = [
  "REACT",
  "TYPES",
  "STATE",
  "HOOKS",
  "STORE",
  "NEXTJS",
  "BUILD",
  "ROUTE",
  "QUERY",
  "CACHE",
  "PROPS",
  "ERROR",
  "FETCH",
  "CLIENT",
  "SERVER",
];

export const generateWord = () =>
  WORDS[Math.floor(Math.random() * WORDS.length)];
