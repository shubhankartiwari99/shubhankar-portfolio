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
    title: "LLM Reliability Evaluation Platform",
    shortDescription:
      "Production-grade system for measuring LLM behavioral consistency via Monte Carlo sampling. Benchmarked Qwen 2.5-7B across 240 inference calls — v2 grid sweep found temperature IS a lever, but top-p dominates 3.1×.",
    fullDescription: `Standard benchmarks evaluate accuracy on a single inference pass. This platform evaluates something more deployment-relevant: behavioral consistency — how stable a model's outputs are across independent inference runs on identical inputs.

Built after recognising that open-source LLM evaluation tooling optimises for leaderboard scores but gives almost no signal about whether a model will behave predictably in production. The gap is especially sharp for 7B-class models being deployed in high-stakes domains.

The platform runs Monte Carlo sampling (n=5 per prompt) across a full temperature × top-p grid sweep and computes instability, confidence, semantic dispersion, and entropy for each inference. A DBSCAN clustering pass groups semantically similar outputs to identify whether a model converges or diverges on a given prompt.

v2 ran 240 inference calls (48 prompts × 5 MC samples) and produced a significant revision to the v1 finding: temperature is not irrelevant — it interacts with top-p, but top-p dominates reliability at 3.1× the effect magnitude. The optimal configuration for Qwen 2.5-7B is T=0.1, top-p=0.5. v2 also achieved 0% null generation, compared to 11.8% in v1, through improved retry logic and failure classification.`,
    tags: ["Python", "FastAPI", "Next.js", "LLM", "NLP", "Research"],
    github: "https://github.com/shubhankartiwari99/indian-desi-llm-inference",
    link: "https://www.kaggle.com/code/shubhankartiwari/qwen-2-5-7b-reliability-benchmark-research-report",
    featured: true,
    image: "https://images.pexels.com/photos/17485657/pexels-photo-17485657.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    status: "Active",
    year: "2026-Present",
    highlights: [
      "Monte Carlo sampler: n=5 independent inference passes per prompt across full temperature × top-p grid",
      "Semantic clustering via sentence-transformers + DBSCAN to group divergent outputs",
      "Reliability metrics: instability, confidence, entropy, semantic dispersion, cluster dominance",
      "v2: 240 inference calls (48 prompts × 5 MC samples) — full grid sweep across T and top-p",
      "v2 finding: top-p dominates reliability at 3.1× the effect magnitude of temperature",
      "v2 finding: optimal config for Qwen 2.5-7B is T=0.1, top-p=0.5 (coding instability 0.163)",
      "v2 finding: 86.5% escalation rate — philosophical prompts show highest instability",
      "v2 finding: 0% null generation (vs 11.8% in v1) after retry logic and failure classification",
      "v1 finding: temperature appeared negligible — revised in v2 after full grid sweep",
      "Live Next.js dashboard with real-time telemetry, escalation badges, and offline JSON reports",
      "Published benchmark dataset and research analysis notebook on Kaggle (v1 + v2)",
    ],
    techStack: [
      { category: "Frontend", items: ["Next.js", "TypeScript", "Vercel"] },
      { category: "Backend", items: ["FastAPI", "Python", "ngrok"] },
      { category: "ML / Eval", items: ["sentence-transformers", "DBSCAN", "Qwen 2.5-7B-Instruct"] },
      { category: "Infrastructure", items: ["Kaggle T4 GPU", "Docker"] },
    ],
    challenges: [
      "Designing a benchmark that stress-tests failure modes without being trivially gameable",
      "Handling 11.8% null generation silently — required retry logic and failure classification",
      "Frontend entropy mapping bug zeroed out entropy values in first dataset — required clean rerun",
      "Keeping the FastAPI backend alive across a 2.5-hour T4 session with retry and heartbeat logic",
    ],
    learnings: [
      "Behavioral consistency is a more deployment-relevant signal than single-pass accuracy",
      "Temperature and top-p interact — top-p dominates reliability at 3.1×; single-axis sweeps miss this",
      "v1 findings can be wrong — the grid sweep in v2 meaningfully revised the temperature conclusion",
      "Silent failure modes (null generation) are more dangerous than noisy ones — retry logic is non-optional",
      "Evaluation infrastructure is itself a research contribution, not just scaffolding",
    ],
  },
  {
    slug: "indian-multilingual-llm",
    title: "Indian Desi Multilingual LLM — Training Pipeline",
    shortDescription:
      "End-to-end multilingual LLM training pipeline targeting Hindi/English code-switching. Dataset curation, LoRA fine-tuning, inference evaluation, and deployment packaging across 6 Kaggle notebooks.",
    fullDescription: `Built a complete training pipeline for an Indian multilingual LLM — from raw data curation through LoRA fine-tuning to inference evaluation and deployment packaging.

The goal was to address a real gap: most open-source LLMs handle formal Hindi reasonably well but break down on the casual, code-switched Hindi-English that represents how most Indians actually communicate. The project focuses on building the infrastructure that makes multilingual AI reliable and safe for production.

Recognised mid-project that Sarvam AI had advanced significantly in the same space with more compute and a dedicated research team. Rather than continuing a follower project, pivoted toward the more interesting problem hiding inside the work: building rigorous behavioral reliability evaluation infrastructure for open-source LLMs. That pivot became the LLM Reliability Evaluation Platform.`,
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
