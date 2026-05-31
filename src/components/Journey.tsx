"use client";

import { motion } from "framer-motion";
import { useRecruiterMode } from "./Providers";

const reveal = {
  initial: { opacity: 0, y: 16 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

const milestones = [
  {
    title: "MS in Artificial Intelligence",
    subtitle: "Columbia University",
    description: "Pursuing graduate studies in AI with a focus on ML Systems, AI Reliability, and LLM Evaluation — building on four years of production engineering and applied AI research.",
    recruiterDescription: [
      "Incoming MS in Artificial Intelligence at Columbia University (Fall 2026)",
      "Focus areas: ML Systems, AI Reliability, LLM Evaluation, AI Infrastructure",
    ],
    year: "Fall 2026",
    active: false,
    upcoming: true,
  },
  {
    title: "Software Engineer",
    subtitle: "Bank of America",
    description: "Building and maintaining Java backend systems for corporate banking. I own the full lifecycle — design, CI/CD, deployments, and being on-call when something breaks. Four years of that teaches you things about software that writing code in isolation doesn't.",
    recruiterDescription: [
      "Develop and maintain client-facing fintech microservices using Java, Spring Boot, REST APIs, SQL on OpenShift",
      "Own backend service delivery across design, implementation, CI/CD integration, deployment validation, and production stabilization",
      "Lead production incident triage - deployment failures, SSL misconfigurations, database connectivity, service dependency conflicts",
      "Cross-functional manual regression testing during release cycles — validating end-to-end system behaviour before production promotion",
    ],
    year: "2022-Present",
    active: true,
  },
  {
    title: "Kaggle Expert",
    subtitle: "Top 4.1% Globally",
    description: "Notebooks Expert ranked #2,441 / 59,663 — personal best #707. 34 notebooks and 10 bronze medals across ML, DL, NLP, Computer Vision, and regression.",
    recruiterDescription: [
      "Kaggle Notebooks Expert ranked #2,441 / 59,663 globally",
      "34 notebooks and 10 bronze medals across ML, DL, NLP, Computer Vision, and regression",
    ],
    year: "2022-Present",
    active: true,
  },
  {
    title: "B.Tech CSE",
    subtitle: "SRM IST",
    description: "Graduated with 94.4% GPA in Computer Science. Built foundation in algorithms, data structures, and software engineering.",
    recruiterDescription: ["Graduated with 94.4% GPA in Computer Science. Built foundation in algorithms, data structures, and software engineering."],
    year: "2018-2022",
    active: false,
  },
];

export default function Journey() {
  const recruiterMode = useRecruiterMode();

  return (
    <section id="about" className="py-[80px] md:py-[160px] px-5 md:px-8" style={{ borderBottom: "1px solid var(--surface-stroke)" }}>
      <div className="max-w-[1280px] mx-auto">
        <motion.div {...reveal}>
          <h2 className="font-headline-lg mb-12" style={{ color: "var(--on-surface)", fontSize: "clamp(32px, 4vw, 48px)" }}>
            My Journey
          </h2>

          {recruiterMode && (
            <ul className="list-disc pl-5 space-y-3 font-body-md mb-12" style={{ color: "var(--text-muted)", fontSize: "14px" }}>
              <li>4+ years of experience in Java, Spring Boot, Microservices, and cloud-native deployments on OpenShift</li>
              <li>Building scalable, high-availability backend systems and REST APIs for enterprise fintech platforms</li>
              <li>Hands-on CI/CD pipeline ownership, release validation, and production stability management</li>
              <li>Kaggle Notebooks Expert (Rank #2,441 / 59,663) with certifications in ML, Deep Learning &amp; Computer Vision</li>
              <li>Active in applied AI — researching LLM behavioral reliability</li>
              <li>Incoming MS in Artificial Intelligence at Columbia University (Fall 2026)</li>
            </ul>
          )}
        </motion.div>

        {/* Timeline */}
        <div className="space-y-0">
          {milestones.map((milestone, i) => (
            <motion.div
              key={i}
              initial={reveal.initial}
              whileInView={reveal.whileInView}
              viewport={reveal.viewport}
              transition={{ ...reveal.transition, delay: i * 0.05 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start relative pl-6 md:pl-8 ml-2 md:ml-0"
              style={{
                borderLeft: "2px solid var(--surface-stroke)",
                paddingTop: "24px",
                paddingBottom: "24px",
              }}
            >
              {/* Timeline dot */}
              <div
                className="absolute w-4 h-4 rounded-full -left-[9px] top-[28px]"
                style={{
                  background: (milestone as { upcoming?: boolean }).upcoming ? "var(--primary)" : "var(--bg)",
                  border: (milestone as { upcoming?: boolean }).upcoming
                    ? "2px solid var(--primary)"
                    : milestone.active
                      ? "2px solid var(--primary)"
                      : "2px solid var(--surface-stroke)",
                  boxShadow: (milestone as { upcoming?: boolean }).upcoming ? "0 0 8px rgba(78, 222, 163, 0.4)" : "none",
                }}
              />

              {/* Left column: Date + Org */}
              <div className="md:col-span-3">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-label-caps" style={{ color: "var(--primary)" }}>
                    {milestone.year}
                  </h3>
                  {(milestone as { upcoming?: boolean }).upcoming && (
                    <span
                      className="font-code-sm px-2 py-0.5 rounded-full"
                      style={{
                        fontSize: "10px",
                        color: "var(--primary)",
                        background: "rgba(78, 222, 163, 0.1)",
                        border: "1px solid rgba(78, 222, 163, 0.2)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      UPCOMING
                    </span>
                  )}
                </div>
                <p className="font-body-md" style={{ color: "var(--on-surface-variant)", fontSize: "14px" }}>
                  {milestone.subtitle}
                </p>
              </div>

              {/* Right column: Title + Description */}
              <div className="md:col-span-9 space-y-3">
                <h4 className="font-headline-md" style={{ color: "var(--on-surface)", fontSize: "clamp(20px, 3vw, 32px)" }}>
                  {milestone.title}
                </h4>
                {recruiterMode ? (
                  <ul className="list-disc pl-5 space-y-2 font-body-md" style={{ color: "var(--on-surface-variant)", fontSize: "14px" }}>
                    {milestone.recruiterDescription.map((d) => <li key={d}>{d}</li>)}
                  </ul>
                ) : (
                  <p className="font-body-md max-w-3xl" style={{ color: "var(--on-surface-variant)", fontSize: "14px" }}>
                    {milestone.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
