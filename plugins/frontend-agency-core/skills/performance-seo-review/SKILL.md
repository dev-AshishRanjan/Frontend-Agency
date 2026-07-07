---
name: performance-seo-review
description: "Use to audit frontend performance, Core Web Vitals, bundle risk, image delivery, rendering mode, metadata, crawlability, structured data, and SEO readiness."
---

# Performance SEO Review

Use this skill before shipping public marketing pages, product pages, documentation surfaces, or any route where discoverability and speed matter.

## Workflow

1. Inspect framework, rendering mode, route structure, assets, metadata, and third-party scripts.
2. Check likely Core Web Vitals risks: LCP, CLS, INP, and JavaScript cost.
3. Check SEO basics: title, description, canonical, headings, links, robots behavior, structured data, and server-rendered content.
4. Recommend measurable fixes.
5. Include validation commands when tools are available.

## Output

Lead with findings ordered by severity:

- Performance blockers
- SEO blockers
- Optimization opportunities
- Verification steps
- Metrics to capture

## References

- Read `../../references/frontend-standards.md` for performance and SEO standards.
- Read `../../references/review-playbook.md` when writing findings and verification steps.
- Read `../../references/review-gates.md` before marking work ready.
