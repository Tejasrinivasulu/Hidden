"use client";

import { use } from "react";
import { useAdmin } from "@/context/AdminContext";
import BorderGlow from "@/components/ui/BorderGlow";
import Link from "next/link";
import { ArrowLeft, Globe, Briefcase, Mail } from "lucide-react";

const teamData: Record<string, { name: string; color: string; description: string; members: any[] }> = {
  core: {
    name: "Core Committee",
    color: "#7c3aed",
    description: "The visionary leaders driving the ISTE chapter forward.",
    members: [
      { id: 1, name: "Alice Johnson", role: "President", image: "https://picsum.photos/seed/alice/400/400?grayscale", social: { ln: "#", gh: "#" } },
      { id: 2, name: "Bob Smith", role: "Vice President", image: "https://picsum.photos/seed/bob/400/400?grayscale", social: { ln: "#" } }
    ]
  },
  tech: {
    name: "Technical Team",
    color: "#00d4ff",
    description: "The engineers and developers building the future.",
    members: [
      { id: 3, name: "Charlie Davis", role: "Lead Developer", image: "https://picsum.photos/seed/charlie/400/400?grayscale", social: { gh: "#" } },
      { id: 4, name: "Diana Prince", role: "Web Master", image: "https://picsum.photos/seed/diana/400/400?grayscale", social: { ln: "#", gh: "#" } }
    ]
  },
  design: {
    name: "Design & Media",
    color: "#f472b6",
    description: "The creative artists shaping our visual identity.",
    members: [
      { id: 5, name: "Eva Green", role: "Design Lead", image: "https://picsum.photos/seed/eva/400/400?grayscale", social: { ln: "#" } }
    ]
  },
  pr: {
    name: "Public Relations",
    color: "#10b981",
    description: "The communicators connecting us with the world.",
    members: [
      { id: 6, name: "Frank White", role: "PR Head", image: "https://picsum.photos/seed/frank/400/400?grayscale", social: { ln: "#" } }
    ]
  }
};

export default function TeamDetailsPage({ params }: { params: Promise<{ teamSlug: string }> }) {
  const { teamSlug } = use(params);
  const team = teamData[teamSlug as keyof typeof teamData];

  if (!team) {
    return <div className="min-h-screen bg-[var(--bg-primary)] text-white pt-32 text-center">Team not found</div>;
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-white pt-32 pb-24 relative overflow-hidden">
      {/* Background glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-[150px] opacity-10 pointer-events-none"
        style={{ backgroundColor: team.color }}
      />

      <div className="container mx-auto px-[5vw] relative z-10">
        <Link href="/teams" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-mono uppercase text-sm tracking-widest mb-12">
          <ArrowLeft size={16} /> Return to Divisions
        </Link>

        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-black uppercase tracking-tight mb-4" style={{ color: team.color }}>
            {team.name}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">{team.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {team.members.map(member => (
            <BorderGlow key={member.id} glowColor="192 100 60" className="group h-full">
              <div className="flex flex-col h-full relative overflow-hidden bg-[#0a0a0f] rounded-2xl">
                <div className="relative aspect-square overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/20 to-transparent"></div>
                  
                  {/* Social links overlay */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    {member.social?.ln && <a href={member.social.ln} className="bg-black/50 p-2 rounded-full hover:bg-[var(--accent-blue)] transition-colors"><Briefcase size={16} /></a>}
                    {member.social?.gh && <a href={member.social.gh} className="bg-black/50 p-2 rounded-full hover:bg-[var(--accent-purple)] transition-colors"><Globe size={16} /></a>}
                  </div>
                </div>
                
                <div className="p-6 relative flex-grow">
                  <div className="absolute -top-6 left-6 w-12 h-1 bg-[var(--accent-blue)]" style={{ backgroundColor: team.color }}></div>
                  <h3 className="text-2xl font-bold font-display uppercase tracking-wide text-white mb-1">{member.name}</h3>
                  <p className="font-mono text-sm uppercase tracking-widest" style={{ color: team.color }}>{member.role}</p>
                </div>
              </div>
            </BorderGlow>
          ))}
        </div>
      </div>
    </div>
  );
}
