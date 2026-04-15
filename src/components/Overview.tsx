"use client";

import { motion } from "framer-motion";
import { Server, ShieldCheck, FlaskConical, BarChart2 } from "lucide-react";

const reveal = {
  initial: { opacity: 0, y: 16 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

const pillars = [
  {
    icon: <Server size={20} />,
    title: "Backend Engineering",
    description:
      "Production Java microservices for enterprise fintech — designed, deployed, and kept alive under real load.",
    tags: ["Java", "Spring Boot", "OpenShift", "REST APIs"],
  },
  {
    icon: <ShieldCheck size={20} />,
    title: "Production Reliability",
    description:
      "Incident triage, CI/CD ownership, and release validation in high-availability distributed systems.",
    tags: ["CI/CD", "Incident Response", "Root Cause Analysis"],
  },
  {
    icon: <FlaskConical size={20} />,
    title: "LLM Evaluation",
    description:
      "Distribution shaping, cultural alignment, and guardrail research — evaluating whether a model's run-time is safe to deploy, not just whether it can benchmark well.",
    tags: ["Cultural Alignment", "Guardrail Systems", "Qwen 2.5-7B"],
  },
  {
    icon: <BarChart2 size={20} />,
    title: "ML Research",
    description:
      "Kaggle Notebooks Expert, top 4.1% globally. Applied ML across NLP, CV, and regression — now focused on evaluation infrastructure.",
    tags: ["Python", "Scikit-learn", "Kaggle Expert", "NLP"],
  },
];

export default function Overview() {
  return (
    <section className="pb-8 sm:pb-12 px-5 sm:px-6">
      <div className="max-w-5xl xl:max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={reveal.initial}
              whileInView={reveal.whileInView}
              viewport={reveal.viewport}
              transition={{ ...reveal.transition, delay: i * 0.08 }}
              className="group rounded-2xl border p-5 lg:p-6 transition-colors duration-200"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              {/* Icon */}
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                style={{ background: "var(--accent-dim)", color: "var(--accent)" }}
              >
                {pillar.icon}
              </div>

              {/* Title */}
              <h3 className="font-semibold text-base lg:text-lg mb-2 transition-colors duration-200 group-hover:text-[var(--accent)]">
                {pillar.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
                {pillar.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {pillar.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] px-2 py-0.5 rounded-md"
                    style={{ color: "var(--muted-fg)", background: "var(--bg)", border: "1px solid var(--border)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

