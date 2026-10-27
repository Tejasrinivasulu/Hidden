"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedHeading from "@/components/shared/AnimatedHeading";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const y3 = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-28 px-[5vw] landing-section relative overflow-hidden transition-colors duration-500"
    >
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        <div className="relative h-[400px] sm:h-[520px] w-full max-w-[550px] mx-auto">
          <motion.div
            style={{ y: y1 }}
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute top-0 left-0 w-[72%] h-[58%] rounded-lg overflow-hidden border border-border shadow-[16px_16px_0_rgba(21,34,56,0.12)] bg-slate-900 group hover:border-primary hover:shadow-[0_0_30px_rgba(26,143,212,0.2)] transition-all duration-300 -rotate-[1deg]"
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

          <motion.div
            style={{ y: y2 }}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="absolute top-[20%] right-0 w-[52%] h-[48%] rounded-lg overflow-hidden border border-border shadow-[-12px_12px_0_rgba(21,34,56,0.1)] bg-slate-900 group hover:border-primary hover:shadow-[0_0_30px_rgba(26,143,212,0.2)] transition-all duration-300 rotate-[1.5deg]"
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

          <motion.div
            style={{ y: y3 }}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute bottom-0 left-[8%] w-[48%] h-[38%] rounded-lg overflow-hidden border border-border shadow-[10px_-10px_0_rgba(21,34,56,0.08)] bg-slate-900 group hover:border-primary hover:shadow-[0_0_30px_rgba(26,143,212,0.2)] transition-all duration-300 -rotate-[0.5deg]"
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

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
        >
          <AnimatedHeading
            className="font-display text-[clamp(2.5rem,5vw,5rem)] tracking-[2px] uppercase leading-none text-paper whitespace-nowrap"
            accentWords={["ISTE"]}
            accentClassName="text-primary drop-shadow-[0_0_12px_rgba(30,79,214,0.25)]"
          >
            About ISTE
          </AnimatedHeading>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-[60px] h-[3px] origin-left bg-gradient-to-r from-primary to-secondary my-6 rounded-sm"
          />

          <p className="text-base leading-[1.9] text-paper/70 mb-5">
            <strong className="text-paper font-semibold">ISTE is a professional technical society</strong> that empowers students through innovation, collaboration, workshops, hackathons, and technical events. It helps students improve practical knowledge, leadership qualities, and industry exposure.
          </p>
          <p className="text-base leading-[1.9] text-paper/70 mb-5">
            From cutting-edge workshops to inter-collegiate hackathons, ISTE creates a thriving ecosystem where students grow into confident, skilled, and industry-ready professionals.
          </p>

          <div className="mt-8 p-6 border-l-[3px] border-primary bg-surface rounded-r-[4px] transition-colors duration-300">
            <p className="font-mono text-[0.8rem] leading-[1.7] text-paper/60 italic">
              &ldquo;Empowering the next generation of engineers through hands-on learning, collaboration, and relentless innovation.&rdquo;
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
