import { ReactNode } from "react";

type StatBoxProps = {
  title: string;
  value: ReactNode;
};

export default function StatBox({ title, value }: StatBoxProps) {
  return (
    <div className="stat-box">
      <div className="stat-value">{value}</div>
      <div className="stat-title">{title}</div>
    </div>
  );
}
