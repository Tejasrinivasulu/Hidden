"use client";

import { useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import SpotlightCard from "@/components/ui/SpotlightCard";
import BorderGlow from "@/components/ui/BorderGlow";
import { BookOpen, Code, FileText, ExternalLink, Download } from "lucide-react";

export default function ResourcesPage() {
  const { resources } = useAdmin();

  // Fallback default resources
  const defaultResources = [
    {
      id: 1,
      title: "React Workshop Materials",
      description: "Slides and source code from the 'Intro to React' workshop.",
      type: "code",
      link: "#",
      tag: "Workshop"
    },
    {
      id: 2,
      title: "UI/UX Design Guidelines",
      description: "Official ISTE chapter design system and asset library.",
      type: "document",
      link: "#",
      tag: "Design"
    },
    {
      id: 3,
      title: "Data Structures Cheatsheet",
      description: "Quick reference guide for common algorithms and data structures.",
      type: "book",
      link: "#",
      tag: "Cheatsheet"
    },
    {
      id: 4,
      title: "Web3 Starter Pack",
      description: "A curated list of resources to get started with Web3 development.",
      type: "document",
      link: "#",
      tag: "Web3"
    },
    {
      id: 5,
      title: "Previous Year Question Papers",
      description: "Archive of past mid-term and end-term exams for CS.",
      type: "document",
      link: "#",
      tag: "Academics"
    },
    {
      id: 6,
      title: "Machine Learning Roadmap",
      description: "Step-by-step guide to mastering ML algorithms and deployment.",
      type: "book",
      link: "#",
      tag: "Roadmap"
    }
  ];

  const allResources = resources.length > 0 ? resources : defaultResources;

  const getIcon = (type: string) => {
    switch (type) {
      case 'code': return <Code size={24} className="text-[var(--accent-blue)]" />;
      case 'book': return <BookOpen size={24} className="text-[var(--accent-purple)]" />;
      case 'document': 
      default: return <FileText size={24} className="text-[var(--accent-pink)]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-white pt-32 pb-24 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-[var(--accent-blue)]/5 to-[var(--accent-purple)]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-[5vw] relative z-10">
        
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-black uppercase tracking-tight mb-4">
            Knowledge <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-pink)]">Nexus</span>
          </h1>
          <p className="text-gray-400 font-mono max-w-2xl mx-auto">
            Access our curated repository of academic materials, workshop assets, and technical guides.
          </p>
        </div>

        {/* Featured Resource */}
        <div className="mb-16">
          <BorderGlow glowColor="192 100 60" edgeSensitivity={50} className="w-full">
            <div className="bg-[#0f0f1a] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl">
                <div className="inline-block bg-[var(--accent-blue)]/20 text-[var(--accent-blue)] font-mono text-xs px-3 py-1 rounded-full uppercase tracking-widest mb-4 border border-[var(--accent-blue)]/30">
                  Featured Archive
                </div>
                <h2 className="text-3xl font-display font-bold mb-4">ISTE Hackathon 2024 Starter Kits</h2>
                <p className="text-gray-400 mb-6 font-mono text-sm leading-relaxed">
                  Everything you need to kickstart your hackathon project. Includes boilerplate code for Next.js, Firebase integration, and pre-built UI components from our design system.
                </p>
                <button className="bg-white text-black font-bold px-6 py-3 rounded hover:bg-gray-200 transition-colors flex items-center gap-2">
                  <Download size={18} /> Download Archive (ZIP)
                </button>
              </div>
              
              <div className="w-48 h-48 relative flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] rounded-2xl opacity-20 animate-pulse"></div>
                <div className="absolute inset-4 bg-[#151522] rounded-xl flex items-center justify-center border border-gray-700">
                  <Code size={64} className="text-[var(--accent-blue)]" />
                </div>
              </div>
            </div>
          </BorderGlow>
        </div>

        {/* Grid of Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {allResources.map(resource => (
            <BorderGlow key={resource.id} glowColor="280 80 60" className="h-full">
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                    {getIcon(resource.type)}
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-mono text-gray-500 bg-black/50 px-2 py-1 rounded">
                    {resource.tag}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold font-display mb-3 line-clamp-2">{resource.title}</h3>
                <p className="text-gray-400 text-sm mb-8 flex-grow">{resource.description}</p>
                
                <a href={resource.link} className="inline-flex items-center gap-2 text-[var(--accent-purple)] hover:text-white font-mono text-sm tracking-widest uppercase transition-colors group mt-auto w-fit">
                  Access File <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
            </BorderGlow>
          ))}
        </div>

      </div>
    </div>
  );
}
