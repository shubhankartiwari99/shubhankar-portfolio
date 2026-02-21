"use client";

import { motion } from "framer-motion";
import { Server, Database, GitBranch, Cpu, Award, GraduationCap } from "lucide-react";

const skillGroups = [
  {
    title: "Backend Systems",
    icon: <Server size={16} />,
    skills: ["Java", "Spring Boot", "Microservices", "REST APIs", "System Design"],
  },
  {
    title: "Data & Persistence",
    icon: <Database size={16} />,
    skills: ["Oracle SQL", "TOAD", "Data Modeling", "Query Optimization"],
  },
  {
    title: "Platform & DevOps",
    icon: <GitBranch size={16} />,
    skills: ["OpenShift", "Jenkins", "CI/CD", "Containerization", "Env Config"],
  },
  {
    title: "ML & AI",
    icon: <Cpu size={16} />,
    skills: ["Python", "Machine Learning", "Deep Learning", "Computer Vision", "NLP", "LLMs"],
  },
];

const credentials = [
  { icon: <Award size={16} />, title: "Kaggle Notebooks Expert", detail: "Rank 2,913 / 59,240 \u00B7 9 Bronze Medals" },
  { icon: <GraduationCap size={16} />, title: "B.Tech CSE \u2014 SRM IST", detail: "94.4% GPA \u00B7 2018\u20132022" },
  { icon: <Award size={16} />, title: "ML, Deep Learning, CV", detail: "Kaggle Certified \u00B7 2025" },
];

const principles = [
  "Reliability over hype",
  "Deterministic systems over black-box magic",
  "Production readiness over prototype excitement",
  "Root-cause analysis over surface patching",
];

const reveal = {
  initial: { opacity: 0, y: 24 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-80px" } as const,
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

export default function Skills() {
  return (
    <>
      {/* Skills */}
      <section data-testid="skills-section" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div {...reveal}>
            <p className="font-mono text-xs tracking-widest uppercase mb-10" style={{ color: "var(--accent)" }}>
              Skills & Tools
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skillGroups.map((group, i) => (
              <motion.div
                key={i}
                initial={reveal.initial}
                whileInView={reveal.whileInView}
                viewport={reveal.viewport}
                transition={{ ...reveal.transition, delay: i * 0.08 }}
                className="rounded-2xl border p-5 transition-all duration-300"
                style={{ borderColor: "var(--border)", background: "var(--surface)" }}
                data-testid={`skill-group-${i}`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span style={{ color: "var(--accent)" }}>{group.icon}</span>
                  <h3 className="font-semibold text-sm">{group.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-xs px-2.5 py-1 rounded-md border transition-colors duration-200"
                      style={{ color: "var(--muted)", borderColor: "var(--border)" }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section data-testid="credentials-section" className="pb-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div {...reveal}>
            <p className="font-mono text-xs tracking-widest uppercase mb-10" style={{ color: "var(--accent)" }}>
              Credentials
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {credentials.map((cred, i) => (
              <motion.div
                key={i}
                initial={reveal.initial}
                whileInView={reveal.whileInView}
                viewport={reveal.viewport}
                transition={{ ...reveal.transition, delay: i * 0.08 }}
                className="rounded-2xl border p-5 transition-all duration-300"
                style={{ borderColor: "var(--border)", background: "var(--surface)" }}
                data-testid={`credential-${i}`}
              >
                <span style={{ color: "var(--accent)" }}>{cred.icon}</span>
                <h3 className="font-semibold text-sm mt-3">{cred.title}</h3>
                <p className="text-xs font-mono mt-1" style={{ color: "var(--muted-fg)" }}>{cred.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section data-testid="principles-section" className="pb-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div {...reveal}>
            <p className="font-mono text-xs tracking-widest uppercase mb-10" style={{ color: "var(--accent)" }}>
              Engineering Principles
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {principles.map((p, i) => (
              <motion.div
                key={i}
                initial={reveal.initial}
                whileInView={reveal.whileInView}
                viewport={reveal.viewport}
                transition={{ ...reveal.transition, delay: i * 0.08 }}
                className="rounded-xl border p-5 font-mono text-sm transition-all duration-300"
                style={{ color: "var(--muted)", borderColor: "var(--border)" }}
                data-testid={`principle-${i}`}
              >
                <span style={{ color: "var(--accent)" }}>/{String(i + 1).padStart(2, "0")}</span>{" "}
                {p}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
