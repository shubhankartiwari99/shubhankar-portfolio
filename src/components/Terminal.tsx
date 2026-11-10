"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal as TermIcon, Play } from "lucide-react";
import Image from "next/image";

interface HistoryItem {
  command: string;
  output: string | React.ReactNode;
}

const reveal = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

export default function TerminalComponent() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "welcome",
      output: (
        <div className="space-y-1 text-xs font-mono">
          <p className="text-[var(--primary)] font-bold">
            SHUBHANKAR TIWARI // INTELLIGENT SYSTEMS TERMINAL v2.5.0
          </p>
          <p className="text-[var(--text-muted)]">
            Type <span className="text-[var(--primary)] font-bold">&apos;help&apos;</span> to see available commands or click quick suggestions below.
          </p>
        </div>
      ),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmdStr: string) => {
    const cmd = cmdStr.trim().toLowerCase();
    let out: React.ReactNode = "";

    switch (cmd) {
      case "help":
        out = (
          <div className="space-y-1.5 text-xs font-mono text-[var(--on-surface-variant)]">
            <p className="text-[var(--primary)] font-bold">AVAILABLE COMMANDS:</p>
            <p><span className="text-emerald-400 font-semibold">about</span> &bull; Summary of background, Columbia MS AI &amp; systems engineering</p>
            <p><span className="text-emerald-400 font-semibold">resume</span> &bull; Open official PDF resume (Shubhankar_Tiwari_Resume.pdf)</p>
            <p><span className="text-emerald-400 font-semibold">patent</span> &bull; Bank of America patent application status (2026)</p>
            <p><span className="text-emerald-400 font-semibold">metrics</span> &bull; Key operational scale metrics (550K users, 18M searches, 0.975 AUC)</p>
            <p><span className="text-emerald-400 font-semibold">experience</span> &bull; 4-year Bank of America track (Apprentice → I B → I A / SME)</p>
            <p><span className="text-emerald-400 font-semibold">awards</span> &bull; BofA Global Recognition Awards (Gold, Silver, Bronze)</p>
            <p><span className="text-emerald-400 font-semibold">whoami</span> &bull; Print identity</p>
            <p><span className="text-emerald-400 font-semibold">clear</span> &bull; Clear terminal screen</p>
          </div>
        );
        break;

      case "about":
        out = (
          <p className="text-xs font-mono text-[var(--on-surface-variant)] leading-relaxed">
            Software Engineer with 4+ years building enterprise microservices for Bank of America CashPro platform. M.S. in Artificial Intelligence at Columbia University (Expected Dec 2027). Focused on AI reliability, LLM evaluation, and drift-aware model governance.
          </p>
        );
        break;

      case "resume":
      case "cv":
        out = (
          <div className="space-y-2 text-xs font-mono text-[var(--on-surface-variant)]">
            <p className="text-[var(--primary)] font-bold">OFFICIAL RESUME (PDF):</p>
            <p>Shubhankar Tiwari · M.S. in Artificial Intelligence @ Columbia University</p>
            <p>Former Software Engineer @ Bank of America (4+ Years SWE &amp; SME)</p>
            <div className="pt-1.5">
              <a
                href="/Shubhankar_Tiwari_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[rgba(0,255,157,0.12)] border border-[rgba(0,255,157,0.3)] text-[var(--primary)] hover:bg-[rgba(0,255,157,0.2)] font-bold transition-all"
              >
                📄 Open Shubhankar_Tiwari_Resume.pdf ↗
              </a>
            </div>
          </div>
        );
        break;

      case "columbia":
        out = (
          <div className="space-y-1 text-xs font-mono text-[var(--on-surface-variant)]">
            <p className="text-[var(--secondary)] font-bold">COLUMBIA AI PROGRAM</p>
            <p>M.S. in Artificial Intelligence • Aug 2026 – Dec 2027</p>
            <p>Concentration: Finance &amp; Operations</p>
            <p>Focus: ML systems, evaluation, and trustworthy deployment</p>
          </div>
        );
        break;

      case "blog":
        out = (
          <p className="text-xs font-mono text-[var(--on-surface-variant)] leading-relaxed">
            Open the blog section to explore notes on AI systems, reliability engineering, and production ML practice.
          </p>
        );
        break;

      case "patent":
        out = (
          <div className="space-y-1 text-xs font-mono text-[var(--on-surface-variant)]">
            <p className="text-amber-400 font-bold">NAMED INVENTOR &middot; PENDING BANK OF AMERICA PATENT APPLICATION (2026)</p>
            <p>Status: Application in progress</p>
            <p>Area: AI for financial services</p>
          </div>
        );
        break;

      case "metrics":
        out = (
          <div className="grid grid-cols-2 gap-2 text-xs font-mono text-[var(--on-surface-variant)]">
            <p>&bull; CashPro Users: <span className="text-[var(--primary)]">550,000+</span></p>
            <p>&bull; Searches Served: <span className="text-[var(--secondary)]">18,000,000+</span></p>
            <p>&bull; Fraud AUC-ROC: <span className="text-amber-400">0.975</span></p>
            <p>&bull; Kaggle Rank: <span className="text-[var(--tertiary)]">#2,441 / 59,663</span></p>
          </div>
        );
        break;

      case "experience":
        out = (
          <div className="space-y-1 text-xs font-mono text-[var(--on-surface-variant)]">
            <p><span className="text-[var(--primary)]">2024-2026:</span> Software Engineer I A &bull; SME CashPro Search</p>
            <p><span className="text-[var(--secondary)]">2023-2024:</span> Software Engineer I B &bull; Backend Microservices</p>
            <p><span className="text-amber-400">2022-2023:</span> Apprentice &bull; CashPro Platform</p>
          </div>
        );
        break;

      case "awards":
        out = (
          <div className="space-y-1 text-xs font-mono text-[var(--on-surface-variant)]">
            <p><span className="text-amber-400">Gold Award:</span> Backend delivery, release ownership &amp; lead</p>
            <p><span className="text-slate-300">Silver Award:</span> Cloud enablement &amp; OpenShift migration</p>
            <p><span className="text-amber-600">Bronze Award:</span> Production incident stabilization</p>
          </div>
        );
        break;

      case "whoami":
        out = (
          <div className="space-y-3">
            <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-[rgba(0,255,157,0.3)]">
              <Image 
                src="/profile-white.jpg" 
                alt="Shubhankar Tiwari Identity" 
                fill 
                className="object-cover grayscale opacity-90"
              />
              <div className="absolute inset-0 bg-[rgba(0,255,157,0.1)] mix-blend-overlay pointer-events-none" />
            </div>
            <div className="space-y-1 text-xs font-mono text-[var(--on-surface-variant)]">
              <p><span className="text-[var(--primary)] font-bold">IDENTITY:</span> Shubhankar Tiwari</p>
              <p><span className="text-[var(--secondary)] font-bold">ROLE:</span> AI Systems Engineer</p>
              <p><span className="text-amber-400 font-bold">STATUS:</span> Online &amp; Building</p>
            </div>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        return;

      default:
        out = (
          <p className="text-xs font-mono text-red-400">
            Command not recognized: &apos;{cmdStr}&apos;. Type &apos;help&apos; for available commands.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: cmdStr, output: out }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleCommand(input);
    setInput("");
  };

  return (
    <section data-testid="terminal-section" id="terminal" className="py-20 md:py-32 px-5 md:px-8 border-b border-[rgba(255,255,255,0.08)]">
      <div className="max-w-[1280px] mx-auto">
        <motion.div {...reveal} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-px bg-[var(--primary)]" />
            <span className="font-label-caps text-[var(--primary)]">Interactive CLI</span>
          </div>
          <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl text-[var(--on-surface)]">
            Systems Telemetry &amp; Terminal
          </h2>
        </motion.div>

        {/* Terminal Window */}
        <motion.div {...reveal} className="rounded-2xl overflow-hidden glass-panel border-[rgba(0,255,157,0.2)] shadow-[0_0_40px_rgba(0,0,0,0.6)] relative">
          <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(180deg,rgba(255,255,255,0.03)_0px,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_4px)] opacity-20" />
          {/* Title Bar */}
          <div className="px-5 py-3 bg-[rgba(6,8,14,0.9)] border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="font-mono text-xs text-[var(--text-muted)] ml-2">shubhankar@systems-cli:~</span>
            </div>
            <TermIcon size={16} className="text-[var(--primary)]" />
          </div>

          {/* Body Window */}
          <div className="p-6 bg-[rgba(5,7,12,0.95)] min-h-[320px] max-h-[480px] overflow-y-auto font-mono text-sm space-y-4">
            {history.map((h, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                  <span className="text-[var(--primary)]">&gt;</span>
                  <span className="text-white font-bold">{h.command}</span>
                </div>
                <div className="pl-4">{h.output}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          {/* Quick Suggestions & Prompt Bar */}
          <div className="p-4 bg-[rgba(9,12,21,0.9)] border-t border-[rgba(255,255,255,0.08)] space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-code-sm text-[10px] text-[var(--text-muted)]">QUICK COMMANDS:</span>
              {["resume", "patent", "metrics", "about", "columbia", "experience", "awards", "clear"].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => handleCommand(c)}
                  className="font-code-sm text-[11px] px-2.5 py-0.5 rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-[var(--primary)] hover:border-[var(--primary)] hover:bg-[rgba(0,255,157,0.08)] transition-all cursor-pointer"
                >
                  {c}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <span className="text-[var(--primary)] font-mono text-sm font-bold">&gt;</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type command ('help', 'patent', 'metrics')..."
                className="flex-1 bg-transparent font-mono text-xs sm:text-sm text-white focus:outline-none placeholder:text-[var(--muted-fg)]"
              />
              <button
                type="submit"
                className="p-1.5 rounded bg-[var(--primary)] text-[var(--on-primary)] hover:brightness-110 transition-colors"
                title="Execute Command"
              >
                <Play size={12} />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
