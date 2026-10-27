"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { MapPin, Mail } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

export default function Footer() {
  const { profile } = useAdmin();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "Team", href: "/#teams" },
    { name: "Achievements", href: "/achievements" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact Us", href: "/contact" },
  ];

  const socials = [
    {
      title: "Instagram",
      href: profile.instagram || "https://www.instagram.com/istechamps_mbu/?hl=en",
      brandColor: "#E1306C",
      brandShadow: "rgba(225,48,108,0.4)",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
    {
      title: "LinkedIn",
      href: profile.linkedin || "https://www.linkedin.com/company/iste-svec-mbu/",
      brandColor: "#0A66C2",
      brandShadow: "rgba(10,102,194,0.4)",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      title: "YouTube",
      href: "https://www.youtube.com/@ISTEMBU",
      brandColor: "#FF0000",
      brandShadow: "rgba(255,0,0,0.4)",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
        </svg>
      ),
    },
    {
      title: "WhatsApp",
      href:
        profile.whatsappCommunityLink ||
        "https://chat.whatsapp.com/KZNAUM1o7Qw0skVB5LA88T",
      brandColor: "#25D366",
      brandShadow: "rgba(37,211,102,0.4)",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
    },
  ];

  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  // Mouse-following spotlight for ISTE typography
  const typoContainerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHoveringTypo, setIsHoveringTypo] = useState(false);

  const handleTypoMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = typoContainerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  }, []);

  return (
    <footer id="footer" className="bg-[var(--bg)] border-t border-[var(--border)] pt-12 pb-0 px-[5vw] relative overflow-hidden font-inter">

      <div className="max-w-7xl mx-auto relative z-10">

        {/* 1. Top Bar: Side-by-Side Horizontal Page Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-6 pb-6">
          <nav className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[var(--muted)] font-inter text-sm md:text-base font-medium transition-all duration-300 hover:text-primary relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 text-xs font-mono text-[var(--muted)] bg-white/70 border border-[var(--border)] px-3.5 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>ISTE MBU &amp; SVEC CHAPTER</span>
          </div>
        </div>

        {/* Gradient Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent"></div>
      </div>

      {/* 2. Giant Typography Section with Overlaid Content */}
      <div 
        ref={typoContainerRef}
        onMouseMove={handleTypoMouseMove}
        onMouseEnter={() => setIsHoveringTypo(true)}
        onMouseLeave={() => setIsHoveringTypo(false)}
        className="relative w-full mt-6 mb-0"
      >
        {/* Giant ISTE Typography — interactive spotlight */}
        <div 
          className="select-none overflow-hidden relative cursor-default"
          aria-hidden="true"
        >
          {/* Base dim layer */}
          <div
            className="text-[22vw] md:text-[20vw] font-extrabold uppercase leading-[0.85] tracking-[-0.04em] text-transparent bg-clip-text bg-gradient-to-b from-[var(--text)]/[0.08] to-transparent whitespace-nowrap text-center"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            ISTE
          </div>

          {/* Vibrant gradient layer — revealed by spotlight mask */}
          <div
            className="absolute inset-0 text-[22vw] md:text-[20vw] font-extrabold uppercase leading-[0.85] tracking-[-0.04em] text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#3b6ef0] to-secondary whitespace-nowrap text-center transition-opacity duration-500"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              WebkitMaskImage: `radial-gradient(circle 200px at ${mousePos.x}% ${mousePos.y}%, black 0%, transparent 100%)`,
              maskImage: `radial-gradient(circle 200px at ${mousePos.x}% ${mousePos.y}%, black 0%, transparent 100%)`,
              opacity: isHoveringTypo ? 1 : 0,
            }}
          >
            ISTE
          </div>

          {/* Spotlight glow that follows cursor */}
          <div
            className="absolute pointer-events-none rounded-full transition-opacity duration-500"
            style={{
              width: '300px',
              height: '300px',
              left: `${mousePos.x}%`,
              top: `${mousePos.y}%`,
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(168,216,234,0.15) 0%, rgba(196,181,253,0.08) 40%, transparent 70%)',
              filter: 'blur(30px)',
              opacity: isHoveringTypo ? 1 : 0,
            }}
          />
          
          {/* Ambient glow behind the text */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[50vw] h-[60%] bg-gradient-to-t from-[rgba(124,58,237,0.08)] to-transparent blur-[60px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/3 w-[30vw] h-[40%] bg-gradient-to-t from-[rgba(0,212,255,0.06)] to-transparent blur-[80px] rounded-full pointer-events-none"></div>
        </div>

        {/* Overlaid Content: Logos, Location, Socials, Contact */}
        <div className="absolute inset-0 flex flex-col justify-end pb-6 md:pb-8 pointer-events-none">
          <div className="max-w-7xl mx-auto w-full px-[5vw]">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pointer-events-auto">

              {/* Left: Logos + Location */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <img 
                    src="/logo-2.png" 
                    alt="ISTE Logo" 
                    className="h-10 md:h-12 w-auto object-contain filter drop-shadow-[0_0_10px_rgba(0,212,255,0.15)]" 
                  />
                  <img 
                    src="/logo-1.png" 
                    alt="SVEC Logo" 
                    className="h-10 md:h-12 w-auto object-contain filter drop-shadow-[0_0_10px_rgba(124,58,237,0.15)]" 
                  />
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--muted)] font-inter">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>Sri Sainath Nagar, Tirupati, AP</span>
                </div>
              </div>

              {/* Right: Contact above socials */}
              <div className="flex flex-col items-start md:items-end gap-3">
                <div className="flex flex-col items-start md:items-end gap-2.5">
                  <a
                    href="mailto:wtistembu@gmail.com"
                    className="flex items-center gap-2 text-xs font-mono text-[var(--muted)] bg-white/80 border border-[var(--border)] px-3.5 py-2 rounded-full hover:border-primary/50 hover:text-[var(--text)] transition-all duration-300"
                  >
                    <Mail className="w-3.5 h-3.5" /> wtistembu@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  {socials.map((social) => (
                    <a
                      key={social.title}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.title}
                      onMouseEnter={() => setHoveredSocial(social.title)}
                      onMouseLeave={() => setHoveredSocial(null)}
                      className="w-10 h-10 rounded-xl bg-white/80 backdrop-blur-sm border flex items-center justify-center transition-all duration-300 hover:-translate-y-1.5"
                      style={{
                        color: hoveredSocial === social.title ? social.brandColor : "var(--muted)",
                        borderColor:
                          hoveredSocial === social.title ? social.brandColor : "var(--border)",
                        boxShadow:
                          hoveredSocial === social.title
                            ? `0 8px 20px ${social.brandShadow}`
                            : "none",
                      }}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* 3. Minimal Bottom Copyright Strip */}
      <div className="max-w-7xl mx-auto relative z-10 border-t border-[var(--border)] py-5 px-[5vw]">
        <div className="font-mono text-[0.6rem] tracking-[2px] text-[var(--muted)]/50 uppercase text-center">
          © {new Date().getFullYear()} ISTE MBU &amp; SVEC — ALL RIGHTS RESERVED
        </div>
      </div>

    </footer>
  );
}
