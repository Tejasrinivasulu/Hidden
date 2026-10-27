"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { AnimatedHeadingBlock } from "@/components/shared/AnimatedHeading";

const faqs = [
  {
    q: "Who can join ISTE?",
    a: "Any student at Mohan Babu University / SVEC interested in technical learning, innovation, and collaboration can join the ISTE chapter.",
  },
  {
    q: "Do I need prior coding experience for hackathons?",
    a: "No. Hackathons welcome beginners and experienced builders alike. Mentors and teammates help you learn as you build.",
  },
  {
    q: "How do I stay updated on upcoming events?",
    a: "Follow our Instagram and LinkedIn, watch the Events page on this website, and join the chapter WhatsApp / announcement channels.",
  },
  {
    q: "Can I join a specific domain team (Design, Content, Web Dev)?",
    a: "Yes. During recruitment you can apply to domain teams such as Design, Content, Web Development, Documentation, and more.",
  },
  {
    q: "Are ISTE events free to attend?",
    a: "Most workshops and chapter events are free for members. Some flagship events may require registration — details are shared with each event.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="landing-section relative overflow-hidden px-[5vw] py-28"
    >
      <div className="mx-auto max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-3 font-mono text-[0.7rem] tracking-[0.28em] text-primary uppercase"
        >
          — Questions
        </motion.p>

        <AnimatedHeadingBlock>
          <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text)]">
            Frequently asked
          </h2>
        </AnimatedHeadingBlock>

        <div className="mt-14 border-t border-[var(--border)]">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-[var(--border)]">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-primary"
                  aria-expanded={isOpen}
                >
                  <span className="text-[1.02rem] font-medium tracking-[-0.01em] text-[var(--text)] sm:text-[1.15rem]">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 text-[var(--muted)]"
                  >
                    <Plus size={20} strokeWidth={1.75} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 text-[0.95rem] leading-[1.75] text-[var(--muted)]">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
