"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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

  const filteredProjects = allProjects.filter((p) => {
    if (activeFilter === "ai-systems") return p.slug.includes("ai") || p.slug.includes("llm") || p.slug.includes("generation");
    if (activeFilter === "mlops") return p.slug.includes("drift") || p.slug.includes("fraud") || p.slug.includes("fintech") || p.slug.includes("quality");
    if (activeFilter === "nlp-cv") return p.slug.includes("headlines") || p.slug.includes("trigger") || p.slug.includes("face") || p.slug.includes("estadisticos") || p.slug.includes("multilingual");
    return true;
  });

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
              <p className="font-body-md text-[var(--text-muted)] max-w-2xl mt-2 text-sm">
                Production-grade software &amp; AI reliability frameworks built to observe, evaluate, and govern intelligent systems.
              </p>
            </div>

            <Link
              href="/projects"
              className="font-label-caps inline-flex items-center gap-2 text-xs text-[var(--primary)] hover:underline self-start md:self-auto"
            >
              BROWSE ALL 10 PROJECTS <ArrowRight size={14} />
            </Link>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mt-8 border-b border-[rgba(255,255,255,0.08)] pb-4">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                type="button"
                className={`font-label-caps text-xs px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                  activeFilter === tab.id
                    ? "bg-[rgba(0,255,157,0.12)] text-[var(--primary)] border border-[rgba(0,255,157,0.25)]"
                    : "text-[var(--text-muted)] hover:text-white hover:bg-[rgba(255,255,255,0.04)]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured Project Visualizer Callout */}
        <motion.div {...reveal} className="mb-12">
          <ArchitectureVisualizer projectSlug="ai-reliability" />
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <motion.article
              key={project.slug}
              initial={reveal.initial}
              whileInView={reveal.whileInView}
              viewport={reveal.viewport}
              transition={{ ...reveal.transition, delay: idx * 0.08 }}
              className="rounded-2xl glass-panel overflow-hidden flex flex-col group hover:border-[rgba(0,255,157,0.3)] hover:shadow-[0_0_25px_rgba(0,255,157,0.1)] transition-all duration-300"
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#090c15] via-transparent to-transparent" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="font-code-sm text-[10px] px-2 py-0.5 rounded bg-[rgba(6,8,14,0.8)] border border-[rgba(255,255,255,0.15)] text-[var(--primary)]">
                    {project.year}
                  </span>
                  <span className="font-code-sm text-[10px] px-2 py-0.5 rounded bg-[rgba(6,8,14,0.8)] border border-[rgba(255,255,255,0.15)] text-[var(--on-surface-variant)]">
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Project Body */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-headline-md text-lg text-[var(--on-surface)] group-hover:text-[var(--primary)] transition-colors mb-2 font-semibold">
                  <Link href={`/projects/${project.slug}`}>
                    {project.title}
                  </Link>
                </h3>

                <p className="font-body-md text-xs text-[var(--text-muted)] line-clamp-3 mb-5 leading-relaxed">
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
                    className="p-2 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[var(--primary)] hover:bg-[rgba(0,255,157,0.15)] transition-colors"
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
