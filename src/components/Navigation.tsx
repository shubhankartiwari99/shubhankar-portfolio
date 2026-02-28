"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sun, Moon, FileText, PenLine, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

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
}

export default function Navigation({ dark, setDark, recruiterMode, setRecruiterMode }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolling, setIsScrolling] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  useEffect(() => {
    let ticking = false;
    
    const fn = () => {
      if (ticking || isScrolling) return;
      ticking = true;
      
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 32);
        
        if (isHome && !isScrolling) {
          const sectionEls = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
          let current = "";
          
          // Find the section that's currently in view
          // A section is considered active when its top is within the upper portion of the viewport
          for (const el of sectionEls) {
            const rect = el.getBoundingClientRect();
            // Section is active if its top is at or above 200px from viewport top
            if (rect.top <= 200) {
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
    return () => {
      window.removeEventListener("scroll", fn);
    };
  }, [isHome, isScrolling]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = mobileOpen ? "hidden" : originalOverflow;

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const navigateToSection = useCallback((id: string) => {
    if (isHome) {
      const element = document.getElementById(id);
      if (element) {
        // Immediately set this section as active
        setActiveSection(id);
        setIsScrolling(true);
        
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        });
        
        // Re-enable scroll detection after animation completes
        setTimeout(() => {
          setIsScrolling(false);
        }, 800);
      }
    } else {
      router.push(`/#${id}`);
    }
    setMobileOpen(false);
  }, [isHome, router]);

  const handleLogoClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    setMobileOpen(false);
    if (!isHome) return;
    e.preventDefault();
    setActiveSection("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [isHome]);

  return (
    <header
      data-testid="navigation"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? `color-mix(in srgb, var(--bg) 85%, transparent)` : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <nav className="max-w-6xl mx-auto px-5 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between">
        <Link
          href="/"
          data-testid="nav-logo"
          className="font-mono text-sm tracking-tight transition-colors duration-200"
          style={{ color: "var(--muted)" }}
          onClick={handleLogoClick}
        >
          st<span style={{ color: "var(--accent)" }}>.</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {sections.map((s) => (
            <button
              key={s.id}
              data-testid={`nav-link-${s.id}`}
              onClick={() => navigateToSection(s.id)}
              className="px-2.5 lg:px-3 py-1 text-xs lg:text-sm font-mono rounded-md transition-colors duration-200 cursor-pointer"
              style={{
                color: activeSection === s.id ? "var(--accent)" : "var(--muted-fg)",
              }}
            >
              {s.label}
            </button>
          ))}
          <Link
            href="/blog"
            data-testid="nav-link-blog"
            className="px-2.5 lg:px-3 py-1 text-xs lg:text-sm font-mono rounded-md transition-colors duration-200 flex items-center gap-1"
            style={{
              color: pathname.startsWith("/blog") ? "var(--accent)" : "var(--muted-fg)",
            }}
          >
            <PenLine size={12} />
            Blog
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden p-2 transition-colors duration-200 cursor-pointer rounded-lg"
            style={{ color: "var(--muted)" }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>

          <button
            data-testid="recruiter-mode-toggle"
            onClick={() => setRecruiterMode(!recruiterMode)}
            className="hidden sm:inline-flex px-3 lg:px-3.5 py-1.5 text-xs lg:text-sm font-mono rounded-full border transition-colors duration-200 cursor-pointer"
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
            className="hidden sm:inline-flex items-center gap-1.5 px-3 lg:px-3.5 py-1.5 text-xs lg:text-sm font-mono rounded-full border transition-colors duration-200"
            style={{ color: "var(--muted)", borderColor: "var(--border)" }}
          >
            <FileText size={12} />
            resume
          </a>

          <button
            data-testid="theme-toggle"
            onClick={() => setDark(!dark)}
            className="p-2 transition-colors duration-200 cursor-pointer rounded-lg"
            style={{ color: "var(--muted)" }}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              className="md:hidden fixed inset-0 z-40"
              style={{ background: "rgba(0, 0, 0, 0.35)" }}
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />

            <motion.div
              id="mobile-nav-menu"
              className="md:hidden absolute top-full left-0 right-0 z-50 border-t px-5 sm:px-6 pb-4 pt-3 shadow-xl"
              style={{
                borderColor: "var(--border)",
                background: "var(--bg)",
              }}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="max-w-6xl mx-auto flex flex-col gap-1">
                {sections.map((s) => (
                  <button
                    key={`mobile-${s.id}`}
                    type="button"
                    onClick={() => navigateToSection(s.id)}
                    className="w-full text-left px-2.5 py-2 text-sm font-mono rounded-md transition-colors duration-200"
                    style={{
                      color: activeSection === s.id && isHome ? "var(--accent)" : "var(--muted-fg)",
                    }}
                  >
                    {s.label}
                  </button>
                ))}

                <Link
                  href="/blog"
                  onClick={() => setMobileOpen(false)}
                  className="px-2.5 py-2 text-sm font-mono rounded-md transition-colors duration-200 flex items-center gap-1.5"
                  style={{
                    color: pathname.startsWith("/blog") ? "var(--accent)" : "var(--muted-fg)",
                  }}
                >
                  <PenLine size={12} />
                  Blog
                </Link>

                <button
                  type="button"
                  onClick={() => setRecruiterMode(!recruiterMode)}
                  className="mt-2 inline-flex items-center justify-center px-3 py-2 text-xs font-mono rounded-full border transition-colors duration-200"
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
                  className="mt-2 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-mono rounded-full border transition-colors duration-200"
                  style={{ color: "var(--muted)", borderColor: "var(--border)" }}
                >
                  <FileText size={12} />
                  resume
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
