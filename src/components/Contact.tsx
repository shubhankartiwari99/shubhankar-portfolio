"use client";

import { motion } from "framer-motion";

const reveal = {
  initial: { opacity: 0, y: 16 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

export default function Contact() {
  return (
    <section data-testid="contact-section" id="contact" className="py-[80px] md:py-[160px] px-5 md:px-8 text-center">
      <div className="max-w-4xl mx-auto">
        <motion.div {...reveal}>
          <h2
            className="font-headline-lg mb-6"
            style={{
              color: "var(--on-surface)",
              fontSize: "clamp(32px, 5vw, 48px)",
            }}
          >
            Get in touch
          </h2>

          <p className="font-body-md mt-6 max-w-2xl mx-auto" style={{ color: "var(--text-muted)", fontSize: "16px" }}>
            Open to roles in backend systems, platform engineering, and applied AI.
            If something here resonates — I&apos;d like to hear from you.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="mailto:tiwarishubhankar@gmail.com"
              data-testid="contact-email-me"
              className="font-code-sm inline-flex items-center gap-2 px-6 py-3 rounded transition-all duration-200 hover:opacity-90"
              style={{
                background: "var(--primary)",
                color: "var(--on-primary)",
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Get in touch
            </a>

            <a
              href="/Shubhankar_Tiwari_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="contact-resume"
              className="font-code-sm inline-flex items-center gap-2 px-6 py-3 rounded transition-all duration-200 hover:border-[var(--primary)] hover:text-[var(--primary)]"
              style={{
                border: "1px solid var(--surface-stroke)",
                color: "var(--on-surface)",
              }}
            >
              Download Resume
            </a>
          </div>

          <p className="font-code-sm mt-10" style={{ color: "var(--text-muted)" }}>
            tiwarishubhankar@gmail.com
          </p>
        </motion.div>
      </div>
    </section>
  );
}
