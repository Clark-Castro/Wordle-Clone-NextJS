"use client";
import Row from "@/components/Row";
import { useEffect, useState } from "react";
import { RowData } from "@/types";

export default function Home() {
  const [data, setData] = useState<RowData | null>(null);

  useEffect(() => {
    setData(
      Object.fromEntries(
        Array.from({ length: 5 }, (_, i) => [
          `b${i + 1}`,
          { color: "gray", letter: "a" },
        ])
      ) as RowData
    );
  }, []);

  return (
    data && (
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}>
        <Row data={data} />
      </div>
    )
  );
}
