"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Send, Github, Linkedin, GraduationCap, Sparkles, FileText } from "lucide-react";

const reveal = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section data-testid="contact-section" id="contact" className="py-20 md:py-32 px-5 md:px-8 text-center">
      <div className="max-w-3xl mx-auto">
        <motion.div {...reveal}>
          <span className="font-label-caps text-[var(--primary)] mb-2 block">
            GET IN TOUCH
          </span>
          <h2 className="font-headline-lg text-3xl sm:text-4xl md:text-5xl text-[var(--on-surface)] mb-6">
            Let&apos;s Build Reliable Systems
          </h2>

          <p className="font-body-md text-sm sm:text-base text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed mb-10">
            Open to opportunities in ML Systems, AI Infrastructure, Reliability Engineering, and Platform Architecture.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:st3907@columbia.edu"
              className="font-code-sm inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--primary)] text-[var(--on-primary)] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-[0_0_20px_rgba(0,255,157,0.25)] transition-all duration-200"
            >
              <Send size={15} /> Send Email
            </a>

            <button
              type="button"
              onClick={() => copyEmail("st3907@columbia.edu")}
              className="font-code-sm inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass-panel text-[var(--on-surface)] text-xs uppercase tracking-wider hover:border-[var(--primary)] transition-all duration-200 cursor-pointer"
            >
              {copied ? <Check size={15} className="text-[var(--primary)]" /> : <Copy size={15} />}
              {copied ? "Copied Email!" : "Copy Address"}
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
            {[
              { href: "/Shubhankar_Tiwari_Resume.pdf", label: "Resume (PDF)", icon: <FileText size={14} className="text-[var(--secondary)]" /> },
              { href: "https://github.com/shubhankartiwari99", label: "GitHub", icon: <Github size={14} /> },
              { href: "https://www.linkedin.com/in/shubhankartiw1/", label: "LinkedIn", icon: <Linkedin size={14} /> },
              { href: "https://www.kaggle.com/shubhankartiwari", label: "Kaggle", icon: <Sparkles size={14} /> },
              { href: "mailto:st3907@columbia.edu", label: "Columbia", icon: <GraduationCap size={14} /> },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-3 py-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--text-muted)] transition-all hover:border-[var(--primary)] hover:text-[var(--primary)]"
              >
                {link.icon}
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-xs font-mono text-[var(--text-muted)]">
            <a href="mailto:st3907@columbia.edu" className="hover:text-[var(--primary)] transition-colors">
              st3907@columbia.edu
            </a>
            <span>&bull;</span>
            <a href="mailto:tiwarishubhankar@gmail.com" className="hover:text-[var(--primary)] transition-colors">
              tiwarishubhankar@gmail.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
