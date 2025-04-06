export type GameStats = {
  played: number;
  wins: number;
  streak: number;
  maxStreak: number;
};

export type GameState = {
  targetWord: string;
  guesses: string[];
  currentGuess: string;
  keyboardColors: Record<string, string>;
  gameStatus: "playing" | "won" | "lost";
  stats: GameStats;
};

export type GameActions = {
  addLetter: (letter: string) => void;
  removeLetter: () => void;
  submitGuess: () => void;
  newGame: () => void;
};
