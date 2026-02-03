# Project Skill & Instructions for Claude

## Repository

- GitHub: https://github.com/biplab85/appwedo
- Main branch: main

------------------------------------------------------------------------

## Project Overview

Rebuild the website https://www.appwedo.com/ as a modern, responsive,
multi-page static-first React website.

The site must: - Keep the same color palette - Keep the same font
family - Use modern UI/UX - Be responsive (mobile-first) - Be deployed
on Vercel - Initially static, later upgradeable to dynamic

All content (text + images) must come from: https://www.appwedo.com/#

------------------------------------------------------------------------

## Tech Stack

-   React (Vite or Next.js App Router preferred)
-   Tailwind CSS
-   SCSS with variables
-   SwiperJS (https://swiperjs.com/) for sliders
-   FancyApps (https://fancyapps.com/) for modal/lightbox
-   SVG animations where needed
-   Deployed on Vercel

------------------------------------------------------------------------

## Architecture Rules

### Content Management

All content must be stored in: src/content.tsx\
All pages and sections must consume data from content.tsx.\
No hardcoded text inside components.

### Folder Structure

```
src/
├── components/      # Reusable UI components (Button, Card, Modal, etc.)
├── sections/        # Page sections (Hero, Services, Testimonials, etc.)
├── styles/          # SCSS variables and global styles
├── hooks/           # Custom React hooks
├── utils/           # Utility functions
├── types/           # TypeScript type definitions
├── content.tsx      # All site content (centralized)
├── App.tsx          # Main app component
└── main.tsx         # Entry point

public/
├── images/          # Optimized images (WebP)
├── fonts/           # Custom fonts (if needed)
└── favicon.ico      # Favicon
```

------------------------------------------------------------------------

## Sections Structure

1.  Navigation\
2.  Hero Section\
3.  Problem Section\
4.  Solution Section\
5.  Services (How We Help)\
6.  Benefits\
7.  Action Plan\
8.  Products / What We Build\
9.  Testimonials\
10. FAQ\
11. Special Offer\
12. Final CTA\
13. Footer

------------------------------------------------------------------------

## UI / UX Requirements

-   Modern design
-   Responsive (mobile, tablet, desktop)
-   Sticky header with scroll behavior
-   Smooth scrolling
-   SVG animations where useful
-   FancyApps modal
-   SwiperJS sliders

------------------------------------------------------------------------

## Styling Rules

-   Same color palette
-   Same font family
-   Tailwind for layout
-   SCSS variables for colors, fonts, breakpoints
-   No inline styles

------------------------------------------------------------------------

## Navigation Rules

-   Logo: APPWEDO
-   Links: Services, Products, About, Team
-   CTA Button: Get a Free Quote
-   Sticky header
-   Active link highlight

------------------------------------------------------------------------

## Code Quality Rules

-   One section = one component
-   Reusable components
-   TypeScript
-   Props driven
-   Clean folder structure

------------------------------------------------------------------------

## Images & Assets

-   Use images from original site
-   Optimized (WebP)
-   Lazy loaded
-   Stored in /public/images

------------------------------------------------------------------------

## SEO & Performance

-   Semantic HTML
-   Proper heading hierarchy
-   Meta tags
-   Lighthouse score target 80+

------------------------------------------------------------------------

## Accessibility (a11y)

-   WCAG 2.1 AA compliance
-   Keyboard navigation support
-   Alt text for all images
-   Proper ARIA labels where needed
-   Focus indicators for interactive elements
-   Color contrast ratio compliance
-   Skip to content link

------------------------------------------------------------------------

## Forms & Contact

-   Contact form with client-side validation
-   Email integration (Formspree / EmailJS / custom backend)
-   Success/error feedback messages
-   Anti-spam protection (honeypot or reCAPTCHA)

------------------------------------------------------------------------

## Deployment

-   Platform: Vercel
-   Static first
-   Upgradeable to dynamic
-   Auto-deploy from main branch

------------------------------------------------------------------------

## Git Workflow

-   Main branch: `main` (production)
-   Feature branches: `feature/section-name`
-   Commit messages: Clear and descriptive
-   Push to: https://github.com/biplab85/appwedo

------------------------------------------------------------------------

## Goal

Create a professional, modern, fast, scalable rebuild of the AppWeDo
website using React, Tailwind, SCSS, SwiperJS, FancyApps, and
content-driven architecture.
