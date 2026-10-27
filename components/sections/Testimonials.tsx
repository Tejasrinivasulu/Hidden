"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { AnimatedHeadingBlock } from "@/components/shared/AnimatedHeading";
import { useAdmin } from "@/context/AdminContext";

const DEFAULT_TESTIMONIALS = [
  {
    quote:
      "ISTE helped me improve my technical and communication skills through workshops and hackathons. The experience was transformative — I came in as a student and left as an engineer.",
    name: "Arjun Reddy",
    role: "CSE — 3rd Year",
    initials: "AR",
    gradient: "from-primary to-[#3b6ef0]",
  },
  {
    quote:
      "The hackathons gave me real-world exposure. I made industry connections and learned to solve problems under pressure. ISTE is where theory meets practice.",
    name: "Priya Sharma",
    role: "ECE — 2nd Year",
    initials: "PS",
    gradient: "from-secondary to-[#6030e0]",
  },
  {
    quote:
      "Joining the Web Development Team at ISTE was a turning point. I got hands-on experience building real products while still in college — skills no classroom could teach.",
    name: "Vikram Kumar",
    role: "IT — 4th Year",
    initials: "VK",
    gradient: "from-[#20c060] to-[#10a040]",
  },
  {
    quote:
      "ISTE's AI and cloud workshops were invaluable. The mentors were outstanding and the learning environment made me push beyond my limits every single day.",
    name: "Neha Murthy",
    role: "AI & ML — 3rd Year",
    initials: "NM",
    gradient: "from-[#e03080] to-[#c020a0]",
  },
];

export default function Testimonials() {
  const { testimonials: adminTestimonials } = useAdmin();
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = useMemo(() => {
    if (adminTestimonials.length === 0) return DEFAULT_TESTIMONIALS;
    return adminTestimonials.map((t) => ({
      quote: t.description,
      name: t.name,
      role: `${t.branch} — ${t.year}`,
      initials: t.initials,
      gradient: t.gradient,
    }));
  }, [adminTestimonials]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [testimonials.length]);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const safeIndex =
    testimonials.length === 0 ? 0 : currentIndex % testimonials.length;
  const current = testimonials[safeIndex];

  const next = () =>
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );

  if (!current) return null;

  return (
    <section
      id="testimonials"
      className="py-28 px-[5vw] landing-section overflow-hidden relative"
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--border)] overflow-hidden">
        <motion.div
          key={safeIndex}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
          className="h-full bg-gradient-to-r from-primary to-secondary transition-colors duration-300"
        />
      </div>

      <div>
        <AnimatedHeadingBlock>
          <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] tracking-[2px] uppercase leading-none text-paper whitespace-nowrap">
            <span className="text-primary">What They</span> Say
          </h2>
        </AnimatedHeadingBlock>
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="w-[50px] h-[2px] origin-left bg-gradient-to-r from-primary to-secondary my-6 rounded-sm mb-12"
        />
      </div>

      <div className="relative mt-12 max-w-4xl mx-auto">
        <div className="overflow-hidden min-h-[300px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={safeIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full bg-white/70 border border-primary/15 rounded-md p-10 relative shadow-[0_8px_30px_rgba(21,34,56,0.06)]"
            >
              <Quote className="absolute top-6 left-8 w-16 h-16 text-primary/20" />
              <p className="text-base md:text-lg leading-[1.85] text-paper/75 italic pt-8 mb-8 relative z-10">
                &ldquo;{current.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4 relative z-10">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-display text-[1.1rem] text-white bg-gradient-to-br ${current.gradient} shrink-0`}
                >
                  {current.initials}
                </div>
                <div>
                  <div className="font-display text-[1.1rem] tracking-[1px] text-paper">
                    {current.name}
                  </div>
                  <div className="font-mono text-[0.62rem] tracking-[2px] text-text-dim uppercase">
                    {current.role}
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
                  safeIndex === i ? "w-10 bg-primary" : "w-6 bg-[var(--border)]"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <div className="flex gap-4">
            <button
              onClick={prev}
              className="w-11 h-11 rounded border border-border flex items-center justify-center text-primary transition-all duration-300 hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(26,143,212,0.15)]"
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={next}
              className="w-11 h-11 rounded border border-border flex items-center justify-center text-primary transition-all duration-300 hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(26,143,212,0.15)]"
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
