"use client";
import "./styles.css";
import { motion } from "framer-motion";
import {
  useGameActions,
  useGameStats,
  useGuesses,
  useTargetWord,
} from "@/store/game";
import StatBox from "@/components/StatsModal/StatBox";
import { useEffect, useState } from "react";

export default function StatsModal() {
  const targetWord = useTargetWord();
  const [definition, setDefinition] = useState<
    Record<string, string> | undefined
  >();
  const stats = useGameStats();
  const { newGame } = useGameActions();
  const guesses = useGuesses();
  const [shareButtonText, setShareButtonText] = useState("Share");

  useEffect(() => {
    const fetcher = async () => {
      const result = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${targetWord}`
      );
      const Def = (await result.json())[0];
      setDefinition({
        audio: Def?.phonetics[0]?.audio || Def?.phonetics[1]?.audio || "",
        meaning: Def?.meanings[0]?.definitions[0]?.definition,
      });
      return;
    };
    fetcher();
  }, [targetWord]);

  const handleShareButton = () => {
    let clip = "";
    for (let i = 0; i < guesses.length; i++) {
      for (let j = 0; j < 5; j++)
        if (guesses[i][j] === targetWord[j]) clip = clip + "🟩";
        else if (targetWord.includes(guesses[i][j])) clip = clip + "🟨";
        else clip = clip + "⬜";

      clip = clip + "\n";
    }
    navigator.clipboard.writeText(clip);
    setShareButtonText("Copied!");
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="stats-modal flex-col-center gap-large">
      <h2>
        The Answer is : {targetWord}
        {definition?.audio && <audio src={definition.audio} controls={true} />}
      </h2>
      <h3 className="word-def">Definition: {definition?.meaning}</h3>
      <div
        className="flex-center flex-wrap gap-large"
        style={{ maxWidth: "35rem" }}>
        <StatBox title="Played" value={stats.played} />
        <StatBox
          title="Win %"
          value={Math.round((stats.wins / stats.played) * 100) || 0}
        />
        <StatBox title="Current Streak" value={stats.streak} />
        <StatBox title="Max Streak" value={stats.maxStreak} />
        <button
          onClick={newGame}
          className="newgame-button flex-center font-small">
          New Game
        </button>
        <button
          className="newgame-button flex-center font-small"
          onClick={() => handleShareButton()}>
          {shareButtonText}
        </button>
      </div>
    </motion.div>
  );
}
