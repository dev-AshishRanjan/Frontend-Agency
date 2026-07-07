# Agent Compatibility

## Canonical Skill Format

Each skill is a standalone folder with:

```text
SKILL.md
agents/openai.yaml
```

The `SKILL.md` file is the portable contract. Claude Code marketplace metadata is packaging, not the skill source of truth.

## Portability Rules

- Keep Claude-specific marketplace configuration outside individual skills.
- Keep shared standards in `plugins/frontend-agency-core/references`.
- Use relative paths from skills to shared references.
- Avoid instructions that depend on a single vendor unless the skill name or task explicitly requires it.
- Keep output contracts stable across compatible agents.

## Runtime Expectations

Compatible agents should:

- Read skill frontmatter to decide when a skill applies.
- Load the skill body only when the skill triggers.
- Load shared references only when the skill instructs the agent to do so.
- Preserve the user's project conventions before applying Frontend Agency standards.

## Claude Code Priority

Claude Code remains the primary integration target. Marketplace packaging, plugin metadata, and UI metadata should be tested there first before broader distribution.
