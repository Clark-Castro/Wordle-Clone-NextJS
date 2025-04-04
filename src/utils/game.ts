import { RowData } from "@/types";

export const createEmptyRow = (): RowData => {
  return Object.fromEntries(
    Array.from({ length: 5 }, (_, i) => [
      `b${i + 1}`,
      { color: "gray", letter: "" },
    ])
  ) as RowData;
};

export const checkGuess = (guess: string, solution: string): RowData => {
  return Object.fromEntries(
    Array.from({ length: 5 }, (_, i) => {
      const letter = guess[i];
      const color =
        letter === solution[i]
          ? "correct"
          : solution.includes(letter)
          ? "present"
          : "gray";
      return [`b${i + 1}`, { letter, color }];
    })
  ) as RowData;
};
