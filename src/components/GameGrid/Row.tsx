"use client";
import Block from "@/components/GameGrid/Block";

type RowProps = {
  guess: string;
  targetWord: string;
  isSubmitted: boolean;
};

export default function Row({ guess, targetWord, isSubmitted }: RowProps) {
  const getStatus = (index: number) => {
    const letter = guess[index];
    if (letter === targetWord[index]) return "correct";
    return targetWord.includes(letter) ? "present" : "absent";
  };

  return (
    <div className="flex-center gap-normal">
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <Block
            key={index}
            char={guess[index] || ""}
            status={isSubmitted ? getStatus(index) : undefined}
          />
        ))}
    </div>
  );
}
