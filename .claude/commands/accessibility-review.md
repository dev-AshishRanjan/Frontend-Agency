# Accessibility Review

Audit a frontend surface for WCAG compliance and inclusive design quality.

## When to Run

Run before shipping any frontend work, or when auditing existing UI for accessibility compliance. Target: WCAG 2.1 AA minimum, WCAG 2.2 AA preferred.

## Workflow

1. Audit semantic HTML structure: headings, landmarks, lists, buttons, links.
2. Audit keyboard navigation: tab order, focus visibility, keyboard traps, skip links.
3. Audit focus management: modal focus containment, route change announcements, dynamic content updates.
4. Audit color contrast: text, interactive elements, UI components, and graphical objects.
5. Audit ARIA usage: roles, properties, states — validate correctness and necessity.
6. Audit image alt text, icon labels, and decorative element handling.
7. Audit form accessibility: labels, error messages, fieldsets, required state.
8. Audit motion: `prefers-reduced-motion` support.
9. Produce a prioritized remediation list with WCAG criterion references.

## Output

Return:

- **Critical failures** — issues that block shipping (Level A violations)
- **Required fixes** — WCAG 2.1 AA violations that must be resolved
- **Recommended improvements** — WCAG 2.2 and best-practice issues
- **Passing areas** — what is correctly implemented
- **Testing notes** — screen reader and keyboard testing guidance

For each finding: describe the issue, cite the WCAG criterion, provide a concrete fix.

## References

- `plugins/frontend-agency-core/references/review-gates.md`
- `plugins/frontend-agency-core/references/quality-rubric.md`
