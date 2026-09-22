"use client";

import { motion } from "framer-motion";

export default function FooterCTA() {
  const handleJoinClick = () => {
    const event = new CustomEvent("openJoinModal", { detail: { team: "General" } });
    window.dispatchEvent(event);
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="join" className="relative py-32 px-[5vw] overflow-hidden bg-[#071120] border-t border-[rgba(255,255,255,0.05)]">
      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-[#7c3aed] blur-[120px] rounded-full -translate-y-1/2 -translate-x-1/2 opacity-50 animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute top-1/2 right-1/4 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-[#6BE6FF] blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 opacity-30 animate-pulse" style={{ animationDuration: '6s' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs tracking-[4px] uppercase text-[#6BE6FF] font-bold mb-4 block">
            Your Journey Starts Here
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight text-white mb-6">
            Ready to Shape the Future with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6BE6FF] to-[#7c3aed]">ISTE?</span>
          </h2>
          <p className="text-[#B8C7D9] text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Join the most dynamic technical community on campus. Build skills, lead teams, and leave your mark.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleJoinClick}
              className="w-full sm:w-auto px-10 py-4 bg-[#6BE6FF] text-[#071120] font-bold uppercase tracking-widest text-sm rounded-full shadow-[0_0_20px_rgba(107,230,255,0.4)] hover:shadow-[0_0_30px_rgba(107,230,255,0.6)] hover:scale-105 transition-all duration-300"
            >
              Join ISTE
            </button>
            <button
              onClick={() => scrollTo("teams")}
              className="w-full sm:w-auto px-10 py-4 bg-transparent border border-[rgba(255,255,255,0.2)] text-white font-bold uppercase tracking-widest text-sm rounded-full hover:border-[#6BE6FF] hover:text-[#6BE6FF] transition-all duration-300"
            >
              Explore Teams
            </button>
            <a
              href="mailto:contact@iste-mbu.edu"
              className="w-full sm:w-auto px-10 py-4 bg-transparent border border-[rgba(255,255,255,0.05)] text-[#B8C7D9] font-bold uppercase tracking-widest text-sm rounded-full hover:bg-white/5 transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


