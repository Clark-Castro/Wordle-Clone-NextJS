"use client";

type StatBoxProps = {
  title: string;
  value: number;
};

export default function StatBox({ title, value }: StatBoxProps) {
  return (
    <div className="stat-box flex-col-center gap-normal">
      <div className="font-normal">{value}</div>
      <div className="stat-title font-small">{title}</div>
    </div>
  );
}
