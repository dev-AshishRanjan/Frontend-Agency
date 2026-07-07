# Release Checklist

## Pre-Release

- Confirm all intended changes are committed by phase.
- Run `npm run validate`.
- Run `npm run eval:skills`.
- Run the official plugin validator.
- Run the official skill validator for every skill.
- Check that local research artifacts are not staged.
- Review marketplace metadata and plugin version.

## Manual Review

- Confirm every new skill has a clear trigger description.
- Confirm every reference link resolves.
- Confirm no banned or placeholder naming remains.
- Confirm examples are professional and production-oriented.
- Confirm docs describe actual repository behavior.

## Release Notes

Include:

- Version
- Date
- Added skills
- Changed references
- Validation changes
- Known limitations

## Post-Release

- Install or refresh the plugin in the target Claude Code environment.
- Run one representative greenfield planning request.
- Run one representative review request.
- Record failures as eval candidates.
