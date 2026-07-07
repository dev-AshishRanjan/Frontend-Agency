---
name: design-system
description: "Use to translate brand and visual direction into scalable design tokens, component rules, states, patterns, and frontend implementation guidance."
---

# Design System

Use this skill when a project needs durable tokens and component rules rather than isolated styling.

## Workflow

1. Identify the host framework and styling approach when a codebase exists.
2. Convert visual language into tokens for color, typography, spacing, radius, shadow, motion, and breakpoints.
3. Define component anatomy, states, variants, and accessibility expectations.
4. Specify how tokens should be represented in the target stack.
5. Flag one-off styling choices that should become tokens or be removed.

## Output

Return:

- Token map
- Component inventory
- State model
- Responsive rules
- Accessibility requirements
- Implementation notes
- Migration or adoption risks

## References

- Read `../../references/design-system-playbook.md` when defining tokens, components, states, or variants.
- Read `../../references/frontend-standards.md` for implementation constraints.
- Read `../../references/review-gates.md` before declaring a system production-ready.
