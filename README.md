# Frontend Agency

[![Validate](https://github.com/dev-AshishRanjan/Frontend-Agency/actions/workflows/validate.yml/badge.svg)](https://github.com/dev-AshishRanjan/Frontend-Agency/actions/workflows/validate.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![npm](https://img.shields.io/npm/v/frontend-agency)](https://www.npmjs.com/package/frontend-agency)
[![Node.js](https://img.shields.io/badge/node-%3E%3D20-brightgreen)](https://nodejs.org)

**Agency-grade frontend skills for AI agents.**

Frontend Agency gives AI coding agents — Claude Code, Cursor, GitHub Copilot, Gemini CLI, and others — structured, production-oriented workflows for every phase of frontend work. Brand discovery, creative direction, visual systems, architecture, motion, accessibility, performance, visual QA, and final review gates — all as composable, vendor-neutral skills.

> **Quick start — Claude Code:**
> ```bash
> npx frontend-agency install
> ```
> Type `/` in Claude Code to see all 12 skill commands immediately.

---

## Why Frontend Agency?

Every AI frontend session starts from scratch. The agent writes the same boilerplate design decisions, misses the same accessibility issues, and ships the same generic Inter-on-white-card layouts — unless you tell it not to.

Frontend Agency solves this at the source. Install once. Every session inherits:

- **A defined workflow** — strategy before implementation, review before shipping
- **Production quality standards** — WCAG 2.1 AA, Core Web Vitals targets, design system discipline
- **Modular skill invocation** — each skill has a clear trigger, a concrete workflow, and named deliverables
- **Cross-agent portability** — the same skills work in Claude Code, Cursor, Copilot, Gemini, and custom API runtimes

---

## Installation

Full guide in [INSTALL.md](INSTALL.md). The fastest paths:

### Claude Code — CLI (Recommended)

```bash
npx frontend-agency install
```

The installer detects your environment, asks whether to install globally (`~/.claude/`) or project-locally (`.claude/`), then copies `CLAUDE.md` and all 12 slash commands. No manual steps.

```bash
# Skip the prompt — install flags
npx frontend-agency install --global    # available in all your projects
npx frontend-agency install --project   # this project only, commit to Git
```

### Claude Code — Manual

```bash
# Project-local (commit to Git — your team gets it automatically)
cp CLAUDE.md /path/to/your-project/
cp -r .claude/ /path/to/your-project/

# Global (your machine, all projects)
cp CLAUDE.md ~/.claude/
cp -r .claude/skills/* ~/.claude/skills/
```

### Cursor / Windsurf

```bash
npm run compile:adapters
cp dist/adapters/.cursorrules /path/to/your-project/.cursorrules
```

### GitHub Copilot

```bash
npm run compile:adapters
cp dist/adapters/copilot-instructions.md /path/to/your-project/.github/copilot-instructions.md
```

### Gemini CLI

```bash
npm run compile:adapters
mkdir -p ~/.gemini/skills/frontend-agency
cp -r dist/gemini/* ~/.gemini/skills/frontend-agency/
```

### OpenAI Assistants API / LangChain

```bash
npm run compile:adapters
# Load dist/adapters/openai-tools.json as your tool declarations
# Return dist/adapters/skills/<skill-name>.md when a skill tool is invoked
```

See [docs/agent-compatibility.md](docs/agent-compatibility.md) for the complete Node.js integration blueprint.

---

## Skills

Eleven modular skills covering the complete frontend lifecycle, each with a defined trigger context, structured workflow, and named output deliverables.

### Discovery & Strategy

| Skill | Slash Command | Trigger Context |
|-------|:-------------|----------------|
| **Brand Discovery** | `/brand-discovery` | Before any frontend work when the brief is broad, greenfield, or missing audience and positioning context |
| **Landing Page Strategy** | `/landing-page-strategy` | Planning any marketing page — converts business goals into narrative structure, section hierarchy, and conversion strategy |

### Design & Visual Systems

| Skill | Slash Command | Trigger Context |
|-------|:-------------|----------------|
| **Creative Direction** | `/creative-direction` | Before visual or design work — translates brand context into visual personality, references, and anti-references |
| **Visual Language** | `/visual-language` | Building or auditing the visual system — colors, type scale, spacing, iconography, and visual hierarchy |
| **Design System** | `/design-system` | Architecting or auditing a component library — token architecture, component APIs, variant strategy, documentation |
| **Motion Design** | `/motion-design` | Adding or auditing animation and transitions — motion vocabulary, easing, choreography, accessibility |

### Architecture & Implementation

| Skill | Slash Command | Trigger Context |
|-------|:-------------|----------------|
| **Frontend Architecture** | `/frontend-architecture` | Defining rendering strategy, state management, data flow, performance budget, and build configuration |

### Review & Quality Gates

| Skill | Slash Command | Trigger Context |
|-------|:-------------|----------------|
| **Accessibility Review** | `/accessibility-review` | Before shipping — WCAG 2.1 AA audit: semantics, keyboard, contrast, ARIA, forms, motion |
| **Performance & SEO Review** | `/performance-seo-review` | Before shipping — Core Web Vitals, asset optimization, SEO structure, crawlability |
| **Visual QA** | `/visual-qa` | After implementation — verify the build matches design intent, design system, and brand standards |
| **Design Review** | `/design-review` | Final gate before shipping — full pass across visual, accessibility, performance, and production readiness |

### Orchestration

| Skill | Slash Command | What It Does |
|-------|:-------------|--------------|
| **Full Build** | `/full-build` | Orchestrates all skills in sequence for a complete greenfield build, from discovery through final review |

---

## Workflow

### Greenfield Build

Chain skills in this sequence for a complete agency-grade frontend build:

```
1. /brand-discovery          → establish brief, audience, positioning
2. /creative-direction       → define visual personality and strategy
3. /visual-language          → build color, type, spacing, iconography system
4. /design-system            → architect token and component library
5. /landing-page-strategy    → plan narrative, conversion, content (marketing)
   /frontend-architecture    → plan rendering, state, data (application)
6. [implement]
7. /motion-design            → add purposeful motion
8. /accessibility-review     → verify WCAG compliance
9. /performance-seo-review   → optimize delivery
10. /visual-qa               → verify implementation quality
11. /design-review           → final gate before shipping
```

Or run `/full-build` to get Claude to orchestrate this entire sequence automatically.

### Review-Only

For an existing codebase, start at the review phase:

```
/accessibility-review → /performance-seo-review → /visual-qa → /design-review
```

Or run `/design-review` directly for a complete quality gate in one pass.

---

## Quality Standards

All work produced with Frontend Agency must meet these non-negotiable baselines:

| Dimension | Standard |
|-----------|---------|
| **Accessibility** | WCAG 2.1 AA minimum — WCAG 2.2 AA preferred |
| **LCP** | < 2.5 seconds |
| **CLS** | < 0.1 |
| **INP** | < 200ms |
| **Design system alignment** | Every visual decision traced to a named token |
| **Production readiness** | No placeholder content, no hardcoded values, no unhandled UI states |

---

## Repository Structure

```
frontend-agency/
│
├── CLAUDE.md                            # Claude Code persistent instructions (auto-read every session)
├── INSTALL.md                           # Full installation guide for all agents
├── CONTRIBUTING.md                      # Skill authoring standards and PR process
├── LICENSE                              # MIT
│
├── .claude/
│   └── skills/                          # Claude Code Agent Skills (12 folders)
│       ├── brand-discovery/
│       │   └── SKILL.md                 → /brand-discovery or auto-invocation
│       ├── creative-direction/
│       │   └── SKILL.md                 → /creative-direction
│       ├── visual-language/
│       │   └── SKILL.md                 → /visual-language
│       ├── design-system/
│       │   └── SKILL.md                 → /design-system
│       ├── landing-page-strategy/
│       │   └── SKILL.md                 → /landing-page-strategy
│       ├── frontend-architecture/
│       │   └── SKILL.md                 → /frontend-architecture
│       ├── motion-design/
│       │   └── SKILL.md                 → /motion-design
│       ├── accessibility-review/
│       │   └── SKILL.md                 → /accessibility-review
│       ├── performance-seo-review/
│       │   └── SKILL.md                 → /performance-seo-review
│       ├── visual-qa/
│       │   └── SKILL.md                 → /visual-qa
│       ├── design-review/
│       │   └── SKILL.md                 → /design-review
│       └── full-build/
│           └── SKILL.md                 → /full-build or orchestration prompt
│
├── bin/
│   └── install.mjs                      # CLI installer (npx frontend-agency install)
│
├── plugins/
│   └── frontend-agency-core/            # Claude Code marketplace plugin
│       ├── .codex-plugin/
│       │   └── plugin.json              # Plugin manifest
│       ├── skills/                      # 11 Agent Skill directories
│       │   ├── brand-discovery/
│       │   ├── creative-direction/
│       │   ├── visual-language/
│       │   ├── design-system/
│       │   ├── landing-page-strategy/
│       │   ├── frontend-architecture/
│       │   ├── motion-design/
│       │   ├── accessibility-review/
│       │   ├── performance-seo-review/
│       │   ├── visual-qa/
│       │   └── design-review/
│       └── references/                  # 13 shared standards and playbooks
│
├── .agents/
│   └── plugins/
│       └── marketplace.json             # Repo-local Claude Code plugin marketplace
│
├── evals/
│   └── skills/                          # Eval fixtures (one JSON per skill)
│
├── packages/
│   └── schemas/                         # JSON Schema definitions for validation
│
├── scripts/
│   ├── compile-adapters.mjs             # Builds Cursor, Copilot, Gemini, OpenAI outputs
│   ├── validate-repo.mjs                # Full repository validation gate
│   ├── run-skill-evals.mjs              # Skill quality eval suite
│   ├── package-plugin.mjs               # Plugin packager with SHA-256 manifest
│   └── release-check.mjs                # Pre-release gate (runs all checks)
│
├── dist/adapters/                        # Compiled adapter assets (git-ignored, build locally)
│   ├── .cursorrules                      # Cursor / Windsurf workspace rules
│   ├── cursorrules.json                  # Structured Cursor rules
│   ├── copilot-instructions.md           # GitHub Copilot instructions
│   ├── openai-tools.json                 # OpenAI Assistants API tool schema
│   └── skills/                           # Standalone compiled skills (references inlined)
│
├── dist/gemini/                           # Gemini CLI skill directories (git-ignored)
│   └── <skill-name>/SKILL.md
│
└── docs/
    ├── agent-compatibility.md             # Compatibility guide + programmatic integration blueprint
    ├── distribution.md                    # Distribution model documentation
    ├── governance.md                      # Governance and change control standards
    ├── release-checklist.md               # Pre-release checklist
    ├── roadmap.md                         # Development roadmap
    └── skill-authoring.md                 # Internal skill authoring reference
```

---

## Scripts

```bash
# Build compiled adapter outputs for all non-Claude platforms
npm run compile:adapters

# Run the full repository validation suite
npm run validate

# Run skill eval quality gates
npm run eval:skills

# Package the Claude Code plugin with SHA-256 integrity manifest
npm run package:plugin

# Run the full pre-release gate (validate + eval + package + checks)
npm run release:check

# Preview a release without pushing anything
npm run release:dry-run

# Tag and push a release (triggers GitHub Actions to create the GitHub Release)
npm run release

# Verify npm tarball contents before publishing
npm run pack
```

---

## Publishing a Release

The release process is fully scripted. No manual GitHub Release creation needed.

### Steps

1. **Bump the version** in `package.json` (follow semver: patch/minor/major)
2. **Add a CHANGELOG entry** under `## <version>` — the release body is extracted from here automatically
3. **Commit and push** to `main`
4. **Dry-run first** to validate everything:
   ```bash
   npm run release:dry-run
   ```
5. **Release** — tags, pushes, and triggers GitHub Actions:
   ```bash
   npm run release
   ```
6. GitHub Actions runs the full validation suite, packages the plugin, and publishes the **GitHub Release** with the plugin ZIP attached
7. **Publish to npm** once the GitHub Release is live:
   ```bash
   npm publish
   ```

### What Gets Published

| Artifact | Where |
|----------|-------|
| **GitHub Release** | `github.com/dev-AshishRanjan/Frontend-Agency/releases` — plugin ZIP with SHA-256 manifest |
| **npm package** | `npmjs.com/package/frontend-agency` — `bin/install.mjs`, `CLAUDE.md`, `.claude/`, `plugins/` |

---

## Agent Compatibility

| Agent | Integration Method | Status |
|-------|-------------------|--------|
| **Claude Code** | `CLAUDE.md` + `.claude/skills/` Agent Skills | ✅ First-class |
| **Cursor** | `.cursorrules` workspace rules | ✅ Supported |
| **Windsurf** | `.cursorrules` workspace rules | ✅ Supported |
| **GitHub Copilot** | `.github/copilot-instructions.md` | ✅ Supported |
| **Gemini CLI** | `~/.gemini/skills/` skill directories | ✅ Supported |
| **OpenAI Assistants API** | `openai-tools.json` function declarations | ✅ Supported |
| **Claude Projects** | Standalone compiled skill markdown upload | ✅ Supported |
| **ChatGPT Custom GPTs** | Standalone compiled skill markdown upload | ✅ Supported |
| **LangChain / Custom** | `AgentSkillAdapter` programmatic integration | ✅ Supported |
| **Antigravity** | Skill directory format | ✅ Supported |
| **Codex CLI** | Marketplace plugin | ✅ Supported |

See [docs/agent-compatibility.md](docs/agent-compatibility.md) for full integration details, including a production-grade Node.js `AgentSkillAdapter` class and MCP server guidance.

---

## Architecture Decisions

### Skill Format: Vendor-Neutral

Skills are authored in standard Agent Skills format (`SKILL.md` + YAML frontmatter + references). This format is not tied to any single agent. Claude Code, Gemini CLI, and Antigravity all read it natively. For agents that don't read the format, the adapter compiler resolves references and produces flat, inlined outputs.

### Claude-First, Not Claude-Only

Claude Code is the primary distribution target because it offers the richest integration surface: persistent `CLAUDE.md`, slash commands, and a plugin marketplace. But the skill content itself contains zero Claude-specific syntax. Every skill works in any agent that can read markdown.

### References Over Inlining

Skill entrypoints (`SKILL.md`) are intentionally concise — under 60 lines. Deeper domain standards live in shared reference files. Skills reference them conditionally (`read X when condition Y applies`). This keeps skill prompts tight for agents while preserving deep guidance for when it's needed.

### Adapters Are Build Artifacts

Compiled adapters (`dist/`) are git-ignored. Users build them locally with `npm run compile:adapters`. This keeps the repository canonical and prevents stale compiled outputs from accumulating. The Claude integration files (`.claude/skills/`, `CLAUDE.md`) are an exception — they are committed because they must be version-controlled and shipped in the npm package.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full authoring guide. In brief:

1. Every new skill requires: `SKILL.md`, eval fixture, slash command file
2. All five pipeline scripts must pass before a PR is merged
3. Skills must remain vendor-neutral — no agent-specific syntax
4. One skill per PR — no bundling of unrelated changes

```bash
# Full pre-PR validation
npm run compile:adapters
npm run validate
npm run eval:skills
npm run package:plugin
npm run release:check
```

---

## License

[MIT](LICENSE) — Copyright © 2026 Frontend Agency
