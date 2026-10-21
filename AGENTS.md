# Development workflow

- Start new feature and fix branches from `origin/development`.
- Target feature and fix pull requests at `development`.
- Promote tested changes to production with a pull request from `development` to `main`.
- Keep GitHub Pages deployment restricted to `main`; development changes must not deploy to production.
- Before committing, run `node --check app.js`, `node validate.mjs`, and `git diff --check`.
