"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    text: "Working in the Web Dev Team drastically improved my frontend development skills and gave me hands-on experience with Next.js.",
    author: "Aditi S.",
    role: "Web Dev Team Member",
  },
  {
    id: 2,
    text: "The Social Media Team helped me understand the importance of branding and marketing. The growth we saw was incredible.",
    author: "Rohan M.",
    role: "Social Media Lead",
  },
  {
    id: 3,
    text: "Managing technical fests gave me real-world crisis management experience that I couldn't have learned in a classroom.",
    author: "Priya V.",
    role: "Management Team",
  },
  {
    id: 4,
    text: "Designing the visual identity for ISTE MBU was challenging but immensely rewarding. The creative freedom here is unmatched.",
    author: "Karthik N.",
    role: "Poster Team",
  },
];

export default function Testimonials() {
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="relative py-24">
      <div className="relative z-10 mx-auto mb-12 max-w-7xl px-[5vw]">
        <div className="text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#7c3aed]/50" />
            <span className="text-[0.7rem] font-semibold tracking-[0.22em] text-[#7c3aed] uppercase">
              Member Stories
            </span>
            <span className="h-px w-8 bg-[#7c3aed]/50" />
          </div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-[#0f172a] md:text-4xl">
            What Our{" "}
            <span className="bg-gradient-to-r from-[#3b82f6] to-[#a855f7] bg-clip-text text-transparent">
              Members Say
            </span>
          </h2>
        </div>
      </div>

      <div className="relative z-10 flex w-full overflow-hidden">
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-[10vw] bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-[10vw] bg-gradient-to-l from-white to-transparent" />

        <motion.div
          className="flex w-max gap-6 py-4"
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          }}
        >
          {duplicatedTestimonials.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="relative w-[300px] shrink-0 rounded-[20px] border border-[#e2e8f0] bg-white p-8 shadow-[0_10px_28px_rgba(15,23,42,0.06)] transition-all hover:border-[#c7d2fe] hover:shadow-[0_14px_32px_rgba(79,70,229,0.12)] md:w-[400px]"
            >
              <Quote className="absolute top-6 right-6 h-12 w-12 text-[#4f46e5]/15" />
              <p className="relative z-10 mb-8 text-sm leading-relaxed text-[#475569] md:text-base">
                &ldquo;{item.text}&rdquo;
              </p>
              <div className="relative z-10 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#a855f7] p-[2px]">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-sm font-bold text-[#4f46e5]">
                    {item.author.charAt(0)}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0f172a]">{item.author}</h4>
                  <p className="font-mono text-xs text-[#4f46e5]">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
