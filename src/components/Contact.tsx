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
    <section data-testid="contact-section" id="contact" className="py-20 sm:py-24 lg:py-32 xl:py-36 px-5 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div {...reveal}>
          <h2 className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase mb-8 sm:mb-10" style={{ color: "var(--accent)" }}>
            Get In Touch
          </h2>
        </motion.div>

        <motion.div {...reveal} className="max-w-3xl">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            Let&apos;s build something
            <br />
            <span style={{ color: "var(--accent)" }}>reliable</span> together.
          </h3>

          <p className="mt-5 sm:mt-6 text-base sm:text-lg lg:text-xl leading-relaxed" style={{ color: "var(--muted)" }}>
            I&apos;m open to opportunities in backend systems, platform engineering, and applied AI.
            Whether it&apos;s a role, collaboration, or just a conversation about systems design &mdash;
            I&apos;d love to hear from you.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-wrap gap-2.5 sm:gap-3">
            {actions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                target={action.href.startsWith("mailto") || action.href.startsWith("/") ? undefined : "_blank"}
                rel="noopener noreferrer"
                data-testid={`contact-${action.label.toLowerCase().replace(/\s/g, "-")}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm lg:text-base font-mono rounded-full border transition-colors duration-200"
                style={{
                  background: action.primary ? "var(--accent)" : "transparent",
                  color: action.primary ? "var(--bg)" : "var(--muted)",
                  borderColor: action.primary ? "var(--accent)" : "var(--border)",
                }}
                onMouseEnter={(e) => {
                  if (!action.primary) {
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.color = "var(--accent)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!action.primary) {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.color = "var(--muted)";
                  }
                }}
              >
                {action.icon}
                {action.label}
              </a>
            ))}
          </div>

          <p className="mt-8 font-mono text-sm" style={{ color: "var(--muted-fg)" }}>
            tiwarishubhankar@gmail.com
          </p>
        </motion.div>
      </div>
    </section>
  );
}
