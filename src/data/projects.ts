export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  tags: string[];
  github?: string;
  link?: string;
  featured: boolean;
  image: string;
  status: "Active" | "Completed" | "In Progress";
  year: string;
  highlights: string[];
  techStack: {
    category: string;
    items: string[];
  }[];
  challenges?: string[];
  learnings?: string[];
}

export const projects: Project[] = [
  {
    slug: "llm-reliability-evaluation-platform",
    title: "LLM Inference-Time Evaluation Platform",
    shortDescription:
      "Production-grade probabilistic evaluation system. Features 3-tier cultural dose-response experiments, a 9-category guardrail classifier, audit-grade deployment registries, behavioral snapshots, and adaptive reliability fallbacks.",
    fullDescription: `Most LLM evaluations treat model outputs as final, completely ignoring inference-time transformations. This platform evaluates something more deployment-relevant: how runtime policies systematically reshape output distributions before they ever reach the user.

Built after recognizing that benchmark accuracy gives zero signal about deployment behavior, I architected a full ML Systems pipeline separating raw stochasticity from deterministic shaping. The system runs real experimental workloads (n=65 live inferences on Qwen 2.5-7B via a Kaggle T4 proxy) using a 3-tier prompt gradient to measure cultural alignment as a dose-response problem. Results demonstrate a perfect monotonic increase in cultural signaling (P=0.0 → 0.4 → 1.0) with zero false positives on neutral inputs.

The infrastructure extends far beyond evaluation into full system reliability. It features a 9-category guardrail classifier with severity scaling, an empirically derived reliability guard that triggers grid-sweep-optimized adaptive fallbacks (T=0.1, top_p=0.5) when token entropy exceeds safe thresholds, and a Pydantic-powered deployment registry enforcing Go/No-Go release gates based on "frozen behavioral DNA" snapshots. The entire pipeline is verified by a strict SHA-256 fingerprint chain and backed by 55+ test suites including replay, fuzz, and stress testing.`,
    tags: ["Python", "MLOps", "LLM", "Information Theory", "System Design", "Research"],
    github: "https://github.com/shubhankartiwari99/indian-desi-llm-inference",
    link: "https://github.com/shubhankartiwari99/indian-desi-llm-inference",
    featured: true,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    status: "Active",
    year: "2026-Present",
    highlights: [
      "Cultural alignment dose-response experiments evaluating 3-tier prompt gradients across 65 live inference calls",
      "9-category guardrail classifier with explicit severity scaling (Low → Critical) and escalation logic",
      "Deployment registry leveraging strict Pydantic schemas for audit-grade provenance and Go/No-Go release gating",
      "Behavioral snapshot system capturing the 'frozen DNA' and telemetry trace of every model run",
      "Adaptive reliability guard triggering empirical grid-sweep fallbacks when inference entropy exceeds safe bounds",
      "Runtime identity verification enforcing dependency lock via SHA-256 artifact finger-printing",
      "Massive 55+ file test suite including systemic failure modes, contract fuzzing, and invariant validation"
    ],
    techStack: [
      { category: "ML / Eval", items: ["Cultural Alignment", "KL Divergence", "Information Theory", "Qwen 2.5-7B"] },
      { category: "System", items: ["Guardrails", "Behavioral Snapshots", "Pydantic", "Release Registry"] },
      { category: "Backend", items: ["FastAPI", "Python", "pytest suite (55+ tests)"] },
      { category: "Infrastructure", items: ["Kaggle T4 GPU", "ngrok", "SHA-256 Fingerprinting"] },
    ],
    challenges: [
      "Designing mathematical dose-response evaluations that measure cultural alignment proportionally rather than via binary pass/fail",
      "Ensuring audit-grade reproducibility across stochastic models using exact artifact hashing and strict release schemas",
      "Calibrating entropy-driven reliability fallbacks that correctly intercept hallucinations without crashing throughput"
    ],
    learnings: [
      "Cultural alignment operates as a dose-response mechanism — runtime acts as a proportional amplifier, not a binary switch",
      "A deterministic registry schema with explicit evaluation evidence is required for any production model rollout",
      "Mocking infrastructure is still critical for portfolio demos, but the value lies in testing behavioral edge cases reliably"
    ],
  },
  {
    slug: "credit-transaction-anomaly-detection",
    title: "Credit Transaction Anomaly Detection System",
    shortDescription:
      "Production fraud ML pipeline with drift detection (KL divergence + PSI), shadow deployment, versioned model registry, and a real-time Next.js monitoring dashboard — deployed end-to-end on Render + Vercel.",
    fullDescription: `Most ML portfolio projects stop at a Jupyter notebook. This one ships a full production loop: ingest → preprocess → train → serve → monitor → retrain → promote.

The system detects anomalous credit card transactions using an Isolation Forest trained on the Kaggle Credit Card Fraud dataset (284,807 transactions, 0.17% fraud). What makes it a systems project rather than a modeling exercise is everything around the model.

A FastAPI backend serves real-time predictions while continuously computing distribution drift via KL divergence and Population Stability Index (PSI) on both transaction amounts and model confidence scores. When drift exceeds calibrated thresholds, a shadow model is retrained automatically. The shadow runs in parallel with production — every prediction is scored by both models — and promotion to production requires explicit operator action through the dashboard.

The model registry tracks every version with full metadata: trigger reason, training timestamp, AUC-PR, and deployment status (production / shadow / archived). The Next.js dashboard displays live telemetry: prediction confidence trends, fraud rate, drift snapshot, shadow vs production comparison charts, and registry state.`,
    tags: ["FastAPI", "scikit-learn", "Next.js", "MLOps", "Drift Detection", "System Design"],
    github: "https://github.com/shubhankartiwari99/Credit-Transaction-Anomaly-Detection-System-with-Drift-Triggered-Retraining",
    link: "https://credit-transaction-anomaly-detectio.vercel.app",
    featured: true,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBkYXRhJTIwZGFzaGJvYXJkJTIwZGFya3xlbnwwfHx8fDE3MDk2NTYwMDB8MA&ixlib=rb-4.1.0&q=85",
    status: "Active",
    year: "2026-Present",
    highlights: [
      "End-to-end production ML pipeline: training → serving → monitoring → drift-triggered retraining → shadow deployment → promotion",
      "Real-time drift detection via KL divergence and PSI on transaction amount and model confidence distributions",
      "Shadow deployment architecture — every prediction scored by both production and candidate models simultaneously",
      "Versioned model registry with full provenance: trigger reason, AUC-PR, training timestamp, deployment status",
      "Live Next.js monitoring dashboard with prediction confidence trends, fraud rate, drift snapshot, and shadow vs production comparison",
      "FastAPI backend deployed on Render with CORS-hardened error handling; frontend on Vercel",
    ],
    techStack: [
      { category: "Backend", items: ["FastAPI", "Python", "Uvicorn", "Render"] },
      { category: "ML", items: ["scikit-learn", "Isolation Forest", "SMOTE", "Pandas", "NumPy"] },
      { category: "Monitoring", items: ["KL Divergence", "PSI", "Drift Detection", "Shadow Deployment"] },
      { category: "Frontend", items: ["Next.js", "Recharts", "Tailwind CSS", "Vercel"] },
    ],
    challenges: [
      "Extreme class imbalance (0.17% fraud) — required careful evaluation metrics (AUC-PR over accuracy) and SMOTE-based rebalancing",
      "Designing a shadow deployment loop that doesn't double latency — both models score every request but shadow results are non-blocking",
      "Drift threshold calibration — PSI > 0.2 and KL > 0.1 trigger retraining without causing false alarms on normal distribution shift",
    ],
    learnings: [
      "The model is the easy part — drift detection, shadow deployment, and registry governance are where production ML gets hard",
      "PSI is more robust than KL divergence for detecting gradual distribution shift in transaction amounts",
      "Explicit promotion gates (shadow → production) prevent silent model degradation that auto-promotion would miss",
    ],
  },
  {
    slug: "indian-multilingual-llm",
    title: "Indian Desi Multilingual LLM — Training Pipeline",
    shortDescription:
      "End-to-end multilingual LLM training pipeline targeting Hindi/English code-switching. Dataset curation, LoRA fine-tuning, inference evaluation, and deployment packaging across 6 Kaggle notebooks.",
    fullDescription: `Built a complete training pipeline for an Indian multilingual LLM — from raw data curation through LoRA fine-tuning to inference evaluation and deployment packaging.

The goal was to address a real gap: most open-source LLMs handle formal Hindi reasonably well but break down on the casual, code-switched Hindi-English that represents how most Indians actually communicate. The project focuses on building the infrastructure that makes multilingual AI reliable and safe for production.

Recognised mid-project that Sarvam AI had advanced significantly in the same space with more compute and a dedicated research team. Rather than continuing a follower project, pivoted toward the more interesting problem hiding inside the work: building rigorous behavioral reliability evaluation infrastructure for open-source LLMs. That pivot evolved into the overarching LLM Inference Systems project, moving from raw training to systemic distribution shaping, guardrails, and audit-grade performance evaluation.`,
    tags: ["Python", "LLM", "NLP", "LoRA", "HuggingFace", "Transformers"],
    github: "https://github.com/shubhankartiwari99/indian-desi-llm-inference",
    link: "https://www.kaggle.com/code/shubhankartiwari/canonical-dataset-for-indian-desi-multilingual-llm",
    featured: false,
    image: "https://images.pexels.com/photos/17485657/pexels-photo-17485657.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    status: "Completed",
    year: "2025",
    highlights: [
      "Canonical dataset curated from 3 complementary sources — chatbot dataset for tone, large-scale conversation corpus for diversity, sentence-pair dataset for structural grounding",
      "Unified schema normalising all sources into a clean, consistent format",
      "LoRA adapter initialisation on a multilingual encoder-decoder base model",
      "6-notebook pipeline: tokenisation → model setup → LoRA init → fine-tuning → inference eval → deployment packaging",
      "Handles Hindi-English code-switching and Devanagari / Romanised Hinglish script diversity",
      "Persona safety CI: checkpoint testing against adversarial prompts before deployment",
    ],
    techStack: [
      { category: "Core", items: ["Python", "PyTorch", "HuggingFace Transformers"] },
      { category: "Fine-tuning", items: ["LoRA", "QLoRA", "PEFT"] },
      { category: "Evaluation", items: ["sentence-transformers", "Custom benchmark suite"] },
      { category: "Infrastructure", items: ["Kaggle T4 GPU", "Docker", "GitHub Actions"] },
    ],
    challenges: [
      "Code-switching detection — Indian speakers mix languages mid-sentence unpredictably",
      "Script diversity — Hindi written in Devanagari vs Romanised Hinglish are treated as different inputs",
      "Evaluation subjectivity — BLEU scores don't capture cultural nuance or conversational naturalness",
      "Recognising when to pivot: continued investment in the model itself was low-differentiation",
    ],
    learnings: [
      "Building safety layers before scaling inference is the right order of operations",
      "Pivoting is a research decision, not a failure — finding the more interesting problem matters",
      "Cultural context matters more than raw accuracy metrics for conversational AI",
      "Dataset quality and schema consistency have more leverage than model architecture choices at this scale",
    ],
  },
  {
    slug: "song-recommender-system",
    title: "Song Recommender System",
    shortDescription:
      "ML-based workout song recommender using BPM and VADER sentiment analysis. Co-authored research with K-Means clustering on Billboard Top 100 to match songs to exercise intensity.",
    fullDescription: `A machine learning-based music recommendation system that generates adaptive playlists based on physiological signals and song sentiment — built as a co-authored research project with Tanish Maheshwari.

The core insight: BPM alone isn't enough to match a song to an exercise state. Sentiment analysis on lyrics (using VADER) reveals a neutrality parameter that shows the highest positive covariance with BPM, and combining both gives a more accurate picture of a song's intensity profile than tempo alone.

Billboard Top 100 lyrics were extracted via the Genius API, sentiment scores computed using VADER, and K-Means clustering (optimised to K=4 via the elbow method) grouped songs into workout intensity tiers: warm-up, intensity, aggressive-1, and aggressive-2. The recommender takes live BPM from a smartwatch, maps it to the correct cluster, and shuffles a song from that tier.`,
    tags: ["Python", "ML", "NLP", "Sentiment Analysis", "K-Means", "Research"],
    featured: false,
    image: "https://images.unsplash.com/photo-1714779573250-36242918e044?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MTN8MHwxfHNlYXJjaHwzfHxzb3VuZCUyMHdhdmUlMjB2aXN1YWxpemF0aW9uJTIwYWJzdHJhY3QlMjBkYXJrfGVufDB8fHx8MTc3MTY4NjI3OXww&ixlib=rb-4.1.0&q=85",
    status: "Completed",
    year: "2021",
    highlights: [
      "Co-authored research project with Tanish Maheshwari (Presidency University)",
      "Lyrics extracted from Billboard Top 100 via Genius API and lyrics-extractor library",
      "VADER sentiment analysis (rule-based NLP) to score song polarity across positive, negative, neutral, compound dimensions",
      "Neutrality identified as the feature with highest positive covariance with BPM — used as primary clustering feature",
      "K-Means clustering optimised to K=4 clusters via WCSS elbow method: warm-up, intensity, aggressive-1, aggressive-2",
      "Live BPM input via smartwatch mapped to cluster range for real-time song selection",
    ],
    techStack: [
      { category: "ML", items: ["Scikit-learn", "K-Means", "Hierarchical Clustering"] },
      { category: "NLP", items: ["VADER Sentiment", "lyrics-extractor", "Genius API"] },
      { category: "Data", items: ["Pandas", "NumPy", "Matplotlib", "Billboard Kaggle dataset"] },
    ],
    challenges: [
      "Noisy heart rate data from consumer wearables affecting cluster boundary accuracy",
      "Subjectivity of workout intensity — same BPM feels different across fitness levels",
      "Cold start problem: new users have no preference history to anchor recommendations",
    ],
    learnings: [
      "Combining physiological signals with content features produces more robust clusters than either alone",
      "VADER's neutrality parameter is a stronger covariate with tempo than positive or negative polarity",
      "Elbow method optimisation is critical — initialising K=5 without validation produced noisier clusters",
    ],
  },
  {
    slug: "kaggle-portfolio",
    title: "Kaggle Portfolio",
    shortDescription:
      "Notebooks Expert rank #2,441 / 59,663 — personal best #707. 34 notebooks, 11 datasets, 3 models, 1 competition entry. 10 bronze medals across ML, DL, NLP, Computer Vision, and regression.",
    fullDescription: `My Kaggle journey spanning machine learning, deep learning, NLP, and computer vision. Achieved Notebooks Expert status through consistent contributions and community engagement.

Early in my career I pushed notebooks consistently across domains — regression, classification, NLP, CV — and reached a personal best rank of #707. After joining Bank of America in 2022 I shifted focus to production engineering. Returning to active Kaggle work in 2025 alongside the Indian multilingual LLM research, current rank is #2,441 out of 59,663.

The portfolio includes exploratory data analysis, model implementations, and educational notebooks across the full ML stack. The LLM reliability benchmark research is the most recent published work.`,
    tags: ["Data Science", "ML", "Deep Learning", "NLP", "CV"],
    link: "https://www.kaggle.com/shubhankartiwari",
    featured: false,
    image: "https://images.unsplash.com/photo-1753998943228-73470750c597?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjV8MHwxfHNlYXJjaHw0fHxjb2RpbmclMjBzZXR1cCUyMGRhcmslMjBtb2RlJTIwbW9uaXRvcnxlbnwwfHx8fDE3NzE2ODYyODF8MA&ixlib=rb-4.1.0&q=85",
    status: "Active",
    year: "2020-Present",
    highlights: [
      "Notebooks Expert — current rank #2,441 / 59,663 | personal best #707",
      "34 published notebooks with 10 bronze medals",
      "11 datasets contributed to the community",
      "1 competition entry",
      "3 models published",
      "Most recent: Qwen 2.5-7B reliability benchmark research report (2026)",
      "6-notebook Indian multilingual LLM training pipeline (2025)",
      "Certified in ML, Deep Learning, and Computer Vision",
    ],
    techStack: [
      { category: "ML/DL", items: ["TensorFlow", "PyTorch", "Keras", "Scikit-learn"] },
      { category: "Data", items: ["Pandas", "NumPy", "Matplotlib", "Seaborn"] },
      { category: "CV", items: ["OpenCV", "PIL", "Albumentations"] },
      { category: "NLP", items: ["HuggingFace Transformers", "VADER", "NLTK"] },
    ],
    challenges: [
      "Returning to competitive Kaggle after a period focused on production engineering",
      "Communicating complex ML concepts clearly in notebook format",
      "Keeping up with a rapidly evolving model landscape",
    ],
    learnings: [
      "Teaching others through notebooks solidifies your own understanding",
      "Consistent small contributions beat sporadic large ones for community rank",
      "Production engineering and research ML reinforce each other more than they compete",
    ],
  },
  {
    slug: "ai-quality-assurance-financial-services",
    title: "Conservative Auto-Regeneration Policy for AI-Generated Financial Narratives",
    shortDescription:
      "Production quality-gating system for AI-generated outputs in financial services — threshold optimisation, conservative AND escalation policy, priority-scored human review queue, and audit-grade provenance.",
    fullDescription: `Generative AI in financial services isn't a research problem — it's a compliance and reliability problem. The question isn't whether a model can produce a good output. The question is whether you can prove it, consistently, to an auditor.

This project implements a closed-loop quality assurance pipeline for AI-generated narratives in a financial services context. The system evaluates each generated output against two independent quality signals — embedding similarity and ROUGE-L — and applies a conservative AND policy: auto-regeneration is only triggered when both metrics fall below their calibrated thresholds simultaneously. Single-metric failure routes to human review rather than auto-regen, erring on the side of caution.

Thresholds are not hand-tuned. They are computed via a bootstrap percentile sweep across a labeled validation set, optimising for precision-recall trade-offs appropriate to a regulated environment. Every artifact — thresholds, policy decisions, enriched validation data — is written with provenance metadata (timestamp, config snapshot, pipeline stage) so the full decision trail is reconstructable.

The human review queue is not a flat list. Cases are ranked by a priority score derived from both metric deficits, so reviewers work the highest-risk outputs first. PII sanitization is applied before any data leaves the pipeline for external storage.`,
    tags: ["Python", "NLP", "FinTech", "ML", "System Design"],
    featured: false,
    link: "https://www.kaggle.com/code/shubhankartiwari/conservative-auto-regeneration-policy",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBkYXRhJTIwZGFzaGJvYXJkJTIwZGFya3xlbnwwfHx8fDE3MDk2NTYwMDB8MA&ixlib=rb-4.1.0&q=85",
    status: "Completed",
    year: "2025",
    highlights: [
      "Conservative AND policy: auto-regen only when both embedding similarity AND ROUGE-L fall below threshold — single-metric failure routes to human review",
      "Threshold calibration via bootstrap percentile sweep across labeled validation set",
      "Priority-scored human review queue ranked by combined metric deficit — highest-risk cases surface first",
      "Audit-grade provenance: every artifact written with timestamp, config snapshot, and pipeline stage metadata",
      "PII sanitization applied before public artifact export",
      "Full pipeline: enrichment → threshold sweep → policy application → queue ranking → provenance write",
      "Published on Kaggle with sanitized validation dataset",
    ],
    techStack: [
      { category: "Core", items: ["Python", "Pandas", "NumPy", "Scikit-learn"] },
      { category: "NLP / Eval", items: ["ROUGE-L", "Sentence Embeddings", "Embedding Similarity"] },
      { category: "Pipeline", items: ["Bootstrap Percentile Sweep", "Provenance Tracking", "PII Sanitization"] },
    ],
    challenges: [
      "Calibrating thresholds conservative enough for a regulated environment without making auto-regen so rare it adds no value",
      "Designing an AND policy that handles missing modalities correctly without collapsing to always-escalate",
      "Provenance tracking that is lightweight enough not to slow the pipeline but complete enough to satisfy audit requirements",
    ],
    learnings: [
      "Conservative AND policy outperforms OR policy for regulated contexts — false positives (unnecessary human review) are far cheaper than false negatives (bad output reaching downstream)",
      "Bootstrap percentile thresholds are more robust than point estimates when labeled data is limited",
      "Priority-scored queues change reviewer behaviour — flat queues get triaged manually and inconsistently",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjects(): Project[] {
  return projects;
}
