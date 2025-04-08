"use client";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import StatsModal from "@/components/StatsModal/StatsModal";
import { useState, useEffect } from "react";

export default function Home() {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <h1 className="height-max flex-center">Loading...</h1>;
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="height-max flex-col-center gap-large">
      <ThemeToggle />
      <StatsModal mode="" />
    </motion.main>
  );
}
