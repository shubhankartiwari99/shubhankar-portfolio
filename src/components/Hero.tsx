"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";

const socials = [
  { href: "https://github.com/shubhankartiwari99", icon: <Github size={18} />, label: "GitHub" },
  { href: "https://www.linkedin.com/in/shubhankar-tiwari-514040165/", icon: <Linkedin size={18} />, label: "LinkedIn" },
  {
    href: "https://www.kaggle.com/shubhankartiwari",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.281.18.046.149.034.238-.036.27l-6.555 6.636 6.793 8.344c.07.093.082.186.036.278z" />
      </svg>
    ),
    label: "Kaggle",
  },
  { href: "mailto:tiwarishubhankar@gmail.com", icon: <Mail size={18} />, label: "Email" },
];

export default function Hero() {
  return (
    <section data-testid="hero-section" className="min-h-screen flex flex-col justify-center relative px-5 sm:px-6">
      <div
        className="absolute inset-0 -z-10 dot-grid opacity-40"
        style={{
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 -z-10 glow-accent" />

      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="font-mono text-xs sm:text-sm mb-5 sm:mb-6" style={{ color: "var(--accent)" }}>
            Software Engineer @ Bank of America
          </p>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-[0.95]">
            Shubhankar
            <br />
            <span style={{ color: "var(--muted)" }}>Tiwari</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
          className="mt-7 sm:mt-8 text-base sm:text-lg max-w-xl leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          I build backend systems that survive production.
          <br className="hidden sm:block" />
          Kaggle Notebooks Expert. Exploring applied AI.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center gap-2.5 sm:gap-3"
        >
          {socials.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={link.label}
              data-testid={`social-${link.label.toLowerCase()}`}
              className="p-2.5 rounded-lg border transition-colors duration-200"
              style={{ color: "var(--muted)", borderColor: "var(--border)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--muted)";
              }}
              title={link.label}
            >
              {link.icon}
            </a>
          ))}
          <a
            href="/Shubhankar_Tiwari_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="sm:hidden ml-1 px-3.5 py-2 text-xs font-mono rounded-full border transition-colors duration-200"
            style={{ color: "var(--muted)", borderColor: "var(--border)" }}
          >
            resume.pdf
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <ArrowDown size={16} className="animate-bounce" style={{ color: "var(--muted-fg)" }} />
      </motion.div>
    </section>
  );
}
