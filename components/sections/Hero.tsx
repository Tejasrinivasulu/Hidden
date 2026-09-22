"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Wrench,
  Trophy,
  Microscope,
  Users,
  Lightbulb,
  Radio,
  Rocket,
  Target,
  MonitorPlay,
  Cpu,
} from "lucide-react";
import Link from "next/link";

const stripData = [
  { icon: Wrench, label: "TECH WORKSHOP" },
  { icon: Trophy, label: "HACKATHON 2024" },
  { icon: Microscope, label: "SEMINAR SERIES" },
  { icon: Users, label: "TEAM COLLAB" },
  { icon: Lightbulb, label: "INNOVATION TALK" },
  { icon: Radio, label: "CODING CONTEST" },
  { icon: Rocket, label: "PROJECT EXPO" },
  { icon: Target, label: "LEADERSHIP FORUM" },
  { icon: MonitorPlay, label: "WEB DEV SPRINT" },
  { icon: Cpu, label: "IOT WORKSHOP" },
];

const bgImages = [
  "/h-banner3.webp",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1920&q=80",
];

import TextType from "@/components/ui/TextType";

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const { scrollY } = useScroll();

  // Scroll parallax for background images
  const bgY = useTransform(scrollY, [0, 800], [0, 220]);
  const bgScale = useTransform(scrollY, [0, 800], [1.0, 1.15]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent pt-24 pb-8 transition-colors duration-500">
      
      {/* Dynamic Background Images Slideshow — simplified transitions, GPU-optimized */}
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 z-0 pointer-events-none overflow-hidden will-change-transform">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.65 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{ 
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.85) 85%, var(--bg) 100%), url(${bgImages[activeSlide]})` 
            }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full will-change-[opacity]"
          />
        </AnimatePresence>
      </motion.div>

      {/* Scrolling Event Strip — reduced duplication from 3x to 2x, CSS animation instead of framer-motion */}
      <div className="absolute bottom-0 left-0 right-0 z-30 overflow-hidden h-[200px] [mask-image:linear-gradient(to_top,rgba(0,0,0,1)_30%,transparent)] pointer-events-auto">
        <div
          className="flex gap-4 w-max py-2 animate-scroll-strip"
        >
          {/* 2x duplication is sufficient for seamless loop */}
          {[...stripData, ...stripData].map((item, i) => (
            <div
              key={i}
              className="w-[240px] h-[140px] rounded-lg shrink-0 bg-slate-950/95 border border-border/30 flex flex-col items-center justify-center gap-3 font-mono text-[0.62rem] tracking-[2px] text-primary/70 relative overflow-hidden group hover:border-primary/80 hover:text-primary transition-all duration-300 shadow-[0_20px_40px_rgba(0,0,0,0.5)] pointer-events-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <item.icon size={32} className="text-primary/70 group-hover:scale-115 transition-transform duration-300" />
              <span className="uppercase">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Centered Content (Kept at mid z-index z-20) */}
      <div className="relative z-20 px-[5vw] pt-12 pb-[240px] max-w-[1100px] w-full text-center flex flex-col items-center justify-center pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-mono text-[0.65rem] tracking-[6px] text-primary flex items-center justify-center gap-3 mb-8 uppercase font-bold"
        >
          <div className="w-8 h-[1px] bg-primary" />
          ISTE. — TECHNICAL EDUCATION CHAPTER
          <div className="w-8 h-[1px] bg-primary" />
        </motion.div>

        {/* Dynamic Typewriter Header Title */}
        <div className="min-h-[120px] md:min-h-[160px] w-full flex items-center justify-center mb-4">
          <TextType 
            as="h1"
            text={[
              "Indian Society for Technical Education"
            ]}
            typingSpeed={60}
            pauseDuration={2500}
            showCursor={true}
            cursorCharacter="|"
            className="font-display text-[clamp(1rem,2.5vw,3rem)] leading-[1.1] tracking-[1px] uppercase max-w-full select-none font-black drop-shadow-[0_0_15px_rgba(0,255,200,0.15)] whitespace-nowrap"
            textColors={["var(--primary)"]}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-8 font-display text-[clamp(1rem,2vw,1.6rem)] tracking-[10px] text-accent uppercase font-black"
        >
          Innovate · Inspire · Impact
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mt-8 text-[clamp(0.85rem,1.5vw,1.05rem)] leading-[1.8] max-w-[600px] text-paper/95 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] font-bold"
        >
          Empowering students through innovation, collaboration, and technical
          excellence — building the engineers of tomorrow, today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="flex gap-4 mt-10 flex-wrap justify-center z-20"
        >
          <Link
            href="#about"
            className="font-mono text-[0.72rem] tracking-[3px] uppercase px-8 py-3.5 bg-primary text-black rounded-[3px] font-bold transition-all duration-300 hover:bg-[#ffbe45] hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,255,200,0.35)]"
          >
            Explore Events
          </Link>
          <Link
            href="#teams"
            className="font-mono text-[0.72rem] tracking-[3px] uppercase px-8 py-3.5 bg-transparent text-paper border border-border rounded-[3px] font-bold transition-all duration-300 hover:border-primary hover:text-primary hover:-translate-y-1"
          >
            Join ISTE
          </Link>
        </motion.div>
      </div>


      {/* Scroll Hint */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[5vw] bottom-8 z-10 flex items-center gap-3 pointer-events-none"
      >
        <span className="font-mono text-[0.6rem] tracking-[3px] text-muted uppercase">
          Scroll
        </span>
        <div className="w-10 h-[1px] bg-muted relative">
          <div className="absolute right-0 top-[-3px] w-[7px] h-[7px] border-r border-b border-muted -rotate-45" />
        </div>
      </motion.div>
    </section>
  );
}
