"use client";

import { motion } from "framer-motion";
import { Home, ArrowLeft, Terminal } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 relative">
      {/* Background grid */}
      <div
        className="absolute inset-0 -z-10 dot-grid opacity-30"
        style={{
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        {/* 404 display */}
        <div className="relative mb-8">
          <h1 
            className="text-[150px] sm:text-[200px] font-bold leading-none tracking-tighter"
            style={{ color: "var(--surface)" }}
          >
            404
          </h1>
          <div 
            className="absolute inset-0 flex items-center justify-center"
          >
            <span 
              className="text-[150px] sm:text-[200px] font-bold leading-none tracking-tighter"
              style={{ 
                color: "transparent",
                WebkitTextStroke: "2px var(--accent)",
              }}
            >
              404
            </span>
          </div>
        </div>

        {/* Terminal-style message */}
        <div 
          className="rounded-xl border p-4 mb-8 text-left font-mono text-sm"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-2 mb-3 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
            <Terminal size={14} style={{ color: "var(--accent)" }} />
            <span style={{ color: "var(--muted-fg)" }}>bash</span>
          </div>
          <div className="space-y-1">
            <p style={{ color: "var(--muted)" }}>
              <span style={{ color: "#34d399" }}>visitor</span>
              <span style={{ color: "var(--muted-fg)" }}>@</span>
              <span style={{ color: "var(--accent)" }}>portfolio</span>
              <span style={{ color: "var(--muted-fg)" }}> $ </span>
              <span style={{ color: "var(--fg)" }}>cd /requested-page</span>
            </p>
            <p style={{ color: "#f87171" }}>
              bash: cd: /requested-page: No such file or directory
            </p>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-xl font-semibold mb-3">Page not found</h2>
        <p className="text-base mb-8" style={{ color: "var(--muted)" }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            data-testid="404-home-link"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-mono rounded-full border transition-colors duration-200"
            style={{
              background: "var(--accent)",
              color: "var(--bg)",
              borderColor: "var(--accent)",
            }}
          >
            <Home size={16} />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            data-testid="404-back-button"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-mono rounded-full border transition-colors duration-200 cursor-pointer"
            style={{
              color: "var(--muted)",
              borderColor: "var(--border)",
            }}
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
      </motion.div>

      {/* Footer hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute bottom-8 font-mono text-xs"
        style={{ color: "var(--muted-fg)" }}
      >
        Error code: 404 | Page not found
      </motion.p>
    </main>
  );
}
