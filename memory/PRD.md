# Shubhankar Tiwari Portfolio - PRD

## Original Problem Statement
User asked to review their existing portfolio website (Next.js 16) and suggest/implement improvements across design, content, and UX.

## Architecture
- **Stack**: Next.js 16 + React 19 + Tailwind CSS v4 + framer-motion + lucide-react + react-markdown
- **Deployment**: Vercel (shubhankartiwari.vercel.app)
- **Type**: Static portfolio + blog, no backend
- **Analytics**: @vercel/analytics + @vercel/speed-insights

## What's Been Implemented

### Session 1 - Full Redesign
- Dark-first engineering aesthetic (zinc-950 + amber accent, Outfit + JetBrains Mono)
- All content sections: Hero, About, Experience, Projects, Skills, Credentials, Principles, Footer
- Recruiter mode toggle + Dark/Light theme toggle
- CSS dot-grid background + framer-motion scroll animations

### Session 2 - Feature Additions
- Smooth scroll section navigation anchors in navbar
- Interactive Terminal (10+ commands + easter eggs)
- Contact CTA section
- SEO JSON-LD structured data (Person schema)

### Session 3 - Blog + Fixes
- Fixed TypeScript deployment error (ease tuple type in framer-motion)
- Blog section with 3 posts: "Production Debugging", "Indian Multilingual LLM", "Top 5% Kaggle"
- Blog listing page (/blog) and individual post pages (/blog/[slug])
- react-markdown rendering with styled headings, code blocks, lists, blockquotes
- Shared Navigation via Providers context (works on all pages)
- Blog link in nav with active state highlighting
- Vercel Analytics + Speed Insights
- Production build verified clean (next build succeeds)

### Session 4 - UI Polish (Feb 2026)
- **Dark Mode Default**: Added inline script in layout.tsx to prevent light mode flash on initial load
- **Improved Scroll Navigation**: Updated scroll-padding-top to 96px, implemented manual scroll offset calculation
- **Smoother Animations**: Reduced animation durations from 0.6s to 0.4s, simplified easing to "easeOut"
- **Removed Stagger Delays**: Eliminated per-item delays in lists for snappier feel
- **Optimized Scroll Detection**: Added requestAnimationFrame throttling for active section detection
- **Reduced Transition Durations**: Changed from 300ms to 200ms for hover effects across all components

## Prioritized Backlog
### P1 - Performance audit and bundle size optimization
### P2 - RSS feed for blog, custom 404 page
### P3 - CMS for dynamic blog content, project detail pages, i18n support
