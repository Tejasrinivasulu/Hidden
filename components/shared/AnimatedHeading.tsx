"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.055, delayChildren: 0.08 },
  },
};

const word: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

type Props = {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  accentWords?: string[];
  accentClassName?: string;
};

/** Word-stagger heading reveal used across landing sections. */
export default function AnimatedHeading({
  children,
  className = "",
  as = "h2",
  accentWords = [],
  accentClassName = "text-primary",
}: Props) {
  const Tag = motion[as];
  const words = children.trim().split(/\s+/);
  const accentSet = new Set(accentWords.map((w) => w.toLowerCase()));

  return (
    <Tag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      aria-label={children}
    >
      {words.map((w, i) => {
        const isAccent = accentSet.has(w.replace(/[^a-zA-Z]/g, "").toLowerCase());
        return (
          <motion.span
            key={`${w}-${i}`}
            variants={word}
            className={`inline-block ${isAccent ? accentClassName : ""}`}
            style={{ marginRight: i < words.length - 1 ? "0.28em" : 0 }}
          >
            {w}
          </motion.span>
        );
      })}
    </Tag>
  );
}

type LineProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/** Single-block heading fade/slide (for multi-line JSX headings). */
export function AnimatedHeadingBlock({
  children,
  className = "",
  delay = 0,
}: LineProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
