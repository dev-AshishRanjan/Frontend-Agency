# Visual QA

Verify that implementation matches design intent, design system, and brand standards.

## When to Run

Run after implementation is complete, before declaring any task done. This is the pre-shipping visual quality gate.

## Workflow

1. Compare the rendered output against the design intent and any provided mocks or specs.
2. Verify design system alignment: are all visual decisions using defined tokens?
3. Verify visual language compliance: colors, typography, spacing, and iconography match the system.
4. Check responsive behavior: does the layout adapt correctly at all breakpoints?
5. Check interactive states: hover, focus, active, disabled, loading, error, empty.
6. Check visual hierarchy: does the page lead the eye to the intended focal points?
7. Identify polish gaps: inconsistent spacing, misaligned elements, visual noise.
8. Produce a structured finding list.

## Output

Return:

- **Regressions** — implementation does not match design intent
- **Design system deviations** — values used that are not from the token system
- **State coverage gaps** — interactive or content states that are unhandled
- **Responsive issues** — breakpoint-specific layout or content problems
- **Polish list** — minor visual inconsistencies to address before shipping
- **Pass confirmation** — areas that are correctly implemented

## References

- `plugins/frontend-agency-core/references/review-playbook.md`
- `plugins/frontend-agency-core/references/quality-rubric.md`
