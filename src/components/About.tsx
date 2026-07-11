"use client";

import { motion } from "framer-motion";
import { useRecruiterMode } from "./Providers";

const stats = [
  { value: "4+", label: "Years Experience" },
  { value: "#2,441", label: "Kaggle Rank / 59.7K" },
  { value: "94.4%", label: "B.Tech GPA" },
  { value: "34", label: "Kaggle Notebooks" },
];

const reveal = {
  initial: { opacity: 0, y: 16 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

export default function About() {
  const recruiterMode = useRecruiterMode();

  return (
    <section data-testid="about-section" id="about" className="py-[80px] md:py-[160px] px-5 md:px-8">
      <div className="max-w-[1280px] mx-auto">
        <motion.div {...reveal}>
          <h2
            className="font-label-caps mb-8 sm:mb-10"
            style={{ color: "var(--primary)" }}
          >
            About
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          <motion.div {...reveal} className="md:col-span-2 space-y-5">
            {recruiterMode ? (
              <ul className="list-disc pl-5 space-y-3 font-body-md" style={{ color: "var(--text-muted)", fontSize: "14px" }}>
                <li>Software Engineer with 4+ years of experience in Java, Spring Boot, Microservices, and cloud-native deployments on OpenShift</li>
                <li>Delivered 17+ production releases across 13 CashPro services; resolved 50+ production issues in enterprise fintech environments</li>
                <li>Recognized as Subject Matter Expert (SME) for critical backend services — cross-team escalation point for production incidents and architectural decisions</li>
                <li>Kaggle Notebooks Expert (Rank #2,441 / 59,663) with certifications in ML, Deep Learning &amp; Computer Vision</li>
                <li>Built AI reliability and LLM evaluation systems independently — entropy-aware routing, behavioral regression detection, and model governance pipelines</li>
                <li>Incoming M.S. in Artificial Intelligence at Columbia University (Fall 2026) — focusing on ML Systems, AI Reliability, and LLM Evaluation</li>
              </ul>
            ) : (
              <>
                <p className="font-body-lg" style={{ color: "var(--text-muted)" }}>
                  Software Engineer with 4+ years of experience building enterprise backend systems that survive
                  production. My work at Bank of America spans API design, CI/CD pipelines, containerized
                  deployments, and production incident triage across 13 CashPro services.
                </p>
                <p className="font-body-lg" style={{ color: "var(--text-muted)" }}>
                  Outside of work, I build AI reliability and ML evaluation systems — ranked in the top 4.1%
                  on Kaggle as a Notebooks Expert, and independently built production-grade LLM evaluation
                  infrastructure: entropy-aware generation control, behavioral regression detection, and
                  model governance pipelines.
                </p>
                <p className="font-body-lg" style={{ color: "var(--text-muted)" }}>
                  Starting Fall 2026, I&apos;ll be pursuing my M.S. in Artificial Intelligence at Columbia
                  University — deepening my work in ML Systems, AI Reliability, and LLM Evaluation.
                </p>
              </>
            )}
          </motion.div>

          <motion.div {...reveal} className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                data-testid={`stat-${s.label.replace(/\s+/g, "-").toLowerCase()}`}
                className="p-4 glass-panel rounded-xl transition-all duration-300 hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.05)]"
                style={{
                  background: "var(--surface-elevated)",
                }}
              >
                <div className="font-metric-huge" style={{ color: "var(--primary)", fontSize: "clamp(24px, 3vw, 36px)" }}>
                  {s.value}
                </div>
                <div className="font-code-sm mt-1.5" style={{ color: "var(--text-muted)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
