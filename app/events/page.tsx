"use client";

import { useState, useEffect, useMemo } from "react";
import { useAdmin } from "@/context/AdminContext";
import FlyingPosters from "@/components/ui/FlyingPosters";
import Folder from "@/components/ui/Folder";
import SpotlightCard from "@/components/ui/SpotlightCard";
import BorderGlow from "@/components/ui/BorderGlow";
import LogoLoop from "@/components/ui/LogoLoop";
import Link from "next/link";
import { X, Calendar, MapPin, ExternalLink, MessageSquare, Shield, ClipboardList, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";

import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Prism from "@/components/ui/Prism";

export default function EventsPage() {
  const { events } = useAdmin();
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [activeView, setActiveView] = useState<"upcoming" | "completed">("upcoming");

  // Modals state
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);

  // Feedback Form State
  const [feedbackData, setFeedbackData] = useState({ name: '', email: '', feedback: '' });

  // Example dummy events if none in localStorage
  const dummyEvents = [
    {
      id: 1,
      name: "Cyberpunk Hackathon",
      description: "A 24-hour hackathon to build futuristic web apps.",
      date: "2024-11-20T10:00",
      location: "Main Auditorium",
      poster: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800",
      formLink: "#",
      type: "upcoming",
      highlights: ["24 Hours", "Free Food", "Prizes"]
    },
    {
      id: 2,
      name: "Web3 Seminar",
      description: "Intro to blockchain and smart contracts.",
      date: "2024-12-05T14:00",
      location: "CS Block, Room 301",
      poster: "https://images.unsplash.com/photo-1639762681485-074b7f4ec8e0?q=80&w=800",
      formLink: "#",
      type: "upcoming",
      highlights: ["Expert Speakers", "Q&A"]
    },
    {
      id: 3,
      name: "React Workshop",
      description: "Learn modern React and Next.js basics.",
      date: "2023-10-15T09:00",
      location: "Lab 4",
      poster: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800",
      formLink: "#",
      type: "completed",
      highlights: ["Hands-on", "Certificates"]
    }
  ];

  const allEvents = events.length > 0 ? events : dummyEvents;
  const upcomingEvents = allEvents.filter(e => e.type === "upcoming" || e.status === "upcoming");
  const completedEvents = allEvents.filter(e => e.type === "completed" || e.status === "completed");

  const upcomingPosters = upcomingEvents.map(e => e.poster);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('iste_feedback', JSON.stringify(feedbackData));
    setIsFeedbackOpen(false);
    setFeedbackData({ name: '', email: '', feedback: '' });
    alert("Thank you! Your feedback has been saved.");
  };

  const optionsLogos = useMemo(() => [
    {
      node: (
        <button onClick={() => setIsFeedbackOpen(true)} className="flex items-center gap-2 bg-[#0F1F35] border border-[rgba(255,255,255,0.08)] rounded-full px-6 py-3 hover:border-[#6BE6FF] hover:shadow-[0_0_15px_rgba(107,230,255,0.3)] transition-all cursor-pointer whitespace-nowrap">
          <MessageSquare className="text-[#6BE6FF]" size={18} />
          <span className="font-bold text-sm text-white">Share Feedback</span>
        </button>
      )
    },
    {
      node: (
        <div className="flex items-center gap-2 bg-[#0F1F35] border border-[rgba(255,255,255,0.08)] rounded-full px-6 py-3 whitespace-nowrap">
          <Calendar className="text-[#4ADE80]" size={18} />
          <span className="font-bold text-sm text-white">
            Upcoming Events: <CountUp end={upcomingEvents.length} duration={2.5} />
          </span>
        </div>
      )
    },
    {
      node: (
        <button onClick={() => setIsPrivacyOpen(true)} className="flex items-center gap-2 bg-[#0F1F35] border border-[rgba(255,255,255,0.08)] rounded-full px-6 py-3 hover:border-[#6BE6FF] hover:shadow-[0_0_15px_rgba(107,230,255,0.3)] transition-all cursor-pointer whitespace-nowrap">
          <Shield className="text-[#6BE6FF]" size={18} />
          <span className="font-bold text-sm text-white">Data Privacy</span>
        </button>
      )
    },
    {
      node: (
        <button onClick={() => setIsRulesOpen(true)} className="flex items-center gap-2 bg-[#0F1F35] border border-[rgba(255,255,255,0.08)] rounded-full px-6 py-3 hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all cursor-pointer whitespace-nowrap">
          <ClipboardList className="text-purple-400" size={18} />
          <span className="font-bold text-sm text-white">Participation Guidelines</span>
        </button>
      )
    },
    {
      node: (
        <button className="flex items-center gap-2 bg-[#0F1F35] border border-[rgba(255,255,255,0.08)] rounded-full px-6 py-3 hover:border-[#FFB86C] hover:shadow-[0_0_15px_rgba(255,184,108,0.3)] transition-all cursor-pointer whitespace-nowrap">
          <Award className="text-[#FFB86C]" size={18} />
          <span className="font-bold text-sm text-white">Verify Certificate</span>
        </button>
      )
    },
    {
      node: (
        <a href="https://instagram.com/iste" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#0F1F35] border border-[rgba(255,255,255,0.08)] rounded-full px-6 py-3 hover:border-[#E1306C] hover:shadow-[0_0_15px_rgba(225,48,108,0.3)] transition-all cursor-pointer whitespace-nowrap">
          <FaInstagram className="text-[#E1306C]" size={18} />
          <span className="font-bold text-sm text-white">Instagram</span>
        </a>
      )
    },
    {
      node: (
        <a href="https://linkedin.com/company/iste" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#0F1F35] border border-[rgba(255,255,255,0.08)] rounded-full px-6 py-3 hover:border-[#0077B5] hover:shadow-[0_0_15px_rgba(0,119,181,0.3)] transition-all cursor-pointer whitespace-nowrap">
          <FaLinkedin className="text-[#0077B5]" size={18} />
          <span className="font-bold text-sm text-white">LinkedIn</span>
        </a>
      )
    },
    {
      node: (
        <a href="https://twitter.com/iste" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#0F1F35] border border-[rgba(255,255,255,0.08)] rounded-full px-6 py-3 hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all cursor-pointer whitespace-nowrap">
          <FaTwitter className="text-white" size={18} />
          <span className="font-bold text-sm text-white">X (Twitter)</span>
        </a>
      )
    }
  ], [upcomingEvents.length]);

  return (
    <div className="min-h-screen bg-[#071120] text-white pt-32 pb-24 relative overflow-hidden">
      
      {/* Prism Background */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none mix-blend-screen flex items-center justify-center">
        <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
          <Prism
            animationType="rotate"
            timeScale={0.5}
            height={3.5}
            baseWidth={5.5}
            scale={3.6}
            hueShift={0}
            colorFrequency={1}
            noise={0.5}
            glow={1}
            transparent={true}
          />
        </div>
      </div>

      {/* Floating Admin Button */}
      <Link href="/admin" className="fixed top-24 right-4 md:top-32 md:right-8 z-[60] group cursor-pointer">
        <button className="cursor-pointer bg-[#0f0f1a] px-4 py-2 md:px-6 md:py-3 rounded-full font-mono text-[var(--accent-blue)] text-xs md:text-sm tracking-widest border border-[var(--accent-blue)] shadow-[0_0_15px_rgba(0,212,255,0.3)] group-hover:bg-[var(--accent-blue)] group-hover:text-[#0f0f1a] group-hover:shadow-[0_0_25px_rgba(0,212,255,0.6)] transition-all uppercase font-bold">
          Release Event
        </button>
      </Link>

      <div className="container mx-auto px-[5vw]">

        {/* TAB CONTROLS */}
        <div className="flex justify-center mb-16 relative z-40">
          <div className="bg-black/40 backdrop-blur-md border border-white/10 p-1.5 rounded-full flex gap-1">
            <button
              onClick={() => setActiveView("upcoming")}
              className={`px-3 py-2 sm:px-6 sm:py-2 rounded-full font-mono text-xs sm:text-sm uppercase tracking-widest transition-all whitespace-nowrap ${activeView === 'upcoming' ? 'bg-[var(--accent-blue)] text-black font-bold shadow-[0_0_15px_rgba(107,230,255,0.5)]' : 'text-gray-400 hover:text-white'}`}
            >
              Upcoming Missions
            </button>
            <button
              onClick={() => setActiveView("completed")}
              className={`px-3 py-2 sm:px-6 sm:py-2 rounded-full font-mono text-xs sm:text-sm uppercase tracking-widest transition-all whitespace-nowrap ${activeView === 'completed' ? 'bg-[var(--accent-blue)] text-black font-bold shadow-[0_0_15px_rgba(107,230,255,0.5)]' : 'text-gray-400 hover:text-white'}`}
            >
              Mission Logs
            </button>
          </div>
        </div>

        <div className="w-full relative min-h-[40vh]">
          <AnimatePresence mode="wait">
            {activeView === "upcoming" ? (
              <motion.div
                key="upcoming"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <section className="relative z-10">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-purple)] mb-8 uppercase tracking-tight text-center lg:text-left">
                    Upcoming Events
                  </h2>

                  {upcomingEvents.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                      <div className="h-[350px] md:h-[500px] w-full rounded-2xl overflow-hidden border border-[rgba(0,212,255,0.2)] shadow-[0_0_30px_rgba(0,212,255,0.1)] relative">
                        <FlyingPosters items={upcomingPosters} />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#071120] via-transparent to-transparent pointer-events-none"></div>
                      </div>

                      <div className="flex flex-col gap-6">
                        {upcomingEvents.map((ev) => (
                          <BorderGlow key={ev.id} glowColor="107 230 255">
                            <div className="p-6 cursor-pointer" onClick={() => setSelectedEvent(ev)}>
                              <h3 className="text-2xl font-bold font-display mb-2 group-hover:text-[var(--accent-blue)] transition-colors">{ev.name}</h3>
                              <p className="text-gray-400 line-clamp-2 mb-4">{ev.description}</p>
                              <div className="flex flex-wrap gap-4 text-sm text-[var(--accent-blue)]">
                                <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(ev.date).toLocaleDateString()}</span>
                                <span className="flex items-center gap-1"><MapPin size={14} /> {ev.location}</span>
                              </div>
                            </div>
                          </BorderGlow>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 italic text-center lg:text-left">No upcoming events scheduled.</p>
                  )}
                </section>
              </motion.div>
            ) : (
              <motion.div
                key="completed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <section className="relative z-10">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gray-300 mb-8 md:mb-12 uppercase tracking-tight text-center">
                    Mission Logs (Completed)
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 px-4">
                    {completedEvents.map((ev) => (
                      <div key={ev.id} className="flex flex-col items-center">
                        <div onClick={() => setSelectedEvent(ev)} className="cursor-pointer hover:scale-105 transition-transform duration-300">
                          <Folder
                            color="#0F1F35"
                            size={1.5}
                            items={[
                              <img key="1" src={ev.poster} className="w-full h-full object-cover rounded shadow" alt="1" />,
                              <div key="2" className="w-full h-full bg-gray-800 rounded shadow flex items-center justify-center p-2 text-center text-[8px] text-gray-400 font-mono">MISSION DATA</div>,
                              <div key="3" className="w-full h-full bg-[var(--accent-purple)] rounded shadow flex items-center justify-center text-xs font-bold text-white">CONFIDENTIAL</div>
                            ]}
                          />
                        </div>
                        <div className="mt-12 text-center">
                          <h3 className="text-xl font-bold font-display text-white">{ev.name}</h3>
                          <p className="text-[var(--accent-purple)] font-mono text-sm mt-1">{new Date(ev.date).getFullYear()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* --- PREMIUM FOOTER TICKER SECTION --- */}
        <div className="mt-20 relative z-10">

          {/* EVENT INFORMATION HUB (TICKER) */}
          <div className="w-[100vw] relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden py-8 border-y border-white/5 bg-gradient-to-r from-transparent via-[#0F1F35]/30 to-transparent">
            <LogoLoop
              logos={optionsLogos}
              speed={60}
              direction="right"
              logoHeight={60}
              gap={24}
              pauseOnHover={true}
              fadeOut
              fadeOutColor="#071120"
            />
          </div>
        </div>

      </div>

      {/* --- MODALS --- */}

      {/* Event Detail Modal (Existing) */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-3xl"
            >
              <BorderGlow glowColor={selectedEvent.type === 'upcoming' ? '107 230 255' : '168 85 247'} edgeSensitivity={100} className="w-full !p-0">
                <div className="bg-[#071120] rounded-3xl overflow-hidden relative border border-gray-800">
                  <button onClick={() => setSelectedEvent(null)} className="absolute top-4 right-4 z-10 bg-black/50 p-2 rounded-full hover:bg-white/20 transition-colors text-white cursor-pointer">
                    <X size={20} />
                  </button>

                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-2/5 h-64 md:h-auto relative">
                      <img src={selectedEvent.poster} alt={selectedEvent.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#071120] hidden md:block"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#071120] to-transparent md:hidden"></div>
                    </div>

                    <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
                      <motion.h2
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ staggerChildren: 0.1 }}
                        className="text-2xl sm:text-3xl md:text-4xl font-display font-black mb-4 uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500"
                      >
                        {selectedEvent.name}
                      </motion.h2>

                      <div className="flex flex-wrap gap-4 text-sm font-mono text-[var(--accent-blue)] mb-6">
                        <span className="flex items-center gap-2"><Calendar size={16} /> {new Date(selectedEvent.date).toLocaleString()}</span>
                        <span className="flex items-center gap-2"><MapPin size={16} /> {selectedEvent.location}</span>
                      </div>

                      <p className="text-gray-300 mb-6 leading-relaxed">
                        {selectedEvent.description}
                      </p>

                      {selectedEvent.highlights && selectedEvent.highlights.length > 0 && (
                        <div className="mb-8">
                          <h4 className="text-xs text-gray-500 uppercase tracking-widest mb-3">Highlights</h4>
                          <ul className="flex flex-wrap gap-2">
                            {selectedEvent.highlights.map((h: string, i: number) => (
                              <motion.li
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 + (i * 0.1) }}
                                key={i}
                                className="bg-white/5 border border-white/10 px-3 py-1 rounded text-sm text-[var(--accent-purple)]"
                              >
                                {h}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {selectedEvent.type === "upcoming" && selectedEvent.formLink && (
                        <a href={selectedEvent.formLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-purple)] text-white font-bold py-3 px-8 rounded-lg hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] transition-all uppercase tracking-wider cursor-pointer">
                          Register Now <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </BorderGlow>
            </motion.div>
          </motion.div>
        )}

        {/* Feedback Modal */}
        {isFeedbackOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsFeedbackOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-md bg-[#0F1F35] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 md:p-8 relative"
            >
              <button onClick={() => setIsFeedbackOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer">
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold mb-6 text-[#6BE6FF] flex items-center gap-2">
                <MessageSquare /> Feedback
              </h2>
              <form onSubmit={handleFeedbackSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Name</label>
                  <input type="text" required value={feedbackData.name} onChange={e => setFeedbackData({ ...feedbackData, name: e.target.value })} className="w-full bg-[#071120] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#6BE6FF] transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Email</label>
                  <input type="email" required value={feedbackData.email} onChange={e => setFeedbackData({ ...feedbackData, email: e.target.value })} className="w-full bg-[#071120] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#6BE6FF] transition-colors" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Your Suggestions</label>
                  <textarea required value={feedbackData.feedback} onChange={e => setFeedbackData({ ...feedbackData, feedback: e.target.value })} className="w-full bg-[#071120] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#6BE6FF] transition-colors h-32 resize-none" placeholder="How can we improve?"></textarea>
                </div>
                <button type="submit" className="mt-2 bg-gradient-to-r from-[#6BE6FF] to-[#4ADE80] text-[#071120] font-bold py-3 rounded-lg hover:shadow-[0_0_20px_rgba(107,230,255,0.4)] transition-all cursor-pointer">
                  Submit Feedback
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* Privacy Modal */}
        {isPrivacyOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsPrivacyOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-lg bg-[#0F1F35] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 md:p-8 relative"
            >
              <button onClick={() => setIsPrivacyOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer">
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold mb-6 text-[#6BE6FF] flex items-center gap-2">
                <Shield /> Data Privacy
              </h2>
              <div className="text-gray-300 space-y-4 leading-relaxed">
                <p>All participant information submitted through ISTE platforms is securely stored and used only for event coordination, communication, certification, and club-related activities.</p>
                <p>Personal information is never sold or shared with unauthorized third parties.</p>
                <p>We use industry-standard security measures to protect your data during storage and transmission.</p>
              </div>
              <button onClick={() => setIsPrivacyOpen(false)} className="mt-8 w-full bg-[rgba(107,230,255,0.1)] text-[#6BE6FF] hover:bg-[#6BE6FF] hover:text-[#071120] border border-[rgba(107,230,255,0.2)] py-2 rounded-lg font-bold transition-all cursor-pointer">
                I Understand
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Rules Modal */}
        {isRulesOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsRulesOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-lg bg-[#0F1F35] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 md:p-8 relative max-h-[90vh] overflow-y-auto"
            >
              <button onClick={() => setIsRulesOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer">
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold mb-6 text-purple-400 flex items-center gap-2">
                <ClipboardList /> Event Guidelines
              </h2>
              <ul className="text-gray-300 space-y-3 leading-relaxed list-decimal list-inside">
                <li>Register using accurate information.</li>
                <li>Maintain professional behavior during events.</li>
                <li>Respect speakers, organizers, and fellow participants.</li>
                <li>Follow event schedules and instructions.</li>
                <li>Avoid plagiarism in submissions.</li>
                <li>Misconduct may result in disqualification.</li>
                <li>Certificates will be issued only to eligible participants.</li>
                <li>Follow all technical and venue guidelines.</li>
              </ul>
              <button onClick={() => setIsRulesOpen(false)} className="mt-8 w-full bg-[rgba(168,85,247,0.1)] text-purple-400 hover:bg-purple-400 hover:text-[#071120] border border-[rgba(168,85,247,0.2)] py-2 rounded-lg font-bold transition-all cursor-pointer">
                Close
              </button>
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
