# Motion Design

Define or audit the motion strategy for a frontend surface.

## When to Run

Run when adding animation, transitions, or motion to any UI — or when auditing existing motion for quality, consistency, and accessibility.

## Workflow

1. Review the creative direction and visual language to understand brand personality.
2. Define the motion vocabulary: easing library, duration scale, and choreography rules.
3. Map all interactive feedback moments: hover, press, focus, drag, swipe.
4. Map all state transition moments: loading, success, error, empty, navigation.
5. Define entrance and exit choreography for key surfaces.
6. Verify all motion respects `prefers-reduced-motion`.
7. Identify performance risk: will any animation cause layout recalculation or compositor skipping?

## Output

Return:

- **Motion vocabulary** — easing values, duration scale, and usage rules
- **Interaction feedback map** — motion response for each interactive state
- **State transition choreography** — how key UI states enter and exit
- **Accessibility compliance** — `prefers-reduced-motion` strategy
- **Performance risk assessment** — which animations may cause jank and how to mitigate
- **Implementation notes** — CSS custom properties, JS animation library guidance

## References

- `plugins/frontend-agency-core/references/motion-playbook.md`
