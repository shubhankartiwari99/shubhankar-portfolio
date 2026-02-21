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
- **Fixed Navigation Active State**: When clicking a nav link, that section now immediately highlights (fixed off-by-one issue where previous section was highlighted)
- **Improved Scroll Detection**: Added `isScrolling` flag to block scroll detection during smooth scroll animation, preventing conflicts. Increased threshold from 140px to 200px
- **Smoother Animations**: Reduced animation durations from 0.6s to 0.4s, easing curve `[0.25, 0.1, 0.25, 1]`
- **Removed Stagger Delays**: Eliminated per-item delays in lists for snappier feel
- **Reduced Transition Durations**: Changed from 300ms to 200ms for hover effects across all components

### Session 5 - Performance Optimization (Feb 2026)
- **Removed unused Three.js** - Eliminated unused dependency (~150KB), build directory reduced from 223MB to 9.8MB (95% reduction)
- **Deleted BackgroundCanvas** - Removed unused Three.js component
- **Next.js Image Optimization** - Converted project images to use Next.js `<Image>` with automatic AVIF/WebP formats and proper sizing
- **Image Remote Patterns** - Configured next.config.ts for Unsplash and Pexels domains
- **Enabled Compression** - Added `compress: true` to Next.js config

### Session 6 - RSS Feed & 404 Page (Feb 2026)
- **RSS Feed** - Created `/feed.xml` route with full RSS 2.0 spec, Atom link, proper CDATA escaping
- **RSS Metadata** - Added alternate link in site metadata for RSS autodiscovery
- **RSS Button** - Added RSS link button on blog listing page
- **Custom 404 Page** - Terminal-style error page with animated 404, "Go Home" and "Go Back" buttons

## Prioritized Backlog
### P1 - (Completed) Performance audit and bundle size optimization
### P2 - (Completed) RSS feed for blog, custom 404 page
### P3 - CMS for dynamic blog content, project detail pages, i18n support
