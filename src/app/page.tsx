"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Client-only background (WebGL)
const BackgroundCanvas = dynamic(
  () => import("../components/BackgroundCanvas"),
  { ssr: false }
);

export default function Page() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [expOpen, setExpOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Initialize theme AFTER mount
  useEffect(() => {
    setMounted(true);

    try {
      const stored = localStorage.getItem("theme");
      if (stored === "dark") return setDark(true);
      if (stored === "light") return setDark(false);
    } catch {}

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDark(true);
    }
  }, []);

  // Apply theme to <html>
  useEffect(() => {
    if (!mounted) return;

    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";

    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {}
  }, [dark, mounted]);

  // Header scroll effect
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main
      className="
        relative min-h-screen px-6
        pt-[calc(env(safe-area-inset-top)+7rem)]
        sm:pt-24
        bg-transparent
        text-gray-900 dark:text-gray-100
      "
    >
      <BackgroundCanvas />

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-20 transition-all duration-300 ${
          scrolled
            ? "bg-black/60 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <div className="font-semibold">Shubhankar Tiwari</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Software Engineer · Distributed Systems · FinTech Infrastructure
            </div>
          </div>

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
          Backend Systems · Production Engineering · Applied AI
        </p>

        <div className="mt-10 space-y-3 text-2xl md:text-3xl font-medium">
          <p>Reliable systems.</p>
          <p>Owned and shipped.</p>
          <p>Scales simply.</p>
        </div>

        <div className="mt-6 flex gap-4 sm:hidden">
          <a
            href="https://www.linkedin.com/in/shubhankar-tiwari-514040165/"
            className="text-sm px-4 py-2 rounded-full border border-gray-600"
          >
            LinkedIn
          </a>
          <a
            href="/Shubhankar_Tiwari_Resume.pdf"
            className="text-sm px-4 py-2 rounded-full bg-indigo-600 text-white"
          >
            Resume
          </a>
        </div>
      </section>
      
      {/* About */}
      <section className="mt-24 max-w-5xl mx-auto">
        <h2 className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-6">
          About
        </h2>
        
        <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
          <p>
            I build backend systems that survive production. My work spans API design,
            CI/CD pipelines, containerized deployments, and production incident triage
            in enterprise fintech environments.
          </p>
          <p>
            I focus on reliability, observability, and long-term maintainability,
            ensuring systems remain stable under scale and operational stress.
          </p>
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
            <div className="text-gray-400 text-xl">
              {expOpen ? "−" : "+"}
            </div>
          </div>

          {expOpen && (
            <div className="mt-6 text-sm text-gray-700 dark:text-gray-300">
              {recruiterMode ? (
              <ul className="list-disc pl-5 space-y-2">
                <li>Design and maintain Java backend services for corporate banking workflows</li>
                <li>Own CI/CD deployments and OpenShift production releases</li>
                <li>Lead incident triage across SSL, database, and pipeline failures</li>
                <li>Drive system stabilization and performance improvements</li>
              </ul>
              ) : (
                <div className="leading-relaxed space-y-3">
                  <p>
                    Building and stabilizing large-scale Java backend systems used in
                    corporate banking workflows, with emphasis on correctness and resilience.
                  </p>
                  <p>
                    Involved in production debugging, release validation, and cross-team
                    coordination during live incidents and high-risk deployments.
                  </p>
                  <p>
                    Focused on long-term maintainability and reliability in high-availability environments.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      
      {/* Selected Engineering Work */}
      <section className="mt-24 max-w-5xl mx-auto">
        <h2 className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-6">
          Selected Engineering Work
        </h2>
        
        <ul className="list-disc pl-5 text-sm space-y-3 text-gray-700 dark:text-gray-300">
          <li>
            Led production triage for deployment and SSL failures, coordinating multi-team resolution under release pressure.
          </li>
          <li>
            Onboarded new services to OpenShift production environments including certificate management and release validation.
          </li>
          <li>
            Diagnosed and resolved database connectivity and service dependency disruptions.
          </li>
          <li>
            Supported load testing and stability improvements in high-availability systems.
          </li>
        </ul>
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

      {/* Engineering Principles */}
      <section className="mt-24 max-w-5xl mx-auto">
        <h2 className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-6">
          Engineering Principles
        </h2>
        
        <ul className="list-disc pl-5 text-sm space-y-3 text-gray-700 dark:text-gray-300">
          <li>Reliability over hype</li>
          <li>Deterministic systems over black-box magic</li>
          <li>Production readiness over prototype excitement</li>
          <li>Root-cause analysis over surface patching</li>
        </ul>
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
