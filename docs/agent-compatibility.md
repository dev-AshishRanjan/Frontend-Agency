# Agent Compatibility

Frontend Agency skills are designed to be vendor-neutral. While Claude Code is the primary runtime for first-class local integration, the core skill instructions and playbooks are portable and can be consumed by other AI agent tools and IDE platforms.

---

## Pre-Built Adapter Assets

To bridge the gap between modular skill folders and monolithic agent configurations, Frontend Agency includes an automated adapter compiler. Running the following command builds consolidated adapter assets:

```bash
npm run compile:adapters
```

This generates distribution-ready files under `dist/adapters/`:

1. **Standalone Inlined Skills (`dist/adapters/skills/*.md`)**: Individual skill files with all relative playbook references resolved and appended directly to the end. Excellent for uploading to Claude Projects, ChatGPT Custom GPTs, or custom system prompt files.
2. **Cursor & Windsurf Rules (`dist/adapters/.cursorrules` & `dist/adapters/cursorrules.json`)**: Pre-packaged workspace rules. Placing these in your repository root configures Cursor or Windsurf to automatically adhere to agency workflows.
3. **OpenAI Tool Schema (`dist/adapters/openai-tools.json`)**: JSON tool declarations matching the OpenAI Assistants API and Chat Completions API format. Each skill is mapped to a function declaration.
4. **GitHub Copilot Instructions (`dist/adapters/copilot-instructions.md`)**: Consolidated instructions format, ready to be added to `.github/copilot-instructions.md` in any target repository.

---

## IDE Integration Guidelines

### Cursor & Windsurf
Place the compiled `dist/adapters/.cursorrules` file at the root of your project workspace. This provides global instructions for Chat and Composer, ensuring the agent:
- Inspects brand identity and sets visual languages before generating layout code.
- Builds design tokens before component implementation.
- Employs accessibility and performance checklists.
- Performs design review steps before declaring a task complete.

### GitHub Copilot
Copy the contents of `dist/adapters/copilot-instructions.md` into your project's `.github/copilot-instructions.md` file. GitHub Copilot will read this file during chat and inline suggestions to enforce Frontend Agency quality standards.

---

## Programmatic Adapter Pattern (Node.js Blueprint)

If you are building a custom developer agent runtime (e.g., using Node.js, LangChain, or custom LLM clients), you can load and resolve Frontend Agency skills dynamically. The following production-grade, ESM-compliant class implements the **Adapter Pattern** to parse and compile modular skills at runtime:

```javascript
import fs from "node:fs";
import path from "node:path";

export class AgentSkillAdapter {
  #skillsPath;
  #cache;

  /**
   * Initialize the adapter.
   * @param {string} skillsDirectoryPath - Path to the skills folder in frontend-agency-core.
   */
  constructor(skillsDirectoryPath) {
    this.#skillsPath = path.resolve(skillsDirectoryPath);
    this.#cache = new Map();
  }

  /**
   * Load and compile a skill, resolving all relative playbook references.
   * @param {string} skillName - Name of the skill directory.
   * @returns {Promise<{name: string, description: string, prompt: string}>}
   */
  async loadSkill(skillName) {
    if (this.#cache.has(skillName)) {
      return this.#cache.get(skillName);
    }

    const skillDir = path.join(this.#skillsPath, skillName);
    const skillMarkdownPath = path.join(skillDir, "SKILL.md");

    if (!fs.existsSync(skillMarkdownPath)) {
      throw new Error(`Skill "${skillName}" not found at ${skillMarkdownPath}`);
    }

    const rawContent = await fs.promises.readFile(skillMarkdownPath, "utf8");
    const { metadata, body } = this.#parseFrontmatter(rawContent);

    // Resolve relative playbooks referenced in the markdown body
    const referenceMatches = [...body.matchAll(/`(\.\.\/\.\.\/references\/[^`]+)`/g)];
    let resolvedBody = body;
    const resolvedPlaybooks = [];

    for (const match of referenceMatches) {
      const relativeRefPath = match[1];
      const absoluteRefPath = path.normalize(path.join(skillDir, relativeRefPath));
      const refFilename = path.basename(relativeRefPath);

      if (fs.existsSync(absoluteRefPath)) {
        const playbookContent = await fs.promises.readFile(absoluteRefPath, "utf8");
        resolvedPlaybooks.push({ filename: refFilename, content: playbookContent });
        
        // Inline-replace reference link to match compiled format
        resolvedBody = resolvedBody.replaceAll(
          `\`${relativeRefPath}\``,
          `Reference: **${refFilename}** (inlined at the bottom of this prompt)`
        );
      }
    }

    // Compose consolidated prompt
    let finalPrompt = `# Skill: ${metadata.name || skillName}\n\n`;
    finalPrompt += `> ${metadata.description || ""}\n\n`;
    finalPrompt += resolvedBody.trim() + "\n\n";

    if (resolvedPlaybooks.length > 0) {
      finalPrompt += `## Shared Reference Standards (Inlined)\n\n`;
      for (const playbook of resolvedPlaybooks) {
        finalPrompt += `### ${playbook.filename}\n\n`;
        finalPrompt += playbook.content.trim() + "\n\n";
      }
    }

    const skillResult = {
      name: metadata.name || skillName,
      description: metadata.description || "",
      prompt: finalPrompt
    };

    this.#cache.set(skillName, skillResult);
    return skillResult;
  }

  /**
   * Helper to parse YAML frontmatter from Markdown.
   */
  #parseFrontmatter(content) {
    if (!content.startsWith("---\n")) {
      return { metadata: {}, body: content };
    }
    const endIdx = content.indexOf("\n---\n", 4);
    if (endIdx === -1) {
      return { metadata: {}, body: content };
    }

    const yamlSection = content.slice(4, endIdx);
    const body = content.slice(endIdx + 5);
    const metadata = {};

    for (const line of yamlSection.split("\n")) {
      const colonIdx = line.indexOf(":");
      if (colonIdx !== -1) {
        const key = line.slice(0, colonIdx).trim();
        let val = line.slice(colonIdx + 1).trim();
        if (val.startsWith('"') && val.endsWith('"')) {
          val = val.slice(1, -1);
        }
        metadata[key] = val;
      }
    }
    return { metadata, body };
  }
}
```

---

## Advanced API Integrations

### Model Context Protocol (MCP)
For clients supporting MCP (e.g. Claude Desktop, Cursor), you can expose Frontend Agency skills by building a lightweight MCP server. 
- **Tools**: Declare each skill as a tool, using the name and description from the skill's frontmatter. When the client calls a skill tool, read and return the compiled standalone skill markdown as the tool's textual result.
- **Prompts**: Declare skills as system prompts that users can load at the start of a conversation.

### OpenAI Assistants API
To register these skills as tools for the OpenAI Assistants API:
1. Load `dist/adapters/openai-tools.json`.
2. Attach the generated tool schemas to your Assistant object during creation:
   ```javascript
   const assistant = await openai.beta.assistants.create({
     name: "Frontend Agency Orchestrator",
     instructions: "You are a professional frontend engineer. Invoke appropriate frontend agency tools when asked to strategize, design, implement, or review web assets.",
     model: "gpt-4o",
     tools: openaiTools // Array from openai-tools.json
   });
   ```
3. When the assistant requests a tool execution (e.g., `frontend_agency_design_system`), return the matching resolved skill content from `dist/adapters/skills/design-system.md` to feed the runtime instructions back into the thread context.
