import Block from "./Block";

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
    <div className="row">
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <Block
            key={index}
            char={guess[index] || ""}
            status={isSubmitted ? getStatus(index) : undefined}
            delay={index}
          />
        ))}
    </div>
  );
}
