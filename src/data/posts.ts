export interface Post {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  readTime: string;
  content: string;
}

export const posts: Post[] = [
  {
    slug: "why-production-debugging-is-underrated",
    title: "Why Production Debugging Is an Underrated Skill",
    date: "2025-12-15",
    tags: ["Backend", "Production", "Engineering"],
    excerpt:
      "Most engineers optimize for building features. The best ones optimize for keeping systems alive. Here's what 3 years of production triage taught me.",
    readTime: "6 min read",
    content: `
Most engineering interviews test your ability to build things. But in production, the skill that separates good engineers from great ones is the ability to **debug under pressure**.

## The 3 AM Deployment

My first major production incident at Bank of America started at 3 AM. A deployment went sideways — SSL certificates had expired on a critical service, and the cascading failures took down three dependent microservices.

The standard playbook says: rollback. But rolling back wouldn't fix the expired certificates. We needed to triage, isolate, and fix — all while the clock was ticking.

## What I Learned

**1. Read the logs, not the dashboards.**

Dashboards give you symptoms. Logs give you causes. When a service is throwing 500s, the dashboard tells you "something is broken." The logs tell you *why* — a missing environment variable, a malformed request, a connection timeout. I've lost count of how many issues I've resolved by simply reading the actual error message instead of guessing from metrics.

**2. Reproduce before you fix.**

The instinct during an incident is to start patching immediately. Resist it. Take 5 minutes to understand the failure mode. Is it intermittent or consistent? Does it affect all users or a subset? Is it data-dependent?

A systematic reproduction saves you from the worst outcome: deploying a "fix" that doesn't actually fix anything, while the real issue continues.

**3. Root-cause analysis is non-negotiable.**

Surface-level patches create technical debt that compounds. When a database connection starts timing out, the surface fix is to increase the timeout. The root cause might be an unindexed query that's scanning millions of rows.

Every incident should end with a "5 Whys" analysis. Not because it's process theater — because it prevents the same 3 AM call next month.

## The Underrated Part

Production debugging requires a unique combination of skills:

- **Systems thinking** — understanding how components interact across service boundaries
- **Calm under pressure** — making clear decisions when the pager is going off
- **Communication** — coordinating across teams while keeping stakeholders informed
- **Pattern recognition** — recognizing that this timeout looks like the one from two months ago

These skills don't come from LeetCode. They come from being on-call, from reading post-mortems, from building the habit of asking "what could go wrong?" before every deployment.

## Build It Into Your Practice

If you want to become a better production debugger:

1. **Volunteer for on-call rotations.** Yes, they're painful. That's the point.
2. **Read every post-mortem** your org publishes. Learn from others' incidents.
3. **Practice reading logs** — not just grepping for ERROR, but understanding the full request lifecycle.
4. **Build observability into your services** from day one. Structured logging, health checks, meaningful metrics.

The best code is code that tells you what's wrong before the user notices. Production debugging isn't just a skill — it's a mindset.
    `,
  },
  {
    slug: "building-indian-multilingual-llm",
    title: "Building an Indian Multilingual LLM: What I've Learned So Far",
    date: "2026-01-20",
    tags: ["AI", "LLM", "NLP", "Python"],
    excerpt:
      "Notes from building an inference layer for a multilingual LLM with persona safety, emotional invariants, and deterministic fingerprinting.",
    readTime: "8 min read",
    content: `
I've been working on an Indian multilingual LLM inference system — not training a model from scratch, but building the infrastructure around it: inference pipelines, safety layers, and evaluation frameworks.

## Why This Matters

India has 22 official languages and hundreds of dialects. Most LLMs are heavily English-centric. Even "multilingual" models often treat Hindi or Tamil as an afterthought. The goal of this project is to build a robust inference and application layer that handles multilingual input/output with the same reliability as English.

## Architecture Decisions

### Persona Safety CI

One of the first things I implemented was a CI pipeline for persona safety. The idea: every model checkpoint gets tested against a suite of adversarial prompts before it can be deployed.

\`\`\`python
# Simplified persona safety test
def test_persona_boundary(model, prompt):
    response = model.generate(prompt)
    violations = check_boundaries(response)
    assert len(violations) == 0, f"Persona violation: {violations}"
\`\`\`

This catches issues like:
- The model breaking character when prompted in a different language
- Responses that leak training data patterns
- Inconsistent persona behavior across language switches

### Emotional Invariants

LLMs can be unpredictable in their emotional tone. A query about a sensitive topic in Hindi shouldn't produce a cheerful response just because the training data is skewed.

I built an emotional invariant checker that validates response tone against expected emotional ranges for given input categories. It's not perfect — emotion detection is hard — but it catches the obvious failures.

### Deterministic Model Fingerprinting

When you're running multiple model versions in parallel (A/B testing, canary deployments), you need to know exactly which model produced which output. I implemented a fingerprinting system that tags every response with:

- Model version hash
- Inference configuration
- Input language detected
- Response language

This makes debugging production issues significantly easier.

## Challenges

**1. Code-switching is hard.**

Indian speakers frequently mix languages mid-sentence. "Mujhe ek coffee chahiye, but make it strong." The model needs to understand this isn't two separate languages — it's one coherent request.

**2. Script diversity.**

Hindi can be written in Devanagari or Roman script (Hinglish). The same sentence, same language, two completely different input formats. Tokenizers struggle with this.

**3. Evaluation is subjective.**

How do you evaluate if a Hindi response is "good"? BLEU scores don't capture cultural nuance. Human evaluation doesn't scale. I'm experimenting with LLM-as-judge approaches, but the judge itself has English bias.

## What's Next

- Building a benchmark suite specifically for Indian language code-switching
- Implementing streaming inference with language detection at the token level
- Open-sourcing the safety CI framework

This project sits at the intersection of my backend systems experience and my ML interests. The inference layer needs to be as reliable as any production service — low latency, observable, and resilient to bad inputs.

If you're working on multilingual AI systems, I'd love to connect. Reach out at tiwarishubhankar@gmail.com.
    `,
  },
  {
    slug: "top-5-percent-kaggle-lessons",
    title: "Top 5% on Kaggle: Lessons That Transferred to Production",
    date: "2025-10-08",
    tags: ["ML", "Kaggle", "Data Science"],
    excerpt:
      "How grinding Kaggle competitions taught me skills that directly improved my production engineering work.",
    readTime: "5 min read",
    content: `
I hit Kaggle Notebooks Expert status — ranked 2,913 out of 59,240. It took 33 notebooks, countless hours of experimentation, and a lot of failed approaches. But the biggest surprise wasn't the ranking — it was how much Kaggle improved my day job as a backend engineer.

## The Surprising Overlap

On the surface, Kaggle and production engineering seem like different worlds. One is about optimizing model performance on static datasets. The other is about keeping systems alive under real-world chaos.

But the core skills transfer directly.

## 1. Systematic Experimentation

Kaggle teaches you to be methodical. You don't just throw random hyperparameters at a model — you form hypotheses, test them, record results, and iterate.

This is exactly how production debugging works:
- **Hypothesis:** The timeout is caused by an unindexed query
- **Test:** Add the index, measure response time
- **Record:** Document the before/after metrics
- **Iterate:** Monitor for a week to confirm stability

## 2. Feature Engineering = API Design

In Kaggle, the best features are the ones that capture the most signal with the least noise. In API design, the best endpoints are the ones that serve the most useful data with the least complexity.

Both require you to think deeply about what information actually matters and how to represent it cleanly.

## 3. Validation Is Everything

Every Kaggler learns the hard way: your local CV score doesn't always match the leaderboard. The model that looks great on your validation set might overfit spectacularly on unseen data.

In production: the service that passes all unit tests might still fail under real traffic. Just like Kaggle's train/test split, you need proper staging environments, canary deployments, and production smoke tests.

## 4. Knowing When to Stop

One of the hardest Kaggle skills is knowing when further optimization isn't worth the effort. Going from 0.85 to 0.90 accuracy might take 10x the effort of going from 0.70 to 0.85.

In production engineering, this translates to: not every system needs five nines of availability. Not every API needs sub-10ms latency. Engineering effort should be proportional to business impact.

## The Notebooks That Taught Me Most

Some of my most educational Kaggle work:

- **Iris Outlier Detection** — taught me about data quality (production parallel: input validation)
- **Diabetes Classification** — taught me about imbalanced datasets (production parallel: handling edge cases)
- **Tesla Stock Analysis** — taught me about time-series patterns (production parallel: monitoring and alerting)

## My Advice for Engineers Considering Kaggle

1. **Start with the Learn courses.** Kaggle's free ML and Deep Learning courses are genuinely excellent.
2. **Focus on notebooks, not competitions.** The learning happens when you explain your approach, not when you optimize for the leaderboard.
3. **Apply it to your domain.** Don't just do generic tasks — try to solve problems related to your actual work.
4. **Share your work.** Publishing notebooks forces you to think clearly and communicate effectively.

The Kaggle Expert badge looks nice on a resume. But the real value is the thinking patterns it builds — patterns that make you a better engineer in any domain.
    `,
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllPosts(): Post[] {
  return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
