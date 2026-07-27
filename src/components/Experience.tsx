"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Shield, Trophy, Award, Calendar } from "lucide-react";
import { useRecruiterMode } from "./Providers";

const experiences = [
  {
    title: "Software Engineer I A · SME",
    company: "Bank of America",
    period: "Aug 2024 - Jul 2026",
    type: "Backend / Platform Engineering · SME",
    summary: "Subject Matter Expert for CashPro Search, serving 550,000+ corporate users across 40,000 companies with 18M+ searches since launch.",
    narrative: [
      "Served as Subject Matter Expert (SME) for CashPro Search — the primary search platform across Bank of America's flagship digital banking ecosystem, serving 550,000+ corporate users across 40,000 companies with 18 million+ searches since launch.",
      "Owned OpenShift deployments, CI/CD configuration, release validation, and production stabilization across 17+ release cycles. First point of contact for cross-team production escalations and architectural decisions.",
      "Contributed to modernization initiatives including JDK 17, Spring 6, containerization, and cloud enablement across 13 CashPro services, improving team standing in vulnerability, security, and modernization metrics via Checkmarx and SonarQube scans.",
      "Inventor on a Bank of America patent under filing (2026) for a governed multi-modal AI architecture enabling canonical truth maintenance, selective component regeneration, and audit-grade provenance in enterprise financial intelligence systems.",
    ],
    bullets: [
      "Served as Subject Matter Expert (SME) for CashPro Search, serving 550,000+ corporate users across 40,000 companies with 18M+ searches since launch",
      "Owned OpenShift deployments, CI/CD configuration, release validation, and production stabilization across 17+ release cycles",
      "Contributed to modernization across 13 CashPro services (JDK 17, Spring 6, containerization, cloud enablement) — improved vulnerability, security, and modernization metrics via Checkmarx and SonarQube scans",
      "Diagnosed and resolved 50+ production issues involving SSL certificates, database connectivity, Drools dependencies, deployment failures, and privacy-related defects",
      "Inventor on a Bank of America patent (2026) — governed multi-modal AI architecture for canonical truth maintenance and audit-grade provenance in financial intelligence systems",
    ],
    tags: ["Java", "Spring Boot", "REST APIs", "OpenShift", "CI/CD", "SQL", "Checkmarx", "SonarQube"],
    patent: true,
  },
  {
    title: "Software Engineer I B",
    company: "Bank of America",
    period: "Apr 2023 - Aug 2024",
    type: "Backend Engineering",
    summary: "Increasing ownership of backend services through feature development, production support, and service reliability improvements.",
    narrative: [
      "Engineered backend services for the CashPro Search platform within Bank of America's enterprise digital banking ecosystem.",
      "Took on increasing ownership of backend services through feature development, production support, and service reliability improvements.",
      "Diagnosed and resolved 20+ production incidents spanning application and infrastructure layers.",
    ],
    bullets: [
      "Engineered backend services for the CashPro Search platform within Bank of America's enterprise digital banking ecosystem",
      "Took on increasing ownership of backend services through feature development, production support, and service reliability improvements",
      "Diagnosed and resolved 20+ production incidents spanning application and infrastructure layers",
    ],
    tags: ["Java", "Spring Boot", "REST APIs", "Microservices", "SQL"],
  },
  {
    title: "Apprentice",
    company: "Bank of America",
    period: "Apr 2022 - Apr 2023",
    type: "Backend Engineering",
    summary: "Built foundational experience in enterprise software engineering on the CashPro Search platform.",
    narrative: [
      "Built foundational experience in enterprise software engineering by contributing to the CashPro Search platform using Java, Spring Boot, and Agile delivery practices.",
      "Assisted with feature development, defect resolution, and production support while collaborating with senior engineers.",
    ],
    bullets: [
      "Built foundational experience in enterprise software engineering contributing to the CashPro Search platform using Java, Spring Boot, and Agile delivery",
      "Assisted with feature development, defect resolution, and production support while collaborating with senior engineers",
    ],
    tags: ["Java", "Spring Boot", "JUnit", "Microservices", "Agile"],
  },
  {
    title: "Product Development Intern",
    company: "HighRadius Technologies",
    period: "Jun 2021 - Mar 2022",
    type: "Full-Stack Development",
    summary: "Full-stack modules for Order-to-Cash and Treasury systems at a fintech company.",
    narrative: [
      "Worked as a full-stack developer on one of the top products of HighRadius Technologies, a fin-tech company delivering Order-to-Cash and deduction management systems.",
      "Developed Java and Python services, delivering production code changes to a live environment across Agile sprints.",
    ],
    bullets: [
      "Built full-stack modules for Order-to-Cash and Treasury Systems using Java, JavaScript, Python",
      "Delivered production code changes to a live environment across Agile sprints",
    ],
    tags: ["Java", "JavaScript", "Python", "HTML", "Agile"],
  },
  {
    title: "Data Science & Analytics Intern",
    company: "The Sparks Foundation",
    period: "Oct 2020 - Nov 2020",
    type: "Data Science",
    summary: "Applied supervised and unsupervised ML algorithms across varied datasets.",
    narrative: [
      "Used supervised and unsupervised Machine Learning algorithms on varied types of datasets, building foundational experience in data science workflows.",
    ],
    bullets: [
      "Applied supervised and unsupervised ML algorithms across varied types of datasets",
    ],
    tags: ["Python", "Scikit-learn", "Pandas", "Machine Learning"],
  },
];

const reveal = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

export default function Experience() {
  const recruiterMode = useRecruiterMode();
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section data-testid="experience-section" id="experience" className="py-20 md:py-32 px-5 md:px-8 border-b border-[rgba(255,255,255,0.08)]">
      <div className="max-w-[1280px] mx-auto">
        <motion.div {...reveal} className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-px bg-[var(--primary)]" />
            <span className="font-label-caps text-[var(--primary)]">Career Track</span>
          </div>
          <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl text-[var(--on-surface)]">
            Professional Experience &amp; Patent
          </h2>
        </motion.div>

        {/* Experience Timeline Cards */}
        <div className="space-y-4">
          {experiences.map((exp, i) => (
            <motion.div
              key={`${exp.company}-${exp.period}`}
              initial={reveal.initial}
              whileInView={reveal.whileInView}
              viewport={reveal.viewport}
              transition={{ ...reveal.transition, delay: i * 0.08 }}
              className="p-5 sm:p-6 rounded-2xl glass-panel group hover:border-[rgba(0,255,157,0.3)] transition-all duration-300"
            >
              <button
                type="button"
                onClick={() => setExpanded(expanded === i ? null : i)}
                aria-expanded={expanded === i}
                className="w-full flex items-start justify-between gap-4 text-left cursor-pointer focus:outline-none"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
                    <h3 className="font-headline-md text-base sm:text-lg font-semibold text-[var(--on-surface)]">
                      {exp.title}
                    </h3>
                    <span className="font-label-caps px-2.5 py-0.5 rounded-full text-[11px] text-[var(--primary)] bg-[rgba(0,255,157,0.1)] border border-[rgba(0,255,157,0.2)]">
                      {exp.company}
                    </span>
                    {exp.patent && (
                      <span className="font-code-sm inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] text-amber-400 bg-[rgba(245,158,11,0.12)] border border-[rgba(245,158,11,0.3)] tracking-wider">
                        <Shield size={11} /> PATENT INVENTOR
                      </span>
                    )}
                  </div>

                  <p className="font-code-sm text-xs text-[var(--text-muted)] flex items-center gap-2">
                    <Calendar size={12} className="text-[var(--primary)]" /> {exp.period} &bull; {exp.type}
                  </p>

                  <p className="font-body-md text-xs sm:text-sm text-[var(--text-muted)] mt-2">
                    {exp.summary}
                  </p>
                </div>

                <div className="p-2 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[var(--text-muted)] group-hover:text-[var(--primary)] flex-shrink-0">
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-200 ${expanded === i ? "rotate-180" : ""}`}
                  />
                </div>
              </button>

              {expanded === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-5 pt-5 border-t border-[rgba(255,255,255,0.08)]"
                >
                  {recruiterMode ? (
                    <ul className="list-disc pl-5 space-y-2 font-body-md text-xs sm:text-sm text-[var(--on-surface-variant)]">
                      {exp.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  ) : (
                    <div className="space-y-3 font-body-md text-xs sm:text-sm text-[var(--on-surface-variant)] leading-relaxed">
                      {exp.narrative.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-code-sm text-[11px] px-2.5 py-1 rounded bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[var(--text-muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Global Recognition Awards Subsection */}
        <motion.div {...reveal} className="mt-14">
          <div className="flex items-center gap-2 mb-6">
            <Trophy size={18} className="text-amber-400" />
            <h3 className="font-headline-md text-lg text-[var(--on-surface)]">
              Bank of America — Global Recognition Awards
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { tier: "Gold Award", color: "#f59e0b", reason: "Backend delivery, release ownership, & cross-team lead" },
              { tier: "Silver Award", color: "#94a3b8", reason: "Cloud enablement & OpenShift service migration" },
              { tier: "Bronze Award", color: "#cd7f32", reason: "Production incident stabilization & triage" },
            ].map((award) => (
              <div
                key={award.tier}
                className="p-5 rounded-2xl glass-panel border-[rgba(255,255,255,0.08)] hover:border-[rgba(245,158,11,0.3)] transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Award size={16} style={{ color: award.color }} />
                  <span className="font-label-caps text-xs font-bold" style={{ color: award.color }}>
                    {award.tier}
                  </span>
                </div>
                <p className="font-code-sm text-xs text-[var(--text-muted)]">
                  Global Recognition &bull; BofA
                </p>
                <p className="font-body-md text-xs text-[var(--on-surface-variant)] mt-2">
                  {award.reason}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
