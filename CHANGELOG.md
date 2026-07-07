# Changelog

## 1.0.0 - 2026-07-07

### Added

- `CLAUDE.md` — Claude Code persistent instructions with full skill documentation and orchestration workflow.
- `.claude/commands/` — 12 slash command files for all skills plus `/full-build` orchestration command.
- `INSTALL.md` — user-facing installation guide for Claude Code, Cursor/Windsurf, GitHub Copilot, Gemini CLI, OpenAI Assistants API, and any agent with file access.
- `CONTRIBUTING.md` — public-facing skill authoring guide with format standards, quality bar, eval fixture spec, validation pipeline, and PR standards.
- `LICENSE` — MIT License.
- `bin/install.mjs` — CLI installer for `npx frontend-agency install`, supporting `--global` and `--project` flags with interactive scope selection.
- Gemini CLI adapter target in `compile-adapters.mjs` — generates `dist/gemini/<skill>/SKILL.md` for each skill.
- Node version matrix in CI (Node 20 + 22).
- `release-gate` CI job on `main` push — packages plugin and runs release check.
- `compile:adapters` as first step in CI to catch adapter generation failures early.
- npm caching in CI.
- `npm pack --dry-run` script (`npm run pack`) for pre-publish verification.

### Changed

- `package.json` — removed `"private": true`, added `bin`, `files`, `repository`, `homepage`, `bugs`, `engines`, `author`. Updated license to MIT. Version bumped to 1.0.0.
- `README.md` — full rewrite as user-facing documentation with quickstart, skill table, installation paths, and contributing links.
- `.gitignore` — clarified sections; `.claude/` explicitly excluded from ignore so slash commands are committed.
- `.github/workflows/validate.yml` — expanded with Node matrix, caching, adapter compile step, and release gate.

## 0.1.0 - 2026-07-07

### Added

- Repository foundation for Frontend Agency.
- Repo-local Claude Code marketplace.
- `frontend-agency-core` plugin.
- Eleven core Agent Skills.
- Shared agency, frontend, workflow, review, and quality rubric references.
- Repository validation.
- Skill eval quality gates.
- Distribution, release, and skill-authoring documentation.
- Skill playbook references.
- Plugin packaging workflow with integrity manifest.
- Standalone multi-platform adapter assets for Cursor (.cursorrules), GitHub Copilot, and OpenAI Assistants API.
- Automated adapter compiler script (`scripts/compile-adapters.mjs`).
- Comprehensive compatibility guide and programmatic integration runtime blueprint.
- Integrated adapter build safety checks into repository validation and pre-release pipelines.
