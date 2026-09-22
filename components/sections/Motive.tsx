"use client";

import { motion } from "framer-motion";
import { Lightbulb, Microscope, Handshake, Globe, Rocket, Trophy } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";
import BorderGlow from "@/components/ui/BorderGlow";

const objectives = [
  { icon: Lightbulb, text: "Encourage innovation and creativity" },
  { icon: Microscope, text: "Conduct technical workshops and events" },
  { icon: Handshake, text: "Improve leadership and teamwork skills" },
  { icon: Globe, text: "Connect students with industry experts" },
  { icon: Rocket, text: "Promote practical learning" },
  { icon: Trophy, text: "Foster collaboration and networking" },
];

export default function Motive() {
  return (
    <section id="motive" className="py-28 px-[5vw] bg-ink relative overflow-hidden">
      {/* Huge Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[26vw] font-black text-white/[0.012] pointer-events-none select-none whitespace-nowrap tracking-[-2vw] z-0">
        ISTE
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9 }}
      >
        <span className="font-mono text-[0.6rem] tracking-[5px] text-amber mb-3 block uppercase">
          // 02 — Purpose
        </span>
        <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] tracking-[2px] uppercase leading-none text-paper">
          Motive of
          <br />
          <span className="text-amber">ISTE</span>
        </h2>
        <div className="w-[50px] h-[2px] bg-gradient-to-r from-amber to-electric my-6 rounded-sm mb-16" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Mission & Vision */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-6">
            <BorderGlow glowColor="232 160 32" className="!p-0 w-full h-full">
              <SpotlightCard spotlightColor="rgba(232, 160, 32, 0.15)" className="p-7 border border-border rounded-[4px] relative overflow-hidden transition-colors duration-300 hover:border-amber/50 group w-full h-full">
                <div className="absolute top-0 left-0 w-[3px] h-full bg-amber" />
                <span className="font-mono text-[0.6rem] tracking-[4px] text-amber mb-3 block uppercase">
                  🔭 Vision
                </span>
                <p className="text-[0.95rem] leading-[1.7] text-paper/70">
                  <em className="text-paper italic font-serif">
                    "To create technically skilled and innovative students capable of
                    solving real-world challenges."
                  </em>
                </p>
              </SpotlightCard>
            </BorderGlow>
            <BorderGlow glowColor="232 160 32" className="!p-0 w-full h-full">
              <SpotlightCard spotlightColor="rgba(232, 160, 32, 0.15)" className="p-7 border border-border rounded-[4px] relative overflow-hidden transition-colors duration-300 hover:border-amber/50 group w-full h-full">
                <div className="absolute top-0 left-0 w-[3px] h-full bg-amber" />
                <span className="font-mono text-[0.6rem] tracking-[4px] text-amber mb-3 block uppercase">
                  🎯 Mission
                </span>
                <p className="text-[0.95rem] leading-[1.7] text-paper/70">
                  <em className="text-paper italic font-serif">
                    "To provide opportunities for learning, leadership, teamwork, and
                    technical growth through events and activities."
                  </em>
                </p>
              </SpotlightCard>
            </BorderGlow>
          </div>
        </motion.div>

        {/* Objectives */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
        >
          <span className="font-mono text-[0.6rem] tracking-[5px] text-amber mb-5 block uppercase">
            Objectives
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {objectives.map((obj, i) => (
              <BorderGlow key={i} glowColor="232 160 32" className="!p-0 h-full w-full">
                <SpotlightCard spotlightColor="rgba(232, 160, 32, 0.15)" className="flex items-start gap-4 p-5 border border-white/5 rounded-[4px] transition-all duration-300 hover:border-border hover:bg-amber/5 w-full h-full">
                  <obj.icon className="w-6 h-6 text-amber shrink-0 mt-0.5" />
                  <span className="text-[0.85rem] leading-[1.5] text-paper/65">
                    {obj.text}
                  </span>
                </SpotlightCard>
              </BorderGlow>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
