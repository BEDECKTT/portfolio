# Requirements Document

## Introduction

This document defines the requirements for modernizing an existing professional portfolio built with Astro and TailwindCSS. The goal is to transform the current portfolio into a modern, premium-quality product that reflects the profile of a software engineering student specializing in backend development and AI. The modernization preserves all existing Astro architecture, MDX-based content, routes, and components while upgrading the visual design, user experience, animations, and information architecture. Three new sections are added: Education, Professional Goals (Roadmap), and Certifications.

## Glossary

- **Portfolio**: The Astro-based professional portfolio website being modernized.
- **Layout**: The `src/Layouts/Layouts.astro` file that wraps all pages.
- **Header**: The `src/Components/Header.astro` navigation component.
- **Footer**: The `src/Components/Footer.astro` component.
- **TechCard**: The `src/Components/TechCard.astro` component for displaying technology categories.
- **ProjectCard**: The `src/Components/ProjectCards.astro` component for displaying project summaries.
- **HeroSection**: The top section of the homepage introducing the owner.
- **AboutSection**: The section describing the owner's background and experience.
- **TechSection**: The section displaying technology skills grouped by category.
- **ProjectsSection**: The section listing all portfolio projects.
- **ProjectPage**: The dynamic page at `src/pages/projects/[slug].astro` rendering MDX project content.
- **EducationSection**: A new section displaying academic background and timeline.
- **RoadmapSection**: A new section displaying professional goals as a visual roadmap.
- **CertificationsSection**: A new section prepared for future certifications.
- **ContactSection**: The section containing contact information and form.
- **AnimationSystem**: The set of scroll reveal, entrance, and micro-interaction animations applied across the Portfolio.
- **ThemeSystem**: The mechanism controlling dark mode (default) and light mode appearance.
- **NavigationSystem**: The sticky, responsive navigation with active-section tracking.
- **MDXContent**: The project descriptions authored in `.mdx` files under `src/content/projects/`.
- **CV**: The downloadable résumé PDF made available through the Portfolio.

---

## Requirements

### Requirement 1: Theme System — Dark Mode Default with Light Mode Support

**User Story:** As a visitor, I want the portfolio to default to dark mode with the option to switch to light mode, so that I get a premium visual experience aligned with modern developer portfolios.

#### Acceptance Criteria

1. THE ThemeSystem SHALL apply dark mode styles by default on first visit.
2. WHEN a visitor activates the theme toggle, THE ThemeSystem SHALL switch between dark and light modes without a full page reload.
3. THE ThemeSystem SHALL persist the selected theme preference across browser sessions using localStorage.
4. WHILE dark mode is active, THE ThemeSystem SHALL apply a color palette using deep neutral backgrounds (e.g., `#0a0a0f`, `#0f0f1a`), high-contrast text, and accent colors.
5. WHILE light mode is active, THE ThemeSystem SHALL apply a color palette using light neutral backgrounds, dark text, and consistent accent colors.
6. THE ThemeSystem SHALL expose a `data-theme` attribute on the `<html>` element that CSS and components can target for theme-specific styles.

---

### Requirement 2: Layout and Global Visual Design

**User Story:** As a visitor, I want a visually polished, modern layout across all pages, so that the portfolio conveys professionalism comparable to engineers at international companies.

#### Acceptance Criteria

1. THE Layout SHALL use a maximum content width of 1200px centered on the page.
2. THE Layout SHALL apply consistent spacing, using an 8px base grid for margins and padding.
3. THE Layout SHALL include subtle gradient backgrounds, applying gradients that do not distract from content.
4. WHERE glassmorphism is applied to card or overlay components, THE Layout SHALL use a `backdrop-filter: blur()` effect combined with a semi-transparent background and a visible border.
5. THE Layout SHALL use a professional typographic scale, with a primary sans-serif font loaded from a CDN (e.g., Google Fonts — Inter or similar).
6. THE Layout SHALL be fully responsive, supporting viewport widths from 320px to 2560px without horizontal overflow.
7. THE Layout SHALL pass Lighthouse accessibility audit with a score of 90 or above.

---

### Requirement 3: Navigation System

**User Story:** As a visitor, I want a sticky navigation bar that shows my current position on the page, so that I can move around the portfolio quickly and intuitively.

#### Acceptance Criteria

1. THE NavigationSystem SHALL remain fixed at the top of the viewport while the visitor scrolls.
2. WHEN the visitor scrolls more than 20px from the top of the page, THE NavigationSystem SHALL apply a `backdrop-filter: blur()` and a semi-transparent background to the navigation bar.
3. THE NavigationSystem SHALL display navigation links for all major sections: Hero, About, Technologies, Projects, Education, Roadmap, Certifications, and Contact.
4. WHEN a section enters the viewport, THE NavigationSystem SHALL highlight the corresponding navigation link as active.
5. WHEN a navigation link is clicked, THE NavigationSystem SHALL scroll smoothly to the corresponding section.
6. THE NavigationSystem SHALL display a hamburger menu button on viewports narrower than 768px.
7. WHEN the hamburger button is activated, THE NavigationSystem SHALL display a full-screen or slide-in mobile menu with an animated entrance.
8. WHEN a mobile menu link is clicked, THE NavigationSystem SHALL close the mobile menu and scroll to the target section.

---

### Requirement 4: Hero Section

**User Story:** As a recruiter visiting the portfolio, I want the first thing I see to immediately communicate the owner's identity and professionalism, so that I am motivated to explore further.

#### Acceptance Criteria

1. THE HeroSection SHALL display the owner's professional photo using the existing image at `public/images/descarga.jpg`.
2. THE HeroSection SHALL display the owner's full name with prominent typographic treatment (large font size, high contrast).
3. THE HeroSection SHALL display an animated text element that cycles through the roles: "Software Engineering Student", "Backend Developer", and "AI Enthusiast" using a typing or fade transition animation.
4. THE HeroSection SHALL display a "View Projects" button that scrolls to the ProjectsSection when clicked.
5. THE HeroSection SHALL display a "Download CV" button that triggers a download of the CV file.
6. THE HeroSection SHALL display a "Contact" button that scrolls to the ContactSection when clicked.
7. WHEN the HeroSection enters the viewport on page load, THE AnimationSystem SHALL apply a staggered entrance animation to the photo, name, role text, and buttons in sequence.
8. THE HeroSection SHALL be fully responsive, stacking elements vertically on viewports narrower than 768px.

---

### Requirement 5: About Me Section

**User Story:** As a visitor, I want to read a clear, well-presented summary of the owner's background and experience, so that I understand their profile quickly.

#### Acceptance Criteria

1. THE AboutSection SHALL preserve all existing written content from the current `index.astro` about section without omission.
2. THE AboutSection SHALL present the content using a modern two-column layout on viewports 768px and wider, with a visual element (icon, illustration, or decorative card) alongside the text.
3. THE AboutSection SHALL display key facts (e.g., role, focus areas) as visually distinct cards or badge elements.
4. WHEN the AboutSection enters the viewport during scrolling, THE AnimationSystem SHALL apply a fade-in slide-up entrance animation to the section content.

---

### Requirement 6: Technologies Section

**User Story:** As a recruiter, I want to see the owner's technology skills organized by category with clear visual indicators, so that I can quickly assess technical fit.

#### Acceptance Criteria

1. THE TechSection SHALL organize technologies into the following five categories: Backend, Frontend, Databases, Artificial Intelligence, and DevOps & Tools.
2. THE TechSection SHALL map all existing technologies from `index.astro` into the appropriate categories without removing any item.
3. THE TechSection SHALL display each technology as a badge or chip element with an icon where an icon is available.
4. WHEN a technology badge is hovered, THE AnimationSystem SHALL apply a hover effect (e.g., scale, glow, or color shift) to the badge.
5. THE TechCard SHALL be updated to accept a `category` prop and render category-level grouping with a category icon or label.
6. WHEN the TechSection enters the viewport during scrolling, THE AnimationSystem SHALL apply staggered entrance animations to each category card with a delay increment of 100ms per card.
7. THE TechSection SHALL be responsive, displaying categories in a single column on viewports narrower than 640px and in a grid of 2–3 columns on wider viewports.

---

### Requirement 7: Projects Section

**User Story:** As a visitor, I want to browse project cards that clearly present each project's title, description, and technologies, so that I can quickly identify interesting work.

#### Acceptance Criteria

1. THE ProjectsSection SHALL display all projects loaded from MDXContent using the existing `getCollection("projects")` call without breaking the data flow.
2. THE ProjectCard SHALL display a project title, short description, a list of technology tags, and a "View More" link.
3. WHEN a ProjectCard is hovered, THE AnimationSystem SHALL apply a lift effect (translateY with box-shadow increase) and a smooth color transition on interactive elements.
4. THE ProjectCard SHALL display technology tags as styled badge elements consistent with the TechSection badge style.
5. WHEN the ProjectsSection enters the viewport during scrolling, THE AnimationSystem SHALL apply staggered entrance animations to each ProjectCard with a delay increment of 150ms per card.
6. THE ProjectCard SHALL support an optional cover image field in MDXContent frontmatter; IF no image is provided, THEN THE ProjectCard SHALL display a styled placeholder with a gradient background.
7. THE ProjectsSection SHALL be responsive, displaying cards in a single column on viewports narrower than 768px and in a two-column grid on wider viewports.

---

### Requirement 8: Project Pages

**User Story:** As a visitor reading a project's detail page, I want clear, readable typography and smooth navigation, so that I can fully understand the project without visual friction.

#### Acceptance Criteria

1. THE ProjectPage SHALL preserve all existing MDXContent rendering logic using the current `getStaticPaths` and `render()` approach.
2. THE ProjectPage SHALL apply a refined prose style using TailwindCSS typography plugin with dark-mode-aware color overrides.
3. THE ProjectPage SHALL display a prominent project header including the project title and short description with improved visual hierarchy.
4. THE ProjectPage SHALL display the table of contents (already present) styled as a sticky sidebar on viewports 1024px and wider, and as a collapsible accordion on narrower viewports.
5. WHEN a table-of-contents link is clicked, THE ProjectPage SHALL scroll smoothly to the corresponding heading.
6. THE ProjectPage SHALL apply syntax highlighting to code blocks using a dark-mode-compatible theme.
7. THE ProjectPage SHALL display a "Back to Projects" navigation link that returns the visitor to the ProjectsSection of the homepage.

---

### Requirement 9: Education Section (New)

**User Story:** As a recruiter, I want to see the owner's academic background presented clearly, so that I can evaluate educational qualifications alongside technical skills.

#### Acceptance Criteria

1. THE EducationSection SHALL display the owner's degree program: Systems Engineering.
2. THE EducationSection SHALL display the university name and current enrollment status.
3. THE EducationSection SHALL present academic milestones as a vertical or horizontal timeline component.
4. WHEN the EducationSection enters the viewport during scrolling, THE AnimationSystem SHALL apply a sequential reveal animation to each timeline entry with a delay increment of 200ms per entry.
5. THE EducationSection SHALL be responsive, presenting the timeline in a single-column vertical layout on all viewport widths.

---

### Requirement 10: Professional Goals (Roadmap) Section (New)

**User Story:** As a recruiter, I want to see the owner's career trajectory and goals, so that I can assess long-term potential and alignment with roles.

#### Acceptance Criteria

1. THE RoadmapSection SHALL display at least four career milestones in the following order: (1) Systems Engineering Student (current), (2) Professional Internship (next step), (3) Backend Engineer (goal), (4) AI Engineer / Data Engineer (long-term goal).
2. THE RoadmapSection SHALL visually distinguish the current milestone from future milestones (e.g., using a filled vs. outlined style or an accent color).
3. THE RoadmapSection SHALL present milestones as a connected visual roadmap (e.g., a step-by-step timeline with connecting lines or arrows).
4. WHEN the RoadmapSection enters the viewport during scrolling, THE AnimationSystem SHALL animate each milestone into view sequentially from left to right or top to bottom with a delay increment of 200ms per milestone.
5. THE RoadmapSection SHALL be responsive, collapsing to a vertical layout on viewports narrower than 768px.

---

### Requirement 11: Certifications Section (New)

**User Story:** As a recruiter, I want to see the owner's planned certifications, so that I can gauge commitment to professional development.

#### Acceptance Criteria

1. THE CertificationsSection SHALL display planned certifications in the following areas: Oracle Database, SQL Server, Artificial Intelligence, Data Engineering, and Cloud Computing.
2. THE CertificationsSection SHALL visually mark each certification as "In Progress" or "Planned" using a status badge.
3. THE CertificationsSection SHALL display each certification as a card with a title, issuer or domain, and status badge.
4. WHEN a certification card is hovered, THE AnimationSystem SHALL apply a hover effect consistent with the ProjectCard hover style.
5. WHEN the CertificationsSection enters the viewport during scrolling, THE AnimationSystem SHALL apply staggered entrance animations to each card with a delay increment of 100ms per card.

---

### Requirement 12: Contact Section

**User Story:** As a visitor who wants to reach out, I want a modern contact section with multiple channels and a form, so that I can connect with the owner easily.

#### Acceptance Criteria

1. THE ContactSection SHALL display links to the owner's GitHub profile, LinkedIn profile, and email address.
2. THE ContactSection SHALL display each contact channel as a styled card or icon-button element.
3. THE ContactSection SHALL include a contact form with fields for name, email, and message.
4. WHEN the contact form is submitted with all required fields filled, THE ContactSection SHALL provide visual feedback (e.g., a success message) to the visitor.
5. IF the contact form is submitted with one or more required fields empty, THEN THE ContactSection SHALL display inline validation error messages identifying the missing fields.
6. THE ContactSection SHALL be responsive, stacking contact channel cards and the form in a single column on viewports narrower than 768px.

---

### Requirement 13: Footer

**User Story:** As a visitor at the bottom of the page, I want a professional footer with social links and quick navigation, so that I can access key resources without scrolling back to the top.

#### Acceptance Criteria

1. THE Footer SHALL display links to the owner's GitHub, LinkedIn, and email.
2. THE Footer SHALL display a quick-navigation list linking to all major sections of the Portfolio.
3. THE Footer SHALL display the owner's name, current role title, and copyright notice.
4. THE Footer SHALL apply consistent dark/light theme styling via the ThemeSystem.

---

### Requirement 14: Animation System

**User Story:** As a visitor, I want smooth, professional animations that enhance my browsing experience, so that the portfolio feels dynamic and polished without being distracting.

#### Acceptance Criteria

1. THE AnimationSystem SHALL implement scroll-reveal animations using the Intersection Observer API or a lightweight library (e.g., AOS, Motion One) without blocking page rendering.
2. THE AnimationSystem SHALL apply fade-in and slide-up entrance animations to all major sections as they enter the viewport.
3. THE AnimationSystem SHALL apply staggered animations to list items and cards within each section as specified in individual section requirements.
4. THE AnimationSystem SHALL apply hover micro-interactions (scale, glow, color shift, or lift) to all interactive card and button elements.
5. THE AnimationSystem SHALL use animation durations between 200ms and 600ms for all transitions to avoid a sluggish feel.
6. WHERE the visitor has enabled the `prefers-reduced-motion` media query, THE AnimationSystem SHALL disable or significantly reduce all animations.
7. THE AnimationSystem SHALL not block the main thread during scroll events; all animations SHALL use CSS transforms and opacity rather than layout-triggering properties.

---

### Requirement 15: Performance and Astro Architecture Preservation

**User Story:** As the portfolio owner, I want the modernized portfolio to maintain high performance and SEO quality while preserving the existing Astro-based architecture, so that the site loads fast and ranks well.

#### Acceptance Criteria

1. THE Portfolio SHALL preserve the existing file structure: `src/Components/`, `src/content/projects/`, `src/Layouts/`, `src/pages/index.astro`, and `src/pages/projects/[slug].astro`.
2. THE Portfolio SHALL preserve all existing MDXContent files without modification to their content or frontmatter fields (additions to frontmatter are permitted).
3. THE Portfolio SHALL preserve the existing Astro content collection integration using `getCollection("projects")`.
4. THE Portfolio SHALL achieve a Lighthouse Performance score of 90 or above on the homepage.
5. THE Portfolio SHALL achieve a Lighthouse SEO score of 90 or above.
6. THE Portfolio SHALL include semantic HTML5 landmarks (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`) across all pages.
7. THE Portfolio SHALL include appropriate `<meta>` tags (description, Open Graph) in the Layout `<head>`.
8. THE Portfolio SHALL minimize client-side JavaScript, preferring Astro's static rendering and CSS-based animations wherever feasible.
9. WHEN new npm packages are added, THE Portfolio SHALL use exact or pinned versions in `package.json` to ensure reproducible builds.
