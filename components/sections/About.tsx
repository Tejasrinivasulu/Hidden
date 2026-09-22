"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SpotlightCard from "@/components/ui/SpotlightCard";
import BorderGlow from "@/components/ui/BorderGlow";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Hook into scroll progress of this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Dynamic parallax scroll transformations mapping progress to offsets
  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40]); // Card 1 (Top-Left)
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]); // Card 2 (Right)
  const y3 = useTransform(scrollYProgress, [0, 1], [30, -30]); // Card 3 (Bottom-Left)

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-28 px-[5vw] bg-surface2 relative overflow-hidden border-t border-primary/20 transition-colors duration-500"
    >
      {/* Background Glow Ring */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        {/* Parallax 3-Image Stack (Left side) */}
        <div className="relative h-[400px] sm:h-[520px] w-full max-w-[550px] mx-auto">
          {/* Card 1: Technical Workshops (pic-1.jpeg) */}
          <motion.div
            style={{ y: y1 }}
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute top-0 left-0 w-[72%] h-[58%] rounded-lg overflow-hidden border border-border shadow-[16px_16px_0_rgba(0,0,0,0.3)] bg-slate-900 group hover:border-primary hover:shadow-[0_0_30px_rgba(0,255,200,0.25)] transition-all duration-300 -rotate-[1deg]"
          >
            <div className="w-full h-full relative">
              <img 
                src="/pic-1.jpeg" 
                alt="Technical Workshops" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 pointer-events-none" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent z-10" />
              <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-1 z-20">
                <span className="font-mono text-[0.62rem] tracking-[4px] text-primary uppercase font-bold">
                  Workshops
                </span>
                <h3 className="font-display text-lg tracking-[1px] text-white uppercase leading-tight">
                  Technical Events
                </h3>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Student Collaboration (pic-2.jpeg) */}
          <motion.div
            style={{ y: y2 }}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="absolute top-[20%] right-0 w-[52%] h-[48%] rounded-lg overflow-hidden border border-border shadow-[-12px_12px_0_rgba(0,0,0,0.25)] bg-slate-900 group hover:border-primary hover:shadow-[0_0_30px_rgba(0,255,200,0.25)] transition-all duration-300 rotate-[1.5deg]"
          >
            <div className="w-full h-full relative">
              <img 
                src="/pic-2.jpeg" 
                alt="Student Collaboration" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 pointer-events-none" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent z-10" />
              <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-1 z-20">
                <span className="font-mono text-[0.62rem] tracking-[4px] text-primary uppercase font-bold">
                  Collaboration
                </span>
                <h3 className="font-display text-md tracking-[1px] text-white uppercase leading-tight">
                  Team Activities
                </h3>
              </div>
            </div>
          </motion.div>

          {/* Card 3: ISTE Events (pic-3.jpeg) */}
          <motion.div
            style={{ y: y3 }}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute bottom-0 left-[8%] w-[48%] h-[38%] rounded-lg overflow-hidden border border-border shadow-[10px_-10px_0_rgba(0,0,0,0.2)] bg-slate-900 group hover:border-primary hover:shadow-[0_0_30px_rgba(0,255,200,0.25)] transition-all duration-300 -rotate-[0.5deg]"
          >
            <div className="w-full h-full relative">
              <img 
                src="/pic-3.jpeg" 
                alt="ISTE Events" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 pointer-events-none" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent z-10" />
              <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-1 z-20">
                <span className="font-mono text-[0.58rem] tracking-[4px] text-primary uppercase font-bold">
                  Achievements
                </span>
                <h3 className="font-display text-xs tracking-[1px] text-white uppercase leading-tight">
                  ISTE Chapters
                </h3>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Text/Content (Right side) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
        >
          <span className="font-mono text-[0.6rem] tracking-[5px] text-primary mb-3 block uppercase">
            // 01 — Who We Are
          </span>
          <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] tracking-[2px] uppercase leading-none text-paper">
            About
            <br />
            <span className="text-primary drop-shadow-[0_0_15px_rgba(0,255,200,0.25)]">ISTE</span>
          </h2>
          <div className="w-[60px] h-[3px] bg-gradient-to-r from-primary to-secondary my-6 rounded-sm" />

          <p className="text-base leading-[1.9] text-paper/70 mb-5">
            <strong className="text-paper font-semibold">ISTE is a professional technical society</strong> that empowers students through innovation, collaboration, workshops, hackathons, and technical events. It helps students improve practical knowledge, leadership qualities, and industry exposure.
          </p>
          <p className="text-base leading-[1.9] text-paper/70 mb-5">
            From cutting-edge workshops to inter-collegiate hackathons, ISTE creates a thriving ecosystem where students grow into confident, skilled, and industry-ready professionals.
          </p>

          <div className="mt-8 p-6 border-l-[3px] border-primary bg-surface rounded-r-[4px] transition-colors duration-300">
            <p className="font-mono text-[0.8rem] leading-[1.7] text-paper/60 italic">
              "Empowering the next generation of engineers through hands-on learning, collaboration, and relentless innovation."
            </p>
          </div>

        </motion.div>
      </div>

      {/* Dynamic Stats Grid — Centered */}
      <div className="grid grid-cols-3 gap-4 mt-16 max-w-[600px] mx-auto relative z-10">
        {[
          { num: "200+", label: "Members" },
          { num: "50+", label: "Events" },
          { num: "7", label: "Teams" },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="h-full"
          >
            <BorderGlow glowColor="0 255 200" className="h-full !p-0">
              <SpotlightCard spotlightColor="rgba(0, 255, 200, 0.15)" className="astat p-5 border border-border rounded-md text-center bg-surface hover:border-primary hover:shadow-[0_0_20px_rgba(0,255,200,0.2)] transition-all duration-300 h-full">
                <div className="astat-num font-display text-[1.8rem] font-bold text-primary leading-none transition-colors duration-300">
                  {stat.num}
                </div>
                <div className="astat-label font-mono text-[0.58rem] tracking-[3px] text-muted mt-2 uppercase">
                  {stat.label}
                </div>
              </SpotlightCard>
            </BorderGlow>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
