# Evals

The eval suite is a deterministic quality gate for skill repository integrity. It does not claim to measure model quality directly. It checks whether every skill has clear trigger terms, expected output cues, sample requests, rejection patterns, and valid shared references.

Run:

```bash
npm run eval:skills
```

Use these evals before changing skill frontmatter or references.
