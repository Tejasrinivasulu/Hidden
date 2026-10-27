"use client";

import { motion } from "framer-motion";

export default function FooterCTA() {
  const handleJoinClick = () => {
    const event = new CustomEvent("openJoinModal", {
      detail: { team: "General" },
    });
    window.dispatchEvent(event);
  };

  return (
    <section id="join" className="relative px-[5vw] py-28">
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#7c3aed]/50" />
            <span className="text-[0.7rem] font-semibold tracking-[0.22em] text-[#7c3aed] uppercase">
              Your Journey Starts Here
            </span>
            <span className="h-px w-8 bg-[#7c3aed]/50" />
          </div>
          <h2 className="mb-6 font-display text-4xl font-extrabold tracking-tight text-[#0f172a] md:text-5xl">
            Ready to Shape the Future with{" "}
            <span className="bg-gradient-to-r from-[#3b82f6] to-[#a855f7] bg-clip-text text-transparent">
              ISTE?
            </span>
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-[#64748b] md:text-xl">
            Join the most dynamic technical community on campus. Build skills,
            lead teams, and leave your mark.
          </p>

          <div className="flex justify-center">
            <button
              onClick={handleJoinClick}
              className="rounded-full bg-[#4f46e5] px-10 py-4 text-sm font-bold tracking-widest text-white uppercase shadow-[0_10px_28px_rgba(79,70,229,0.35)] transition-all duration-300 hover:scale-105 hover:bg-[#4338ca]"
            >
              Join ISTE
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
