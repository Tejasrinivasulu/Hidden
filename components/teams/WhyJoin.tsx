"use client";

import { motion } from "framer-motion";
import { Code, Award, Target, Network, FileBadge, Users } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";
import BorderGlow from "@/components/ui/BorderGlow";

const reasons = [
  { icon: Code, title: "Build Technical Skills", desc: "Gain hands-on experience with modern tools, frameworks, and industry practices." },
  { icon: Award, title: "Gain Leadership Experience", desc: "Lead teams, manage projects, and develop essential soft skills for your career." },
  { icon: Target, title: "Work on Real Projects", desc: "Contribute to live digital platforms, large-scale events, and impactful campaigns." },
  { icon: Network, title: "Expand Professional Network", desc: "Connect with alumni, industry experts, and talented peers across departments." },
  { icon: FileBadge, title: "Enhance Resume & Portfolio", desc: "Showcase real, measurable achievements and projects to future employers." },
  { icon: Users, title: "Collaborate with Peers", desc: "Work in a diverse environment with like-minded students driven by innovation." },
];

export default function WhyJoin() {
  return (
    <section className="py-24 px-[5vw] bg-[#071120] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-mono text-xs tracking-[4px] uppercase text-[#6BE6FF] font-bold mb-2 block">
            The Benefits
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-wide text-white">
            Why Join <span className="text-[#6BE6FF]">ISTE?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="h-full"
              >
                <BorderGlow glowColor="107 230 255" className="h-full !p-0">
                  <SpotlightCard
                    spotlightColor="rgba(107, 230, 255, 0.1)"
                    className="bg-[#0F1F35] border border-[rgba(255,255,255,0.05)] rounded-2xl p-8 h-full flex flex-col hover:border-[#6BE6FF]/30 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#6BE6FF]/10 flex items-center justify-center text-[#6BE6FF] mb-6 border border-[#6BE6FF]/20">
                      <Icon size={24} />
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mb-3">
                      {reason.title}
                    </h3>
                    <p className="text-[#B8C7D9] text-sm leading-relaxed">
                      {reason.desc}
                    </p>
                  </SpotlightCard>
                </BorderGlow>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


