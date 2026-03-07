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
  slug: "why-i-stopped-building-an-llm-and-started-evaluating-one",
  title: "I built the wrong thing. Here's what I found instead.",
  date: "2026-03-01",
  tags: ["AI", "LLM", "Reliability", "Python", "Research"],
  excerpt:
    "I built the full training pipeline. Then Sarvam AI happened. Here's why I pivoted toward behavioral reliability evaluation — and what I found when I ran 310 inferences through Qwen 2.5-7B.",
  readTime: "9 min read",
  content: `
Late December 2025, I started building what I was pretty convinced would be a genuinely useful project — a multilingual LLM fine-tuned for Indian conversational patterns. Hindi, English, and the code-switched Hinglish hybrid that's actually how most people I know communicate.

The gap was real. Most open-source models handle formal Hindi okay but fall apart on casual, culturally-grounded conversation. I'd seen it firsthand. It felt like a tractable problem with nobody squarely working on it at the open-source level.

So I built the full pipeline. Dataset curation from three sources. Tokenisation. LoRA adapter init. Fine-tuning on a Kaggle T4. Inference evaluation. Deployment packaging. Six notebooks, clean end-to-end. I was proud of it.

Then I looked up and Sarvam AI had been quietly doing the same thing — at 10x the scale, with a dedicated research team, for longer than I had. By the time my training pipeline was stable, the space had already moved.

I had a decision to make.

---

I could keep going. Plenty of people build things that already exist and still get value from it. But I kept coming back to something I'd noticed while debugging my model's outputs — something that bothered me more than the Sarvam situation.

The model would answer a question on one run. Run the same prompt at the same temperature, same everything, and the answer would be slightly different. Run it five times and you'd get five outputs that were individually plausible but semantically inconsistent with each other.

None of the standard benchmarks catch this. MMLU, HumanEval, ROUGE — they all evaluate on a single inference pass. They tell you whether a model *can* produce the right answer. They say nothing about whether it does so *reliably*, or whether the wrong answers are at least predictable.

That distinction doesn't matter much for research leaderboards. It matters a lot if you're deploying the thing.

I couldn't find tooling that measured this systematically. Not for 7B-class models. Not with output granular enough to be actionable. So I built it instead.

---

The platform uses Monte Carlo sampling — run each prompt five times, measure how semantically different the outputs are from each other. That divergence score is what I'm calling instability. It's a different signal from accuracy. You can have a model that's accurate on average but wildly inconsistent in *which* prompts it handles well. That's a different kind of broken.

Stack: Next.js dashboard, FastAPI backend on a Kaggle T4, sentence-transformers for semantic comparison, DBSCAN to cluster similar outputs. The benchmark was 62 prompts I wrote myself, across factual recall, math, logical reasoning, code generation, and creative writing, at three difficulty levels each. Five temperature settings per prompt. 310 inference calls total, about two and a half hours on the GPU.

Here's what I found.

---

**Temperature is basically irrelevant to consistency.**

This one surprised me because the conventional wisdom is pretty strong: lower temperature = more deterministic outputs. It's in every LLM deployment guide.

For Qwen 2.5-7B, across the 0.1–0.9 range, the instability variance was less than 0.001. The curves were flat. The model is not more or less consistent at different temperatures — it's consistent or inconsistent based on the prompt itself. A hard prompt at temperature 0.1 is just as unstable as the same prompt at 0.9.

If you're deploying this model and you're relying on low temperature to manage reliability, you're pulling a lever that isn't connected to anything.

**Coding is the least reliable category, which is awkward given the marketing.**

Qwen 2.5-7B is sold partly as a strong coding model. In my benchmark it ranked last — instability of 0.293 versus 0.205 for factual recall and 0.199 for reasoning. Confidence scores similarly worse.

This doesn't necessarily mean wrong code. It means *inconsistent* code. Different implementations, different variable names, different structural approaches on the same prompt across five runs. For a coding assistant where developers expect reproducible suggestions, that's a genuine problem.

**11.8% silent failures.**

Nearly one in eight inference calls returned zero output tokens. No error. No exception. Just nothing. The model simply didn't generate anything.

In a production system that means a blank response with no signal to the user or the application that something went wrong. Silent failures are worse than loud ones. At least loud ones are catchable.

**The hardest finding wasn't in the numbers.**

The single most unstable prompt in my entire dataset was: *"Name the three primary components of a transformer neural network architecture."*

Definitive answer. Not ambiguous. No reasoning required. Basic factual recall about the architecture the model itself is built on.

Instability scores of 0.614–0.654 across three temperature settings — highest in the dataset. The model contradicted itself across samples, produced semantically divergent outputs, struggled with a question it should be most capable of answering.

That's not a benchmark quirk. That's Qwen 2.5-7B having unreliable self-knowledge about its own architectural domain. And it has real implications for anyone deploying it in contexts where consistent, factually stable outputs matter.

---

The 84.7% escalation rate sounds alarming and is worth explaining. The platform flags an inference when outputs across MC samples diverge beyond a threshold. 144 out of 170 inferences triggered this. But the benchmark was deliberately designed to stress-test known failure modes — the prompts weren't a random sample of real-world use. The point isn't that Qwen is broadly unreliable. The point is that the infrastructure correctly finds and quantifies the failure modes it's looking for.

---

I've been thinking about why behavioral consistency evaluation isn't more standard.

My guess: it's expensive. Five inference calls per prompt instead of one. It's not a finished project — it's infrastructure for a longer research arc.

The benchmark dataset and research analysis notebook are on Kaggle if you want to dig in.
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
