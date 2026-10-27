"use client";

import Link from "next/link";
import type { RealEvent } from "@/components/events/RealEventsSection";
import { eventDetailPath } from "@/lib/events-catalog";

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

function modeLabel(ev: RealEvent) {
  const mode = (ev.mode || "").toLowerCase();
  if (mode === "online") return "Online";
  if (mode === "hybrid") return "Hybrid";
  if (mode === "in-person" || mode === "offline") return "Offline";
  return ev.location || "TBA";
}

type Props = {
  events: RealEvent[];
};

/** communityX /events grid — poster cards → detail pages */
export default function EventsCatalogGrid({ events }: Props) {
  if (!events.length) {
    return (
      <p className="py-10 text-center text-sm text-white/40">No events to show.</p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {events.map((ev) => (
        <Link
          key={ev.id}
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
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/50 via-transparent to-transparent" />
            </div>
          </div>

          <div className="px-0.5 pt-2.5 pb-1 sm:px-1 sm:pt-3">
            <p className="line-clamp-1 text-[12px] text-white/55 sm:text-sm">
              {modeLabel(ev)}
            </p>
            <h3 className="mt-1.5 text-[15px] leading-tight font-bold text-white transition-colors group-hover:text-[#0ea5e9] sm:text-lg">
              {ev.name}
            </h3>
            <p className="mt-1.5 text-[12px] text-white/55 sm:mt-2 sm:text-sm">
              {formatWhen(ev.date)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
