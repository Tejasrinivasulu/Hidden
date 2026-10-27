"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

export const UPCOMING_BANNER_H = 48;

function ordinal(n: number) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function formatEventWhen(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;

  const month = d.toLocaleString("en-US", { month: "long" });
  const day = ordinal(d.getDate());
  const year = d.getFullYear();
  const time = d.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${month} ${day}, ${year} @ ${time}`;
}

function shortDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  const day = ordinal(d.getDate());
  const month = d.toLocaleString("en-US", { month: "short" });
  const year = d.getFullYear();
  return `${day} ${month}, ${year}`;
}

/** Blue announcement strip — next admin upcoming event, above hero. */
export default function UpcomingEventBanner() {
  const { events } = useAdmin();
  const [dismissed, setDismissed] = useState(false);
  const [ready, setReady] = useState(false);

  const event = useMemo(() => {
    const upcoming = events.filter(
      (e) => e?.type === "upcoming" || e?.status === "upcoming"
    );
    if (!upcoming.length) return null;

    const now = Date.now();
    const withTime = upcoming
      .map((e) => ({ e, t: new Date(e.date).getTime() }))
      .filter(({ t }) => !Number.isNaN(t))
      .sort((a, b) => a.t - b.t);

    const future = withTime.find(({ t }) => t >= now);
    if (future) return future.e;
    if (withTime.length) return withTime[withTime.length - 1].e;
    return upcoming[upcoming.length - 1];
  }, [events]);

  useEffect(() => {
    setReady(true);
    if (!event?.id) {
      setDismissed(false);
      return;
    }
    const key = `iste_banner_dismissed_${event.id}`;
    setDismissed(sessionStorage.getItem(key) === "1");
  }, [event?.id]);

  useEffect(() => {
    const visible = ready && !!event && !dismissed;
    document.documentElement.style.setProperty(
      "--upcoming-banner-h",
      visible ? `${UPCOMING_BANNER_H}px` : "0px"
    );
    return () => {
      document.documentElement.style.setProperty("--upcoming-banner-h", "0px");
    };
  }, [ready, event, dismissed]);

  const dismiss = () => {
    if (event?.id) {
      sessionStorage.setItem(`iste_banner_dismissed_${event.id}`, "1");
    }
    setDismissed(true);
  };

  const show = ready && event && !dismissed;
  const when = formatEventWhen(event?.date ?? "");
  const short = shortDate(event?.date ?? "");
  const place = event?.location?.trim() || "TBA";
  const registerHref = event?.formLink?.trim() || "/events";
  const detailsHref = "/events";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={event.id}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-[76px] right-0 left-0 z-40 overflow-hidden"
        >
          <div
            className="flex min-h-[48px] items-center gap-3 bg-[#2563eb] px-[4vw] py-2.5 text-white sm:px-[5vw]"
            role="region"
            aria-label="Upcoming event"
          >
            <div className="flex min-w-0 flex-1 items-center gap-2.5">
              <Sparkles
                size={16}
                className="hidden shrink-0 sm:block"
                aria-hidden
              />
              <p className="truncate text-[0.8rem] leading-snug sm:text-[0.88rem]">
                <span className="font-semibold">Upcoming Event:</span>{" "}
                <span className="font-normal opacity-95">
                  {event.name}
                  {short ? ` (${short})` : ""}
                  {when ? ` — ${when}` : ""}
                  {` | ${place}`}
                </span>
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <a
                href={registerHref}
                target={registerHref.startsWith("http") ? "_blank" : undefined}
                rel={
                  registerHref.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="rounded-full bg-white px-3.5 py-1.5 text-[0.75rem] font-semibold text-[#2563eb] transition hover:bg-white/90 sm:px-4 sm:text-[0.8rem]"
              >
                Register Now
              </a>
              <Link
                href={detailsHref}
                className="hidden text-[0.8rem] font-medium text-white/95 underline-offset-2 hover:underline sm:inline"
              >
                More Details
              </Link>
              <button
                type="button"
                onClick={dismiss}
                aria-label="Dismiss upcoming event banner"
                className="rounded p-1 text-white/90 transition hover:bg-white/15 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
