# Design System

Architect or audit the component library and design system.

## When to Run

Run when building, auditing, or expanding a component library — including token architecture, component API design, variant strategy, and documentation standards.

## Workflow

1. Review visual language decisions and token definitions.
2. Define token architecture: primitive tokens → semantic tokens → component tokens.
3. Define component scope: what components are needed, what is out of scope.
4. For each component, define: props API, variants, states, accessibility requirements, and composition rules.
5. Define documentation standards for each component.
6. Identify shared patterns that should be abstracted into utilities.

## Output

Return:

- **Token architecture** — three-tier model with naming conventions
- **Component inventory** — what ships in this phase, what is deferred
- **Component specs** — props, variants, states, accessibility notes for each component
- **Composition rules** — how components combine, what is forbidden
- **Documentation template** — standard format for component docs
- **Quality gate** — what must be true before a component is production-ready

## Next Skills

After design system, continue with:
- `/frontend-architecture` — plan the technical implementation layer
- `/visual-qa` — verify components match the design system

## References

- `plugins/frontend-agency-core/references/design-system-playbook.md`
- `plugins/frontend-agency-core/references/frontend-standards.md`
