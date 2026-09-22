"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide quickly as requested (max 1.5s)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#071120]"
        >
          {/* Glowing Logo representation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative mb-6"
          >
            <div className="absolute inset-0 bg-[#6BE6FF] blur-[40px] opacity-20" />
            <h1 className="font-display text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 relative z-10 tracking-widest">
              ISTE
            </h1>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-4 font-mono text-xs md:text-sm tracking-[4px] uppercase text-[#6BE6FF]"
          >
            <span>Innovate</span>
            <span>•</span>
            <span>Learn</span>
            <span>•</span>
            <span>Lead</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
