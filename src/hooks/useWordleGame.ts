import { useReducer } from "react";
import { RowData } from "@/types";
import { createEmptyRow, checkGuess } from "@/utils/game";

const initialState = {
  currentRow: createEmptyRow(),
  solution: "apple",
  guess: "",
};

type GameState = typeof initialState;

type GameAction =
  | { type: "SET_LETTER"; payload: string }
  | { type: "BACKSPACE" }
  | { type: "SUBMIT" };

const reducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case "SET_LETTER":
      if (state.guess.length < 5) {
        return { ...state, guess: state.guess + action.payload };
      }
      return state;
    case "BACKSPACE":
      return { ...state, guess: state.guess.slice(0, -1) };
    case "SUBMIT":
      if (state.guess.length === 5) {
        return {
          ...state,
          currentRow: checkGuess(state.guess, state.solution),
        };
      }
      return state;
    default:
      return state;
  }
};

export const useWordleGame = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const currentRow = Object.fromEntries(
    Array.from({ length: 5 }, (_, i) => {
      const letter = state.guess[i] || "";
      return [`b${i + 1}`, { letter, color: "gray" }];
    })
  ) as RowData;

  return { state: { ...state, currentRow }, dispatch };
};
