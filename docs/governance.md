# Governance

## Release Standard

Every release must pass:

- Repository validation
- Plugin manifest validation
- Skill frontmatter validation
- Review for unresolved TODO placeholders
- Review for accidental local-only paths in published docs

## Change Control

Use focused commits by phase:

- Foundation
- Core skills
- Review skills
- Distribution
- Evals
- Release hardening

Avoid unrelated refactors inside phase commits.

## Skill Review Criteria

Each skill must:

- State its trigger context in frontmatter description
- Keep procedural instructions concise
- Link to shared references for deeper standards
- Avoid generic advice that an agent already knows
- Produce production-oriented outputs, decisions, or review findings

## Security

Skills must not encourage broad filesystem access, unreviewed network calls, unsafe command execution, secret exposure, or automatic destructive changes.
