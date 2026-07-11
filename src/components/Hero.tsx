"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      data-testid="hero-section"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden"
      style={{ borderLeft: "1px solid var(--surface-stroke)", borderRight: "1px solid var(--surface-stroke)", borderBottom: "1px solid var(--surface-stroke)" }}
    >
      {/* Ambient Mesh Background */}
      <div className="mesh-bg" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--bg)] pointer-events-none z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto w-full px-5 md:px-8 py-12 md:py-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Name */}
          <h1
            className="font-display-xl mb-4"
            style={{
              color: "var(--on-surface)",
              letterSpacing: "-0.04em",
              fontSize: "clamp(48px, 10vw, 120px)",
              lineHeight: 1.0,
            }}
          >
            Shubhankar
            <br />
            Tiwari
          </h1>

          {/* Professional Identity */}
          <div className="mb-8 space-y-1">
            <p
              className="font-body-md"
              style={{
                color: "var(--on-surface-variant)",
                fontFamily: "var(--font-jetbrains)",
                fontSize: "clamp(13px, 1.5vw, 15px)",
                letterSpacing: "0.02em",
              }}
            >
              Software Engineer with 4+ years of experience
            </p>
            <p
              className="font-body-md"
              style={{
                color: "var(--primary)",
                fontFamily: "var(--font-jetbrains)",
                fontSize: "clamp(13px, 1.5vw, 15px)",
                letterSpacing: "0.02em",
              }}
            >
              Incoming M.S. in Artificial Intelligence — Columbia University
            </p>
          </div>

          {/* Focus Area Cards */}
          <div className="flex flex-col sm:flex-row gap-6">
            <div
              className="max-w-sm p-6 glass-panel rounded-xl transition-all duration-300 hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.05)]"
              style={{
                background: "var(--surface-elevated)",
              }}
            >
              <div className="font-code-sm mb-2" style={{ color: "var(--primary)" }}>
                [01]
              </div>
              <h3
                className="font-headline-md mb-2"
                style={{
                  color: "var(--on-surface)",
                  fontSize: "20px",
                  fontWeight: 600,
                }}
              >
                Runtime Intelligence
              </h3>
              <p className="font-body-md" style={{ color: "var(--text-muted)" }}>
                Controlling and stabilizing LLM behavior during generation
              </p>
            </div>

            <div
              className="max-w-sm p-6 glass-panel rounded-xl transition-all duration-300 hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.05)]"
              style={{
                background: "var(--surface-elevated)",
              }}
            >
              <div className="font-code-sm mb-2" style={{ color: "var(--primary)" }}>
                [02]
              </div>
              <h3
                className="font-headline-md mb-2"
                style={{
                  color: "var(--on-surface)",
                  fontSize: "20px",
                  fontWeight: 600,
                }}
              >
                Model Lifecycle Intelligence
              </h3>
              <p className="font-body-md" style={{ color: "var(--text-muted)" }}>
                Detecting drift and governing ML models in production
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
