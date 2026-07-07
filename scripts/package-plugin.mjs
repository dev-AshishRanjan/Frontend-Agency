import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const pluginDir = path.join(root, "plugins", "frontend-agency-core");
const pluginJsonPath = path.join(pluginDir, ".codex-plugin", "plugin.json");
const marketplacePath = path.join(root, ".agents", "plugins", "marketplace.json");
const distRoot = path.join(root, "dist");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function assertInside(parent, target) {
  const relative = path.relative(parent, target);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(`Refusing to write outside ${parent}: ${target}`);
  }
}

function walkFiles(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return walkFiles(fullPath);
    return fullPath;
  });
}

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function publishStaging(stagingPath, targetPath) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      fs.rmSync(targetPath, { recursive: true, force: true });
      fs.renameSync(stagingPath, targetPath);
      return;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}

const plugin = readJson(pluginJsonPath);
const packageName = `${plugin.name}-${plugin.version}`;
const outDir = path.join(distRoot, packageName);
const stagingDir = path.join(distRoot, `.${packageName}-${process.pid}-${Date.now()}`);
assertInside(distRoot, outDir);
assertInside(distRoot, stagingDir);

fs.rmSync(stagingDir, { recursive: true, force: true });
fs.mkdirSync(path.join(stagingDir, "plugins"), { recursive: true });
fs.mkdirSync(path.join(stagingDir, ".agents", "plugins"), { recursive: true });

const packagedPluginDir = path.join(stagingDir, "plugins", plugin.name);
fs.cpSync(pluginDir, packagedPluginDir, { recursive: true });
fs.copyFileSync(marketplacePath, path.join(stagingDir, ".agents", "plugins", "marketplace.json"));

const files = walkFiles(stagingDir)
  .map((filePath) => path.relative(stagingDir, filePath).split(path.sep).join("/"))
  .sort();

const inventory = files.map((relativePath) => ({
  path: relativePath,
  sha256: sha256(path.join(stagingDir, relativePath))
}));

const manifest = {
  name: packageName,
  plugin: plugin.name,
  version: plugin.version,
  marketplace: ".agents/plugins/marketplace.json",
  pluginRoot: `plugins/${plugin.name}`,
  generatedAt: new Date().toISOString(),
  files: inventory
};

fs.writeFileSync(
  path.join(stagingDir, "package-manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
  "utf8"
);

const required = [
  path.join(stagingDir, ".agents", "plugins", "marketplace.json"),
  path.join(stagingDir, "plugins", plugin.name, ".codex-plugin", "plugin.json"),
  path.join(stagingDir, "plugins", plugin.name, "skills")
];

for (const requiredPath of required) {
  if (!fs.existsSync(requiredPath)) {
    throw new Error(`Package is missing required path: ${path.relative(root, requiredPath)}`);
  }
}

publishStaging(stagingDir, outDir);

console.log(`Packaged ${plugin.name} ${plugin.version} at ${path.relative(root, outDir)}`);
console.log(`Package files: ${inventory.length + 1}`);
