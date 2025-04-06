"use client";
import "./styles.css";
import { motion } from "framer-motion";

type BlockProps = {
  char: string;
  status?: "correct" | "present" | "absent";
};

export default function Block({ char, status }: BlockProps) {
  return (
    <motion.div
      className={`block ${status || ""} flex-center font-large`}
      initial={{ scale: 1 }}
      animate={{ scale: char ? [1, 1.9, 1] : 1 }}
      transition={{ duration: 0.2 }}>
      {char}
    </motion.div>
  );
}
