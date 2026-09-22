"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
  { label: "Specialized Teams", value: 7, suffix: "" },
  { label: "Active Volunteers", value: 50, suffix: "+" },
  { label: "Events Organized", value: 25, suffix: "+" },
  { label: "Students Impacted", value: 1000, suffix: "+" },
];

export default function TeamStats() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="statistics" className="py-16 px-[5vw] bg-[#0B172A] relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(107,230,255,0.3)] to-transparent" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="font-mono text-xs tracking-[4px] uppercase text-[#4ADE80] font-bold">
            Impact & Reach
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-white mt-2 font-bold uppercase tracking-wide">
            Our Collective Force
          </h2>
        </motion.div>

        {/* 2x2 on Mobile, 4-col on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative bg-[#0F1F35] border border-[rgba(255,255,255,0.05)] p-6 md:p-8 rounded-[20px] flex flex-col items-center justify-center text-center hover:-translate-y-2 transition-all duration-300 hover:border-[#6BE6FF]/30 overflow-hidden"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#6BE6FF]/0 to-[#6BE6FF]/0 group-hover:from-[#6BE6FF]/10 group-hover:to-transparent transition-all duration-500 pointer-events-none" />

              <div className="font-mono text-3xl md:text-5xl font-bold text-white mb-2 relative z-10 group-hover:text-[#6BE6FF] transition-colors duration-300 drop-shadow-[0_0_10px_rgba(107,230,255,0)] group-hover:drop-shadow-[0_0_15px_rgba(107,230,255,0.4)]">
                {inView ? (
                  <CountUp end={stat.value} duration={2.5} separator="," />
                ) : (
                  "0"
                )}
                <span className="text-[#6BE6FF]">{stat.suffix}</span>
              </div>
              <div className="font-sans text-xs md:text-sm text-[#B8C7D9] uppercase tracking-wider relative z-10">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
