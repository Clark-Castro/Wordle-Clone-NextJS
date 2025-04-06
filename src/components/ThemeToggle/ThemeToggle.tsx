"use client";
import "./styles.css";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="theme-toggle font-large"
      aria-label="Toggle Theme">
      {theme === "dark" ? "☀️" : "🌙"}
    </div>
  );
}
