"use client";

import { motion } from "framer-motion";

export default function RecruitmentBanner() {
  return (
    <section className="py-12 px-[5vw] bg-[#0B172A] relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto bg-gradient-to-r from-[#0F1F35] via-[#1a2d4c] to-[#0F1F35] border border-[#6BE6FF]/30 rounded-[20px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_0_30px_rgba(107,230,255,0.1)]"
      >
        <div className="flex-1 text-center md:text-left">
          <div className="inline-block px-3 py-1 bg-[#4ADE80]/20 border border-[#4ADE80]/50 rounded-full text-[#4ADE80] font-mono text-xs font-bold uppercase tracking-widest mb-4">
            Currently Recruiting
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
            Join a team that matches your interests, skills, and career goals.
          </h2>
          <p className="text-[#B8C7D9]">
            Applications are reviewed on a rolling basis. Limited spots available for the upcoming semester.
          </p>
        </div>

        <div className="flex flex-col gap-3 min-w-[200px]">
          <div className="flex justify-between items-center bg-black/20 p-3 rounded-lg border border-white/5">
            <span className="text-white text-sm">Poster Team</span>
            <span className="text-[#4ADE80] font-mono text-xs font-bold uppercase">Open</span>
          </div>
          <div className="flex justify-between items-center bg-black/20 p-3 rounded-lg border border-white/5">
            <span className="text-white text-sm">Web Dev Team</span>
            <span className="text-[#4ADE80] font-mono text-xs font-bold uppercase">Open</span>
          </div>
          <div className="flex justify-between items-center bg-black/20 p-3 rounded-lg border border-white/5">
            <span className="text-white text-sm">Management Team</span>
            <span className="text-[#f59e0b] font-mono text-xs font-bold uppercase">Limited</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
