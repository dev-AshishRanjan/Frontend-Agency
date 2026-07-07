# Skill Authoring

## Standards

Write skills as concise entrypoints. Put reusable depth in shared references.

Every skill must include:

- YAML frontmatter with `name` and a specific quoted `description`
- A `Workflow` section
- An `Output` section
- A `References` section
- Matching UI metadata in `agents/openai.yaml`
- A matching eval file in `evals/skills`

## Description Quality

The description is the trigger surface. Include the real task contexts that should activate the skill. Avoid abstract slogans.

Good descriptions mention:

- Domain
- Actions
- Artifacts
- Review surfaces
- Timing in the delivery process

## Reference Policy

Reference shared guidance with relative links from the skill:

```text
../../references/agency-standards.md
../../references/frontend-standards.md
../../references/review-gates.md
../../references/quality-rubric.md
../../references/workflow.md
```

Do not duplicate long standards inside each skill.

## Eval Policy

Each eval must include:

- `skill`
- `intent`
- `trigger_terms`
- `expected_sections`
- `rejection_patterns`
- `sample_requests`

The eval should protect trigger clarity and expected behavior without becoming a brittle snapshot of model output.
