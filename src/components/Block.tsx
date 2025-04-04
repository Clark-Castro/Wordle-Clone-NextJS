"use client";
import { motion } from "framer-motion";

type BlockProps = {
  char: string;
  status?: "correct" | "present" | "absent";
  delay?: number;
};

export default function Block({ char, status, delay = 0 }: BlockProps) {
  return (
    <motion.div
      className={`block ${status || ""}`}
      initial={{ scale: 1, rotateX: 0 }}
      animate={{
        rotateX: char ? [0, 90, 0] : 0,
        scale: char ? [1, 1.1, 1] : 1,
      }}
      transition={{ duration: 0.6, delay: delay * 0.1 }}>
      <span className="block-letter">{char}</span>
    </motion.div>
  );
}
