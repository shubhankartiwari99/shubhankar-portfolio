"use client";

import { useState, useEffect } from "react";
import { Github, Linkedin, Mail, ExternalLink, Globe, FileText } from "lucide-react";

const links = [
  { href: "/Shubhankar_Tiwari_Resume.pdf", label: "Resume (PDF)", icon: FileText },
  { href: "https://github.com/shubhankartiwari99", label: "GitHub", icon: Github },
  { href: "https://www.linkedin.com/in/shubhankartiw1", label: "LinkedIn", icon: Linkedin },
  { href: "https://www.kaggle.com/shubhankartiwari", label: "Kaggle", icon: ExternalLink },
  { href: "mailto:st3907@columbia.edu", label: "Columbia Email", icon: Mail },
];

export default function Footer() {
  const [nycTime, setNycTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat("en-US", {
          timeZone: "America/New_York",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });
        setNycTime(formatter.format(now));
      } catch {
        setNycTime("");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      data-testid="footer"
      className="w-full py-10 px-5 md:px-8 mt-16 sm:mt-24 border-t border-[rgba(255,255,255,0.08)] bg-[rgba(6,8,14,0.85)] backdrop-blur-xl"
    >
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left: Identity & Live Location/Clock */}
        <div className="space-y-2 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--primary)] status-pulse" />
            <span className="font-code-sm text-xs text-[var(--on-surface)] font-bold tracking-wider">
              SHUBHANKAR TIWARI
            </span>
            <span className="text-[var(--text-muted)]">&bull;</span>
            <span className="font-code-sm text-xs text-[var(--text-muted)] flex items-center gap-1.5">
              <Globe size={13} className="text-[var(--primary)]" /> New York, NY
              {nycTime && <span className="text-[var(--on-surface-variant)]">({nycTime} EST)</span>}
            </span>
          </div>

          <p className="font-label-caps text-xs text-[var(--text-muted)] tracking-wider">
            &copy; {new Date().getFullYear()} SHUBHANKAR TIWARI. CRAFTED FOR AI RELIABILITY &amp; HIGH-SCALE SYSTEMS.
          </p>
        </div>

        {/* Right: Social & Channel Links */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[var(--text-muted)] hover:text-[var(--primary)] hover:border-[rgba(0,255,157,0.3)] font-code-sm text-xs transition-all duration-200"
                title={link.label}
              >
                <Icon size={14} />
                <span>{link.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
