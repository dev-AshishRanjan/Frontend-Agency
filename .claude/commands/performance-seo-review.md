# Performance & SEO Review

Audit a frontend surface for Core Web Vitals, load performance, and SEO quality.

## When to Run

Run before shipping any public-facing frontend surface, or when investigating performance regression or SEO gaps.

## Workflow

1. Audit Largest Contentful Paint (LCP): identify the LCP element, assess image optimization, font loading, and render-blocking resources.
2. Audit Cumulative Layout Shift (CLS): identify unstable layout elements, missing dimension attributes, and late-loading content.
3. Audit Interaction to Next Paint (INP): identify long tasks, main-thread blocking, and event handler efficiency.
4. Audit asset optimization: image formats, compression, lazy loading, responsive sizing.
5. Audit JavaScript bundle: size, code splitting, tree shaking, third-party script impact.
6. Audit SEO structure: title, meta description, heading hierarchy, canonical, Open Graph, structured data.
7. Audit crawlability: robots.txt, sitemap, noindex usage, internal linking.
8. Produce a prioritized list with estimated impact per fix.

## Output

Return:

- **Core Web Vitals assessment** — LCP, CLS, INP findings with root cause
- **Asset optimization gaps** — images, fonts, scripts with specific fixes
- **SEO structure audit** — all meta, heading, and structured data findings
- **Crawlability findings** — indexing and discoverability issues
- **Priority list** — findings ranked by business impact

For each finding: describe the issue, estimated impact, and concrete fix.

## References

- `plugins/frontend-agency-core/references/review-gates.md`
- `plugins/frontend-agency-core/references/quality-rubric.md`
