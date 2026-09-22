"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, PenTool, FolderOpen, Briefcase, Calendar, Smartphone, Code } from "lucide-react";

const teams = [
  { 
    icon: Palette, 
    name: "Poster Team", 
    desc: "Designs posters, banners, and creative graphics for events and promotions.",
    detailedDesc: "Creates visually compelling posters, banners, event branding, and promotional creatives that establish ISTE’s professional identity across both digital and offline platforms.",
    n: "01" 
  },
  { 
    icon: PenTool, 
    name: "Drafting Team", 
    desc: "Prepares official documents, reports, proposals, and event planning materials.",
    detailedDesc: "Handles official documentation including proposals, reports, meeting minutes, event outlines, sponsorship letters, and structured communication materials with precision and clarity.",
    n: "02" 
  },
  { 
    icon: FolderOpen, 
    name: "Documentation Team", 
    desc: "Maintains records, captures event details, and organizes reports and media.",
    detailedDesc: "Captures and organizes photographs, videos, reports, and event records while maintaining a complete archive of ISTE activities and achievements.",
    n: "03" 
  },
  { 
    icon: Briefcase, 
    name: "Management Team", 
    desc: "Handles event coordination, team operations, and overall management activities.",
    detailedDesc: "Oversees overall event execution, internal coordination, task delegation, and operational workflow to ensure smooth and efficient management of all ISTE activities.",
    n: "04" 
  },
  { 
    icon: Calendar, 
    name: "Scheduling Team", 
    desc: "Plans timelines, meeting schedules, and event execution flow.",
    detailedDesc: "Plans event timelines, meeting schedules, task deadlines, and execution sequences to maintain discipline, coordination, and timely completion of activities.",
    n: "05" 
  },
  { 
    icon: Smartphone, 
    name: "Social Media Team", 
    desc: "Manages Instagram, LinkedIn, YouTube, and all online promotions.",
    detailedDesc: "Builds ISTE’s digital presence by managing content creation, engagement strategies, promotions, announcements, and branding across social media platforms.",
    n: "06" 
  },
  { 
    icon: Code, 
    name: "Web Dev Team", 
    desc: "Develops and maintains the ISTE website and technical digital platforms.",
    detailedDesc: "Designs, develops, and maintains ISTE’s websites, registration systems, dashboards, and technical platforms while ensuring performance, responsiveness, and modern user experience.",
    n: "07" 
  },
];

export default function Teams() {
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);

  return (
    <section id="teams" className="py-28 px-[5vw] bg-surface relative overflow-hidden transition-colors duration-500">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] pointer-events-none rounded-full" />

      {/* Semi-transparent Background Brand Watermark */}
      <div className="absolute right-[-5%] bottom-[-5%] w-[500px] h-[500px] opacity-[0.15] pointer-events-none z-0 select-none">
        <img 
          src="/logo-2.png" 
          alt="ISTE Watermark" 
          className="w-full h-full object-contain filter contrast-125 brightness-110" 
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9 }}
        className="relative z-10"
      >
        <span className="font-mono text-[0.6rem] tracking-[5px] text-primary mb-3 block uppercase">
          // 03 — Structure
        </span>
        <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] tracking-[2px] uppercase leading-none text-paper">
          Our <span className="text-primary drop-shadow-[0_0_15px_rgba(0,255,200,0.25)]">Teams</span>
        </h2>
        <div className="w-[60px] h-[3px] bg-gradient-to-r from-primary to-secondary my-6 rounded-sm mb-12" />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {teams.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="tc group relative bg-white/[0.025] backdrop-blur-md border border-white/5 rounded-md p-8 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
          >
            {/* Hover Bottom Border Line */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-secondary scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100" />

            <span className="absolute top-5 right-6 font-mono text-[0.6rem] tracking-[2px] text-primary/30 group-hover:text-primary/70 transition-colors">
              {t.n}
            </span>

            <div className="w-[52px] h-[52px] rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
              <t.icon className="w-6 h-6 text-primary filter drop-shadow-[0_0_8px_rgba(0,255,200,0.4)]" />
            </div>

            <h3 className="font-display text-[1.4rem] tracking-[2px] text-paper mb-2 transition-colors group-hover:text-primary">
              {t.name}
            </h3>
            
            <p className="text-[0.82rem] leading-[1.65] text-muted">
              {t.desc}
            </p>

            {/* Expandable Detailed Description Container */}
            <AnimatePresence>
              {expandedTeam === t.name && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden border-t border-white/5 mt-4 pt-4"
                >
                  <p className="text-[0.8rem] leading-[1.7] text-paper/80 font-mono tracking-wide">
                    {t.detailedDesc}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* View More Button */}
            <button
              onClick={() => setExpandedTeam(expandedTeam === t.name ? null : t.name)}
              className="mt-6 text-[0.62rem] font-mono tracking-[2px] uppercase text-primary border border-primary/20 hover:border-primary hover:bg-primary/5 px-4 py-2 rounded transition-all duration-300 cursor-pointer select-none hover:shadow-[0_0_12px_rgba(0,255,200,0.2)] block w-full text-center"
            >
              {expandedTeam === t.name ? "View Less" : "View More"}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
