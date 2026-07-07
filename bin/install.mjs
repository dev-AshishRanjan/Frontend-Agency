#!/usr/bin/env node
/**
 * Frontend Agency CLI Installer
 *
 * Usage:
 *   npx frontend-agency install              # Interactive: choose scope
 *   npx frontend-agency install --global     # Install to ~/.<agent>/
 *   npx frontend-agency install --project    # Install to ./.<agent>/ (CWD)
 *   npx frontend-agency update               # Alias for install (re-copies)
 *
 * Supported agents (first phase): Claude Code
 * Planned: Cursor, Windsurf, Gemini CLI
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { createInterface } from 'node:readline';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = path.resolve(__dirname, '..');

// ─── ANSI colours ────────────────────────────────────────────────────────────
const NO_COLOR = !process.stdout.isTTY || process.env.NO_COLOR;
const c = {
  reset: NO_COLOR ? '' : '\x1b[0m',
  bold: NO_COLOR ? '' : '\x1b[1m',
  dim: NO_COLOR ? '' : '\x1b[2m',
  green: NO_COLOR ? '' : '\x1b[32m',
  yellow: NO_COLOR ? '' : '\x1b[33m',
  red: NO_COLOR ? '' : '\x1b[31m',
  cyan: NO_COLOR ? '' : '\x1b[36m',
};
const ok = (msg) => console.log(`${c.green}\u2713${c.reset} ${msg}`);
const info = (msg) => console.log(`${c.cyan}\u2139${c.reset} ${msg}`);
const warn = (msg) => console.log(`${c.yellow}\u26a0${c.reset} ${msg}`);
const err = (msg) => console.error(`${c.red}\u2717${c.reset} ${msg}`);
const bold = (msg) => `${c.bold}${msg}${c.reset}`;
const dim = (msg) => `${c.dim}${msg}${c.reset}`;

// ─── Utilities ───────────────────────────────────────────────────────────────

/**
 * Copy src file/directory to dest, creating parent directories as needed.
 * If dest exists and overwrite is false, skips with a warning.
 */
function copyRecursive(src, dest, { overwrite = true, dryRun = false } = {}) {
  const stat = fs.statSync(src);

  if (stat.isDirectory()) {
    if (!dryRun) fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry), { overwrite, dryRun });
    }
    return;
  }

  // File
  if (fs.existsSync(dest) && !overwrite) {
    warn(`Skipped (already exists): ${dim(dest)}`);
    return;
  }

  if (!dryRun) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
  ok(`Installed: ${dim(dest)}`);
}

/**
 * Simple readline prompt. Returns the user's trimmed answer.
 */
function prompt(question) {
  return new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

/**
 * Prompt the user to choose a scope when neither --global nor --project is given.
 * Returns 'global' | 'project'.
 */
async function promptScope() {
  console.log();
  console.log(bold('Where should Frontend Agency be installed?'));
  console.log(`  ${bold('1')}  Global  ${dim('(~/.claude/ — available in all your projects)')}`);
  console.log(`  ${bold('2')}  Project ${dim('(./.claude/ — committed to this repository)')}`);
  console.log();

  let answer;
  do {
    answer = await prompt('Enter 1 or 2: ');
  } while (answer !== '1' && answer !== '2');

  return answer === '1' ? 'global' : 'project';
}

// ─── Agent Detectors ─────────────────────────────────────────────────────────

const AGENTS = [
  {
    id: 'claude',
    name: 'Claude Code',
    globalDir: path.join(os.homedir(), '.claude'),
    projectDir: path.join(process.cwd(), '.claude'),
    detected: () => [
      path.join(os.homedir(), '.claude'),
      path.join(process.cwd(), '.claude'),
    ].some(fs.existsSync),
  },
];

// ─── Installers ──────────────────────────────────────────────────────────────

/**
 * Install Frontend Agency into a Claude Code target directory.
 *
 * For global scope:  writes to ~/.claude/
 * For project scope: writes to ./.claude/
 *
 * Files installed:
 *   CLAUDE.md         -> <targetDir>/../CLAUDE.md  (project root or home)
 *   .claude/commands/ -> <targetDir>/commands/
 */
function installClaude(targetClaudeDir, scope) {
  const srcClaudeMd = path.join(PACKAGE_ROOT, 'CLAUDE.md');
  const srcCommandsDir = path.join(PACKAGE_ROOT, '.claude', 'commands');

  // For global: CLAUDE.md goes to ~/.claude/CLAUDE.md
  // For project: CLAUDE.md goes to ./CLAUDE.md (project root)
  const destClaudeMd =
    scope === 'global'
      ? path.join(os.homedir(), '.claude', 'CLAUDE.md')
      : path.join(process.cwd(), 'CLAUDE.md');

  const destCommandsDir = path.join(targetClaudeDir, 'commands');

  if (!fs.existsSync(srcClaudeMd)) {
    err(`Source CLAUDE.md not found at: ${srcClaudeMd}`);
    err('Ensure you are running this from the frontend-agency package root or via npx.');
    process.exit(1);
  }

  if (!fs.existsSync(srcCommandsDir)) {
    err(`Source commands directory not found at: ${srcCommandsDir}`);
    process.exit(1);
  }

  console.log();
  info(`Installing Claude Code integration (${bold(scope)} scope)...`);
  console.log();

  // CLAUDE.md
  copyRecursive(srcClaudeMd, destClaudeMd, { overwrite: true });

  // Slash commands
  for (const entry of fs.readdirSync(srcCommandsDir)) {
    const src = path.join(srcCommandsDir, entry);
    const dest = path.join(destCommandsDir, entry);
    copyRecursive(src, dest, { overwrite: true });
  }

  console.log();
  info(`Slash commands installed to: ${dim(destCommandsDir)}`);
  info(`CLAUDE.md installed to:      ${dim(destClaudeMd)}`);
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const command = args[0] ?? 'install';

  if (command !== 'install' && command !== 'update') {
    err(`Unknown command: ${command}`);
    console.log(`Usage: npx frontend-agency install [--global | --project]`);
    process.exit(1);
  }

  const isUpdate = command === 'update';

  console.log();
  console.log(bold('Frontend Agency') + ` — Professional AI Frontend Skills`);
  if (isUpdate) {
    console.log(dim('Updating existing installation...'));
  }
  console.log();

  // ── Resolve scope ──────────────────────────────────────────────────────────
  let scope;
  if (args.includes('--global')) {
    scope = 'global';
  } else if (args.includes('--project')) {
    scope = 'project';
  } else {
    // Interactive
    scope = await promptScope();
  }

  // ── Detect agents ──────────────────────────────────────────────────────────
  const detected = AGENTS.filter((a) => a.detected());
  const available = AGENTS; // Install to all supported agents regardless of detection

  if (detected.length > 0) {
    info(`Detected agents: ${detected.map((a) => bold(a.name)).join(', ')}`);
  } else {
    info('No agents detected yet. Installing for Claude Code.');
  }

  // ── Install ────────────────────────────────────────────────────────────────
  let installed = 0;

  for (const agent of available) {
    const targetDir = scope === 'global' ? agent.globalDir : agent.projectDir;

    try {
      if (agent.id === 'claude') {
        installClaude(targetDir, scope);
        installed += 1;
      }
    } catch (error) {
      err(`Failed to install ${agent.name}: ${error.message}`);
      process.exit(1);
    }
  }

  // ── Summary ────────────────────────────────────────────────────────────────
  console.log();
  console.log(bold(`✨ Frontend Agency installed successfully!`));
  console.log();

  if (scope === 'global') {
    info('Skills are now available in all your projects.');
    info('Restart Claude Code or start a new session to activate.');
  } else {
    info('Skills are available in this project.');
    info(`Commit the ${bold('.claude/')} directory and ${bold('CLAUDE.md')} to share with your team.`);
    info('Restart Claude Code or start a new session to activate.');
  }

  console.log();
  info(`Type ${bold('/')} in Claude Code to see available skill commands.`);
  info(`Run ${bold('/full-build')} to start an agency-grade frontend build.`);
  console.log();

  process.exit(0);
}

main().catch((error) => {
  err(`Unexpected error: ${error.message}`);
  if (process.env.DEBUG) console.error(error);
  process.exit(1);
});
