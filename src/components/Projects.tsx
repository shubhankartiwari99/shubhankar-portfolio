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
  const projects = getAllProjects();

  return (
    <section data-testid="projects-section" id="projects" className="py-20 sm:py-24 lg:py-32 px-5 sm:px-6">
      <div className="max-w-5xl xl:max-w-6xl mx-auto">
        <motion.div {...reveal} className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">Projects & Experiments</h2>
            <p className="text-base" style={{ color: "var(--muted)" }}>
              Selected projects and experiments
            </p>
          </div>
          <Link
            href="/projects"
            className="text-sm font-medium hidden sm:flex items-center gap-1.5 transition-colors duration-200"
            style={{ color: "var(--accent)" }}
          >
            View All Projects
            <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={reveal.initial}
              whileInView={reveal.whileInView}
              viewport={reveal.viewport}
              transition={reveal.transition}
              className={`group relative rounded-2xl border overflow-hidden transition-colors duration-200 ${
                project.featured ? "md:col-span-2" : ""
              }`}
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
              data-testid={`project-card-${i}`}
            >
              <div className={`relative overflow-hidden ${project.featured ? "h-48 lg:h-56" : "h-36 lg:h-40"}`}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes={project.featured ? "(max-width: 768px) 100vw, 896px" : "(max-width: 768px) 100vw, 448px"}
                  className="object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-300"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, var(--surface) 10%, transparent 100%)",
                  }}
                />
              </div>

              <div className="p-4 sm:p-6 lg:p-7 -mt-8 relative">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg md:text-xl font-semibold" style={{ color: "var(--fg)" }}>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="transition-colors duration-300 group-hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-sm"
                    >
                      {project.title}
                    </Link>
                  </h3>
                  <div className="flex gap-2 flex-shrink-0">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`project-github-${i}`}
                        aria-label={`View ${project.title} source on GitHub`}
                        className="p-1.5 rounded-md border transition-all duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                        style={{ color: "var(--muted)", borderColor: "var(--border)" }}
                      >
                        <Github size={14} />
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`project-link-${i}`}
                        aria-label={`Open live demo for ${project.title}`}
                        className="p-1.5 rounded-md border transition-all duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                        style={{ color: "var(--muted)", borderColor: "var(--border)" }}
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-sm md:text-[15px] lg:text-base mt-3 leading-relaxed" style={{ color: "var(--muted)" }}>
                  {project.shortDescription}
                </p>

                {project.featured && project.slug === "llm-reliability-evaluation-platform" && (
                  <div
                    className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-px border rounded-lg overflow-hidden"
                    style={{ borderColor: "var(--border)", background: "var(--border)" }}
                  >
                    {[
                      { label: "P(cultural) neutral", value: "0.0%", color: "var(--accent)" },
                      { label: "Dose gradient", value: "1.00", color: "var(--accent)" },
                      { label: "Collapse ratio", value: "0.39", color: "#f59e0b" },
                      { label: "Live inferences", value: "65", color: "#f87171" },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="px-3 py-2.5"
                        style={{ background: "var(--surface)" }}
                      >
                        <div className="font-mono text-xs font-semibold" style={{ color: stat.color }}>
                          {stat.value}
                        </div>
                        <div className="font-mono text-[10px] mt-0.5" style={{ color: "var(--muted-fg)" }}>
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs px-2 py-0.5 rounded-md"
                        style={{ color: "var(--accent)", background: "var(--accent-dim)" }}
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span
                        className="font-mono text-xs px-2 py-0.5 rounded-md"
                        style={{ color: "var(--muted-fg)" }}
                      >
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-xs lg:text-sm font-mono flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-sm"
                    style={{ color: "var(--accent)" }}
                  >
                    View details <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
