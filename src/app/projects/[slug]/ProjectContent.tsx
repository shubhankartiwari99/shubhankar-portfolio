"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink, Calendar, Zap, Code, Lightbulb, AlertTriangle } from "lucide-react";
import type { Project } from "@/data/projects";

interface Props {
  project: Project;
}

export default function ProjectContent({ project }: Props) {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--fg)" }}>
      {/* Hero Section */}
      <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, var(--bg) 0%, transparent 50%, var(--bg) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 -mt-32 relative z-10 pb-24">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/#projects"
            data-testid="project-back-link"
            className="inline-flex items-center gap-1.5 font-mono text-sm transition-colors duration-200 mb-8"
            style={{ color: "var(--muted-fg)" }}
          >
            <ArrowLeft size={14} />
            back to projects
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className="font-mono text-xs px-2.5 py-1 rounded-full"
              style={{
                background: project.status === "Active" ? "rgba(34, 197, 94, 0.15)" :
                           project.status === "In Progress" ? "var(--accent-dim)" :
                           "rgba(100, 100, 100, 0.15)",
                color: project.status === "Active" ? "#22c55e" :
                       project.status === "In Progress" ? "var(--accent)" :
                       "var(--muted)",
              }}
            >
              {project.status}
            </span>
            <span className="font-mono text-xs flex items-center gap-1" style={{ color: "var(--muted-fg)" }}>
              <Calendar size={12} />
              {project.year}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {project.title}
          </h1>

          <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
            {project.shortDescription}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 mb-12">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="project-github-link"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-mono rounded-full border transition-colors duration-200"
                style={{ color: "var(--fg)", borderColor: "var(--border)" }}
              >
                <Github size={16} />
                View Source
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="project-external-link"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-mono rounded-full transition-colors duration-200"
                style={{ background: "var(--accent)", color: "var(--bg)" }}
              >
                <ExternalLink size={16} />
                View Live
              </a>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-12">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs px-3 py-1.5 rounded-full border"
                style={{ color: "var(--muted)", borderColor: "var(--border)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Full Description */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-12"
        >
          <div className="prose-custom">
            {project.fullDescription.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-base leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
                {paragraph}
              </p>
            ))}
          </div>
        </motion.section>

        {/* Highlights */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <Zap size={18} style={{ color: "var(--accent)" }} />
            <h2 className="text-xl font-semibold">Key Highlights</h2>
          </div>
          <ul className="space-y-3">
            {project.highlights.map((highlight, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm leading-relaxed"
                style={{ color: "var(--muted)" }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                  style={{ background: "var(--accent)" }}
                />
                {highlight}
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Tech Stack */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <Code size={18} style={{ color: "var(--accent)" }} />
            <h2 className="text-xl font-semibold">Tech Stack</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {project.techStack.map((stack, i) => (
              <div
                key={i}
                className="rounded-xl border p-4"
                style={{ borderColor: "var(--border)", background: "var(--surface)" }}
              >
                <h3 className="font-mono text-xs uppercase tracking-wider mb-3" style={{ color: "var(--accent)" }}>
                  {stack.category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {stack.items.map((item) => (
                    <span
                      key={item}
                      className="font-mono text-xs px-2 py-1 rounded-md"
                      style={{ color: "var(--muted)", background: "var(--bg)" }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Challenges */}
        {project.challenges && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={18} style={{ color: "var(--accent)" }} />
              <h2 className="text-xl font-semibold">Challenges</h2>
            </div>
            <ul className="space-y-3">
              {project.challenges.map((challenge, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm leading-relaxed"
                  style={{ color: "var(--muted)" }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                    style={{ background: "var(--muted-fg)" }}
                  />
                  {challenge}
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        {/* Learnings */}
        {project.learnings && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb size={18} style={{ color: "var(--accent)" }} />
              <h2 className="text-xl font-semibold">Key Learnings</h2>
            </div>
            <ul className="space-y-3">
              {project.learnings.map((learning, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm leading-relaxed"
                  style={{ color: "var(--muted)" }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                    style={{ background: "#22c55e" }}
                  />
                  {learning}
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        {/* Back to projects */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="pt-8 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-mono text-sm transition-colors duration-200"
            style={{ color: "var(--accent)" }}
          >
            <ArrowLeft size={14} />
            View all projects
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
