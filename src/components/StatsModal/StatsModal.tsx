"use client";
import "./styles.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useGameStats, useGuesses, useTargetWord } from "@/store/game";
import { encryptWord, generateWord } from "@/lib/WordUtils";
import StatBox from "@/components/StatsModal/StatBox";
import ToolTip from "@/components/ToolTip/ToolTip";

export default function StatsModal({ mode }: { mode: string }) {
  const router = useRouter();
  const targetWord = useTargetWord();
  const [definition, setDefinition] = useState<
    Record<string, string> | undefined
  >();
  const stats = useGameStats();
  const guesses = useGuesses();
  const [shareButtonText, setShareButtonText] = useState("Share");
  const [clipboardText, setClipboardText] = useState("");

  useEffect(() => {
    const fetcher = async () => {
      let result;
      try {
        result = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${targetWord.toLowerCase()}`
        );
        const Def = (await result.json())[0];
        setDefinition({
          audio: Def?.phonetics[0]?.audio || Def?.phonetics[1]?.audio || "",
          meaning: Def?.meanings[0]?.definitions[0]?.definition || "",
        });
      } catch {
        setDefinition({
          audio: "Error",
          meaning: "Error",
        });
      }
      return;
    };
    fetcher();
  }, [targetWord]);

  const handleNewGameButton = () => {
    const word = generateWord();
    const url = "/play/" + encryptWord(word);
    router.replace(url);
  };

  const handleShareButton = (click: boolean) => {
    let clip =
      "The Link To This Word: " + String(window.location) + "\n\nMy Attempt:\n";
    for (let i = 0; i < guesses.length; i++) {
      for (let j = 0; j < 5; j++)
        if (guesses[i][j] === targetWord[j]) clip = clip + "🟩";
        else if (targetWord.includes(guesses[i][j])) clip = clip + "🟨";
        else clip = clip + "⬜";

      clip = clip + "\n";
    }
    setClipboardText(clip);
    if (click) {
      navigator.clipboard.writeText(clip);
      setShareButtonText("Copied!");
    }
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="stats-modal flex-col-center gap-large">
      {mode && <h2>The Answer is : {targetWord}</h2>}
      {mode && (
        <div className="flex-center">
          {definition === undefined ? (
            <h3>Loading Audio File...</h3>
          ) : definition?.audio === "" ? (
            <h3>No Audio File Is Available.</h3>
          ) : definition?.audio === "Error" ? (
            <h3>Failed To Fetch Audio File</h3>
          ) : (
            <audio src={definition?.audio} controls={true} />
          )}
        </div>
      )}
      {mode && (
        <div className="flex-center">
          {definition === undefined ? (
            <h3>Loading Definition...</h3>
          ) : definition?.meaning === "" ? (
            <h3>No Definition Is Available.</h3>
          ) : definition?.meaning === "Error" ? (
            <h3>Failed To Fetch Definition</h3>
          ) : (
            <h3 className="word-def">Definition: {definition?.meaning}</h3>
          )}
        </div>
      )}
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
          onClick={handleNewGameButton}
          className="newgame-button flex-center font-small">
          New Game
        </button>
        {mode && (
          <button
            className="newgame-button flex-center font-small"
            onClick={() => handleShareButton(true)}
            onMouseEnter={() => handleShareButton(false)}>
            {shareButtonText}
            <ToolTip text={clipboardText} />
          </button>
        )}
      </div>
    </motion.div>
  );
}
