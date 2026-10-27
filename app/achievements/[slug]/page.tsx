"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { achievementsData, type Achievement } from "@/lib/data/achievements";
import { useAdmin } from "@/context/AdminContext";
import {
  ChevronLeft,
  Calendar,
  Users,
  Trophy,
  Image as ImageIcon,
  Share2,
  Link as LinkIcon,
} from "lucide-react";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import BorderGlow from "@/components/ui/BorderGlow";

export default function AchievementDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { achievements: adminAchievements, isHydrated } = useAdmin();

  const achievement = useMemo<Achievement | undefined>(() => {
    const fromAdmin = adminAchievements.find((a) => a.slug === slug);
    if (fromAdmin) {
      return {
        id: String(fromAdmin.id),
        slug: fromAdmin.slug,
        title: fromAdmin.title,
        category: fromAdmin.category as Achievement["category"],
        date: fromAdmin.date,
        year: fromAdmin.year,
        description: fromAdmin.description,
        featured: fromAdmin.featured,
        images: fromAdmin.image ? [fromAdmin.image] : [],
        teamMembers: fromAdmin.teamMembers,
        teamName: fromAdmin.teamName,
      };
    }
    return achievementsData.find((a) => a.slug === slug);
  }, [adminAchievements, slug]);

  if (!achievement) {
    if (!isHydrated) {
      return (
        <div className="min-h-screen bg-[#04060f] flex items-center justify-center text-white/60 font-mono text-sm">
          Loading achievement…
        </div>
      );
    }
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#04060f] text-white pt-32 pb-24 relative overflow-hidden font-inter">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[500px] bg-[rgba(124,58,237,0.1)] blur-[150px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-[5vw] relative z-10 max-w-5xl">
        <Link
          href="/achievements"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 font-mono text-sm tracking-wider uppercase group"
        >
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
            <ChevronLeft size={16} />
          </div>
          Back to Achievements
        </Link>

        <div className="mb-16">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 bg-[rgba(124,58,237,0.1)] text-[rgba(124,58,237,1)] px-4 py-2 rounded-full text-sm font-mono font-bold uppercase tracking-wider border border-[rgba(124,58,237,0.2)]">
              <Trophy size={16} /> {achievement.category}
            </div>
            {achievement.featured && (
              <div className="inline-flex items-center gap-2 bg-[rgba(255,193,7,0.1)] text-[rgba(255,193,7,1)] px-4 py-2 rounded-full text-sm font-mono font-bold uppercase tracking-wider border border-[rgba(255,193,7,0.2)] shadow-[0_0_15px_rgba(255,193,7,0.1)]">
                <Trophy size={16} className="text-[rgba(255,193,7,1)]" /> Featured
              </div>
            )}
          </div>
          <h1 className="text-4xl md:text-6xl font-space font-extrabold mb-6 text-white leading-tight">
            {achievement.title}
          </h1>

          <div className="flex flex-wrap gap-6 text-gray-400 font-mono text-sm">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-[rgba(0,212,255,1)]" />
              {achievement.date}
            </div>
            <div className="flex items-center gap-2">
              <Users size={18} className="text-[rgba(0,212,255,1)]" />
              {achievement.teamName}
            </div>
          </div>
        </div>

        {achievement.images && achievement.images.length > 0 && (
          <div className="mb-16 rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={achievement.images[0]}
              alt={achievement.title}
              loading="lazy"
              className="w-full max-h-[600px] object-cover"
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-space font-bold mb-6 text-white">
              The Story
            </h2>
            <div className="prose prose-invert prose-lg max-w-none font-inter text-gray-300 leading-relaxed">
              {achievement.fullStory ? (
                <p>{achievement.fullStory}</p>
              ) : (
                <p>{achievement.description}</p>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <BorderGlow glowColor="124 58 237" className="w-full rounded-2xl">
              <div className="bg-[#0f0f1a] p-6 rounded-xl border border-white/5 h-full">
                <h3 className="text-xl font-space font-bold mb-6 text-white flex items-center gap-2">
                  <Users size={20} className="text-[rgba(124,58,237,1)]" /> Team
                  Members
                </h3>
                <ul className="space-y-4">
                  {achievement.teamMembers.map((member, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[rgba(124,58,237,0.2)] to-[rgba(0,212,255,0.2)] flex items-center justify-center border border-white/10 text-white font-jetbrains font-bold text-sm">
                        {member.charAt(0)}
                      </div>
                      <span className="font-inter text-gray-200">{member}</span>
                    </li>
                  ))}
                  {achievement.teamMembers.length === 0 && (
                    <li className="text-sm text-gray-500">No members listed.</li>
                  )}
                </ul>
              </div>
            </BorderGlow>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h3 className="text-xl font-space font-bold mb-6 text-white flex items-center gap-2">
                <Share2 size={20} className="text-[rgba(0,212,255,1)]" /> Share
              </h3>
              <div className="flex gap-3">
                <button
                  type="button"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-sm font-inter"
                  onClick={() => {
                    if (typeof navigator !== "undefined" && navigator.clipboard) {
                      void navigator.clipboard.writeText(window.location.href);
                    }
                  }}
                >
                  <LinkIcon size={16} /> Copy Link
                </button>
                <button
                  type="button"
                  className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#0077b5]/20 hover:bg-[#0077b5]/40 border border-[#0077b5]/30 text-[#0077b5] transition-colors"
                >
                  <FaLinkedin size={20} />
                </button>
                <button
                  type="button"
                  className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors"
                >
                  <FaTwitter size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {achievement.images && achievement.images.length > 1 && (
          <div>
            <h2 className="text-2xl font-space font-bold mb-8 text-white flex items-center gap-2">
              <ImageIcon size={24} className="text-[rgba(0,212,255,1)]" /> Event
              Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievement.images.slice(1).map((img, i) => (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden border border-white/10 group h-64"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={`${achievement.title} - photo ${i + 2}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
