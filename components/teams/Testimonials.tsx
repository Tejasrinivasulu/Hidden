"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    text: "Working in the Web Dev Team drastically improved my frontend development skills and gave me hands-on experience with Next.js.",
    author: "Aditi S.",
    role: "Web Dev Team Member"
  },
  {
    id: 2,
    text: "The Social Media Team helped me understand the importance of branding and marketing. The growth we saw was incredible.",
    author: "Rohan M.",
    role: "Social Media Lead"
  },
  {
    id: 3,
    text: "Managing technical fests gave me real-world crisis management experience that I couldn't have learned in a classroom.",
    author: "Priya V.",
    role: "Management Team"
  },
  {
    id: 4,
    text: "Designing the visual identity for ISTE MBU was challenging but immensely rewarding. The creative freedom here is unmatched.",
    author: "Karthik N.",
    role: "Poster Team"
  }
];

export default function Testimonials() {
  // Duplicate array to create a seamless infinite scrolling loop
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-[#0B172A] relative overflow-hidden border-t border-[rgba(255,255,255,0.02)]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-[#6BE6FF]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-[5vw] mb-12">
        <div className="text-center">
          <span className="font-mono text-xs tracking-[4px] uppercase text-[#6BE6FF] font-bold mb-2 block">
            Member Stories
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wide text-white">
            What Our Members Say
          </h2>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden flex">
        {/* Fade Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-[10vw] bg-gradient-to-r from-[#0B172A] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-[10vw] bg-gradient-to-l from-[#0B172A] to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-6 py-4 w-max"
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
              className="w-[300px] md:w-[400px] bg-[#0F1F35] border border-[rgba(255,255,255,0.08)] rounded-[20px] p-8 shrink-0 relative hover:border-[rgba(255,255,255,0.2)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all"
            >
              <Quote className="text-[#6BE6FF]/20 w-12 h-12 absolute top-6 right-6" />
              <p className="text-[#B8C7D9] text-sm md:text-base leading-relaxed mb-8 relative z-10">
                "{item.text}"
              </p>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6BE6FF] to-[#7c3aed] p-[2px]">
                  <div className="w-full h-full bg-[#071120] rounded-full flex items-center justify-center font-bold text-white text-sm">
                    {item.author.charAt(0)}
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">{item.author}</h4>
                  <p className="text-[#6BE6FF] text-xs font-mono">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
