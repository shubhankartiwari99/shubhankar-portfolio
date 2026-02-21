# Portfolio Content Guide

Quick reference for adding and updating content on your portfolio.

---

## Adding a New Blog Post

Edit `/src/data/posts.ts` and add a new entry to the `posts` array:

```typescript
{
  slug: "your-post-slug",           // URL-friendly (lowercase, hyphens)
  title: "Your Post Title",
  date: "2026-01-15",               // YYYY-MM-DD format
  tags: ["Tag1", "Tag2"],
  excerpt: "Short description for the blog listing page.",
  readTime: "5 min read",           // Estimate: ~200 words per minute
  content: `
Your markdown content here.

## Headings Work

**Bold text** and *italic text* work.

- Bullet points
- Work too

\`\`\`python
# Code blocks with syntax
def hello():
    print("Hello World")
\`\`\`
  `,
}
```

**Tips:**
- Use backticks for the content string (allows multi-line)
- Escape backticks inside code blocks with backslash
- Posts are automatically sorted by date (newest first)

---

## Adding a New Project

Edit `/src/data/projects.ts` and add a new entry to the `projects` array:

```typescript
{
  slug: "project-slug",
  title: "Project Name",
  shortDescription: "One-liner for the card on homepage.",
  fullDescription: `
Longer description with multiple paragraphs.

Second paragraph here.
  `,
  tags: ["Python", "ML", "FastAPI"],
  github: "https://github.com/username/repo",  // optional
  link: "https://live-demo.com",               // optional
  featured: false,                             // true = full-width card
  image: "https://images.unsplash.com/...",    // use Unsplash or Pexels
  status: "Completed",                         // "Active" | "Completed" | "In Progress"
  year: "2025",
  highlights: [
    "Key achievement 1",
    "Key achievement 2",
  ],
  techStack: [
    { category: "Backend", items: ["Python", "FastAPI"] },
    { category: "ML", items: ["PyTorch", "Scikit-learn"] },
  ],
  challenges: ["Challenge 1", "Challenge 2"],  // optional
  learnings: ["Learning 1", "Learning 2"],     // optional
}
```

---

## Updating Personal Info

### Hero Section
Edit `/src/components/Hero.tsx`:
- Name, title, tagline
- Social links array

### About Section
Edit `/src/components/About.tsx`:
- Bio paragraphs
- Stats (years experience, Kaggle rank, etc.)

### Experience Section
Edit `/src/components/Experience.tsx`:
- `experiences` array with job details

### Contact Section
Edit `/src/components/Contact.tsx`:
- Email, social links

---

## Building & Deploying

```bash
# Local development
npm run dev

# Build for production
npm run build

# The site auto-deploys to Vercel on git push
```

---

## File Structure

```
src/
├── app/
│   ├── blog/           # Blog pages
│   ├── projects/       # Project detail pages
│   └── page.tsx        # Homepage
├── components/         # Section components
├── data/
│   ├── posts.ts        # Blog content
│   └── projects.ts     # Project content
```

---

## Image Sources

Use royalty-free images from:
- [Unsplash](https://unsplash.com) - High quality photos
- [Pexels](https://pexels.com) - Free stock photos

Both are configured in `next.config.ts` for optimized loading.
