"use client";

import ReactMarkdown from "react-markdown";

export default function BlogContent({ content }: { content: string }) {
  return (
    <div data-testid="blog-post-content" className="prose-custom">
      <ReactMarkdown
        components={{
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold mt-12 mb-4" style={{ color: "var(--fg)" }}>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold mt-8 mb-3" style={{ color: "var(--fg)" }}>
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-base leading-relaxed mb-5" style={{ color: "var(--muted)" }}>
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong style={{ color: "var(--fg)", fontWeight: 600 }}>{children}</strong>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-5 space-y-2 mb-5" style={{ color: "var(--muted)" }}>
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-5 space-y-2 mb-5" style={{ color: "var(--muted)" }}>
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-base leading-relaxed">{children}</li>
          ),
          code: ({ className, children }) => {
            const isBlock = className?.includes("language-");
            const language = className?.replace("language-", "");
            
            if (isBlock) {
              return (
                <div className="relative mb-5 group">
                  {language && (
                    <span 
                      className="absolute top-2 right-3 font-mono text-xs uppercase tracking-wider"
                      style={{ color: "#6c7086" }}
                    >
                      {language}
                    </span>
                  )}
                  <pre
                    className="font-mono text-sm p-4 pt-8 rounded-xl overflow-x-auto"
                    style={{ 
                      background: "#1e1e2e", 
                      border: "1px solid var(--border)",
                    }}
                  >
                    <code style={{ color: "#cdd6f4" }}>
                      {children}
                    </code>
                  </pre>
                </div>
              );
            }
            return (
              <code
                className="font-mono text-sm px-1.5 py-0.5 rounded-md"
                style={{ background: "var(--surface)", color: "var(--accent)" }}
              >
                {children}
              </code>
            );
          },
          pre: ({ children }) => <>{children}</>,
          blockquote: ({ children }) => (
            <blockquote
              className="border-l-2 pl-4 my-6 italic"
              style={{ borderColor: "var(--accent)", color: "var(--muted)" }}
            >
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => {
            const safeHref = href ?? "";
            const isExternal = /^https?:\/\//i.test(safeHref);

            return (
              <a
                href={safeHref}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="underline underline-offset-2 transition-colors duration-200"
                style={{ color: "var(--accent)" }}
              >
                {children}
              </a>
            );
          },
          hr: () => (
            <hr className="my-8 border-0 h-px" style={{ background: "var(--border)" }} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
