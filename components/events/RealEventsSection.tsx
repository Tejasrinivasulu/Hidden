"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { eventDetailPath } from "@/lib/events-catalog";

export type RealEvent = {
  id: number | string;
  name: string;
  date: string;
  location: string;
  poster: string;
  tag?: string;
  mode?: string;
  free?: boolean;
  description?: string;
  formLink?: string;
};

const BANNER =
  "https://uciwnevkoxiutqfarmaz.supabase.co/storage/v1/object/public/events/banners";

/** Mock catalog — posters + copy styled like communityX Real Events */
export const REAL_EVENTS_MOCK: RealEvent[] = [
  {
    id: "re-1",
    name: "Strategy Blitz 2.0",
    date: "2026-10-16T09:00",
    location: "Maulana Azad National Institute of Technology, Madhya Pradesh 462003",
    poster: `${BANNER}/1791121035365-shuo8t8.webp`,
    tag: "Hackathon",
    mode: "in-person",
    free: true,
    formLink: "#",
  },
  {
    id: "re-2",
    name: "InnoVortex 4.0",
    date: "2026-10-24T09:00",
    location: "Indira Gandhi Delhi Technical University for Women",
    poster: `${BANNER}/1790862997961-p8s24x2.webp`,
    tag: "Hackathon",
    mode: "in-person",
    free: true,
    formLink: "#",
  },
  {
    id: "re-3",
    name: "HACKFEST 2.0",
    date: "2026-10-24T09:00",
    location: "East Point College of Engineering And Technology",
    poster: `${BANNER}/1790693266468-7i1zd36.webp`,
    tag: "Hackathon",
    mode: "in-person",
    free: true,
    formLink: "#",
  },
  {
    id: "re-4",
    name: "ALGOSTORM 2.0 - THE CODE CARNIVAL",
    date: "2026-10-12T09:00",
    location: "Amity University Raipur",
    poster: `${BANNER}/1790673668335-bbfzbb7.webp`,
    tag: "Hackathon",
    mode: "in-person",
    free: true,
    formLink: "#",
  },
  {
    id: "re-5",
    name: "Spirit 3.0",
    date: "2026-10-13T08:00",
    location: "Dr. Shakuntala Misra National Rehabilitation University",
    poster: `${BANNER}/1790612449741-1ng08do.webp`,
    tag: "Hackathon",
    mode: "in-person",
    free: true,
    formLink: "#",
  },
  {
    id: "re-6",
    name: "ACM CODENITE HACKATHON 2026",
    date: "2026-10-25T08:00",
    location: "MITS Gwalior",
    poster: `${BANNER}/1790541737562-h779d30.webp`,
    tag: "Hackathon",
    mode: "in-person",
    free: true,
    formLink: "#",
  },
  {
    id: "re-7",
    name: "The AI-Native Era: OSCode Chapter Launch & Tech Talk",
    date: "2026-10-01T14:00",
    location: "Galgotias University, Greater Noida",
    poster: `${BANNER}/1790778269542-hatwaj9.webp`,
    tag: "Seminar",
    mode: "in-person",
    free: true,
    formLink: "#",
  },
  {
    id: "re-8",
    name: "VibeCon 2.0",
    date: "2026-10-15T09:00",
    location: "Galgotias University",
    poster: `${BANNER}/1790352686407-p0k84on.webp`,
    tag: "Hackathon",
    mode: "in-person",
    free: true,
    formLink: "#",
  },
  {
    id: "re-9",
    name: "Aptitude Arcade",
    date: "2026-10-06T09:00",
    location: "Mohan Babu University (Online)",
    poster: "/aptitude-arcade-poster.png",
    tag: "Challenge",
    mode: "online",
    free: true,
    description:
      "Strengthen aptitude through learn · practice · test · improve. Build accuracy and speed for placements, GATE, and competitive exams with daily challenges.",
    formLink: "https://aptitude-arcade.vercel.app/",
  },
];

type Props = {
  events?: RealEvent[];
  onSelect?: (ev: RealEvent) => void;
};

function formatWhen(dateStr: string) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "Date TBA";
  const day = d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const time = d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return `${day} · ${time} IST`;
}

/** communityX Real Events · Verified Partners — below Upcoming Events */
export default function RealEventsSection({ events, onSelect }: Props) {
  const source = events && events.length > 0 ? events : REAL_EVENTS_MOCK;

  return (
    <section className="relative z-10 mt-20 sm:mt-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <h2 className="text-[clamp(26px,3.5vw,42px)] font-extrabold leading-tight tracking-tight text-white">
          Recent <span className="text-[#0ea5e9]">Events</span>
        </h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-white/45">
          Hackathons, workshops, and bootcamps — run with industry partners, free for
          students.
        </p>
      </div>

      <div className="events-marquee-mask group/events relative mt-8 flex-1 overflow-hidden">
        <div className="events-marquee flex w-max gap-5">
          {[...source, ...source].map((ev, i) => {
            return (
              <div
                key={`${ev.id}-${i}`}
                className="w-[78vw] shrink-0 sm:w-[44vw] lg:w-[265px]"
              >
                <Link
                  href={eventDetailPath(ev.id)}
                  className="group flex h-full w-full flex-col text-left"
                >
                  <div className="relative w-full overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.04] transition-all duration-300 hover:border-white/25 hover:bg-white/[0.06] sm:max-w-[300px]">
                    <div className="relative aspect-[3/4] bg-[#05070f]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={ev.poster}
                        alt={ev.name}
                        className="absolute inset-0 h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                  </div>

                  <div className="px-0.5 pt-2.5 pb-1 sm:px-1 sm:pt-3">
                    <p className="line-clamp-2 text-[12px] text-white/55 sm:text-sm">
                      {ev.location}
                    </p>
                    <h3 className="mt-1.5 text-[15px] leading-tight font-bold text-white transition-colors group-hover:text-[#0ea5e9] sm:text-lg">
                      {ev.name}
                    </h3>
                    <p className="mt-1.5 text-[12px] text-white/55 sm:mt-2 sm:text-sm">
                      {formatWhen(ev.date)}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/events/all"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-[0.82rem] font-medium text-white transition hover:border-[#0ea5e9] hover:bg-[#0ea5e9]/10"
        >
          View all events
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
