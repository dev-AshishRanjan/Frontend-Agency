# Design Review

Run the complete design review gate before shipping any frontend work.

## When to Run

Run at the end of any design or frontend build task. This is the final gate before declaring work complete and shipping.

## Workflow

This skill orchestrates a full review across all quality dimensions:

1. **Visual quality** — run visual QA protocol.
2. **Design system alignment** — verify all visual decisions trace to the token system.
3. **Brand consistency** — verify the surface reflects the creative direction.
4. **Accessibility** — run the accessibility review checklist.
5. **Performance** — run the performance and SEO review checklist.
6. **Production readiness** — verify no placeholder content, no hardcoded values, no unhandled states.
7. Produce a structured pass/fail report.

## Output

Return a structured report:

### Pass / Ship

All quality gates met. List any minor improvements deferred to a follow-up.

### Conditional Pass

List: what was found, severity, required fix, and estimated effort. Work can ship after these are resolved.

### Fail / Block

List: what failed, why it blocks shipping, and what must be done to unblock.

---

For each finding:
- **What:** describe the issue precisely
- **Where:** component, route, or element
- **Why it matters:** user or business impact
- **Fix:** concrete, actionable remediation

## References

- `plugins/frontend-agency-core/references/review-gates.md`
- `plugins/frontend-agency-core/references/review-playbook.md`
- `plugins/frontend-agency-core/references/quality-rubric.md`
