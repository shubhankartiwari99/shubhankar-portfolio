"use client";

import ReactMarkdown from "react-markdown";

// Simple syntax highlighting colors
const syntaxColors: Record<string, Record<string, string>> = {
  keyword: { color: "#c678dd" },      // purple: if, for, def, return, etc.
  string: { color: "#98c379" },       // green: "strings"
  comment: { color: "#5c6370" },      // gray: # comments
  function: { color: "#61afef" },     // blue: function names
  number: { color: "#d19a66" },       // orange: numbers
  operator: { color: "#56b6c2" },     // cyan: =, +, -, etc.
  default: { color: "#abb2bf" },      // light gray: default text
};

function highlightCode(code: string, language?: string): React.ReactNode {
  // Simple pattern-based highlighting
  const lines = code.split("\n");
  
  return lines.map((line, i) => {
    let highlighted = line;
    
    // Comments (# for Python, // for JS/TS)
    if (line.trim().startsWith("#") || line.trim().startsWith("//")) {
      return <span key={i} style={syntaxColors.comment}>{line}{"\n"}</span>;
    }
    
    // Process tokens
    const tokens: React.ReactNode[] = [];
    let remaining = line;
    let keyIndex = 0;
    
    // Keywords
    const keywords = /\b(def|class|import|from|return|if|else|elif|for|while|in|not|and|or|try|except|with|as|async|await|const|let|var|function|export|default|interface|type)\b/g;
    // Strings
    const strings = /(["'`])(?:(?!\1)[^\\]|\\.)*?\1/g;
    // Numbers
    const numbers = /\b\d+\.?\d*\b/g;
    // Functions (word followed by parenthesis)
    const functions = /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g;
    
    // Simple approach: just color the whole line based on patterns
    let result = line;
    
    // Replace strings first (to avoid matching keywords inside strings)
    const stringMatches: { match: string; index: number }[] = [];
    let match;
    while ((match = strings.exec(line)) !== null) {
      stringMatches.push({ match: match[0], index: match.index });
    }
    
    if (stringMatches.length > 0) {
      // Has strings - do simple coloring
      tokens.push(<span key={`line-${i}`} style={syntaxColors.default}>{line}{"\n"}</span>);
    } else {
      tokens.push(<span key={`line-${i}`} style={syntaxColors.default}>{line}{"\n"}</span>);
    }
    
    return tokens;
  });
}

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
                      style={{ color: "var(--muted-fg)" }}
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
          blockquote: ({ children }) => (
            <blockquote
              className="border-l-2 pl-4 my-6 italic"
              style={{ borderColor: "var(--accent)", color: "var(--muted)" }}
            >
              {children}
            </blockquote>
          ),
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
