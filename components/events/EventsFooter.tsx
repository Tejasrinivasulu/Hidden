"use client";

import { useEffect, useState } from "react";

/** Exactly 10 community photos cycling inside the ISTE wordmark */
const MOMENT_IMAGES = [
  "/teams-sketchbook/webdev-team.jpg",
  "/teams-sketchbook/management-team.jpg",
  "/teams-sketchbook/poster-team.jpg",
  "/teams-sketchbook/documentation-team.jpg",
  "/teams-sketchbook/scheduling-team.jpg",
  "/teams-sketchbook/social-media-team.jpg",
  "/teams-sketchbook/drafting-team.jpg",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600",
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600",
] as const;

/** communityX-style masked ISTE name — 10 images, 1s interval */
export default function EventsFooter() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    MOMENT_IMAGES.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % MOMENT_IMAGES.length);
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <footer className="relative z-10 mt-24 border-t border-white/10 bg-[#05070f]">
      <div className="mx-auto w-full max-w-7xl px-[5vw] pt-8 pb-3">
        <p className="text-xs text-white/45 sm:text-[13px]">
          © 2026 ISTE MBU &amp; SVEC CHAPTER. All rights reserved.
        </p>
      </div>

      <div
        className="relative mx-auto w-full max-w-7xl overflow-hidden px-[5vw] pb-2"
        aria-hidden
      >
        <svg
          viewBox="0 0 1000 320"
          className="block h-auto w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <mask id="iste-word-mask" maskUnits="userSpaceOnUse">
              <rect width="1000" height="320" fill="black" />
              <text
                x="500"
                y="250"
                textAnchor="middle"
                fill="white"
                fontFamily="Space Grotesk, Inter, Arial Black, sans-serif"
                fontWeight="800"
                fontSize="280"
                letterSpacing="-18"
              >
                ISTE
              </text>
            </mask>
          </defs>

          {/* Soft fallback fill */}
          <rect width="1000" height="320" fill="rgba(255,255,255,0.06)" mask="url(#iste-word-mask)" />

          {MOMENT_IMAGES.map((src, i) => (
            <image
              key={src}
              href={src}
              width="1000"
              height="320"
              preserveAspectRatio="xMidYMid slice"
              mask="url(#iste-word-mask)"
              style={{
                opacity: i === index ? 1 : 0,
                transition: "opacity 0.45s ease",
              }}
            />
          ))}
        </svg>
      </div>
    </footer>
  );
}
