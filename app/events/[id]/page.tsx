"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Tag,
} from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import EventsFooter from "@/components/events/EventsFooter";
import {
  CATALOG_EVENTS,
  findCatalogEvent,
  toCatalogEvent,
  type CatalogEvent,
} from "@/lib/events-catalog";

const APTITUDE_TITLE = "Aptitude Arcade";
const APTITUDE_ABOUT =
  "Strengthen aptitude through learn · practice · test · improve. Build accuracy and speed for placements, GATE, and competitive exams with daily challenges.";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "Date TBA";
  return d.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(dateStr: string) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "Time TBA";
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export default function EventDetailPage() {
  const params = useParams();
  const id = String(params?.id ?? "");
  const { events } = useAdmin();

  const event = useMemo(() => {
    const fromAdmin: CatalogEvent[] = (events || []).map(toCatalogEvent);
    const found = findCatalogEvent(id, fromAdmin);
    const catalogHit = CATALOG_EVENTS.find((e) => String(e.id) === String(id));

    if (!found && !catalogHit) return null;

    const base = found || catalogHit!;
    const isAptitude =
      String(base.id) === "1" ||
      String(base.id) === "re-9" ||
      /aptitude arcade/i.test(base.name);

    // Prefer catalog title/about for Aptitude Arcade so View all details stays correct
    if (isAptitude) {
      return {
        ...base,
        ...(catalogHit || {}),
        name: APTITUDE_TITLE,
        description: APTITUDE_ABOUT,
        formLink:
          base.formLink && base.formLink !== "#"
            ? base.formLink
            : "https://aptitude-arcade.vercel.app/",
        poster: base.poster || "/aptitude-arcade-poster.png",
      };
    }

    return {
      ...base,
      name: catalogHit?.name || base.name,
      description: catalogHit?.description || base.description,
    };
  }, [id, events]);

  if (!event) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] px-6 text-white">
        <h1 className="text-2xl font-bold">Event not found</h1>
        <Link href="/events" className="mt-4 text-[#0ea5e9] hover:underline">
          Back to Events
        </Link>
      </div>
    );
  }

  const displayTitle = event.name;
  const displayAbout =
    event.description ||
    `Join ${event.name} to learn, build, and connect with peers. Gain practical skills through sessions and challenges designed for engineering students. Grow with ISTE and unlock new campus opportunities.`;

  const registerHref =
    event.formLink?.trim() && event.formLink.trim() !== "#"
      ? event.formLink.trim()
      : null;
  const hasHttp = !!registerHref?.startsWith("http");

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 20% 15%, rgba(46,147,255,0.12), transparent 60%), radial-gradient(ellipse 45% 35% at 80% 20%, rgba(14,165,233,0.08), transparent 50%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-[5vw] pt-28 pb-16">
        <Link
          href="/events"
          className="mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-[#0ea5e9]"
        >
          <ArrowLeft size={16} />
          Back to Events
        </Link>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0e1821]/80 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Left — content */}
            <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-12 lg:px-12">
              {event.tag && (
                <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-[#0ea5e9]/35 bg-[#0ea5e9]/10 px-3 py-1 text-[11px] tracking-wide text-[#7dd3fc] uppercase">
                  <Tag size={12} />
                  {event.tag}
                </span>
              )}

              {/* 1. Title */}
              <h1 className="text-[clamp(2rem,3.8vw,2.9rem)] font-extrabold leading-[1.15] tracking-tight text-white drop-shadow-sm">
                {displayTitle}
              </h1>

              {/* 2. About event */}
              <div className="mt-6 max-w-xl rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 sm:px-5 sm:py-5">
                <p className="mb-2 text-[12px] font-semibold tracking-[0.14em] text-[#7dd3fc] uppercase">
                  About Event
                </p>
                <p className="text-[1.05rem] leading-[1.7] font-medium text-white/90 sm:text-[1.1rem]">
                  {displayAbout}
                </p>
              </div>

              {/* 3. Date and time */}
              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
                <div className="flex items-start gap-3 text-white/80">
                  <Calendar className="mt-0.5 shrink-0 text-[#60a5fa]" size={18} />
                  <div>
                    <p className="text-[11px] tracking-wide text-white/40 uppercase">
                      Date
                    </p>
                    <p className="mt-1 text-[0.95rem] font-medium">
                      {formatDate(event.date)}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-white/80">
                  <Clock className="mt-0.5 shrink-0 text-[#60a5fa]" size={18} />
                  <div>
                    <p className="text-[11px] tracking-wide text-white/40 uppercase">
                      Time
                    </p>
                    <p className="mt-1 text-[0.95rem] font-medium">
                      {formatTime(event.date)} IST
                    </p>
                  </div>
                </div>
              </div>

              {/* 4. Venue */}
              <div className="mt-5 flex items-start gap-3 text-white/80">
                <MapPin className="mt-0.5 shrink-0 text-[#60a5fa]" size={18} />
                <div>
                  <p className="text-[11px] tracking-wide text-white/40 uppercase">
                    Venue
                  </p>
                  <p className="mt-1 text-[0.95rem] font-medium">{event.location}</p>
                </div>
              </div>

              {/* 5. Registration button */}
              {registerHref ? (
                <a
                  href={registerHref}
                  target={hasHttp ? "_blank" : undefined}
                  rel={hasHttp ? "noopener noreferrer" : undefined}
                  className="mt-8 inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-6 py-3.5 text-[0.95rem] font-semibold text-white transition hover:bg-[#3b82f6] sm:w-auto"
                >
                  Register Event
                  <ExternalLink size={16} />
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="mt-8 inline-flex w-full max-w-sm cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-[0.95rem] font-semibold text-white/40 sm:w-auto"
                >
                  Registration closed
                </button>
              )}
            </div>

            {/* Right — poster image */}
            <div className="relative min-h-[320px] border-t border-white/10 bg-[#05070f] lg:min-h-[560px] lg:border-t-0 lg:border-l lg:border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={event.poster}
                alt={event.name}
                className="absolute inset-0 h-full w-full object-contain p-4 sm:p-6"
              />
            </div>
          </div>
        </div>
      </div>

      <EventsFooter />
    </div>
  );
}
