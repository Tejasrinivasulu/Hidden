"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useAdmin, resolveEventType } from "@/context/AdminContext";
import EventsCatalogGrid from "@/components/events/EventsCatalogGrid";
import EventsFooter from "@/components/events/EventsFooter";
import {
  REAL_EVENTS_MOCK,
  type RealEvent,
} from "@/components/events/RealEventsSection";
import { CATALOG_EVENTS } from "@/lib/events-catalog";

/** communityX-style /events catalog — Upcoming + Past grids */
export default function AllEventsPage() {
  const { events } = useAdmin();

  const { upcoming, past } = useMemo(() => {
    const fromAdmin = Array.isArray(events) ? events : [];
    const mapEv = (e: any): RealEvent => ({
      id: e.id,
      name: e.name,
      date: e.time ? `${e.date}T${e.time}` : e.date,
      location: e.location || "TBA",
      poster: e.poster,
      tag: e.tag || e.tags?.[0],
      mode: e.location?.toLowerCase?.().includes("online")
        ? "online"
        : e.location?.toLowerCase?.().includes("hybrid")
          ? "hybrid"
          : "offline",
      formLink: e.formLink,
      description: e.description,
    });

    const adminUpcoming = fromAdmin
      .filter((e: any) => resolveEventType(e) === "upcoming")
      .map(mapEv);

    const adminPast = fromAdmin
      .filter((e: any) => resolveEventType(e) === "completed")
      .map(mapEv);

    const catalogPast: RealEvent[] = CATALOG_EVENTS.filter(
      (e) => e.type === "completed",
    ).map((e) => ({
      id: e.id,
      name: e.name,
      date: e.date,
      location: e.location,
      poster: e.poster,
      tag: e.tag,
      mode: e.mode,
      formLink: e.formLink,
      description: e.description,
    }));

    return {
      upcoming: adminUpcoming.length > 0 ? adminUpcoming : REAL_EVENTS_MOCK,
      past: adminPast.length > 0 ? adminPast : catalogPast,
    };
  }, [events]);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 15% 20%, rgba(46,147,255,0.10), transparent 60%), radial-gradient(ellipse 50% 35% at 85% 10%, rgba(14,165,233,0.08), transparent 50%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1280px] px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        <Link
          href="/events"
          className="mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-[#0ea5e9]"
        >
          <ArrowLeft size={16} />
          Back to Events
        </Link>

        <div className="space-y-14">
          <section>
            <h2 className="mb-4 text-xl font-bold text-white sm:text-2xl">
              Upcoming Events
            </h2>
            <EventsCatalogGrid events={upcoming} />
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-white sm:text-2xl">
              Past Events
            </h2>
            <EventsCatalogGrid events={past} />
          </section>
        </div>
      </div>

      <EventsFooter />
    </div>
  );
}
