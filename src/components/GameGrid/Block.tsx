"use client";
import "./styles.css";
import { motion } from "framer-motion";

type BlockProps = {
  char: string;
  status?: "correct" | "present" | "absent";
  focus: boolean;
};

export default function Block({ char, status, focus }: BlockProps) {
  return (
    <motion.div
      className={`block ${status || ""} flex-center font-large`}
      initial={{ scale: 1 }}
      animate={{
        scale: char ? [1, 1.9, 1] : focus ? 1.1 : 1,
        border: focus ? "5px solid var(--correct)" : "",
      }}
      transition={{ duration: 0.2 }}>
      {char}
    </motion.div>
  );
}
