"use client";

import { useState } from "react";
import {
  Palette,
  FilePenLine,
  Camera,
  Briefcase,
  CalendarDays,
  Share2,
  Code2
} from "lucide-react";
import TeamFilters from "./TeamFilters";
import TeamCard, { TeamData } from "./TeamCard";
import TeamDetailModal from "./TeamDetailModal";

// Data as requested by user
const teamsData: TeamData[] = [
  {
    id: "t1",
    name: "Poster Team",
    category: "Creative",
    icon: Palette,
    description: "Creates visually engaging posters, banners, event branding materials, and promotional graphics that strengthen ISTE's identity and communication.",
    gradient: "#3b82f6, #8b5cf6", // Blue -> Purple
    status: "Recruiting",
    memberCount: 12,
    skills: ["Graphic Design", "Typography", "Color Theory", "Branding"],
    responsibilities: ["Design event posters", "Create social media graphics", "Develop branding materials"],
    tools: ["Adobe Illustrator", "Photoshop", "Figma", "Canva"],
    currentProjects: ["Annual Tech Fest Branding", "Monthly Newsletter Graphics"],
    achievements: ["Designed 150+ event posters", "Rebranded ISTE visual identity"]
  },
  {
    id: "t2",
    name: "Drafting Team",
    category: "Operations",
    icon: FilePenLine,
    description: "Prepares official documents, proposals, reports, event plans, and formal communications to ensure smooth organizational operations.",
    gradient: "#10b981, #06b6d4", // Green -> Cyan
    status: "Active",
    memberCount: 8,
    skills: ["Technical Writing", "Formal Communication", "Proposal Drafting"],
    responsibilities: ["Draft official proposals", "Prepare event reports", "Manage formal communications"],
    tools: ["Microsoft Word", "Google Docs", "Grammarly", "Notion"],
    currentProjects: ["Sponsorship Proposals 2024", "Event Post-Mortem Reports"],
    achievements: ["Secured 5 major sponsorships via proposals", "Standardized club documentation"]
  },
  {
    id: "t3",
    name: "Documentation Team",
    category: "Operations",
    icon: Camera,
    description: "Captures event highlights, maintains records, organizes media archives, and documents key activities and achievements of the club.",
    gradient: "#f97316, #ec4899", // Orange -> Pink
    status: "Busy",
    memberCount: 10,
    skills: ["Photography", "Videography", "Archiving", "Event Coverage"],
    responsibilities: ["Photograph live events", "Record and edit aftermovies", "Maintain media archive"],
    tools: ["DSLR/Mirrorless Cameras", "Adobe Lightroom", "Premiere Pro", "Google Drive"],
    currentProjects: ["Alumni Interview Series", "Tech Fest 2024 Aftermovie"],
    achievements: ["Archived 10,000+ photos", "Produced 15 event aftermovies"]
  },
  {
    id: "t4",
    name: "Management Team",
    category: "Management",
    icon: Briefcase,
    description: "Oversees event execution, team coordination, resource allocation, and operational planning to ensure successful program delivery.",
    gradient: "#3b82f6, #14b8a6", // Blue -> Teal
    status: "Recruiting",
    memberCount: 15,
    skills: ["Leadership", "Event Management", "Crisis Resolution", "Logistics"],
    responsibilities: ["Oversee event logistics", "Manage crowds and volunteers", "Resolve on-site issues"],
    tools: ["Trello", "Slack", "Google Sheets", "Discord"],
    currentProjects: ["Upcoming Hackathon Logistics", "Member Onboarding Drive"],
    achievements: ["Successfully executed 25+ events", "Managed crowds of 1000+ students"]
  },
  {
    id: "t5",
    name: "Scheduling Team",
    category: "Management",
    icon: CalendarDays,
    description: "Designs timelines, manages event calendars, coordinates meetings, and ensures timely execution of tasks and activities.",
    gradient: "#a855f7, #06b6d4", // Purple -> Cyan
    status: "Active",
    memberCount: 6,
    skills: ["Time Management", "Coordination", "Planning"],
    responsibilities: ["Create event timelines", "Schedule weekly meetings", "Coordinate cross-team deadlines"],
    tools: ["Google Calendar", "Notion", "ClickUp"],
    currentProjects: ["Semester Activity Roadmap", "Weekly Sync Schedules"],
    achievements: ["Zero overlap in event scheduling", "Optimized weekly meeting flow"]
  },
  {
    id: "t6",
    name: "Social Media Team",
    category: "Marketing",
    icon: Share2,
    description: "Manages ISTE's digital presence across Instagram, LinkedIn, YouTube, and other platforms through content creation and online engagement.",
    gradient: "#ec4899, #f97316", // Pink -> Orange
    status: "Closed",
    memberCount: 14,
    skills: ["Content Strategy", "Copywriting", "Community Management", "Trend Analysis"],
    responsibilities: ["Manage Instagram and LinkedIn", "Write engaging captions", "Analyze social reach"],
    tools: ["Instagram/LinkedIn Insights", "Meta Business Suite", "Buffer"],
    currentProjects: ["Member Spotlight Campaign", "Tech Tips Reels Series"],
    achievements: ["Grew Instagram to 5K followers", "500K+ reach in 2023"]
  },
  {
    id: "t7",
    name: "Web Development Team",
    category: "Technical",
    icon: Code2,
    description: "Develops, maintains, and enhances the ISTE website and digital platforms while ensuring performance, accessibility, and user experience.",
    gradient: "#06b6d4, #10b981", // Cyan -> Green
    status: "Recruiting",
    memberCount: 10,
    skills: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Git", "UI/UX Design"],
    responsibilities: ["Develop official website", "Maintain digital ecosystem", "Ensure web accessibility"],
    tools: ["VS Code", "GitHub", "Vercel", "Tailwind CSS", "Firebase"],
    currentProjects: ["ISTE Main Website Revamp", "Internal Team Management Portal"],
    achievements: ["Built platform with 10k+ visits", "Maintained 99.9% uptime for events"]
  }
];

export default function TeamGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Teams");
  const [selectedTeam, setSelectedTeam] = useState<TeamData | null>(null);

  // Filter Logic (Search by Name or Skill + Category Filter)
  const filteredTeams = teamsData.filter((team) => {
    // 1. Category check
    if (activeFilter !== "All Teams" && team.category !== activeFilter) {
      return false;
    }

    // 2. Search check (Name or Skills)
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchName = team.name.toLowerCase().includes(q);
      const matchSkill = team.skills.some(skill => skill.toLowerCase().includes(q));
      if (!matchName && !matchSkill) {
        return false;
      }
    }

    return true;
  });

  const handleJoinClick = (teamName: string) => {
    // Pass this down to open the Join Modal (which lives in page.tsx or similar)
    // For now, we dispatch a custom event that page.tsx can listen to, or we can use a context.
    // Given the architecture, a custom event is clean for crossing components without context wrapper.
    const event = new CustomEvent("openJoinModal", { detail: { team: teamName } });
    window.dispatchEvent(event);
  };

  return (
    <section id="teams" className="py-24 px-[5vw] bg-[#0B172A] relative min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-wide text-white mb-4">
            ISTE <span className="text-[#6BE6FF]">Divisions</span>
          </h2>
          <p className="text-[#B8C7D9] max-w-2xl">
            Filter by category or search for specific skills (e.g. "React", "Design", "Writing").
          </p>
        </div>

        <TeamFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        {filteredTeams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTeams.map((team) => (
              <TeamCard
                key={team.id}
                team={team}
                onClick={() => setSelectedTeam(team)}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center flex flex-col items-center justify-center border border-dashed border-[rgba(255,255,255,0.1)] rounded-[20px]">
            <span className="text-4xl mb-4">🔍</span>
            <h3 className="font-display text-xl text-white mb-2">No teams found</h3>
            <p className="text-[#B8C7D9]">Try adjusting your search or filter criteria.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("All Teams");
              }}
              className="mt-6 text-[#6BE6FF] hover:underline font-mono text-sm uppercase tracking-widest"
            >
              Clear Filters
            </button>
          </div>
        )}

      </div>

      <TeamDetailModal
        team={selectedTeam}
        onClose={() => setSelectedTeam(null)}
        onJoinClick={handleJoinClick}
      />
    </section>
  );
}
