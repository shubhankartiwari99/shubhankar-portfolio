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
The original plan was straightforward: build a multilingual LLM fine-tuned for Indian conversational patterns (Hindi, English, and the code-switched hybrid that most Indians actually speak in).

The gap was real. Most open-source models handle formal Hindi reasonably well. They fall apart on the casual, culturally-grounded conversation that's representative of how 1.4 billion people actually communicate. I built the full pipeline from scratch: dataset curation from three complementary sources, tokenisation, LoRA adapter initialisation, fine-tuning on a Kaggle T4 GPU, inference evaluation, and deployment packaging. Six notebooks, clean end-to-end.

The problem I ran into wasn't the training pipeline. It was evaluation.

---

While debugging my fine-tuned model's outputs, I kept noticing something that bothered me. Run the same prompt at the same temperature setting and the answer would be subtly different. Sometimes meaningfully different. Run it five times and you'd get five outputs that were individually plausible but semantically inconsistent with each other.

This wasn't a failure that showed up in standard benchmarks. Standard evaluations like MMLU, ROUGE scores, and HumanEval all evaluate accuracy on a single inference pass. They tell you whether a model *can* produce the right answer. They don't tell you whether it *reliably* produces consistent answers.

For a multilingual model targeting real conversational deployment, where the same user asks the same kind of question repeatedly and expects stable, predictable responses, that distinction matters enormously. I couldn't in good conscience ship something as a reliable inference layer until I understood this failure mode properly.

So before continuing to fine-tune, I built the evaluation infrastructure first.

---

That infrastructure grew into the overarching LLM Inference Systems project. What started as simple Monte Carlo sampling evolved into a production-grade safety net: a 9-category guardrail classifier that automatically intercepts self-harm, jailbreaks, and extremism with severity-scaled escalation logic. 

But catching explicit violations wasn't enough; the model's stochastic instability still persisted. So I built an empirical reliability guard. By conducting thorough grid sweeps, we established that temperature dominates output spread while top-p fine-tunes it. Now, when the system detects high-entropy inference (above the 0.25 empirical threshold) that indicates an unstable generation path, it automatically triggers an optimized fallback, forcing the model into a constrained probability space (T=0.1, top_p=0.5) to reliably recover stability without failing the request.

---

To make all this truly deployable, I stopped treating model weights as the only artifact that matters. I implemented strict Pydantic-powered deployment registries that demand absolute provenance. Every release is gated by Go/No-Go evaluation verdicts across 55+ automated regression tests. The registry binds model weights, explicit policy configurations, and "behavioral DNA snapshots" (frozen telemetry traces recording exact entropy patterns) using unbroken SHA-256 fingerprint chains.

The multilingual LLM is still a goal. What changed is the order of operations. Building invariant tests, adversarial safeguard classifiers, and strict snapshotting wasn't a detour; it was the prerequisite for shifting AI from a research curiosity into a production asset. I just had to build the tools to see that clearly.
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

My first major incident at Bank of America was a 3 AM SSL expiry that cascaded across three dependent microservices. The obvious move was to rollback the deployment that triggered the alert. But the deployment didn't cause the expiry; it just exposed it. A rollback would have gotten us back to green on the dashboard while leaving the actual problem in place to surface again, probably at a worse time.

The thing that actually fixed it was twenty minutes of reading logs before touching anything. Understanding the failure mode first. That twenty minutes felt expensive at 3 AM. It wasn't.

---

I've noticed most production issues are caught early by the people who've built the habit of reading the actual error message. Not the dashboard summary. Not the alert description. The log line.

Dashboards tell you something is broken. Logs tell you what broke and usually hint at why. The number of times I've watched someone spend an hour guessing at a problem that was described in plain text in the application log is genuinely high.

The second habit that matters is reproduction before remediation. The instinct is to start patching immediately, but resisting that instinct pays off. Five minutes spent confirming whether a failure is intermittent or consistent, whether it's affecting all users or a subset, whether it's data-dependent, changes what you do next entirely. A fix applied to the wrong failure mode makes things worse, adds noise, and delays finding the real cause.

The third is just doing root cause analysis and actually writing it down. Not for compliance. Because surface patches compound. The timeout you increase this month is the query scan you'll be debugging six months from now. Writing it down forces the thinking and creates a paper trail that helps the next person, which is often you, eight months later, with no memory of this incident.

---

The skills that make someone good at this don't come from building things. They come from being on the receiving end when things break: on-call rotations, post-mortem reviews, and watching more experienced engineers work through incidents. The pattern recognition that makes you think "this timeout looks like the thing from March" only builds up through exposure.

The other thing is staying calm, which sounds obvious but isn't. When the pager goes off and stakeholders are asking for updates every ten minutes, the pressure to do *something* visible is real. The engineers who are genuinely good at production triage are the ones who've learned to treat that pressure as noise. You read the logs. You reproduce the failure. You understand the system. Then you fix it.

The code that tells you what's wrong before the user notices is the best code. Writing that code requires understanding how systems fail. You only understand that by being there when they do.
    `,
  },
  {
    slug: "top-5-percent-kaggle-lessons",
    title: "Top 4.1% on Kaggle: Lessons That Transferred to Production",
    date: "2025-10-08",
    tags: ["ML", "Kaggle", "Data Science"],
    excerpt: "I hit Notebooks Expert ranked #2,441 (personal best #707). Here's what 34 notebooks actually taught me, and why almost none of it was about machine learning.",
    readTime: "5 min read",
    content: `
I hit Kaggle Notebooks Expert ranked 2,441 out of 59,663, personal best 707. 34 notebooks. I didn't expect any of it to make me a better backend engineer. It did.

Not in the obvious ways. Not "ML skills transfer to AI projects at work": I wasn't doing ML at Bank of America, I was building Java microservices for corporate banking workflows. The transfer was more fundamental than that, and honestly more useful.

---

The thing Kaggle teaches you that most software jobs don't is systematic experimentation under uncertainty. You have a hypothesis, you test it, you record what happened, you update. The discipline of actually writing down your results, even when the notebook is just for yourself, changes how you think about problems.

I brought that back to production work. When I'm debugging a failure now, I write down what I think is happening before I change anything. What I expect to see if I'm right. What I'd expect to see if I'm wrong. Then I check. It sounds slow but it's faster than the alternative, which is randomly changing things and hoping.

Kaggle also taught me something uncomfortable about validation. You think your model is working. Your local scores look great. Then the leaderboard humbles you because you were overfitting to your validation set in ways you didn't notice. The lesson isn't specific to ML: the environment you're testing in is never exactly the environment you're deploying to. I think about staging environments differently now because of this. "It worked in staging" is not a guarantee; it's a data point.

---

The ranking I'm most attached to isn't the current one. It's the personal best of 707.

I hit that early, grinding notebooks across regression, classification, NLP, and computer vision before I joined Bank of America in 2022. Then I stopped, not because I lost interest, but because production engineering took over. Four years of being on-call, owning incidents, and building systems that can't fail has a way of consuming your attention.

Coming back to Kaggle in 2025 alongside the LLM reliability research felt different. More purposeful. The notebooks I'm writing now are trying to answer specific questions about model behavior, not just demonstrate techniques. The work feels more connected to something I'm actually trying to understand.

---

The Expert badge is nice. It opens conversations. But the honest version of what I got from Kaggle is: a way of thinking about problems that I didn't have before, applied to a domain completely unrelated to machine learning.

If you're a software engineer considering it, don't start with competitions. Start with the Learn courses, pick a domain you're curious about, write notebooks that explain your thinking out loud. The leaderboard stuff can come later, if at all. The real value is the habit of careful, documented experimentation.

That habit is useful everywhere.
    `,
  },
  {
    slug: "trust-is-a-systems-property",
    title: "Trust Is a Systems Property",
    date: "2026-07-20",
    tags: ["AI", "Systems Engineering", "Reliability", "LLM"],
    excerpt:
      "Most conversations about AI end up in the same place: larger models, better architectures, more compute. Those advances expand what AI systems can do. They don't necessarily tell us when those systems should be trusted.",
    readTime: "6 min read",
    content: `
Most conversations about AI eventually end up in the same place: larger models, better architectures, and more compute. Those advances are expanding what AI systems can do.

They don't necessarily tell us when those systems should be trusted.

Software engineering already knows how to build dependable systems. We know how to monitor them, test them, observe them, and recover when they fail. AI changes that equation because the component at the center of the system is no longer deterministic.

---

Imagine a customer support assistant that retrieves outdated documentation.

Nothing is technically broken. The API works. Retrieval succeeds. The model generates a fluent answer. The failure is that the system has no way of recognizing it should have been uncertain. The question wasn't whether the model could answer. It was whether the system knew enough about its own uncertainty to decide when not to.

This clicked for me recently while building an evaluation harness for my own AI study: a multi-model stability leaderboard. I was stress-testing models like Qwen, Mistral, and Llama by introducing small adversarial variations into the input. A model could produce a fluent, confident response under one prompt, yet become noticeably less reliable after relatively small perturbations to the input. The final text often gave no hint of the underlying fragility. You could only catch the failure if you were observing the system during controlled evaluation.

---

My guess is that uncertainty estimates will eventually become as routine as distributed tracing or monitoring. Teams won't think of them as advanced AI features: they'll just be part of the infrastructure.

What surprised me was how often papers from very different areas ended up asking versions of the same question. Whether the focus was hallucination detection, robustness, or evaluation, the underlying concern was remarkably similar.

None of this makes model capability any less important. Better models still matter enormously. They just aren't sufficient to make AI dependable in production.

The objective hasn't changed. The engineering challenge has.
    `,
  },
  {
    slug: "what-building-llm-control-system-taught-me",
    title: "What Building an LLM Control System Actually Taught Me",
    date: "2026-06-25",
    tags: ["AI", "LLM", "ML Systems", "Reliability", "Engineering"],
    excerpt:
      "I built token-level observability, instability detection, and a closed-loop controller for LLM generation. The control loop reduced instability events, but it didn't improve the composite reliability score. That turned out to be the real lesson.",
    readTime: "8 min read",
    content: `
Many evaluation workflows assess LLM outputs only after generation is complete. But by the time a traditional framework flags a hallucination, a repetition loop, or another failure mode, the generation has already finished. For production ML systems, post-generation evaluation is valuable for analysis, but it cannot influence the output that has already been delivered to the user.

While building my AI Reliability Platform, I found myself asking a different engineering question: if failures emerge token by token, should reliability infrastructure also operate token by token?

That question gradually shifted the project from a benchmarking exercise into a deeper systems engineering problem. The platform evolved through four iterations, and each one taught me something the previous one couldn't.

---

### Iteration 1: Token-Level Observability

I hooked into the inference backend to monitor token-level entropy as each token was generated. This exposed behaviors like entropy collapse (where the model locks into a near-deterministic state) before they became obvious in the final output.

One trace made it immediately obvious why this mattered. I prompted the model with: *"Write only blank lines."* The output looked unremarkable, but at step 23 the entropy trace collapsed to 0.145 bits. The model had locked into a near-deterministic state. Without token-level observability, this failure was invisible.

### Iteration 2: Instability Detection

I built a streaming detection layer to identify emerging failure modes in real time (entropy collapse, repetition loops, and uncertainty drift) rather than waiting until the full sequence was generated.

The system flagged the step-23 collapse correctly, alongside repetition loops and uncertainty drift on other prompts. Detection worked. But detection alone doesn't fix anything.

### Iteration 3: Adaptive Intervention

So I built the next layer: a closed-loop controller that intervenes when it detects instability, lowering temperature and constraining top-p during generation.

Then the result surprised me.

The control loop reduced the number of instability events. But it did not improve the composite reliability score. Across my compare runs, adaptive generation consistently scored slightly lower than plain generation.

The system could see the problem clearly. It just couldn't reliably fix it, at least not with these intervention policies on a small model. Naive interventions can trade one failure mode for another.

### Iteration 4: Quantifying What Actually Matters

That surprise led me to question my own assumptions about what controls output stability. My intuition was that top-p would be the stronger lever because it directly constrains the candidate token pool during sampling.

Rather than trusting intuition, I ran a grid sweep:
- 4 temperature values × 5 top-p values × 20 prompts
- 400 evaluation configurations
- 1,663 sampled generations

The result: variance in instability across temperature settings was 0.003712. Variance across top-p settings was 0.001192. Temperature had roughly **3.1× more impact** on output stability than top-p.

The most stable configuration was Temperature = 0.1, Top-p = 0.5. The least stable was Temperature = 0.9, Top-p = 0.85.

---

### The Actual Lesson

The biggest takeaway wasn't about temperature or top-p. It was about the gap between observability and control.

Knowing a generation is going bad is necessary but not sufficient. Deciding what to do about it is its own hard problem. The system could detect entropy collapse at step 23 with perfect precision. But the intervention strategy of lowering temperature mid-generation introduced its own distortions.

Building reliable AI systems isn't just about choosing better model parameters. It's about designing architectures that can observe behaviour, evaluate interventions, and honestly measure whether those interventions actually help.

Sometimes the most useful thing a system can tell you is that the easy fix doesn't work.

One thing I like about working on AI systems is that the data is usually more interesting than the assumption you started with. This project was full of those moments.
    `,
  },
  {
    slug: "when-detection-works-and-recovery-doesnt",
    title: "When Detection Works Perfectly and Recovery Doesn't",
    date: "2026-06-18",
    tags: ["ML", "MLOps", "Drift Detection", "Fraud Detection", "Systems"],
    excerpt:
      "I built a drift-aware fraud detection pipeline with automated retraining. Detection worked. Governance worked. But the system couldn't recover because the recovery process had no new information to learn from.",
    readTime: "6 min read",
    content: `
I built a drift-aware fraud detection pipeline with automated retraining. Going into the project, I assumed that if drift was detected, the retraining pipeline would eventually recover from it.

What I learned was that detecting drift and recovering from drift are two entirely different problems.

---

### The Setup

The model was an XGBoost classifier trained on the Kaggle credit card fraud dataset (284,807 transactions, 492 frauds). Baseline AUC-PR was 0.824. Monitoring used KL divergence and Population Stability Index (PSI) on prediction distributions.

The workflow was straightforward: Drift Detected → Retrain → Shadow Deploy → Evaluate → Promote/Reject.

The governance layer evaluated candidate models against production using business loss, where a missed fraud is treated as 10× more expensive than a false alarm. It sweeps 50 thresholds to find the optimal operating point and rejects unstable promotions.

### What Happened

I introduced a distributional shift in the input stream.

The monitoring layer detected it immediately. Retraining was triggered. A shadow model was created. The governance layer compared the candidate against production.

Result: **no_change**.

The candidate model came back with exactly the same metrics as production: AUC-PR 0.824, AUC-ROC 0.975, same precision, same recall, same business loss.

The governance layer correctly refused to promote the candidate model.

At first, that felt wrong. If drift was detected, why didn't retraining help?

---

### The Bottleneck

The experiment exposed a limitation in the retraining workflow that I hadn't anticipated.

The retraining process was operating on the original training distribution. Even though drift was detected in production, the candidate model wasn't learning from the new patterns that triggered the drift event.

As a result, the retrained model came back with essentially the same performance as production. The system detected the problem correctly. The governance layer made the correct promotion decision. But the recovery process had no new information to learn from.

---

### The Lesson

A drift pipeline isn't actually self-healing just because it can retrain.

Detection → Retrain → Evaluate → Promote sounds complete on paper. But recovery depends on something deeper: the flow of data back into the learning process.

In this project, every component behaved as designed. The experiment simply highlighted that a governance pipeline can work perfectly and still be unable to recover if the data architecture doesn't support recovery.

One thing I've noticed across multiple AI projects is that detection is often the easy part. The harder problem is building systems that can respond effectively once a problem has been detected.

In this case, the system knew drift had happened. It just didn't have the information needed to adapt to it.

That gap between knowing something is wrong and being able to do something about it is where a lot of the real engineering complexity lives. And it's not a gap you notice until you build the full loop.
    `,
  },
  {
    slug: "from-enterprise-engineer-to-ai-researcher",
    title: "From Enterprise Engineer to AI Researcher",
    date: "2026-07-14",
    tags: ["Career", "AI", "Columbia", "Engineering", "Reflection"],
    excerpt:
      "Four years ago, I joined Bank of America as a fresher. This month, I concluded that chapter and committed to an M.S. in Artificial Intelligence at Columbia University. This is what that transition actually looked like from the inside.",
    readTime: "5 min read",
    content: `
Four years ago, I joined Bank of America as a fresher. Earlier this month, I concluded that chapter. This fall, I'll be starting an M.S. in Artificial Intelligence at Columbia University.

From the outside, that might look like a clean career pivot. From the inside, it was anything but.

---

During my Computer Science degree at SRM IST Chennai, I was first introduced to machine learning through coursework, projects, peer discussions, and exploring research literature. That curiosity stayed with me long after graduation.

But when I joined Bank of America in 2022, machine learning wasn't part of my day-to-day work. I was building Java microservices for corporate banking workflows. Debugging SSL expirations at 3 AM. Learning what it actually means to own a service in production: not just writing it, but deploying it, monitoring it, and being the person who picks up the phone when it breaks.

Over four years, I grew from an apprentice into the Subject Matter Expert for CashPro Search. I delivered 17+ production releases across 13 services. I resolved 50+ production incidents. I earned Gold, Silver, and Bronze Global Recognition Awards. I was named as an inventor on a patent for a governed multi-modal AI architecture.

That work taught me something about engineering that coursework can't: the difference between software that works and software that keeps working. Correctness under uncertainty. Systems that degrade gracefully instead of failing silently. The discipline of testing not just whether something is right, but whether it stays right.

---

Outside of work, the curiosity about AI kept pulling me back.

I started with Kaggle: publishing notebooks, climbing to Expert rank, eventually reaching a personal best of #707. But over time, my interest shifted from applying ML techniques to understanding how these systems behave.

The more I explored, the more I wanted to move beyond simply using modern AI systems. I wanted to understand how they learn, why they behave the way they do, and how to build them more reliably.

That led to a year of evenings spent building: LLM evaluation infrastructure, model governance pipelines, adversarial testing harnesses. The AI Reliability Platform. The drift-aware fraud detection system. Each project started as curiosity and evolved into something that felt like the beginning of a research question.

---

When I look back at Bank of America, what I'll remember most isn't a particular release, project, or technology. It's the people. The managers and teammates who trusted me with responsibility early, challenged my thinking, helped me grow through mistakes, and supported me throughout the journey. Every interaction, every challenge, and every lesson helped shape the engineer I am today.

At Columbia, I'm looking forward to combining the engineering discipline I learned in industry with a deeper understanding of modern AI. Not just how to build AI systems, but how to understand them: how they learn, how they reason, and how they can be made more reliable.

The curiosity that started during undergrad, survived four years of production engineering, and grew into hands-on AI projects is now becoming the foundation for graduate research.

Here's to the next chapter.
    `,
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllPosts(): Post[] {
  return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
