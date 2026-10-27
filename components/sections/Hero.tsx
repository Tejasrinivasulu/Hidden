"use client";

import { motion } from "framer-motion";
import {
  Users,
  Lightbulb,
  Network,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const features = [
  { icon: Users, label: ["Technical", "Events"] },
  { icon: Lightbulb, label: ["Skill", "Development"] },
  { icon: Network, label: ["Industry", "Collaboration"] },
  { icon: GraduationCap, label: ["Student", "Empowerment"] },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: 0.12 + i * 0.1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-[#06101f] pt-[calc(76px+var(--upcoming-banner-h,0px))]"
    >
      {/* Hero background — latest studio scene */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/hero-iste-studio.png"
          alt=""
          fill
          priority
          quality={100}
          unoptimized
          className="object-cover object-[72%_42%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06101f]/65 via-[#06101f]/25 via-40% to-transparent to-70%" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06101f]/55 via-transparent to-[#06101f]/15" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-76px)] w-full max-w-[1440px] flex-col justify-start gap-8 px-[5vw] pt-16 pb-10 sm:pt-20 lg:gap-10 lg:pt-24 lg:pb-8">
        <div className="grid grid-cols-1 items-start lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.1fr)]">
          {/* Left copy */}
          <div className="relative z-20 -ml-4 mt-6 flex max-w-[560px] flex-col items-start sm:-ml-8 sm:mt-8 lg:-ml-12 lg:mt-10">
            <motion.h1
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="font-display text-[clamp(2.1rem,4.5vw,3.6rem)] font-bold leading-[1.12] tracking-[-0.02em] text-white"
            >
              <span className="block">Indian Society for</span>
              <span className="block whitespace-nowrap text-white">
                Technical Education
              </span>
            </motion.h1>

            <motion.p
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-4 max-w-[520px] text-[0.98rem] leading-[1.7] text-white/75"
            >
              <span className="block">
                ISTE empowers students with technical skills, knowledge, and
              </span>
              <span className="block">
                new ideas while encouraging learning, teamwork, and growth
              </span>
              <span className="block">to build a bright future.</span>
            </motion.p>

            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-12 mb-4"
            >
              <Link
                href="/gallery"
                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#1570d0] via-[#1e9ef0] to-[#00d4ff] px-7 py-3 text-[0.92rem] font-semibold text-white shadow-[0_0_0_1px_rgba(0,212,255,0.45),0_0_36px_rgba(0,180,255,0.5)] transition duration-300 hover:-translate-y-0.5"
              >
                Explore Our Journey
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </div>

          {/* Spacer — background image shows through */}
          <div className="hidden min-h-[280px] lg:block" aria-hidden />
        </div>

        <motion.ul
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="relative z-20 mt-4 -ml-5 grid w-full max-w-[560px] grid-cols-2 gap-x-4 gap-y-5 sm:mt-6 sm:-ml-10 sm:grid-cols-4 sm:gap-x-0 sm:gap-y-0"
        >
          {features.map(({ icon: Icon, label }, i) => (
            <li
              key={label.join(" ")}
              className={`flex flex-col items-start gap-1.5 px-0 sm:pr-4 sm:pl-0 ${
                i > 0 ? "sm:border-l sm:border-white/15 sm:pl-4" : ""
              }`}
            >
              <Icon size={20} strokeWidth={1.5} className="text-white/90" />
              <span className="text-[0.75rem] leading-snug font-medium text-white/80">
                {label[0]}
                <br />
                {label[1]}
              </span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
