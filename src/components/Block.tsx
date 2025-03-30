"use client";
import { useEffect, useState } from "react";
import { BlockData } from "@/types";

export default function Block({ color, letter }: BlockData) {
  const [bgColor, setBgColor] = useState("var(--gray-col)");

  useEffect(() => {
    setBgColor(
      color === "correct"
        ? "var(--green-col)"
        : color === "present"
        ? "var(--yellow-col)"
        : "var(--gray-col)"
    );
  }, [color]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "80px",
        height: "100px",
        backgroundColor: bgColor,
        margin: "0.5rem",
        fontSize: "5rem",
        fontWeight: "900",
        color: "white",
        userSelect: "none",
      }}>
      {letter}
    </div>
  );
}
