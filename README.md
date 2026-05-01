# Shubhankar Tiwari

Backend Systems Engineer | AI/ML Systems | LLM Evaluation & Reliability

I build ML systems across the full lifecycle: **inference → evaluation → governance**

---

## 🔥 Featured Systems

### 1. LLM Generation Control Engine

**Prevents silent model instability during generation.**

```
Decoding Loop → Entropy Analysis → Stability Detection → Adaptive Intervention
```

**What you built:**
- Token-level entropy tracking during decoding with per-token logit extraction
- Real-time stability detectors (entropy collapse, repetition loops, token lock-in)
- Adaptive control policy with mid-generation temperature/regeneration interventions
- Confidence scoring combining entropy, instability events, and intervention history
- FastAPI backend + Next.js dashboard for real-time comparison

**Key Result:**
- Reduced instability events from 18 → 0 on degenerate prompts
- +0.10 average confidence improvement on adversarial inputs
- +0.06 to +0.10 confidence uplift on typical workloads

👉 [View Repo](https://github.com/shubhankartiwari99/llm-generation-control) | [Kaggle Notebook](https://www.kaggle.com/code/shubhankartiwari/qwen-2-5-7b-reliability-benchmark-research-report)

---

### 2. LLM Behavioral Regression & CI Gate

**Prevents silent model degradation during version upgrades.**

```
Eval Dataset → Metric Computation (accuracy, hallucination, format) → Delta Analysis → CI Gate Decision
```

**What you built:**
- Versioned evaluation datasets with multi-category metrics
- Accuracy, hallucination detection, and format consistency scoring
- Policy-based promotion/rejection with configurable thresholds
- Regression detection gate integrated into CI/CD
- Audit logging for all promotion decisions with full decision trace

**Key Result:**
- Rejected candidate with -55% accuracy drop and consistency degradation (0.875 → 1.0)
- Zero silent regressions post-deployment
- Full audit trail for every model promotion decision

👉 [View Repo](https://github.com/shubhankartiwari99/drift-aware-fraud-detection)

---

### 3. Drift-Aware Fraud Detection System

**Prevents model failure from silent data drift.**

```
Production Data → Drift Detection (KL Divergence + PSI) → Performance Tracking → Retraining Decision → Shadow Deployment → Promotion
```

**What you built:**
- Real-time drift detection via KL divergence and PSI with historical timeline
- Feature shift explanation (identifies top shifted feature causing drift)
- Automated retraining triggered by drift with cooldown constraints
- Shadow deployment (candidate model scores every request, non-blocking)
- Live observability dashboard with drift timeline, shadow vs. production comparison
- Versioned model registry with full provenance tracking

**Key Result:**
- Caught model degradation automatically (production vs. candidate comparison prevented deployment failures)
- Retraining cooldown prevented unstable loops under noisy signals
- Feature-level drift attribution transformed drift numbers into actionable insights

👉 [View Repo](https://github.com/shubhankartiwari99/drift-aware-fraud-detection) | [Live Demo](https://credit-transaction-anomaly-detectio.vercel.app)

---

## ⚡ Highlights

- Built 3 ML systems across inference control, evaluation, and deployment governance
- Designed decision-based promotion systems using business-aware loss functions
- Implemented CI-gated model regression detection pipelines with audit logging
- Focused on reliability, stability, and production ML behavior across the full lifecycle

## 🛠 Tech Stack

- Backend: Python, FastAPI
- ML: Transformers, Qwen 2.5-7B, sentence-transformers
- Frontend: Next.js, TypeScript
- Infra: Kaggle T4 GPU, ngrok, Vercel

## 📫 Contact

- GitHub: [shubhankartiwari99](https://github.com/shubhankartiwari99)
- LinkedIn: [Shubhankar Tiwari](https://www.linkedin.com/in/shubhankar-tiwari-514040165/)
- Kaggle: [shubhankartiwari](https://www.kaggle.com/shubhankartiwari)

---

[Resume (PDF)](public/Shubhankar_Tiwari_Resume.pdf) | [Portfolio Site](https://shubhankar-tiwari.vercel.app)

