"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const experiences = [
  {
    title: "Software Engineer I A",
    company: "Bank of America",
    period: "Apr 2022 - Present",
    type: "Backend / Platform Engineering",
    summary: "Production-grade backend systems powering corporate banking workflows.",
    narrative: [
      "Building and stabilizing large-scale Java backend systems powering corporate banking workflows, with emphasis on correctness, resilience, and production reliability.",
      "Driving production debugging, release validation, and cross-team coordination during live incidents and high-risk deployments.",
      "Designing and evolving services with long-term maintainability in high-availability environments.",
    ],
    bullets: [
      "Develop and maintain client-facing fintech microservices using Java, Spring Boot, REST APIs, SQL on OpenShift",
      "Own backend service delivery across design, implementation, CI/CD integration, deployment validation, and production stabilization",
      "Lead production incident triage - deployment failures, SSL misconfigurations, database connectivity, service dependency conflicts",
      "Improve release stability through proactive validation, pipeline debugging, load-test support, and root cause analysis",
      "Contribute to OpenShift onboarding and deployment readiness, strengthening infrastructure resilience",
    ],
    tags: ["Java", "Spring Boot", "REST APIs", "OpenShift", "CI/CD", "SQL"],
  },
  {
    title: "Product Development Trainee",
    company: "HighRadius Technologies",
    period: "Aug 2021 - Mar 2022",
    type: "Full-Stack Development",
    summary: "Full-stack modules for Order-to-Cash and Treasury systems.",
    narrative: [
      "Built full-stack modules for enterprise Order-to-Cash and Treasury systems using Java, JavaScript, and Python.",
      "Contributed to feature delivery in Agile sprints, focusing on backend logic, API integration, and production readiness.",
    ],
    bullets: [
      "Built full-stack modules for Order-to-Cash and Treasury Systems using Java, JavaScript, Python",
      "Contributed to feature delivery in Agile sprints, focusing on backend logic, API integration, and production readiness",
    ],
    tags: ["Java", "JavaScript", "Python", "Agile"],
  },
];

const reveal = {
  initial: { opacity: 0, y: 24 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-80px" } as const,
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
};

export default function Experience({ recruiterMode }: { recruiterMode: boolean }) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section data-testid="experience-section" id="experience" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div {...reveal}>
          <p className="font-mono text-xs tracking-widest uppercase mb-10" style={{ color: "var(--accent)" }}>
            Experience
          </p>
        </motion.div>

        <div className="space-y-4">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={reveal.initial}
              whileInView={reveal.whileInView}
              viewport={reveal.viewport}
              transition={{ ...reveal.transition, delay: i * 0.1 }}
              className="rounded-2xl border p-6 cursor-pointer transition-all duration-300 group"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
              onClick={() => setExpanded(expanded === i ? null : i)}
              data-testid={`experience-card-${i}`}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="text-lg font-semibold">{exp.title}</h3>
                    <span
                      className="font-mono text-xs px-2.5 py-0.5 rounded-full"
                      style={{ color: "var(--accent)", background: "var(--accent-dim)" }}
                    >
                      {exp.company}
                    </span>
                  </div>
                  <p className="text-sm mt-1 font-mono" style={{ color: "var(--muted-fg)" }}>
                    {exp.period} &middot; {exp.type}
                  </p>
                  <p className="text-sm mt-3" style={{ color: "var(--muted)" }}>{exp.summary}</p>
                </div>
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 flex-shrink-0 mt-1 ${expanded === i ? "rotate-180" : ""}`}
                  style={{ color: "var(--muted-fg)" }}
                />
              </div>

              {expanded === i && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 pt-6"
                  style={{ borderTop: "1px solid var(--border)" }}
                >
                  {recruiterMode ? (
                    <ul className="list-disc pl-5 space-y-2 text-sm" style={{ color: "var(--muted)" }}>
                      {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
                    </ul>
                  ) : (
                    <div className="space-y-3 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                      {exp.narrative.map((p, j) => <p key={j}>{p}</p>)}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 mt-5">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs px-2.5 py-1 rounded-md border"
                        style={{ color: "var(--muted)", borderColor: "var(--border)" }}
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
      </div>
    </section>
  );
}
