# Contributing to Frontend Agency

Thank you for contributing. This document covers skill authoring standards, the validation pipeline, and the change workflow.

---

## What Can Be Contributed

- **New skills** — modular Agent Skills for additional frontend domains
- **Skill improvements** — better workflows, clearer outputs, updated standards
- **Reference playbooks** — deeper guidance documents for existing skills
- **Eval fixtures** — test cases for skill quality gates
- **Adapter improvements** — better compiled outputs for additional agent platforms
- **Documentation** — install guides, compatibility notes, examples

**Do not** modify the core skill content to add agent-specific instructions (e.g., Codex-only hooks, Claude-specific syntax). Skills must remain vendor-neutral.

---

## Skill Authoring Standard

### File Structure

Every skill lives in its own directory:

```
plugins/frontend-agency-core/skills/<skill-name>/
  SKILL.md              # Required. The skill entrypoint.
  references/           # Optional. Skill-local reference symlinks or copies.
  agents/               # Optional. Agent-specific adapter hints.
    openai.yaml         # OpenAI tool adapter metadata.
```

### SKILL.md Format

Every `SKILL.md` must:

1. **Start with YAML frontmatter:**

```yaml
---
name: skill-name
description: "Quoted. Specific. 80+ characters. State the trigger context explicitly."
---
```

2. **Include these three sections in order:**
 - `## Workflow` — numbered steps, each a concrete action
 - `## Output` — what the agent returns, with named deliverables
 - `## References` — which shared playbooks to read and when

3. **Reference shared playbooks using this exact path pattern:**

```markdown
- Read `../../references/playbook-name.md` when [specific condition].
```

4. **Keep the entrypoint concise.** The `SKILL.md` should be < 60 lines. Deeper guidance belongs in reference files.

### Quality Bar

Each skill must:

- State its trigger context clearly in the frontmatter description
- Keep workflow steps action-oriented, not advisory
- Produce outputs that downstream skills or the user can act on without reinterpretation
- Avoid generic advice that a capable agent already knows
- Reference shared playbooks for deeper domain standards rather than inlining them
- Not contain hardcoded agent-specific instructions (Claude-only, Codex-only, etc.)

### Anti-Patterns to Avoid

- Vague trigger descriptions ("Use for design things")
- Output sections that describe a mood rather than a deliverable ("Return a beautiful design vision")
- Inlining full playbook content into SKILL.md instead of referencing it
- Adding TODO or placeholder markers
- Hardcoding local machine paths
- Adding agent-specific syntax that breaks portability

---

## Reference Playbook Authoring

Shared reference files live at `plugins/frontend-agency-core/references/`.

A reference file:
- Provides deeper domain standards than can fit in a `SKILL.md` entrypoint
- Is referenced by skills when a specific condition applies (not always)
- Is written in imperative, production-oriented prose
- Uses `##` headings for sections, bullet points for lists
- Is < 200 lines

---

## Eval Fixtures

Every new skill must include an eval fixture at `evals/skills/<skill-name>.json`.

Format:

```json
{
  "skill": "skill-name",
  "intent": "One sentence describing what a correct output accomplishes.",
  "trigger_terms": ["term1", "term2"],
  "expected_sections": ["Section heading 1", "Section heading 2"],
  "rejection_patterns": ["phrase that must not appear"],
  "anti_patterns": ["generic phrase", "vague phrase"],
  "quality_floor": "Minimum quality description for a passing output.",
  "sample_requests": [
    "A realistic user request that should trigger this skill.",
    "A second realistic request."
  ]
}
```

---

## Validation Pipeline

Before submitting a pull request, run the full validation suite:

```bash
# 1. Compile adapters
npm run compile:adapters

# 2. Run repository validation (includes adapter build check)
npm run validate

# 3. Run skill evals
npm run eval:skills

# 4. Package the plugin (verify integrity)
npm run package:plugin

# 5. Run release gate
npm run release:check
```

All five commands must pass before a PR can be merged.

---

## Pull Request Standards

- **One skill per PR.** Do not bundle unrelated skills in a single PR.
- **Include the eval fixture.** PRs without an eval fixture for new skills will not be merged.
- **Update CHANGELOG.md.** Add an entry under the appropriate version.
- **Reference the skill in README.md** if adding a new skill.
- **Do not modify other skills' SKILL.md** unless the PR is explicitly a cross-cutting quality improvement.

---

## Change Workflow

```
branch: skill/skill-name
│
├── Add SKILL.md
├── Add references/ (if needed)
├── Add evals/skills/skill-name.json
├── Add .claude/commands/skill-name.md
├── Update validate-repo.mjs requiredSkills list
├── Update README.md skills list
└── Update CHANGELOG.md
```

---

## Security

Skills must never:

- Encourage broad filesystem access beyond the project scope
- Instruct agents to make unreviewed network calls
- Instruct agents to execute shell commands without user confirmation
- Expose or log secrets, credentials, or personal data
- Recommend automatic destructive operations (delete, overwrite) without explicit confirmation

Security-relevant changes require a maintainer review before merging.
