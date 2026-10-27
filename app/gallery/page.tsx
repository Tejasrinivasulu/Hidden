"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/context/AdminContext";
import CircularGallery from "@/components/ui/CircularGallery";
import DomeGallery from "@/components/ui/DomeGallery";
import LightRays from "@/components/ui/LightRays";
import { motion, AnimatePresence } from "framer-motion";

export default function GalleryPage() {
  const { eventGallery, celebrationGallery } = useAdmin();
  const [activeView, setActiveView] = useState<"events" | "celebrations">("events");
  const router = useRouter();

  // Fallback data if none
  const defaultEventGallery = [
    { image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800", text: "Hackathon" },
    { image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800", text: "Team Collab" },
    { image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800", text: "Seminar" },
    { image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800", text: "Workshop" }
  ];

  const defaultCelebrationGallery = [
    { src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800", alt: "Party" },
    { src: "https://images.unsplash.com/photo-1530103862676-de8892b12c43?q=80&w=800", alt: "Anniversary" },
    { src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800", alt: "Award" },
    { src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800", alt: "Concert" }
  ];

  const eGallery = eventGallery.length > 0 ? eventGallery : defaultEventGallery;
  const cGallery = celebrationGallery.length > 0 ? celebrationGallery : defaultCelebrationGallery;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-white pt-24 relative overflow-hidden flex flex-col">
      
      {/* Light Rays Background */}
      <div className="absolute inset-0 z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#4aa3ff"
          raysSpeed={0.8}
          lightSpread={1.2}
          rayLength={1.5}
          followMouse={true}
          mouseInfluence={0.3}
          distortion={0.05}
          fadeDistance={1.2}
        />
      </div>

      {/* Controls */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 z-40 bg-black/40 backdrop-blur-md border border-white/10 p-1.5 rounded-full flex gap-1">
        <button 
          onClick={() => setActiveView("events")}
          className={`px-6 py-2 rounded-full font-mono text-sm uppercase tracking-widest transition-all ${activeView === 'events' ? 'bg-white text-black font-bold' : 'text-gray-400 hover:text-white'}`}
        >
          Event Highlights
        </button>
        <button 
          onClick={() => setActiveView("celebrations")}
          className={`px-6 py-2 rounded-full font-mono text-sm uppercase tracking-widest transition-all ${activeView === 'celebrations' ? 'bg-white text-black font-bold' : 'text-gray-400 hover:text-white'}`}
        >
          Celebrations
        </button>
      </div>

      <div className="flex-1 w-full h-full relative">
        <AnimatePresence mode="wait">
          {activeView === "events" ? (
            <motion.div
              key="events"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <CircularGallery 
                items={eGallery} 
                bend={3} 
                textColor="#ffffff" 
                borderRadius={0.05} 
                scrollEase={0.05} 
                font="bold 40px Orbitron"
                onClick={(text) => {
                  const slug = text.toLowerCase().replace(/\s+/g, '-');
                  router.push(`/gallery/events/${slug}`);
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="celebrations"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <DomeGallery 
                images={cGallery} 
                overlayBlurColor="#050a18"
                grayscale={false}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
