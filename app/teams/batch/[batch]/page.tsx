"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Search, Filter, ChevronDown } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import {
  useAdmin,
  isCoreMember,
  isCoordinatorMember,
  orderBatchYears,
  type IsteMember,
} from "@/context/AdminContext";

const ROLE_THEMES = [
  { bg: "#f3e8ff", text: "#7c3aed" },
  { bg: "#fce7f3", text: "#db2777" },
  { bg: "#e0f2fe", text: "#0284c7" },
  { bg: "#dcfce7", text: "#16a34a" },
  { bg: "#ffedd5", text: "#ea580c" },
  { bg: "#e0e7ff", text: "#4f46e5" },
  { bg: "#fef3c7", text: "#d97706" },
  { bg: "#cffafe", text: "#0891b2" },
];

function themeForRole(role?: string) {
  const key = (role || "member").toLowerCase();
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = (hash + key.charCodeAt(i) * (i + 1)) % 997;
  return ROLE_THEMES[hash % ROLE_THEMES.length];
}

function MemberCard({ member }: { member: IsteMember }) {
  const theme = themeForRole(member.role);
  const roleLabel = (member.role || "Member").toUpperCase();
  const branch = member.branch || member.department || "";
  const mailHref = member.email
    ? `mailto:${member.email}`
    : `mailto:${member.name.toLowerCase().replace(/[^a-z0-9]+/g, ".")}@iste.mbu`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative aspect-[3/4.35] w-full overflow-hidden rounded-2xl border border-[#d8dee9] bg-white p-2 shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-colors duration-300 hover:border-[#c7d2fe]"
    >
      <div className="team-photo-morph absolute top-2 right-2 bottom-2 left-2 overflow-hidden rounded-xl border-2 border-transparent bg-[#e8eef8] group-hover:top-[2%] group-hover:right-[12%] group-hover:bottom-[40%] group-hover:left-[12%] group-hover:rounded-full group-hover:border-[#c7d2fe] group-hover:shadow-[0_12px_28px_rgba(15,23,42,0.14)]">
        {member.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.photo}
            alt={member.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-[#94a3b8]">
            {member.name
              .split(/\s+/)
              .slice(0, 2)
              .map((p) => p[0]?.toUpperCase() ?? "")
              .join("")}
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute inset-x-2 bottom-2.5 flex flex-col items-center opacity-0 transition-opacity duration-700 delay-150 ease-out group-hover:pointer-events-auto group-hover:opacity-100">
        <span
          className="inline-flex max-w-full truncate rounded-full px-3 py-1 text-[0.65rem] font-bold tracking-[0.08em]"
          style={{ backgroundColor: theme.bg, color: theme.text }}
        >
          {roleLabel}
        </span>
        <h3 className="mt-1.5 text-center text-sm font-bold leading-tight text-[#0f172a] sm:text-[0.95rem]">
          {member.name}
        </h3>
        {branch ? (
          <p className="mt-0.5 text-center text-[0.7rem] font-medium text-[#64748b]">
            {branch}
          </p>
        ) : null}
        <span
          className="mt-1.5 h-[2px] w-8 rounded-full"
          style={{ backgroundColor: theme.text }}
        />
        <div className="mt-2.5 flex items-center justify-center gap-2">
          <a
            href={member.linkedin || "#"}
            target="_blank"
            rel="noreferrer"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0a66c2] text-white transition hover:opacity-90"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={12} />
          </a>
          <a
            href={mailHref}
            className="flex h-7 w-7 items-center justify-center rounded-full text-white transition hover:opacity-90"
            style={{ backgroundColor: theme.text }}
            aria-label="Email"
          >
            <Mail size={12} />
          </a>
          <a
            href={member.github || "#"}
            target="_blank"
            rel="noreferrer"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0f172a] text-white transition hover:opacity-90"
            aria-label="GitHub"
          >
            <FaGithub size={12} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function BatchTeamPage() {
  const params = useParams();
  const batch = String(params.batch ?? "");
  const { members, batches, isHydrated } = useAdmin();
  const [view, setView] = useState<"core" | "coordinators">("core");
  const [query, setQuery] = useState("");
  const [branchFilter, setBranchFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const years = useMemo(() => orderBatchYears(batches), [batches]);

  const batchMembers = useMemo(
    () => members.filter((m) => m.batch === batch),
    [members, batch],
  );

  const branches = useMemo(() => {
    const set = new Set(
      batchMembers
        .map((m) => m.branch || m.department || "")
        .filter(Boolean),
    );
    return [...set].sort((a, b) => a.localeCompare(b));
  }, [batchMembers]);

  const coreTeam = useMemo(
    () => batchMembers.filter((m) => isCoreMember(m)),
    [batchMembers],
  );

  const coordinatorSection = useMemo(
    () => batchMembers.filter((m) => isCoordinatorMember(m)),
    [batchMembers],
  );

  const list = useMemo(() => {
    const base = view === "core" ? coreTeam : coordinatorSection;
    const q = query.trim().toLowerCase();
    return base.filter((m) => {
      const branch = m.branch || m.department || "";
      if (branchFilter !== "all" && branch !== branchFilter) return false;
      if (!q) return true;
      const hay = [
        m.name,
        m.role,
        m.email,
        m.rollNo,
        m.branch,
        m.department,
        m.year,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [view, coreTeam, coordinatorSection, query, branchFilter]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent text-[#0f172a]">
      <div
        aria-hidden
        className="pointer-events-none fixed left-1/2 top-1/2 z-0 h-[min(80vw,520px)] w-[min(80vw,520px)] -translate-x-1/2 -translate-y-1/2 opacity-[0.08]"
      >
        <Image
          src="/iste-logo-official.png"
          alt=""
          fill
          className="object-contain"
          priority
        />
      </div>

      <section className="relative z-10 mx-auto max-w-[1400px] px-[3vw] pt-[calc(76px+0.75rem)] pb-16">
        <Link
          href="/teams"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#64748b] transition hover:text-[#4f46e5]"
        >
          <ArrowLeft size={16} />
          Back to Teams
        </Link>

        <div className="mt-3 flex flex-col items-center">
          <div className="mb-3 max-w-3xl text-center">
            <h1 className="font-display text-[clamp(2rem,4.2vw,3rem)] font-extrabold tracking-tight text-[#0f172a]">
              Meet Our{" "}
              <span className="bg-gradient-to-r from-[#3b82f6] to-[#a855f7] bg-clip-text text-transparent">
                Team
              </span>
            </h1>
          </div>

          <div className="inline-flex items-center rounded-full border border-[#c7d2fe] bg-[#4f46e5] p-1 shadow-[0_6px_18px_rgba(79,70,229,0.25)]">
            <button
              type="button"
              onClick={() => setView("core")}
              className={`rounded-full px-5 py-2 text-[0.65rem] font-semibold tracking-[0.12em] uppercase transition sm:px-7 sm:text-[0.7rem] ${
                view === "core"
                  ? "bg-white text-[#4f46e5] shadow-sm"
                  : "bg-transparent text-white/80 hover:text-white"
              }`}
            >
              Core Team
            </button>
            <button
              type="button"
              onClick={() => setView("coordinators")}
              className={`rounded-full px-5 py-2 text-[0.65rem] font-semibold tracking-[0.12em] uppercase transition sm:px-7 sm:text-[0.7rem] ${
                view === "coordinators"
                  ? "bg-white text-[#4f46e5] shadow-sm"
                  : "bg-transparent text-white/80 hover:text-white"
              }`}
            >
              Coordinators
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {years.map((year) => {
              const active = year === batch;
              return (
                <Link
                  key={year}
                  href={`/teams/batch/${year}`}
                  className={`rounded-full px-4 py-1.5 text-sm font-bold tracking-wide transition ${
                    active
                      ? "bg-[#5b5cf0] text-white shadow-[0_6px_16px_rgba(91,92,240,0.4)]"
                      : "bg-[#eef0f6] text-[#0f172a] hover:bg-[#e4e7f0]"
                  }`}
                >
                  {year}
                </Link>
              );
            })}
          </div>

          <div className="mt-6 flex w-full max-w-3xl flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <label className="relative flex min-h-[48px] flex-1 items-center gap-3 rounded-full border border-[#e2e8f0] bg-white px-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
              <Search size={18} className="shrink-0 text-[#94a3b8]" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, position, branch, or email..."
                className="w-full bg-transparent py-3 text-sm text-[#0f172a] outline-none placeholder:text-[#94a3b8]"
              />
            </label>
            <button
              type="button"
              onClick={() => setShowFilters((v) => !v)}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-[#e2e8f0] bg-white px-5 text-sm font-semibold text-[#0f172a] shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition hover:border-[#c7d2fe]"
            >
              <Filter size={16} className="text-[#4f46e5]" />
              Filter
              <ChevronDown
                size={16}
                className={`text-[#64748b] transition ${showFilters ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {showFilters ? (
            <div className="mt-4 flex w-full max-w-3xl flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setBranchFilter("all")}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  branchFilter === "all"
                    ? "border-transparent bg-[#4f46e5] text-white shadow-[0_6px_16px_rgba(79,70,229,0.3)]"
                    : "border-[#e2e8f0] bg-white text-[#0f172a] hover:border-[#c7d2fe]"
                }`}
              >
                All Branches
              </button>
              {branches.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBranchFilter(b)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    branchFilter === b
                      ? "border-transparent bg-[#4f46e5] text-white shadow-[0_6px_16px_rgba(79,70,229,0.3)]"
                      : "border-[#e2e8f0] bg-white text-[#0f172a] hover:border-[#c7d2fe]"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {!isHydrated ? (
          <p className="mt-16 text-center text-sm text-[#64748b]">Loading team…</p>
        ) : list.length === 0 ? (
          <p className="mt-12 rounded-2xl border border-dashed border-[#cbd5e1] bg-[#f8fafc] py-12 text-center text-sm text-[#64748b]">
            No members match your search or filters.
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-5">
            {list.map((m) => (
              <MemberCard key={m.id} member={m} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
