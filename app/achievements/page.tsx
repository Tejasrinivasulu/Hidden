"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { Search, Trophy, Award, Rocket, FileBadge, Target, Users, BookOpen, Presentation, ChevronRight, Briefcase } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";
import LogoLoop from "@/components/ui/LogoLoop";
import {
  achievementsData,
  statisticsData,
  type Achievement,
} from "@/lib/data/achievements";
import { useAdmin } from "@/context/AdminContext";

// Badges mapping
const categoryIcons: Record<string, React.ElementType> = {
  All: Target,
  Award: Award,
  Hackathon: Rocket,
  Competition: Trophy,
  Research: BookOpen,
  Project: Briefcase,
  Certification: FileBadge,
  Workshop: Presentation,
  Leadership: Users,
};

const categories = ["All", "Award", "Hackathon", "Competition", "Research", "Project", "Certification", "Workshop", "Leadership"];
const years = ["All Years", "2026", "2025", "2024", "2023"];

export default function AchievementsPage() {
  const { achievements: adminAchievements } = useAdmin();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeYear, setActiveYear] = useState<string>("All Years");
  const [searchQuery, setSearchQuery] = useState("");

  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const allAchievements = useMemo<Achievement[]>(() => {
    const fromAdmin: Achievement[] = adminAchievements.map((a) => ({
      id: String(a.id),
      slug: a.slug,
      title: a.title,
      category: a.category as Achievement["category"],
      date: a.date,
      year: a.year,
      description: a.description,
      featured: a.featured,
      images: a.image ? [a.image] : [],
      teamMembers: a.teamMembers,
      teamName: a.teamName,
    }));
    return [...fromAdmin, ...achievementsData];
  }, [adminAchievements]);

  // Filter logic
  const filteredAchievements = useMemo(() => {
    return allAchievements.filter(ach => {
      const matchesCategory = activeCategory === "All" || ach.category === activeCategory;
      const matchesYear = activeYear === "All Years" || ach.year === activeYear;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = ach.title.toLowerCase().includes(searchLower) || 
                            ach.description.toLowerCase().includes(searchLower) || 
                            ach.teamName.toLowerCase().includes(searchLower);
      return matchesCategory && matchesYear && matchesSearch;
    });
  }, [allAchievements, activeCategory, activeYear, searchQuery]);

  const featuredAchievement =
    allAchievements.find((a) => a.featured) || allAchievements[0];

  // Extract all images for the scrolling background
  const backgroundImages = useMemo(() => {
    return allAchievements
      .flatMap(ach => ach.images)
      .map(src => ({ src }));
  }, [allAchievements]);

  return (
    <div className="bg-[#050a18] text-white overflow-hidden font-inter">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] pt-32 pb-20 flex flex-col justify-center bg-[#050a18]">
        {/* Hero Background Elements */}
        <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[rgba(124,58,237,0.15)] blur-[120px]"></div>
          <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[rgba(0,212,255,0.1)] blur-[100px]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
          
          {/* Scrolling Images Background */}
          <div className="absolute inset-0 -rotate-6 scale-110 opacity-30 flex flex-col justify-center gap-6 mix-blend-screen" style={{ transformOrigin: 'center center' }}>
            <LogoLoop 
              logos={backgroundImages}
              speed={25}
              direction="left"
              gap={24}
              renderItem={(item, key) => (
                <div key={key} className="w-[300px] h-[200px] rounded-2xl overflow-hidden border border-white/10">
                  <img src={item.src} className="w-full h-full object-cover grayscale opacity-60" alt="" loading="lazy" />
                </div>
              )}
            />
            <LogoLoop 
              logos={backgroundImages.slice().reverse()}
              speed={20}
              direction="right"
              gap={24}
              renderItem={(item, key) => (
                <div key={key} className="w-[400px] h-[250px] rounded-2xl overflow-hidden border border-white/10">
                  <img src={item.src} className="w-full h-full object-cover grayscale opacity-60" alt="" loading="lazy" />
                </div>
              )}
            />
          </div>
          
          {/* Gradient fade out at the bottom of the hero background */}
          <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-[#050a18] to-transparent"></div>
        </div>

        <div className="container mx-auto px-[5vw] relative z-10 flex flex-col items-center justify-center flex-grow text-center mt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-space font-extrabold uppercase tracking-tight mb-6 text-white">
              Celebrating Excellence & <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[rgba(0,212,255,1)] to-[rgba(124,58,237,1)] drop-shadow-[0_0_15px_rgba(0,212,255,0.4)]">
                Innovation
              </span>
            </h1>
            <p className="text-gray-400 font-inter text-lg md:text-xl max-w-3xl mx-auto mb-16 leading-relaxed">
              Showcasing the milestones, awards, recognitions, and achievements earned by ISTE MBU members through innovation, leadership, and technical excellence.
            </p>
          </motion.div>
        </div>

        {/* Stats Strip at bottom of Hero */}
        <div className="container mx-auto px-[5vw] relative z-10 mt-auto">
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8 bg-[#0f0f1a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_0_30px_rgba(124,58,237,0.1)]">
            {[
              { label: "Total Achievements", value: statisticsData.totalAchievements, icon: <Trophy size={20}/> },
              { label: "Awards Won", value: statisticsData.awardsWon, icon: <Award size={20}/> },
              { label: "Students Recognized", value: statisticsData.studentsRecognized, icon: <Users size={20}/> },
              { label: "Projects Showcased", value: statisticsData.projectsShowcased, icon: <Briefcase size={20}/> },
              { label: "National Level", value: statisticsData.nationalLevel, icon: <Target size={20}/> },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center p-4">
                <div className="text-[rgba(0,212,255,1)] mb-3 bg-white/5 p-3 rounded-xl border border-white/5">{stat.icon}</div>
                <div className="text-4xl font-jetbrains font-bold text-white mb-2">
                  {statsInView ? <CountUp end={stat.value} duration={2.5} separator="," /> : "0"}+
                </div>
                <div className="text-xs uppercase tracking-widest font-mono text-gray-500 text-center">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Featured Achievement Spotlight */}
      {activeCategory === "All" && activeYear === "All Years" && searchQuery === "" && (
        <section className="w-full py-32 bg-[#0a0f1a] border-y border-white/5 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[rgba(0,212,255,0.3)] to-transparent"></div>
          
          <div className="container mx-auto px-[5vw]">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-space font-bold mb-4 flex items-center justify-center gap-3">
                <span className="text-[rgba(255,193,7,1)]"><Trophy size={32} /></span> Featured Spotlight
              </h2>
              <p className="text-gray-400 font-inter text-lg max-w-2xl mx-auto">Highlighting our most significant recent milestone and the incredible team behind it.</p>
            </div>

            <SpotlightCard className="rounded-3xl border border-white/10 bg-[#0f0f1a]/50 p-1 md:p-1 w-full" spotlightColor="rgba(124, 58, 237, 0.15)">
              <div className="bg-[#0f0f1a] rounded-[22px] p-8 md:p-12 flex flex-col lg:flex-row gap-10 relative overflow-hidden h-full border border-white/5">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-[rgba(124,58,237,0.2)] blur-[80px] rounded-full pointer-events-none"></div>
                
                <div className="flex-1 z-10 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 bg-[rgba(0,212,255,0.1)] text-[rgba(0,212,255,1)] px-3 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-6 w-fit border border-[rgba(0,212,255,0.2)]">
                    <Rocket size={14} /> Featured
                  </div>
                  <h3 className="text-4xl font-space font-bold mb-4">{featuredAchievement.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400 font-mono mb-6">
                    <span className="text-[rgba(124,58,237,1)] font-semibold">{featuredAchievement.teamName}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
                    <span>{featuredAchievement.date}</span>
                  </div>
                  <p className="text-gray-300 font-inter text-lg leading-relaxed mb-8 max-w-2xl">
                    {featuredAchievement.description}
                  </p>
                  <Link href={`/achievements/${featuredAchievement.slug}`}>
                    <button className="bg-white text-black font-inter font-bold px-8 py-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2 group w-fit">
                      Read Full Story <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
                
                <div className="w-full lg:w-[45%] h-[300px] lg:h-auto rounded-xl overflow-hidden relative border border-white/10 group z-10 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                  <img 
                    src={featuredAchievement.images[0] || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1740&auto=format&fit=crop"} 
                    alt={featuredAchievement.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] to-transparent opacity-60"></div>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </section>
      )}

      {/* 3. Achievement Cards Grid & Filters */}
      <section className="w-full py-32 bg-[#050a18]">
        <div className="container mx-auto px-[5vw]">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl font-space font-bold mb-4 flex items-center justify-center gap-3">
              <span className="text-[rgba(0,212,255,1)]"><Target size={32} /></span> Discover Milestones
            </h2>
            <p className="text-gray-400 font-inter text-lg max-w-2xl mx-auto">Explore the breadth of our accomplishments across different categories and years.</p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col items-center mb-16 space-y-8 bg-[#0f0f1a] p-8 rounded-3xl border border-white/5">
            <div className="relative w-full max-w-3xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search achievements..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#050a18] border border-white/10 rounded-full py-4 pl-12 pr-6 text-white font-inter focus:outline-none focus:border-[rgba(124,58,237,0.5)] focus:ring-1 focus:ring-[rgba(124,58,237,0.5)] transition-all shadow-inner"
              />
            </div>

            <div className="flex flex-col gap-5 w-full items-center">
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((cat) => {
                  const Icon = categoryIcons[cat] || Trophy;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-inter text-sm font-medium transition-all duration-300 ${
                        activeCategory === cat 
                        ? "bg-gradient-to-r from-[rgba(124,58,237,0.8)] to-[rgba(0,212,255,0.8)] text-white shadow-[0_0_15px_rgba(124,58,237,0.4)] border border-transparent" 
                        : "bg-[#050a18] text-gray-400 border border-white/10 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      <Icon size={16} />
                      {cat}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => setActiveYear(year)}
                    className={`px-4 py-1.5 rounded-full font-jetbrains text-xs font-medium transition-all duration-300 ${
                      activeYear === year 
                      ? "bg-white/10 text-white border border-white/30" 
                      : "bg-transparent text-gray-500 border border-transparent hover:text-gray-300"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <AnimatePresence mode="popLayout">
            {filteredAchievements.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-center py-20 bg-[#0f0f1a] rounded-3xl border border-white/5"
              >
                <Search size={48} className="mx-auto text-gray-600 mb-4" />
                <p className="text-gray-400 font-inter text-lg">No achievements found matching your criteria.</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredAchievements.map((ach, i) => {
                  const CatIcon = categoryIcons[ach.category] || Trophy;
                  return (
                    <motion.div
                      key={ach.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                    >
                      <Link href={`/achievements/${ach.slug}`}>
                        <div className="group h-full bg-[#0f0f1a] rounded-2xl border border-white/5 hover:border-[rgba(124,58,237,0.5)] transition-all duration-300 overflow-hidden hover:shadow-[0_10px_30px_rgba(124,58,237,0.1)] flex flex-col">
                          <div className="h-56 overflow-hidden relative">
                            <img 
                              src={ach.images[0] || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1740&auto=format&fit=crop"} 
                              alt={ach.title}
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                              <div className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2 w-fit">
                                <CatIcon size={12} className="text-[rgba(0,212,255,1)]" />
                                <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">{ach.category}</span>
                              </div>
                              {ach.featured && (
                                <div className="bg-[rgba(255,193,7,0.2)] backdrop-blur-md border border-[rgba(255,193,7,0.4)] px-3 py-1.5 rounded-full flex items-center gap-2 w-fit">
                                  <Trophy size={12} className="text-[rgba(255,193,7,1)]" />
                                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[rgba(255,193,7,1)]">Featured</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="p-8 flex flex-col flex-grow relative">
                            <div className="flex items-center justify-between text-xs font-mono text-gray-500 mb-4 uppercase tracking-widest">
                              <span>{ach.date}</span>
                            </div>
                            <h3 className="text-2xl font-poppins font-semibold mb-4 text-white group-hover:text-[rgba(0,212,255,1)] transition-colors leading-tight">{ach.title}</h3>
                            <p className="text-sm font-inter text-gray-400 mb-8 flex-grow line-clamp-3 leading-relaxed">{ach.description}</p>
                            
                            <div className="flex items-center justify-between mt-auto pt-5 border-t border-white/5">
                              <span className="text-sm font-mono text-[rgba(124,58,237,1)] font-medium">{ach.teamName}</span>
                              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[rgba(124,58,237,0.2)] transition-colors text-white group-hover:text-[rgba(124,58,237,1)]">
                                <ChevronRight size={16} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
