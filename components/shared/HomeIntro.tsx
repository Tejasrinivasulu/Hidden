"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

/**
 * Intro seal — ISTE logo only (no decorative rings)
 */
export default function HomeIntro() {
  const [show, setShow] = useState(true);
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    if (!show) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const toOut = setTimeout(() => setPhase("out"), 2400);
    const toHide = setTimeout(() => setShow(false), 3400);

    return () => {
      clearTimeout(toOut);
      clearTimeout(toHide);
      document.body.style.overflow = "";
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="iste-seal-intro"
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
          style={{ background: "#ffffff" }}
          initial={{ opacity: 1 }}
          animate={
            phase === "out"
              ? { opacity: 0, scale: 1.08 }
              : { opacity: 1, scale: 1 }
          }
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: [0.65, 0, 0.35, 1] }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 48%, rgba(30, 79, 214, 0.18) 0%, rgba(120, 170, 255, 0.1) 42%, rgba(255, 255, 255, 0.92) 68%, #ffffff 100%), linear-gradient(160deg, #e8f0ff 0%, #ffffff 45%, #dbe7ff 100%)",
            }}
          />

          <motion.div
            className="relative flex items-center justify-center"
            style={{ perspective: 1000 }}
            initial={{ scale: 0.55, opacity: 0 }}
            animate={
              phase === "out"
                ? { scale: 1.35, opacity: 0 }
                : { scale: 1, opacity: 1 }
            }
            transition={
              phase === "out"
                ? { duration: 0.85, ease: [0.65, 0, 0.35, 1] }
                : { duration: 1.05, ease: [0.22, 1, 0.36, 1] }
            }
          >
            <motion.div
              className="relative flex items-center justify-center"
              style={{ transformStyle: "preserve-3d" }}
              initial={{ rotateY: -90 }}
              animate={
                phase === "out"
                  ? { rotateY: 90 }
                  : { rotateY: [0, 180, 360] }
              }
              transition={
                phase === "out"
                  ? { duration: 0.7, ease: [0.65, 0, 0.35, 1] }
                  : {
                      rotateY: {
                        duration: 2.2,
                        ease: "easeInOut",
                        times: [0, 0.5, 1],
                      },
                    }
              }
            >
              <motion.div
                aria-hidden
                className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(30,79,214,0.35) 0%, transparent 68%)",
                  filter: "blur(16px)",
                }}
                animate={{ opacity: [0.35, 0.7, 0.4] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />

              <motion.div
                className="relative z-10 h-[240px] w-[240px] overflow-hidden rounded-full bg-white sm:h-[260px] sm:w-[260px]"
                style={{
                  boxShadow:
                    "0 0 0 1px rgba(30,79,214,0.25), 0 0 28px rgba(30,79,214,0.28), inset 0 0 40px rgba(30,79,214,0.06)",
                }}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src="/logo-2.png"
                  alt="ISTE"
                  width={400}
                  height={400}
                  priority
                  className="h-full w-full translate-y-[6%] scale-[1.25] object-cover"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
