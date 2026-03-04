"use client";

import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

export default function Hero() {
  return (
    <section data-testid="hero-section" className="min-h-screen flex flex-col justify-center relative px-5 sm:px-6 overflow-hidden">
      <div
        className="absolute inset-0 -z-10 dot-grid opacity-20"
        style={{
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 70%)",
        }}
      />

      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] -z-10"
        style={{
          background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-5xl xl:max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl xl:text-9xl font-bold tracking-tight leading-[0.9] mb-8">
            Shubhankar
            <br />
            <span style={{ color: "var(--accent)" }}>Tiwari</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl max-w-2xl leading-relaxed mb-10" style={{ color: "var(--muted)" }}>
            I architect and build backend systems that scale without friction
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap items-center gap-3 sm:gap-4"
        >
          <a
            href="mailto:tiwarishubhankar@gmail.com"
            className="px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300"
            style={{
              background: "var(--accent)",
              color: "var(--bg)",
              boxShadow: "0 0 20px var(--accent-glow)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 30px var(--accent-glow)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 20px var(--accent-glow)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Get in touch
          </a>

          <a
            href="https://www.linkedin.com/in/shubhankar-tiwari-514040165/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 text-sm font-medium rounded-lg border transition-all duration-300 flex items-center gap-2"
            style={{
              borderColor: "var(--border)",
              color: "var(--fg)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--fg)";
            }}
          >
            <Linkedin size={16} />
            LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  );
}
