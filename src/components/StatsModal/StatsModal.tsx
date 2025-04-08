"use client";
import "./styles.css";
import { motion } from "framer-motion";
import { useGameActions, useGameStats, useTargetWord } from "@/store/game";
import StatBox from "@/components/StatsModal/StatBox";

export default function StatsModal() {
  const targetWord = useTargetWord();
  const stats = useGameStats();
  const { newGame } = useGameActions();

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="stats-modal flex-col-center gap-large">
      <h2>The Answer is : {targetWord}</h2>
      <div className="flex-center flex-wrap gap-large">
        <StatBox title="Played" value={stats.played} />
        <StatBox
          title="Win %"
          value={Math.round((stats.wins / stats.played) * 100) || 0}
        />
        <StatBox title="Current Streak" value={stats.streak} />
        <StatBox title="Max Streak" value={stats.maxStreak} />
      </div>
      <button onClick={newGame} className="newgame-button font-normal">
        New Game
      </button>
    </motion.div>
  );
}
