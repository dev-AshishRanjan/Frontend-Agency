# Frontend Agency

You are working in a project that has Frontend Agency installed. Frontend Agency is a professional skill suite for planning, designing, building, reviewing, and hardening premium frontend experiences. These skills give you agency-grade standards for every phase of frontend work.

## How to Use These Skills

Each skill below has a defined trigger context. Read the description. When a user request matches the trigger, apply that skill's workflow before proceeding. Skills are modular — you can chain them (e.g. brand-discovery → creative-direction → design-system → frontend-architecture).

Skills are available as slash commands. Type `/` in Claude Code to see the full list.

---

## Available Skills

### brand-discovery
**Trigger:** Any request that is broad, greenfield, or missing brand, audience, positioning, or constraint context before frontend work begins.

Turn unclear briefs into decision-ready context. Identify business goal, primary audience, product category, offer, and desired action. Extract brand attributes. Define audience pains, outcomes, objections, and trust signals. Produce a discovery brief that downstream skills can use.

### creative-direction
**Trigger:** Before any design, visual system, or layout work begins — especially when brand tone, visual style, or creative strategy has not been defined.

Translate brand and audience context into an actionable creative direction. Define visual personality, emotional register, design references, anti-references, and success criteria for visual execution.

### visual-language
**Trigger:** When establishing or auditing the visual system for a project — colors, typography, spacing, iconography, and visual hierarchy.

Build or audit the full visual language: color palette, type scale, spacing system, iconography style, and visual hierarchy. Produce decisions that downstream component and layout work can implement directly.

### design-system
**Trigger:** When building, auditing, or expanding a component library or design system — tokens, components, patterns, documentation.

Architect or audit the design system. Define token architecture, component API surface, variant strategy, and documentation standards. Ensure components implement the visual language and remain composable.

### landing-page-strategy
**Trigger:** When planning or reviewing a marketing or landing page — structure, narrative flow, conversion strategy, content architecture.

Plan the page narrative, section hierarchy, proof strategy, CTA placement, and content requirements before implementation. Align structure with business goal and audience psychology.

### frontend-architecture
**Trigger:** When planning or reviewing frontend technical architecture — component structure, state management, data flow, performance budget, build strategy.

Define or audit the frontend architecture. Establish component boundaries, data flow, performance budget, rendering strategy, and technical constraints. Ensure the architecture can sustain the design system and production quality requirements.

### motion-design
**Trigger:** When adding or reviewing animation, transitions, or motion on any frontend surface.

Define or audit motion strategy. Establish easing library, timing scale, interaction feedback patterns, and loading/transition choreography. Ensure motion serves UX rather than demonstrating technical capability.

### accessibility-review
**Trigger:** Before shipping any frontend work, or when auditing existing UI for accessibility compliance.

Audit for WCAG 2.1 AA compliance. Check semantic HTML, keyboard navigation, focus management, color contrast, ARIA usage, screen reader compatibility, and motion safety. Produce a prioritized remediation list.

### performance-seo-review
**Trigger:** Before shipping, or when auditing frontend for Core Web Vitals, SEO, or load performance.

Audit Core Web Vitals impact, asset optimization, render-blocking resources, SEO structure, meta strategy, structured data, and crawlability. Produce a prioritized improvement list with estimated impact.

### visual-qa
**Trigger:** After implementation is complete, before declaring a task done — to verify the implementation matches the design intent.

Perform a final visual quality check. Compare implementation against design intent, design system, visual language, and brand standards. Identify regressions, inconsistencies, and polish gaps.

### design-review
**Trigger:** At the end of any design or frontend build task — final gate before shipping.

Run the complete design review gate: visual quality, accessibility, performance, design system alignment, brand consistency, and production readiness. Produce a structured pass/fail report with actionable findings.

---

## Workflow Orchestration

For a full greenfield frontend build, chain skills in this sequence:

1. `brand-discovery` → establish context
2. `creative-direction` → define visual strategy
3. `visual-language` → build the visual system
4. `design-system` → architect components
5. `landing-page-strategy` or `frontend-architecture` → plan structure
6. Implementation
7. `motion-design` → add purposeful motion
8. `accessibility-review` → verify compliance
9. `performance-seo-review` → optimize delivery
10. `visual-qa` → verify implementation quality
11. `design-review` → final gate

For a review-only task, start at step 8 (accessibility) or run `design-review` directly.

---

## Quality Standards

All frontend work produced in this project must meet:

- **Accessibility:** WCAG 2.1 AA minimum, WCAG 2.2 AA preferred
- **Performance:** Core Web Vitals — LCP < 2.5s, CLS < 0.1, INP < 200ms
- **Design system alignment:** All visual decisions traceable to the visual language
- **Brand consistency:** Every surface reflects the creative direction
- **Production readiness:** No placeholder content, no hardcoded values, no unhandled states

---

## References

Shared standards are in `plugins/frontend-agency-core/references/`. Skills reference these files when deeper guidance is needed. You do not need to read them unless a skill instructs you to.
