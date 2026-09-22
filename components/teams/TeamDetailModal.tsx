"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Users, Wrench, CheckCircle, Trophy, ArrowRight } from "lucide-react";
import { TeamData } from "./TeamCard";
import { useEffect } from "react";

interface TeamDetailModalProps {
  team: TeamData | null;
  onClose: () => void;
  onJoinClick: (teamName: string) => void;
}

export default function TeamDetailModal({ team, onClose, onJoinClick }: TeamDetailModalProps) {

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (team) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [team]);

  if (!team) return null;

  const Icon = team.icon;

  const statusColors = {
    Recruiting: "text-[#4ADE80]",
    Active: "text-[#6BE6FF]",
    Busy: "text-[#f59e0b]",
    Closed: "text-[#ef4444]",
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full max-w-4xl max-h-[90vh] bg-[#0B172A] border border-[rgba(255,255,255,0.1)] rounded-[24px] shadow-2xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Gradient Background */}
          <div className="relative p-8 md:p-10 shrink-0 overflow-hidden">
            <div
              className="absolute inset-0 opacity-20"
              style={{ background: `linear-gradient(135deg, ${team.gradient})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0B172A]" />

            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all z-20"
            >
              <X size={20} />
            </button>

            <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg shrink-0"
                style={{ background: `linear-gradient(135deg, ${team.gradient})` }}
              >
                <Icon size={40} className="text-white" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">
                    {team.name}
                  </h2>
                  <span className={`font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full border border-current bg-black/20 ${statusColors[team.status]}`}>
                    {team.status}
                  </span>
                </div>
                <p className="text-[#B8C7D9] text-lg max-w-2xl">
                  {team.description}
                </p>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="p-8 md:p-10 overflow-y-auto custom-scrollbar flex-grow bg-[#0B172A]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

              {/* Left Column */}
              <div className="flex flex-col gap-8">
                <div>
                  <h3 className="flex items-center gap-2 font-display text-xl text-white mb-4 uppercase tracking-wide">
                    <CheckCircle className="text-[#6BE6FF]" size={20} /> Responsibilities
                  </h3>
                  <ul className="space-y-3">
                    {team.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-3 text-[#B8C7D9]">
                        <span className="text-[#6BE6FF] mt-1">▹</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="flex items-center gap-2 font-display text-xl text-white mb-4 uppercase tracking-wide">
                    <Wrench className="text-[#a855f7]" size={20} /> Required Skills & Tools
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {team.skills.map((skill, i) => (
                      <span key={i} className="px-3 py-1.5 bg-[#0F1F35] border border-[rgba(255,255,255,0.05)] rounded-md font-mono text-xs text-white">
                        {skill}
                      </span>
                    ))}
                    {team.tools.map((tool, i) => (
                      <span key={i} className="px-3 py-1.5 bg-[rgba(107,230,255,0.1)] border border-[rgba(107,230,255,0.2)] rounded-md font-mono text-xs text-[#6BE6FF]">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-8">
                <div>
                  <h3 className="flex items-center gap-2 font-display text-xl text-white mb-4 uppercase tracking-wide">
                    <Trophy className="text-[#f59e0b]" size={20} /> Achievements
                  </h3>
                  <ul className="space-y-3">
                    {team.achievements.map((achieve, i) => (
                      <li key={i} className="flex items-start gap-3 text-[#B8C7D9] bg-[#0F1F35] p-3 rounded-lg border border-[rgba(255,255,255,0.05)]">
                        <span className="text-[#f59e0b]">★</span>
                        <span className="text-sm">{achieve}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="flex items-center gap-2 font-display text-xl text-white mb-4 uppercase tracking-wide">
                    <Users className="text-[#4ADE80]" size={20} /> Current Projects
                  </h3>
                  <div className="space-y-3">
                    {team.currentProjects.map((proj, i) => (
                      <div key={i} className="p-4 bg-[#0F1F35] rounded-lg border-l-2 border-[#4ADE80]">
                        <p className="text-white text-sm font-medium">{proj}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Footer Action */}
          <div className="p-6 md:p-8 bg-[#0F1F35] border-t border-[rgba(255,255,255,0.05)] flex flex-col md:flex-row justify-between items-center gap-4 shrink-0">
            <div className="font-mono text-sm text-[#B8C7D9]">
              Currently has <span className="text-white font-bold text-lg">{team.memberCount}</span> active members
            </div>

            <button
              onClick={() => {
                onClose();
                onJoinClick(team.name);
              }}
              className="w-full md:w-auto px-8 py-3 bg-white text-[#071120] font-bold uppercase tracking-widest text-sm rounded-full hover:bg-[#6BE6FF] shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(107,230,255,0.5)] transition-all flex items-center justify-center gap-2 group"
            >
              Join Team <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
