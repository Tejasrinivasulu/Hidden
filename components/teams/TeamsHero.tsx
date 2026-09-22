"use client";

import { motion } from "framer-motion";
import SpotlightCard from "@/components/ui/SpotlightCard";
import dynamic from 'next/dynamic';

const Ferrofluid = dynamic(() => import('@/components/ui/Ferrofluid'), {
  ssr: false,
});

export default function TeamsHero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-16 px-[5vw] overflow-hidden bg-[#071120]">
      {/* Background Ferrofluid Effect */}
      <div className="absolute inset-0 z-0">
        <Ferrofluid
          colors={['#2bb1cfff', '#cd131dff', '#612099ff']}
          speed={0.5}
          scale={1}
          turbulence={1}
          fluidity={0.1}
          rimWidth={0.2}
          sharpness={3}
          shimmer={1}
          glow={2}
          flowDirection="down"
          opacity={1}
          mouseInteraction={true}
          mouseStrength={1}
          mouseRadius={0.3}
          color1="#c724b2"
          color2="#c41919ff"
          color3="#21cdc7ff"
        />
      </div>

      {/* Background Gradient Mesh */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#6BE6FF] blur-[150px] rounded-full opacity-10 pointer-events-none z-0" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#7c3aed] blur-[150px] rounded-full opacity-10 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-[0.03] pointer-events-none z-0" />

      {/* Floating Particles Mock (simple CSS animation approach) */}
      <motion.div
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[30%] left-[20%] w-2 h-2 rounded-full bg-[#4ADE80] blur-[2px]"
      />
      <motion.div
        animate={{ y: [0, 30, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[60%] right-[25%] w-3 h-3 rounded-full bg-[#6BE6FF] blur-[2px]"
      />

      <div className="text-center max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="font-mono text-sm tracking-[4px] text-[#6BE6FF] uppercase font-bold mb-4 block">
            ISTE MBU Chapters
          </span>
          <h1 className="font-display text-[clamp(3rem,8vw,6rem)] font-bold text-white leading-tight uppercase tracking-tight drop-shadow-2xl">
            Meet Our <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6BE6FF] to-[#7c3aed]">Teams</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-6 text-[#B8C7D9] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          Seven specialized teams working together to drive innovation, creativity, organization, and technical excellence within the ISTE MBU Student Chapter.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-12"
        >
          <button
            onClick={() => scrollTo("teams")}
            className="px-8 py-4 bg-[#6BE6FF] text-[#071120] font-bold uppercase tracking-widest text-sm rounded-full shadow-[0_0_20px_rgba(107,230,255,0.4)] hover:shadow-[0_0_30px_rgba(107,230,255,0.6)] hover:scale-105 transition-all duration-300 w-full sm:w-auto"
          >
            Explore Teams
          </button>
          <button
            onClick={() => scrollTo("join")}
            className="px-8 py-4 bg-transparent border border-[rgba(255,255,255,0.2)] text-white font-bold uppercase tracking-widest text-sm rounded-full hover:border-[#6BE6FF] hover:bg-[#6BE6FF]/10 transition-all duration-300 w-full sm:w-auto"
          >
            Join ISTE
          </button>
        </motion.div>
      </div>
    </section>
  );
}


