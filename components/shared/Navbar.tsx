"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const links = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Team", href: "/teams" },
  { label: "Gallery", href: "/gallery" },
  { label: "Achievements", href: "/achievements" },
  { label: "Contact", href: "/contact" },
];

const NAV_H = 76;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("/");
  const pathname = usePathname();
  const hideNav = pathname?.startsWith("/admin");

  useEffect(() => {
    if (hideNav) return;
    if (pathname === "/") {
      const hash = typeof window !== "undefined" ? window.location.hash : "";
      if (hash) setActiveHref(`/${hash}`);
      else setActiveHref("/");
      return;
    }
    const match = links.find(
      (l) => l.href !== "/" && !l.href.includes("#") && pathname.startsWith(l.href)
    );
    setActiveHref(match?.href ?? pathname);
  }, [pathname, hideNav]);

  const handleNavClick = (href: string) => {
    setActiveHref(href);
    setIsOpen(false);
  };

  if (hideNav) return null;

  return (
    <>
      <nav
        className="fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-xl sm:rounded-b-2xl"
        style={{
          background: "var(--nav-bg)",
          borderColor: "var(--nav-border)",
          boxShadow: "0 4px 24px rgba(20, 50, 90, 0.08)",
        }}
      >
        <div
          className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-[5vw]"
          style={{ height: NAV_H }}
        >
          <Link
            href="/"
            onClick={() => handleNavClick("/")}
            className="relative z-50 flex shrink-0 items-center gap-1 sm:gap-1.5"
          >
            <Image
              src="/nav-logo-iste.png"
              alt="ISTE"
              width={112}
              height={112}
              quality={100}
              className="h-[68px] w-[68px] object-contain brightness-110 contrast-110 drop-shadow-[0_2px_8px_rgba(46,200,255,0.25)] sm:h-[74px] sm:w-[74px]"
              priority
            />

            <Image
              src="/nav-logo-mbu.png"
              alt="Mohan Babu University"
              width={240}
              height={90}
              quality={100}
              className="hidden h-[56px] w-auto object-contain object-left brightness-110 contrast-110 drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)] sm:block sm:h-[64px]"
              priority
            />

            <div className="hidden h-10 w-px shrink-0 bg-[var(--border)] md:block" />
            <div className="hidden font-mono text-[0.6rem] leading-[1.3] font-semibold tracking-[0.12em] text-[var(--accent)] uppercase md:block">
              MBU &amp; SVEC
              <br />
              Chapter
            </div>
          </Link>

          <ul className="hidden items-center gap-6 lg:flex xl:gap-8">
            {links.map((link) => {
              const active = activeHref === link.href;
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`relative pb-1.5 text-[0.88rem] font-medium transition-colors ${
                      active
                        ? "text-[var(--primary)]"
                        : "text-[var(--muted)] hover:text-[var(--text)]"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute right-0 bottom-0 left-0 h-[2px] rounded-full bg-[var(--primary)] shadow-[0_0_10px_rgba(46,200,255,0.55)]" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center md:flex">
            <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-[0.8rem] font-semibold tracking-[0.08em] text-[var(--accent)]">
              Learn · Collaborate · Grow
            </span>
          </div>

          <button
            className="relative z-50 text-[var(--muted)] transition-colors hover:text-[var(--text)] lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[76px] right-0 left-0 z-40 border-b p-5 backdrop-blur-xl lg:hidden"
            style={{
              background: "var(--nav-bg)",
              borderColor: "var(--nav-border)",
            }}
          >
            <ul className="flex flex-col gap-4">
              {links.map((link) => {
                const active = activeHref === link.href;
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className={`block border-b-2 pb-1 text-[0.95rem] font-medium transition-colors ${
                        active
                          ? "border-[var(--primary)] text-[var(--primary)]"
                          : "border-transparent text-[var(--muted)] hover:text-[var(--text)]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-1">
                <span className="inline-block rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-[0.82rem] font-semibold tracking-[0.08em] text-[var(--accent)]">
                  Learn · Collaborate · Grow
                </span>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
