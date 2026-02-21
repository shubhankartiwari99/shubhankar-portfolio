"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Indian Desi Multilingual LLM",
    description:
      "Inference and application layer for a multilingual LLM with persona safety CI, emotional invariants, and deterministic model fingerprinting.",
    tags: ["Python", "LLM", "NLP", "CI/CD", "Transformers"],
    github: "https://github.com/shubhankartiwari99/indian-desi-llm-inference",
    featured: true,
    image:
      "https://images.pexels.com/photos/17485657/pexels-photo-17485657.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    title: "Song Recommender System",
    description:
      "ML recommender generating adaptive playlists based on heart rate (BPM) with real-time feature handling and model evaluation.",
    tags: ["Python", "ML", "Signal Processing"],
    featured: false,
    image:
      "https://images.unsplash.com/photo-1714779573250-36242918e044?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MTN8MHwxfHNlYXJjaHwzfHxzb3VuZCUyMHdhdmUlMjB2aXN1YWxpemF0aW9uJTIwYWJzdHJhY3QlMjBkYXJrfGVufDB8fHx8MTc3MTY4NjI3OXww&ixlib=rb-4.1.0&q=85",
  },
  {
    title: "Kaggle Portfolio",
    description:
      "33 notebooks, 10 datasets, 3 models. Notebooks Expert rank 2,913 / 59,240 with 9 bronze medals across ML, DL, and Computer Vision.",
    tags: ["Data Science", "ML", "Deep Learning", "CV"],
    link: "https://www.kaggle.com/shubhankartiwari",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1753998943228-73470750c597?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjV8MHwxfHNlYXJjaHw0fHxjb2RpbmclMjBzZXR1cCUyMGRhcmslMjBtb2RlJTIwbW9uaXRvcnxlbnwwfHx8fDE3NzE2ODYyODF8MA&ixlib=rb-4.1.0&q=85",
  },
];

const reveal = {
  initial: { opacity: 0, y: 16 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.4, ease: "easeOut" },
};

export default function Projects() {
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
              key={i}
              initial={reveal.initial}
              whileInView={reveal.whileInView}
              viewport={reveal.viewport}
              transition={{ ...reveal.transition, delay: i * 0.1 }}
              className={`group relative rounded-2xl border overflow-hidden transition-all duration-500 ${
                project.featured ? "md:col-span-2" : ""
              }`}
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
              data-testid={`project-card-${i}`}
            >
              <div className={`relative overflow-hidden ${project.featured ? "h-48" : "h-36"}`}>
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
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
                  <h3 className="text-lg font-semibold transition-colors duration-300" style={{ color: "var(--fg)" }}>
                    {project.title}
                  </h3>
                  <div className="flex gap-2 flex-shrink-0">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`project-github-${i}`}
                        className="p-1.5 rounded-md border transition-all duration-300"
                        style={{ color: "var(--muted)", borderColor: "var(--border)" }}
                        onClick={(e) => e.stopPropagation()}
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
                        className="p-1.5 rounded-md border transition-all duration-300"
                        style={{ color: "var(--muted)", borderColor: "var(--border)" }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-sm mt-3 leading-relaxed" style={{ color: "var(--muted)" }}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs px-2 py-0.5 rounded-md"
                      style={{ color: "var(--accent)", background: "var(--accent-dim)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
