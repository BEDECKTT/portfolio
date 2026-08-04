# Implementation Plan: Portfolio Modernization

## Overview

Modernize the existing Astro + TailwindCSS portfolio into a dark-mode-first, premium-quality developer portfolio. The plan preserves the existing file structure, MDX content collection, and routing while introducing a new theme system, animation system, navigation system, three new sections, and improved components throughout.

## Tasks

- [x] 1. Set up foundation: CSS custom properties, global styles, and Tailwind design tokens
  - Create `src/styles/global.css` with CSS custom properties for both dark and light themes under `[data-theme="dark"]` and `[data-theme="light"]` selectors
  - Add animation base styles: `[data-animate]` with opacity/transform transitions, `is-visible` class, stagger delay attributes (`data-animate-delay="1"` through `"5"`), and `prefers-reduced-motion` override
  - Extend `tailwind.config.mjs` with color tokens (`bg`, `surface`, `surface-2`, `border`, `text`, `muted`, `accent`, `accent-2`) referencing CSS variables and add `@tailwindcss/typography` plugin
  - Add pinned dev dependencies to `package.json`: `vitest@2.1.8`, `@testing-library/dom@8.20.1`, `jsdom@25.0.1`, `fast-check@3.22.0`, `axe-core@4.10.2`, `@tailwindcss/typography` (exact version)
  - _Requirements: 1.4, 1.5, 2.4, 2.5, 14.5, 14.6, 14.7, 15.9_

- [x] 2. Update `Layouts.astro` with theme init, meta tags, font, and animation observer
  - Add inline blocking theme-init `<script>` before stylesheets that reads `localStorage` key `"theme"`, falls back to `prefers-color-scheme`, and sets `data-theme` on `<html>`
  - Add `Props` interface: `{ title: string; description?: string; ogImage?: string }`
  - Add `<meta name="description">` and Open Graph `<meta>` tags using props
  - Add Google Fonts preconnect and Inter font `<link>` tags
  - Set `lang="es"` and `data-theme` attribute on `<html>`
  - Wrap slot in `<main class="max-w-[1200px] mx-auto">` and add semantic `<header>`, `<footer>` slots
  - Add IntersectionObserver script for `[data-animate]` → `is-visible` class toggling (fire once per element)
  - _Requirements: 1.1, 1.6, 2.1, 2.5, 14.1, 15.1, 15.6, 15.7_

- [x] 3. Create data files for technologies, education, roadmap, and certifications
  - Create `src/data/technologies.ts` exporting `TechItem`, `TechCategory` interfaces and `technologies` array with all five categories (Backend, Frontend, Databases, AI, DevOps) mapping all existing tech from `index.astro`
  - Create `src/data/education.ts` exporting `EducationEntry` interface and `educationEntries` array with Systems Engineering entry
  - Create `src/data/roadmap.ts` exporting `Milestone` interface and `milestones` array with four entries in order: current → next → goal → longterm
  - Create `src/data/certifications.ts` exporting `Certification` interface and `certifications` array with five entries (Oracle DB, SQL Server, AI, Data Eng, Cloud)
  - _Requirements: 6.1, 6.2, 9.1, 9.2, 10.1, 11.1_

- [x] 4. Create content collection config
  - Create `src/content/config.ts` with `defineCollection` schema for the `projects` collection: `title` (string), `ShortDescription` (string), `tags` (optional string array, default `[]`), `coverImage` (optional string)
  - Ensure existing MDX files remain byte-for-byte unchanged
  - _Requirements: 7.1, 15.2, 15.3_

- [ ]* 4.1 Write property test for MDX file preservation (Property 19)
  - **Property 19: All existing MDX files are preserved without content modification**
  - **Validates: Requirements 15.2**

- [x] 5. Implement `ThemeToggle.astro` component
  - Create `src/Components/ThemeToggle.astro` as a `<button>` with `client:load`
  - On click: read `data-theme` from `<html>`, toggle between `"dark"` and `"light"`, write to `localStorage("theme")`
  - Render sun SVG icon when dark, moon SVG icon when light
  - _Requirements: 1.2, 1.3, 1.6_

- [ ]* 5.1 Write property test for theme toggle round trip (Property 1)
  - **Property 1: Theme toggle is a round trip**
  - **Validates: Requirements 1.2, 1.3**

- [x] 6. Implement `Header.astro` with sticky nav, scroll effect, active tracking, and mobile menu
  - Replace existing `Header.astro` — remove the duplicate `<body>` tag and any hard-coded styles
  - Render `<header id="main-header">` with `position: fixed`, full-width, `z-50`
  - Add nav links (with `data-nav-link` attribute) for all 8 section IDs: `#hero`, `#about`, `#technologies`, `#projects`, `#education`, `#roadmap`, `#certifications`, `#contact`
  - Add scroll listener (`passive: true`) that toggles `.scrolled` class at > 20px: applies `backdrop-blur-md bg-surface/80 border-b border-border`
  - Add `IntersectionObserver` for `section[id]` elements to set `nav-active` class on matching `[data-nav-link]`; only one link is active at a time
  - Add hamburger `<button aria-label="Toggle menu" aria-expanded="false">` visible only below `md` breakpoint
  - Add full-screen mobile menu overlay with `translate-x` slide-in animation and `aria-expanded` toggle; clicking a link closes the menu and scrolls to section
  - Embed `<ThemeToggle>` in the header
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8_

- [ ]* 6.1 Write property test for scroll-triggered nav style (Property 3)
  - **Property 3: Scroll past 20px applies nav scrolled style**
  - **Validates: Requirements 3.2**

- [ ]* 6.2 Write property test for active nav link tracking (Property 4)
  - **Property 4: Active nav link reflects current visible section**
  - **Validates: Requirements 3.4**

- [x] 7. Implement Hero Section in `index.astro`
  - Replace existing hero markup with `<section id="hero">` using a two-column layout (photo left, text right) that stacks vertically below 768px
  - Display owner photo from `public/images/descarga.jpg` with rounded/styled treatment
  - Display owner name with large font, high contrast
  - Add animated cycling text element containing all three roles: `"Software Engineering Student"`, `"Backend Developer"`, `"AI Enthusiast"` — implement as a fade/typing cycle via CSS or a small inline script
  - Add "Ver Proyectos" button (scrolls to `#projects`), "Descargar CV" button (links to `/cv.pdf` with `download` attribute), and "Contacto" button (scrolls to `#contact`)
  - Apply `data-animate` and `data-animate-delay` attributes to photo, name, role text, and buttons for staggered entrance (delays 1–4)
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8_

- [ ]* 7.1 Write property test for hero animated text roles (Property 5)
  - **Property 5: Animated text element contains all required roles**
  - **Validates: Requirements 4.3**

- [x] 8. Update `TechCard.astro` and implement Technologies Section
  - Update `TechCard.astro` props interface: `{ category: string; categoryIcon?: string; tech: { name: string; icon?: string }[] }`
  - Render as a glassmorphism card (`backdrop-filter: blur`, semi-transparent bg, visible border) with category label, category icon, and flex-wrap badge list
  - Each tech badge is a `<span>` with optional icon + text; add hover scale/glow effect via Tailwind group utilities
  - In `index.astro`, replace existing tech section with `<section id="technologies">` that imports `technologies` from `src/data/technologies.ts` and maps each category to a `<TechCard>` with `data-animate` and `data-animate-delay` (100ms increment per card)
  - Apply responsive grid: 1 column below 640px, 2–3 columns on wider viewports
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7_

- [ ]* 8.1 Write property test for all original technologies present (Property 7)
  - **Property 7: All original technologies appear in the modernized tech section**
  - **Validates: Requirements 6.2**

- [x] 9. Update `ProjectCards.astro` and implement Projects Section
  - Update `ProjectCards.astro` props interface: `{ title: string; description: string; link: string; tags?: string[]; coverImage?: string }`
  - Render cover image `<img>` when `coverImage` is provided; render a gradient placeholder `<div>` with a gradient class when absent
  - Display title (`<h3>`), description (`<p>`), tech tags as `<span>` badges consistent with TechCard badge style, and "Ver más →" anchor
  - Apply `group-hover:-translate-y-1 group-hover:shadow-xl` lift effect and smooth color transitions on hover
  - In `index.astro`, replace existing projects section with `<section id="projects">` using `getCollection("projects")`, mapping to `<ProjectCards>` with `data-animate` and `data-animate-delay` (150ms increment per card)
  - Apply responsive grid: 1 column below 768px, 2-column grid on wider viewports
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7_

- [ ]* 9.1 Write property test for all projects rendered as cards (Property 8)
  - **Property 8: All projects from the content collection are rendered as cards**
  - **Validates: Requirements 7.1**

- [ ]* 9.2 Write property test for ProjectCard required fields and cover image fallback (Property 9)
  - **Property 9: ProjectCard renders all required fields for any project**
  - **Validates: Requirements 7.2, 7.6**

- [x] 10. Checkpoint — Ensure all tests pass, ask the user if questions arise.

- [x] 11. Implement About Section in `index.astro`
  - Replace existing about markup with `<section id="about">` using a two-column layout (768px+): text content left, decorative visual element right; stacks vertically on narrower viewports
  - Preserve all existing written content from the original about section without omission
  - Display key facts (role, focus areas) as visually distinct badge/card elements
  - Apply `data-animate` for fade-in slide-up entrance animation
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [ ]* 11.1 Write property test for about section content preservation (Property 6)
  - **Property 6: About section content is a superset of original text**
  - **Validates: Requirements 5.1**

- [x] 12. Create `EducationTimeline.astro` and add Education Section
  - Create `src/Components/EducationTimeline.astro` with no props; import `educationEntries` from `src/data/education.ts`
  - Render `<section id="education">` with a vertical timeline using CSS `border-left` technique
  - Each entry shows: year range, degree name, institution, and a status badge (`"En Curso"` / `"Completado"`)
  - Apply `data-animate` and `data-animate-delay` with 200ms increment per entry
  - Fully responsive: single-column vertical layout on all viewport widths
  - Import and render `<EducationTimeline>` in `index.astro`
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [x] 13. Create `RoadmapSection.astro` and add Roadmap Section
  - Create `src/Components/RoadmapSection.astro` with no props; import `milestones` from `src/data/roadmap.ts`
  - Render `<section id="roadmap">` with four milestone cards connected by a dashed line/arrows
  - Current milestone uses `accent` color filled style; future milestones use outlined style
  - Milestones must appear in DOM order: `current` → `next` → `goal` → `longterm`
  - Apply `data-animate` and `data-animate-delay` with 200ms increment per milestone
  - Responsive: horizontal layout on 768px+, vertical on narrower viewports
  - Import and render `<RoadmapSection>` in `index.astro`
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [ ]* 13.1 Write property test for roadmap milestones order (Property 11)
  - **Property 11: Roadmap milestones appear in the correct prescribed order**
  - **Validates: Requirements 10.1**

- [x] 14. Create `CertificationCard.astro` and add Certifications Section
  - Create `src/Components/CertificationCard.astro` with props: `{ title: string; issuer: string; domain: string; status: "En Progreso" | "Planificado" }`
  - Status badge: amber/yellow for `"En Progreso"`, muted/secondary for `"Planificado"`
  - Hover effect consistent with `ProjectCards` lift style
  - In `index.astro`, add `<section id="certifications">` importing `certifications` from `src/data/certifications.ts`, mapping each to `<CertificationCard>` with `data-animate` and `data-animate-delay` (100ms increment per card)
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

- [ ]* 14.1 Write property test for certification card status badge values (Property 12)
  - **Property 12: Certification cards have valid status badges**
  - **Validates: Requirements 11.2, 11.3**

- [x] 15. Implement Contact Section in `index.astro`
  - Add `<section id="contact">` with:
    - Three contact channel cards: GitHub (link), LinkedIn (link), email (mailto link), each as a styled icon-button card
    - A contact form with `name`, `email`, and `message` fields (all required)
  - Add client-side validation script: on submit, check each required field; set `aria-invalid="true"` and show sibling `<span role="alert">` per empty field; error count equals number of empty fields
  - On successful validation (all fields filled), hide the form and show a `<div role="status">` success message
  - Optionally wire `action` to a Formspree/environment-variable endpoint
  - Responsive: single column below 768px
  - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6_

- [ ]* 15.1 Write property test for contact form inline errors (Property 13)
  - **Property 13: Contact form produces one inline error per missing required field**
  - **Validates: Requirements 12.5**

- [x] 16. Update `Footer.astro`
  - Replace existing footer with three-column layout: (1) owner name + role + copyright, (2) quick-nav links to all 8 section IDs, (3) social links (GitHub, LinkedIn, email)
  - Apply theme-aware styling via CSS custom properties
  - Ensure all 8 section IDs are present as `href="#<id>"` anchors
  - _Requirements: 13.1, 13.2, 13.3, 13.4_

- [ ]* 16.1 Write property test for footer section navigation links (Property 14)
  - **Property 14: Footer contains a navigation link for every major section**
  - **Validates: Requirements 13.2**

- [x] 17. Checkpoint — Ensure all tests pass, ask the user if questions arise.

- [x] 18. Update `projects/[slug].astro` project detail page
  - Preserve existing `getStaticPaths` and `render()` logic unchanged
  - Apply `@tailwindcss/typography` prose class with dark-mode-aware color overrides on the rendered MDX content
  - Add a prominent project header: title in a large heading, `ShortDescription` below with clear visual hierarchy
  - Style table of contents as a sticky sidebar on 1024px+ (`position: sticky`, `top`), and as a collapsible `<details>` accordion on narrower viewports
  - Apply smooth scroll behavior to table-of-contents anchor links
  - Add syntax highlighting for code blocks using a dark-mode-compatible Shiki theme (already available in Astro)
  - Add a "← Volver a Proyectos" link that navigates to `/#projects`
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7_

- [ ]* 18.1 Write property test for project static paths (Property 10)
  - **Property 10: Every project slug generates a valid static path**
  - **Validates: Requirements 8.1, 8.3**

- [x] 19. Wire and validate animation system across all sections
  - Verify all major sections have `data-animate` on their content containers and `data-animate-delay` on staggered list items
  - Verify stagger delay increments match requirements: 100ms for TechSection and CertificationsSection, 150ms for ProjectsSection, 200ms for EducationSection and RoadmapSection
  - Verify all animated elements use only `opacity` and `transform` in their CSS `transition` property
  - Verify all transition durations are between 200ms and 600ms
  - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6, 14.7_

- [ ]* 19.1 Write property test for animation CSS properties (Property 15)
  - **Property 15: All animated elements use only opacity and transform**
  - **Validates: Requirements 14.7**

- [ ]* 19.2 Write property test for animation durations (Property 16)
  - **Property 16: Animation durations are within 200ms – 600ms**
  - **Validates: Requirements 14.5**

- [ ]* 19.3 Write property test for reduced motion bypass (Property 17)
  - **Property 17: prefers-reduced-motion disables entrance animations**
  - **Validates: Requirements 14.6**

- [ ]* 19.4 Write property test for staggered animation delays (Property 18)
  - **Property 18: Section entrance animations use staggered delays**
  - **Validates: Requirements 14.3**

- [x] 20. Validate layout, responsiveness, and semantic HTML across all pages
  - Verify `max-w-[1200px] mx-auto` container applied globally via Layout
  - Verify no horizontal overflow at any test viewport width (320px, 768px, 1200px, 2560px)
  - Verify each rendered page contains exactly one `<header>`, one `<main>`, one `<footer>`, at least one `<nav>`, and at least one `<section>`
  - Verify `package.json` has no `^`, `~`, `*`, `>`, `<`, or `>=` prefixes on any dependency version
  - _Requirements: 2.1, 2.6, 15.1, 15.6, 15.9_

- [ ]* 20.1 Write property test for no horizontal overflow (Property 2)
  - **Property 2: No horizontal overflow at any viewport width**
  - **Validates: Requirements 2.6**

- [ ]* 20.2 Write property test for semantic HTML5 landmarks (Property 20)
  - **Property 20: Every page contains all required semantic HTML5 landmarks**
  - **Validates: Requirements 15.6**

- [ ]* 20.3 Write property test for pinned package versions (Property 21)
  - **Property 21: All package.json dependencies use exact (pinned) versions**
  - **Validates: Requirements 15.9**

- [x] 21. Final checkpoint — Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Property tests validate universal correctness properties; unit tests validate specific examples
- Stagger delay increments: 100ms (tech, certifications), 150ms (projects), 200ms (education, roadmap)
- All new npm packages must use exact pinned versions (no `^` or `~`)
- The `public/cv.pdf` file must be added before deployment for the CV download button to work
- Existing MDX files in `src/content/projects/` must not be modified
