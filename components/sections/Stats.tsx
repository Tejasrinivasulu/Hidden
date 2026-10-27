"use client";

import { motion } from "framer-motion";
import { useAdmin } from "@/context/AdminContext";

export default function Stats() {
  const { memberStats } = useAdmin();
  const stats = [
    {
      value: `${memberStats.total}`,
      label: `ISTE members — ${memberStats.batch2025} from 2025, ${memberStats.batch2024} from 2024`,
    },
    {
      value: "50+",
      label: "Workshops, hackathons, and technical events hosted",
    },
    {
      value: "7",
      label: "Domain teams driving design, web, media, and more",
    },
  ];

  return (
    <section
      id="stats"
      className="landing-section relative overflow-hidden px-[5vw] py-16 md:py-20"
    >
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-12 pl-8 sm:grid-cols-3 sm:gap-10 sm:pl-14 md:gap-14 md:pl-20 lg:pl-28">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.55,
              delay: i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-left"
          >
            <div className="font-display text-[clamp(3.2rem,7vw,5rem)] font-bold leading-none tracking-[-0.03em] text-primary">
              {stat.value}
            </div>
            <p className="mt-4 max-w-[260px] text-[0.95rem] leading-[1.55] text-primary/70">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
