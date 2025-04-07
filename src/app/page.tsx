"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import useGameStore from "@/store/game";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import Row from "@/components/GameGrid/Row";
import StatsModal from "@/components/StatsModal/StatsModal";

const Keyboard = dynamic(() => import("@/components/Keyboard/Keyboard"), {
  ssr: false,
  loading: () => <div className="keyboard-placeholder" />,
});

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
