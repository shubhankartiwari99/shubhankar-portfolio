"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Client-only background (WebGL)
const BackgroundCanvas = dynamic(
  () => import("../components/BackgroundCanvas"),
  { ssr: false }
);

export default function Page() {
  // -----------------------------
  // Theme & UI state
  // -----------------------------
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [expOpen, setExpOpen] = useState(false);

  // Initialize theme AFTER mount
  useEffect(() => {
    setMounted(true);

    try {
      const stored = localStorage.getItem("theme");
      if (stored === "dark") {
        setDark(true);
        return;
      }
      if (stored === "light") {
        setDark(false);
        return;
      }
    } catch {}

    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setDark(true);
    }
  }, []);

  // Apply theme to <html>
  useEffect(() => {
    if (!mounted) return;

    if (dark) {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
    }

    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {}
  }, [dark, mounted]);

  return (
    <main className="relative min-h-screen px-6 pt-28 sm:pt-24 bg-transparent text-gray-900 dark:text-gray-100">
      <BackgroundCanvas />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-20 bg-black/60 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Identity */}
          <div>
            <div className="font-semibold">Shubhankar Tiwari</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
              Backend Engineer · FinTech · Applied AI
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setRecruiterMode((v) => !v)}
              aria-pressed={recruiterMode}
              className={`px-3 py-1.5 text-xs rounded-full border transition ${
                recruiterMode
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300"
              }`}
            >
              Recruiter mode
            </button>

            {/* Desktop-only links */}
            <a
              href="https://www.linkedin.com/in/shubhankar-tiwari-514040165/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline text-sm text-gray-500 hover:text-indigo-400"
            >
              LinkedIn
            </a>

            <a
              href="/Shubhankar_Tiwari_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline text-sm text-gray-500 hover:text-indigo-400"
            >
              Resume
            </a>

            {/* Dark mode toggle */}
            {mounted && (
              <button
                onClick={() => setDark((d) => !d)}
                aria-pressed={dark}
                aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
                className="relative inline-flex items-center h-8 w-14 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <span
                  aria-hidden
                  className={`block h-6 w-full rounded-full transition-colors duration-200 ${
                    dark ? "bg-indigo-600" : "bg-gray-200"
                  }`}
                />
                <span
                  aria-hidden
                  className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ${
                    dark ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          Hi, I’m <span className="text-indigo-500">Shubhankar</span>.
        </h1>

        <p className="mt-6 text-xl md:text-2xl text-gray-600 dark:text-gray-300">
          Backend Engineer · FinTech · Applied AI
        </p>

        <div className="mt-10 space-y-3 text-2xl md:text-3xl font-medium">
          <p>Reliable systems.</p>
          <p>Owned and shipped.</p>
          <p>Scales simply.</p>
        </div>
      </section>

      {/* Experience */}
      <section className="mt-24 max-w-5xl mx-auto">
        <h2 className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-6">
          Experience
        </h2>

        <div
          onClick={() => setExpOpen((v) => !v)}
          className="cursor-pointer rounded-2xl border border-gray-200 dark:border-gray-700 p-6 transition hover:border-indigo-400"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">
                Software Engineer I A — Bank of America
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                2022 – Present · Backend / Platform Engineering
              </p>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                Production systems supporting corporate banking clients.
              </p>
            </div>
            <div className="text-gray-400 text-xl">{expOpen ? "−" : "+"}</div>
          </div>

          {expOpen && (
            <div className="mt-6 text-sm text-gray-700 dark:text-gray-300">
              {recruiterMode ? (
                <ul className="list-disc pl-5 space-y-2">
                  <li>Backend Java services for corporate banking workflows</li>
                  <li>API development, redesigns, and production support</li>
                  <li>Performance tuning and incident resolution</li>
                  <li>Cross-team engineering collaboration</li>
                </ul>
              ) : (
                <div className="space-y-3 leading-relaxed">
                  <p>
                    Working on large-scale Java backend systems with a focus on
                    reliability and long-term maintainability.
                  </p>
                  <p>
                    Involved in API development, system redesigns, production
                    debugging, and cross-team collaboration.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Skills */}
      <section className="mt-24 max-w-5xl mx-auto">
        <h2 className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-8">
          Skills & Capabilities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Backend Systems",
              body: "Java, Spring Framework, REST APIs, system design, refactoring legacy services.",
            },
            {
              title: "Data & Persistence",
              body: "Oracle SQL, TOAD, data modeling, query optimization.",
            },
            {
              title: "Platform & DevOps",
              body: "CI/CD pipelines, containerized deployments, environment configuration.",
            },
            {
              title: "Reliability & Delivery",
              body: "Production debugging, performance tuning, incident resolution, collaboration.",
            },
          ].map((s) => (
            <div
              key={s.title}
              className="rounded-xl border border-gray-200 dark:border-gray-700 p-5"
            >
              <h3 className="font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
