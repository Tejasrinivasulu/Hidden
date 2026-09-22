"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const spotlightTeams = [
  {
    id: "spot-1",
    name: "Web Development Team",
    description: "Built and maintained the ISTE digital ecosystem, delivering a seamless experience for 1000+ users.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200",
    color: "#6BE6FF"
  },
  {
    id: "spot-2",
    name: "Poster Team",
    description: "Designed 120+ stunning visuals for major college fests and technical workshops.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200",
    color: "#a855f7" // Purple
  },
  {
    id: "spot-3",
    name: "Management Team",
    description: "Successfully executed the biggest technical fest of the year with zero operational delays.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200",
    color: "#4ADE80" // Green
  }
];

export default function TeamSpotlight() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % spotlightTeams.length);
    }, 9000); // 9 seconds rotation as requested
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  return (
    <section className="py-24 px-[5vw] bg-[#071120] relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center md:text-left flex items-center justify-center md:justify-start gap-3">
          <span className="text-2xl">⭐</span>
          <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-white">
            Spotlight
          </h2>
        </div>

        <div className="relative h-[400px] md:h-[500px] rounded-[30px] overflow-hidden border border-[rgba(255,255,255,0.08)] bg-[#0B172A]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={spotlightTeams[currentIndex].image}
                alt={spotlightTeams[currentIndex].name}
                className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071120] via-[#071120]/80 to-transparent" />
              <div
                className="absolute inset-0 opacity-20 blur-[100px]"
                style={{ backgroundColor: spotlightTeams[currentIndex].color }}
              />

              <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end z-10">
                <span className="font-mono text-xs uppercase tracking-[4px] mb-4 block" style={{ color: spotlightTeams[currentIndex].color }}>
                  Team of the Month
                </span>
                <h3 className="font-display text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-4 drop-shadow-lg">
                  {spotlightTeams[currentIndex].name}
                </h3>
                <p className="text-[#B8C7D9] text-lg md:text-xl max-w-2xl leading-relaxed">
                  {spotlightTeams[currentIndex].description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Indicators */}
          <div className="absolute bottom-8 right-8 flex gap-2 z-20">
            {spotlightTeams.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex ? "w-8 bg-white" : "w-3 bg-white/20 hover:bg-white/40"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


