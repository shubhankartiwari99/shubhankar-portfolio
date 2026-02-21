# Shubhankar Tiwari Portfolio - PRD

## Original Problem Statement
User asked to review their existing portfolio website (Next.js 16) and suggest/implement improvements across design, content, and UX.

## Architecture
- **Stack**: Next.js 16 + React 19 + Tailwind CSS v4 + framer-motion + lucide-react
- **Deployment**: Vercel (shubhankartiwari.vercel.app)
- **Type**: Static single-page portfolio, no backend

## User Persona
- Shubhankar Tiwari, Software Engineer I A at Bank of America (Hyderabad)
- Backend/Platform engineer with 3+ years experience
- Kaggle Notebooks Expert (Rank 2,913/59,240)
- Building Indian Desi Multilingual LLM
- Target audience: Tech recruiters, engineering managers, collaborators

## Core Requirements (Static)
1. Dark-first, engineering-forward aesthetic
2. Hero with name, tagline, social links
3. About section with narrative + metrics
4. Experience timeline (Bank of America + HighRadius)
5. Projects showcase (LLM, Song Recommender, Kaggle)
6. Skills & Tools grouped by category
7. Credentials (Kaggle Expert, GPA, Certifications)
8. Engineering Principles
9. Footer with contact info + social links
10. Dark/Light theme toggle
11. Recruiter mode toggle (narrative vs bullets)

## What's Been Implemented (Feb 21, 2026)
- [x] Complete visual overhaul: dark zinc theme + amber accent (replacing generic purple/white)
- [x] Outfit font + JetBrains Mono (replacing Arial)
- [x] CSS-only animated background (dot grid + gradient glow, replacing heavy Three.js)
- [x] framer-motion scroll-triggered reveal animations
- [x] Hero section with social icons (GitHub, LinkedIn, Kaggle, Email)
- [x] About section with 2-col layout (text + stats cards)
- [x] Experience timeline: Bank of America + HighRadius (expandable cards)
- [x] Projects bento grid: Indian Desi LLM (featured), Song Recommender, Kaggle Portfolio
- [x] Skills section: 4 grouped skill categories with tags
- [x] Credentials: Kaggle Expert, B.Tech GPA, ML Certifications
- [x] Engineering Principles: Numbered monospace grid
- [x] Footer: Email, GitHub, LinkedIn, Kaggle, Twitter
- [x] Recruiter mode: toggles between narrative and ATS-friendly bullet points
- [x] Dark/Light theme toggle with localStorage persistence
- [x] Mobile responsive design
- [x] All tests passing (100%)

## Prioritized Backlog
### P0 (Critical) - Done
- All core sections implemented and tested

### P1 (High)
- Add smooth scroll navigation anchors
- Add a "Contact Me" CTA section
- Add page transition animations between sections

### P2 (Medium)
- Blog/Writing section
- Testimonials/Recommendations
- Custom 404 page
- Analytics integration
- SEO structured data (JSON-LD)

### P3 (Low/Future)
- Interactive terminal easter egg
- Animated gradient hero background
- Project detail pages (individual routes)
- CMS integration for dynamic content

## Next Tasks
1. Add section navigation anchors for smooth scrolling
2. Consider adding a blog section for technical writing
3. Enhance mobile experience with touch interactions
