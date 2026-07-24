# Create PR

Goal:
Create a GitHub pull request from the current branch, using the GitHub CLI (`gh`).

Input:

- Optional first argument: the base branch to compare against.
- If no base branch is provided, use `main`.
- Infer the issue ID from the numeric suffix at the end of the current branch name.
- Valid branch suffix examples: `docs/add-shared-llm-workflow-commands-2`, `feat/add-login-42`, `fix/correct-label-103`.

Expected behavior:

1. Read the current branch name.
2. Determine the base branch:
   - Use the first command argument when provided.
   - Otherwise use `main`.
3. Extract the issue ID from the final numeric suffix of the current branch name.
4. Compare the current branch against the base branch.
5. Read the commits that are present on the current branch and absent from the base branch.
6. Draft a clear pull request title and body in English.
7. Ensure the current branch is linked to the extracted issue in GitHub's Development section before creating the PR.
8. Include a closing reference for the issue at the end of the PR body:

```text
#closes <issue ID>
```

9. Create the pull request with `gh pr create`.
10. Show a summary with the PR URL, title, base branch, current branch, issue ID, and whether the Development link was verified.

Required title format:

```text
<short action-oriented pull request title>
```

Valid title examples:

- Add shared LLM workflow commands
- Add create-branch workflow for GitHub issues
- Fix language toggle label

Required body structure:

```text
## Summary
- <summary item 1>
- <summary item 2>
- <summary item 3>

## Verification
- <verification item 1>
- <verification item 2>

#closes <issue ID>
```

Rules:

- Do not create a PR from `main`.
- Do not create a PR if the current branch name does not end with a numeric issue ID.
- Do not create a PR if the base branch does not exist or cannot be resolved.
- Do not create a PR if there are no commits on the current branch compared to the base branch.
- Do not invent verification steps. If no tests or checks were run, write `Not run`.
- Keep the title concise and specific.
- Link the branch to the issue through GitHub's supported Development workflow before creating the PR.
- Do not invent or call unsupported REST or GraphQL endpoints for directly linking an existing PR to an issue.
- Use `gh pr create` to create the pull request.
- Do not commit, push, edit files, stage files, or unstage files as part of this workflow.
- Preserve the user's existing worktree changes.

Implementation:

- Inspect the current branch with:

```text
git branch --show-current
```

- Compare commits with:

```text
git log --oneline <base branch>..HEAD
```

- Inspect the commit details when needed with:

```text
git show --stat --summary <commit>
```

- Check whether the current branch is already linked to the issue:

```text
gh issue develop --list <issue ID>
```

- If the current branch is not listed, link it to the issue before creating the PR by using GitHub's supported Development workflow:

```text
gh issue develop <issue ID> --name <current branch> --base <base branch>
```

- If `gh issue develop` cannot link the branch because it already exists or the operation is unsupported, do not fabricate an API call. Continue only if the branch is already linked, otherwise report that the PR must be manually linked in GitHub's Development sidebar.

- Create the pull request with:

```text
gh pr create --base <base branch> --head <current branch> --title "<title>" --body "<body>"
```

- After creating the PR, verify the issue's Development linkage again:

```text
gh issue develop --list <issue ID>
```

- Show the created PR URL and a concise summary, including whether the branch or PR appears linked to the issue in Development.
