"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-white"
        >
          {/* Soft light wash */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 45%, rgba(59,130,246,0.14) 0%, rgba(168,85,247,0.06) 42%, transparent 70%)",
            }}
          />

          {/* Transparent ISTE logo watermark */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[min(70vw,420px)] w-[min(70vw,420px)] -translate-x-1/2 -translate-y-1/2 opacity-[0.12]"
          >
            <Image
              src="/iste-logo-official.png"
              alt=""
              fill
              className="object-contain"
              priority
            />
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative mb-6"
          >
            <div className="absolute inset-0 bg-[#3b82f6] opacity-25 blur-[48px]" />
            <h1 className="relative z-10 font-display text-5xl font-black tracking-widest text-[#0f172a] md:text-7xl">
              ISTE
            </h1>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative z-10 flex gap-4 font-mono text-xs font-semibold tracking-[4px] text-[#2563eb] uppercase md:text-sm"
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
