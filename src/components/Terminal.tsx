"use client";

import { useState, useRef, useEffect, useCallback, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { TerminalSquare } from "lucide-react";

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
  Software Engineer I A @ Bank of America (2022-Present)
  Building production-grade backend systems for enterprise fintech.
  Kaggle Notebooks Expert (Rank #2,913 / 59,240)
  B.Tech CSE, SRM IST, Chennai (94.4% GPA)
  Exploring applied AI & building Indian Multilingual LLM.`,

  experience: `  [1] Software Engineer I A -- Bank of America
      Apr 2022 - Present | Backend / Platform Engineering
      Java, Spring Boot, REST APIs, OpenShift, CI/CD, SQL

  [2] Product Development Trainee -- HighRadius Technologies
      Aug 2021 - Mar 2022 | Full-Stack Development
      Java, JavaScript, Python, Agile`,

  "ls projects/": `  drwxr-xr-x  indian-desi-llm/       Multilingual LLM inference + persona safety CI
  drwxr-xr-x  song-recommender/      ML playlist gen based on heart rate (BPM)
  drwxr-xr-x  kaggle-portfolio/      33 notebooks | 10 datasets | 3 models`,

  "cat skills": `{
  "backend":  ["Java", "Spring Boot", "Microservices", "REST APIs", "System Design"],
  "data":     ["Oracle SQL", "TOAD", "Data Modeling", "Query Optimization"],
  "devops":   ["OpenShift", "Jenkins", "CI/CD", "Containerization"],
  "ml_ai":    ["Python", "ML", "Deep Learning", "Computer Vision", "NLP", "LLMs"]
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
    /_|_____|_\\ Uptime: 3+ years
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
    <section data-testid="terminal-section" id="terminal" className="py-20 sm:py-24 lg:py-32 px-5 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div {...reveal}>
          <h2 className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase mb-8 sm:mb-10" style={{ color: "var(--accent)" }}>
            Interactive Terminal
          </h2>
        </motion.div>

        <motion.div
          {...reveal}
          className="rounded-2xl border overflow-hidden"
          style={{ borderColor: "var(--border)" }}
        >
          {/* Title bar */}
          <div
            className="flex items-center gap-2 px-4 py-3 border-b"
            style={{ background: "#1a1a1e", borderColor: "var(--border)" }}
          >
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
            </div>
            <div className="flex-1 text-center">
              <span className="font-mono text-xs" style={{ color: "#71717a" }}>
                <TerminalSquare size={12} className="inline mr-1.5 -mt-0.5" />
                shubhankar.sh
              </span>
            </div>
          </div>

          {/* Terminal body */}
          <div
            ref={scrollRef}
            data-testid="terminal-output"
            className="p-4 font-mono text-xs sm:text-sm h-72 sm:h-80 overflow-y-auto cursor-text"
            style={{ background: "#0c0c0e", color: "#a1a1aa" }}
            onClick={() => inputRef.current?.focus()}
          >
            {lines.map((line, i) => (
              <div key={i} className="whitespace-pre-wrap mb-1">
                {line.type === "input" ? (
                  <span>
                    <span style={{ color: "#34d399" }}>visitor</span>
                    <span style={{ color: "#71717a" }}>@</span>
                    <span style={{ color: "#f59e0b" }}>portfolio</span>
                    <span style={{ color: "#71717a" }}> $ </span>
                    <span style={{ color: "#e4e4e7" }}>{line.text}</span>
                  </span>
                ) : line.type === "error" ? (
                  <span style={{ color: "#f87171" }}>{line.text}</span>
                ) : line.type === "system" ? (
                  <span style={{ color: "#71717a" }}>{line.text}</span>
                ) : (
                  <span>{line.text}</span>
                )}
              </div>
            ))}

            {/* Input line */}
            <div className="flex items-center">
              <span style={{ color: "#34d399" }}>visitor</span>
              <span style={{ color: "#71717a" }}>@</span>
              <span style={{ color: "#f59e0b" }}>portfolio</span>
              <span style={{ color: "#71717a" }}> $ </span>
              <input
                ref={inputRef}
                data-testid="terminal-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none font-mono text-xs sm:text-sm caret-amber-400"
                style={{ color: "#e4e4e7" }}
                autoComplete="off"
                spellCheck={false}
                aria-label="Terminal input"
              />
            </div>
          </div>
        </motion.div>

        <p className="font-mono text-xs mt-4 text-center" style={{ color: "var(--muted-fg)" }}>
          Try: help, about, ls projects/, cat skills, neofetch
        </p>
      </div>
    </section>
  );
}
