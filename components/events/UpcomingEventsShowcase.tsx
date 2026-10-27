"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, Clock, Globe, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { eventDetailPath } from "@/lib/events-catalog";

export type ShowcaseEvent = {
  id: number | string;
  name: string;
  description?: string;
  date: string;
  time?: string;
  location: string;
  poster: string;
  formLink?: string;
  registered?: number;
  tag?: string;
  tags?: string[];
  eligibility?: string[];
  highlights?: string[];
};

function formatDay(dateStr: string) {
  const d = new Date(dateStr.includes("T") ? dateStr : `${dateStr}T00:00`);
  if (Number.isNaN(d.getTime())) return "TBA";
  return d.toLocaleDateString("en-US", { day: "numeric", month: "short" });
}

function formatTime(dateStr: string, time?: string) {
  if (time) {
    const [h, m] = time.split(":").map(Number);
    if (!Number.isNaN(h) && !Number.isNaN(m)) {
      const d = new Date();
      d.setHours(h, m, 0, 0);
      return d.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }
  }
  const d = new Date(dateStr.includes("T") ? dateStr : `${dateStr}T00:00`);
  if (Number.isNaN(d.getTime())) return "TBA";
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function isLive(dateStr: string, time?: string) {
  const iso = dateStr.includes("T")
    ? dateStr
    : `${dateStr}T${time || "00:00"}`;
  const d = new Date(iso).getTime();
  if (Number.isNaN(d)) return false;
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;
  return d <= now + dayMs && d >= now - dayMs;
}

type Props = {
  events: ShowcaseEvent[];
  onSelect?: (ev: ShowcaseEvent) => void;
  onViewAll?: () => void;
};

/** Full-width Upcoming Events hero — scrolls through multiple upcoming cards */
export default function UpcomingEventsShowcase({ events }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [events.length]);

  useEffect(() => {
    if (events.length <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % events.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [events.length]);

  const featured = events[index] ?? events[0];
  const live = featured ? isLive(featured.date, featured.time) : false;
  const registerHref =
    featured?.formLink?.trim() && featured.formLink.trim() !== "#"
      ? featured.formLink.trim()
      : "#";
  const registered = featured?.registered ?? 0;
  const hasHttpLink = registerHref.startsWith("http");
  const detailHref = featured ? eventDetailPath(featured.id) : "/events/all";
  const tag =
    featured?.tag ||
    featured?.tags?.[0] ||
    featured?.highlights?.[0] ||
    "Event";

  const prev = () =>
    setIndex((i) => (i - 1 + events.length) % Math.max(events.length, 1));
  const next = () => setIndex((i) => (i + 1) % Math.max(events.length, 1));

  return (
    <section id="upcoming-top" className="relative z-10 w-full scroll-mt-28">
      <div
        className="relative w-full overflow-hidden"
        style={{
          backgroundImage: "url(/upcoming-events-hero-bg.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundAttachment: "scroll",
        }}
      >
        <div className="mx-auto flex min-h-[560px] w-full max-w-6xl flex-col items-center justify-center gap-5 px-[5vw] py-10 pt-[88px] sm:min-h-[640px] sm:gap-6 sm:pt-[96px] lg:min-h-[720px]">
          <h2 className="text-center text-[clamp(1.8rem,3.5vw,2.75rem)] font-extrabold tracking-tight text-[#0f2a5c]">
            Upcoming <span className="text-[#2f6bff]">Events</span>
          </h2>

          <div className="-mt-2 w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.35)] sm:-mt-3">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="bg-[#0e1821] py-8 pl-10 pr-6 sm:py-9 sm:pl-14 sm:pr-9 lg:py-11 lg:pl-20 lg:pr-10">
                <p className="mb-2 text-[11px] font-semibold tracking-[0.14em] text-[#6ea0ff]/80 uppercase">
                  {tag} · {events.length > 1 ? `${index + 1}/${events.length}` : "Featured"}
                </p>
                <h3 className="text-[clamp(1.75rem,3.2vw,2.45rem)] font-bold leading-[1.15] tracking-[-0.02em] text-[#6ea0ff]">
                  {featured?.name || "No upcoming events"}
                </h3>

                <p className="mt-4 max-w-lg text-[1.05rem] font-medium leading-[1.5] text-white/85 sm:text-[1.15rem]">
                  {featured?.description?.slice(0, 120) ||
                    "Stay tuned for the next ISTE chapter event."}
                  {featured?.description && featured.description.length > 120
                    ? "…"
                    : ""}
                </p>

                {featured?.highlights && featured.highlights.length > 0 && (
                  <div className="mt-8 flex flex-wrap gap-x-10 gap-y-3">
                    {featured.highlights.slice(0, 3).map((s) => (
                      <div key={s}>
                        <div className="text-[1.1rem] font-bold leading-none text-[#3b82f6] sm:text-[1.25rem]">
                          {s}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {featured && (
                  <Link
                    href={detailHref}
                    className="mt-8 inline-flex items-center gap-2 rounded-lg border border-[#3b82f6]/50 bg-[#2563eb]/15 px-5 py-2.5 text-[0.9rem] font-semibold tracking-wide text-[#93c5fd] uppercase transition hover:border-[#3b82f6] hover:bg-[#2563eb]/30 hover:text-white"
                  >
                    View all details
                    <ArrowRight size={16} />
                  </Link>
                )}
              </div>

              <div className="flex items-center justify-center border-t border-white/10 bg-black px-5 py-7 sm:px-7 sm:py-8 lg:border-t-0 lg:border-l lg:border-white/10">
                {featured ? (
                  <div className="w-full max-w-[340px] sm:max-w-[360px]">
                    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#101010]">
                      <Link href={detailHref} className="block w-full text-left">
                        <div className="relative h-[220px] w-full overflow-hidden bg-white sm:h-[250px]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={featured.poster}
                            alt={featured.name}
                            className="h-full w-full object-contain transition duration-500"
                          />
                          {live && (
                            <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-red-600 px-2 py-0.5 text-[0.55rem] font-bold tracking-wide text-white uppercase">
                              <span className="h-1 w-1 animate-pulse rounded-full bg-white" />
                              Live now
                            </span>
                          )}
                        </div>
                      </Link>

                      <div className="space-y-2 p-3 sm:p-3.5">
                        <h4 className="text-[0.92rem] font-bold leading-snug text-white">
                          {featured.name}
                        </h4>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.7rem] text-white/55">
                          <span className="inline-flex items-center gap-1">
                            <Calendar size={11} className="text-[#60a5fa]" />
                            {formatDay(featured.date)}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock size={11} className="text-[#60a5fa]" />
                            {formatTime(featured.date, featured.time)}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Globe size={11} className="text-[#60a5fa]" />
                            {featured.location || "TBA"}
                          </span>
                        </div>

                        <p className="text-[0.68rem] text-white/35">
                          {registered} people registered
                        </p>

                        <a
                          href={registerHref}
                          target={hasHttpLink ? "_blank" : undefined}
                          rel={hasHttpLink ? "noopener noreferrer" : undefined}
                          className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#2563eb] py-2 text-[0.8rem] font-semibold text-white transition hover:bg-[#3b82f6]"
                        >
                          Register
                          <ArrowRight size={14} />
                        </a>
                      </div>
                    </div>

                    {events.length > 1 && (
                      <div className="mt-3 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={prev}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:bg-white/10 hover:text-white"
                          aria-label="Previous upcoming event"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <div className="flex gap-1.5">
                          {events.map((_, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setIndex(i)}
                              className={`h-1.5 rounded-full transition-all ${
                                i === index
                                  ? "w-6 bg-[#3b82f6]"
                                  : "w-2 bg-white/25"
                              }`}
                              aria-label={`Go to upcoming event ${i + 1}`}
                            />
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={next}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:bg-white/10 hover:text-white"
                          aria-label="Next upcoming event"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full max-w-[280px] rounded-xl border border-white/10 bg-[#101010] p-6 text-center text-sm text-white/40">
                    No upcoming events scheduled.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
