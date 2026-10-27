"use client";

type Moment = {
  id: string;
  src: string;
  alt: string;
  wide?: boolean;
};

const ROW_ONE: Moment[] = [
  {
    id: "m1",
    src: "/teams-sketchbook/webdev-team.jpg",
    alt: "ISTE Community Gathering",
    wide: true,
  },
  {
    id: "m2",
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=900",
    alt: "Hackathon Sprint",
  },
  {
    id: "m3",
    src: "/teams-sketchbook/management-team.jpg",
    alt: "Chapter Meetup",
    wide: true,
  },
  {
    id: "m4",
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=900",
    alt: "Workshop Session",
  },
  {
    id: "m5",
    src: "/teams-sketchbook/poster-team.jpg",
    alt: "Design Studio",
    wide: true,
  },
  {
    id: "m6",
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=900",
    alt: "Tech Talk",
  },
];

const ROW_TWO: Moment[] = [
  {
    id: "m7",
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=900",
    alt: "Campus Build Session",
  },
  {
    id: "m8",
    src: "/teams-sketchbook/documentation-team.jpg",
    alt: "Team Collaboration",
    wide: true,
  },
  {
    id: "m9",
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=900",
    alt: "Speaker Session",
  },
  {
    id: "m10",
    src: "/teams-sketchbook/scheduling-team.jpg",
    alt: "Event Planning",
    wide: true,
  },
  {
    id: "m11",
    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=900",
    alt: "Celebration Night",
  },
  {
    id: "m12",
    src: "/teams-sketchbook/social-media-team.jpg",
    alt: "Community Moments",
    wide: true,
  },
];

function MomentCard({ moment }: { moment: Moment }) {
  return (
    <div
      className={`relative h-full shrink-0 overflow-hidden rounded-2xl border border-white/10 ${
        moment.wide ? "w-[280px] sm:w-[320px]" : "w-[180px] sm:w-[220px]"
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={moment.src}
        alt={moment.alt}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
    </div>
  );
}

function MomentsRow({
  items,
  direction = "left",
}: {
  items: Moment[];
  direction?: "left" | "right";
}) {
  // Triple the strip so the loop stays seamless while scrolling
  const track = [...items, ...items, ...items];

  return (
    <div className="group relative h-[180px] overflow-hidden sm:h-[210px]">
      <div
        className={`flex h-full w-max gap-3 ${
          direction === "left" ? "moments-marquee-left" : "moments-marquee-right"
        } group-hover:[animation-play-state:paused]`}
      >
        {track.map((moment, i) => (
          <MomentCard key={`${moment.id}-${i}`} moment={moment} />
        ))}
      </div>
    </div>
  );
}

/** communityX-style Community Moments — top scrolls left, bottom scrolls right */
export default function CommunityMomentsSection() {
  return (
    <section className="relative z-10 mt-20 sm:mt-24">
      <div className="mx-auto mb-8 flex max-w-2xl flex-col items-center text-center">
        <h2 className="text-[clamp(26px,3.5vw,42px)] font-extrabold leading-tight tracking-tight text-white">
          Community <span className="text-[#0ea5e9]">Moments</span>
        </h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-white/45">
          Captured from hackathons, workshops, and chapter events across campus.
        </p>
      </div>

      <div className="moments-marquee-mask space-y-3">
        <MomentsRow items={ROW_ONE} direction="left" />
        <MomentsRow items={ROW_TWO} direction="right" />
      </div>
    </section>
  );
}
