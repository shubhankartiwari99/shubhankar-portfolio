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
  keyInsight?: string;
  systemCapabilities?: string[];
  demoGif?: string;
}

export const projects: Project[] = [
  {
    slug: "llm-generation-control",
    title: "LLM Control System — Runtime Reliability for Generative Models",
    shortDescription:
      "Built a full-stack system to monitor and control LLM generation at the token level, with adaptive instability detection and real-time intervention.",
    fullDescription: `Built a full-stack system to monitor and control LLM generation at the token level.

The system tracks entropy during decoding, detects instability patterns such as repetition loops and entropy collapse, and applies corrective actions (temperature adjustment, regeneration).

Includes:
• Adaptive control loop (Token Distribution → Entropy Analysis → Policy Gate → Temperature/Regen Action)
• Token-level observability (entropy + instability traces)
• Confidence scoring based on generation stability
• FastAPI backend + interactive UI dashboard
• Support for 7B models (Mistral / Qwen via API)

Result:
Prevents degeneration loops. Improves generation stability in real time by catching failure modes before they propagate.`,
    tags: ["Python", "MLOps", "LLM", "Control Systems", "System Design"],
    github: "https://github.com/shubhankartiwari99/llm-generation-control",
    link: "https://github.com/shubhankartiwari99/llm-generation-control",
    featured: true,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    status: "Active",
    year: "2026-Present",
    highlights: [
      "Token-level observability via manual decoding loop with per-token probability and entropy extraction",
      "Three-category stability detector system: entropy_collapse, repetition_loop, low_entropy_lock",
      "Formal policy controller with explicit intervention rules mapped to instability signals",
      "Adaptive regeneration and temperature adjustment — mid-generation intervention without restart",
      "Confidence scoring weighted by entropy (50%), instability events (35%), regenerations (15%)",
      "82% instability reduction and +0.07 average confidence improvement on adversarial prompts",
      "+0.06 to +0.10 confidence uplift in compare mode on typical workloads",
      "Run history API and JSON trace persistence with full decision audit trail",
      "MPS/CUDA acceleration with Mistral 7B FP16 (~14GB VRAM required)",
      "Interactive Next.js dashboard for baseline vs adaptive comparison with live metrics"
    ],
    techStack: [
      { category: "Core ML", items: ["Token-level Control", "Entropy Analysis", "Logit Extraction", "Mistral 7B"] },
      { category: "Control Policy", items: ["Stability Detectors", "Adaptive Regeneration", "Temperature Adjustment"] },
      { category: "Backend", items: ["FastAPI", "Python", "Uvicorn"] },
      { category: "Frontend", items: ["Next.js", "Real-time Telemetry", "Comparison Dashboard"] },
      { category: "Infrastructure", items: ["MPS/CUDA", "Model Serving", "JSON Trace Logging"] },
    ],
    challenges: [
      "Designing stability detectors that reliably trigger on actual failures without excessive false positives",
      "Managing mid-generation intervention policy without causing output quality degradation",
      "Computing token-level entropy efficiently during generation without performance bottlenecks",
      "Calibrating confidence metric weights to align with user perception of output reliability",
      "Handling model instability across diverse prompt domains without overfitting to training patterns"
    ],
    learnings: [
      "Token-level observability enables reliable failure detection — aggregate metrics alone miss early collapse signals",
      "Control policy specification must be explicit and formal — heuristic rules are more debuggable than learned policies for critical systems",
      "Confidence metrics are only useful if they accurately predict downstream failure — weighted scoring requires empirical validation",
      "Mid-generation intervention works but introduces latency trade-offs — cold-start regeneration may be more cost-effective than adaptive adjustment",
      "Interactive dashboards for compare mode are essential for understanding control system behavior — summary metrics alone don't build trust"
    ],
    keyInsight: "Detect and correct unstable token generation in real time using entropy-based control.",
    systemCapabilities: [
      "Token-by-token observability with probability and entropy extraction",
      "Real-time stability detection (entropy collapse, repetition loops, lock-in)",
      "Adaptive policy control with mid-generation intervention",
      "Confidence scoring with audit trail"
    ],
  },
  {
    slug: "drift-aware-fraud-detection",
    title: "Drift-Aware Fraud Detection — ML Lifecycle & Model Governance",
    shortDescription:
      "Built an end-to-end ML system that detects data drift, evaluates model degradation, and governs retraining decisions.",
    fullDescription: `Built an end-to-end ML system that detects data drift, evaluates model degradation, and governs retraining decisions.

The system continuously monitors feature distribution shifts and model performance, triggering retraining when degradation is detected. Candidate models are compared against production before deployment.

Includes:
• Drift detection (statistical distribution monitoring)
• Performance tracking (AUC-based evaluation)
• Complete ML system loop: Frozen Dataset → Failure-mode metrics (AUC degradation, PSI drift) → Δ Analysis → Policy Gate (Business Loss < 0) → CI Promotion
• Explicit decision loop (retrain / no_action)
• CLI observability for drift history and decisions

Result:
Prevents revenue loss from misclassification trade-offs. Candidate models are rejected if accuracy gains (+0.002 AUC) result in higher business loss (+7% higher false positive cost), ensuring threshold optimization always serves business objectives.`,
    tags: ["FastAPI", "scikit-learn", "Next.js", "MLOps", "Drift Detection", "System Design"],
    github: "https://github.com/shubhankartiwari99/drift-aware-fraud-detection",
    link: "https://credit-transaction-anomaly-detectio.vercel.app",
    featured: true,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBkYXRhJTIwZGFzaGJvYXJkJTIwZGFya3xlbnwwfHx8fDE3MDk2NTYwMDB8MA&ixlib=rb-4.1.0&q=85",
    status: "Active",
    year: "2026-Present",
    highlights: [
      "Complete ML system loop: Frozen Dataset → Failure-mode metrics (AUC degradation, PSI drift) → Δ Analysis → Policy Gate (Business Loss < 0) → CI Promotion",
      "Real-time drift detection via KL divergence and PSI with persistent drift score timeline tracking distributional evolution over time",
      "Feature shift explanation surfaces the top shifted feature driving drift — interpretable ML system behavior, not just a number",
      "Retraining cooldown constraint prevents unstable loops under noisy drift signals — demonstrates real-world system constraints",
      "Shadow deployment architecture — every prediction scored by both production and candidate models simultaneously",
      "Failure-aware retraining pipeline with explicit SUCCESS/FAILED status tracking surfaced to the UI",
      "Versioned model registry with full provenance: trigger reason, drift score, top shifted feature, training timestamp, deployment status",
      "Live Next.js observability dashboard: drift timeline, confidence distribution histogram, prediction trends, fraud rate, system health, and shadow vs production comparison",
      "10 API endpoints including /drift, /drift/history, /retrain/status, and /health for full system observability",
    ],
    techStack: [
      { category: "Backend", items: ["FastAPI", "Python", "Uvicorn", "Render"] },
      { category: "ML", items: ["XGBoost", "scikit-learn", "SMOTE", "Pandas", "NumPy"] },
      { category: "Monitoring", items: ["KL Divergence", "PSI", "Drift Timeline", "Feature Shift Explanation", "Cooldown Logic"] },
      { category: "Frontend", items: ["Next.js", "Recharts", "Tailwind CSS", "Vercel"] },
    ],
    challenges: [
      "Extreme class imbalance (0.17% fraud) — required careful evaluation metrics (AUC-PR over accuracy) and SMOTE-based rebalancing",
      "Designing a shadow deployment loop that doesn't double latency — both models score every request but shadow results are non-blocking",
      "Drift threshold calibration — PSI > 0.2 and KL > 0.1 trigger retraining without causing false alarms on normal distribution shift",
      "Cooldown constraint design — preventing retraining instability under noisy drift without masking real distributional change",
    ],
    learnings: [
      "The model is the easy part — drift detection, cooldown constraints, failure handling, and registry governance are where production ML gets hard",
      "Feature shift explanation transforms a number into an actionable insight — interpretable drift is far more valuable than raw metrics",
      "Cooldown mechanisms are essential in any automated trigger system — without them, noisy signals cause runaway retraining loops",
      "Explicit promotion gates (shadow → production) prevent silent model degradation that auto-promotion would miss",
    ],
    keyInsight: "Link distributional drift to model degradation and automatically recover performance via retraining.",
    systemCapabilities: [
      "Real-time drift detection (KL divergence + PSI) with timeline tracking",
      "Automated retraining triggered by drift with cooldown constraints",
      "Live observability dashboard with shadow vs. production comparison"
    ],
    demoGif: "https://raw.githubusercontent.com/shubhankartiwari99/drift-aware-fraud-detection/main/demo-fraud-ml.gif"
  },
  {
    slug: "ai-quality-assurance-financial-services",
    title: "Conservative Auto-Regeneration Policy for AI-Generated Financial Narratives",
    shortDescription:
      "Production validation system for AI-generated outputs in financial services — threshold optimisation, conservative AND escalation policy, priority-scored human review queue, and audit-grade provenance.",
    fullDescription: `Generative AI in financial services isn't a research problem — it's a compliance and reliability problem. The question isn't whether a model can produce a good output. The question is whether you can prove it, consistently, to an auditor.

This project implements a closed-loop validation pipeline for AI-generated narratives in a financial services context. The system evaluates each generated output against two independent validation signals — embedding similarity and ROUGE-L — and applies a conservative AND policy: auto-regeneration is only triggered when both metrics fall below their calibrated thresholds simultaneously. Single-metric failure routes to human review rather than auto-regen, erring on the side of caution.

Thresholds are not hand-tuned. They are computed via a bootstrap percentile sweep across a labeled validation set, optimising for precision-recall trade-offs appropriate to a regulated environment. Every artifact — thresholds, policy decisions, enriched validation data — is written with provenance metadata (timestamp, config snapshot, pipeline stage) so the full decision trail is reconstructable.

The human review queue is not a flat list. Cases are ranked by a priority score derived from both metric deficits, so reviewers work the highest-risk outputs first. PII sanitization is applied before any data leaves the pipeline for external storage.

Result:
Prevents silent model degradation by guaranteeing failing narratives are caught before they reach downstream consumers.`,
    tags: ["Python", "NLP", "FinTech", "ML", "System Design"],
    featured: true,
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
      "Full pipeline: Extracted Text → Failure-mode metrics (ROUGE drift, format violations, consistency) → Δ Analysis → Conservative AND Policy Gate → Priority-Scored Human Review",
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
  },  {
    slug: "indian-multilingual-llm",
    title: "Indian Desi Multilingual LLM — Training Pipeline",
    shortDescription:
      "End-to-end multilingual LLM training pipeline targeting Hindi/English code-switching. Dataset curation, LoRA fine-tuning, inference evaluation, and deployment packaging across 6 Kaggle notebooks.",
    fullDescription: `Built a complete training pipeline for an Indian multilingual LLM — from raw data curation through LoRA fine-tuning to inference evaluation and deployment packaging.

The goal was to address a real gap: most open-source LLMs handle formal Hindi reasonably well but break down on the casual, code-switched Hindi-English that represents how most Indians actually communicate. The project focuses on building the infrastructure that makes multilingual AI reliable and safe for production.

Recognised mid-project that Sarvam AI had advanced significantly in the same space with more compute and a dedicated research team. Rather than continuing a follower project, pivoted toward the more interesting problem hiding inside the work: building rigorous behavioral reliability evaluation infrastructure for open-source LLMs. That pivot evolved into the overarching LLM Inference Systems project, moving from raw training to systemic distribution shaping, guardrails, and audit-grade performance evaluation.`,
    tags: ["Python", "LLM", "NLP", "LoRA", "HuggingFace", "Transformers"],
    github: "https://github.com/shubhankartiwari99/indian-multilingual-llm",
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

];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjects(): Project[] {
  return projects;
}
