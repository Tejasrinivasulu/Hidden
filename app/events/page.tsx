"use client";

import { useAdmin } from "@/context/AdminContext";
import UpcomingEventsShowcase from "@/components/events/UpcomingEventsShowcase";
import RealEventsSection, {
  REAL_EVENTS_MOCK,
} from "@/components/events/RealEventsSection";
import CommunityMomentsSection from "@/components/events/CommunityMomentsSection";
import EventsFooter from "@/components/events/EventsFooter";

export default function EventsPage() {
  const { events } = useAdmin();

  // Example dummy events if none in localStorage
  const dummyEvents = [
    {
      id: 1,
      name: "Aptitude Arcade",
      description:
        "Strengthen aptitude through learn · practice · test · improve. Build accuracy and speed for placements, GATE, and competitive exams with daily challenges.",
      date: "2026-10-06T09:00",
      location: "Online",
      poster: "/aptitude-arcade-poster.png",
      formLink: "https://aptitude-arcade.vercel.app/",
      type: "upcoming",
      tag: "Challenge",
      highlights: ["300+ Members", "06 Oct – 19 Oct", "Learn · Practice · Test · Improve"],
      eligibility: [
        "All MBU Students",
        "Aptitude & Logical Reasoning Enthusiasts",
        "Beginners to Advanced Learners",
        "Anyone ready to challenge themselves",
        "Mode of conduction: Online",
      ],
      registered: 0,
    },
    {
      id: 2,
      name: "InnoVortex 4.0",
      description: "Campus innovation hackathon with industry mentors.",
      date: "2026-10-24T09:00",
      location: "Hybrid",
      poster: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800",
      formLink: "#",
      type: "upcoming",
      tag: "Hackathon",
      highlights: ["Prizes", "Mentors"],
    },
    {
      id: 3,
      name: "VibeCon 2.0",
      description: "Build, pitch, and ship with your squad.",
      date: "2026-10-15T09:00",
      location: "Hybrid",
      poster: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800",
      formLink: "#",
      type: "upcoming",
      tag: "Hackathon",
      highlights: ["Networking"],
    },
    {
      id: 4,
      name: "AI Tools for Innovators",
      description: "Hands-on session on practical AI tooling for students.",
      date: "2026-10-10T11:00",
      location: "Offline",
      poster: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800",
      formLink: "#",
      type: "upcoming",
      tag: "Workshop",
      highlights: ["Hands-on"],
    },
    {
      id: 5,
      name: "Web3 Seminar",
      description: "Intro to blockchain and smart contracts.",
      date: "2026-12-05T14:00",
      location: "Offline",
      poster: "https://images.unsplash.com/photo-1639762681485-074b7f4ec8e0?q=80&w=800",
      formLink: "#",
      type: "upcoming",
      tag: "Seminar",
      highlights: ["Expert Speakers", "Q&A"],
    },
  ];

  const allEvents = events.length > 0 ? events : dummyEvents;
  const upcomingEvents = allEvents.filter(
    (e) => e.type === "upcoming" || e.status === "upcoming",
  );

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] pb-0 text-white">
      {/* communityX-style atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(46, 147, 255, 0.14), transparent 65%), radial-gradient(ellipse 55% 45% at 80% 20%, rgba(14,165,233,.10), transparent 45%), radial-gradient(ellipse 70% 60% at 50% 110%, rgba(37, 109, 148, 0.12), transparent 55%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-80"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 75% 65% at 50% 50%, black, transparent)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 65% at 50% 50%, black, transparent)",
        }}
      />

      {/* Full-width static hero — flush under navbar, no gap */}
      <div className="relative z-10">
        <UpcomingEventsShowcase events={upcomingEvents} />
      </div>

      <div className="container relative z-10 mx-auto px-[5vw]">
        <div className="relative min-h-[40vh] w-full">
          <RealEventsSection events={REAL_EVENTS_MOCK} />
          <CommunityMomentsSection />
        </div>
      </div>

      <EventsFooter />
    </div>
  );
}
