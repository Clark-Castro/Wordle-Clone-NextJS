"use client";
import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

type ConfettiProps = {
  active: boolean;
};

export default function Confetti({ active }: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMounted = useRef(false);

  useEffect(() => {
    if (active && canvasRef.current && !isMounted.current) {
      isMounted.current = true;
      const myConfetti = confetti.create(canvasRef.current, {
        resize: true,
        useWorker: true,
      });

      // Basic confetti burst
      const count = 200;
      const defaults = {
        origin: { y: 0.7 },
        particleCount: 100,
        startVelocity: 30,
        spread: 360,
      };

      // Multiple bursts with different colors and angles
      const fire = (particleRatio: number, opts: confetti.Options) => {
        myConfetti(
          Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio),
          })
        );
      };

      // Main burst
      fire(0.25, {
        spread: 26,
        startVelocity: 55,
        colors: ["#538d4e", "#b59f3b", "#3a3a3c"],
      });

      fire(0.2, {
        spread: 60,
        startVelocity: 45,
      });

      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
        colors: ["#538d4e"],
      });

      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      });

      // Random bursts
      const interval = setInterval(() => {
        if (!isMounted.current) return clearInterval(interval);

        myConfetti({
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          origin: {
            x: Math.random(),
            y: Math.random() * 0.5 + 0.2,
          },
          colors: ["#538d4e", "#b59f3b", "#3a3a3c"],
        });
      }, 1000);

      return () => {
        isMounted.current = false;
        clearInterval(interval);
      };
    }
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        pointerEvents: "none",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 9999,
      }}
    />
  );
}
