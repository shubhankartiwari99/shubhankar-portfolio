"use client";

import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

export default function Hero() {
  return (
    <section data-testid="hero-section" className="min-h-screen flex flex-col justify-center relative px-5 sm:px-6 overflow-hidden">
      <div
        className="absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 90% 70% at 50% 40%, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 50% 40%, black 20%, transparent 75%)",
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
            I build backend systems that hold in production — and evaluate whether AI ones will too.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap items-center gap-3 sm:gap-4"
        >
          {/* Primary CTA — scroll to projects, not duplicate email */}
          <a
            href="#projects"
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
            View my work
          </a>

          <a
            href="/Shubhankar_Tiwari_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 text-sm font-medium rounded-lg border transition-all duration-300"
            style={{ 
              borderColor: "var(--border)", 
              color: "var(--muted)",
              background: "transparent" 
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.color = "var(--accent)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--muted)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Download Resume
          </a>

          {/* Social icon links */}
          {[
            { href: "https://github.com/shubhankartiwari99", label: "GitHub", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg> },
            { href: "https://www.linkedin.com/in/shubhankar-tiwari-514040165/", label: "LinkedIn", icon: <Linkedin size={16} /> },
            { href: "https://www.kaggle.com/shubhankartiwari", label: "Kaggle", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.281.18.046.149.034.238-.036.27l-6.555 6.636 6.793 8.344c.07.093.082.186.036.278z"/></svg> },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="p-3 rounded-lg border transition-all duration-300 flex items-center justify-center"
              style={{ borderColor: "var(--border)", color: "var(--muted)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--muted)";
              }}
            >
              {link.icon}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
