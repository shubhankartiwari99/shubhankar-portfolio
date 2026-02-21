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
            if (isBlock) {
              return (
                <code
                  className="block font-mono text-sm p-4 rounded-xl overflow-x-auto mb-5"
                  style={{ background: "#18181b", color: "#a1a1aa", border: "1px solid var(--border)" }}
                >
                  {children}
                </code>
              );
            }
            return (
              <code
                className="font-mono text-sm px-1.5 py-0.5 rounded"
                style={{ background: "var(--accent-dim)", color: "var(--accent)" }}
              >
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="mb-5 rounded-xl overflow-hidden">{children}</pre>
          ),
          blockquote: ({ children }) => (
            <blockquote
              className="pl-4 my-5"
              style={{ borderLeft: "2px solid var(--accent)", color: "var(--muted)" }}
            >
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-8" style={{ borderColor: "var(--border)" }} />,
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors duration-200"
              style={{ color: "var(--accent)" }}
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
