"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Brain, Briefcase, Calendar, FileText, Palette, Share2, Code2, Archive } from "lucide-react";

const steps = [
  { id: 1, title: "Idea Generation", team: "Core Committee", icon: Brain, color: "#7c3aed" },
  { id: 2, title: "Management", team: "Management Team", icon: Briefcase, color: "#14b8a6" },
  { id: 3, title: "Planning & Timeline", team: "Scheduling Team", icon: Calendar, color: "#a855f7" },
  { id: 4, title: "Documentation", team: "Drafting Team", icon: FileText, color: "#10b981" },
  { id: 5, title: "Design & Branding", team: "Poster Team", icon: Palette, color: "#3b82f6" },
  { id: 6, title: "Marketing", team: "Social Media Team", icon: Share2, color: "#ec4899" },
  { id: 7, title: "Digital Execution", team: "Web Dev Team", icon: Code2, color: "#06b6d4" },
  { id: 8, title: "Archival", team: "Documentation Team", icon: Archive, color: "#f97316" },
];

export default function WorkflowDiagram() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.05,
    rootMargin: "-50px 0px"
  });

  return (
    <section id="workflow" className="py-24 px-[5vw] bg-[#071120] relative overflow-hidden" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs tracking-[4px] uppercase text-[#7c3aed] font-bold mb-2 block">
            The ISTE Engine
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-wide text-white">
            How Teams <span className="text-[#6BE6FF]">Collaborate</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Central Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-[rgba(255,255,255,0.05)] -translate-x-1/2" />

          {/* Animated glowing line that goes down the middle (Desktop) */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={inView ? { height: "100%", opacity: 1 } : {}}
            transition={{ duration: 3, ease: "easeInOut" }}
            className="hidden md:block absolute left-1/2 top-0 w-[2px] bg-gradient-to-b from-transparent via-[#6BE6FF] to-transparent -translate-x-1/2 shadow-[0_0_15px_#6BE6FF]"
          />

          {/* Mobile Line */}
          <div className="md:hidden absolute left-8 top-0 bottom-0 w-[2px] bg-[rgba(255,255,255,0.05)]" />
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={inView ? { height: "100%", opacity: 1 } : {}}
            transition={{ duration: 3, ease: "easeInOut" }}
            className="md:hidden absolute left-8 top-0 w-[2px] bg-gradient-to-b from-transparent via-[#6BE6FF] to-transparent shadow-[0_0_15px_#6BE6FF]"
          />

          <div className="flex flex-col gap-8 md:gap-12 relative z-10">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
                  animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  className={`flex flex-col md:flex-row items-start md:items-center w-full ${isEven ? 'md:justify-start' : 'md:justify-end'} relative pl-16 md:pl-0`}
                >
                  {/* Node Connector (Desktop) */}
                  <div className={`hidden md:flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#0B172A] border-2 border-[${step.color}] items-center justify-center z-20`}>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: step.color }} />
                  </div>

                  {/* Node Connector (Mobile) */}
                  <div className="md:hidden absolute top-6 -translate-y-1/2 left-8 -translate-x-1/2 w-6 h-6 rounded-full bg-[#0B172A] border-2 flex items-center justify-center z-20" style={{ borderColor: step.color }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: step.color }} />
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-[45%] ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                    <div className="bg-[#0F1F35] border border-[rgba(255,255,255,0.08)] p-5 md:p-6 rounded-[20px] shadow-lg hover:border-[rgba(255,255,255,0.2)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all group flex flex-col md:flex-row items-start md:items-center gap-4" style={{ flexDirection: isEven ? 'row-reverse' : 'row' }}>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-black/20 group-hover:scale-110 transition-transform" style={{ color: step.color, border: `1px solid ${step.color}40` }}>
                        <Icon size={24} />
                      </div>
                      <div className={`flex flex-col ${isEven ? 'md:items-end' : 'md:items-start'}`}>
                        <h3 className="font-display text-xl font-bold text-white mb-1">
                          {step.title}
                        </h3>
                        <span className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-black/30 border" style={{ borderColor: `${step.color}40`, color: step.color }}>
                          {step.team}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}


