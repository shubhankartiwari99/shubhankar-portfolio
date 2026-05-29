"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRecruiterMode } from "./Providers";

const experiences = [
  {
    title: "Software Engineer I A",
    company: "Bank of America",
    period: "Apr 2022 - Present",
    type: "Backend / Platform Engineering",
    summary: "Production-grade backend systems powering corporate banking workflows.",
    narrative: [
      "Building and stabilizing large-scale Java backend systems powering corporate banking workflows, with emphasis on correctness, resilience, and production reliability.",
      "Driving production debugging, cross-functional regression testing, and release validation — coordinating across teams during live incidents and high-risk deployments. Knowing how the system breaks from the inside changes how you test it from the outside.",
      "Designing and evolving services with long-term maintainability in high-availability environments.",
    ],
    bullets: [
      "Develop and maintain client-facing fintech microservices using Java, Spring Boot, REST APIs, SQL on OpenShift",
      "Own backend service delivery across design, implementation, CI/CD integration, deployment validation, and production stabilization",
      "Lead production incident triage - deployment failures, SSL misconfigurations, database connectivity, service dependency conflicts",
      "Improve release stability through proactive validation, pipeline debugging, load-test support, and root cause analysis",
      "Contribute to OpenShift onboarding and deployment readiness, strengthening infrastructure resilience",
      "Perform cross-functional manual regression testing during release cycles — validating end-to-end system behaviour across service boundaries before production promotion",
    ],
    tags: ["Java", "Spring Boot", "REST APIs", "OpenShift", "CI/CD", "SQL", "Regression Testing"],
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
  initial: { opacity: 0, y: 16 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

export default function Experience() {
  const recruiterMode = useRecruiterMode();
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section data-testid="experience-section" id="experience" className="py-[80px] md:py-[160px] px-5 md:px-8">
      <div className="max-w-[1280px] mx-auto">
        <motion.div {...reveal}>
          <h2
            className="font-label-caps mb-8 sm:mb-10"
            style={{ color: "var(--primary)" }}
          >
            Experience
          </h2>
        </motion.div>

        <div className="space-y-4">
          {experiences.map((exp, i) => (
            <motion.div
              key={`${exp.company}-${exp.period}`}
              initial={reveal.initial}
              whileInView={reveal.whileInView}
              viewport={reveal.viewport}
              transition={reveal.transition}
              className="p-4 sm:p-6 transition-colors duration-200 group hover:border-[var(--primary)]"
              style={{
                border: "1px solid var(--surface-stroke)",
                background: "var(--surface-elevated)",
              }}
              data-testid={`experience-card-${i}`}
            >
              <button
                type="button"
                onClick={() => setExpanded(expanded === i ? null : i)}
                aria-expanded={expanded === i}
                aria-controls={`experience-details-${i}`}
                className="w-full flex items-start justify-between gap-4 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="font-headline-md" style={{ color: "var(--on-surface)", fontSize: "18px" }}>{exp.title}</h3>
                    <span
                      className="font-label-caps px-2.5 py-0.5 rounded-full"
                      style={{ color: "var(--primary)", background: "rgba(78, 222, 163, 0.1)" }}
                    >
                      {exp.company}
                    </span>
                  </div>
                  <p className="font-code-sm mt-1" style={{ color: "var(--text-muted)" }}>
                    {exp.period} &middot; {exp.type}
                  </p>
                  <p className="font-body-md mt-3" style={{ color: "var(--text-muted)", fontSize: "14px" }}>{exp.summary}</p>
                </div>
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-200 flex-shrink-0 mt-1 ${expanded === i ? "rotate-180" : ""}`}
                  style={{ color: "var(--text-muted)" }}
                />
              </button>

              {expanded === i && (
                <motion.div
                  id={`experience-details-${i}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
                  className="mt-6 pt-6"
                  style={{ borderTop: "1px solid var(--surface-stroke)" }}
                >
                  {recruiterMode ? (
                    <ul className="list-disc pl-5 space-y-2 font-body-md" style={{ color: "var(--text-muted)", fontSize: "14px" }}>
                      {exp.bullets.map((b) => <li key={b}>{b}</li>)}
                    </ul>
                  ) : (
                    <div className="space-y-3 font-body-md" style={{ color: "var(--text-muted)", fontSize: "14px" }}>
                      {exp.narrative.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 mt-5">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-code-sm px-2.5 py-1"
                        style={{
                          color: "var(--text-muted)",
                          border: "1px solid var(--surface-stroke)",
                          fontSize: "12px",
                        }}
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
