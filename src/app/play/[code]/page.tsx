"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  useCurrentGuess,
  useGameActions,
  useGameStatus,
  useGuesses,
  useTargetWord,
} from "@/store/game";
import { decryptWord } from "@/lib/WordUtils";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import StatsModal from "@/components/StatsModal/StatsModal";
import Row from "@/components/GameGrid/Row";

const Keyboard = dynamic(() => import("@/components/Keyboard/Keyboard"), {
  ssr: false,
  loading: () => <div className="keyboard-placeholder" />,
});

export default function PlayPage() {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const router = useRouter();
  const targetWord = useTargetWord();
  const guesses = useGuesses();
  const currentGuess = useCurrentGuess();
  const gameStatus = useGameStatus();
  const { newGame, addLetter, removeLetter, submitGuess } = useGameActions();

  useEffect(() => {
    setIsMounted(true);

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();

      if (e.key === "Enter") submitGuess();
      else if (e.key === "Backspace") removeLetter();
      else if (/^[a-zA-Z]$/.test(e.key)) addLetter(e.key.toUpperCase());
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [addLetter, removeLetter, submitGuess]);

  useEffect(() => {
    try {
      const decWord = decryptWord();
      if (decWord.length != 5) router.push("/");
      else newGame(decWord.toUpperCase());
    } catch {
      router.replace("/");
    }
  }, [newGame, router]);

  if (!isMounted || !targetWord) {
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
            focusIndex={i}
            guess={i === guesses.length ? currentGuess : guesses[i] || ""}
            targetWord={targetWord}
            isSubmitted={i < guesses.length}
          />
        ))}
      </div>

      <Keyboard />
      {gameStatus !== "playing" && <StatsModal mode="done" />}
    </motion.main>
  );
}
