import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const skillsDir = path.join(root, "plugins", "frontend-agency-core", "skills");
const distDir = path.join(root, "dist", "adapters");
const distSkillsDir = path.join(distDir, "skills");

// Ensure directories exist
fs.mkdirSync(distSkillsDir, { recursive: true });

function parseFrontmatter(content) {
  if (!content.startsWith("---\n")) {
    return { metadata: {}, body: content };
  }
  const endOfFrontmatter = content.indexOf("\n---\n", 4);
  if (endOfFrontmatter === -1) {
    return { metadata: {}, body: content };
  }
  const yamlSection = content.slice(4, endOfFrontmatter);
  const body = content.slice(endOfFrontmatter + 5);
  
  const metadata = {};
  const lines = yamlSection.split("\n");
  for (const line of lines) {
    const colonIndex = line.indexOf(":");
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      metadata[key] = value;
    }
  }
  return { metadata, body };
}

// 1. Gather all skills
const skillDirs = fs.readdirSync(skillsDir).filter((name) => {
  return fs.statSync(path.join(skillsDir, name)).isDirectory();
}).sort();

const skillsData = [];

for (const skillName of skillDirs) {
  const skillPath = path.join(skillsDir, skillName, "SKILL.md");
  if (!fs.existsSync(skillPath)) continue;

  const content = fs.readFileSync(skillPath, "utf8");
  const { metadata, body } = parseFrontmatter(content);
  
  // Find referenced files
  const references = [];
  const referenceMatches = [...body.matchAll(/`(\.\.\/\.\.\/references\/[^`]+)`/g)];
  
  let resolvedBody = body;
  const processedRefs = new Set();
  
  for (const match of referenceMatches) {
    const relativeRef = match[1];
    if (processedRefs.has(relativeRef)) continue;
    processedRefs.add(relativeRef);

    const absoluteRef = path.normalize(path.join(skillsDir, skillName, relativeRef));
    const refFilename = path.basename(relativeRef);
    
    if (fs.existsSync(absoluteRef)) {
      const refContent = fs.readFileSync(absoluteRef, "utf8");
      references.push({ filename: refFilename, content: refContent });
      
      // Replace the inline relative path reference with a label pointing to the bottom inlined content
      const cleanRefLabel = `Reference: **${refFilename}** (inlined at the bottom of this document)`;
      resolvedBody = resolvedBody.replaceAll(`\`${relativeRef}\``, cleanRefLabel);
    }
  }

  // Build the compiled skill content
  let compiledContent = `# Skill: ${metadata.name || skillName}\n\n`;
  compiledContent += `> ${metadata.description || ""}\n\n`;
  compiledContent += resolvedBody.trim() + "\n\n";
  
  if (references.length > 0) {
    compiledContent += `## Shared Reference Standards (Inlined)\n\n`;
    for (const ref of references) {
      compiledContent += `### ${ref.filename}\n\n`;
      compiledContent += ref.content.trim() + "\n\n";
    }
  }

  // Write standalone compiled skill
  const outputSkillPath = path.join(distSkillsDir, `${skillName}.md`);
  fs.writeFileSync(outputSkillPath, compiledContent, "utf8");

  skillsData.push({
    name: skillName,
    displayName: metadata.name || skillName,
    description: metadata.description || "",
    rawContent: content,
    compiledContent: compiledContent,
    references: references
  });
}

// 2. Generate cursorrules.json
const cursorRulesData = {
  name: "Frontend Agency",
  version: "0.1.0",
  description: "Durable workflow guidelines and standards for premium frontend engineering.",
  instructions: "You are a professional frontend engineering agent working in a disciplined frontend agency. You prioritize strategy before implementation, establish structured design languages before coding, verify accessibility and performance standards, and apply strict review gates.",
  skills: skillsData.map((s) => ({
    name: s.name,
    description: s.description,
    workflow: s.compiledContent
  }))
};
fs.writeFileSync(path.join(distDir, "cursorrules.json"), JSON.stringify(cursorRulesData, null, 2) + "\n", "utf8");

// 3. Generate a unified `.cursorrules` file (Markdown format)
let unifiedRules = `# Frontend Agency - Workspace Rules\n\n`;
unifiedRules += `You are a professional frontend engineering agent working in a disciplined frontend agency.\n`;
unifiedRules += `Follow these modular skills to structure your reasoning, architecture, and review processes.\n\n`;
for (const s of skillsData) {
  unifiedRules += `## Skill: ${s.displayName}\n\n`;
  unifiedRules += `### Trigger Context:\n${s.description}\n\n`;
  unifiedRules += `### Detailed Workflow & Standards:\n\n${s.compiledContent.trim()}\n\n---\n\n`;
}
fs.writeFileSync(path.join(distDir, ".cursorrules"), unifiedRules, "utf8");

// 4. Generate OpenAI Tools schema (openai-tools.json)
const openaiTools = skillsData.map((s) => {
  // Derive safe function name (lowercase, alphanumeric, underscores)
  const functionName = s.name.replace(/[^a-z0-9]/ig, "_").toLowerCase();
  return {
    type: "function",
    function: {
      name: `frontend_agency_${functionName}`,
      description: s.description,
      parameters: {
        type: "object",
        properties: {
          project_context: {
            type: "string",
            description: "Detailed description of the user request, design constraints, and codebase context to process."
          }
        },
        required: ["project_context"]
      }
    }
  };
});
fs.writeFileSync(path.join(distDir, "openai-tools.json"), JSON.stringify(openaiTools, null, 2) + "\n", "utf8");

// 5. Generate copilot-instructions.md
let copilotInstructions = `# GitHub Copilot Workspace Instructions - Frontend Agency\n\n`;
copilotInstructions += `Configure these instructions to govern Copilot's code generation for this repository. Always follow the agency workflow: strategy -> design tokens -> component structures -> testing & visual QA -> design review.\n\n`;
for (const s of skillsData) {
  copilotInstructions += `## ${s.displayName}\n`;
  copilotInstructions += `**Context:** ${s.description}\n\n`;
  // Extract workflow & output sections from compiledContent
  const lines = s.compiledContent.split("\n");
  let relevantSection = false;
  for (const line of lines) {
    if (line.startsWith("## Workflow") || line.startsWith("## Output") || line.startsWith("## References") || line.startsWith("## Shared Reference Standards")) {
      relevantSection = true;
    }
    if (relevantSection) {
      copilotInstructions += line + "\n";
    }
  }
  copilotInstructions += "\n---\n\n";
}
fs.writeFileSync(path.join(distDir, "copilot-instructions.md"), copilotInstructions, "utf8");

console.log(`Compilation complete. Generated ${skillsData.length} standalone skills and unified adapter assets.`);
