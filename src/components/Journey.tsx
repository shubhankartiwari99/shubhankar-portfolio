"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useRecruiterMode } from "./Providers";

const milestones = [
  {
    title: "MS in Artificial Intelligence",
    subtitle: "Columbia University · New York, NY · Concentration: Finance & Operations",
    description: "Graduate student in Artificial Intelligence, focusing on ML systems and AI reliability. Building on four years of enterprise software engineering and hands-on work with LLM evaluation frameworks.",
    recruiterDescription: [
      "M.S. in Artificial Intelligence at Columbia University (Expected Dec 2027)",
      "Concentration: Finance and Operations",
      "Interests include ML Systems, AI Reliability, LLM Evaluation, and next-generation intelligent systems",
    ],
    year: "Aug 2026 – Dec 2027",
    active: true,
    columbia: true,
  },
  {
    title: "Software Engineer I A · SME",
    subtitle: "Bank of America",
    description: "Promoted to Subject Matter Expert for CashPro Search, serving 550,000+ corporate users. Owned deployments, CI/CD, and release validation across 17+ cycles. Named inventor on a Bank of America patent (2026) for governed multi-modal AI architecture.",
    recruiterDescription: [
      "Subject Matter Expert (SME) for CashPro Search (550,000+ corporate users, 40,000 companies, 18M+ searches)",
      "Owned OpenShift deployments, CI/CD, release validation, and production stabilization across 17+ release cycles",
      "Inventor on Bank of America patent application (2026) for multi-modal AI architecture in financial intelligence systems",
      "Contributed to modernization (JDK 17, Spring 6, cloud enablement) across 13 CashPro services",
    ],
    year: "2024 - 2026",
    active: false,
  },
  {
    title: "Software Engineer I B",
    subtitle: "Bank of America",
    description: "Increasing ownership of backend services through feature development, production support, and service reliability. Diagnosed and resolved 20+ production incidents spanning application and infrastructure layers.",
    recruiterDescription: [
      "Increasing ownership of backend services across feature development, production support, and service reliability",
      "Diagnosed and resolved 20+ production incidents spanning application and infrastructure layers",
    ],
    year: "2023 - 2024",
    active: false,
  },
  {
    title: "Apprentice",
    subtitle: "Bank of America",
    description: "Built foundational experience in enterprise software engineering by contributing to the CashPro Search platform using Java, Spring Boot, and Agile delivery practices.",
    recruiterDescription: [
      "Built foundational experience in enterprise software engineering on CashPro Search platform",
      "Java, Spring Boot, Agile delivery practices, defect resolution, and production support",
    ],
    year: "2022 - 2023",
    active: false,
  },
  {
    title: "Kaggle Notebooks Expert",
    subtitle: "Top 4.1% Globally",
    description: "Notebooks Expert ranked #2,441 / 59,663 (personal best #707). 34 notebooks and 10 bronze medals across ML, DL, NLP, Computer Vision, and regression.",
    recruiterDescription: [
      "Kaggle Notebooks Expert ranked #2,441 / 59,663 globally",
      "34 notebooks and 10 bronze medals across ML, DL, NLP, Computer Vision, and regression",
    ],
    year: "2022 - Present",
    active: false,
  },
  {
    title: "B.Tech CSE",
    subtitle: "SRM IST · 94.4% GPA",
    description: "Graduated with 94.4% GPA in Computer Science. Built foundation in algorithms, data structures, and software engineering. Active in college tech/coding clubs and tech fests.",
    recruiterDescription: ["Graduated with 94.4% GPA in Computer Science. First Class with Distinction. Active in college tech/coding clubs and tech fests."],
    year: "2018 - 2022",
    active: false,
  },
];

const reveal = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

export default function Journey() {
  const recruiterMode = useRecruiterMode();

  const handleCardMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section data-testid="journey-section" id="journey" className="py-20 md:py-32 px-5 md:px-8 border-b border-[rgba(255,255,255,0.08)] relative">
      <div className="max-w-[1280px] mx-auto">
        <motion.div {...reveal} className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-px bg-[var(--primary)]" />
            <span className="font-label-caps text-[var(--primary)]">Chronology</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl text-[var(--on-surface)]">
                Engineering &amp; Academic Timeline
              </h2>
              <p className="font-body-md text-[var(--text-muted)] max-w-2xl mt-2 text-sm sm:text-base">
                From undergraduate computer science foundations to enterprise banking systems, Kaggle global rank, and AI graduate research at Columbia University.
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] self-start md:self-auto">
              <span className="w-2 h-2 rounded-full bg-[var(--secondary)] animate-pulse" />
              <span className="font-code-sm text-xs text-[var(--text-muted)]">2018 &rarr; 2027 Evolution</span>
            </div>
          </div>
        </motion.div>

        {/* Timeline Node List */}
        <div className="relative ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
          {/* Radiant vertical gradient rail */}
          <div className="absolute left-0 top-3 bottom-3 w-0.5 bg-gradient-to-b from-[var(--secondary)] via-[var(--primary)] to-[rgba(255,255,255,0.1)] opacity-70" />
          <div className="absolute left-0 top-3 bottom-3 w-1 bg-gradient-to-b from-[var(--secondary)] via-[var(--primary)] to-transparent opacity-20 blur-sm pointer-events-none" />

          {milestones.map((m, idx) => (
            <motion.div
              key={m.title}
              initial={reveal.initial}
              whileInView={reveal.whileInView}
              viewport={reveal.viewport}
              transition={{ ...reveal.transition, delay: idx * 0.07 }}
              className="relative group"
            >
              {/* Timeline Node Circle Dot */}
              <div
                className={`absolute -left-[31px] sm:-left-[47px] top-2 w-4 h-4 rounded-full border-2 transition-all duration-300 z-10 ${
                  m.columbia
                    ? "bg-[var(--secondary)] border-white shadow-[0_0_18px_rgba(99,102,241,0.8)] scale-125"
                    : m.active
                    ? "bg-[var(--primary)] border-[var(--primary)] shadow-[0_0_12px_rgba(0,255,157,0.6)]"
                    : "bg-[#090c15] border-[rgba(255,255,255,0.3)] group-hover:border-[var(--primary)] group-hover:scale-110"
                }`}
              >
                {m.columbia && (
                  <span className="absolute -inset-1 rounded-full bg-[var(--secondary)] animate-ping opacity-30 pointer-events-none" />
                )}
              </div>

              {/* Card Container */}
              <div
                onMouseMove={handleCardMouseMove}
                className={`p-6 sm:p-7 rounded-2xl glass-panel spotlight-card transition-all duration-300 ${
                  m.columbia
                    ? "border-[rgba(99,102,241,0.4)] bg-[rgba(99,102,241,0.08)] shadow-[0_0_35px_rgba(99,102,241,0.15)] hover:border-[rgba(99,102,241,0.6)]"
                    : "border-[rgba(255,255,255,0.08)] hover:border-[rgba(0,255,157,0.3)] bg-[rgba(10,13,22,0.6)]"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    {m.columbia && <Sparkles size={16} className="text-[var(--secondary)]" />}
                    <h3 className="font-headline-md text-base sm:text-lg font-semibold text-[var(--on-surface)] group-hover:text-[var(--primary)] transition-colors">
                      {m.title}
                    </h3>
                  </div>

                  <span className={`font-code-sm text-xs px-3 py-1 rounded-full border tracking-wide ${
                    m.columbia
                      ? "bg-[rgba(99,102,241,0.15)] border-[rgba(99,102,241,0.4)] text-[var(--secondary)] font-semibold"
                      : "bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.1)] text-[var(--primary)]"
                  }`}>
                    {m.year}
                  </span>
                </div>

                <p className="font-code-sm text-xs text-[var(--text-muted)] mb-3">
                  {m.subtitle}
                </p>

                {recruiterMode ? (
                  <ul className="list-disc pl-5 space-y-1.5 font-body-md text-xs sm:text-sm text-[var(--on-surface-variant)]">
                    {m.recruiterDescription.map((item) => (
                      <li key={item} className="leading-relaxed">{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="font-body-md text-xs sm:text-sm text-[var(--on-surface-variant)] leading-relaxed">
                    {m.description}
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
