#!/usr/bin/env node
/**
 * Frontend Agency Release Script
 *
 * Usage:
 *   node scripts/release.mjs [--dry-run]
 *
 * What it does:
 *   1. Guards: clean tree, pushed HEAD, no existing tag
 *   2. Reads version from package.json
 *   3. Reads matching CHANGELOG entry
 *   4. Runs the full validation suite
 *   5. Creates and pushes a git tag (v<version>)
 *   6. GitHub Actions picks up the tag and creates the release
 *
 * Requires: git, node >= 20
 */

import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');

// ─── Helpers ──────────────────────────────────────────────────────────────────

const NO_COLOR = !process.stdout.isTTY || process.env.NO_COLOR;
const c = {
  reset: NO_COLOR ? '' : '\x1b[0m',
  bold:  NO_COLOR ? '' : '\x1b[1m',
  dim:   NO_COLOR ? '' : '\x1b[2m',
  green: NO_COLOR ? '' : '\x1b[32m',
  yellow: NO_COLOR ? '' : '\x1b[33m',
  red:   NO_COLOR ? '' : '\x1b[31m',
  cyan:  NO_COLOR ? '' : '\x1b[36m',
};

const ok   = (msg) => console.log(`${c.green}✓${c.reset} ${msg}`);
const info = (msg) => console.log(`${c.cyan}→${c.reset} ${msg}`);
const warn = (msg) => console.log(`${c.yellow}⚠${c.reset} ${msg}`);
const fail = (msg) => { console.error(`${c.red}✗${c.reset} ${msg}`); process.exit(1); };
const bold = (s) => `${c.bold}${s}${c.reset}`;
const dim  = (s) => `${c.dim}${s}${c.reset}`;
const sep  = () => console.log(dim('─'.repeat(60)));

function run(cmd, { silent = false } = {}) {
  return execSync(cmd, { cwd: repoRoot, encoding: 'utf8', stdio: silent ? 'pipe' : 'inherit' }).trim();
}

function runSilent(cmd) {
  return run(cmd, { silent: true });
}

function runMutating(cmd) {
  if (DRY_RUN) {
    console.log(`  ${dim('[dry-run]')} ${cmd}`);
    return;
  }
  run(cmd);
}

// ─── Read version ─────────────────────────────────────────────────────────────

sep();
console.log(`\n${bold('Frontend Agency')} — Release Script${DRY_RUN ? ` ${dim('(dry run)')}` : ''}\n`);
sep();

info('Reading version from package.json');
const pkg = JSON.parse(readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));
const version = pkg.version;
if (!version) fail('No version field in package.json');
const tag = `v${version}`;
ok(`Version: ${bold(version)}  →  Tag: ${bold(tag)}`);

// ─── Guard: clean working tree ────────────────────────────────────────────────

info('Checking working tree is clean');
const status = runSilent('git status --porcelain');
if (status) fail(`Working tree is dirty. Commit or stash changes first:\n${status}`);
ok('Working tree is clean');

// ─── Guard: HEAD is pushed ────────────────────────────────────────────────────

info('Checking HEAD is up to date with origin/main');
try {
  runSilent('git fetch origin main --quiet');
  const localHead  = runSilent('git rev-parse HEAD');
  const remoteHead = runSilent('git rev-parse origin/main');
  if (localHead !== remoteHead) {
    fail('Local HEAD differs from origin/main. Push your commits first:\n  git push origin main');
  }
  ok('HEAD matches origin/main');
} catch {
  warn('Could not verify remote HEAD — proceeding (no network or remote not configured)');
}

// ─── Guard: tag does not already exist ───────────────────────────────────────

info(`Checking tag ${bold(tag)} does not exist`);
try {
  const existingTag = runSilent(`git tag -l ${tag}`);
  if (existingTag.includes(tag)) fail(`Tag ${tag} already exists. Bump the version in package.json first.`);
  ok('Tag is available');
} catch {
  ok('Tag is available');
}

// ─── Extract changelog entry ──────────────────────────────────────────────────

info(`Extracting CHANGELOG entry for ${bold(version)}`);
const changelog = readFileSync(path.join(repoRoot, 'CHANGELOG.md'), 'utf8');
const versionHeader = `## ${version}`;
const headerIdx = changelog.indexOf(versionHeader);
if (headerIdx === -1) {
  fail(`No CHANGELOG entry found for version ${version}.\nAdd a "## ${version}" section to CHANGELOG.md before releasing.`);
}

// Extract body between this version header and the next ## header
const afterHeader = changelog.slice(headerIdx + versionHeader.length);
const nextHeader  = afterHeader.search(/\n## /);
const entryBody   = (nextHeader === -1 ? afterHeader : afterHeader.slice(0, nextHeader)).trim();

if (!entryBody) fail(`CHANGELOG entry for ${version} is empty. Add release notes before releasing.`);
ok(`Changelog entry found (${entryBody.split('\n').length} lines)`);

console.log();
console.log(dim('─── Changelog preview ──────────────────────────────────────'));
console.log(dim(entryBody.slice(0, 400) + (entryBody.length > 400 ? '\n...' : '')));
console.log(dim('────────────────────────────────────────────────────────────'));
console.log();

// ─── Run full validation suite ────────────────────────────────────────────────

sep();
info('Running compile:adapters');
runMutating('node scripts/compile-adapters.mjs');

info('Running validate');
runMutating('node scripts/validate-repo.mjs');

info('Running eval:skills');
runMutating('node scripts/run-skill-evals.mjs');

info('Running package:plugin');
runMutating('node scripts/package-plugin.mjs');

info('Running release:check');
runMutating('node scripts/release-check.mjs');

ok('All validation checks passed');

// ─── Create and push tag ──────────────────────────────────────────────────────

sep();
info(`Creating tag ${bold(tag)}`);
const tagMessage = `Release ${tag}\n\n${entryBody}`;

if (DRY_RUN) {
  console.log(`  ${dim('[dry-run]')} git tag -a ${tag} -m "..."`);
  console.log(`  ${dim('[dry-run]')} git push origin ${tag}`);
} else {
  execSync(`git tag -a ${tag} -m ${JSON.stringify(tagMessage)}`, { cwd: repoRoot });
  ok(`Tag ${bold(tag)} created locally`);

  info(`Pushing tag ${bold(tag)} to origin`);
  run(`git push origin ${tag}`);
  ok(`Tag pushed — GitHub Actions will create the release automatically`);
}

// ─── Summary ──────────────────────────────────────────────────────────────────

sep();
console.log();
if (DRY_RUN) {
  console.log(`${bold('Dry run complete.')} No tags were created or pushed.`);
  console.log(`Run without ${bold('--dry-run')} to perform the real release.`);
} else {
  console.log(`${c.green}${bold('✨ Release triggered!')}${c.reset}`);
  console.log();
  info(`GitHub Actions is now creating release ${bold(tag)}`);
  info(`Track progress at: https://github.com/dev-AshishRanjan/Frontend-Agency/actions`);
  console.log();
  warn(`Next step: publish to npm once the GitHub release is live:`);
  console.log(`  ${bold('npm publish')}`);
}
console.log();
