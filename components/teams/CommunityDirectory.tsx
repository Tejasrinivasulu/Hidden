"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { useAdmin, orderBatchYears } from "@/context/AdminContext";

const FACULTY = [
  {
    name: "Dr. R. Suresh Kumar",
    role: "Faculty Coordinator",
    dept: "Department of CSE",
    org: "Mohan Babu University",
    image: "/faculty/suresh-kumar.png",
    email: "mailto:suresh.kumar@mbu.edu.in",
    linkedin: "#",
    accent: "#2563eb",
    badgeBg: "#dbeafe",
  },
  {
    name: "Dr. P. Madhavi",
    role: "Faculty Coordinator",
    dept: "Department of CSE",
    org: "Mohan Babu University",
    image: "/faculty/p-madhavi.png",
    email: "mailto:p.madhavi@mbu.edu.in",
    linkedin: "#",
    accent: "#c026d3",
    badgeBg: "#fce7f3",
  },
  {
    name: "Dr. K. Srinivasa Rao",
    role: "Faculty Coordinator",
    dept: "Department of CSE",
    org: "Mohan Babu University",
    image: "/faculty/srinivasa-rao.png",
    email: "mailto:k.srinivasa@mbu.edu.in",
    linkedin: "#",
    accent: "#ea580c",
    badgeBg: "#ffedd5",
  },
  {
    name: "Dr. A. Lakshmi Priya",
    role: "Faculty Coordinator",
    dept: "Department of CSE",
    org: "Mohan Babu University",
    image: "/faculty/p-madhavi.png",
    email: "mailto:a.lakshmipriya@mbu.edu.in",
    linkedin: "#",
    accent: "#059669",
    badgeBg: "#d1fae5",
  },
  {
    name: "Dr. V. Ramesh Babu",
    role: "Faculty Coordinator",
    dept: "Department of CSE",
    org: "Mohan Babu University",
    image: "/faculty/suresh-kumar.png",
    email: "mailto:v.rameshbabu@mbu.edu.in",
    linkedin: "#",
    accent: "#7c3aed",
    badgeBg: "#ede9fe",
  },
  {
    name: "Dr. S. Anitha",
    role: "Faculty Coordinator",
    dept: "Department of CSE",
    org: "Mohan Babu University",
    image: "/faculty/p-madhavi.png",
    email: "mailto:s.anitha@mbu.edu.in",
    linkedin: "#",
    accent: "#db2777",
    badgeBg: "#fce7f3",
  },
  {
    name: "Dr. M. Venkata Rao",
    role: "Faculty Coordinator",
    dept: "Department of CSE",
    org: "Mohan Babu University",
    image: "/faculty/srinivasa-rao.png",
    email: "mailto:m.venkatarao@mbu.edu.in",
    linkedin: "#",
    accent: "#0891b2",
    badgeBg: "#cffafe",
  },
  {
    name: "Dr. N. Kavitha",
    role: "Faculty Coordinator",
    dept: "Department of CSE",
    org: "Mohan Babu University",
    image: "/faculty/p-madhavi.png",
    email: "mailto:n.kavitha@mbu.edu.in",
    linkedin: "#",
    accent: "#d97706",
    badgeBg: "#fef3c7",
  },
] as const;

export default function CommunityDirectory() {
  const router = useRouter();
  const { batches } = useAdmin();
  const years = useMemo(() => orderBatchYears(batches), [batches]);

  const openTeam = () => {
    router.push(`/teams/batch/${years[0] ?? "2025"}`);
  };

  return (
    <section id="community" className="relative px-[5vw] py-16 sm:py-20">
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-1.5 sm:gap-2.5">
            <span
              aria-hidden
              className="hidden h-[2px] w-12 bg-gradient-to-r from-transparent to-[#6366f1] sm:block md:w-20"
            />
            <span aria-hidden className="hidden h-1.5 w-1.5 shrink-0 rounded-full bg-[#6366f1] sm:block" />
            <span aria-hidden className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#6366f1]" />
              <span className="h-[2px] w-4 bg-[#6366f1] sm:w-5" />
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#6366f1]" />
            </span>
            <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#6366f1]" />

            <h2 className="whitespace-nowrap px-1 font-display text-[clamp(1.4rem,3.6vw,2.25rem)] font-extrabold tracking-[0.18em] text-[#6366f1] uppercase sm:px-2">
              Our Community
            </h2>

            <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#6366f1]" />
            <span aria-hidden className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#6366f1]" />
              <span className="h-[2px] w-4 bg-[#6366f1] sm:w-5" />
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#6366f1]" />
            </span>
            <span aria-hidden className="hidden h-1.5 w-1.5 shrink-0 rounded-full bg-[#6366f1] sm:block" />
            <span
              aria-hidden
              className="hidden h-[2px] w-12 bg-gradient-to-l from-transparent to-[#6366f1] sm:block md:w-20"
            />
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-[#64748b] sm:text-lg">
            Our faculty coordinators and student leaders work together to guide,
            support and inspire us to learn, innovate, collaborate and create a
            positive impact.
          </p>
        </motion.div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:mt-5">
          {years.map((year) => (
            <button
              key={year}
              type="button"
              onClick={() => router.push(`/teams/batch/${year}`)}
              className="rounded-full bg-[#5b5cf0] px-4 py-1.5 text-sm font-bold tracking-wide text-white shadow-[0_6px_16px_rgba(91,92,240,0.35)] transition hover:bg-[#4f46e5] hover:shadow-[0_8px_20px_rgba(79,70,229,0.45)]"
            >
              {year}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {FACULTY.map((person, i) => (
            <motion.article
              key={person.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="flex gap-4 rounded-[18px] border border-[#e8eef8] bg-white p-3.5 shadow-[0_10px_28px_rgba(15,23,42,0.07)]"
            >
              <div className="relative h-[148px] w-[112px] shrink-0 overflow-hidden rounded-xl bg-[#eef2ff] sm:h-[160px] sm:w-[120px]">
                <Image
                  src={person.image}
                  alt={person.name}
                  fill
                  className="object-cover object-top"
                  sizes="120px"
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col py-0.5">
                <span
                  className="w-fit rounded-full px-2.5 py-1 text-[0.62rem] font-bold tracking-wide uppercase"
                  style={{ backgroundColor: person.badgeBg, color: person.accent }}
                >
                  {person.role}
                </span>

                <h3 className="mt-2.5 font-display text-[1.05rem] font-extrabold leading-snug text-[#0f172a] sm:text-[1.15rem]">
                  {person.name}
                </h3>

                <span
                  className="mt-2 h-1 w-10 rounded-full"
                  style={{ backgroundColor: person.accent }}
                />

                <p className="mt-2.5 text-xs leading-relaxed text-[#64748b] sm:text-[0.8rem]">
                  {person.dept}
                  <br />
                  {person.org}
                </p>

                <div className="mt-auto flex items-center justify-end gap-2 pt-3">
                  <a
                    href={person.email}
                    aria-label={`Email ${person.name}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full border transition hover:opacity-90"
                    style={{ borderColor: person.accent, color: person.accent }}
                  >
                    <Mail size={14} />
                  </a>
                  <a
                    href={person.linkedin}
                    aria-label={`${person.name} LinkedIn`}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0a66c2] text-white transition hover:opacity-90"
                  >
                    <FaLinkedin size={14} />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={openTeam}
            className="rounded-full bg-[#4f46e5] px-8 py-3.5 text-sm font-bold tracking-widest text-white uppercase shadow-[0_10px_28px_rgba(79,70,229,0.35)] transition-all duration-300 hover:scale-105 hover:bg-[#4338ca]"
          >
            View Our Team
          </button>
        </div>
      </div>
    </section>
  );
}
