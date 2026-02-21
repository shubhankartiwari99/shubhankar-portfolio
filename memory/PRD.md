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
9. Interactive Terminal section
10. Contact CTA section
11. Footer with contact info + social links
12. Dark/Light theme toggle
13. Recruiter mode toggle (narrative vs bullets)
14. Smooth scroll section navigation
15. SEO structured data (JSON-LD)

## What's Been Implemented

### Session 1 (Feb 21, 2026) - Full Redesign
- [x] Complete visual overhaul: dark zinc theme + amber accent
- [x] Outfit + JetBrains Mono fonts
- [x] CSS-only animated background (dot grid + gradient glow)
- [x] framer-motion scroll-triggered reveal animations
- [x] All content sections: Hero, About, Experience, Projects, Skills, Credentials, Principles, Footer
- [x] Recruiter mode toggle + Dark/Light theme toggle
- [x] Mobile responsive design
- [x] All tests passing (100%)

### Session 2 (Feb 21, 2026) - Feature Additions
- [x] Smooth scroll section navigation anchors in navbar (About, Work, Projects, Skills, Terminal, Contact)
- [x] Active section highlighting in nav while scrolling
- [x] scroll-padding-top + scroll-margin-top for proper anchor offset
- [x] Interactive Terminal section (commands: help, about, experience, ls projects/, cat skills, contact, neofetch, whoami, resume, history, clear + easter eggs: sudo hire shubhankar, rm -rf /, exit, ping)
- [x] Contact CTA section ("Let's build something reliable together" + Email Me, LinkedIn, Resume buttons)
- [x] SEO JSON-LD structured data (Person schema with name, jobTitle, worksFor, sameAs, alumniOf, knowsAbout)
- [x] All tests passing (95% -> 100% after scroll-margin fix)

## Prioritized Backlog
### P1 (High)
- Blog/Writing section for technical content
- Animated page load transitions
- Custom cursor effects

### P2 (Medium)
- Custom 404 page
- Analytics integration (Vercel Analytics / Plausible)
- Testimonials/Recommendations section
- Performance optimization (image lazy loading, bundle analysis)

### P3 (Low/Future)
- CMS integration for dynamic blog content
- Project detail pages (individual routes)
- RSS feed for blog
- i18n support (Hindi translation)

## Next Tasks
1. Consider adding a blog section for technical writing
2. Add analytics to track visitor engagement
3. Performance audit and optimization
