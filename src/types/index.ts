export type GameStats = {
  played: number;
  wins: number;
  streak: number;
  maxStreak: number;
};

export type GameActions = {
  newGame: () => void;
  addLetter: (letter: string) => void;
  removeLetter: () => void;
  submitGuess: () => void;
};

export type GameState = {
  targetWord: string;
  guesses: string[];
  currentGuess: string;
  keyboardColors: Record<string, string>;
  gameStatus: "playing" | "won" | "lost";
  stats: GameStats;
  actions: GameActions;
};
