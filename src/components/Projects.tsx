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
    <section data-testid="projects-section" id="projects" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div {...reveal}>
          <p className="font-mono text-xs tracking-widest uppercase mb-10" style={{ color: "var(--accent)" }}>
            Projects
          </p>
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
              <Link href={`/projects/${project.slug}`} className="block">
                <div className={`relative overflow-hidden ${project.featured ? "h-48" : "h-36"}`}>
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

                <div className="p-6 -mt-8 relative">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold transition-colors duration-300 group-hover:text-[var(--accent)]" style={{ color: "var(--fg)" }}>
                      {project.title}
                    </h3>
                    <div className="flex gap-2 flex-shrink-0">
                      {project.github && (
                        <span
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.open(project.github, "_blank");
                          }}
                          data-testid={`project-github-${i}`}
                          className="p-1.5 rounded-md border transition-all duration-300 cursor-pointer hover:border-[var(--accent)] hover:text-[var(--accent)]"
                          style={{ color: "var(--muted)", borderColor: "var(--border)" }}
                        >
                          <Github size={14} />
                        </span>
                      )}
                      {project.link && (
                        <span
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.open(project.link, "_blank");
                          }}
                          data-testid={`project-link-${i}`}
                          className="p-1.5 rounded-md border transition-all duration-300 cursor-pointer hover:border-[var(--accent)] hover:text-[var(--accent)]"
                          style={{ color: "var(--muted)", borderColor: "var(--border)" }}
                        >
                          <ExternalLink size={14} />
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm mt-3 leading-relaxed" style={{ color: "var(--muted)" }}>
                    {project.shortDescription}
                  </p>
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
                    <span
                      className="text-xs font-mono flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{ color: "var(--accent)" }}
                    >
                      View details <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
