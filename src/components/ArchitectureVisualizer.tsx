"use client";

import { useState } from "react";
import { Cpu, ShieldCheck, Activity, RefreshCw, Zap } from "lucide-react";

interface NodeStep {
  id: string;
  name: string;
  detail: string;
  metric: string;
  status: "active" | "passing" | "warning" | "shielded";
}

const pipelineData: Record<string, NodeStep[]> = {
  "ai-reliability": [
    { id: "input", name: "Inference Prompt", detail: "Token-level streaming input with live entropy extraction", metric: "213 Evals", status: "active" },
    { id: "entropy", name: "Entropy Monitor", detail: "Calculates H(x) per token; detects step-23 entropy collapse (<0.15 bits)", metric: "0.145 bits", status: "warning" },
    { id: "controller", name: "Policy Controller", detail: "Triggers adaptive sampling (T=0.1, Top-p=0.5) during live generation", metric: "3.1x T-impact", status: "shielded" },
    { id: "governance", name: "CI/CD Governance", detail: "Gated evaluation blocking 7/7 unsafe candidates across 9 holdout rounds", metric: "100% Catch", status: "passing" },
  ],
  "fraud-detection": [
    { id: "ingest", name: "Transaction Stream", detail: "Real-time scoring across 284K transactions with feature shift tracing", metric: "284K Txns", status: "active" },
    { id: "drift", name: "PSI & KL Monitor", detail: "Calculates Population Stability Index & KL Divergence for feature drift", metric: "PSI Drift", status: "warning" },
    { id: "shadow", name: "Shadow Deployment", detail: "Parallel inference scoring candidate vs production model simultaneously", metric: "0.975 AUC", status: "shielded" },
    { id: "loss-gate", name: "Business Loss Gate", detail: "Evaluates 10:1 FN/FP cost weighting across 50 threshold sweeps", metric: "Cost 10:1", status: "passing" },
  ],
};

export default function ArchitectureVisualizer({ projectSlug }: { projectSlug: string }) {
  const steps = pipelineData[projectSlug] || pipelineData["ai-reliability"];
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div
      className="p-5 sm:p-6 rounded-xl border glass-panel relative overflow-hidden"
      style={{
        background: "rgba(9, 12, 21, 0.8)",
        borderColor: "rgba(0, 255, 157, 0.15)",
      }}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Activity size={16} className="text-[var(--primary)] status-pulse" />
          <span className="font-label-caps text-[var(--primary)]">
            Interactive Architecture Visualizer
          </span>
        </div>
        <span className="font-code-sm text-xs px-2.5 py-0.5 rounded-full border border-[rgba(255,255,255,0.1)] text-[var(--text-muted)]">
          Live Interactive Pipeline
        </span>
      </div>

      {/* Step Buttons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        {steps.map((step, idx) => {
          const isSelected = activeStep === idx;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(idx)}
              type="button"
              className={`p-3 rounded-lg border text-left transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "bg-[rgba(0,255,157,0.1)] border-[var(--primary)] text-white shadow-[0_0_15px_rgba(0,255,157,0.15)]"
                  : "bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.08)] text-[var(--text-muted)] hover:border-[rgba(255,255,255,0.2)]"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-code-sm text-[11px] opacity-70">
                  Step 0{idx + 1}
                </span>
                {idx === 0 && <Cpu size={12} className="text-[var(--primary)]" />}
                {idx === 1 && <Activity size={12} className="text-[var(--secondary)]" />}
                {idx === 2 && <RefreshCw size={12} className="text-amber-400" />}
                {idx === 3 && <ShieldCheck size={12} className="text-[var(--primary)]" />}
              </div>
              <div className="font-headline-md text-xs font-semibold truncate">
                {step.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Step Detail Box */}
      <div
        className="p-4 rounded-lg border bg-[rgba(255,255,255,0.02)] transition-all duration-300"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-[var(--primary)]" />
            <h4 className="font-headline-md text-sm text-[var(--on-surface)]">
              {steps[activeStep].name}
            </h4>
          </div>
          <span className="font-code-sm text-xs px-2 py-0.5 rounded bg-[rgba(0,255,157,0.1)] text-[var(--primary)] border border-[rgba(0,255,157,0.2)]">
            Metric: {steps[activeStep].metric}
          </span>
        </div>
        <p className="font-body-md text-xs text-[var(--text-muted)] leading-relaxed">
          {steps[activeStep].detail}
        </p>
      </div>
    </div>
  );
}
