"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, ArrowUpRight } from "lucide-react";

const reveal = {
  initial: { opacity: 0, y: 24 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-80px" } as const,
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
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
    <section data-testid="contact-section" id="contact" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div {...reveal}>
          <p className="font-mono text-xs tracking-widest uppercase mb-10" style={{ color: "var(--accent)" }}>
            Get In Touch
          </p>
        </motion.div>

        <motion.div {...reveal} className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
            Let&apos;s build something
            <br />
            <span style={{ color: "var(--accent)" }}>reliable</span> together.
          </h2>

          <p className="mt-6 text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
            I&apos;m open to opportunities in backend systems, platform engineering, and applied AI.
            Whether it&apos;s a role, collaboration, or just a conversation about systems design &mdash;
            I&apos;d love to hear from you.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {actions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                target={action.href.startsWith("mailto") || action.href.startsWith("/") ? undefined : "_blank"}
                rel="noopener noreferrer"
                data-testid={`contact-${action.label.toLowerCase().replace(/\s/g, "-")}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-mono rounded-full border transition-all duration-300"
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
