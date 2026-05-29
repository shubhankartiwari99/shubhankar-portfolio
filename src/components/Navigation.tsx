"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FileText, PenLine, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const sections = [
  { id: "about", label: "JOURNEY" },
  { id: "experience", label: "STACK" },
  { id: "projects", label: "PROJECTS" },
  { id: "terminal", label: "TERMINAL" },
];

interface Props {
  recruiterMode: boolean;
  setRecruiterMode: (v: boolean) => void;
}

export default function Navigation({ recruiterMode, setRecruiterMode }: Props) {
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
          
          for (const el of sectionEls) {
            const rect = el.getBoundingClientRect();
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
        setActiveSection(id);
        setIsScrolling(true);
        
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        });
        
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
        background: scrolled ? "rgba(19, 19, 20, 0.80)" : "rgba(19, 19, 20, 0.80)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--surface-stroke)",
      }}
    >
      <nav className="max-w-[1280px] mx-auto px-5 md:px-8 py-3.5 sm:py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          data-testid="nav-logo"
          className="font-display-xl transition-colors duration-300 hover:text-[var(--primary)] cursor-pointer"
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(18px, 2vw, 24px)",
            fontWeight: 800,
            color: "var(--on-surface)",
            letterSpacing: "-0.02em",
          }}
          onClick={handleLogoClick}
        >
          SHUBHANKAR_TIWARI
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {sections.map((s) => (
            <button
              key={s.id}
              data-testid={`nav-link-${s.id}`}
              onClick={() => navigateToSection(s.id)}
              className="font-body-md transition-all duration-300 cursor-pointer"
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "13px",
                fontWeight: activeSection === s.id ? 700 : 400,
                letterSpacing: "0.15em",
                textTransform: "uppercase" as const,
                color: activeSection === s.id ? "var(--primary)" : "var(--on-surface-variant)",
                borderBottom: activeSection === s.id ? "2px solid var(--primary)" : "2px solid transparent",
                paddingBottom: "2px",
              }}
            >
              {s.label}
            </button>
          ))}
          <Link
            href="/blog"
            data-testid="nav-link-blog"
            className="transition-all duration-300 flex items-center gap-1"
            style={{
              fontFamily: "var(--font-jetbrains)",
              fontSize: "13px",
              fontWeight: pathname.startsWith("/blog") ? 700 : 400,
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
              color: pathname.startsWith("/blog") ? "var(--primary)" : "var(--on-surface-variant)",
              borderBottom: pathname.startsWith("/blog") ? "2px solid var(--primary)" : "2px solid transparent",
              paddingBottom: "2px",
            }}
          >
            <PenLine size={12} />
            BLOG
          </Link>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden p-2 transition-colors duration-200 cursor-pointer rounded"
            style={{ color: "var(--on-surface)" }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          {/* Recruiter toggle */}
          <button
            data-testid="recruiter-mode-toggle"
            onClick={() => setRecruiterMode(!recruiterMode)}
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded transition-colors duration-200 cursor-pointer"
            style={{
              fontFamily: "var(--font-jetbrains)",
              fontSize: "12px",
              border: "1px solid var(--surface-stroke)",
              background: "var(--surface-elevated)",
              color: "var(--text-muted)",
            }}
          >
            <span style={{ color: "var(--text-muted)" }}>recruiter:</span>
            <div
              className="w-8 h-4 rounded-full relative transition-colors duration-200"
              style={{
                background: recruiterMode ? "var(--primary-container)" : "var(--surface-stroke)",
              }}
            >
              <div
                className="w-4 h-4 rounded-full absolute top-0 transition-all duration-200"
                style={{
                  background: recruiterMode ? "var(--on-primary)" : "var(--text-muted)",
                  left: recruiterMode ? "16px" : "0px",
                }}
              />
            </div>
          </button>

          {/* CTA Button */}
          <a
            href="mailto:tiwarishubhankar@gmail.com"
            className="hidden md:inline-flex items-center gap-1 px-5 py-2 rounded transition-all duration-200 hover:opacity-90"
            style={{
              fontFamily: "var(--font-jetbrains)",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.05em",
              background: "var(--primary)",
              color: "var(--on-primary)",
            }}
          >
            GET_IN_TOUCH
          </a>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              className="md:hidden fixed inset-0 z-40"
              style={{ background: "rgba(0, 0, 0, 0.5)" }}
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />

            <motion.div
              id="mobile-nav-menu"
              className="md:hidden absolute top-full left-0 right-0 z-50 px-5 pb-6 pt-4 shadow-xl"
              style={{
                borderTop: "1px solid var(--surface-stroke)",
                background: "var(--bg)",
              }}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="max-w-[1280px] mx-auto flex flex-col gap-1">
                {sections.map((s) => (
                  <button
                    key={`mobile-${s.id}`}
                    type="button"
                    onClick={() => navigateToSection(s.id)}
                    className="w-full text-left px-3 py-2.5 rounded transition-colors duration-200"
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      fontSize: "14px",
                      letterSpacing: "0.15em",
                      color: activeSection === s.id && isHome ? "var(--primary)" : "var(--on-surface-variant)",
                    }}
                  >
                    {s.label}
                  </button>
                ))}

                <Link
                  href="/blog"
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 rounded transition-colors duration-200 flex items-center gap-1.5"
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    fontSize: "14px",
                    letterSpacing: "0.15em",
                    color: pathname.startsWith("/blog") ? "var(--primary)" : "var(--on-surface-variant)",
                  }}
                >
                  <PenLine size={12} />
                  BLOG
                </Link>

                <div className="flex items-center gap-3 mt-3 pt-3" style={{ borderTop: "1px solid var(--surface-stroke)" }}>
                  <button
                    type="button"
                    onClick={() => setRecruiterMode(!recruiterMode)}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded transition-colors duration-200"
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      fontSize: "12px",
                      border: "1px solid var(--surface-stroke)",
                      background: recruiterMode ? "var(--primary)" : "transparent",
                      color: recruiterMode ? "var(--on-primary)" : "var(--text-muted)",
                    }}
                  >
                    {recruiterMode ? "recruiter: on" : "recruiter: off"}
                  </button>

                  <a
                    href="/Shubhankar_Tiwari_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded transition-colors duration-200"
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      fontSize: "12px",
                      border: "1px solid var(--surface-stroke)",
                      color: "var(--text-muted)",
                    }}
                  >
                    <FileText size={12} />
                    RESUME
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
