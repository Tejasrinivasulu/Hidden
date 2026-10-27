"use client";

import { motion } from "framer-motion";
import { Lightbulb, Microscope, Handshake, Globe, Rocket, Trophy } from "lucide-react";
import AnimatedHeading from "@/components/shared/AnimatedHeading";

const objectives = [
  { icon: Lightbulb, text: "Encourage innovation and creativity" },
  { icon: Microscope, text: "Conduct technical workshops and events" },
  { icon: Handshake, text: "Improve leadership and teamwork skills" },
  { icon: Globe, text: "Connect students with industry experts" },
  { icon: Rocket, text: "Promote practical learning" },
  { icon: Trophy, text: "Foster collaboration and networking" },
];

const cardClass =
  "w-full rounded-xl border border-[var(--border)] bg-white p-6 shadow-[0_8px_24px_rgba(21,34,56,0.06)] transition-colors duration-300 hover:border-primary/35";

export default function Motive() {
  return (
    <section id="motive" className="landing-section relative overflow-hidden px-[5vw] py-28">
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[26vw] font-black tracking-[-2vw] whitespace-nowrap text-primary/[0.05]">
        ISTE
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <AnimatedHeading
          className="font-display text-[clamp(2.5rem,5vw,5rem)] tracking-[2px] text-[var(--text)] uppercase leading-none whitespace-nowrap"
          accentWords={["ISTE"]}
        >
          Motive of ISTE
        </AnimatedHeading>
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 mb-16 h-[2px] w-[50px] origin-center rounded-sm bg-gradient-to-r from-primary to-secondary"
        />
      </div>

      <div className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-5"
        >
          <div className={`${cardClass} relative overflow-hidden pl-7`}>
            <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-primary" />
            <span className="mb-3 block font-mono text-[0.6rem] tracking-[4px] text-primary uppercase">
              Vision
            </span>
            <p className="text-[0.95rem] leading-[1.75] text-[var(--text)]/80 italic">
              &ldquo;To create technically skilled and innovative students capable of
              solving real-world challenges.&rdquo;
            </p>
          </div>

          <div className={`${cardClass} relative overflow-hidden pl-7`}>
            <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-primary" />
            <span className="mb-3 block font-mono text-[0.6rem] tracking-[4px] text-primary uppercase">
              Mission
            </span>
            <p className="text-[0.95rem] leading-[1.75] text-[var(--text)]/80 italic">
              &ldquo;To provide opportunities for learning, leadership, teamwork, and
              technical growth through events and activities.&rdquo;
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="mb-5 block font-mono text-[0.6rem] tracking-[5px] text-primary uppercase">
            Objectives
          </span>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {objectives.map((obj, i) => (
              <div key={i} className={`${cardClass} flex items-start gap-3.5 p-5`}>
                <obj.icon className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                <span className="text-[0.88rem] leading-[1.55] text-[var(--text)]/75">
                  {obj.text}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
