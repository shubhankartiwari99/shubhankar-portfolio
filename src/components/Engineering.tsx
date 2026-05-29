"use client";

import { motion } from "framer-motion";

const reveal = {
  initial: { opacity: 0, y: 16 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

const stats = [
  { value: "4+ Years", label: "Production Experience" },
  { value: "Kaggle", label: "Notebooks Expert" },
];

const principles = [
  "Reliability over hype",
  "Deterministic systems over black-box magic",
  "Production readiness over prototype excitement",
  "Root-cause analysis over surface patching",
];

export default function Engineering() {
  return (
    <section id="experience" className="py-[80px] md:py-[160px] px-5 md:px-8 relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

          {/* Left — text + stats */}
          <motion.div {...reveal}>
            <h2 className="font-headline-lg mb-6" style={{ color: "var(--on-surface)", fontSize: "clamp(28px, 4vw, 48px)" }}>
              Engineering at Scale
            </h2>
            <p className="font-body-md mb-6" style={{ color: "var(--text-muted)", fontSize: "14px" }}>
              At Bank of America I work on backend systems that process real financial
              transactions. My job isn&apos;t just writing code — it&apos;s release validation,
              production triage, and being accountable when a deployment goes wrong at
              an inconvenient hour.
            </p>
            <p className="font-body-md mb-10" style={{ color: "var(--text-muted)", fontSize: "14px" }}>
              I&apos;ve been doing this for four years. The thing that changes is your relationship
              with failure. You stop being surprised by it and start building systems that
              tell you clearly when and why they&apos;re failing.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="p-5 transition-colors duration-300"
                  style={{
                    border: "1px solid var(--surface-stroke)",
                    background: "var(--surface-elevated)",
                  }}
                >
                  <div className="font-metric-huge mb-1" style={{ color: "var(--primary)", fontSize: "28px" }}>
                    {stat.value}
                  </div>
                  <div className="font-code-sm" style={{ color: "var(--text-muted)" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Engineering Principles */}
          <motion.div {...reveal}>
            <h3
              className="font-label-caps mb-6"
              style={{ color: "var(--primary)" }}
            >
              Engineering Principles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
              {principles.map((p, i) => (
                <motion.div
                  key={p}
                  initial={reveal.initial}
                  whileInView={reveal.whileInView}
                  viewport={reveal.viewport}
                  transition={{ ...reveal.transition, delay: i * 0.06 }}
                  className="font-body-md p-4 lg:p-5"
                  style={{
                    color: "var(--text-muted)",
                    border: "1px solid var(--surface-stroke)",
                    background: "var(--surface-elevated)",
                    fontSize: "14px",
                  }}
                  data-testid={`principle-${i}`}
                >
                  <span style={{ color: "var(--primary)" }}>/{String(i + 1).padStart(2, "0")}</span>{" "}
                  {p}
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
