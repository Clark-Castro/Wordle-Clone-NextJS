import { create } from "zustand";
import { persist } from "zustand/middleware";
import { generateWord } from "@/lib/words";
import { GameState, GameActions } from "@/types";

const initialState: GameState = {
  targetWord: generateWord(),
  guesses: [],
  currentGuess: "",
  keyboardColors: {},
  gameStatus: "playing",
  stats: {
    played: 0,
    wins: 0,
    streak: 0,
    maxStreak: 0,
  },
};

const useGameStore = create<GameState & GameActions>()(
  persist(
    (set) => ({
      ...initialState,

      newGame: () =>
        set({
          targetWord: generateWord(),
          guesses: [],
          currentGuess: "",
          keyboardColors: {},
          gameStatus: "playing",
        }),

      addLetter: (letter) =>
        set((state) => {
          if (state.currentGuess.length < 5 && state.gameStatus === "playing")
            return { currentGuess: state.currentGuess + letter.toUpperCase() };
          else return state;
        }),

      removeLetter: () =>
        set((state) => ({ currentGuess: state.currentGuess.slice(0, -1) })),

      submitGuess: () =>
        set((state) => {
          if (
            state.currentGuess.length !== 5 ||
            state.gameStatus !== "playing" ||
            state.guesses.length >= 6
          )
            return state;
          else return calcNewState(state);
        }),
    }),
    {
      name: "wordle-stats",
      partialize: (state) => ({
        stats: state.stats,
      }),
    }
  )
);

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

const calcNewState = (state: GameState): Partial<GameState> => {
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

export default useGameStore;
