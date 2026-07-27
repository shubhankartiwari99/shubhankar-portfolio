"use client";

import { motion } from "framer-motion";
import { Cpu, ShieldCheck, Database, GitBranch } from "lucide-react";

const reveal = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

const tenets = [
  {
    num: "01",
    title: "Reliability Over Hype",
    description: "Evaluating model behavior token by token. Catching failure modes during generation, not after user delivery.",
    icon: <Cpu size={22} className="text-[var(--primary)]" />,
  },
  {
    num: "02",
    title: "Deterministic Governance",
    description: "Building policy controllers, CI gates, and business-loss promotion metrics that prevent silent model degradation.",
    icon: <ShieldCheck size={22} className="text-[var(--secondary)]" />,
  },
  {
    num: "03",
    title: "Production Rigor",
    description: "4 years of enterprise backend engineering at Bank of America — 17+ releases, 13 CashPro services, 550K+ users.",
    icon: <Database size={22} className="text-amber-400" />,
  },
  {
    num: "04",
    title: "Continuous Adaptation",
    description: "Integrating real-time PSI & KL drift detection with shadow deployment to evaluate recovery before promotion.",
    icon: <GitBranch size={22} className="text-[var(--tertiary)]" />,
  },
];

export default function Overview() {
  return (
    <section id="overview" className="py-20 md:py-28 px-5 md:px-8 border-b border-[rgba(255,255,255,0.08)]">
      <div className="max-w-[1280px] mx-auto">
        <motion.div {...reveal} className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-px bg-[var(--primary)]" />
            <span className="font-label-caps text-[var(--primary)]">Engineering Philosophy</span>
          </div>
          <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl text-[var(--on-surface)]">
            Systems Mindset Applied to Artificial Intelligence
          </h2>
        </motion.div>

        {/* 4 Tenets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {tenets.map((tenet, idx) => (
            <motion.div
              key={tenet.num}
              initial={reveal.initial}
              whileInView={reveal.whileInView}
              viewport={reveal.viewport}
              transition={{ ...reveal.transition, delay: idx * 0.1 }}
              className="p-6 rounded-2xl glass-panel group hover:border-[rgba(0,255,157,0.3)] hover:bg-[rgba(255,255,255,0.04)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-code-sm text-xs font-bold text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors">
                    [{tenet.num}]
                  </span>
                  <div className="p-2 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)]">
                    {tenet.icon}
                  </div>
                </div>
                <h3 className="font-headline-md text-lg text-[var(--on-surface)] mb-2 font-semibold">
                  {tenet.title}
                </h3>
                <p className="font-body-md text-xs text-[var(--text-muted)] leading-relaxed">
                  {tenet.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
