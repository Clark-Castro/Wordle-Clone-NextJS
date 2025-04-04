"use client";
import useGameStore from "@/store/game";
import StatBox from "@/components/StatBox";

export default function StatsModal() {
  const stats = useGameStore((state) => state.stats);

  return (
    <div className="stats-modal">
      <h3>Statistics</h3>
      <div className="stats-grid">
        <StatBox title="Played" value={stats.played} />
        <StatBox
          title="Win %"
          value={Math.round((stats.wins / stats.played) * 100) || 0}
        />
        <StatBox title="Current Streak" value={stats.streak} />
        <StatBox title="Max Streak" value={stats.maxStreak} />
      </div>
    </div>
  );
}
