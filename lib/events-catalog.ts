export type CatalogEvent = {
  id: string;
  name: string;
  description?: string;
  date: string;
  location: string;
  poster: string;
  formLink?: string;
  tag?: string;
  mode?: string;
  free?: boolean;
  type?: "upcoming" | "completed";
  highlights?: string[];
  eligibility?: string[];
  registered?: number;
};

const BANNER =
  "https://uciwnevkoxiutqfarmaz.supabase.co/storage/v1/object/public/events/banners";

export const CATALOG_EVENTS: CatalogEvent[] = [
  {
    id: "1",
    name: "Aptitude Arcade",
    description:
      "Strengthen aptitude through learn · practice · test · improve. Build accuracy and speed for placements, GATE, and competitive exams with daily challenges.",
    date: "2026-10-06T09:00",
    location: "Online — Mohan Babu University",
    poster: "/aptitude-arcade-poster.png",
    formLink: "https://aptitude-arcade.vercel.app/",
    tag: "Challenge",
    mode: "online",
    free: true,
    type: "upcoming",
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
    id: "2",
    name: "InnoVortex 4.0",
    description:
      "Campus innovation hackathon where teams build real solutions with industry mentors. Compete across problem tracks, pitch ideas, and ship working demos. Open for engineering students ready to innovate.",
    date: "2026-10-24T09:00",
    location: "Hybrid",
    poster: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800",
    formLink: "#",
    tag: "Hackathon",
    mode: "hybrid",
    type: "upcoming",
  },
  {
    id: "3",
    name: "VibeCon 2.0",
    description: "Build, pitch, and ship with your squad.",
    date: "2026-10-15T09:00",
    location: "Hybrid",
    poster: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800",
    formLink: "#",
    tag: "Hackathon",
    mode: "hybrid",
    type: "upcoming",
  },
  {
    id: "4",
    name: "AI Tools for Innovators",
    description: "Hands-on session on practical AI tooling for students.",
    date: "2026-10-10T11:00",
    location: "Offline",
    poster: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800",
    formLink: "#",
    tag: "Workshop",
    mode: "offline",
    type: "upcoming",
  },
  {
    id: "5",
    name: "Web3 Seminar",
    description: "Intro to blockchain and smart contracts.",
    date: "2026-12-05T14:00",
    location: "Offline",
    poster: "https://images.unsplash.com/photo-1639762681485-074b7f4ec8e0?q=80&w=800",
    formLink: "#",
    tag: "Seminar",
    mode: "offline",
    type: "upcoming",
  },
  {
    id: "re-1",
    name: "Strategy Blitz 2.0",
    description:
      "National strategy hackathon with hybrid participation and industry mentors.",
    date: "2026-10-16T09:00",
    location: "Maulana Azad National Institute of Technology, Madhya Pradesh 462003",
    poster: `${BANNER}/1791121035365-shuo8t8.webp`,
    tag: "Hackathon",
    mode: "hybrid",
    free: true,
    type: "upcoming",
    formLink: "#",
  },
  {
    id: "re-2",
    name: "InnoVortex 4.0",
    description: "Campus innovation hackathon with industry mentors.",
    date: "2026-10-24T09:00",
    location: "Indira Gandhi Delhi Technical University for Women",
    poster: `${BANNER}/1790862997961-p8s24x2.webp`,
    tag: "Hackathon",
    mode: "hybrid",
    free: true,
    type: "upcoming",
    formLink: "#",
  },
  {
    id: "re-3",
    name: "HACKFEST 2.0",
    description: "AI & emerging technologies hackathon for engineering students.",
    date: "2026-10-24T09:00",
    location: "East Point College of Engineering And Technology",
    poster: `${BANNER}/1790693266468-7i1zd36.webp`,
    tag: "Hackathon",
    mode: "offline",
    free: true,
    type: "upcoming",
    formLink: "#",
  },
  {
    id: "re-4",
    name: "ALGOSTORM 2.0 - THE CODE CARNIVAL",
    description: "24-hour coding carnival with prizes and competitive tracks.",
    date: "2026-10-12T09:00",
    location: "Amity University Raipur",
    poster: `${BANNER}/1790673668335-bbfzbb7.webp`,
    tag: "Hackathon",
    mode: "offline",
    free: true,
    type: "upcoming",
    formLink: "#",
  },
  {
    id: "re-5",
    name: "Spirit 3.0",
    description: "Campus spirit fest with tech challenges and workshops.",
    date: "2026-10-13T08:00",
    location: "Dr. Shakuntala Misra National Rehabilitation University",
    poster: `${BANNER}/1790612449741-1ng08do.webp`,
    tag: "Hackathon",
    mode: "offline",
    free: true,
    type: "upcoming",
    formLink: "#",
  },
  {
    id: "re-6",
    name: "ACM CODENITE HACKATHON 2026",
    description: "Night-long ACM coding hackathon.",
    date: "2026-10-25T08:00",
    location: "MITS Gwalior",
    poster: `${BANNER}/1790541737562-h779d30.webp`,
    tag: "Hackathon",
    mode: "offline",
    free: true,
    type: "upcoming",
    formLink: "#",
  },
  {
    id: "re-7",
    name: "The AI-Native Era: OSCode Chapter Launch & Tech Talk",
    description: "Chapter launch with talks on AI-native engineering careers.",
    date: "2026-10-01T14:00",
    location: "Galgotias University, Greater Noida",
    poster: `${BANNER}/1790778269542-hatwaj9.webp`,
    tag: "Seminar",
    mode: "offline",
    free: true,
    type: "upcoming",
    formLink: "#",
  },
  {
    id: "re-8",
    name: "VibeCon 2.0",
    description: "Build, pitch, and ship with your squad.",
    date: "2026-10-15T09:00",
    location: "Galgotias University",
    poster: `${BANNER}/1790352686407-p0k84on.webp`,
    tag: "Hackathon",
    mode: "hybrid",
    free: true,
    type: "upcoming",
    formLink: "#",
  },
  {
    id: "re-9",
    name: "Aptitude Arcade",
    description:
      "Strengthen aptitude through learn · practice · test · improve. Build accuracy and speed for placements, GATE, and competitive exams with daily challenges.",
    date: "2026-10-06T09:00",
    location: "Mohan Babu University (Online)",
    poster: "/aptitude-arcade-poster.png",
    tag: "Challenge",
    mode: "online",
    free: true,
    type: "upcoming",
    formLink: "https://aptitude-arcade.vercel.app/",
  },
  {
    id: "past-1",
    name: "INDUSTRY UNFILTERED",
    description: "Candid industry sessions with working engineers.",
    date: "2026-09-29T14:00",
    location: "BMSCE College Of Engineering",
    poster:
      "https://images.unsplash.com/photo-1475721027785-bebd8ba2c3df?q=80&w=900",
    mode: "offline",
    tag: "Talk",
    type: "completed",
    formLink: "#",
  },
  {
    id: "past-2",
    name: "TRIFESTA",
    description: "Campus fest with tech and cultural tracks.",
    date: "2026-09-28T14:00",
    location: "BMSCE College Of Engineering",
    poster:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=900",
    mode: "offline",
    tag: "Fest",
    type: "completed",
    formLink: "#",
  },
  {
    id: "past-3",
    name: "Tech Quest",
    description: "Technical quiz and problem-solving contest.",
    date: "2026-09-28T08:30",
    location: "Campus Lab",
    poster:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=900",
    mode: "offline",
    tag: "Quiz",
    type: "completed",
    formLink: "#",
  },
  {
    id: "past-4",
    name: "Machine Learning — P2P Session",
    description: "Peer-to-peer machine learning workshop.",
    date: "2026-09-29T09:00",
    location: "Online / Campus",
    poster:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=900",
    mode: "offline",
    tag: "Workshop",
    type: "completed",
    formLink: "#",
  },
  {
    id: "past-5",
    name: "HACK N HUNT 2.0",
    description: "Treasure-hunt style coding challenge.",
    date: "2026-09-25T17:00",
    location: "Main Campus",
    poster:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=900",
    mode: "offline",
    tag: "Hackathon",
    type: "completed",
    formLink: "#",
  },
  {
    id: "past-6",
    name: "Exploring Open Source",
    description: "Intro session on contributing to open source.",
    date: "2026-09-04T12:00",
    location: "Seminar Hall",
    poster:
      "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=900",
    mode: "offline",
    tag: "Seminar",
    type: "completed",
    formLink: "#",
  },
  {
    id: "6",
    name: "React Workshop",
    description: "Learn modern React and Next.js basics.",
    date: "2023-10-15T09:00",
    location: "Lab 4",
    poster:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=900",
    mode: "offline",
    tag: "Workshop",
    type: "completed",
    formLink: "#",
  },
  {
    id: "past-8",
    name: "Lean Startup MVP Bootcamp",
    description: "Hands-on MVP bootcamp for student founders.",
    date: "2026-08-24T13:00",
    location: "Innovation Cell",
    poster:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=900",
    mode: "offline",
    tag: "Bootcamp",
    type: "completed",
    formLink: "#",
  },
];

export function eventDetailPath(id: string | number) {
  return `/events/${encodeURIComponent(String(id))}`;
}

export function findCatalogEvent(
  id: string,
  extra: CatalogEvent[] = []
): CatalogEvent | undefined {
  const all = [...extra, ...CATALOG_EVENTS];
  return all.find((e) => String(e.id) === String(id));
}

export function toCatalogEvent(raw: any): CatalogEvent {
  return {
    id: String(raw.id),
    name: raw.name,
    description: raw.description,
    date: raw.date,
    location: raw.location || "TBA",
    poster: raw.poster,
    formLink: raw.formLink,
    tag: raw.tag,
    mode: raw.mode,
    free: raw.free,
    type: raw.type === "completed" || raw.status === "completed" ? "completed" : "upcoming",
    highlights: raw.highlights,
    eligibility: raw.eligibility,
    registered: raw.registered,
  };
}
