"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, ArrowUpRight } from "lucide-react";

const reveal = {
  initial: { opacity: 0, y: 16 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

const actions = [
  {
    href: "mailto:tiwarishubhankar@gmail.com",
    icon: <Mail size={18} />,
    label: "Email Me",
    primary: true,
  },
  {
    href: "https://www.linkedin.com/in/shubhankar-tiwari-514040165/",
    icon: <Linkedin size={18} />,
    label: "LinkedIn",
    primary: false,
  },
  {
    href: "/Shubhankar_Tiwari_Resume.pdf",
    icon: <ArrowUpRight size={18} />,
    label: "Resume",
    primary: false,
  },
];

export default function Contact() {
  return (
    <section data-testid="contact-section" id="contact" className="py-20 sm:py-24 lg:py-32 px-5 sm:px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <motion.div {...reveal}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight leading-tight mb-6">
            Get in touch
          </h2>

          <p className="mt-6 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "var(--muted)" }}>
            Open to roles in backend systems, platform engineering, and applied AI.
            If something here resonates — I&apos;d like to hear from you.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="mailto:tiwarishubhankar@gmail.com"
              data-testid="contact-email-me"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300"
              style={{
                background: "var(--accent)",
                color: "var(--bg)",
                boxShadow: "0 0 20px var(--accent-glow)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 30px var(--accent-glow)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 0 20px var(--accent-glow)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Get in touch
            </a>

            <a
              href="/Shubhankar_Tiwari_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="contact-resume"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg border transition-all duration-300"
              style={{
                borderColor: "var(--border)",
                color: "var(--fg)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--fg)";
              }}
            >
              Download Resume
            </a>
          </div>

          <p className="mt-10 font-mono text-sm" style={{ color: "var(--muted-fg)" }}>
            tiwarishubhankar@gmail.com
          </p>
        </motion.div>
      </div>
    </section>
  );
}
