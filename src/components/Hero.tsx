"use client";

import { motion } from "framer-motion";
import { GraduationCap, ShieldCheck, ArrowUpRight, Terminal, Award } from "lucide-react";
import HeroCanvas from "./HeroCanvas";
import AnimatedCounter from "./AnimatedCounter";

export default function Hero() {
  return (
    <section
      data-testid="hero-section"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-28 pb-16 px-5 md:px-8 border-b border-[rgba(255,255,255,0.08)]"
    >
      {/* Dynamic Background Canvas */}
      <HeroCanvas />

      {/* Ambient Gradient Glow Highlights */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[rgba(0,255,157,0.08)] rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-[rgba(99,102,241,0.08)] rounded-full blur-3xl pointer-events-none z-0" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-[1280px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Status Badge Pills */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="font-code-sm inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(0,255,157,0.08)] border border-[rgba(0,255,157,0.2)] text-[var(--primary)] text-xs">
              <span className="w-2 h-2 rounded-full bg-[var(--primary)] status-pulse" />
              SYSTEM STATUS: ONLINE
            </span>

            <span className="font-code-sm inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(99,102,241,0.12)] border border-[rgba(99,102,241,0.3)] text-[var(--secondary)] text-xs">
              <GraduationCap size={14} />
              Columbia MS AI &apos;27
            </span>

            <span className="font-code-sm inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgba(245,158,11,0.1)] border border-[rgba(245,158,11,0.25)] text-amber-400 text-xs">
              <Award size={13} />
              Patent Inventor (2026)
            </span>
          </div>

          {/* Name Title */}
          <h1 className="font-display-xl mb-6 text-[var(--on-surface)] text-[clamp(44px,8.5vw,110px)] leading-[0.98] tracking-tight">
            Shubhankar
            <br />
            <span className="gradient-text-emerald">Tiwari</span>
          </h1>

          {/* Subheading / Tagline */}
          <div className="max-w-3xl mb-10 space-y-3">
            <p className="font-body-lg text-[var(--on-surface-variant)] text-[clamp(16px,2vw,20px)] leading-relaxed">
              Software Engineer with <span className="text-white font-semibold">4+ years</span> building enterprise microservices at Bank of America &bull; Incoming <span className="text-[var(--primary)] font-semibold">M.S. in AI at Columbia University</span>.
            </p>
            <p className="font-code-sm text-[var(--text-muted)] text-sm leading-relaxed">
              Building AI evaluation platforms, entropy-aware generation controls, and drift-aware model governance systems.
            </p>
          </div>

          {/* Key Metrics Banner (Animated Counter Integration) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mb-6 p-5 rounded-2xl glass-panel border-[rgba(255,255,255,0.08)] bg-[rgba(13,17,28,0.6)]">
            <div>
              <div className="font-display-xl text-2xl md:text-3xl text-[var(--primary)] font-bold">
                <AnimatedCounter value={550000} suffix="+" />
              </div>
              <div className="font-code-sm text-xs text-[var(--text-muted)] mt-1">
                CashPro Corporate Users
              </div>
            </div>

            <div>
              <div className="font-display-xl text-2xl md:text-3xl text-[var(--secondary)] font-bold">
                <AnimatedCounter value={18} suffix="M+" />
              </div>
              <div className="font-code-sm text-xs text-[var(--text-muted)] mt-1">
                Enterprise Searches Served
              </div>
            </div>

            <div>
              <div className="font-display-xl text-2xl md:text-3xl text-amber-400 font-bold">
                <AnimatedCounter value={4} suffix="+ Yrs" />
              </div>
              <div className="font-code-sm text-xs text-[var(--text-muted)] mt-1">
                Enterprise Backend SWE
              </div>
            </div>

            <div>
              <div className="font-display-xl text-2xl md:text-3xl text-[var(--tertiary)] font-bold">
                Top 4.1%
              </div>
              <div className="font-code-sm text-xs text-[var(--text-muted)] mt-1">
                Kaggle Expert (#2,441)
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-8 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(6,8,14,0.72)] px-4 py-3 w-fit backdrop-blur-xl">
            <span className="font-code-sm text-[10px] uppercase tracking-[0.24em] text-[var(--text-muted)]">Telemetry</span>
            <span className="h-2 w-2 rounded-full bg-[var(--primary)] status-pulse" />
            <span className="font-code-sm text-[11px] text-[var(--on-surface-variant)]">Latency 18ms avg</span>
            <span className="h-1 w-1 rounded-full bg-[rgba(255,255,255,0.25)]" />
            <span className="font-code-sm text-[11px] text-[var(--on-surface-variant)]">AUC 0.975</span>
            <span className="h-1 w-1 rounded-full bg-[rgba(255,255,255,0.25)]" />
            <span className="font-code-sm text-[11px] text-[var(--on-surface-variant)]">Policy gates live</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="font-code-sm inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--primary)] text-[var(--on-primary)] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-[0_0_20px_rgba(0,255,157,0.25)] transition-all duration-200"
            >
              Explore AI Systems <ArrowUpRight size={16} />
            </a>

            <a
              href="#experience"
              className="font-code-sm inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass-panel text-[var(--on-surface)] text-xs uppercase tracking-wider hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all duration-200"
            >
              <ShieldCheck size={16} /> Experience &amp; Patent
            </a>

            <a
              href="#terminal"
              className="font-code-sm inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass-panel text-[var(--secondary)] text-xs uppercase tracking-wider hover:bg-[rgba(99,102,241,0.15)] transition-all duration-200"
            >
              <Terminal size={16} /> CLI Terminal
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
