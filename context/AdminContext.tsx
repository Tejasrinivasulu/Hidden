"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type AdminEvent = {
  id: number;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  poster: string;
  formLink?: string;
  type: "upcoming" | "completed";
  tags?: string[];
  highlights?: string[];
};

export type MemberTeamType = "core" | "coordinator";

export type IsteMember = {
  id: number;
  name: string;
  rollNo: string;
  department: string;
  year: string;
  mobile: string;
  email: string;
  photo: string;
  linkedin: string;
  github: string;
  batch: string;
  /** Position / title e.g. Chairperson, Technical Coordinator */
  role?: string;
  /** Core Team or Coordinator */
  teamType?: MemberTeamType;
  branch?: string;
};

export type GalleryItem = {
  id: number;
  title: string;
  imageUrl: string;
  category: string;
  createdAt: number;
};

export type TestimonialItem = {
  id: number;
  name: string;
  description: string;
  year: string;
  branch: string;
  initials: string;
  gradient: string;
};

export type ContactMessage = {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: number;
  read: boolean;
};

export type IsteProfile = {
  chapterName: string;
  tagline: string;
  email: string;
  whatsappCommunityLink: string;
  instagram: string;
  linkedin: string;
};

export type AdminAchievement = {
  id: number;
  slug: string;
  title: string;
  category: string;
  date: string;
  year: string;
  description: string;
  teamName: string;
  teamMembers: string[];
  image: string;
  featured: boolean;
};

function slugify(title: string) {
  return (
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || `achievement-${Date.now()}`
  );
}

const DEFAULT_PROFILE: IsteProfile = {
  chapterName: "ISTE Student Chapter — MBU",
  tagline: "Learn · Connect · Grow",
  email: "iste@mbu.asia",
  whatsappCommunityLink: "https://chat.whatsapp.com/KZNAUM1o7Qw0skVB5LA88T",
  instagram: "https://www.instagram.com/istechamps_mbu/?hl=en",
  linkedin: "https://www.linkedin.com/company/iste-svec-mbu/",
};

const TESTIMONIAL_GRADIENTS = [
  "from-primary to-[#3b6ef0]",
  "from-secondary to-[#6030e0]",
  "from-[#20c060] to-[#10a040]",
  "from-[#e03080] to-[#c020a0]",
  "from-[#f59e0b] to-[#d97706]",
];

const BRANCHES = ["CSE", "ECE", "IT", "AI & ML", "EEE", "MECH", "CIVIL"];
const DEFAULT_BATCHES = ["2025", "2024"];
const BASELINE_BATCHES = ["2025", "2024", "2023"];

/** Admin-added years newer than 2025 appear first, then 2025 → 2024 → 2023, then older. */
export function orderBatchYears(batches: string[]) {
  const unique = [...new Set(batches.map((b) => b.trim()).filter(Boolean))];
  const baselineSet = new Set(BASELINE_BATCHES);
  const newer = unique
    .filter((b) => !baselineSet.has(b) && b.localeCompare("2025") > 0)
    .sort((a, b) => b.localeCompare(a));
  const older = unique
    .filter((b) => !baselineSet.has(b) && b.localeCompare("2023") < 0)
    .sort((a, b) => b.localeCompare(a));
  const mid = unique
    .filter((b) => !baselineSet.has(b) && !newer.includes(b) && !older.includes(b))
    .sort((a, b) => b.localeCompare(a));
  return [...newer, ...mid, ...BASELINE_BATCHES, ...older];
}

function initialsFromName(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

function inferTeamType(
  teamType: MemberTeamType | undefined,
  role?: string,
): MemberTeamType {
  if (teamType === "core" || teamType === "coordinator") return teamType;
  if (role && /coordinat/i.test(role) && !/faculty\s*coordinat/i.test(role)) {
    return "coordinator";
  }
  return "core";
}

function normalizeMember(raw: Partial<IsteMember> & { id: number }): IsteMember {
  const dept = raw.department || raw.branch || "";
  return {
    id: raw.id,
    name: raw.name || "Member",
    rollNo: raw.rollNo || "",
    department: dept,
    year: raw.year || "",
    mobile: raw.mobile || "",
    email: raw.email || "",
    photo: raw.photo || "",
    linkedin: raw.linkedin || "",
    github: raw.github || "",
    batch: raw.batch || "2025",
    role: raw.role,
    teamType: inferTeamType(raw.teamType, raw.role),
    branch: raw.branch || dept,
  };
}

const CORE_ROLE_POOL = [
  "Chairperson",
  "Vice Chairperson",
  "Secretary",
  "Webmaster",
  "Treasurer",
  "Joint Secretary",
  "Technical Head",
  "Design Head",
  "Events Head",
  "Media Head",
  "Content Head",
  "Logistics Head",
  "Hospitality Head",
  "Public Relations",
  "Documentation Head",
  "Outreach Head",
  "Operations Head",
  "Sponsorship Head",
  "Alumni Relations",
  "Innovation Head",
  "Research Head",
  "Workshop Head",
  "Hackathon Head",
  "Membership Head",
  "Faculty Coordinator",
] as const;

const COORDINATOR_ROLE_POOL = [
  "Technical Coordinator",
  "Events Coordinator",
  "Design Coordinator",
  "Social Media Coordinator",
  "Outreach Coordinator",
  "Web Coordinator",
  "Documentation Coordinator",
  "Management Coordinator",
  "Logistics Coordinator",
  "Hospitality Coordinator",
  "Content Coordinator",
  "Media Coordinator",
  "Sponsorship Coordinator",
  "Workshop Coordinator",
  "Hackathon Coordinator",
] as const;

const SAMPLE_NAMES = [
  "Sai Karthik",
  "Nandini Reddy",
  "Adithya Varma",
  "Sahithi Reddy",
  "Varun Teja",
  "Ananya Iyer",
  "Rohit Sharma",
  "Priya Nair",
  "Karan Mehta",
  "Sneha Patel",
  "Arjun Rao",
  "Meera Krishnan",
  "Vikram Singh",
  "Divya Menon",
  "Nikhil Joshi",
  "Pooja Sharma",
  "Rahul Verma",
  "Ishita Kapoor",
  "Siddharth Rao",
  "Kavya Reddy",
  "Aman Gupta",
  "Tanvi Shah",
  "Harsha Vardhan",
  "Lakshmi Priya",
  "Mohit Agarwal",
  "Shreya Das",
  "Yashwanth Kumar",
  "Aishwarya B",
  "Deepak Reddy",
  "Manasa Chowdary",
  "Suresh Babu",
  "Keerthana S",
  "Pranav Iyer",
  "Bhavana R",
  "Gokul Krishna",
];

const SAMPLE_PHOTOS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
];

export function isCoreTeamRole(role?: string) {
  if (!role) return false;
  if (/faculty\s*coordinat/i.test(role)) return true;
  if (/coordinat/i.test(role)) return false;
  return /faculty|chair|secretary|treasurer|president|webmaster|core|executive|joint|head|hospitality|logistics|public\s*relations|alumni|innovation|research|workshop|hackathon|membership|operations|sponsorship|media|content|outreach|documentation|technical|design|events/i.test(
    role,
  );
}

export function isCoordinatorRole(role?: string) {
  if (!role) return false;
  if (/faculty\s*coordinat/i.test(role)) return false;
  return /coordinat/i.test(role);
}

export function isCoreMember(m: Pick<IsteMember, "teamType" | "role">) {
  if (m.teamType === "core") return true;
  if (m.teamType === "coordinator") return false;
  return isCoreTeamRole(m.role);
}

export function isCoordinatorMember(m: Pick<IsteMember, "teamType" | "role">) {
  if (m.teamType === "coordinator") return true;
  if (m.teamType === "core") return false;
  return isCoordinatorRole(m.role);
}

/** Per batch: 25 core + 35 coordinators */
function buildMockMembers(): IsteMember[] {
  const list: IsteMember[] = [];
  let id = 1;
  for (const batch of DEFAULT_BATCHES) {
    for (let i = 0; i < 25; i++) {
      const name = SAMPLE_NAMES[i % SAMPLE_NAMES.length];
      const role = CORE_ROLE_POOL[i % CORE_ROLE_POOL.length];
      const dept = BRANCHES[i % BRANCHES.length];
      const displayName = batch === "2024" ? name : `${name} ${batch.slice(2)}`;
      list.push({
        id: id++,
        name: displayName,
        rollNo: `${batch}C${String(i + 1).padStart(2, "0")}`,
        department: dept,
        branch: dept,
        year: batch === "2025" ? "2nd Year" : "3rd Year",
        mobile: `98765${String(20000 + i).slice(-5)}`,
        email: `${displayName.toLowerCase().replace(/[^a-z0-9]+/g, ".")}@iste.mbu`,
        photo: SAMPLE_PHOTOS[i % SAMPLE_PHOTOS.length],
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        batch,
        role,
        teamType: "core",
      });
    }
    for (let i = 0; i < 35; i++) {
      const name = SAMPLE_NAMES[(i + 8) % SAMPLE_NAMES.length];
      const role = COORDINATOR_ROLE_POOL[i % COORDINATOR_ROLE_POOL.length];
      const dept = BRANCHES[i % BRANCHES.length];
      const displayName = `${name.split(" ")[0]} Coord ${i + 1}`;
      list.push({
        id: id++,
        name: displayName,
        rollNo: `${batch}X${String(i + 1).padStart(2, "0")}`,
        department: dept,
        branch: dept,
        year: batch === "2025" ? "2nd Year" : "3rd Year",
        mobile: `98765${String(30000 + i).slice(-5)}`,
        email: `${displayName.toLowerCase().replace(/[^a-z0-9]+/g, ".")}@iste.mbu`,
        photo: SAMPLE_PHOTOS[(i + 3) % SAMPLE_PHOTOS.length],
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        batch,
        role,
        teamType: "coordinator",
      });
    }
  }
  return list;
}

export const MOCK_MEMBERS = buildMockMembers();

export function eventDateTime(ev: Pick<AdminEvent, "date" | "time">) {
  if (!ev.date) return NaN;
  if (ev.date.includes("T")) return new Date(ev.date).getTime();
  const t = ev.time?.trim() || "00:00";
  return new Date(`${ev.date}T${t}`).getTime();
}

export function isEventPast(ev: Pick<AdminEvent, "date" | "time" | "type">) {
  const ts = eventDateTime(ev);
  if (Number.isNaN(ts)) return ev.type === "completed";
  return ts < Date.now();
}

export function resolveEventType(
  ev: Pick<AdminEvent, "date" | "time" | "type">,
): "upcoming" | "completed" {
  if (ev.type === "completed") return "completed";
  return isEventPast(ev) ? "completed" : "upcoming";
}

type AdminContextType = {
  isHydrated: boolean;
  isAuthenticated: boolean;
  login: (pin: string) => boolean;
  logout: () => void;
  events: AdminEvent[];
  addEvent: (event: Omit<AdminEvent, "id">) => void;
  removeEvent: (id: number) => void;
  members: IsteMember[];
  addMember: (member: Omit<IsteMember, "id">) => void;
  updateMember: (id: number, member: Omit<IsteMember, "id">) => void;
  removeMember: (id: number) => void;
  batches: string[];
  addBatch: (batch: string) => boolean;
  removeBatch: (batch: string) => void;
  memberStats: { total: number; byBatch: Record<string, number> };
  eventGallery: GalleryItem[];
  addEventPhoto: (photo: Omit<GalleryItem, "id" | "createdAt">) => void;
  celebrationGallery: GalleryItem[];
  addCelebrationPhoto: (photo: Omit<GalleryItem, "id" | "createdAt">) => void;
  testimonials: TestimonialItem[];
  addTestimonial: (item: {
    name: string;
    description: string;
    year: string;
    branch: string;
  }) => void;
  removeTestimonial: (id: number) => void;
  achievements: AdminAchievement[];
  addAchievement: (
    item: Omit<AdminAchievement, "id" | "slug"> & { slug?: string },
  ) => void;
  removeAchievement: (id: number) => void;
  profile: IsteProfile;
  updateProfile: (data: Partial<IsteProfile>) => void;
  supportTickets: any[];
  addSupportTicket: (ticket: any) => void;
  contactMessages: ContactMessage[];
  addContactMessage: (item: {
    name: string;
    email: string;
    message: string;
  }) => void;
  removeContactMessage: (id: number) => void;
  markContactMessageRead: (id: number) => void;
  resources: any[];
  addResource: (resource: any) => void;
  teams: any;
  updateTeam: (teamName: string, data: any) => void;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const PIN = "ISTE@2024";

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [members, setMembers] = useState<IsteMember[]>(MOCK_MEMBERS);
  const [batches, setBatches] = useState<string[]>(DEFAULT_BATCHES);
  const [teams, setTeams] = useState<any>({});
  const [eventGallery, setEventGallery] = useState<GalleryItem[]>([]);
  const [celebrationGallery, setCelebrationGallery] = useState<GalleryItem[]>(
    [],
  );
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [achievements, setAchievements] = useState<AdminAchievement[]>([]);
  const [profile, setProfile] = useState<IsteProfile>(DEFAULT_PROFILE);
  const [supportTickets, setSupportTickets] = useState<any[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [resources, setResources] = useState<any[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const load = <T,>(key: string, setter: (v: T) => void, fallback: T) => {
      try {
        const data = localStorage.getItem(key);
        if (data) setter(JSON.parse(data) as T);
        else setter(fallback);
      } catch {
        setter(fallback);
      }
    };

    load("iste_events", setEvents, []);
    const MEMBERS_SEED = "v4-teamtype-email";
    const storedSeed = localStorage.getItem("iste_members_seed");
    const storedMembers = localStorage.getItem("iste_members");
    if (storedMembers && storedSeed === MEMBERS_SEED) {
      try {
        const parsed = JSON.parse(storedMembers) as IsteMember[];
        const normalized =
          parsed.length > 0 ? parsed.map((m) => normalizeMember(m)) : MOCK_MEMBERS;
        setMembers(normalized);
      } catch {
        setMembers(MOCK_MEMBERS);
        localStorage.setItem("iste_members", JSON.stringify(MOCK_MEMBERS));
        localStorage.setItem("iste_members_seed", MEMBERS_SEED);
      }
    } else {
      setMembers(MOCK_MEMBERS);
      localStorage.setItem("iste_members", JSON.stringify(MOCK_MEMBERS));
      localStorage.setItem("iste_members_seed", MEMBERS_SEED);
    }
    load("iste_batches", setBatches, DEFAULT_BATCHES);
    load("iste_teams", setTeams, {});
    load("iste_event_gallery", setEventGallery, []);
    load("iste_celebration_gallery", setCelebrationGallery, []);
    load("iste_testimonials", setTestimonials, []);
    load("iste_achievements", setAchievements, []);
    load("iste_profile", setProfile, DEFAULT_PROFILE);
    load("iste_support_tickets", setSupportTickets, []);
    load("iste_contact_messages", setContactMessages, []);
    load("iste_resources", setResources, []);
    setIsHydrated(true);
  }, []);

  // Auto-move past events into completed / recent
  useEffect(() => {
    const sync = () => {
      setEvents((prev) => {
        let changed = false;
        const next = prev.map((ev) => {
          if (ev.type === "upcoming" && isEventPast(ev)) {
            changed = true;
            return { ...ev, type: "completed" as const };
          }
          return ev;
        });
        if (changed) {
          localStorage.setItem("iste_events", JSON.stringify(next));
          return next;
        }
        return prev;
      });
    };
    sync();
    const id = window.setInterval(sync, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const save = (key: string, data: unknown) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const login = (pin: string) => {
    if (pin === PIN) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAuthenticated(false);

  const addEvent = (event: Omit<AdminEvent, "id">) => {
    const withType = {
      ...event,
      type: resolveEventType(event),
    };
    const updated = [...events, { ...withType, id: Date.now() }];
    setEvents(updated);
    save("iste_events", updated);
  };

  const removeEvent = (id: number) => {
    const updated = events.filter((e) => e.id !== id);
    setEvents(updated);
    save("iste_events", updated);
  };

  const addMember = (member: Omit<IsteMember, "id">) => {
    const entry = normalizeMember({
      ...member,
      id: Date.now(),
      batch: member.batch || batches[0] || "2025",
    });
    const updated = [entry, ...members];
    setMembers(updated);
    save("iste_members", updated);
    if (entry.batch && !batches.includes(entry.batch)) {
      const nextBatches = orderBatchYears([entry.batch, ...batches]);
      setBatches(nextBatches);
      save("iste_batches", nextBatches);
    }
  };

  const updateMember = (id: number, member: Omit<IsteMember, "id">) => {
    const entry = normalizeMember({ ...member, id });
    const updated = members.map((m) => (m.id === id ? entry : m));
    setMembers(updated);
    save("iste_members", updated);
    if (entry.batch && !batches.includes(entry.batch)) {
      const nextBatches = orderBatchYears([entry.batch, ...batches]);
      setBatches(nextBatches);
      save("iste_batches", nextBatches);
    }
  };

  const removeMember = (id: number) => {
    const updated = members.filter((m) => m.id !== id);
    setMembers(updated);
    save("iste_members", updated);
  };

  const addBatch = (batch: string) => {
    const value = batch.trim();
    if (!value || batches.includes(value)) return false;
    // Insert before 2025 (newer years first via orderBatchYears)
    const next = orderBatchYears([value, ...batches]);
    setBatches(next);
    save("iste_batches", next);
    return true;
  };

  const removeBatch = (batch: string) => {
    const next = batches.filter((b) => b !== batch);
    setBatches(next);
    save("iste_batches", next);
    const updatedMembers = members.filter((m) => m.batch !== batch);
    setMembers(updatedMembers);
    save("iste_members", updatedMembers);
  };

  const memberStats = {
    total: members.length,
    byBatch: batches.reduce<Record<string, number>>((acc, batch) => {
      acc[batch] = members.filter((m) => m.batch === batch).length;
      return acc;
    }, {}),
  };

  const updateTeam = (teamName: string, data: any) => {
    const updated = { ...teams, [teamName]: { ...teams[teamName], ...data } };
    setTeams(updated);
    save("iste_teams", updated);
  };

  const addEventPhoto = (photo: Omit<GalleryItem, "id" | "createdAt">) => {
    const updated = [
      ...eventGallery,
      { ...photo, id: Date.now(), createdAt: Date.now() },
    ];
    setEventGallery(updated);
    save("iste_event_gallery", updated);
  };

  const addCelebrationPhoto = (
    photo: Omit<GalleryItem, "id" | "createdAt">,
  ) => {
    const updated = [
      ...celebrationGallery,
      { ...photo, id: Date.now(), createdAt: Date.now() },
    ];
    setCelebrationGallery(updated);
    save("iste_celebration_gallery", updated);
  };

  const addTestimonial = (item: {
    name: string;
    description: string;
    year: string;
    branch: string;
  }) => {
    const entry: TestimonialItem = {
      id: Date.now(),
      name: item.name,
      description: item.description,
      year: item.year,
      branch: item.branch,
      initials: initialsFromName(item.name) || "IS",
      gradient:
        TESTIMONIAL_GRADIENTS[
          testimonials.length % TESTIMONIAL_GRADIENTS.length
        ],
    };
    const updated = [entry, ...testimonials];
    setTestimonials(updated);
    save("iste_testimonials", updated);
  };

  const removeTestimonial = (id: number) => {
    const updated = testimonials.filter((t) => t.id !== id);
    setTestimonials(updated);
    save("iste_testimonials", updated);
  };

  const addAchievement = (
    item: Omit<AdminAchievement, "id" | "slug"> & { slug?: string },
  ) => {
    const baseSlug = item.slug?.trim() || slugify(item.title);
    const slugTaken = achievements.some((a) => a.slug === baseSlug);
    const slug = slugTaken ? `${baseSlug}-${Date.now()}` : baseSlug;
    const entry: AdminAchievement = {
      id: Date.now(),
      slug,
      title: item.title,
      category: item.category,
      date: item.date,
      year: item.year,
      description: item.description,
      teamName: item.teamName || "ISTE Team",
      teamMembers: item.teamMembers ?? [],
      image: item.image,
      featured: Boolean(item.featured),
    };
    const updated = item.featured
      ? [
          entry,
          ...achievements.map((a) => ({ ...a, featured: false })),
        ]
      : [entry, ...achievements];
    setAchievements(updated);
    save("iste_achievements", updated);
  };

  const removeAchievement = (id: number) => {
    const updated = achievements.filter((a) => a.id !== id);
    setAchievements(updated);
    save("iste_achievements", updated);
  };

  const updateProfile = (data: Partial<IsteProfile>) => {
    const updated = { ...profile, ...data };
    setProfile(updated);
    save("iste_profile", updated);
  };

  const addSupportTicket = (ticket: any) => {
    const updated = [...supportTickets, { ...ticket, id: Date.now() }];
    setSupportTickets(updated);
    save("iste_support_tickets", updated);
  };

  const addContactMessage = (item: {
    name: string;
    email: string;
    message: string;
  }) => {
    const entry: ContactMessage = {
      id: Date.now(),
      name: item.name,
      email: item.email,
      message: item.message,
      createdAt: Date.now(),
      read: false,
    };
    const updated = [entry, ...contactMessages];
    setContactMessages(updated);
    save("iste_contact_messages", updated);
  };

  const removeContactMessage = (id: number) => {
    const updated = contactMessages.filter((m) => m.id !== id);
    setContactMessages(updated);
    save("iste_contact_messages", updated);
  };

  const markContactMessageRead = (id: number) => {
    const updated = contactMessages.map((m) =>
      m.id === id ? { ...m, read: true } : m,
    );
    setContactMessages(updated);
    save("iste_contact_messages", updated);
  };

  const addResource = (resource: any) => {
    const updated = [...resources, { ...resource, id: Date.now() }];
    setResources(updated);
    save("iste_resources", updated);
  };

  return (
    <AdminContext.Provider
      value={{
        isHydrated,
        isAuthenticated,
        login,
        logout,
        events,
        addEvent,
        removeEvent,
        members,
        addMember,
        updateMember,
        removeMember,
        batches,
        addBatch,
        removeBatch,
        memberStats,
        eventGallery,
        addEventPhoto,
        celebrationGallery,
        addCelebrationPhoto,
        testimonials,
        addTestimonial,
        removeTestimonial,
        achievements,
        addAchievement,
        removeAchievement,
        profile,
        updateProfile,
        supportTickets,
        addSupportTicket,
        contactMessages,
        addContactMessage,
        removeContactMessage,
        markContactMessageRead,
        resources,
        addResource,
        teams,
        updateTeam,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
