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
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const Game = useGameStore();

  useEffect(() => {
    setIsMounted(true);

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();

      if (e.key === "Enter") Game.submitGuess();
      else if (e.key === "Backspace") Game.removeLetter();
      else if (/^[a-zA-Z]$/.test(e.key)) Game.addLetter(e.key.toUpperCase());
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [Game]);

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
            guess={
              i === Game.guesses.length
                ? Game.currentGuess
                : Game.guesses[i] || ""
            }
            targetWord={Game.targetWord}
            isSubmitted={i < Game.guesses.length}
          />
        ))}
      </div>

      <Keyboard />
      {Game.gameStatus !== "playing" && <StatsModal />}
    </motion.main>
  );
}
