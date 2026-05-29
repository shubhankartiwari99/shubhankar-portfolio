"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getAllProjects } from "@/data/projects";

const reveal = {
  initial: { opacity: 0, y: 16 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

export default function Projects() {
  const allProjects = getAllProjects();
  const featuredProject = allProjects.find((p) => p.featured);
  const projects = allProjects.filter((p) => p.slug !== featuredProject?.slug);

  return (
    <section data-testid="projects-section" id="projects" className="py-[80px] md:py-[160px] px-5 md:px-8">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <motion.div {...reveal} className="mb-12 md:mb-[80px]">
          <div className="flex items-center gap-4 mb-2">
            <span className="w-12 h-px" style={{ background: "var(--primary)" }} />
            <span className="font-label-caps" style={{ color: "var(--primary)" }}>
              Portfolio Overview
            </span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-headline-lg mb-2" style={{ color: "var(--on-surface)", fontSize: "clamp(28px, 4vw, 48px)" }}>
                Projects &amp; Experiments
              </h2>
              <p className="font-body-lg max-w-2xl" style={{ color: "var(--text-muted)" }}>
                Building intelligent ML systems that observe, detect, and adapt in real time. Focus on runtime reliability, model governance, and deterministic performance.
              </p>
            </div>
            <Link
              href="/projects"
              className="font-label-caps hidden sm:flex items-center gap-1.5 transition-colors duration-200 hover:opacity-80"
              style={{ color: "var(--primary)" }}
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {projects.map((project, i) => {
            // First featured project: hero card (8-col)
            if (project.featured && project.slug === "drift-aware-fraud-detection") {
              return (
                <motion.article
                  key={project.slug}
                  initial={reveal.initial}
                  whileInView={reveal.whileInView}
                  viewport={reveal.viewport}
                  transition={reveal.transition}
                  className="col-span-1 md:col-span-8 flex flex-col overflow-hidden group"
                  style={{
                    background: "var(--surface-elevated)",
                    border: "1px solid var(--surface-stroke)",
                  }}
                  data-testid={`project-card-${i}`}
                >
                  {/* Image */}
                  <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden" style={{ borderBottom: "1px solid var(--surface-stroke)" }}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 66vw"
                      className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 scale-100 group-hover:scale-105"
                      style={{ mixBlendMode: "luminosity" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-elevated)] to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="font-label-caps px-3 py-1" style={{ background: "var(--surface-container-highest)", border: "1px solid var(--surface-stroke)", color: "var(--on-surface)" }}>
                        Live
                      </span>
                      <span className="font-label-caps px-3 py-1" style={{ background: "var(--surface-container-highest)", border: "1px solid var(--surface-stroke)", color: "var(--on-surface)" }}>
                        Shadow deploy
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-grow">
                    <h2 className="font-headline-md mb-4" style={{ color: "var(--on-surface)", fontSize: "clamp(24px, 3vw, 32px)" }}>
                      {project.title.split('—')[0]?.trim()}
                    </h2>
                    <p className="font-body-md mb-6" style={{ color: "var(--text-muted)", fontSize: "14px" }}>
                      {project.shortDescription}
                    </p>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4 mb-6 py-4" style={{ borderTop: "1px solid var(--surface-stroke)", borderBottom: "1px solid var(--surface-stroke)" }}>
                      <div>
                        <div className="font-metric-huge" style={{ color: "var(--primary)", fontSize: "clamp(24px, 3vw, 40px)" }}>284K</div>
                        <div className="font-code-sm" style={{ color: "var(--text-muted)", textTransform: "uppercase" }}>Transactions</div>
                      </div>
                      <div>
                        <div className="font-metric-huge" style={{ color: "var(--on-surface)", fontSize: "clamp(24px, 3vw, 40px)" }}>0.17%</div>
                        <div className="font-code-sm" style={{ color: "var(--text-muted)", textTransform: "uppercase" }}>Fraud rate</div>
                      </div>
                      <div>
                        <div className="font-metric-huge" style={{ color: "var(--on-surface)", fontSize: "clamp(24px, 3vw, 40px)" }}>&lt;0.2</div>
                        <div className="font-code-sm" style={{ color: "var(--text-muted)", textTransform: "uppercase" }}>Drift (PSI)</div>
                      </div>
                    </div>

                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex gap-2 flex-wrap">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="font-code-sm px-2 py-1 rounded" style={{ background: "#18181B", color: "var(--on-surface-variant)", fontSize: "12px" }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={`/projects/${project.slug}`}
                        className="font-label-caps flex items-center gap-1 transition-colors duration-200 hover:opacity-80"
                        style={{ color: "var(--primary)" }}
                      >
                        View Details <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            }

            // Side compact card (4-col) for auto-regen
            if (project.featured && project.slug === "ai-quality-assurance-financial-services") {
              return (
                <motion.article
                  key={project.slug}
                  initial={reveal.initial}
                  whileInView={reveal.whileInView}
                  viewport={reveal.viewport}
                  transition={reveal.transition}
                  className="col-span-1 md:col-span-4 flex flex-col p-8 hover:border-[rgba(78,222,163,0.5)] transition-colors duration-200"
                  style={{
                    background: "var(--surface-elevated)",
                    border: "1px solid var(--surface-stroke)",
                  }}
                  data-testid={`project-card-${i}`}
                >
                  <div className="mb-auto">
                    <div
                      className="w-12 h-12 flex items-center justify-center mb-6 rounded"
                      style={{ background: "var(--surface-container)", border: "1px solid var(--surface-stroke)", color: "var(--primary)" }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12h6M12 9v6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    </div>
                    <h3 className="font-headline-md mb-4" style={{ color: "var(--on-surface)", fontSize: "20px", lineHeight: 1.3 }}>
                      {project.title.split('for')[0]?.trim() || project.title}
                    </h3>
                    <p className="font-code-sm mb-6" style={{ color: "var(--text-muted)" }}>
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Specs */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-end pb-2" style={{ borderBottom: "1px solid var(--surface-stroke)" }}>
                      <span className="font-code-sm" style={{ color: "var(--text-muted)" }}>False Pos.</span>
                      <span className="font-label-caps" style={{ color: "var(--primary)" }}>0.0%</span>
                    </div>
                    <div className="flex justify-between items-end pb-2" style={{ borderBottom: "1px solid var(--surface-stroke)" }}>
                      <span className="font-code-sm" style={{ color: "var(--text-muted)" }}>Auto-regen</span>
                      <span className="font-label-caps" style={{ color: "var(--on-surface)" }}>&lt;5%</span>
                    </div>
                    <div className="flex justify-between items-end pb-2" style={{ borderBottom: "1px solid var(--surface-stroke)" }}>
                      <span className="font-code-sm" style={{ color: "var(--text-muted)" }}>Policy Type</span>
                      <span className="font-label-caps" style={{ color: "var(--on-surface)" }}>AND Escalation</span>
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex gap-2 items-center">
                      <span className="w-2 h-2 rounded-full" style={{ background: "var(--primary)" }} />
                      <span className="font-code-sm" style={{ color: "var(--text-muted)" }}>Audit-grade</span>
                    </div>
                    <Link href={`/projects/${project.slug}`} style={{ color: "var(--on-surface-variant)" }} className="hover:text-[var(--primary)] transition-colors">
                      <ExternalLink size={18} />
                    </Link>
                  </div>
                </motion.article>
              );
            }

            // Terminal-style card (4-col) for Indian LLM
            if (project.slug === "indian-multilingual-llm") {
              return (
                <motion.article
                  key={project.slug}
                  initial={reveal.initial}
                  whileInView={reveal.whileInView}
                  viewport={reveal.viewport}
                  transition={reveal.transition}
                  className="col-span-1 md:col-span-4 flex flex-col overflow-hidden"
                  style={{
                    background: "var(--terminal-header)",
                    border: "1px solid var(--surface-stroke)",
                    boxShadow: "inset 0 2px 10px rgba(0,0,0,0.5)",
                  }}
                  data-testid={`project-card-${i}`}
                >
                  {/* Terminal header */}
                  <div className="flex items-center px-4 py-2" style={{ background: "var(--surface-container)", borderBottom: "1px solid var(--surface-stroke)" }}>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ background: "var(--surface-stroke)" }} />
                      <div className="w-3 h-3 rounded-full" style={{ background: "var(--surface-stroke)" }} />
                      <div className="w-3 h-3 rounded-full" style={{ background: "var(--surface-stroke)" }} />
                    </div>
                    <div className="mx-auto font-code-sm" style={{ color: "var(--text-muted)", fontSize: "12px" }}>train_pipeline.py</div>
                  </div>

                  <div className="p-6 flex flex-col h-full">
                    <h3 className="font-body-md mb-3" style={{ color: "var(--on-surface)", fontSize: "20px", fontWeight: 700 }}>
                      {project.title.split('—')[0]?.trim()}
                    </h3>
                    <p className="font-code-sm mb-6 flex-grow" style={{ color: "var(--text-muted)" }}>
                      {project.shortDescription.split('.').slice(0, 2).join('.') + '.'}
                    </p>

                    <div
                      className="font-code-sm p-4 rounded mb-6"
                      style={{
                        background: "rgba(19,19,20,0.5)",
                        border: "1px solid var(--surface-stroke)",
                        color: "var(--primary)",
                        fontSize: "13px",
                      }}
                    >
                      &gt; executing finetune --model=&quot;desi-llm&quot;<br />
                      &gt; compiling LoRA weights... [OK]<br />
                      &gt; deploy --target=&quot;kaggle-hub&quot;
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="font-code-sm px-2 py-1" style={{ color: "var(--on-surface)", border: "1px solid var(--surface-stroke)", fontSize: "12px" }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={`/projects/${project.slug}`}
                        className="transition-colors duration-200 hover:text-[var(--primary)]"
                        style={{ color: "var(--on-surface-variant)" }}
                      >
                        <ExternalLink size={18} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            }

            // Horizontal visual card (8-col) for Song Recommender
            if (project.slug === "song-recommender-system") {
              return (
                <motion.article
                  key={project.slug}
                  initial={reveal.initial}
                  whileInView={reveal.whileInView}
                  viewport={reveal.viewport}
                  transition={reveal.transition}
                  className="col-span-1 md:col-span-8 flex flex-col md:flex-row overflow-hidden group"
                  style={{
                    background: "var(--surface-elevated)",
                    border: "1px solid var(--surface-stroke)",
                  }}
                  data-testid={`project-card-${i}`}
                >
                  {/* Image */}
                  <div className="w-full md:w-1/2 h-[250px] md:h-auto relative overflow-hidden" style={{ borderRight: "1px solid var(--surface-stroke)" }}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                      style={{ mixBlendMode: "screen" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[rgba(18,18,20,0.5)] to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                    <h2 className="font-headline-md mb-4" style={{ color: "var(--on-surface)", fontSize: "24px" }}>
                      {project.title}
                    </h2>
                    <p className="font-body-md mb-6" style={{ color: "var(--text-muted)", fontSize: "14px" }}>
                      {project.shortDescription}
                    </p>

                    <div className="flex flex-col gap-3 mb-8">
                      {["BPM Extraction & Analysis", "VADER Sentiment Scoring", "K-Means Clustering"].map((feat) => (
                        <div key={feat} className="flex items-center gap-3">
                          <span style={{ color: "var(--primary)", fontSize: "18px" }}>◆</span>
                          <span className="font-code-sm" style={{ color: "var(--on-surface)" }}>{feat}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center gap-4">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="font-code-sm px-4 py-2 rounded transition-colors duration-200 hover:border-[var(--primary)]"
                        style={{ border: "1px solid var(--surface-stroke)", color: "var(--on-surface)" }}
                      >
                        View Research
                      </Link>
                      <div className="flex gap-2">
                        {project.tags.slice(0, 2).map((tag, j) => (
                          <span key={tag}>
                            <span className="font-code-sm" style={{ color: "var(--text-muted)" }}>{tag}</span>
                            {j === 0 && <span className="font-code-sm ml-2" style={{ color: "var(--text-muted)" }}>·</span>}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            }

            // Default card for any remaining projects (e.g., Kaggle)
            return (
              <motion.article
                key={project.slug}
                initial={reveal.initial}
                whileInView={reveal.whileInView}
                viewport={reveal.viewport}
                transition={reveal.transition}
                className="col-span-1 md:col-span-4 flex flex-col p-6 hover:border-[rgba(78,222,163,0.5)] transition-colors duration-200"
                style={{
                  background: "var(--surface-elevated)",
                  border: "1px solid var(--surface-stroke)",
                }}
                data-testid={`project-card-${i}`}
              >
                <h3 className="font-headline-md mb-3" style={{ color: "var(--on-surface)", fontSize: "20px" }}>
                  {project.title}
                </h3>
                <p className="font-code-sm mb-6 flex-grow" style={{ color: "var(--text-muted)" }}>
                  {project.shortDescription}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: "1px solid var(--surface-stroke)" }}>
                  <div className="flex gap-2 flex-wrap">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="font-code-sm px-2 py-1 rounded" style={{ background: "#18181B", color: "var(--on-surface-variant)", fontSize: "12px" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="font-label-caps flex items-center gap-1 transition-colors hover:opacity-80"
                    style={{ color: "var(--primary)" }}
                  >
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* System-Level Focus Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-[80px] p-8 sm:p-10"
          style={{
            border: "1px solid var(--surface-stroke)",
            background: "var(--surface-elevated)",
          }}
        >
          <h3 className="font-headline-md mb-6" style={{ color: "var(--on-surface)", fontSize: "24px" }}>
            System-Level Focus
          </h3>
          <p className="font-body-md mb-6" style={{ color: "var(--text-muted)", fontSize: "14px" }}>
            These projects represent three pillars of a coherent ML systems narrative, with decision-aware control and auditability:
          </p>
          <ul className="space-y-4 mb-8 font-body-md" style={{ color: "var(--text-muted)", fontSize: "14px" }}>
            <li className="flex items-start gap-3">
              <span className="font-code-sm mt-0.5" style={{ color: "var(--primary)" }}>[01]</span>
              <span><strong style={{ color: "var(--on-surface)" }}>Inference:</strong> LLM Control System → Runtime behavioral guardrails</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-code-sm mt-0.5" style={{ color: "var(--primary)" }}>[02]</span>
              <span><strong style={{ color: "var(--on-surface)" }}>Evaluation:</strong> Fraud System → Drift detection and automated lifecycle management</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-code-sm mt-0.5" style={{ color: "var(--primary)" }}>[03]</span>
              <span><strong style={{ color: "var(--on-surface)" }}>Governance:</strong> LLM Output Validation System → Post-deployment validation layer for LLM outputs</span>
            </li>
          </ul>
          <div className="p-5" style={{ border: "1px solid var(--primary)", background: "rgba(78, 222, 163, 0.05)" }}>
            <p className="font-body-md" style={{ color: "var(--on-surface)", fontSize: "14px" }}>
              Together, they reflect a focus on building ML systems that are:
              <br className="hidden sm:block" />
              <span style={{ color: "var(--primary)" }}> observable, controllable, and production-ready.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
