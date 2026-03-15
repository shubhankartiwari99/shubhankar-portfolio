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
    <section data-testid="about-section" id="about" className="py-20 sm:py-24 lg:py-32 px-5 sm:px-6">
      <div className="max-w-5xl xl:max-w-6xl mx-auto">
        <motion.div {...reveal}>
          <h2 className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase mb-8 sm:mb-10" style={{ color: "var(--accent)" }}>
            About
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          <motion.div {...reveal} className="md:col-span-2 space-y-5">
            {recruiterMode ? (
              <ul className="list-disc pl-5 space-y-3 text-sm lg:text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                <li>4+ years of experience in Java, Spring Boot, Microservices, and cloud-native deployments on OpenShift</li>
                <li>Building scalable, high-availability backend systems and REST APIs for enterprise fintech platforms</li>
                <li>Hands-on CI/CD pipeline ownership, cross-functional regression testing, release validation, and production stability management</li>
                <li>Kaggle Notebooks Expert (Rank #2,441 / 59,663) with certifications in ML, Deep Learning & Computer Vision</li>
                <li>Active in applied AI &mdash; researching LLM behavioral reliability and production quality-gating</li>
              </ul>
            ) : (
              <>
                <p className="text-base sm:text-lg xl:text-xl leading-relaxed" style={{ color: "var(--muted)" }}>
                  I build backend systems that survive production. My work at Bank of America spans
                  API design, CI/CD pipelines, containerized deployments, and production incident triage
                  in enterprise fintech environments.
                </p>
                <p className="text-base sm:text-lg xl:text-xl leading-relaxed" style={{ color: "var(--muted)" }}>
                  Outside of work, I'm deep into machine learning and AI systems — ranked in the top 4.1%
 on Kaggle as a Notebooks Expert, and currently researching LLM behavioral reliability:
 building evaluation infrastructure that measures whether a model is trustworthy enough
 to deploy, not just whether it can get the right answer once.
                </p>
              </>
            )}
          </motion.div>

          <motion.div {...reveal} className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                data-testid={`stat-${s.label.replace(/\s+/g, "-").toLowerCase()}`}
                className="rounded-xl p-4 border transition-colors duration-300"
                style={{ background: "var(--surface)", borderColor: "var(--border)" }}
              >
                <div className="text-2xl lg:text-3xl font-bold" style={{ color: "var(--accent)" }}>{s.value}</div>
                <div className="text-[11px] mt-1.5 font-mono leading-tight" style={{ color: "var(--muted-fg)" }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
