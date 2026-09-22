"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringWidth = useMotionValue(36);

  // Smooth springs for the outer ring — bypass React state entirely
  const cursorXSpring = useSpring(0, { stiffness: 300, damping: 20 });
  const cursorYSpring = useSpring(0, { stiffness: 300, damping: 20 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Direct DOM update for the dot — no React re-render
    if (dotRef.current) {
      dotRef.current.style.transform = `translate3d(${e.clientX - 5}px, ${e.clientY - 5}px, 0)`;
    }
    // Spring-based update for the ring — no React re-render
    cursorXSpring.set(e.clientX);
    cursorYSpring.set(e.clientY);
  }, [cursorXSpring, cursorYSpring]);

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const isInteractive =
      target.tagName === "A" ||
      target.tagName === "BUTTON" ||
      target.closest("a") ||
      target.closest("button") ||
      target.closest(".tc") ||
      target.closest(".tcard") ||
      target.closest(".astat") ||
      target.closest("[role='button']");
    
    ringWidth.set(isInteractive ? 60 : 36);
  }, [ringWidth]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [handleMouseMove, handleMouseOver]);

  return (
    <>
      {/* Dot — uses direct DOM transform, zero re-renders */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-amber rounded-full mix-blend-difference pointer-events-none z-[9999]"
        style={{ willChange: "transform" }}
      />
      {/* Ring — uses motion values, zero re-renders */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-amber/50 pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: ringWidth,
          height: ringWidth,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
      />
    </>
  );
}
