# Development workflow

- Start every new feature, fix, and status-update branch from the latest `origin/development`. Fetch `origin` before creating the branch or worktree.
- Each workspace uses its own feature branch based on `development`; do not work directly on `development` or `main`.
- Target feature, fix, and status-update pull requests at `development`. When using GitHub CLI, specify `gh pr create --base development` explicitly, even if an older workspace still lists `main` as its target.
- Merging a feature pull request updates `development` and must not publish the live website. Test the page locally before merging.
- Any developer with the required repository permissions may release tested changes through a pull request from `development` to `main` (`gh pr create --base main --head development`). Agents should do this only when explicitly asked to release; do not automatically promote changes after merging a feature pull request.
- Merge release pull requests with a merge commit, not squash or rebase, so `development` and `main` retain shared history. A release includes all changes currently on `development`.
- Keep GitHub Pages deployment restricted to `main`. Merging the release pull request into `main` triggers production deployment.
- Before committing, run `node --check app.js`, `node validate.mjs`, and `git diff --check`.
- In Conductor, use `development` as the base branch for new workspaces. Do not rename an existing workspace branch unless the user asks.

## Required delivery message

- In the final handoff, always tell the developer where the changes are: local only, pushed to a feature branch, awaiting PR merge, merged into `development`, or deployed to production. Only report a state you have verified.
- After confirming a pull request has merged into remote `development`, explicitly say: "The changes have been merged into `development`. They are not yet visible on the live website. To publish them, merge a release pull request from `development` into `main`; this triggers the GitHub Pages deployment."
- Include the merged pull request link when available. Remind the developer that the release includes all changes currently on `development`.
- If the changes are still local or the feature PR is open, state that they have not yet reached `development` and identify that merge as the next step.
- After a release merges into `main`, report deployment as pending until GitHub Actions confirms success. Only then say the changes are deployed, including the deployment or live-site link when available.

## Reducing merge conflicts

- Use one short-lived branch per task, with a distinct name such as `andres/update-vpn-status`. Developers and agents should not share an active feature branch.
- Keep pull requests small and focused. Coordinate overlapping work, especially edits to the shared `status.json` and its translations; merge status updates promptly.
- Before requesting a merge, commit your work, run `git fetch origin`, and merge `origin/development` into your feature branch. Resolve conflicts there and rerun the checks. Do not force-push shared branches.
- Preserve both contributors' intended changes when resolving conflicts. Reconcile status updates, timestamps, and all three languages; do not blindly accept an entire side of `status.json`.
- If an exceptional hotfix lands on `main`, promptly open a pull request from `main` back to `development` and merge it with a merge commit before starting further work.

## Status updates

- Keep the current incident notice unchanged until all applications are confirmed back online. This applies to every field in `incident` and its English and French translations, including the recovery expectation. Record intermediate recoveries in the service statuses, impact text and `updates`. Only revise the incident notice once full recovery is confirmed.
- When the user confirms that an application is back online, this means it is available in all regions. Set its status to `operational`, remove any `access: "belgium"` restriction, and update the current impact text and recovery notice in all three languages. Do not carry forward a Belgium-only restriction for a restored application.

## Tekst MCP

Use the Tekst MCP server only when the user explicitly asks to use Tekst in the current request. Do not invoke Tekst automatically based on task relevance, and do not access it in background work without an explicit user request.
