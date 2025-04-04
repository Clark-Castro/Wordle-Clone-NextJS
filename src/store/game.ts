import { create } from "zustand";
import { persist } from "zustand/middleware";
import { generateWord } from "@/lib/words";

type GameState = {
  targetWord: string;
  guesses: string[];
  currentGuess: string;
  keyboardColors: Record<string, string>;
  gameStatus: "playing" | "won" | "lost";
  stats: GameStats;
};

type GameActions = {
  addLetter: (letter: string) => void;
  removeLetter: () => void;
  submitGuess: () => void;
  newGame: () => void;
};

export type GameStats = {
  played: number;
  wins: number;
  streak: number;
  maxStreak: number;
};

const useGameStore = create<GameState & GameActions>()(
  persist(
    (set, get) => ({
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

      addLetter: (letter) => {
        const state = get();
        if (state.currentGuess.length < 5 && state.gameStatus === "playing") {
          set({ currentGuess: state.currentGuess + letter.toUpperCase() });
        }
      },

      removeLetter: () => {
        set((state) => ({
          currentGuess: state.currentGuess.slice(0, -1),
        }));
      },

      submitGuess: () => {
        const state = get();
        if (
          state.currentGuess.length !== 5 ||
          state.gameStatus !== "playing" ||
          state.guesses.length >= 6
        )
          return;

        const newKeyboardColors = calculateKeyboardColors(
          state.currentGuess,
          state.targetWord,
          state.keyboardColors
        );

        const gameWon = state.currentGuess === state.targetWord;
        const gameLost = state.guesses.length === 5 && !gameWon;

        const newStats = {
          played: state.stats.played + 1,
          wins: gameWon ? state.stats.wins + 1 : state.stats.wins,
          streak: gameWon ? state.stats.streak + 1 : 0,
          maxStreak: Math.max(
            state.stats.maxStreak,
            gameWon ? state.stats.streak + 1 : 0
          ),
        };

        set({
          guesses: [...state.guesses, state.currentGuess],
          currentGuess: "",
          keyboardColors: newKeyboardColors,
          gameStatus: gameWon ? "won" : gameLost ? "lost" : "playing",
          stats: newStats,
        });
      },

      newGame: () => {
        set({
          targetWord: generateWord(),
          guesses: [],
          currentGuess: "",
          gameStatus: "playing",
        });
      },
    }),
    {
      name: "wordle-storage",
      partialize: (state) => ({
        targetWord: state.targetWord,
        guesses: state.guesses,
        keyboardColors: state.keyboardColors,
        stats: state.stats,
      }),
    }
  )
);

// Helper function to calculate keyboard colors
const calculateKeyboardColors = (
  guess: string,
  target: string,
  currentColors: Record<string, string>
) => {
  const newColors = { ...currentColors };
  const targetLetters = target.split("");

  guess.split("").forEach((letter, index) => {
    const targetLetter = targetLetters[index];

    // Correct position
    if (letter === targetLetter) {
      newColors[letter] = "correct";
    }
    // Present in word but wrong position
    else if (targetLetters.includes(letter)) {
      if (newColors[letter] !== "correct") {
        newColors[letter] = "present";
      }
    }
    // Not in word
    else {
      if (!newColors[letter]) {
        newColors[letter] = "absent";
      }
    }
  });

  return newColors;
};

export default useGameStore;
