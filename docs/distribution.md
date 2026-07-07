# Distribution

## Claude Code

Frontend Agency ships a repo-local marketplace:

```text
.agents/plugins/marketplace.json
```

The marketplace exposes:

```text
plugins/frontend-agency-core
```

The plugin manifest is:

```text
plugins/frontend-agency-core/.codex-plugin/plugin.json
```

The core plugin exposes Agent Skills from:

```text
plugins/frontend-agency-core/skills
```

## Marketplace Policy

The core plugin is available for installation and authenticates on install:

```json
{
  "installation": "AVAILABLE",
  "authentication": "ON_INSTALL"
}
```

Use this policy until a team decides to install the plugin by default.

## Other Compatible Agents

The canonical skill source is the skill directory itself. Agents that support the Agent Skills structure can consume each folder under `plugins/frontend-agency-core/skills`.

To support environments that do not dynamically load files or resolve relative links (e.g. Cursor, GitHub Copilot, custom LLM APIs), compile the standalone adapter assets:

```bash
npm run compile:adapters
```

The compiled assets are generated under `dist/adapters/`. Claude-specific marketplace metadata must stay outside individual skill instructions so the skills remain portable.

## Versioning

Use semantic versions in plugin manifests:

- Patch: wording, examples, metadata, non-breaking eval improvements
- Minor: new skills, new references, new validation gates
- Major: renamed skills, removed skills, changed output contracts

## Packaging

Create a distributable package:

```bash
npm run package:plugin
```

The package is written to:

```text
dist/frontend-agency-core-<version>
```

The package contains:

- `.agents/plugins/marketplace.json`
- `plugins/frontend-agency-core`
- `package-manifest.json` with SHA-256 hashes for packaged files

Run this before publishing:

```bash
npm run release:check
```
