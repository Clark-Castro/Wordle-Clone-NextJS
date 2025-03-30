import Block from "./Block";
import { RowData } from "@/types";

export default function Row({ data }: { data: RowData }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      {Object.entries(data).map(([key, block]) => (
        <Block key={key} color={block.color} letter={block.letter} />
      ))}
    </div>
  );
}
