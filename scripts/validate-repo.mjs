import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredSkills = [
  "brand-discovery",
  "creative-direction",
  "visual-language",
  "design-system",
  "landing-page-strategy",
  "frontend-architecture",
  "motion-design",
  "accessibility-review",
  "performance-seo-review",
  "visual-qa",
  "design-review"
];
const requiredDocs = [
  "CHANGELOG.md",
  "docs/distribution.md",
  "docs/agent-compatibility.md",
  "docs/release-checklist.md",
  "docs/skill-authoring.md"
];
const requiredSchemas = [
  "packages/schemas/skill-eval.schema.json",
  "packages/schemas/marketplace.schema.json",
  "packages/schemas/plugin-manifest.schema.json",
  "packages/schemas/package-manifest.schema.json"
];

const failures = [];
const unresolvedMarker = "[" + "TODO:";
const bannedAcronymPattern = new RegExp("\\b" + "O" + "S" + "\\b");

function readJson(relativePath) {
  const filePath = path.join(root, relativePath);
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    failures.push(`${relativePath}: ${error.message}`);
    return null;
  }
}

function assert(condition, message) {
  if (!condition) failures.push(message);
}

function readText(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function walkFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return walkFiles(fullPath);
    return fullPath;
  });
}

const plugin = readJson("plugins/frontend-agency-core/.codex-plugin/plugin.json");
if (plugin) {
  assert(plugin.name === "frontend-agency-core", "plugin.json name must be frontend-agency-core");
  assert(/^\d+\.\d+\.\d+$/.test(plugin.version), "plugin.json version must be strict semver");
  assert(plugin.skills === "./skills/", "plugin.json must expose ./skills/");
  assert(plugin.interface?.displayName === "Frontend Agency Core", "plugin displayName mismatch");
  assert(Array.isArray(plugin.interface?.defaultPrompt), "plugin interface.defaultPrompt must be an array");
  assert(!("hooks" in plugin), "plugin.json must not contain unsupported hooks field");
}

const marketplace = readJson(".agents/plugins/marketplace.json");
if (marketplace) {
  assert(marketplace.name === "frontend-agency", "marketplace name must be frontend-agency");
  const entry = marketplace.plugins?.find((item) => item.name === "frontend-agency-core");
  assert(Boolean(entry), "marketplace must include frontend-agency-core");
  assert(entry?.source?.path === "./plugins/frontend-agency-core", "marketplace plugin path mismatch");
  assert(entry?.policy?.installation === "AVAILABLE", "marketplace installation policy mismatch");
  assert(entry?.policy?.authentication === "ON_INSTALL", "marketplace authentication policy mismatch");
}

for (const docPath of requiredDocs) {
  assert(fs.existsSync(path.join(root, docPath)), `${docPath} is missing`);
}

for (const schemaPath of requiredSchemas) {
  const schema = readJson(schemaPath);
  assert(schema?.$schema === "https://json-schema.org/draft/2020-12/schema", `${schemaPath}: missing JSON Schema draft declaration`);
  assert(typeof schema?.title === "string" && schema.title.length > 0, `${schemaPath}: missing schema title`);
}

for (const skill of requiredSkills) {
  const skillPath = `plugins/frontend-agency-core/skills/${skill}/SKILL.md`;
  const evalPath = `evals/skills/${skill}.json`;
  assert(fs.existsSync(path.join(root, skillPath)), `${skillPath} is missing`);
  assert(fs.existsSync(path.join(root, evalPath)), `${evalPath} is missing`);
  if (!fs.existsSync(path.join(root, skillPath))) continue;

  const content = readText(skillPath);
  assert(content.startsWith("---\n"), `${skill}: SKILL.md must start with YAML frontmatter`);
  assert(new RegExp(`name:\\s*${skill}`).test(content), `${skill}: frontmatter name mismatch`);
  assert(/description:\s*".{80,}"/.test(content), `${skill}: description must be quoted and specific`);
  assert(!content.includes(unresolvedMarker), `${skill}: unresolved placeholder marker`);
  assert(content.includes("## Workflow"), `${skill}: missing Workflow section`);
  assert(content.includes("## Output"), `${skill}: missing Output section`);
  assert(content.includes("## References"), `${skill}: missing References section`);
}

const textFiles = walkFiles(root).filter((filePath) =>
  [".md", ".json", ".yaml", ".yml", ".mjs"].includes(path.extname(filePath))
);

for (const filePath of textFiles) {
  const relativePath = path.relative(root, filePath);
  if (relativePath.includes("node_modules")) continue;
  const content = fs.readFileSync(filePath, "utf8");
  assert(!content.includes(unresolvedMarker), `${relativePath}: unresolved placeholder marker`);
  assert(!/\btessera\b/i.test(content), `${relativePath}: banned project name found`);
  assert(!bannedAcronymPattern.test(content), `${relativePath}: avoid banned acronym wording`);
}

if (failures.length > 0) {
  console.error("Validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Repository validation passed.");
