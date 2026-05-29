"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const reveal = {
  initial: { opacity: 0, y: 16 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

export default function Overview() {
  return (
    <section className="py-[80px] md:py-[160px] px-5 md:px-8">
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          {...reveal}
          className="p-8 md:p-12"
          style={{
            border: "1px solid var(--surface-stroke)",
            background: "var(--surface-elevated)",
          }}
        >
          <h2 className="font-headline-md mb-6" style={{ color: "var(--on-surface)", borderBottom: "1px solid var(--surface-stroke)", paddingBottom: "16px" }}>
            Core Insight
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="font-body-lg mb-6" style={{ color: "var(--on-surface)" }}>
                Most ML systems fail silently. I design systems that detect and correct instability in real time.
              </p>

              <p className="font-body-md mb-6" style={{ color: "var(--on-surface-variant)" }}>
                The systems I build observe the generation loop manually, extracting per-token probability and entropy. This allows for mid-generation intervention without full restarts.
              </p>

              <ul className="space-y-3 mt-6">
                <li className="flex items-start gap-2" style={{ color: "var(--text-muted)" }}>
                  <Check size={18} style={{ color: "var(--primary)", marginTop: "2px", flexShrink: 0 }} />
                  <span className="font-body-md">Measure behavior (entropy, drift, performance)</span>
                </li>
                <li className="flex items-start gap-2" style={{ color: "var(--text-muted)" }}>
                  <Check size={18} style={{ color: "var(--primary)", marginTop: "2px", flexShrink: 0 }} />
                  <span className="font-body-md">Detect failure modes (instability, degradation)</span>
                </li>
                <li className="flex items-start gap-2" style={{ color: "var(--text-muted)" }}>
                  <Check size={18} style={{ color: "var(--primary)", marginTop: "2px", flexShrink: 0 }} />
                  <span className="font-body-md">Take corrective action automatically</span>
                </li>
              </ul>
            </div>

            <div
              className="rounded p-8 flex items-center justify-center relative overflow-hidden"
              style={{
                background: "var(--surface-container)",
                border: "1px solid var(--surface-stroke)",
              }}
            >
              {/* Dot pattern overlay */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: "radial-gradient(circle, var(--surface-bright) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
              <div className="relative z-10 text-center">
                <div className="text-6xl mb-4" style={{ color: "var(--primary)" }}>⚡</div>
                <div className="font-code-sm" style={{ color: "var(--on-surface)" }}>
                  Entropy Extraction Loop
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
