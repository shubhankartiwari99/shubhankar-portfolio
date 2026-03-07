"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Trophy } from "lucide-react";

const reveal = {
  initial: { opacity: 0, y: 16 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

const milestones = [
  {
    icon: <GraduationCap size={20} />,
    title: "B.Tech CSE",
    subtitle: "SRM Institute of Science & Technology",
    description: "Graduated with 94.4% GPA in Computer Science. Built foundation in algorithms, data structures, and software engineering.",
    year: "2018-2022",
  },
  {
    icon: <Briefcase size={20} />,
    title: "Software Engineer",
    subtitle: "Bank of America",
    description: "Building and maintaining Java backend systems for corporate banking. I own the full lifecycle — design, CI/CD, deployments, and being on-call when something breaks. Four years of that teaches you things about software that writing code in isolation doesn't.",
    year: "2022-Present",
  },
  {
    icon: <Trophy size={20} />,
    title: "Kaggle Expert",
    subtitle: "Top 4.1% Globally",
    description: "Notebooks Expert ranked #2,441 / 59,663 — personal best #707. 34 notebooks and 10 bronze medals across ML, DL, NLP, Computer Vision, and regression.",
    year: "2022-Present",
  },
];

export default function Journey() {
  return (
    <section id="about" className="py-20 sm:py-24 lg:py-32 px-5 sm:px-6 relative">
      <div className="max-w-5xl xl:max-w-6xl mx-auto">
        <motion.div {...reveal}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">My Journey</h2>
          <p className="text-lg max-w-3xl leading-relaxed" style={{ color: "var(--muted)" }}>
            I went from curious undergrad to backend engineer at Bank of America. The path
            wasn't linear — four years of production systems, a Kaggle Expert rank, and now
            building evaluation infrastructure for LLMs. Each of those things informed the
            others more than I expected.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div {...reveal} className="lg:col-span-2 space-y-6">
            {milestones.map((milestone, i) => (
              <div
                key={i}
                className="rounded-2xl border p-6 transition-all duration-300 group hover:shadow-lg"
                style={{ borderColor: "var(--border)", background: "var(--surface)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.boxShadow = `0 0 30px ${getComputedStyle(document.documentElement).getPropertyValue('--accent-glow')}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="p-3 rounded-lg flex-shrink-0 transition-colors duration-300"
                    style={{ background: "var(--accent-dim)", color: "var(--accent)" }}
                  >
                    {milestone.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="text-lg font-semibold">{milestone.title}</h3>
                        <p className="text-sm font-medium mt-1" style={{ color: "var(--accent)" }}>
                          {milestone.subtitle}
                        </p>
                      </div>
                      <span className="font-mono text-xs px-3 py-1 rounded-full flex-shrink-0" style={{ background: "var(--accent-dim)", color: "var(--accent)" }}>
                        {milestone.year}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            {...reveal}
            className="rounded-2xl border p-6 h-full"
            style={{ borderColor: "var(--border)", background: "var(--surface)" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full" style={{ background: "var(--accent)" }} />
              <h3 className="font-semibold">Backend Excellence</h3>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              Currently at Bank of America, I focus on building microservices that power critical banking workflows.
              From API design to deployment validation, I own the full lifecycle.
            </p>
          </motion.div>

          <motion.div
            {...reveal}
            className="rounded-2xl border p-6 h-full"
            style={{ borderColor: "var(--border)", background: "var(--surface)" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full" style={{ background: "var(--accent)" }} />
              <h3 className="font-semibold">Competitive ML</h3>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              Outside of work, I sharpen my skills through Kaggle — ranked top 4.1% globally, personal best #707. 
              Currently researching LLM behavioral reliability and building evaluation infrastructure that 
              measures production-readiness, not just benchmark accuracy.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
