import { spawnSync } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const node = process.execPath;
const checks = [
  ["Repository validation", node, ["scripts/validate-repo.mjs"]],
  ["Skill evals", node, ["scripts/run-skill-evals.mjs"]]
];

let failed = false;

for (const [label, command, args] of checks) {
  console.log(`\n== ${label} ==`);
  const result = spawnSync(command, args, {
    cwd: root,
    stdio: "inherit",
    shell: false
  });

  if (result.status !== 0) {
    failed = true;
    console.error(`${label} failed with exit code ${result.status}.`);
  }
}

const pluginPath = path.join("plugins", "frontend-agency-core");
console.log(`\nOfficial plugin validation target: ${pluginPath}`);
console.log("Run the official validator from the local skill-creator/plugin-creator runtime before publishing.");

if (failed) process.exit(1);

console.log("\nRelease check passed.");
