# Create Issue

Goal:
Create a GitHub issue from what is currently in the Git index (staging area), using the GitHub CLI (`gh`).

Expected behavior:

1. Check that files are staged.
2. Read the staged diff to understand the intent, scope, and motivation of the changes.
3. Infer the issue that should exist before these staged changes are implemented.
4. Draft a clear issue title and body in English.
5. Create the issue with `gh issue create`.
6. Show a summary with the issue URL, title, and the staged files used as input.

Required title format:

```text
<short action-oriented issue title>
```

Valid title examples:

- Add GitHub repository link to the manifesto page
- Improve language switcher accessibility
- Document shared agent instructions

Required body structure:

```text
## Context
- <context item 1>
- <context item 2>

## Proposed changes
- <proposed change 1>
- <proposed change 2>
- <proposed change 3>

## Acceptance criteria
- <criterion 1>
- <criterion 2>
- <criterion 3>
```

Rules:

- Use only the changes that are already staged to infer the issue.
- Do not add anything to or remove anything from the staging area.
- Do not create an issue if the staging area is empty; explain that files must be staged first.
- Do not invent unrelated requirements or implementation details.
- Keep the issue title concise and specific.
- Use `gh issue create` to create the issue.
- If `gh` is not installed, not authenticated, or the repository remote cannot be resolved by `gh`, do not create the issue and explain the blocking step.
- Do not commit, push, or modify files as part of this workflow.

Implementation:

- Inspect staged files with `git diff --cached --name-status`.
- Inspect staged content with `git diff --cached`.
- Generate the final title and body.
- Run: `gh issue create --title "<title>" --body "<body>"`.
- Show the created issue URL and the staged files that informed it.
