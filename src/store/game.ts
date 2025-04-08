import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GameState } from "@/types";
import { calcNewState } from "./utils";
import { generateWord } from "@/lib/words";

const useGameStore = create<GameState>()(
  persist(
    (set) => ({
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

      actions: {
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
              return {
                currentGuess: state.currentGuess + letter.toUpperCase(),
              };
            return state;
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
            return calcNewState(state);
          }),
      },
    }),
    {
      name: "wordle-stats",
      partialize: (state) => ({
        stats: state.stats,
      }),
    }
  )
);

export const useTargetWord = () => useGameStore((state) => state.targetWord);
export const useGuesses = () => useGameStore((state) => state.guesses);
export const useCurrentGuess = () =>
  useGameStore((state) => state.currentGuess);
export const useKeyboardColors = () =>
  useGameStore((state) => state.keyboardColors);
export const useGameStatus = () => useGameStore((state) => state.gameStatus);
export const useGameStats = () => useGameStore((state) => state.stats);

export const useGameActions = () => useGameStore((state) => state.actions);
