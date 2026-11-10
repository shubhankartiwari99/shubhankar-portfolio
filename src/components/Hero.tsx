"use client";

import { motion } from "framer-motion";
import { GraduationCap, ShieldCheck, ArrowUpRight, Terminal, Award, Activity, FileText } from "lucide-react";
import HeroCanvas from "./HeroCanvas";
import AnimatedCounter from "./AnimatedCounter";

export default function Hero() {
  return (
    <section
      data-testid="hero-section"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-24 pb-12 px-5 md:px-8 border-b border-[rgba(255,255,255,0.08)]"
    >
      {/* Dynamic Background Canvas */}
      <HeroCanvas />

      {/* Ambient Radial Highlights */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(0,255,157,0.08)_0%,transparent_70%)] pointer-events-none z-0 blur-2xl" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(99,102,241,0.09)_0%,transparent_70%)] pointer-events-none z-0 blur-2xl" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-[1280px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Status Badge Pills */}
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            <span className="font-code-sm inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(0,255,157,0.08)] border border-[rgba(0,255,157,0.25)] text-[var(--primary)] text-xs shadow-[0_0_15px_rgba(0,255,157,0.15)]">
              <span className="w-2 h-2 rounded-full bg-[var(--primary)] status-pulse" />
              SYSTEM STATUS: ONLINE
            </span>

            <span className="font-code-sm inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.28)] text-[var(--secondary)] text-xs">
              <GraduationCap size={14} />
              Columbia MS AI &apos;27 · Finance &amp; Ops
            </span>

            <span className="font-code-sm inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgba(245,158,11,0.08)] border border-[rgba(245,158,11,0.25)] text-amber-400 text-xs">
              <Award size={13} />
              Patent Pending (2026)
            </span>
          </div>

          {/* Name Title */}
          <h1 className="font-display-xl mb-4 text-[var(--on-surface)] text-[clamp(44px,7.5vw,96px)] leading-[0.96] tracking-tight">
            Shubhankar
            <br />
            <span className="gradient-text-emerald">Tiwari</span>
          </h1>

          {/* Subheading / Tagline */}
          <div className="max-w-3xl mb-6 space-y-2">
            <p className="font-body-lg text-[var(--on-surface-variant)] text-[clamp(16px,1.8vw,19px)] leading-relaxed">
              Software Engineer with <span className="text-white font-semibold">4+ years</span> building enterprise microservices at Bank of America &bull; <span className="text-[var(--primary)] font-semibold">M.S. in AI at Columbia University</span> (Expected Dec 2027).
            </p>
            <p className="font-body-md text-[var(--text-muted)] text-sm leading-relaxed">
              Building LLM evaluation tools, entropy-based generation controls, and drift-aware ML pipelines.
            </p>
          </div>

          {/* Metrics & Telemetry Bar */}
          <div className="max-w-4xl mb-6 rounded-2xl glass-panel border-[rgba(255,255,255,0.08)] p-4 sm:p-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-4 border-b border-[rgba(255,255,255,0.06)]">
              <div>
                <div className="font-display-xl text-2xl sm:text-3xl text-[var(--primary)] font-bold">
                  <AnimatedCounter value={550000} suffix="+" />
                </div>
                <div className="font-code-sm text-[11px] text-[var(--text-muted)] mt-0.5">
                  CashPro Corporate Users
                </div>
              </div>

              <div>
                <div className="font-display-xl text-2xl sm:text-3xl text-[var(--secondary)] font-bold">
                  <AnimatedCounter value={18} suffix="M+" />
                </div>
                <div className="font-code-sm text-[11px] text-[var(--text-muted)] mt-0.5">
                  Searches Served (SME)
                </div>
              </div>

              <div>
                <div className="font-display-xl text-2xl sm:text-3xl text-amber-400 font-bold">
                  <AnimatedCounter value={4} suffix="+ Yrs" />
                </div>
                <div className="font-code-sm text-[11px] text-[var(--text-muted)] mt-0.5">
                  Enterprise Backend SWE
                </div>
              </div>

              <div>
                <div className="font-display-xl text-2xl sm:text-3xl text-[var(--tertiary)] font-bold">
                  Top 4.1%
                </div>
                <div className="font-code-sm text-[11px] text-[var(--text-muted)] mt-0.5">
                  Kaggle Expert (#2,441)
                </div>
              </div>
            </div>

            {/* Micro Telemetry Strip */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-3">
              <div className="flex items-center gap-2">
                <Activity size={13} className="text-[var(--primary)] status-pulse" />
                <span className="font-code-sm text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                  Live Telemetry
                </span>
              </div>
              <div className="flex items-center gap-3 font-code-sm text-[11px] text-[var(--on-surface-variant)]">
                <span>Latency <strong className="text-[var(--primary)] font-semibold">18ms</strong></span>
                <span className="text-white/20">&bull;</span>
                <span>Baseline AUC <strong className="text-[var(--secondary)] font-semibold">0.975</strong></span>
                <span className="text-white/20">&bull;</span>
                <span className="text-emerald-400 font-semibold">Policy gates active</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5">
            <a
              href="#projects"
              className="font-code-sm inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--primary)] text-[var(--on-primary)] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-[0_0_24px_rgba(0,255,157,0.3)] transition-all duration-200 active:scale-95 cursor-pointer"
            >
              Explore AI Systems <ArrowUpRight size={15} />
            </a>

            <a
              href="#experience"
              className="font-code-sm inline-flex items-center gap-2 px-5 py-3 rounded-xl glass-panel text-[var(--on-surface)] text-xs uppercase tracking-wider hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <ShieldCheck size={15} /> Experience &amp; Patent
            </a>

            <a
              href="/Shubhankar_Tiwari_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-code-sm inline-flex items-center gap-2 px-5 py-3 rounded-xl glass-panel text-[var(--secondary)] text-xs uppercase tracking-wider hover:bg-[rgba(99,102,241,0.12)] hover:border-[var(--secondary)] transition-all duration-200 active:scale-95 cursor-pointer"
              title="Open Official Resume PDF"
            >
              <FileText size={15} /> Resume (PDF)
            </a>

            <a
              href="#terminal"
              className="font-code-sm inline-flex items-center gap-2 px-5 py-3 rounded-xl glass-panel text-[var(--text-muted)] text-xs uppercase tracking-wider hover:border-[rgba(255,255,255,0.2)] hover:text-white transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <Terminal size={15} /> CLI Terminal
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
