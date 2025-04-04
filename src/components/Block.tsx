"use client";
import { useEffect, useState } from "react";
import { BlockData } from "@/types";

export default function Block({ color, letter }: BlockData) {
  const [bgColor, setBgColor] = useState("var(--gray-col)");
  const [borderColor, setBorderColor] = useState("var(--gray-col)");

  useEffect(() => {
    const colorMap: Record<string, string> = {
      correct: "var(--green-col)",
      present: "var(--yellow-col)",
      absent: "#3a3a3c",
      gray: "#121213",
    };
    setBgColor(colorMap[color] || "#121213");
    setBorderColor(color !== "gray" ? "transparent" : "#3a3a3c");
  }, [color]);

  return (
    <div
      style={{
        width: "64px",
        height: "64px",
        margin: "4px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: bgColor,
        border: `2px solid ${borderColor}`,
        fontSize: "2rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        color: "white",
        transition: "background-color 0.3s ease, border 0.3s ease",
      }}>
      {letter}
    </div>
  );
}
