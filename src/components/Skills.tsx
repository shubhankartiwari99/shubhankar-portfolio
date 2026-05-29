"use client";

import { motion } from "framer-motion";
import { Cpu, Database, Server, Award, GraduationCap } from "lucide-react";

const skillGroups = [
  {
    title: "ML Systems",
    icon: <Cpu size={28} />,
    skills: ["Evaluation pipelines", "Control policies", "Drift detection", "Failure-mode metrics", "Shadow deployment"],
  },
  {
    title: "Modeling",
    icon: <Database size={28} />,
    skills: ["XGBoost", "Transformers", "Probabilistic metrics", "Statistical modeling", "Entropy analysis"],
    hasImage: true,
  },
  {
    title: "Infrastructure",
    icon: <Server size={28} />,
    skills: ["FastAPI", "CI gates", "Versioned registries", "Observability", "Model serving"],
  },
];

const credentials = [
  { icon: <Award size={16} />, title: "Kaggle Notebooks Expert", detail: "Rank 2,441 / 59,663 · 10 Bronze Medals" },
  { icon: <GraduationCap size={16} />, title: "B.Tech CSE — SRM IST", detail: "94.4% GPA · 2018–2022" },
  { icon: <Award size={16} />, title: "ML, Deep Learning, CV", detail: "Kaggle Certified · 2025" },
];

const reveal = {
  initial: { opacity: 0, y: 16 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

export default function Skills() {
  return (
    <>
      {/* Technical Focus */}
      <section data-testid="skills-section" id="skills" className="py-[80px] md:py-[160px] px-5 md:px-8">
        <div className="max-w-[1280px] mx-auto">
          <motion.div {...reveal}>
            <h2
              className="font-headline-lg mb-12"
              style={{
                color: "var(--on-surface)",
                fontSize: "clamp(28px, 4vw, 48px)",
                borderBottom: "1px solid var(--surface-stroke)",
                paddingBottom: "16px",
              }}
            >
              Technical Focus
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skillGroups.map((group) => (
              <motion.div
                key={group.title}
                initial={reveal.initial}
                whileInView={reveal.whileInView}
                viewport={reveal.viewport}
                transition={reveal.transition}
                className="p-6 flex flex-col relative overflow-hidden group"
                style={{
                  border: "1px solid var(--surface-stroke)",
                  background: "var(--surface-elevated)",
                }}
                data-testid={`skill-group-${group.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="mb-4" style={{ color: "var(--primary)" }}>
                  {group.icon}
                </div>
                <h3 className="font-headline-md mb-4" style={{ color: "var(--on-surface)", fontSize: "20px" }}>
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-label-caps px-3 py-1 rounded"
                      style={{
                        background: "#18181B",
                        color: "var(--text-muted)",
                      }}
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
      <section data-testid="credentials-section" className="pb-[80px] md:pb-[160px] px-5 md:px-8">
        <div className="max-w-[1280px] mx-auto">
          <motion.div {...reveal}>
            <h2 className="font-headline-md mb-8" style={{ color: "var(--on-surface)", fontSize: "clamp(24px, 3vw, 32px)" }}>
              Credentials
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {credentials.map((cred) => (
              <motion.div
                key={cred.title}
                initial={reveal.initial}
                whileInView={reveal.whileInView}
                viewport={reveal.viewport}
                transition={reveal.transition}
                className="p-5 lg:p-6"
                style={{
                  border: "1px solid var(--surface-stroke)",
                  background: "var(--surface-elevated)",
                }}
                data-testid={`credential-${cred.title.toLowerCase().replace(/[^\w]+/g, "-")}`}
              >
                <span style={{ color: "var(--primary)" }}>{cred.icon}</span>
                <h3 className="font-body-md mt-3" style={{ color: "var(--on-surface)", fontWeight: 600 }}>{cred.title}</h3>
                <p className="font-code-sm mt-1" style={{ color: "var(--text-muted)" }}>{cred.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
