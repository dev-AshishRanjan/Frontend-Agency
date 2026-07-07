import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const evalDir = path.join(root, "evals", "skills");
const skillsDir = path.join(root, "plugins", "frontend-agency-core", "skills");
const failures = [];

function fail(message) {
  failures.push(message);
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    fail(`${path.relative(root, filePath)}: ${error.message}`);
    return null;
  }
}

function extractDescription(skillContent) {
  const match = skillContent.match(/^description:\s*"([^"]+)"/m);
  return match?.[1] ?? "";
}

function assertArray(value, minLength, label) {
  if (!Array.isArray(value) || value.length < minLength) {
    fail(`${label} must be an array with at least ${minLength} item(s)`);
    return [];
  }
  return value;
}

const evalFiles = fs.existsSync(evalDir)
  ? fs.readdirSync(evalDir).filter((name) => name.endsWith(".json")).sort()
  : [];

if (evalFiles.length === 0) {
  fail("No skill eval files found.");
}

for (const evalFile of evalFiles) {
  const evalPath = path.join(evalDir, evalFile);
  const spec = readJson(evalPath);
  if (!spec) continue;

  const skillName = evalFile.replace(/\.json$/, "");
  const skillPath = path.join(skillsDir, skillName, "SKILL.md");
  if (!fs.existsSync(skillPath)) {
    fail(`${evalFile}: matching skill is missing`);
    continue;
  }

  const skillContent = fs.readFileSync(skillPath, "utf8");
  const description = extractDescription(skillContent).toLowerCase();

  if (spec.skill !== skillName) fail(`${evalFile}: skill field must equal ${skillName}`);
  if (typeof spec.intent !== "string" || spec.intent.length < 30) {
    fail(`${evalFile}: intent must be a specific string`);
  }

  const triggerTerms = assertArray(spec.trigger_terms, 3, `${evalFile}: trigger_terms`);
  const expectedSections = assertArray(spec.expected_sections, 3, `${evalFile}: expected_sections`);
  const rejectionPatterns = assertArray(spec.rejection_patterns, 2, `${evalFile}: rejection_patterns`);
  const sampleRequests = assertArray(spec.sample_requests, 2, `${evalFile}: sample_requests`);

  for (const term of triggerTerms) {
    if (!description.includes(String(term).toLowerCase())) {
      fail(`${evalFile}: trigger term "${term}" should appear in the skill description`);
    }
  }

  for (const section of expectedSections) {
    if (!skillContent.toLowerCase().includes(String(section).toLowerCase())) {
      fail(`${evalFile}: expected section cue "${section}" should appear in SKILL.md`);
    }
  }

  for (const pattern of rejectionPatterns) {
    if (sampleRequests.some((request) => String(request).toLowerCase().includes(String(pattern).toLowerCase()))) {
      fail(`${evalFile}: rejection pattern "${pattern}" appears inside sample requests`);
    }
  }

  const referenceMatches = [...skillContent.matchAll(/`(\.\.\/\.\.\/references\/[^`]+)`/g)];
  if (referenceMatches.length === 0) fail(`${evalFile}: skill should reference shared standards`);
  for (const match of referenceMatches) {
    const referencePath = path.normalize(path.join(path.dirname(skillPath), match[1]));
    if (!fs.existsSync(referencePath)) {
      fail(`${evalFile}: missing referenced file ${match[1]}`);
    }
  }
}

if (failures.length > 0) {
  console.error("Skill evals failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Skill evals passed for ${evalFiles.length} skill(s).`);
