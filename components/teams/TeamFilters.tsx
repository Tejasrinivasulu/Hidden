"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";

interface TeamFiltersProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeFilter: string;
  setActiveFilter: (f: string) => void;
}

const filters = [
  "All Teams",
  "Creative",
  "Management",
  "Technical",
  "Operations",
  "Marketing"
];

export default function TeamFilters({ searchQuery, setSearchQuery, activeFilter, setActiveFilter }: TeamFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12">
      {/* Filter Pills */}
      <div className="flex flex-wrap justify-center md:justify-start gap-3 w-full md:w-auto">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-300 border ${activeFilter === filter
                ? "bg-[#6BE6FF] text-[#071120] border-[#6BE6FF] shadow-[0_0_15px_rgba(107,230,255,0.4)]"
                : "bg-transparent text-[#B8C7D9] border-[rgba(255,255,255,0.1)] hover:border-[#6BE6FF]/50 hover:text-white"
              }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative w-full md:w-64 lg:w-80 shrink-0">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B8C7D9] w-4 h-4" />
        <input
          type="text"
          placeholder="Search teams or skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#0B172A] border border-[rgba(255,255,255,0.1)] text-white text-sm rounded-full pl-11 pr-4 py-3 focus:outline-none focus:border-[#6BE6FF] focus:shadow-[0_0_15px_rgba(107,230,255,0.2)] transition-all placeholder:text-[#B8C7D9]/50 font-mono"
        />
      </div>
    </div>
  );
}
