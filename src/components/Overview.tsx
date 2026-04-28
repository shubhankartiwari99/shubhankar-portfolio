"use client";

import { motion } from "framer-motion";



export default function Overview() {
  return (
    <section className="py-16 sm:py-24 px-5 sm:px-6">
      <div className="max-w-5xl xl:max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="p-8 sm:p-12 rounded-2xl border"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6" style={{ color: "var(--fg)" }}>
            How I Think About ML Systems
          </h2>
          
          <p className="text-lg md:text-xl font-medium mb-8" style={{ color: "var(--accent)" }}>
            Most ML systems fail silently.
          </p>

          <p className="text-base md:text-lg mb-4" style={{ color: "var(--muted)" }}>
            I design systems that:
          </p>
          
          <ul className="space-y-4 mb-10 text-base md:text-lg" style={{ color: "var(--muted)" }}>
            <li className="flex items-start gap-4">
              <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--accent)" }}></span>
              <span><strong style={{ color: "var(--fg)" }}>measure behavior</strong> (entropy, drift, performance)</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--accent)" }}></span>
              <span><strong style={{ color: "var(--fg)" }}>detect failure modes</strong> (instability, degradation)</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--accent)" }}></span>
              <span><strong style={{ color: "var(--fg)" }}>take corrective action automatically</strong></span>
            </li>
          </ul>

          <div className="p-5 rounded-xl border" style={{ borderColor: "var(--accent)", backgroundColor: "var(--accent-dim)" }}>
            <p className="text-base md:text-lg font-medium leading-relaxed" style={{ color: "var(--fg)" }}>
              This results in ML systems that are not just predictive — but self-aware and controllable.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

