"use client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Keyboard({ dispatch }: any) {
  const keys = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        maxWidth: "500px",
        justifyContent: "center",
        gap: "0.5rem",
      }}>
      {keys.map((key) => (
        <button
          key={key}
          onClick={() =>
            dispatch({ type: "SET_LETTER", payload: key.toLowerCase() })
          }>
          {key}
        </button>
      ))}
      <button onClick={() => dispatch({ type: "SUBMIT" })}>Enter</button>
      <button onClick={() => dispatch({ type: "BACKSPACE" })}>⌫</button>
    </div>
  );
}
