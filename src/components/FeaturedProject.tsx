"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Github, Check, MemoryStick } from 'lucide-react';
import { motion } from 'framer-motion';
import { getAllProjects } from '@/data/projects';

const reveal = {
  initial: { opacity: 0, y: 16 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

export default function FeaturedProject() {
  const projects = getAllProjects();
  const featuredProject = projects.find(p => p.featured);

  return (
    <section className="mt-[160px] md:mt-[160px] px-5 md:px-8" id="spotlight">
      <div className="max-w-[1280px] mx-auto">
        {/* Section Title */}
        <motion.div {...reveal} className="flex items-center gap-4 mb-12">
          <MemoryStick size={28} style={{ color: "var(--primary)" }} />
          <h2 className="font-headline-lg" style={{ color: "var(--on-surface)" }}>
            Project Spotlight
          </h2>
        </motion.div>

        {/* Project Spotlight Card */}
        <motion.div
          {...reveal}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 p-6 md:p-12"
          style={{
            border: "1px solid var(--surface-stroke)",
            background: "var(--surface-elevated)",
          }}
        >
          {/* Left: Content */}
          <div className="md:col-span-7 flex flex-col justify-center">
            <div
              className="font-code-sm inline-block w-max px-2 py-1 mb-4"
              style={{
                color: "var(--primary)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                border: "1px solid rgba(78, 222, 163, 0.3)",
              }}
            >
              System Architecture
            </div>

            <h3
              className="font-headline-lg mb-4"
              style={{
                color: "var(--on-surface)",
                fontSize: "clamp(24px, 4vw, 48px)",
              }}
            >
              {featuredProject?.title?.split('—')[0]?.trim() || 'LLM Control System'}
            </h3>

            <p className="font-body-lg mb-8 max-w-xl" style={{ color: "var(--text-muted)" }}>
              {featuredProject?.shortDescription || 'Built a full-stack system to monitor and control LLM generation at the token level.'}
            </p>

            {/* Feature checklist */}
            <ul className="font-body-md space-y-4 mb-8" style={{ color: "var(--on-surface-variant)" }}>
              {(featuredProject?.highlights || []).slice(0, 3).map((highlight, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check size={18} style={{ color: "var(--primary)", marginTop: "3px", flexShrink: 0 }} />
                  <span style={{ fontSize: "14px" }}>{highlight}</span>
                </li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/projects/${featuredProject?.slug}`}
                className="font-code-sm px-6 py-3 rounded transition-all duration-200 hover:opacity-90"
                style={{
                  background: "var(--primary)",
                  color: "var(--on-primary)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                Read Case Study
              </Link>
              {featuredProject?.github && (
                <Link
                  href={featuredProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-code-sm px-6 py-3 rounded transition-all duration-200 hover:bg-[var(--surface-bright)]"
                  style={{
                    border: "1px solid var(--surface-stroke)",
                    color: "var(--on-surface)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  View Repo
                </Link>
              )}
            </div>
          </div>

          {/* Right: Image + Metrics */}
          <div className="md:col-span-5 grid grid-cols-2 gap-4">
            {/* Project Image */}
            <div
              className="col-span-2 relative overflow-hidden h-[250px]"
              style={{ border: "1px solid var(--surface-stroke)" }}
            >
              <Image
                src={featuredProject?.image || '/og_final.png'}
                alt={featuredProject?.title || 'Featured project'}
                fill
                className="object-cover grayscale opacity-70"
                style={{ mixBlendMode: "luminosity" }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ border: "1px solid rgba(78, 222, 163, 0.2)" }}
              />
            </div>

            {/* Metric Cards */}
            <div
              className="p-4 flex flex-col justify-center text-center"
              style={{
                border: "1px solid var(--surface-stroke)",
                background: "var(--surface)",
              }}
            >
              <div className="font-metric-huge mb-2" style={{ color: "var(--primary)" }}>82%</div>
              <div className="font-code-sm" style={{ color: "var(--text-muted)", textTransform: "uppercase" }}>Instability Drop</div>
            </div>

            <div
              className="p-4 flex flex-col justify-center text-center"
              style={{
                border: "1px solid var(--surface-stroke)",
                background: "var(--surface)",
              }}
            >
              <div className="font-metric-huge mb-2" style={{ color: "var(--primary)" }}>0.0%</div>
              <div className="font-code-sm" style={{ color: "var(--text-muted)", textTransform: "uppercase" }}>False Positives</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
