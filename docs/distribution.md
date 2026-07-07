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

Claude-specific marketplace metadata must stay outside individual skill instructions so the skills remain portable.

## Versioning

Use semantic versions in plugin manifests:

- Patch: wording, examples, metadata, non-breaking eval improvements
- Minor: new skills, new references, new validation gates
- Major: renamed skills, removed skills, changed output contracts
