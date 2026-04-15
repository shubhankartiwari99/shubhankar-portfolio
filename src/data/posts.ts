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
    slug: "building-indian-multilingual-llm",
    title: "Building an Indian Multilingual LLM: Why I Had to Solve Reliability First",
    date: "2026-01-20",
    tags: ["AI", "LLM", "NLP", "Python", "Research"],
    excerpt:
      "The goal was a multilingual LLM for Indian conversational patterns. Before I could build it properly, I had to figure out whether the model I was building on top of could be trusted at all.",
    readTime: "7 min read",
    content: `
The original plan was straightforward: build a multilingual LLM fine-tuned for Indian conversational patterns — Hindi, English, and the code-switched hybrid that most Indians actually speak in.

The gap was real. Most open-source models handle formal Hindi reasonably well. They fall apart on the casual, culturally-grounded conversation that's representative of how 1.4 billion people actually communicate. I built the full pipeline — dataset curation from three complementary sources, tokenisation, LoRA adapter initialisation, fine-tuning on a Kaggle T4 GPU, inference evaluation, deployment packaging. Six notebooks, clean end-to-end.

The problem I ran into wasn't the training pipeline. It was evaluation.

---

While debugging my fine-tuned model's outputs, I kept noticing something that bothered me. Run the same prompt at the same temperature setting and the answer would be subtly different. Sometimes meaningfully different. Run it five times and you'd get five outputs that were individually plausible but semantically inconsistent with each other.

This wasn't a failure that showed up in standard benchmarks. MMLU, ROUGE scores, HumanEval — all of these evaluate accuracy on a single inference pass. They tell you whether a model *can* produce the right answer. They don't tell you whether it *reliably* produces consistent answers.

For a multilingual model targeting real conversational deployment — where the same user asks the same kind of question repeatedly and expects stable, predictable responses — that distinction matters enormously. I couldn't in good conscience ship something as a reliable inference layer until I understood this failure mode properly.

So before continuing to fine-tune, I built the evaluation infrastructure first.

---

That infrastructure grew into the overarching LLM Inference Systems project. What started as simple Monte Carlo sampling evolved into a production-grade safety net: a 9-category guardrail classifier that automatically intercepts self-harm, jailbreaks, and extremism with severity-scaled escalation logic. 

But catching explicit violations wasn't enough; the model's stochastic instability still persisted. So I built an empirical reliability guard. By conducting thorough grid sweeps, we established that temperature dominates output spread while top-p fine-tunes it. Now, when the system detects high-entropy inference (above the 0.25 empirical threshold) that indicates a confused or "hallucinating" generation path, it automatically triggers a grid-sweep-optimized fallback — forcing the model into a highly constrained probability space (T=0.1, top_p=0.5) to reliably recover stability without failing the request.

---

To make all this truly deployable, I stopped treating model weights as the only artifact that matters. I implemented strict Pydantic-powered deployment registries that demand absolute provenance. Every release is gated by Go/No-Go evaluation verdicts across 55+ automated regression tests. The registry binds model weights, explicit policy configurations, and "behavioral DNA snapshots" (frozen telemetry traces recording exact entropy patterns) using unbroken SHA-256 fingerprint chains.

The multilingual LLM is still a goal. What changed is the order of operations. Building invariant tests, adversarial safeguard classifiers, and strict snapshotting wasn't a detour — it's the prerequisite for shifting AI from a research curiosity into a production asset. I just had to build the tools to see that clearly.
    `,
  },
  {
    slug: "cultural-alignment-dose-response",
    title: "Evaluating Cultural Alignment as a Dose-Response Problem",
    date: "2026-04-12",
    tags: ["LLM", "Research", "Evaluation", "MLOps"],
    excerpt: "Most alignments are tested as binary pass/fails. But what if we treat inference shaping like a pharmaceutical trial? Testing a 3-tier prompt gradient on a Qwen 2.5-7B live proxy yielded a perfect monotonic dose-response curve.",
    readTime: "6 min read",
    content: `
How do you measure a model's cultural alignment? The standard approach is to feed it localized prompts and manually grade the response on a binary scale: culturally aligned or not. But this ignores the single most interesting property of modern generative models: their probability distributions respond proportionally to semantic cues. 

Treating alignment as a binary pass/fail is actively throwing away information. To actually understand how a model behaves, we need to treat it as a continuous dose-response problem.

---

### The 3-Tier Gradient Experiment

I designed an empirical experiment running live inference requests against Qwen 2.5-7B on a Kaggle T4 GPU. We captured exactly 65 live inferences, applying a heavily controlled 3-tier prompt gradient to measure the probability of triggering a culturally localized response:

**Level 0: Neutral** (No localized cues, standard factual inquiry)
**Level 1: Weak India** (Subtle references to regions, minor Hinglish injection)
**Level 2: Strong India** (Explicit Devanagari script or deeply embedded cultural context)

We pushed these through the inference runtime and analyzed the outputs. The results formed a perfectly monotonic dose-response curve.

**The Findings:**
* **Neutral (n=25):** Mean cultural score 0.00. Zero false positives. P(cultural) = 0.0.
* **Weak India (n=20):** Mean cultural score 0.04. P(cultural) = 0.4.
* **Strong India (n=20):** Mean cultural score 0.31. P(cultural) = 1.0. 

A gradient of exactly 1.00. 

### Why This Matters

This proves mathematically that inference-time runtime acts as a proportional cultural amplifier. It's not a switch that flips when you feed it enough Hindi. The probability of localized behavior increases linearly alongside the semantic "strength" of the prompt conditioning. 

Crucially, the experiment also logged the *entropy collapse ratio* at each state. For a neutral prompt, the collapse ratio sat at 0.39. But under heavy cultural conditioning (Strong India), the ratio dropped to 0.29. The model wasn’t just producing different words; its internal probability distribution was actively fighting against stochastic spread as it locked onto a stronger semantic signal. 

When you test models via continuous gradients rather than binary evaluations, you stop asking *"does this work?"* and start asking *"what is the exact operational threshold where stochasticity gives way to deterministic alignment?"* 

Those are the numbers you actually need to push a model to production confidently.
    `,
  },
  {
    slug: "why-production-debugging-is-underrated",
    title: "Why Production Debugging Is an Underrated Skill",
    date: "2025-12-15",
    tags: ["Backend", "Production", "Engineering"],
    excerpt: "Most engineers learn to build things. The skill that actually separates good engineers from great ones is knowing what to do when something breaks at 3 AM.",
    readTime: "6 min read",
    content: `
There's a thing that happens when you've been on-call long enough. You stop reacting and start reading.

Early on, my instinct during an incident was to do something. Rollback. Restart the service. Change a config. The pressure of a production failure feels like it demands immediate action, and sitting there reading logs while something is down feels wrong.

It took me a while to realise that's exactly backwards.

---

My first major incident at Bank of America was a 3 AM SSL expiry that cascaded across three dependent microservices. The obvious move was to rollback the deployment that triggered the alert. But the deployment didn't cause the expiry — it just exposed it. A rollback would have gotten us back to green on the dashboard while leaving the actual problem in place to surface again, probably at a worse time.

The thing that actually fixed it was twenty minutes of reading logs before touching anything. Understanding the failure mode first. That twenty minutes felt expensive at 3 AM. It wasn't.

---

I've noticed most production issues are caught early by the people who've built the habit of reading the actual error message. Not the dashboard summary. Not the alert description. The log line.

Dashboards tell you something is broken. Logs tell you what broke and usually hint at why. The number of times I've watched someone spend an hour guessing at a problem that was described in plain text in the application log is genuinely high.

The second habit that matters is reproduction before remediation. The instinct is to start patching — resist it. Five minutes spent confirming whether a failure is intermittent or consistent, whether it's affecting all users or a subset, whether it's data-dependent, changes what you do next entirely. A fix applied to the wrong failure mode makes things worse, adds noise, and delays finding the real cause.

The third is just doing root cause analysis and actually writing it down. Not for compliance. Because surface patches compound. The timeout you increase this month is the query scan you'll be debugging six months from now. Writing it down forces the thinking and creates a paper trail that helps the next person — which is often you, eight months later, with no memory of this incident.

---

The skills that make someone good at this don't come from building things. They come from being on the receiving end when things break — on-call rotations, post-mortem reviews, watching more experienced engineers work through incidents. The pattern recognition that makes you think "this timeout looks like the thing from March" only builds up through exposure.

The other thing is staying calm, which sounds obvious but isn't. When the pager goes off and stakeholders are asking for updates every ten minutes, the pressure to do *something* visible is real. The engineers who are genuinely good at production triage are the ones who've learned to treat that pressure as noise. You read the logs. You reproduce the failure. You understand the system. Then you fix it.

The code that tells you what's wrong before the user notices is the best code. Writing that code requires understanding how systems fail. You only understand that by being there when they do.
    `,
  },
  {
    slug: "top-5-percent-kaggle-lessons",
    title: "Top 4.1% on Kaggle: Lessons That Transferred to Production",
    date: "2025-10-08",
    tags: ["ML", "Kaggle", "Data Science"],
    excerpt: "I hit Notebooks Expert ranked #2,441 — personal best #707. Here's what 34 notebooks actually taught me, and why almost none of it was about machine learning.",
    readTime: "5 min read",
    content: `
I hit Kaggle Notebooks Expert ranked 2,441 out of 59,663, personal best 707. 34 notebooks. I didn't expect any of it to make me a better backend engineer. It did.

Not in the obvious ways. Not "ML skills transfer to AI projects at work" — I'm not doing ML at Bank of America, I'm building Java microservices for corporate banking workflows. The transfer was more fundamental than that, and honestly more useful.

---

The thing Kaggle teaches you that most software jobs don't is systematic experimentation under uncertainty. You have a hypothesis, you test it, you record what happened, you update. The discipline of actually writing down your results — even when the notebook is just for you — changes how you think about problems.

I brought that back to production work. When I'm debugging a failure now, I write down what I think is happening before I change anything. What I expect to see if I'm right. What I'd expect to see if I'm wrong. Then I check. It sounds slow but it's faster than the alternative, which is randomly changing things and hoping.

Kaggle also taught me something uncomfortable about validation. You think your model is working. Your local scores look great. Then the leaderboard humbles you because you were overfitting to your validation set in ways you didn't notice. The lesson isn't specific to ML — it's that the environment you're testing in is never exactly the environment you're deploying to. I think about staging environments differently now because of this. "It worked in staging" is not a guarantee; it's a data point.

---

The ranking I'm most attached to isn't the current one. It's the personal best of 707.

I hit that early, grinding notebooks across regression, classification, NLP, and computer vision before I joined Bank of America in 2022. Then I stopped — not because I lost interest but because production engineering took over. Four years of being on-call, owning incidents, and building systems that can't fail has a way of consuming your attention.

Coming back to Kaggle in 2025 alongside the LLM reliability research felt different. More purposeful. The notebooks I'm writing now are trying to answer specific questions about model behavior, not just demonstrate techniques. The work feels more connected to something I'm actually trying to understand.

---

The Expert badge is nice. It opens conversations. But the honest version of what I got from Kaggle is: a way of thinking about problems that I didn't have before, applied to a domain completely unrelated to machine learning.

If you're a software engineer considering it — don't start with competitions. Start with the Learn courses, pick a domain you're curious about, write notebooks that explain your thinking out loud. The leaderboard stuff can come later, if at all. The real value is the habit of careful, documented experimentation.

That habit is useful everywhere.
    `,
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllPosts(): Post[] {
  return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
