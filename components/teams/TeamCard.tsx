"use client";

import { motion } from "framer-motion";
import SpotlightCard from "@/components/ui/SpotlightCard";

export interface TeamData {
  id: string;
  name: string;
  category: string;
  icon: any; // Lucide icon
  description: string;
  gradient: string;
  status: "Recruiting" | "Active" | "Busy" | "Closed";
  memberCount: number;
  skills: string[];
  responsibilities: string[];
  tools: string[];
  currentProjects: string[];
  achievements: string[];
}

interface TeamCardProps {
  team: TeamData;
  onClick: () => void;
}

export default function TeamCard({ team, onClick }: TeamCardProps) {
  const Icon = team.icon;

  const statusColors = {
    Recruiting: "bg-[#4ADE80] text-[#071120] shadow-[0_0_10px_rgba(74,222,128,0.5)]",
    Active: "bg-[#6BE6FF] text-[#071120] shadow-[0_0_10px_rgba(107,230,255,0.5)]",
    Busy: "bg-[#f59e0b] text-white shadow-[0_0_10px_rgba(245,158,11,0.5)]",
    Closed: "bg-[#ef4444] text-white shadow-[0_0_10px_rgba(239,68,68,0.5)]",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="h-full cursor-pointer group"
      onClick={onClick}
    >
      <SpotlightCard
        spotlightColor="rgba(255, 255, 255, 0.05)"
        className="bg-[#0F1F35] border border-[rgba(255,255,255,0.08)] rounded-[20px] p-6 h-full flex flex-col transition-all duration-300 hover:scale-[1.03] hover:border-[rgba(255,255,255,0.2)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative overflow-hidden"
      >
        {/* Animated Gradient Glow on Hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
          style={{ background: `linear-gradient(135deg, ${team.gradient})` }}
        />

        <div className="flex justify-between items-start mb-6 relative z-10">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
            style={{ background: `linear-gradient(135deg, ${team.gradient})` }}
          >
            <Icon size={24} className="text-white" />
          </div>
          <div className={`font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-bold ${statusColors[team.status]}`}>
            {team.status}
          </div>
        </div>

        <h3 className="font-display text-2xl font-bold text-white mb-2 relative z-10 group-hover:text-transparent group-hover:bg-clip-text transition-colors duration-300" style={{ backgroundImage: `linear-gradient(135deg, ${team.gradient})` }}>
          {team.name}
        </h3>

        <p className="text-[#B8C7D9] text-sm leading-relaxed mb-6 flex-grow relative z-10 line-clamp-3">
          {team.description}
        </p>

        <div className="flex justify-between items-center relative z-10 pt-4 border-t border-[rgba(255,255,255,0.05)]">
          <div className="font-mono text-xs text-[#B8C7D9]">
            <span className="text-white font-bold">{team.memberCount}</span> Members
          </div>
          <button className="font-mono text-xs uppercase tracking-widest text-white flex items-center gap-2 group-hover:gap-3 transition-all">
            Explore <span className="text-[#6BE6FF]">→</span>
          </button>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}
