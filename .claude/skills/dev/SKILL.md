---
name: dev
description: Start the local dev server for the telecomsteve website so changes can be previewed in the browser. Use when asked to run, start, or preview the site locally.
---

# Run the telecomsteve site locally

The app lives in the `telecomsteve/` subdirectory. From the repo root:

```bash
cd telecomsteve
npm install   # first time only
npm run dev
```

Open the URL it prints (default http://localhost:5173).

**Note:** In this environment Node runs on the host. If `npm` is not found, prefix
commands with `flatpak-spawn --host bash -lc '...'`.
