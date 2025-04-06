"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import useGameStore from "@/store/game";
import Row from "@/components/Row";
import StatsModal from "@/components/StatsModal";
import ThemeToggle from "@/components/ThemeToggle";

const Keyboard = dynamic(() => import("@/components/Keyboard"), { ssr: false });

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const {
    targetWord,
    guesses,
    currentGuess,
    gameStatus,
    addLetter,
    removeLetter,
    submitGuess,
    newGame,
  } = useGameStore();

  useEffect(() => {
    setIsMounted(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();

      if (e.key === "Enter") {
        submitGuess();
      } else if (e.key === "Backspace") {
        removeLetter();
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        addLetter(e.key.toUpperCase());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isMounted) {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="game-container">
      <ThemeToggle />

      <div className="game-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <Row
            key={i}
            guess={guesses[i] || (i === guesses.length ? currentGuess : "")}
            targetWord={targetWord}
            isSubmitted={i < guesses.length}
          />
        ))}
      </div>

      <Keyboard />

      {gameStatus !== "playing" && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="game-over-modal">
          <button onClick={newGame} className="new-game-button">
            New Game
          </button>
          <StatsModal />
        </motion.div>
      )}
    </motion.main>
  );
}
