"use client";

import { useState, useEffect, useCallback } from "react";
import { Sun, Moon, FileText } from "lucide-react";

const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "terminal", label: "Terminal" },
  { id: "contact", label: "Contact" },
];

interface Props {
  dark: boolean;
  setDark: (v: boolean) => void;
  recruiterMode: boolean;
  setRecruiterMode: (v: boolean) => void;
  mounted: boolean;
}

export default function Navigation({ dark, setDark, recruiterMode, setRecruiterMode, mounted }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 32);
      const sectionEls = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
      let current = "";
      for (const el of sectionEls) {
        if (el.getBoundingClientRect().top <= 120) current = el.id;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <header
      data-testid="navigation"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? `color-mix(in srgb, var(--bg) 80%, transparent)` : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#"
          data-testid="nav-logo"
          className="font-mono text-sm tracking-tight transition-colors duration-300"
          style={{ color: "var(--muted)" }}
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        >
          st<span style={{ color: "var(--accent)" }}>.</span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {sections.map((s) => (
            <button
              key={s.id}
              data-testid={`nav-link-${s.id}`}
              onClick={() => scrollTo(s.id)}
              className="px-2.5 py-1 text-xs font-mono rounded-md transition-all duration-300 cursor-pointer"
              style={{
                color: activeSection === s.id ? "var(--accent)" : "var(--muted-fg)",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            data-testid="recruiter-mode-toggle"
            onClick={() => setRecruiterMode(!recruiterMode)}
            className="px-3 py-1.5 text-xs font-mono rounded-full border transition-all duration-300 cursor-pointer"
            style={{
              background: recruiterMode ? "var(--accent)" : "transparent",
              color: recruiterMode ? "var(--bg)" : "var(--muted)",
              borderColor: recruiterMode ? "var(--accent)" : "var(--border)",
            }}
          >
            {recruiterMode ? "recruiter: on" : "recruiter: off"}
          </button>

          <a
            href="/Shubhankar_Tiwari_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="resume-link"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-full border transition-all duration-300"
            style={{ color: "var(--muted)", borderColor: "var(--border)" }}
          >
            <FileText size={12} />
            resume
          </a>

          {mounted && (
            <button
              data-testid="theme-toggle"
              onClick={() => setDark(!dark)}
              className="p-2 transition-colors duration-300 cursor-pointer rounded-lg"
              style={{ color: "var(--muted)" }}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
