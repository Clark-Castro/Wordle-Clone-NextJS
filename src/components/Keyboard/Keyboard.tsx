"use client";
import "./styles.css";
import { useGameActions, useKeyboardColors } from "@/store/game";

const KEY_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["En", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
];

export default function Keyboard() {
  const keyboardColors = useKeyboardColors();
  const { addLetter, removeLetter, submitGuess } = useGameActions();

  const handleKeyClick = (key: string) => {
    if (key === "En") submitGuess();
    else if (key === "Backspace") removeLetter();
    else if (/^[A-Z]$/.test(key)) addLetter(key);
  };

  return (
    <div className="flex-col-center gap-normal">
      {KEY_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row flex-center gap-normal">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => handleKeyClick(key)}
              className={
                "keyboard-key flex-center font-small " +
                (keyboardColors[key] || "")
              }>
              {key === "Backspace" ? "⌫" : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
