# Installing Frontend Agency

Frontend Agency ships agency-grade frontend skills for AI agents. Choose the installation method that matches your agent.

---

## Option 1: Claude Code (Recommended)

Claude Code is the primary target. Two sub-options:

### 1a. Automatic Install (CLI)

From your project root:

```bash
npx frontend-agency install
```

The installer will:
- Detect whether to install to the current project (`.claude/`) or globally (`~/.claude/`)
- Write `CLAUDE.md` with full skill documentation
- Write all skill slash commands to `.claude/commands/`
- Confirm what was installed and where

For global install (available in all your projects):

```bash
npx frontend-agency install --global
```

For project-only install:

```bash
npx frontend-agency install --project
```

### 1b. Manual Install

**Project-local (team shared via Git):**

1. Copy `CLAUDE.md` to your project root.
2. Copy the `.claude/` directory to your project root.
3. Commit both to your repository. Every teammate gets the skills automatically.

```bash
cp CLAUDE.md /path/to/your-project/
cp -r .claude/ /path/to/your-project/
```

**Global (your machine only):**

```bash
cp CLAUDE.md ~/.claude/
mkdir -p ~/.claude/commands
cp .claude/commands/* ~/.claude/commands/
```

---

## Option 2: Cursor / Windsurf

1. Build the adapter assets:

```bash
npm run compile:adapters
```

2. Copy the compiled rules file to your project root:

```bash
cp dist/adapters/.cursorrules /path/to/your-project/.cursorrules
```

For Windsurf, use the same file (`.cursorrules` is also read by Windsurf).

Cursor and Windsurf will automatically load these workspace rules and apply the Frontend Agency workflow standards.

---

## Option 3: GitHub Copilot

1. Build the adapter assets:

```bash
npm run compile:adapters
```

2. Copy the compiled instructions to your project:

```bash
mkdir -p /path/to/your-project/.github
cp dist/adapters/copilot-instructions.md /path/to/your-project/.github/copilot-instructions.md
```

GitHub Copilot reads `.github/copilot-instructions.md` automatically in chat and inline suggestions.

---

## Option 4: Gemini CLI

Gemini CLI reads skills from `~/.gemini/skills/` (global) or `.gemini/skills/` (project-local).

1. Build the Gemini adapter:

```bash
npm run compile:adapters
```

2. Install globally:

```bash
mkdir -p ~/.gemini/skills/frontend-agency
cp -r dist/gemini/* ~/.gemini/skills/frontend-agency/
```

Or project-local:

```bash
mkdir -p .gemini/skills/frontend-agency
cp -r dist/gemini/* .gemini/skills/frontend-agency/
```

---

## Option 5: OpenAI Assistants API / LangChain

Use the programmatic adapter:

1. Build the adapter assets:

```bash
npm run compile:adapters
```

2. Load `dist/adapters/openai-tools.json` as your tool declarations.

3. When the assistant calls a skill tool, return the matching compiled skill from `dist/adapters/skills/<skill-name>.md`.

See `docs/agent-compatibility.md` for a complete Node.js integration blueprint.

---

## Option 6: Any Agent with File Access

For any agent that can read markdown files (Claude Projects, ChatGPT Custom GPTs, custom system prompts):

1. Build standalone inlined skill files:

```bash
npm run compile:adapters
```

2. Upload individual skill files from `dist/adapters/skills/` as knowledge or system prompt files.

Each compiled skill file is self-contained with all references inlined.

---

## Updating

To update to a new version, pull the latest changes and re-run the install:

```bash
git pull
npx frontend-agency install
```

Or for manual installs, repeat the copy commands above.

---

## Verifying Installation

In Claude Code, type `/` and check that the following commands appear:

- `/brand-discovery`
- `/creative-direction`
- `/visual-language`
- `/design-system`
- `/landing-page-strategy`
- `/frontend-architecture`
- `/motion-design`
- `/accessibility-review`
- `/performance-seo-review`
- `/visual-qa`
- `/design-review`
- `/full-build`

If using `CLAUDE.md` only (without slash commands), ask Claude: *"What Frontend Agency skills are available?"* — Claude will list them from the instructions.
