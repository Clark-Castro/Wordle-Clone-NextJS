"use client";
import Row from "@/components/Row";
import { useEffect, useState } from "react";
import { RowData } from "@/types";

const targetWord = "FUCKS";

export default function Home() {
  const [rows, setRows] = useState<RowData[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [keyboardColors, setKeyboardColors] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    setRows(new Array(6).fill(null).map(() => createEmptyRow()));
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      if (gameOver) return;
      if (key === "ENTER") {
        if (currentInput.length === 5) {
          handleSubmit();
        }
      } else if (key === "BACKSPACE") {
        setCurrentInput((prev) => prev.slice(0, -1));
      } else if (/^[A-Z]$/.test(key) && currentInput.length < 5) {
        setCurrentInput((prev) => prev + key);
      }
    };

    // Adding the keydown listener
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentInput, gameOver]);

  function createEmptyRow(): RowData {
    return Object.fromEntries(
      Array.from({ length: 5 }, (_, i) => [
        `b${i + 1}` as const,
        { color: "gray", letter: "" },
      ])
    ) as RowData;
  }

  function handleKey(key: string) {
    if (gameOver) return;
    if (key === "Enter") {
      if (currentInput.length === 5) {
        handleSubmit();
      }
    } else if (key === "Backspace") {
      setCurrentInput((prev) => prev.slice(0, -1));
    } else if (/^[A-Z]$/.test(key) && currentInput.length < 5) {
      setCurrentInput((prev) => prev + key);
    }
  }

  function handleSubmit() {
    const guess = currentInput.toUpperCase();
    const newRows = [...rows];
    const rowIndex = newRows.findIndex(
      (row) => Object.values(row)[0].letter === ""
    );
    if (rowIndex === -1) return;

    const resultRow = { ...newRows[rowIndex] };
    const colorMap: Record<string, string> = { ...keyboardColors };

    const rowKeys: (keyof RowData)[] = ["b1", "b2", "b3", "b4", "b5"];

    for (let i = 0; i < 5; i++) {
      const key = rowKeys[i];
      const letter = guess[i];
      if (letter === targetWord[i]) {
        resultRow[key].color = "correct";
        colorMap[letter] = "correct";
      } else if (targetWord.includes(letter)) {
        resultRow[key].color = "present";
        if (colorMap[letter] !== "correct") colorMap[letter] = "present";
      } else {
        resultRow[key].color = "absent";
        if (!colorMap[letter]) colorMap[letter] = "absent";
      }
      resultRow[key].letter = letter;
    }

    newRows[rowIndex] = resultRow;
    setRows(newRows);
    setKeyboardColors(colorMap);
    setCurrentInput("");

    if (guess === targetWord) setGameOver(true);
    else if (rowIndex === 5) setGameOver(true);
  }

  const keys = [
    ..."QWERTYUIOP".split(""),
    ..."ASDFGHJKL".split(""),
    "Backspace",
    ..."ZXCVBNM".split(""),
    "Enter",
  ];

  // Function to update the current row with typed letters
  const updateCurrentRow = (input: string): RowData => {
    const currentRow = createEmptyRow();
    for (let i = 0; i < input.length; i++) {
      currentRow[`b${i + 1}` as keyof RowData].letter = input[i];
    }
    return currentRow;
  };

  return (
    <div>
      <div className="board">
        {rows.map((row, i) => (
          <Row
            key={i}
            data={
              i === rows.findIndex((r) => r.b1.letter === "")
                ? updateCurrentRow(currentInput)
                : row
            }
          />
        ))}
      </div>

      <div className="keyboard">
        {keys.map((k, i) => (
          <button
            key={i}
            className={`key ${keyboardColors[k] || ""}`}
            onClick={() => handleKey(k === "Backspace" ? "Backspace" : k)}>
            {k === "Backspace" ? "⌫" : k}
          </button>
        ))}
      </div>

      {gameOver && (
        <p style={{ color: "white", marginTop: "1rem" }}>
          {rows.some((row) =>
            Object.values(row).every(
              (block, idx) => block.letter === targetWord[idx]
            )
          )
            ? "🎉 You won!"
            : `😢 Game over! Word was ${targetWord}`}
        </p>
      )}
    </div>
  );
}
