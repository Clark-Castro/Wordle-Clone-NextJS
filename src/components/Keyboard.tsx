"use client";
import useGameStore from "@/store/game";

const KEY_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
];

export default function Keyboard() {
  const { addLetter, removeLetter, submitGuess, keyboardColors } =
    useGameStore();

  const handleKeyPress = (key: string) => {
    if (key === "Enter") {
      submitGuess();
    } else if (key === "Backspace") {
      removeLetter();
    } else if (/^[A-Z]$/.test(key)) {
      addLetter(key);
    }
  };

  return (
    <div className="keyboard-container">
      {KEY_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => handleKeyPress(key)}
              className={`keyboard-key ${keyboardColors[key] || ""}`}
              data-key={key}
              type="button">
              {key === "Backspace" ? "⌫" : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
