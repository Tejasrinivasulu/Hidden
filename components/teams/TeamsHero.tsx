"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import RotatingTitle from "@/components/teams/RotatingTitle";
import { useAdmin, orderBatchYears } from "@/context/AdminContext";

export default function TeamsHero() {
  const router = useRouter();
  const { batches } = useAdmin();
  const years = useMemo(() => orderBatchYears(batches), [batches]);

  const openBatches = () => {
    const year = years[0] ?? "2025";
    router.push(`/teams/batch/${year}`);
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-transparent pt-[76px]"
    >
      {/* Left decorative waves */}
      <svg
        aria-hidden
        className="pointer-events-none absolute -left-8 top-1/2 hidden h-[120%] w-[180px] -translate-y-1/2 text-[#93c5fd]/55 lg:block xl:w-[220px]"
        viewBox="0 0 120 600"
        fill="currentColor"
        preserveAspectRatio="none"
      >
        <path d="M0 0 C40 80, 90 120, 70 200 C50 280, 100 320, 80 400 C60 480, 40 520, 0 600 Z" opacity="0.45" />
        <path d="M0 40 C55 100, 100 160, 75 240 C45 330, 95 380, 70 460 C50 520, 30 560, 0 600 Z" opacity="0.7" />
        <path d="M0 80 C45 140, 80 200, 55 280 C30 360, 70 420, 50 500 C35 545, 15 575, 0 600 Z" />
      </svg>

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-76px)] max-w-[1400px] grid-cols-1 items-center lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        {/* Left copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 px-[6vw] py-14 text-left sm:px-[5vw] lg:py-20 lg:pr-8 lg:pl-[4vw] xl:pl-[5vw]"
        >
          <p
            className="mb-4 text-[1.35rem] leading-none text-[#3b82f6] sm:text-[1.55rem]"
            style={{ fontFamily: "Caveat, cursive" }}
          >
            <span className="mr-1 text-[#60a5fa]">{"{"}</span>
            Students / Ideas / Impact
            <span className="ml-1 text-[#60a5fa]">{"}"}</span>
          </p>

          <RotatingTitle
            as="h1"
            className="min-h-[1.15em] text-[clamp(2.35rem,4.6vw,3.75rem)] font-bold leading-[1.08] tracking-tight text-[#1d4ed8]"
            gradientClassName="text-[#1d4ed8]"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          />

          <p className="mt-6 max-w-md text-[1.05rem] font-bold leading-snug text-[#1e3a8a] sm:mt-7 sm:text-[1.2rem]">
            The people behind ISTE’s ideas, innovation and impact.
          </p>
          <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-[#64748b] sm:text-base">
            At ISTE, our team works together to create opportunities, organize
            events, and support students. Every member contributes to building a
            stronger and more connected community.
          </p>

          <motion.button
            type="button"
            onClick={openBatches}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#2563eb] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(37,99,235,0.35)] transition-all duration-300 hover:scale-[1.03] hover:bg-[#1d4ed8]"
          >
            Explore Our Community
            <ArrowRight size={16} strokeWidth={2.5} />
          </motion.button>
        </motion.div>

        {/* Right campus image with curved left edge */}
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[320px] w-full sm:h-[420px] lg:h-full lg:min-h-[560px]"
        >
          <svg width="0" height="0" aria-hidden className="absolute">
            <defs>
              <clipPath id="teams-hero-curve" clipPathUnits="objectBoundingBox">
                <path d="M0.18,0 C0.06,0.22 0.05,0.45 0.14,0.62 C0.22,0.78 0.1,0.9 0.16,1 L1,1 L1,0 Z" />
              </clipPath>
            </defs>
          </svg>

          <div
            className="absolute inset-0 overflow-hidden bg-[#dbeafe]"
            style={{ clipPath: "url(#teams-hero-curve)" }}
          >
            <Image
              src="/teams-hero-campus.jpg"
              alt="Campus building"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover object-[center_40%]"
            />
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-[18%] bg-gradient-to-r from-white via-white/40 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
