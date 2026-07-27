"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Database, Server, Award, GraduationCap, Code2, Sparkles } from "lucide-react";

const skillGroups = [
  {
    title: "AI & ML Systems",
    icon: <Cpu size={22} className="text-[var(--primary)]" />,
    skills: ["Evaluation pipelines", "Control policies", "Drift detection", "Failure-mode metrics", "Shadow deployment"],
  },
  {
    title: "Modeling & Deep Learning",
    icon: <Database size={22} className="text-[var(--secondary)]" />,
    skills: ["Transformers", "XGBoost", "Probabilistic metrics", "Statistical modeling", "Entropy analysis"],
  },
  {
    title: "Backend & Infrastructure",
    icon: <Server size={22} className="text-amber-400" />,
    skills: ["Spring Boot", "FastAPI", "OpenShift", "CI/CD Gates", "Model Serving"],
  },
];

const technologies = [
  { category: "AI & Machine Learning", items: ["Python", "PyTorch", "Transformers", "Scikit-learn", "XGBoost", "Keras", "OpenCV", "TensorFlow"] },
  { category: "ML Systems & Reliability", items: ["LLM Evaluation", "AI Reliability", "Model Governance", "Behavioral Testing", "LLM Guardrails", "Prompt Engineering", "PSI & KL Drift"] },
  { category: "Enterprise Backend", items: ["Java", "Spring Boot", "REST APIs", "SQL", "OpenShift", "Jenkins", "Ansible", "Linux", "JUnit"] },
];

const credentials = [
  { icon: <Award size={18} className="text-[var(--primary)]" />, title: "Kaggle Notebooks Expert", detail: "Rank 2,441 / 59,663 · Personal Best #707 · 10 Bronze Medals" },
  { icon: <GraduationCap size={18} className="text-[var(--secondary)]" />, title: "B.Tech CSE — SRM IST", detail: "94.4% GPA · First Class with Distinction · 2018–2022" },
  { icon: <Award size={18} className="text-amber-400" />, title: "ML & Deep Learning Certified", detail: "Kaggle & Deep Learning Specialization · 2025" },
  { icon: <GraduationCap size={18} className="text-[var(--tertiary)]" />, title: "IELTS Certification", detail: "Band 8 / 9 · Dec 2025" },
];

const reveal = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(skillGroups[0].title);
  const activeGroup = skillGroups.find((group) => group.title === activeCategory) ?? skillGroups[0];

  return (
    <section data-testid="skills-section" id="skills" className="py-20 md:py-32 px-5 md:px-8 border-b border-[rgba(255,255,255,0.08)]">
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header */}
        <motion.div {...reveal} className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-px bg-[var(--primary)]" />
            <span className="font-label-caps text-[var(--primary)]">Capabilities &amp; Stack</span>
          </div>
          <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl text-[var(--on-surface)]">
            Technical Focus &amp; Technologies
          </h2>
        </motion.div>

        {/* Interactive Skill Domains */}
        <motion.div {...reveal} className="mb-12">
          <div className="flex flex-wrap gap-2 mb-6">
            {skillGroups.map((group) => {
              const isActive = activeCategory === group.title;
              return (
                <button
                  key={group.title}
                  type="button"
                  onClick={() => setActiveCategory(group.title)}
                  className={`font-label-caps rounded-full border px-3.5 py-2 text-xs transition-all duration-200 ${
                    isActive
                      ? "border-[var(--primary)] bg-[rgba(0,255,157,0.12)] text-[var(--primary)]"
                      : "border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] text-[var(--text-muted)] hover:border-[rgba(255,255,255,0.2)]"
                  }`}
                >
                  {group.title}
                </button>
              );
            })}
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl glass-panel border-[rgba(255,255,255,0.08)] p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-2.5">
                  {activeGroup.icon}
                </div>
                <div>
                  <h3 className="font-headline-md text-lg text-[var(--on-surface)]">{activeGroup.title}</h3>
                  <p className="font-code-sm text-xs text-[var(--text-muted)]">Focused capability layer</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {activeGroup.skills.map((s) => (
                  <span
                    key={s}
                    className="font-code-sm rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-3 py-1.5 text-xs text-[var(--on-surface-variant)]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[rgba(99,102,241,0.18)] bg-[rgba(99,102,241,0.08)] p-6">
              <div className="flex items-center gap-2 mb-3 text-[var(--secondary)]">
                <Sparkles size={16} />
                <span className="font-label-caps text-xs">Systems Readiness</span>
              </div>
              <p className="font-body-md text-sm text-[var(--on-surface-variant)] leading-relaxed">
                The current focus blends high-leverage ML research with production-grade delivery, from evaluation surfaces to deployment governance.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Explicit Technologies List */}
        <motion.div {...reveal} className="mb-14 p-6 sm:p-8 rounded-2xl glass-panel border-[rgba(255,255,255,0.08)]">
          <h3 className="font-headline-md text-lg text-[var(--on-surface)] mb-6 flex items-center gap-2">
            <Code2 size={20} className="text-[var(--primary)]" /> Explicit Technology Stack
          </h3>

          <div className="space-y-6">
            {technologies.map((tech) => (
              <div key={tech.category}>
                <span className="font-label-caps text-xs text-[var(--primary)] mb-2.5 block tracking-wider">
                  {tech.category}
                </span>
                <div className="flex flex-wrap gap-2">
                  {tech.items.map((item) => (
                    <span
                      key={item}
                      className="font-code-sm text-xs px-3 py-1.5 rounded-lg bg-[rgba(13,17,28,0.8)] border border-[rgba(255,255,255,0.1)] text-[var(--on-surface)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Credentials Grid */}
        <motion.div {...reveal}>
          <h3 className="font-headline-md text-lg text-[var(--on-surface)] mb-6">
            Credentials &amp; Recognition
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {credentials.map((cred) => (
              <div
                key={cred.title}
                className="p-5 rounded-2xl glass-panel border-[rgba(255,255,255,0.08)] hover:border-[rgba(0,255,157,0.25)] transition-all duration-300"
              >
                <div>{cred.icon}</div>
                <h4 className="font-headline-md text-sm font-semibold text-[var(--on-surface)] mt-3">
                  {cred.title}
                </h4>
                <p className="font-code-sm text-xs text-[var(--text-muted)] mt-1.5 leading-relaxed">
                  {cred.detail}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
