"use client";

import { useState, useEffect } from "react";
import { Cpu, ShieldCheck, Activity, RefreshCw, Zap, Play, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NodeStep {
  id: string;
  name: string;
  detail: string;
  metric: string;
  metricLabel: string;
  status: "nominal" | "warning" | "intervened" | "passed";
  codeSnippet: string;
}

const pipelines: Record<string, { title: string; steps: NodeStep[] }> = {
  "ai-reliability": {
    title: "LLM Generation Entropy & Governance Pipeline",
    steps: [
      {
        id: "input",
        name: "Streaming Ingestion",
        detail: "Extracts live probability distribution P(x_t) and calculates Shannon entropy H(x) per generated token in real-time.",
        metric: "43 Tokens",
        metricLabel: "Active Stream",
        status: "nominal",
        codeSnippet: "H(x) = -sum(P(w) * log2(P(w)))",
      },
      {
        id: "entropy",
        name: "Entropy Collapse Monitor",
        detail: "Detects step-23 entropy collapse (< 0.15 bits). Predicts catastrophic repetitive looping before completion.",
        metric: "0.145 bits",
        metricLabel: "Critical Floor (<0.15)",
        status: "warning",
        codeSnippet: "if (H_t < THRESHOLD) trigger_policy_gate()",
      },
      {
        id: "controller",
        name: "Adaptive Policy Controller",
        detail: "Dynamically clamps temperature to T=0.1 and top-p to 0.5 to break repetitive feedback without restarting generation.",
        metric: "3.1x Factor",
        metricLabel: "Variance Stabilized",
        status: "intervened",
        codeSnippet: "apply_sampling_override(T=0.1, top_p=0.5)",
      },
      {
        id: "governance",
        name: "CI/CD Promotion Gate",
        detail: "Enforces regression tests across 9 holdout rounds. Blocked 7/7 unsafe models with 0.0% false positives.",
        metric: "100% Catch",
        metricLabel: "Adversarial Block",
        status: "passed",
        codeSnippet: "assert business_loss < max_acceptable_loss",
      },
    ],
  },
  "fraud-detection": {
    title: "PSI Drift-Aware Governance & Shadow Deployment",
    steps: [
      {
        id: "ingest",
        name: "Transaction Ingestion",
        detail: "Ingests 284K live transactions with feature distribution tracking across 28 PCA dimensions.",
        metric: "284K Txns",
        metricLabel: "Volume Stream",
        status: "nominal",
        codeSnippet: "stream.map(extract_feature_vector)",
      },
      {
        id: "drift",
        name: "PSI & KL Drift Engine",
        detail: "Calculates Population Stability Index. Flags feature shift when PSI > 0.20 on high-leverage amounts.",
        metric: "PSI 0.23",
        metricLabel: "Significant Shift",
        status: "warning",
        codeSnippet: "psi = sum((actual - expected) * ln(actual / expected))",
      },
      {
        id: "shadow",
        name: "Shadow Inference",
        detail: "Scores candidate model alongside production model simultaneously without impacting live customer transactions.",
        metric: "0.975 AUC",
        metricLabel: "Shadow Benchmark",
        status: "intervened",
        codeSnippet: "parallel_score(prod_model, candidate_model)",
      },
      {
        id: "loss-gate",
        name: "Business Loss Gate",
        detail: "Enforces 10:1 FN/FP cost matrix across 50 bootstrap sweeps before allowing canary traffic promotion.",
        metric: "10:1 Ratio",
        metricLabel: "Optimal Threshold",
        status: "passed",
        codeSnippet: "assert candidate_cost < production_cost",
      },
    ],
  },
};

export default function ArchitectureVisualizer({ projectSlug = "ai-reliability" }: { projectSlug?: string }) {
  const [activePipelineKey, setActivePipelineKey] = useState<string>("ai-reliability");
  const pipeline = pipelines[activePipelineKey] || pipelines["ai-reliability"];
  const [activeStep, setActiveStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  // Simulation run
  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStep(0);

    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (step < pipeline.steps.length) {
        setActiveStep(step);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 1100);
  };

  const currentStep = pipeline.steps[activeStep] || pipeline.steps[0];

  return (
    <div
      className="p-5 sm:p-7 rounded-2xl glass-panel relative overflow-hidden border border-[rgba(255,255,255,0.08)] bg-[rgba(9,12,21,0.85)] shadow-2xl"
    >
      {/* Background Grid Highlight */}
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />

      {/* Header Bar */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[rgba(0,255,157,0.1)] border border-[rgba(0,255,157,0.25)] text-[var(--primary)]">
            <Activity size={18} className="status-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-label-caps text-xs text-[var(--primary)] tracking-wider">
                Interactive Architecture Simulation
              </span>
              <span className="font-code-sm text-[10px] px-2 py-0.5 rounded-full bg-[rgba(0,255,157,0.1)] text-[var(--primary)] border border-[rgba(0,255,157,0.2)]">
                LIVE
              </span>
            </div>
            <h3 className="font-headline-md text-base sm:text-lg text-[var(--on-surface)] mt-0.5 font-semibold">
              {pipeline.title}
            </h3>
          </div>
        </div>

        {/* Pipeline Toggle & Simulation Trigger */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setActivePipelineKey(activePipelineKey === "ai-reliability" ? "fraud-detection" : "ai-reliability");
              setActiveStep(0);
            }}
            className="font-code-sm text-xs px-3 py-1.5 rounded-lg border border-[rgba(255,255,255,0.1)] text-[var(--text-muted)] hover:text-white hover:border-[rgba(255,255,255,0.25)] bg-[rgba(255,255,255,0.02)] transition-colors cursor-pointer"
            title="Switch pipeline architecture"
          >
            Switch: {activePipelineKey === "ai-reliability" ? "Fraud Model Drift" : "LLM Entropy"}
          </button>

          <button
            type="button"
            onClick={runSimulation}
            disabled={isSimulating}
            className={`font-code-sm text-xs px-3.5 py-1.5 rounded-lg font-semibold inline-flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
              isSimulating
                ? "bg-[rgba(0,255,157,0.2)] text-[var(--primary)] border border-[var(--primary)]"
                : "bg-[var(--primary)] text-[var(--on-primary)] hover:brightness-110 shadow-[0_0_15px_rgba(0,255,157,0.25)]"
            }`}
          >
            <Play size={12} className={isSimulating ? "animate-spin" : ""} />
            {isSimulating ? "Simulating..." : "Run Pulse"}
          </button>
        </div>
      </div>

      {/* Visual Pipeline Nodes Flow */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-4 gap-3 mb-6">
        {pipeline.steps.map((step, idx) => {
          const isSelected = activeStep === idx;
          const isWarning = step.status === "warning";
          const isIntervened = step.status === "intervened";
          const isPassed = step.status === "passed";

          return (
            <div key={step.id} className="relative">
              <button
                onClick={() => setActiveStep(idx)}
                type="button"
                className={`w-full p-3.5 rounded-xl border text-left transition-all duration-200 relative cursor-pointer ${
                  isSelected
                    ? "bg-[rgba(0,255,157,0.08)] border-[var(--primary)] text-white shadow-[0_0_20px_rgba(0,255,157,0.18)]"
                    : "bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.08)] text-[var(--text-muted)] hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.04)]"
                }`}
              >
                {/* Active Indicator Pip */}
                {isSelected && (
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--primary)]" />
                  </span>
                )}

                <div className="flex items-center justify-between mb-2">
                  <span className="font-code-sm text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                    Node 0{idx + 1}
                  </span>
                  {idx === 0 && <Cpu size={14} className="text-[var(--primary)]" />}
                  {idx === 1 && (
                    <AlertTriangle size={14} className={isWarning ? "text-amber-400" : "text-[var(--text-muted)]"} />
                  )}
                  {idx === 2 && (
                    <RefreshCw size={14} className={isIntervened ? "text-[var(--secondary)]" : "text-[var(--text-muted)]"} />
                  )}
                  {idx === 3 && (
                    <CheckCircle2 size={14} className={isPassed ? "text-[var(--primary)]" : "text-[var(--text-muted)]"} />
                  )}
                </div>

                <div className="font-headline-md text-xs font-semibold text-[var(--on-surface)] truncate mb-1">
                  {step.name}
                </div>

                <div className="font-code-sm text-[11px] text-[var(--primary)] font-bold">
                  {step.metric}
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Selected Step Detail Canvas */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activePipelineKey}-${currentStep.id}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 p-4 sm:p-5 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(6,8,14,0.7)]"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2">
                <Zap size={15} className="text-[var(--primary)]" />
                <h4 className="font-headline-md text-sm sm:text-base font-semibold text-[var(--on-surface)]">
                  {currentStep.name}
                </h4>
                <span className="font-code-sm text-[10px] px-2 py-0.5 rounded bg-[rgba(255,255,255,0.06)] text-[var(--text-muted)]">
                  Active Focus
                </span>
              </div>
              <p className="font-body-md text-xs sm:text-sm text-[var(--on-surface-variant)] leading-relaxed">
                {currentStep.detail}
              </p>
            </div>

            {/* Code & Metric Callout */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
              <div className="p-3 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(0,0,0,0.4)] font-mono text-[11px] text-[var(--secondary)]">
                <code>{currentStep.codeSnippet}</code>
              </div>

              <div className="p-3 rounded-lg border border-[rgba(0,255,157,0.2)] bg-[rgba(0,255,157,0.08)] text-right">
                <div className="font-display-xl text-base text-[var(--primary)] font-bold">
                  {currentStep.metric}
                </div>
                <div className="font-code-sm text-[10px] text-[var(--text-muted)]">
                  {currentStep.metricLabel}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
