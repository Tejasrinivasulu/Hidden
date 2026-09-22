"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import SpotlightCard from "@/components/ui/SpotlightCard";

const achievements = [
  {
    team: "Poster Team",
    stat: 120,
    suffix: "+",
    label: "Posters Designed",
    color: "#a855f7"
  },
  {
    team: "Social Media Team",
    stat: 500,
    suffix: "K+",
    label: "Digital Reach",
    color: "#ec4899"
  },
  {
    team: "Web Development Team",
    stat: 10,
    suffix: "+",
    label: "Digital Projects",
    color: "#06b6d4"
  },
  {
    team: "Management Team",
    stat: 25,
    suffix: "+",
    label: "Events Executed",
    color: "#14b8a6"
  }
];

export default function TeamAchievements() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-24 px-[5vw] bg-[#0B172A] relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left mb-16"
        >
          <span className="font-mono text-xs tracking-[4px] uppercase text-[#f59e0b] font-bold mb-2 block">
            Milestones
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-wide text-white">
            Team <span className="text-[#f59e0b]">Achievements</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((ach, idx) => (
            <motion.div
              key={ach.team}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="h-full group"
            >
              <SpotlightCard
                spotlightColor={`${ach.color}20`}
                className="bg-[#0F1F35] border border-[rgba(255,255,255,0.08)] rounded-[20px] p-8 h-full flex flex-col items-center justify-center text-center transition-all hover:border-[rgba(255,255,255,0.2)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative overflow-hidden"
              >
                <div
                  className="absolute inset-x-0 top-0 h-1 transition-all duration-300 group-hover:h-2"
                  style={{ backgroundColor: ach.color }}
                />

                <h3 className="font-mono text-sm tracking-[2px] uppercase text-[#B8C7D9] mb-4">
                  {ach.team}
                </h3>

                <div
                  className="w-full h-[1px] mb-6 opacity-30"
                  style={{ background: `linear-gradient(90deg, transparent, ${ach.color}, transparent)` }}
                />

                <div className="font-display text-5xl md:text-6xl font-black text-white mb-2 tracking-tight group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                  {inView ? (
                    <CountUp end={ach.stat} duration={2.5} separator="," />
                  ) : (
                    "0"
                  )}
                  <span style={{ color: ach.color }}>{ach.suffix}</span>
                </div>

                <div className="font-sans text-sm text-[#B8C7D9] uppercase tracking-wider font-medium">
                  {ach.label}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
