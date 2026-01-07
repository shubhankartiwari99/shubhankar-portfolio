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
    <main className="relative min-h-screen px-6 bg-transparent text-gray-900 dark:text-gray-100">
      <BackgroundCanvas />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <div className="font-semibold">Shubhankar Tiwari</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Backend Engineer · FinTech · Applied AI
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
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

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/shubhankar-tiwari-514040165/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition"
            >
              LinkedIn
            </a>

            {/* Resume */}
            <a
              href="/Shubhankar_Tiwari_Resume.pdf"
              target="_blank"
              className="text-sm text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition"
            >
              Resume
            </a>

            {/* Dark mode toggle */}
            {mounted && (
              <button
                onClick={() => setDark((d) => !d)}
                aria-pressed={dark}
                aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
                className="relative inline-flex items-center h-8 w-14 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
      <section className="min-h-screen flex flex-col justify-center max-w-5xl mx-auto pt-24">
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
          className="cursor-pointer rounded-2xl border border-gray-200 dark:border-gray-700 p-6 transition hover:border-indigo-400 dark:hover:border-indigo-500"
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
                  <li>Stability, performance tuning, incident resolution</li>
                  <li>Cross-team engineering collaboration</li>
                </ul>
              ) : (
                <div className="leading-relaxed space-y-3">
                  <p>
                    Working on large-scale Java backend systems used across
                    corporate banking workflows, with a focus on reliability,
                    correctness, and long-term maintainability.
                  </p>
                  <p>
                    Involved in API development, system redesigns, production
                    debugging, and cross-team collaboration.
                  </p>
                  <p>
                    Regularly handle live issues, performance improvements, and
                    platform stability initiatives.
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
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <h3 className="font-semibold mb-2">Backend Systems</h3>
            {recruiterMode ? (
              <ul className="list-disc pl-5 text-sm space-y-1 text-gray-700 dark:text-gray-300">
                <li>Java backend services</li>
                <li>Spring Framework</li>
                <li>REST APIs</li>
                <li>System design & refactoring</li>
              </ul>
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Java, Spring Framework, REST APIs, system design, refactoring
                legacy services.
              </p>
            )}
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <h3 className="font-semibold mb-2">Data & Persistence</h3>
            {recruiterMode ? (
              <ul className="list-disc pl-5 text-sm space-y-1 text-gray-700 dark:text-gray-300">
                <li>Oracle SQL</li>
                <li>TOAD</li>
                <li>Data modeling</li>
                <li>Query optimization</li>
              </ul>
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Oracle SQL, TOAD, data modeling, query optimization.
              </p>
            )}
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <h3 className="font-semibold mb-2">Platform & DevOps</h3>
            {recruiterMode ? (
              <ul className="list-disc pl-5 text-sm space-y-1 text-gray-700 dark:text-gray-300">
                <li>CI/CD pipelines</li>
                <li>Containerized deployments</li>
                <li>Environment configuration</li>
              </ul>
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-300">
                CI/CD pipelines, containerized deployments, environment
                configuration.
              </p>
            )}
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <h3 className="font-semibold mb-2">Reliability & Delivery</h3>
            {recruiterMode ? (
              <ul className="list-disc pl-5 text-sm space-y-1 text-gray-700 dark:text-gray-300">
                <li>Production debugging</li>
                <li>Performance tuning</li>
                <li>Incident resolution</li>
                <li>Cross-team collaboration</li>
              </ul>
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Production debugging, performance tuning, incident resolution,
                cross-team collaboration.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="mt-24 max-w-5xl mx-auto mb-24">
        <h2 className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-4">
          Education
        </h2>

        <div className="text-sm text-gray-700 dark:text-gray-300">
          <p className="font-medium">
            B.Tech, Computer Science and Engineering
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            SRM Institute of Science and Technology, Chennai · 2018 – 2022
          </p>
        </div>
      </section>
    </main>
  );
}
