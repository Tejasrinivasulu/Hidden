"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "ISTE helped me improve my technical and communication skills through workshops and hackathons. The experience was transformative — I came in as a student and left as an engineer.",
    name: "Arjun Reddy",
    role: "CSE — 3rd Year",
    initials: "AR",
    gradient: "from-amber to-[#e06020]",
  },
  {
    quote: "The hackathons gave me real-world exposure. I made industry connections and learned to solve problems under pressure. ISTE is where theory meets practice.",
    name: "Priya Sharma",
    role: "ECE — 2nd Year",
    initials: "PS",
    gradient: "from-electric to-[#6030e0]",
  },
  {
    quote: "Joining the Web Development Team at ISTE was a turning point. I got hands-on experience building real products while still in college — skills no classroom could teach.",
    name: "Vikram Kumar",
    role: "IT — 4th Year",
    initials: "VK",
    gradient: "from-[#20c060] to-[#10a040]",
  },
  {
    quote: "ISTE's AI and cloud workshops were invaluable. The mentors were outstanding and the learning environment made me push beyond my limits every single day.",
    name: "Neha Murthy",
    role: "AI & ML — 3rd Year",
    initials: "NM",
    gradient: "from-[#e03080] to-[#c020a0]",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-28 px-[5vw] bg-ink overflow-hidden relative">
      {/* Auto-Progress Timeline Bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/5 overflow-hidden">
        <motion.div
          key={currentIndex}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
          className="h-full bg-gradient-to-r from-primary to-secondary transition-colors duration-300"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9 }}
      >
        <span className="font-mono text-[0.6rem] tracking-[5px] text-amber mb-3 block uppercase">
          // 04 — Student Voices
        </span>
        <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] tracking-[2px] uppercase leading-none text-paper">
          <span className="text-amber">What They</span>
          <br />
          Say
        </h2>
        <div className="w-[50px] h-[2px] bg-gradient-to-r from-amber to-electric my-6 rounded-sm mb-12" />
      </motion.div>

      <div className="relative mt-12 max-w-4xl mx-auto">
        <div className="overflow-hidden min-h-[300px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full bg-surface2 border border-white/5 rounded-md p-10 relative"
            >
              <Quote className="absolute top-6 left-8 w-16 h-16 text-amber/20" />
              <p className="text-base md:text-lg leading-[1.85] text-paper/75 italic pt-8 mb-8 relative z-10">
                "{testimonials[currentIndex].quote}"
              </p>
              <div className="flex items-center gap-4 relative z-10">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-display text-[1.1rem] text-ink bg-gradient-to-br ${testimonials[currentIndex].gradient} shrink-0`}
                >
                  {testimonials[currentIndex].initials}
                </div>
                <div>
                  <div className="font-display text-[1.1rem] tracking-[1px] text-paper">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="font-mono text-[0.62rem] tracking-[2px] text-text-dim uppercase">
                    {testimonials[currentIndex].role}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between mt-8">
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === i ? "w-10 bg-amber" : "w-6 bg-white/15"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <div className="flex gap-4">
            <button
              onClick={prev}
              className="w-11 h-11 rounded border border-border flex items-center justify-center text-amber transition-all duration-300 hover:bg-amber/10 hover:shadow-[0_0_20px_rgba(232,160,32,0.2)]"
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={next}
              className="w-11 h-11 rounded border border-border flex items-center justify-center text-amber transition-all duration-300 hover:bg-amber/10 hover:shadow-[0_0_20px_rgba(232,160,32,0.2)]"
              aria-label="Next testimonial"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
