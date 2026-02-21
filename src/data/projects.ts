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
    slug: "indian-multilingual-llm",
    title: "Indian Desi Multilingual LLM",
    shortDescription:
      "Inference and application layer for a multilingual LLM with persona safety CI, emotional invariants, and deterministic model fingerprinting.",
    fullDescription: `Building a robust inference and application layer for an Indian multilingual LLM. The project focuses on creating production-ready infrastructure that handles the unique challenges of Indian language processing — code-switching, script diversity, and cultural context.

The goal isn't to train a model from scratch, but to build the infrastructure that makes multilingual AI reliable and safe for production deployment.`,
    tags: ["Python", "LLM", "NLP", "CI/CD", "Transformers"],
    github: "https://github.com/shubhankartiwari99/indian-desi-llm-inference",
    featured: true,
    image: "https://images.pexels.com/photos/17485657/pexels-photo-17485657.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    status: "In Progress",
    year: "2025-Present",
    highlights: [
      "Persona Safety CI pipeline that tests model checkpoints against adversarial prompts",
      "Emotional invariant checker validating response tone across languages",
      "Deterministic model fingerprinting for A/B testing and debugging",
      "Handles Hindi-English code-switching mid-sentence",
    ],
    techStack: [
      { category: "Core", items: ["Python", "PyTorch", "Transformers", "FastAPI"] },
      { category: "Infrastructure", items: ["Docker", "GitHub Actions", "Redis"] },
      { category: "Evaluation", items: ["Custom benchmark suite", "LLM-as-judge"] },
    ],
    challenges: [
      "Code-switching detection — Indian speakers mix languages mid-sentence",
      "Script diversity — Hindi in Devanagari vs Roman script (Hinglish)",
      "Evaluation subjectivity — BLEU scores don't capture cultural nuance",
    ],
    learnings: [
      "Building safety layers before scaling inference",
      "Importance of deterministic debugging in ML systems",
      "Cultural context matters more than raw accuracy metrics",
    ],
  },
  {
    slug: "song-recommender-system",
    title: "Song Recommender System",
    shortDescription:
      "ML recommender generating adaptive playlists based on heart rate (BPM) with real-time feature handling and model evaluation.",
    fullDescription: `A machine learning-based music recommendation system that generates adaptive playlists based on physiological signals like heart rate (BPM). The system processes real-time biometric data and matches songs to the user's current physical state.

Built as an exploration of real-time ML inference with streaming data inputs and personalized recommendations.`,
    tags: ["Python", "ML", "Signal Processing"],
    featured: false,
    image: "https://images.unsplash.com/photo-1714779573250-36242918e044?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MTN8MHwxfHNlYXJjaHwzfHxzb3VuZCUyMHdhdmUlMjB2aXN1YWxpemF0aW9uJTIwYWJzdHJhY3QlMjBkYXJrfGVufDB8fHx8MTc3MTY4NjI3OXww&ixlib=rb-4.1.0&q=85",
    status: "Completed",
    year: "2024",
    highlights: [
      "Real-time BPM signal processing from wearable devices",
      "Collaborative filtering combined with content-based features",
      "Smooth playlist transitions based on energy curves",
      "Evaluation framework for subjective recommendation quality",
    ],
    techStack: [
      { category: "ML", items: ["Scikit-learn", "Pandas", "NumPy"] },
      { category: "Signal Processing", items: ["SciPy", "Librosa"] },
      { category: "Data", items: ["Spotify API", "Custom BPM dataset"] },
    ],
    challenges: [
      "Noisy heart rate data from consumer wearables",
      "Subjective nature of 'good' music recommendations",
      "Cold start problem for new users",
    ],
    learnings: [
      "Real-time ML inference requires careful latency budgeting",
      "Hybrid recommendation approaches outperform single methods",
      "User feedback loops are essential for recommendation systems",
    ],
  },
  {
    slug: "kaggle-portfolio",
    title: "Kaggle Portfolio",
    shortDescription:
      "33 notebooks, 10 datasets, 3 models. Notebooks Expert rank 2,913 / 59,240 with 9 bronze medals across ML, DL, and Computer Vision.",
    fullDescription: `My Kaggle journey spanning machine learning, deep learning, and computer vision. Achieved Notebooks Expert status through consistent contributions and community engagement.

The portfolio includes exploratory data analysis, model implementations, and educational notebooks that help others learn ML concepts.`,
    tags: ["Data Science", "ML", "Deep Learning", "CV"],
    link: "https://www.kaggle.com/shubhankartiwari",
    featured: false,
    image: "https://images.unsplash.com/photo-1753998943228-73470750c597?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjV8MHwxfHNlYXJjaHw0fHxjb2RpbmclMjBzZXR1cCUyMGRhcmslMjBtb2RlJTIwbW9uaXRvcnxlbnwwfHx8fDE3NzE2ODYyODF8MA&ixlib=rb-4.1.0&q=85",
    status: "Active",
    year: "2022-Present",
    highlights: [
      "Notebooks Expert — Rank #2,913 out of 59,240",
      "33 published notebooks with 9 bronze medals",
      "10 datasets contributed to the community",
      "Certified in ML, Deep Learning, and Computer Vision",
    ],
    techStack: [
      { category: "ML/DL", items: ["TensorFlow", "PyTorch", "Keras", "Scikit-learn"] },
      { category: "Data", items: ["Pandas", "NumPy", "Matplotlib", "Seaborn"] },
      { category: "CV", items: ["OpenCV", "PIL", "Albumentations"] },
    ],
    challenges: [
      "Balancing depth vs breadth in learning",
      "Communicating complex concepts clearly in notebooks",
      "Keeping up with rapidly evolving ML landscape",
    ],
    learnings: [
      "Teaching others solidifies your own understanding",
      "Consistent small contributions beat sporadic large ones",
      "Community feedback accelerates learning",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjects(): Project[] {
  return projects;
}
