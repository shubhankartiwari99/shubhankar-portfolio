"use client";

import { useState, useRef, useEffect, useCallback, KeyboardEvent } from "react";
import { motion } from "framer-motion";

interface Line {
  type: "input" | "output" | "error" | "system";
  text: string;
}

const COMMANDS: Record<string, string | (() => string)> = {
  help: `Available commands:
  about          Who is Shubhankar?
  experience     Work history
  ls projects/   List projects
  cat skills     Technical skills as JSON
  contact        Get in touch
  resume         Download resume
  clear          Clear terminal
  history        Command history
  whoami         Current visitor`,

  about: `> Shubhankar Tiwari
  Software Engineer @ Bank of America (2022-2026)
  Building production-grade backend systems for enterprise fintech.
  Kaggle Notebooks Expert (Rank #2,441 / 59,663)
  B.Tech CSE, SRM IST, Chennai (94.4% GPA)
  Researching LLM behavioral reliability, guardrails, & cultural alignment.`, 

  experience: `  [1] Software Engineer -- Bank of America
      Apr 2022 - Jul 2026 | Backend / Platform Engineering
      Java, Spring Boot, REST APIs, OpenShift, CI/CD, SQL

  [2] Product Development Trainee -- HighRadius Technologies
      Aug 2021 - Mar 2022 | Full-Stack Development
      Java, JavaScript, Python, Agile`,

  "ls projects/": `  drwxr-xr-x  llm-inference-eval/        Distribution shaping, guardrails, cultural alignment dose-response [Active]
  drwxr-xr-x  auto-regen-policy/         AI output quality-gating — AND policy + bootstrap calibration [Completed]
  drwxr-xr-x  indian-desi-llm/           Multilingual LLM training pipeline — pivoted to reliability eval [Completed]
  drwxr-xr-x  song-recommender/          ML playlist gen via BPM + VADER sentiment [Completed]
  drwxr-xr-x  kaggle-portfolio/          34 notebooks | #2,441 rank | 10 bronze medals [Active]`,

  "cat skills": `{
  "backend":  ["Java", "Spring Boot", "Microservices", "REST APIs", "System Design"],
  "data":     ["Oracle SQL", "TOAD", "Data Modeling", "Query Optimization"],
  "devops":   ["OpenShift", "Jenkins", "CI/CD", "Containerization"],
  "ml_ai":    ["Python", "ML", "Deep Learning", "CV", "NLP", "LLMs", "LoRA", "HuggingFace"],
  "llm_eval": ["Cultural Alignment", "Guardrails", "KL Divergence", "Distribution Shaping", "Pydantic"]
}`,

  contact: `  Email:    tiwarishubhankar@gmail.com
  GitHub:   github.com/shubhankartiwari99
  LinkedIn: linkedin.com/in/shubhankar-tiwari-514040165
  Kaggle:   kaggle.com/shubhankartiwari
  Twitter:  @Shubhankar2911`,

  whoami: () => `  visitor@shubhankartiwari.dev — thanks for stopping by!`,
};

const EASTER_EGGS: Record<string, string> = {
  "sudo hire shubhankar": `  [sudo] password verified.
  Generating offer letter... done.
  Sending onboarding invite... done.
  Welcome aboard! Starting in 3... 2... 1...`,
  "rm -rf /": `  Nice try. Production systems don't go down that easily here.`,
  "exit": `  You can check out any time you like, but you can never leave.`,
  "ping": `  PONG — 0.42ms (systems are healthy)`,
  "neofetch": `       _____   Shubhankar Tiwari
       /     \\  -------------------------
      | () () | OS:     Production Linux
       \\_____/  Host:   Bank of America
       |     |  Kernel: Java 17 + Spring Boot
      /|     |\\  Shell:  /bin/backend-eng
     /_|_____|_\\ Uptime: 4+ years
                Packages: Microservices (many)`,
};

const WELCOME = `Welcome to shubhankar.sh v1.0.0
Type 'help' for available commands.
`;

const reveal = {
  initial: { opacity: 0, y: 16 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([{ type: "system", text: WELCOME }]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const processCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines: Line[] = [{ type: "input", text: cmd }];

    if (!trimmed) return;

    if (trimmed === "clear") {
      setLines([{ type: "system", text: WELCOME }]);
      return;
    }

    if (trimmed === "history") {
      newLines.push({
        type: "output",
        text: commandHistory.length
          ? commandHistory.map((c, i) => `  ${i + 1}  ${c}`).join("\n")
          : "  No commands in history.",
      });
    } else if (trimmed === "resume") {
      newLines.push({ type: "output", text: "  Opening resume..." });
      window.open("/Shubhankar_Tiwari_Resume.pdf", "_blank");
    } else if (EASTER_EGGS[trimmed]) {
      newLines.push({ type: "output", text: EASTER_EGGS[trimmed] });
    } else if (COMMANDS[trimmed]) {
      const result = COMMANDS[trimmed];
      newLines.push({
        type: "output",
        text: typeof result === "function" ? result() : result,
      });
    } else {
      newLines.push({
        type: "error",
        text: `  command not found: ${trimmed}. Type 'help' for available commands.`,
      });
    }

    setLines((prev) => [...prev, ...newLines]);
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
  }, [commandHistory]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      processCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <section data-testid="terminal-section" id="terminal" className="py-[80px] md:py-[160px] px-5 md:px-8">
      <div className="max-w-[1280px] mx-auto">
        <motion.div {...reveal}>
          <h2 className="font-headline-lg mb-12" style={{ color: "var(--on-surface)", fontSize: "clamp(28px, 4vw, 48px)" }}>
            Interactive Terminal
          </h2>
        </motion.div>

        <motion.div
          {...reveal}
          className="overflow-hidden"
          style={{
            border: "1px solid var(--surface-stroke)",
            boxShadow: "inset 0 2px 10px rgba(0,0,0,0.3)",
          }}
        >
          {/* Title bar */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{
              background: "var(--surface-container)",
              borderBottom: "1px solid var(--surface-stroke)",
            }}
          >
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "var(--primary)" }} />
            </div>
            <div className="flex-1 text-center">
              <span className="font-code-sm" style={{ color: "var(--text-muted)" }}>
                shubhankar.sh
              </span>
            </div>
          </div>

          {/* Terminal body */}
          <div
            ref={scrollRef}
            data-testid="terminal-output"
            className="p-4 font-code-sm h-72 sm:h-80 lg:h-84 overflow-y-auto cursor-text"
            style={{ background: "var(--terminal-header)", color: "var(--on-surface-variant)" }}
            onClick={() => inputRef.current?.focus()}
          >
            {lines.map((line, i) => (
              <div key={i} className="whitespace-pre-wrap mb-1">
                {line.type === "input" ? (
                  <span>
                    <span style={{ color: "var(--primary)" }}>visitor</span>
                    <span style={{ color: "var(--text-muted)" }}>@</span>
                    <span style={{ color: "#f59e0b" }}>portfolio</span>
                    <span style={{ color: "var(--text-muted)" }}> $ </span>
                    <span style={{ color: "var(--on-surface)" }}>{line.text}</span>
                  </span>
                ) : line.type === "error" ? (
                  <span style={{ color: "var(--error)" }}>{line.text}</span>
                ) : line.type === "system" ? (
                  <span style={{ color: "var(--text-muted)" }}>{line.text}</span>
                ) : (
                  <span>{line.text}</span>
                )}
              </div>
            ))}

            {/* Input line */}
            <div className="flex items-center">
              <span style={{ color: "var(--primary)" }}>visitor</span>
              <span style={{ color: "var(--text-muted)" }}>@</span>
              <span style={{ color: "#f59e0b" }}>portfolio</span>
              <span style={{ color: "var(--text-muted)" }}> $ </span>
              <input
                ref={inputRef}
                data-testid="terminal-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none font-code-sm caret-amber-400"
                style={{ color: "var(--on-surface)" }}
                autoComplete="off"
                spellCheck={false}
                aria-label="Terminal input"
              />
            </div>
          </div>
        </motion.div>

        <p className="font-code-sm mt-4 text-center" style={{ color: "var(--text-muted)" }}>
          Try: help, about, ls projects/, cat skills, neofetch
        </p>
      </div>
    </section>
  );
}
