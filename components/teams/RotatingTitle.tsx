"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TITLES = ["ISTE Leadership", "Meet Our Leaders", "ISTE Community"] as const;

type Props = {
  className?: string;
  gradientClassName?: string;
  as?: "h1" | "h2";
  style?: CSSProperties;
};

export default function RotatingTitle({
  className = "",
  gradientClassName = "bg-gradient-to-r from-[#1d4ed8] via-[#4f46e5] to-[#a855f7] bg-clip-text text-transparent",
  as = "h1",
  style,
}: Props) {
  const [index, setIndex] = useState(0);
  const Tag = as;

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % TITLES.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const title = TITLES[index];
  const parts = title.split(" ");
  const last = parts.pop()!;
  const lead = parts.join(" ");

  return (
    <Tag className={`relative overflow-hidden ${className}`} style={style}>
      <AnimatePresence mode="wait">
        <motion.span
          key={title}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block whitespace-nowrap"
        >
          {lead ? `${lead} ` : null}
          <span className={gradientClassName}>{last}</span>
        </motion.span>
      </AnimatePresence>
    </Tag>
  );
}
