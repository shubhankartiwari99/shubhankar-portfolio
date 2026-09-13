"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, ShieldCheck, Sparkles, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getAllProjects } from "@/data/projects";
import ArchitectureVisualizer from "./ArchitectureVisualizer";

const reveal = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

const filterTabs = [
  { id: "all", label: "ALL PROJECTS" },
  { id: "ai-systems", label: "AI RELIABILITY & GOVERNANCE" },
  { id: "mlops", label: "MLOPS & INFRASTRUCTURE" },
  { id: "nlp-cv", label: "NLP / CV / DATA SCIENCE" },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const allProjects = getAllProjects();
  const flagshipProject = allProjects.find((p) => p.slug === "ai-reliability") || allProjects[0];

  const filteredProjects = allProjects.filter((p) => {
    if (activeFilter === "ai-systems") return p.slug.includes("ai") || p.slug.includes("llm") || p.slug.includes("generation");
    if (activeFilter === "mlops") return p.slug.includes("drift") || p.slug.includes("fraud") || p.slug.includes("fintech") || p.slug.includes("quality");
    if (activeFilter === "nlp-cv") return p.slug.includes("headlines") || p.slug.includes("trigger") || p.slug.includes("face") || p.slug.includes("estadisticos") || p.slug.includes("multilingual");
    return true;
  });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section data-testid="projects-section" id="projects" className="py-20 md:py-32 px-5 md:px-8 border-b border-[rgba(255,255,255,0.08)]">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <motion.div {...reveal} className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-px bg-[var(--primary)]" />
            <span className="font-label-caps text-[var(--primary)]">Systems &amp; Models</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl text-[var(--on-surface)]">
                Featured Engineering Systems
              </h2>
              <p className="font-body-md text-[var(--text-muted)] max-w-2xl mt-2 text-sm sm:text-base">
                Software and AI systems I&apos;ve built for evaluation, monitoring, and governance in production environments.
              </p>
            </div>

            <Link
              href="/projects"
              className="font-label-caps inline-flex items-center gap-2 text-xs text-[var(--primary)] hover:underline self-start md:self-auto"
            >
              BROWSE ALL 10 PROJECTS <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>

        {/* Flagship Project Spotlight Card */}
        {flagshipProject && (
          <motion.div
            {...reveal}
            onMouseMove={handleCardMouseMove}
            className="mb-14 p-6 sm:p-8 md:p-10 rounded-2xl glass-panel spotlight-card border border-[rgba(0,255,157,0.25)] bg-[rgba(13,17,28,0.75)] shadow-[0_0_40px_rgba(0,255,157,0.08)]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Details */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-code-sm text-[11px] font-bold px-3 py-1 rounded-full bg-[rgba(0,255,157,0.12)] border border-[rgba(0,255,157,0.3)] text-[var(--primary)] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles size={12} /> Flagship AI Architecture
                  </span>
                  <span className="font-code-sm text-[11px] px-2.5 py-0.5 rounded-full border border-[rgba(255,255,255,0.1)] text-[var(--text-muted)]">
                    {flagshipProject.year} &bull; {flagshipProject.status}
                  </span>
                </div>

                <h3 className="font-headline-lg text-2xl sm:text-3xl text-[var(--on-surface)] font-bold">
                  <Link href={`/projects/${flagshipProject.slug}`} className="hover:text-[var(--primary)] transition-colors">
                    {flagshipProject.title}
                  </Link>
                </h3>

                <p className="font-body-md text-sm text-[var(--on-surface-variant)] leading-relaxed">
                  {flagshipProject.shortDescription}
                </p>

                {/* Highlights List */}
                <div className="space-y-2 pt-2">
                  {flagshipProject.highlights.slice(0, 3).map((highlight) => (
                    <div key={highlight} className="flex items-start gap-2.5 font-body-md text-xs sm:text-sm text-[var(--on-surface-variant)]">
                      <Check size={16} className="text-[var(--primary)] flex-shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 pt-3">
                  {flagshipProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-code-sm text-xs px-2.5 py-1 rounded-md bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[var(--on-surface-variant)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <Link
                    href={`/projects/${flagshipProject.slug}`}
                    className="font-code-sm inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--primary)] text-[var(--on-primary)] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-[0_0_20px_rgba(0,255,157,0.25)] transition-all"
                  >
                    Read Case Study <ArrowUpRight size={14} />
                  </Link>
                  {flagshipProject.github && (
                    <a
                      href={flagshipProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-code-sm inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.03)] text-[var(--on-surface)] text-xs uppercase tracking-wider hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all"
                    >
                      <Github size={14} /> View Code
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Hero Metrics Panel */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(6,8,14,0.75)] text-center">
                  <div className="font-display-xl text-3xl text-[var(--primary)] font-bold mb-1">
                    100%
                  </div>
                  <div className="font-code-sm text-[11px] text-[var(--text-muted)] uppercase tracking-wider">
                    Adversarial Catch
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(6,8,14,0.75)] text-center">
                  <div className="font-display-xl text-3xl text-[var(--secondary)] font-bold mb-1">
                    82%
                  </div>
                  <div className="font-code-sm text-[11px] text-[var(--text-muted)] uppercase tracking-wider">
                    Instability Drop
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(6,8,14,0.75)] text-center">
                  <div className="font-display-xl text-3xl text-amber-400 font-bold mb-1">
                    0.0%
                  </div>
                  <div className="font-code-sm text-[11px] text-[var(--text-muted)] uppercase tracking-wider">
                    False Positives
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(6,8,14,0.75)] text-center">
                  <div className="font-display-xl text-3xl text-[var(--tertiary)] font-bold mb-1">
                    4
                  </div>
                  <div className="font-code-sm text-[11px] text-[var(--text-muted)] uppercase tracking-wider">
                    Design Iterations
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Featured Project Visualizer Callout */}
        <motion.div {...reveal} className="mb-14">
          <ArchitectureVisualizer projectSlug="ai-reliability" />
        </motion.div>

        {/* Filter Tabs Bar with layoutId smooth sliding indicator */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-[rgba(255,255,255,0.08)] pb-4">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                type="button"
                className={`font-label-caps text-xs px-3.5 py-1.5 rounded-full transition-colors duration-200 relative cursor-pointer ${
                  isActive ? "text-[var(--primary)] font-bold" : "text-[var(--text-muted)] hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="projectFilterPill"
                    className="absolute inset-0 rounded-full bg-[rgba(0,255,157,0.12)] border border-[rgba(0,255,157,0.3)] shadow-[0_0_12px_rgba(0,255,157,0.15)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <motion.article
              key={project.slug}
              initial={reveal.initial}
              whileInView={reveal.whileInView}
              viewport={reveal.viewport}
              transition={{ ...reveal.transition, delay: idx * 0.06 }}
              onMouseMove={handleCardMouseMove}
              className="rounded-2xl glass-panel spotlight-card card-hover-lift overflow-hidden flex flex-col group"
            >
              {/* Project Image Header */}
              <div className="relative w-full h-48 overflow-hidden bg-slate-900">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover opacity-75 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090c15] via-[#090c15]/30 to-transparent" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="font-code-sm text-[10px] px-2 py-0.5 rounded bg-[rgba(6,8,14,0.85)] border border-[rgba(255,255,255,0.15)] text-[var(--primary)] backdrop-blur-md">
                    {project.year}
                  </span>
                  <span className="font-code-sm text-[10px] px-2 py-0.5 rounded bg-[rgba(6,8,14,0.85)] border border-[rgba(255,255,255,0.15)] text-[var(--on-surface-variant)] backdrop-blur-md">
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Project Body */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-headline-md text-base sm:text-lg text-[var(--on-surface)] group-hover:text-[var(--primary)] transition-colors mb-2 font-semibold">
                  <Link href={`/projects/${project.slug}`}>
                    {project.title}
                  </Link>
                </h3>

                <p className="font-body-md text-xs sm:text-sm text-[var(--text-muted)] line-clamp-3 mb-5 leading-relaxed">
                  {project.shortDescription}
                </p>

                {/* Highlights Summary */}
                {project.highlights && project.highlights.length > 0 && (
                  <div className="mb-5 pt-3 border-t border-[rgba(255,255,255,0.06)] space-y-1.5">
                    {project.highlights.slice(0, 2).map((h) => (
                      <div key={h} className="font-code-sm text-[11px] text-[var(--on-surface-variant)] flex items-start gap-1.5">
                        <span className="text-[var(--primary)] flex-shrink-0">&bull;</span>
                        <span className="truncate">{h}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Tags & Links Footer */}
                <div className="mt-auto pt-4 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5 max-w-[75%]">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="font-code-sm text-[10px] px-2 py-0.5 rounded bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[var(--text-muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="p-2 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[var(--primary)] hover:bg-[rgba(0,255,157,0.15)] hover:border-[var(--primary)] transition-colors"
                    title="View Details"
                  >
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
