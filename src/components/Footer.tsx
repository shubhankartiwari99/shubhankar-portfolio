"use client";

const links = [
  { href: "https://github.com/shubhankartiwari99", label: "GITHUB" },
  { href: "https://www.linkedin.com/in/shubhankar-tiwari-514040165/", label: "LINKEDIN" },
  { href: "https://www.kaggle.com/shubhankartiwari", label: "KAGGLE" },
  { href: "mailto:st3907@columbia.edu", label: "COLUMBIA" },
];

export default function Footer() {
  return (
    <footer
      data-testid="footer"
      className="w-full py-4 px-5 md:px-8 flex flex-col md:flex-row justify-between items-center mt-[80px] md:mt-[160px]"
      style={{
        borderTop: "1px solid var(--surface-stroke)",
        background: "var(--bg)",
        maxWidth: "1280px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <p className="font-label-caps mb-4 md:mb-0" style={{ color: "var(--text-muted)" }}>
        © {new Date().getFullYear()} SHUBHANKAR TIWARI. ALL RIGHTS RESERVED.
      </p>

      <div className="flex items-center gap-6">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={`footer-${link.label.toLowerCase()}`}
            className="font-code-sm transition-colors duration-200 hover:text-[var(--primary-fixed)]"
            style={{ color: "var(--text-muted)", opacity: 0.8 }}
            title={link.label}
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
