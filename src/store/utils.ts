import { GameState } from "@/types";

const calcNewColors = (state: GameState) => {
  const newColors = { ...state.keyboardColors };
  const targetLetters = state.targetWord.split("");

  state.currentGuess.split("").forEach((letter, index) => {
    const targetLetter = targetLetters[index];

    if (letter === targetLetter) newColors[letter] = "correct";
    else if (targetLetters.includes(letter)) {
      if (newColors[letter] !== "correct") newColors[letter] = "present";
    } else newColors[letter] = "absent";
  });

  return newColors;
};

export const calcNewState = (state: GameState): Partial<GameState> => {
  const newColors = calcNewColors(state);
  const gameWon = state.currentGuess === state.targetWord ? 1 : 0;
  const gameLost = state.guesses.length === 5 && !gameWon ? 1 : 0;
  const stats = state.stats;

  const newStats = {
    played: stats.played + gameWon + gameLost,
    wins: gameWon ? stats.wins + 1 : stats.wins,
    streak: gameWon ? stats.streak + 1 : gameLost ? 0 : stats.streak,
    maxStreak: Math.max(stats.maxStreak, gameWon ? stats.streak + 1 : 0),
  };

  return {
    guesses: [...state.guesses, state.currentGuess],
    currentGuess: "",
    keyboardColors: newColors,
    gameStatus: gameWon ? "won" : gameLost ? "lost" : "playing",
    stats: newStats,
  };
};
