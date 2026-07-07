# Frontend Agency

Frontend Agency is a professional skill and plugin repository for AI agents that need to plan, design, build, review, and harden premium frontend experiences.

The first distribution target is Claude Code through a repo-local plugin marketplace. The repository is structured so the same skills can also be consumed by other agents that support the Agent Skills format.

## What This Repository Provides

- A marketplace-ready Claude Code plugin: `frontend-agency-core`
- Modular Agent Skills for brand discovery, creative direction, visual systems, frontend architecture, accessibility, performance, SEO, and visual QA
- Shared standards that keep skill entrypoints concise while preserving deep production guidance
- Validation scripts for plugin, marketplace, and skill quality gates
- Governance and release documentation for a maintainable enterprise workflow

## Repository Layout

```text
frontend-agency/
  .agents/plugins/marketplace.json
  plugins/frontend-agency-core/
    .codex-plugin/plugin.json
    skills/
    references/
    scripts/
    assets/
  scripts/
  docs/
```

## Quality Bar

Every skill must be:

- Concise at the `SKILL.md` entrypoint
- Explicit about when it should trigger
- Backed by shared references where deeper guidance is useful
- Validated before release
- Suitable for production workflows, not demo-only output

## Validation

Run the repository validation:

```bash
npm run validate
```

Run the skill eval suite:

```bash
npm run eval:skills
```

Run the plugin validator:

```bash
python C:\Users\ASUS\.codex\skills\.system\plugin-creator\scripts\validate_plugin.py plugins\frontend-agency-core
```

Run skill validation for a specific skill:

```bash
python C:\Users\ASUS\.codex\skills\.system\skill-creator\scripts\quick_validate.py plugins\frontend-agency-core\skills\brand-discovery
```

## Current Core Skills

- `brand-discovery`
- `creative-direction`
- `visual-language`
- `design-system`
- `landing-page-strategy`
- `frontend-architecture`
- `motion-design`
- `accessibility-review`
- `performance-seo-review`
- `visual-qa`
- `design-review`

## Distribution Model

The repo-local marketplace lives at `.agents/plugins/marketplace.json`. The core plugin lives at `plugins/frontend-agency-core` and exposes skills from `./skills/`.

Claude Code is the primary runtime target. The skills themselves remain standard Agent Skills so other compatible agents can consume them without depending on Claude-specific packaging.
