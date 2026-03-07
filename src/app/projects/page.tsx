"use client";

import Link from "next/link";
import Image from "next/image";
import { getAllProjects } from "@/data/projects";
import { ExternalLink, Github } from "lucide-react";

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--fg)" }}>
      {/* Header */}
      <header className="max-w-4xl mx-auto px-6 pt-24 pb-8">
        <Link
          href="/"
          className="font-mono text-sm transition-colors duration-200 inline-block mb-12"
          style={{ color: "var(--muted-fg)" }}
        >
          &larr; back to portfolio
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Projects</h1>
        <p className="mt-4 text-lg" style={{ color: "var(--muted)" }}>
          Everything I've built, researched, or shipped.
        </p>
      </header>

      {/* Projects */}
      <main className="max-w-4xl mx-auto px-6 pb-24">
        <div className="space-y-2">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="block group rounded-2xl border overflow-hidden transition-all duration-200"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.borderColor = "var(--accent)";
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              <div className="flex flex-col sm:flex-row">
                {/* Image strip */}
                <div className="relative sm:w-48 sm:flex-shrink-0 h-36 sm:h-auto overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 192px"
                    className="object-cover opacity-50 group-hover:opacity-65 transition-opacity duration-200"
                  />
                  <div
                    className="absolute inset-0 sm:hidden"
                    style={{ background: "linear-gradient(to top, var(--surface) 10%, transparent 60%)" }}
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span
                      className="font-mono text-[10px] px-2 py-0.5 rounded-full"
                      style={{
                        background:
                          project.status === "Active"
                            ? "rgba(34, 197, 94, 0.12)"
                            : project.status === "In Progress"
                            ? "var(--accent-dim)"
                            : "rgba(100,100,100,0.1)",
                        color:
                          project.status === "Active"
                            ? "#22c55e"
                            : project.status === "In Progress"
                            ? "var(--accent)"
                            : "var(--muted)",
                      }}
                    >
                      {project.status}
                    </span>
                    <span className="font-mono text-[10px]" style={{ color: "var(--muted-fg)" }}>
                      {project.year}
                    </span>
                  </div>

                  <h2
                    className="text-lg font-semibold leading-snug mb-2 transition-colors duration-200 group-hover:text-[var(--accent)]"
                  >
                    {project.title}
                  </h2>

                  <p className="text-sm leading-relaxed mb-3 line-clamp-2" style={{ color: "var(--muted)" }}>
                    {project.shortDescription}
                  </p>

                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] px-2 py-0.5 rounded-md"
                          style={{ color: "var(--accent)", background: "var(--accent-dim)" }}
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span
                          className="font-mono text-[10px] px-2 py-0.5 rounded-md"
                          style={{ color: "var(--muted-fg)" }}
                        >
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>

                    {/* External links — stop propagation so they don't navigate to detail page */}
                    <div className="flex gap-2" onClick={(e) => e.preventDefault()}>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 rounded-md border transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                          style={{ color: "var(--muted)", borderColor: "var(--border)" }}
                          aria-label={`GitHub — ${project.title}`}
                        >
                          <Github size={13} />
                        </a>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 rounded-md border transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                          style={{ color: "var(--muted)", borderColor: "var(--border)" }}
                          aria-label={`Live link — ${project.title}`}
                        >
                          <ExternalLink size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
