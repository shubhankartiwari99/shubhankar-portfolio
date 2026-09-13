"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { PenLine, Menu, X, Check, ShieldAlert, FileText } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const sections = [
  { id: "about", label: "ABOUT" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "projects", label: "PROJECTS" },
  { id: "skills", label: "SKILLS" },
  { id: "journey", label: "JOURNEY" },
  { id: "terminal", label: "TERMINAL" },
];

interface Props {
  recruiterMode: boolean;
  setRecruiterMode: (v: boolean) => void;
}

export default function Navigation({ recruiterMode, setRecruiterMode }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    let ticking = false;

    const fn = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);

        if (isHome) {
          const sectionEls = sections
            .map((s) => document.getElementById(s.id))
            .filter(Boolean) as HTMLElement[];
          let current = "";

          for (const el of sectionEls) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 250) {
              current = el.id;
            }
          }

          setActiveSection(current);
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, [isHome]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = mobileOpen ? "hidden" : originalOverflow;
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3 bg-[rgba(6,8,14,0.85)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.08)] shadow-2xl" : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-label-caps tracking-widest text-[var(--on-surface)] transition-opacity duration-200 hover:opacity-90"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--primary)] status-pulse" />
          <span className="font-bold text-sm md:text-base tracking-wider font-mono">
            SHUBHANKAR_TIWARI
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] px-2.5 py-1.5 rounded-full backdrop-blur-md relative">
          {isHome ? (
            sections.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className={`font-label-caps px-3.5 py-1.5 rounded-full text-xs transition-colors duration-200 relative ${
                    isActive
                      ? "text-[var(--primary)] font-semibold"
                      : "text-[var(--text-muted)] hover:text-[var(--on-surface)]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-[rgba(0,255,157,0.12)] border border-[rgba(0,255,157,0.25)] shadow-[0_0_12px_rgba(0,255,157,0.15)] -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {sec.label}
                </a>
              );
            })
          ) : (
            <Link
              href="/"
              className="font-label-caps px-3.5 py-1.5 rounded-full text-xs text-[var(--text-muted)] hover:text-[var(--on-surface)]"
            >
              ← BACK TO HOME
            </Link>
          )}

          <Link
            href="/blog"
            className="font-label-caps px-3.5 py-1.5 rounded-full text-xs text-[var(--secondary)] hover:bg-[rgba(99,102,241,0.12)] flex items-center gap-1.5 rounded-full transition-colors"
          >
            <PenLine size={13} />
            BLOG
          </Link>
        </nav>

        {/* Header Right Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Resume PDF Link */}
          <a
            href="/Shubhankar_Tiwari_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-code-sm text-xs px-3 py-1.5 rounded-full border border-[rgba(255,255,255,0.1)] text-[var(--text-muted)] hover:text-[var(--primary)] hover:border-[rgba(0,255,157,0.3)] bg-[rgba(255,255,255,0.02)] transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
            title="Open Official Resume PDF"
          >
            <FileText size={13} className="text-[var(--secondary)]" />
            <span>RESUME</span>
          </a>

          {/* Recruiter Toggle Switch */}
          <button
            type="button"
            onClick={() => setRecruiterMode(!recruiterMode)}
            className={`font-code-sm text-xs px-3 py-1.5 rounded-full border transition-all duration-200 flex items-center gap-2 cursor-pointer ${
              recruiterMode
                ? "bg-[rgba(0,255,157,0.12)] border-[var(--primary)] text-[var(--primary)] shadow-[0_0_12px_rgba(0,255,157,0.2)]"
                : "bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.1)] text-[var(--text-muted)] hover:border-[rgba(255,255,255,0.2)]"
            }`}
            title="Toggle between recruiter bullet view and narrative engineering view"
          >
            {recruiterMode ? <Check size={13} /> : <ShieldAlert size={13} />}
            <span>Recruiter Mode: {recruiterMode ? "ON" : "OFF"}</span>
          </button>

          {/* Contact Button */}
          <a
            href="mailto:st3907@columbia.edu"
            className="font-code-sm text-xs font-semibold px-4 py-1.5 rounded-full bg-[var(--primary)] text-[var(--on-primary)] hover:brightness-110 transition-all duration-200 tracking-wide uppercase"
          >
            GET_IN_TOUCH
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-[var(--on-surface)] hover:text-[var(--primary)] focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed top-[72px] left-0 right-0 bg-[rgba(6,8,14,0.98)] backdrop-blur-2xl border-b border-[rgba(255,255,255,0.1)] p-6 space-y-4 shadow-2xl"
          >
            <div className="flex flex-col space-y-3">
              {isHome ? (
                sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={() => setMobileOpen(false)}
                    className="font-label-caps text-sm py-2 px-3 rounded-lg text-[var(--on-surface)] hover:bg-[rgba(0,255,157,0.1)] hover:text-[var(--primary)]"
                  >
                    {sec.label}
                  </a>
                ))
              ) : (
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="font-label-caps text-sm py-2 px-3 rounded-lg text-[var(--on-surface)]"
                >
                  ← BACK TO HOME
                </Link>
              )}

              <Link
                href="/blog"
                onClick={() => setMobileOpen(false)}
                className="font-label-caps text-sm py-2 px-3 rounded-lg text-[var(--secondary)] flex items-center gap-2"
              >
                <PenLine size={16} />
                BLOG
              </Link>
            </div>

            <div className="pt-4 border-t border-[rgba(255,255,255,0.1)] flex flex-col space-y-3">
              <a
                href="/Shubhankar_Tiwari_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="font-code-sm text-xs py-2 px-4 rounded-lg border border-[rgba(255,255,255,0.15)] text-[var(--on-surface)] flex items-center justify-between hover:border-[var(--primary)]"
              >
                <span className="flex items-center gap-2"><FileText size={14} className="text-[var(--secondary)]" /> Official Resume</span>
                <span className="text-[var(--primary)] text-[10px]">PDF ↗</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setRecruiterMode(!recruiterMode);
                  setMobileOpen(false);
                }}
                className="font-code-sm text-xs py-2 px-4 rounded-lg border border-[var(--primary)] text-[var(--primary)] flex items-center justify-between"
              >
                <span>Recruiter Mode</span>
                <span>{recruiterMode ? "ON" : "OFF"}</span>
              </button>

              <a
                href="mailto:st3907@columbia.edu"
                onClick={() => setMobileOpen(false)}
                className="font-code-sm text-xs font-semibold py-2.5 px-4 text-center rounded-lg bg-[var(--primary)] text-[var(--on-primary)] uppercase"
              >
                GET_IN_TOUCH
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
