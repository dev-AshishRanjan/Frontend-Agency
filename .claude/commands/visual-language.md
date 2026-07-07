# Visual Language

Build or audit the complete visual language for a project.

## When to Run

Run when establishing or auditing the visual system — colors, typography, spacing, iconography, and visual hierarchy — before component or layout implementation.

## Workflow

1. Review creative direction and brand context.
2. Define the color system: primary, secondary, semantic, surface, and neutral palettes with accessible contrast ratios.
3. Define the type scale: font families, size scale, weight usage, line height, and hierarchy.
4. Define the spacing system: base unit, scale steps, and application rules.
5. Define iconography style and sourcing.
6. Define visual hierarchy rules: what takes priority, how to signal importance.
7. Document all decisions as named tokens.

## Output

Return:

- **Color system** — all palette values with WCAG contrast ratios verified
- **Type scale** — font stack, size/weight/line-height decisions with use cases
- **Spacing system** — base unit and scale with application rules
- **Iconography** — style definition and sourcing guidance
- **Visual hierarchy** — rules for emphasis, de-emphasis, and information density
- **Token glossary** — named tokens for all visual decisions

## Next Skills

After visual language, continue with:
- `/design-system` — implement tokens into components
- `/frontend-architecture` — plan technical implementation

## References

- `plugins/frontend-agency-core/references/visual-language-playbook.md`
- `plugins/frontend-agency-core/references/frontend-standards.md`
