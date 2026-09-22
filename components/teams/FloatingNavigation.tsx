"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { id: "hero", label: "Hero" },
  { id: "leadership", label: "Leadership" },
  { id: "statistics", label: "Statistics" },
  { id: "teams", label: "Teams" },
  { id: "workflow", label: "Workflow" },
  { id: "gallery", label: "Gallery" },
  { id: "join", label: "Join ISTE" },
];

export default function FloatingNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Right-Side Navigation */}
      <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-4">
        {navItems.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="group flex items-center justify-end gap-3"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-[#B8C7D9] opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300 drop-shadow-[0_0_8px_rgba(107,230,255,0.8)]">
              {item.label}
            </span>
            <div className="w-2 h-2 rounded-full bg-[#0F1F35] border border-[rgba(255,255,255,0.2)] group-hover:bg-[#6BE6FF] group-hover:border-[#6BE6FF] group-hover:shadow-[0_0_15px_rgba(107,230,255,0.8)] transition-all duration-300" />
          </button>
        ))}
      </div>

      {/* Mobile FAB Navigation */}
      <div className="lg:hidden fixed bottom-6 right-6 z-[60]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-[#0F1F35] border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-white shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:border-[#6BE6FF] hover:shadow-[0_0_20px_rgba(107,230,255,0.3)] transition-all"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute bottom-20 right-0 flex flex-col gap-3 bg-[#071120]/90 backdrop-blur-md border border-[rgba(255,255,255,0.08)] rounded-2xl p-4 shadow-2xl min-w-[200px]"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-right font-mono text-xs uppercase tracking-widest text-[#B8C7D9] py-2 hover:text-[#6BE6FF] transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
