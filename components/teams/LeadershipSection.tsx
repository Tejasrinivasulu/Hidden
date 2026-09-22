"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import SpotlightCard from "@/components/ui/SpotlightCard";

const leadership = [
  {
    id: "l1",
    name: "Dr. Smitha Rao",
    role: "Faculty Coordinator",
    bio: "Guiding the chapter with academic excellence and providing strategic direction for all student-led initiatives.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    linkedin: "#",
    email: "#",
  },
  {
    id: "l2",
    name: "Rahul Verma",
    role: "Chairperson",
    bio: "Leading the executive board and ensuring the smooth functioning of all ISTE MBU activities.",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=400",
    linkedin: "#",
    email: "#",
  },
  {
    id: "l3",
    name: "Sneha Reddy",
    role: "Vice Chairperson",
    bio: "Assisting in chapter governance and coordinating cross-team collaborations for major fests.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
    linkedin: "#",
    email: "#",
  },
  {
    id: "l4",
    name: "Karan Singh",
    role: "Secretary",
    bio: "Managing communications, meeting records, and official documentation for the chapter.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    linkedin: "#",
    email: "#",
  },
  {
    id: "l5",
    name: "Pooja Sharma",
    role: "Treasurer",
    bio: "Overseeing financial planning, budgets, and resource allocation for technical events.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    linkedin: "#",
    email: "#",
  },
];

export default function LeadershipSection() {
  return (
    <section id="leadership" className="py-24 px-[5vw] bg-[#071120] relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-wide text-white">
            Our <span className="text-[#6BE6FF]">Leadership</span>
          </h2>
          <p className="font-mono text-sm text-[#B8C7D9] mt-4 uppercase tracking-widest max-w-2xl">
            The visionary minds guiding ISTE MBU towards technical excellence.
          </p>
        </motion.div>

        {/* CSS Carousel on Mobile, Grid on Desktop */}
        <div className="flex overflow-x-auto lg:grid lg:grid-cols-3 xl:grid-cols-5 gap-6 pb-8 snap-x snap-mandatory lg:snap-none hide-scrollbar">
          {leadership.map((leader, idx) => (
            <motion.div
              key={leader.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="min-w-[280px] w-full snap-center shrink-0 lg:shrink"
            >
              <SpotlightCard
                spotlightColor="rgba(107, 230, 255, 0.15)"
                className="bg-[#0F1F35] border border-[rgba(255,255,255,0.08)] rounded-[20px] p-6 h-full flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] group"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-[rgba(255,255,255,0.1)] group-hover:border-[#6BE6FF] transition-colors duration-300 relative">
                  <img src={leader.image} alt={leader.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                  <div className="absolute inset-0 bg-[#6BE6FF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />
                </div>

                <h3 className="font-display text-xl font-bold text-white mb-1 group-hover:text-[#6BE6FF] transition-colors duration-300">
                  {leader.name}
                </h3>
                <span className="font-mono text-xs uppercase tracking-widest text-[#4ADE80] mb-4">
                  {leader.role}
                </span>

                <p className="text-sm text-[#B8C7D9] mb-6 flex-grow leading-relaxed">
                  {leader.bio}
                </p>

                <div className="flex gap-3 mt-auto">
                  <a href={leader.linkedin} className="w-8 h-8 rounded-full bg-[#071120] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#B8C7D9] hover:text-[#0077B5] hover:border-[#0077B5] hover:shadow-[0_0_10px_rgba(0,119,181,0.3)] transition-all">
                    <FaLinkedin size={14} />
                  </a>
                  <a href={leader.email} className="w-8 h-8 rounded-full bg-[#071120] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#B8C7D9] hover:text-[#6BE6FF] hover:border-[#6BE6FF] hover:shadow-[0_0_10px_rgba(107,230,255,0.3)] transition-all">
                    <Mail size={14} />
                  </a>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


