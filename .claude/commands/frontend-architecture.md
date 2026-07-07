# Frontend Architecture

Define or audit the technical architecture for a frontend system.

## When to Run

Run when planning or reviewing frontend technical decisions — component structure, state management, data flow, rendering strategy, performance budget, and build configuration.

## Workflow

1. Review design system scope and visual language requirements.
2. Define rendering strategy: CSR, SSR, SSG, ISR — with rationale.
3. Define component architecture: atomic/molecular structure, composition rules, shared utilities.
4. Define state management: local, global, server, and URL state — with boundaries for each.
5. Define data fetching strategy: loading states, error states, caching, revalidation.
6. Establish performance budget: target metrics for LCP, CLS, INP, FID, and bundle size.
7. Define build and tooling configuration.

## Output

Return:

- **Rendering strategy** — chosen approach with tradeoffs explained
- **Component architecture** — structure diagram and composition rules
- **State management plan** — what state lives where and why
- **Data fetching strategy** — patterns for loading, error, and empty states
- **Performance budget** — named targets for Core Web Vitals and bundle size
- **Technical constraints** — what is off-limits or must be preserved
- **Dependency decisions** — what libraries are approved and why

## Next Skills

After frontend architecture, proceed to implementation, then:
- `/accessibility-review` — verify compliance before shipping
- `/performance-seo-review` — audit delivery optimization

## References

- `plugins/frontend-agency-core/references/frontend-architecture-playbook.md`
- `plugins/frontend-agency-core/references/frontend-standards.md`
