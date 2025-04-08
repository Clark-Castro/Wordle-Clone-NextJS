"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  useCurrentGuess,
  useGameActions,
  useGameStatus,
  useGuesses,
  useTargetWord,
} from "@/store/game";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import Row from "@/components/GameGrid/Row";
import StatsModal from "@/components/StatsModal/StatsModal";

const Keyboard = dynamic(() => import("@/components/Keyboard/Keyboard"), {
  ssr: false,
  loading: () => <div className="keyboard-placeholder" />,
});

export default function Home() {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const targetWord = useTargetWord();
  const guesses = useGuesses();
  const currentGuess = useCurrentGuess();
  const gameStatus = useGameStatus();
  const { addLetter, removeLetter, submitGuess } = useGameActions();

  useEffect(() => {
    setIsMounted(true);

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();

      if (e.key === "Enter") submitGuess();
      else if (e.key === "Backspace") removeLetter();
      else if (/^[a-zA-Z]$/.test(e.key)) addLetter(e.key.toUpperCase());
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [addLetter, removeLetter, submitGuess]);

  if (!isMounted) {
    return <h1 className="height-max flex-center">Loading...</h1>;
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="height-max flex-col-center gap-large">
      <ThemeToggle />

      <div className="flex-col-center gap-normal">
        {Array.from({ length: 6 }).map((_, i) => (
          <Row
            key={i}
            guess={i === guesses.length ? currentGuess : guesses[i] || ""}
            targetWord={targetWord}
            isSubmitted={i < guesses.length}
          />
        ))}
      </div>

      <Keyboard />
      {gameStatus !== "playing" && <StatsModal />}
    </motion.main>
  );
}
