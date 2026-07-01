---
name: verify
description: Run all checks for the telecomsteve website — lint, type-check, unit tests, build, and Playwright end-to-end tests. Use before committing or after changing the site to confirm nothing is broken.
---

# Verify the telecomsteve site

The app lives in the `telecomsteve/` subdirectory. Run everything from there.

1. Lint, type-check, unit tests, and build in one command:

   ```bash
   cd telecomsteve && npm run verify
   ```

2. End-to-end tests (desktop + mobile; starts the dev server automatically):

   ```bash
   cd telecomsteve && npm run test:e2e
   ```

Everything should pass before committing. If something fails, fix the code rather
than the test — unless the test itself is wrong.

**Note:** In this environment Node runs on the host. If `npm` is not found, prefix
commands with `flatpak-spawn --host bash -lc '...'`.
