import "./styles.css";

export default function ToolTip({ text }: { text: string }) {
  return <div className="tooltip">{text ? text : "Loading..."}</div>;
}
