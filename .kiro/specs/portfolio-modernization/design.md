# Design Document — Portfolio Modernization

## Overview

This document describes the technical design for modernizing an existing Astro + TailwindCSS portfolio into a premium-quality, dark-mode-first developer portfolio. The design preserves the existing Astro file structure, MDX content collection, and routing while introducing a new color system, animation system, navigation system, three new sections (Education, Roadmap, Certifications), and improved component interfaces throughout.

The existing codebase uses:
- **Astro 4.x** with MDX integration and TailwindCSS 3.x
- **Content collection** at `src/content/projects/` with four MDX files
- **Components**: `Header.astro`, `Footer.astro`, `TechCard.astro`, `ProjectCards.astro`, `Dropdown.astro`
- **Layout**: `src/Layouts/Layouts.astro`
- **Pages**: `src/pages/index.astro`, `src/pages/projects/[slug].astro`

The current design has significant technical debt: the Header injects a `<body>` tag (duplicating Layout's body), colors use hard-coded hex values from a green/teal palette, there is no dark/light mode, no responsive mobile menu, no semantic HTML landmarks, and components have minimal props interfaces. All of this is replaced by the modernized design below.

---

## Architecture

### High-Level Structure

```
portfolio-modernization/
├── src/
│   ├── Layouts/
│   │   └── Layouts.astro          ← global HTML shell, meta tags, theme init
│   ├── Components/
│   │   ├── Header.astro           ← sticky nav with active-section tracking
│   │   ├── Footer.astro           ← footer with nav links + social links
│   │   ├── ThemeToggle.astro      ← dark/light toggle button (island)
│   │   ├── TechCard.astro         ← updated with category prop
│   │   ├── ProjectCards.astro     ← updated with tags + cover image
│   │   ├── EducationTimeline.astro ← new education section component
│   │   ├── RoadmapSection.astro   ← new roadmap milestones component
│   │   └── CertificationCard.astro ← new certification card component
│   ├── pages/
│   │   ├── index.astro            ← homepage with all sections
│   │   └── projects/[slug].astro  ← project detail page (preserved)
│   ├── content/
│   │   └── projects/              ← MDX files (unmodified content)
│   └── styles/
│       └── global.css             ← CSS custom properties, base resets
├── public/
│   ├── images/descarga.jpg
│   └── cv.pdf                     ← CV file for download
├── tailwind.config.mjs            ← extended with design tokens
└── astro.config.mjs               ← unchanged
```

### Key Architectural Decisions

1. **Theme via CSS custom properties + `data-theme` attribute**: A single `<script>` in `<head>` reads `localStorage` before first paint to prevent FOUC. All color values reference CSS variables defined in `global.css` under `[data-theme="dark"]` and `[data-theme="light"]` selectors. TailwindCSS extended with these tokens.

2. **Astro-native rendering first, islands only where needed**: The `ThemeToggle` uses `client:load` directive (minimal JS). The contact form uses `client:visible`. All other components are server-rendered static HTML. Navigation active-link tracking and hamburger menu use plain `<script>` tags compiled by Astro (no framework).

3. **Animation via CSS classes + IntersectionObserver**: A small `<script>` in `Layouts.astro` initializes one `IntersectionObserver` for all `[data-animate]` elements, toggling a CSS class. No external animation library is needed; Motion One is listed as an optional enhancement only if CSS transitions prove insufficient.

4. **TailwindCSS as the styling layer**: All component styles use Tailwind utility classes. The `tailwind.config.mjs` is extended with the design token color names and animation keyframes. No CSS modules or scoped styles except where necessary for global prose overrides on project pages.

5. **`@tailwindcss/typography` plugin**: Added for project page prose rendering, replacing the current hand-rolled `<style is:global>` block.

---

## Components and Interfaces

### `Layouts.astro`

```typescript
interface Props {
  title: string;
  description?: string;
  ogImage?: string;
}
```

Responsibilities:
- Emits the complete `<!DOCTYPE html>` shell
- Injects theme-init script before any CSS (prevents FOUC)
- Includes `<meta>` description and Open Graph tags
- Loads Inter font from Google Fonts CDN via `<link rel="preconnect">` + `<link rel="stylesheet">`
- Sets `lang="es"`, applies `data-theme` attribute on `<html>`
- Sets `max-w-[1200px] mx-auto` container on `<main>`
- Includes animation observer script

### `Header.astro`

No props. Renders `<header>` with `<nav>` inside.

- `position: fixed`, `top: 0`, full-width, `z-50`
- On scroll > 20px: adds `.scrolled` class via script → `backdrop-blur-md bg-surface/80 border-b border-border`
- Links: `#hero`, `#about`, `#technologies`, `#projects`, `#education`, `#roadmap`, `#certifications`, `#contact`
- Active link tracking via `IntersectionObserver` on each section
- Hamburger button (`<button aria-label="Toggle menu">`) visible only `md:hidden`
- Mobile menu: full-screen overlay with `translate-x` slide-in, `aria-expanded` toggled on button

### `ThemeToggle.astro` (client:load)

No props. A `<button>` that:
- Reads current `data-theme` from `<html>`
- Toggles between `"dark"` and `"light"`
- Persists to `localStorage` under key `"theme"`
- Shows a sun/moon SVG icon reflecting current mode

### `TechCard.astro`

```typescript
interface Props {
  category: string;           // e.g. "Backend", "Frontend"
  categoryIcon?: string;      // SVG string or emoji
  tech: { name: string; icon?: string }[];
}
```

Renders a glassmorphism card with the category label, category icon, and a flex-wrap list of tech badges. Each badge is `<span>` with icon + text.

### `ProjectCards.astro`

```typescript
interface Props {
  title: string;
  description: string;
  link: string;
  tags?: string[];
  coverImage?: string;
}
```

Renders a card with:
- Cover image (`<img>`) or gradient placeholder if `coverImage` is absent
- Title (`<h3>`)
- Short description (`<p>`)
- Tech tags as `<span>` badges
- "Ver más →" anchor link

Hover: `group-hover:-translate-y-1 group-hover:shadow-xl` via Tailwind group utilities.

### `EducationTimeline.astro`

No props (data is hardcoded as it is static content about the owner). Renders a `<section id="education">` with a vertical timeline using CSS border-left technique. Each timeline entry has:
- Year range
- Degree/course name
- Institution
- Status badge (`"En Curso"` / `"Completado"`)

### `RoadmapSection.astro`

No props (static content). Renders `<section id="roadmap">` with four milestone cards connected by a dashed line. Current milestone uses `accent` color fill; future milestones use outlined style.

### `CertificationCard.astro`

```typescript
interface Props {
  title: string;
  issuer: string;
  domain: string;
  status: "En Progreso" | "Planificado";
}
```

Renders a card with status badge. Status colors: `"En Progreso"` → amber/yellow accent; `"Planificado"` → muted/secondary.

### `Footer.astro`

No props. Renders `<footer>` with three columns:
- Owner name, role, copyright
- Quick-navigation list (links to all major section IDs)
- Social links: GitHub, LinkedIn, email

---

## Data Models

### Theme System

```typescript
type Theme = "dark" | "light";

// localStorage key
const THEME_KEY = "theme";

// HTML attribute
// <html data-theme="dark | light">
```

CSS custom properties defined in `global.css`:

```css
:root,
[data-theme="dark"] {
  --color-bg:        #0a0a0f;
  --color-surface:   #0f0f1a;
  --color-surface-2: #1a1a2e;
  --color-border:    rgba(255,255,255,0.08);
  --color-text:      #f1f1f5;
  --color-text-muted:#a0a0b0;
  --color-accent:    #6366f1;   /* indigo */
  --color-accent-2:  #8b5cf6;   /* violet */
}

[data-theme="light"] {
  --color-bg:        #fafafa;
  --color-surface:   #ffffff;
  --color-surface-2: #f4f4f8;
  --color-border:    rgba(0,0,0,0.08);
  --color-text:      #111118;
  --color-text-muted:#6b6b7b;
  --color-accent:    #4f46e5;
  --color-accent-2:  #7c3aed;
}
```

These are referenced in `tailwind.config.mjs`:

```js
colors: {
  bg:        'var(--color-bg)',
  surface:   'var(--color-surface)',
  'surface-2': 'var(--color-surface-2)',
  border:    'var(--color-border)',
  text:      'var(--color-text)',
  muted:     'var(--color-text-muted)',
  accent:    'var(--color-accent)',
  'accent-2':'var(--color-accent-2)',
}
```

### Content Collection Schema

The existing content collection at `src/content/projects/` uses implicit frontmatter. To add optional fields without breaking existing MDX, a `src/content/config.ts` is introduced:

```typescript
import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    ShortDescription: z.string(),
    tags: z.array(z.string()).optional().default([]),
    coverImage: z.string().optional(),
  }),
});

export const collections = { projects };
```

Existing MDX files remain unchanged — the new fields are optional with defaults.

### Technology Data Model

Technologies are moved from inline arrays in `index.astro` to a structured data file `src/data/technologies.ts`:

```typescript
export interface TechItem {
  name: string;
  icon?: string; // SVG string or emoji
}

export interface TechCategory {
  id: string;
  category: string;
  categoryIcon: string;
  tech: TechItem[];
}

export const technologies: TechCategory[] = [
  {
    id: "backend",
    category: "Backend",
    categoryIcon: "⚙️",
    tech: [
      { name: "C#" },
      { name: "Java" },
      { name: "C++" },
      { name: "Go" },
    ],
  },
  {
    id: "frontend",
    category: "Frontend",
    categoryIcon: "🎨",
    tech: [
      { name: "HTML" },
      { name: "CSS" },
      { name: "JavaScript" },
      { name: "DevExtreme" },
      { name: "Astro" },
    ],
  },
  {
    id: "databases",
    category: "Bases de Datos",
    categoryIcon: "🗄️",
    tech: [
      { name: "MySQL" },
      { name: "SQL Server" },
      { name: "Azure SQL Database" },
    ],
  },
  {
    id: "ai",
    category: "Inteligencia Artificial",
    categoryIcon: "🤖",
    tech: [
      { name: "Apache Spark" },
      { name: "Databricks" },
      { name: "Scala" },
    ],
  },
  {
    id: "devops",
    category: "DevOps & Herramientas",
    categoryIcon: "🛠️",
    tech: [
      { name: "GitHub" },
      { name: "Git" },
      { name: "VS Code" },
      { name: "Visual Studio" },
      { name: "MySQL Workbench" },
      { name: "Swagger" },
      { name: "Postman" },
      { name: "ORM (Entity Framework)" },
    ],
  },
];
```

### Education Data Model

```typescript
// src/data/education.ts
export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  period: string;
  status: "En Curso" | "Completado";
  description?: string;
}

export const educationEntries: EducationEntry[] = [
  {
    id: "systems-engineering",
    institution: "Universidad [Nombre]",
    degree: "Ingeniería en Sistemas",
    period: "2021 — Presente",
    status: "En Curso",
    description: "Formación en desarrollo de software, bases de datos, redes y sistemas operativos.",
  },
];
```

### Roadmap Data Model

```typescript
// src/data/roadmap.ts
export interface Milestone {
  id: string;
  title: string;
  description: string;
  status: "current" | "next" | "goal" | "longterm";
  timeframe?: string;
}

export const milestones: Milestone[] = [
  {
    id: "student",
    title: "Estudiante de Ingeniería en Sistemas",
    description: "Formación universitaria en desarrollo de software y bases de datos.",
    status: "current",
    timeframe: "Presente",
  },
  {
    id: "internship",
    title: "Pasantía Profesional",
    description: "Aplicar habilidades de backend en un entorno empresarial real.",
    status: "next",
    timeframe: "Próximo paso",
  },
  {
    id: "backend-engineer",
    title: "Backend Engineer",
    description: "Desarrollar sistemas robustos y escalables en producción.",
    status: "goal",
    timeframe: "Meta a mediano plazo",
  },
  {
    id: "ai-engineer",
    title: "AI Engineer / Data Engineer",
    description: "Combinar ingeniería de software con modelos de datos e IA.",
    status: "longterm",
    timeframe: "Visión a largo plazo",
  },
];
```

### Certifications Data Model

```typescript
// src/data/certifications.ts
export interface Certification {
  id: string;
  title: string;
  issuer: string;
  domain: string;
  status: "En Progreso" | "Planificado";
}

export const certifications: Certification[] = [
  { id: "oracle-db", title: "Oracle Database Foundations", issuer: "Oracle", domain: "Bases de Datos", status: "Planificado" },
  { id: "sql-server", title: "SQL Server Administration", issuer: "Microsoft", domain: "Bases de Datos", status: "Planificado" },
  { id: "ai-cert", title: "AI Fundamentals", issuer: "Microsoft / Google", domain: "Inteligencia Artificial", status: "En Progreso" },
  { id: "data-eng", title: "Data Engineering Professional", issuer: "Databricks / Google", domain: "Data Engineering", status: "Planificado" },
  { id: "cloud", title: "Cloud Computing Fundamentals", issuer: "AWS / Azure", domain: "Cloud Computing", status: "Planificado" },
];
```

---

## Animation System Design

### Mechanism

A single `IntersectionObserver` is initialized in `Layouts.astro`'s script block after DOM load. It observes all elements carrying `data-animate` attribute. When an element intersects the viewport, the observer adds the class `is-visible` which triggers a CSS transition.

```css
/* global.css */
[data-animate] {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 400ms ease, transform 400ms ease;
}

[data-animate].is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered delay via CSS variable */
[data-animate-delay="1"] { transition-delay: 100ms; }
[data-animate-delay="2"] { transition-delay: 200ms; }
[data-animate-delay="3"] { transition-delay: 300ms; }
[data-animate-delay="4"] { transition-delay: 400ms; }
[data-animate-delay="5"] { transition-delay: 500ms; }

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  [data-animate] {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

IntersectionObserver script (in `Layouts.astro`):

```js
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // fire once
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);
document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
```

### Active Navigation Link Tracking

A second `IntersectionObserver` tracks section visibility for active link highlighting:

```js
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('[data-nav-link]');
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('nav-active'));
        const activeLink = document.querySelector(`[data-nav-link][href="#${entry.target.id}"]`);
        activeLink?.classList.add('nav-active');
      }
    });
  },
  { threshold: 0.5 }
);
sections.forEach(section => sectionObserver.observe(section));
```

### Scroll-based Header Styling

```js
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });
```

---

## Error Handling

### Contact Form

The contact form is a static HTML form. Validation is handled client-side in an Astro island or via a `<script>` block:

- On submit, each required field is checked; empty fields receive an `aria-invalid="true"` attribute and a sibling `<span role="alert">` with the error message is made visible.
- On successful validation, the form is hidden and a success `<div role="status">` is shown.
- Form submission uses `fetch` to a mailto handler or a third-party service (e.g., Formspree) — the endpoint URL is configurable via an Astro environment variable.

### Theme Init — FOUC Prevention

The theme-init script is a blocking inline `<script>` placed immediately after `<head>` opens, before any stylesheets:

```html
<script>
  const saved = localStorage.getItem('theme');
  const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', saved ?? preferred);
</script>
```

This ensures the correct theme class is present before the browser paints anything, eliminating flash of unstyled content.

### Missing CV File

The `Download CV` button links to `/cv.pdf`. If the file is missing, the browser shows its native 404. The design documents that `public/cv.pdf` must be present before deployment; no runtime error handling is needed for a static asset.

### Missing Project Cover Image

`ProjectCards.astro` uses a conditional render: if `coverImage` is undefined or empty, a `<div>` with a CSS gradient background replaces the `<img>` element. No broken image icons will appear.

---

## Testing Strategy

### Dual Approach

Both unit/integration tests and property-based tests are used. They are complementary: unit tests verify specific examples and edge conditions, property tests verify universal invariants across many generated inputs.

### Toolchain

- **Test runner**: Vitest (compatible with Astro's Vite build; pin to exact version `"vitest": "2.1.8"`)
- **DOM testing**: `@testing-library/dom` + `jsdom` environment (`"@testing-library/dom": "8.20.1"`, `"jsdom": "25.0.1"`)
- **Property-based testing**: `fast-check` (`"fast-check": "3.22.0"`)
- **Accessibility checks**: `axe-core` for per-page a11y snapshots (`"axe-core": "4.10.2"`)

### Unit / Example Tests

Focus areas:
- ThemeToggle: default theme is `"dark"`, toggle flips attribute, localStorage is written
- Navigation: active link class applied to correct item, hamburger opens/closes mobile menu
- Form validation: empty field submission produces one error per missing field
- ProjectCards: renders title, description, tags, link; renders gradient placeholder when no `coverImage`
- TechCard: renders `category` prop in output
- CertificationCard: status badge text matches prop value
- ProjectPage: "Back to Projects" link present; `getStaticPaths` returns one path per MDX file
- Footer: all section IDs present as nav links; GitHub, LinkedIn, email links present
- EducationSection: degree and institution text present in DOM
- RoadmapSection: milestones appear in correct order; current milestone has distinct CSS class

### Property-Based Tests

Minimum 100 iterations each. Tag format: `// Feature: portfolio-modernization, Property N: <text>`

Each correctness property (see next section) maps to exactly one property-based test.

### Running Tests

```bash
npx vitest --run
```

---
## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Theme toggle is a round trip

*For any* initial theme value (`"dark"` or `"light"`), toggling the theme twice must return the `data-theme` attribute on `<html>` to its original value, and `localStorage` must reflect that same original value.

**Validates: Requirements 1.2, 1.3**

---

### Property 2: No horizontal overflow at any viewport width

*For any* viewport width between 320px and 2560px, the document body's `scrollWidth` must not exceed `clientWidth` (i.e., no horizontal scrollbar appears).

**Validates: Requirements 2.6**

---

### Property 3: Scroll past 20px applies nav scrolled style

*For any* scroll position greater than 20px, the `<header>` element must have the `.scrolled` class applied; *for any* scroll position of 20px or less, the `.scrolled` class must be absent.

**Validates: Requirements 3.2**

---

### Property 4: Active nav link reflects current visible section

*For any* section that becomes intersecting via IntersectionObserver, the navigation link whose `href` matches that section's `id` must have the `nav-active` class, and all other navigation links must not have `nav-active`.

**Validates: Requirements 3.4**

---

### Property 5: Animated text element contains all required roles

*For any* render of the HeroSection, the animated text element's data source (array or DOM children) must contain all three role strings: `"Software Engineering Student"`, `"Backend Developer"`, and `"AI Enthusiast"`.

**Validates: Requirements 4.3**

---

### Property 6: About section content is a superset of original text

*For any* render of the AboutSection, the rendered text content must contain all sentences from the original about paragraph without omission.

**Validates: Requirements 5.1**

---

### Property 7: All original technologies appear in the modernized tech section

*For any* technology name that existed in the original `techItems` array in `index.astro`, that name must appear in at least one `TechCategory` in `technologies.ts` and must be rendered within the TechSection on the homepage.

**Validates: Requirements 6.2**

---

### Property 8: All projects from the content collection are rendered as cards

*For any* MDX file present in `src/content/projects/`, the ProjectsSection must render exactly one `ProjectCard` for it, and the total number of rendered cards must equal the number of MDX files returned by `getCollection("projects")`.

**Validates: Requirements 7.1**

---

### Property 9: ProjectCard renders all required fields for any project

*For any* project data object with a `title`, `ShortDescription`, and `tags` array, the rendered ProjectCard HTML must contain the title text, description text, a link element, and one badge element per tag. If `coverImage` is absent or empty, the card must contain a placeholder `<div>` with a gradient class instead of an `<img>`.

**Validates: Requirements 7.2, 7.6**

---

### Property 10: Every project slug generates a valid static path

*For any* MDX file in `src/content/projects/`, `getStaticPaths()` must return a path entry whose `params.slug` matches the file's slug, and the rendered page must contain the project's `title` in a heading element.

**Validates: Requirements 8.1, 8.3**

---

### Property 11: Roadmap milestones appear in the correct prescribed order

*For any* render of the RoadmapSection, the four milestone elements must appear in DOM order matching: `"current"` → `"next"` → `"goal"` → `"longterm"`, and there must be at least four milestone elements.

**Validates: Requirements 10.1**

---

### Property 12: Certification cards have valid status badges

*For any* rendered certification card, the status badge text must be exactly `"En Progreso"` or `"Planificado"` — no other value is acceptable.

**Validates: Requirements 11.2, 11.3**

---

### Property 13: Contact form produces one inline error per missing required field

*For any* subset of the required contact form fields (`name`, `email`, `message`) that are left empty on submission, the form must display at least one inline error message for each empty field, and the error count must equal the number of empty required fields.

**Validates: Requirements 12.5**

---

### Property 14: Footer contains a navigation link for every major section

*For any* render of the Footer, for each section ID in the set `["hero", "about", "technologies", "projects", "education", "roadmap", "certifications", "contact"]`, there must be at least one anchor element in the footer whose `href` attribute equals `"#<section-id>"`.

**Validates: Requirements 13.2**

---

### Property 15: All animated elements use only opacity and transform

*For any* element with the `[data-animate]` attribute, the CSS `transition` property must reference only `opacity` and `transform` — not `width`, `height`, `top`, `left`, `margin`, `padding`, or any other layout-triggering property.

**Validates: Requirements 14.7**

---

### Property 16: Animation durations are within 200ms – 600ms

*For any* element that has a CSS `transition-duration` or `animation-duration` set by the animation system, that duration value must be between 200ms and 600ms inclusive.

**Validates: Requirements 14.5**

---

### Property 17: prefers-reduced-motion disables entrance animations

*For any* element with the `[data-animate]` attribute, when the `prefers-reduced-motion: reduce` media query is active, the element must have `opacity: 1` and `transform: none` without waiting for the IntersectionObserver — i.e., animations must be bypassed entirely.

**Validates: Requirements 14.6**

---

### Property 18: Section entrance animations use staggered delays

*For any* section that renders multiple cards or items with `data-animate-delay` attributes, the delay values must form a strictly increasing sequence with a consistent increment matching the requirement for that section (100ms for tech/certifications, 150ms for projects, 200ms for education/roadmap).

**Validates: Requirements 14.3**

---

### Property 19: All existing MDX files are preserved without content modification

*For any* MDX file in `src/content/projects/`, its full text content (body and frontmatter fields `title` and `ShortDescription`) after the modernization must be byte-for-byte identical to the original file content. Only additive frontmatter fields (`tags`, `coverImage`) are permitted.

**Validates: Requirements 15.2**

---

### Property 20: Every page contains all required semantic HTML5 landmarks

*For any* rendered page in the portfolio (homepage and each project page), the DOM must contain exactly one `<header>`, one `<main>`, one `<footer>`, at least one `<nav>`, and at least one `<section>` element.

**Validates: Requirements 15.6**

---

### Property 21: All package.json dependencies use exact (pinned) versions

*For any* entry in `package.json`'s `dependencies` or `devDependencies` fields, the version string must not contain `^`, `~`, `*`, `>`, `<`, or `>=` prefixes — it must be an exact version string.

**Validates: Requirements 15.9**

---
