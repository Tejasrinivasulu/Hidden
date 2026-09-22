"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import GooeyNav from "@/components/ui/GooeyNav";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { label: "Home", href: "/" },
    { label: "Events", href: "/events" },
    { label: "Team", href: "/#teams" },
    { label: "Achievements", href: "/achievements" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact Us", href: "/#footer" },
  ];

  const gooeyItems = [...links];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5vw] h-[95px] bg-[#0a0a0f] border-b border-[rgba(124,58,237,0.2)] shadow-md transition-all duration-300">

        {/* Logos */}
        <div className="flex items-center gap-4 h-full relative z-50">
          <Link href="/">
            <div className="flex items-center gap-3 h-full py-1">
              <img
                src="/logo-2.png"
                alt="ISTE Logo 2"
                className="h-[84px] w-auto object-contain filter brightness-0 invert drop-shadow-[0_4px_10px_rgba(255,255,255,0.2)] transition-transform duration-300 hover:scale-[1.03]"
              />
              <img
                src="/logo-1.png"
                alt="ISTE Logo 1"
                className="h-[84px] w-auto object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] transition-transform duration-300 hover:scale-[1.03]"
              />
            </div>
          </Link>
          <div className="w-[1.5px] h-10 bg-slate-700/80"></div>
          <div className="font-mono text-[0.62rem] tracking-[2px] text-gray-300 font-semibold leading-[1.4] uppercase">
            MBU &amp; SVEC<br />CHAPTER
          </div>
        </div>

        {/* Desktop Links (GooeyNav) */}
        <div className="hidden md:flex relative h-full items-center justify-center">
          {/* Wrapper to clip GooeyNav's black box overflow without affecting the Dropdown */}
          <div className="overflow-hidden h-full flex items-center justify-center pt-2 px-2">
            <GooeyNav
              items={gooeyItems}
              initialActiveIndex={pathname.includes('events') ? 1 : pathname.includes('teams') ? 2 : pathname.includes('achievements') ? 3 : pathname.includes('gallery') ? 4 : 0}
              colors={[1, 2, 3, 1, 2, 3]} // uses default CSS vars in GooeyNav, but we might need to define them if missing
            />
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-300 hover:text-white transition-colors relative z-50"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[95px] left-0 right-0 bg-[#0f0f1a] border-b border-[rgba(124,58,237,0.4)] shadow-[0_10px_20px_rgba(0,0,0,0.5)] z-40 md:hidden p-6 max-h-[calc(100vh-95px)] overflow-y-auto"
          >
            <ul className="flex flex-col gap-6">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block font-mono text-sm tracking-[2px] uppercase text-gray-300 font-bold hover:text-white hover:text-shadow-[0_0_8px_rgba(0,212,255,0.8)] transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
