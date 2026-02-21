"use client";

import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const links = [
  { href: "https://github.com/shubhankartiwari99", icon: <Github size={16} />, label: "GitHub" },
  { href: "https://www.linkedin.com/in/shubhankar-tiwari-514040165/", icon: <Linkedin size={16} />, label: "LinkedIn" },
  {
    href: "https://www.kaggle.com/shubhankartiwari",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.281.18.046.149.034.238-.036.27l-6.555 6.636 6.793 8.344c.07.093.082.186.036.278z" />
      </svg>
    ),
    label: "Kaggle",
  },
  { href: "https://twitter.com/Shubhankar2911", icon: <Twitter size={16} />, label: "Twitter" },
  { href: "mailto:tiwarishubhankar@gmail.com", icon: <Mail size={16} />, label: "Email" },
];

export default function Footer() {
  return (
    <footer data-testid="footer" className="py-16 px-6 border-t" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <p className="font-mono text-xs" style={{ color: "var(--muted-fg)" }}>
            Shubhankar Tiwari &middot; {new Date().getFullYear()}
          </p>
          <a
            href="mailto:tiwarishubhankar@gmail.com"
            className="font-mono text-xs mt-1 block transition-colors duration-300"
            style={{ color: "var(--muted-fg)" }}
            data-testid="footer-email"
          >
            tiwarishubhankar@gmail.com
          </a>
        </div>

        <div className="flex items-center gap-2">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              data-testid={`footer-${link.label.toLowerCase()}`}
              className="p-2 rounded-lg transition-colors duration-300"
              style={{ color: "var(--muted)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted)"; }}
              title={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
