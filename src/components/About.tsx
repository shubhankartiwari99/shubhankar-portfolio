"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRecruiterMode } from "./Providers";
import AnimatedCounter from "./AnimatedCounter";

const reveal = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

export default function About() {
  const recruiterMode = useRecruiterMode();

  return (
    <section data-testid="about-section" id="about" className="py-20 md:py-32 px-5 md:px-8 border-b border-[rgba(255,255,255,0.08)]">
      <div className="max-w-[1280px] mx-auto">
        <motion.div {...reveal} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-px bg-[var(--primary)]" />
            <span className="font-label-caps text-[var(--primary)]">Background</span>
          </div>
          <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl text-[var(--on-surface)]">
            About &amp; Core Focus
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Photo Column */}
          <motion.div {...reveal} className="lg:col-span-3">
            <div className="relative aspect-square w-[200px] lg:w-full mx-auto overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.08)] group bg-[rgba(255,255,255,0.02)]">
              <Image 
                src="/profile-black.jpg" 
                alt="Shubhankar Tiwari" 
                fill 
                sizes="(max-width: 1024px) 200px, 33vw"
                className="object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
                style={{ mixBlendMode: 'luminosity' }} 
              />
              <div className="absolute inset-0 border border-[rgba(0,255,157,0.0)] group-hover:border-[rgba(0,255,157,0.3)] rounded-2xl transition-all duration-700 pointer-events-none" />
            </div>
          </motion.div>

          {/* Narrative / Bullet Column */}
          <motion.div {...reveal} className="lg:col-span-6 space-y-4">
            {recruiterMode ? (
              <div className="p-6 rounded-2xl glass-panel border-[rgba(255,255,255,0.08)] h-full">
                <ul className="list-disc pl-5 space-y-3 font-body-md text-xs sm:text-sm text-[var(--on-surface-variant)] leading-relaxed">
                  <li>Software Engineer with 4+ years of experience in Java, Spring Boot, Microservices, and cloud-native deployments on OpenShift</li>
                  <li>Delivered 17+ production releases across 13 CashPro services; resolved 50+ production issues in enterprise fintech environments</li>
                  <li>Recognized as Subject Matter Expert (SME) for critical backend services, serving as the cross-team escalation point for production incidents and architecture decisions</li>
                  <li>Named inventor on a pending Bank of America patent application (2026) in AI for financial services</li>
                  <li>Kaggle Notebooks Expert (Rank #2,441 / 59,663) with certifications in ML, Deep Learning &amp; Computer Vision</li>
                  <li>Built AI reliability and LLM evaluation systems independently: entropy-aware routing, behavioral regression detection, and model governance pipelines</li>
                  <li>M.S. in Artificial Intelligence at Columbia University (Expected Dec 2027, Concentration in Finance &amp; Operations)</li>
                </ul>
              </div>
            ) : (
              <div className="p-6 sm:p-8 rounded-2xl glass-panel border-[rgba(255,255,255,0.08)] h-full flex flex-col justify-center space-y-4 font-body-lg text-xs sm:text-sm md:text-base text-[var(--on-surface-variant)] leading-relaxed">
                <p>
                  I&apos;ve always been drawn to understanding how complex systems actually work. Whether it&apos;s enterprise software or machine learning, I care most about how things behave under pressure, why they break, and how to make them more reliable.
                </p>
                <p>
                  I spent four years at Bank of America building and maintaining backend services for CashPro, their enterprise digital banking platform. That taught me a lot about the trade-offs in designing software that has to keep evolving without falling over. I picked up multiple Global Recognition Awards along the way and got involved in AI initiatives within the org.
                </p>
                <p>
                  I bring that same systems thinking to AI. Over the past year, I&apos;ve been building LLM evaluation tools, reliability frameworks, and model governance pipelines, while getting deeper into Python, PyTorch, and Transformers.
                </p>
                <p>
                  Now I&apos;m at Columbia doing an M.S. in Artificial Intelligence (Finance &amp; Operations concentration) to go deeper on the research side.
                </p>
              </div>
            )}
          </motion.div>

          {/* Quick Stat Cards */}
          <motion.div {...reveal} className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="p-5 rounded-2xl glass-panel border-[rgba(255,255,255,0.08)] hover:border-[rgba(0,255,157,0.3)] transition-colors">
              <div className="font-display-xl text-2xl sm:text-3xl text-[var(--primary)] font-bold">
                <AnimatedCounter value={4} suffix="+ Years" />
              </div>
              <div className="font-code-sm text-xs text-[var(--text-muted)] mt-1">
                Enterprise Production SWE
              </div>
            </div>

            <div className="p-5 rounded-2xl glass-panel border-[rgba(255,255,255,0.08)] hover:border-[rgba(99,102,241,0.3)] transition-colors">
              <div className="font-display-xl text-2xl sm:text-3xl text-[var(--secondary)] font-bold">
                #2,441
              </div>
              <div className="font-code-sm text-xs text-[var(--text-muted)] mt-1">
                Kaggle Expert / 59.7K
              </div>
            </div>

            <div className="p-5 rounded-2xl glass-panel border-[rgba(255,255,255,0.08)] hover:border-amber-400/30 transition-colors">
              <div className="font-display-xl text-2xl sm:text-3xl text-amber-400 font-bold">
                94.4%
              </div>
              <div className="font-code-sm text-xs text-[var(--text-muted)] mt-1">
                B.Tech CSE GPA (SRM IST)
              </div>
            </div>

            <div className="p-5 rounded-2xl glass-panel border-[rgba(255,255,255,0.08)] hover:border-[rgba(56,189,248,0.3)] transition-colors">
              <div className="font-display-xl text-2xl sm:text-3xl text-[var(--tertiary)] font-bold">
                34
              </div>
              <div className="font-code-sm text-xs text-[var(--text-muted)] mt-1">
                Public ML Notebooks
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
