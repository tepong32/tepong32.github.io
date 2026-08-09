# Cristino Agapito Jr — Developer Portfolio

A dependency-free GitHub Pages portfolio focused on Python, Django, workflow automation, and operations-aware software development. Curated case studies provide the engineering narrative while GitHub's public REST API supplies verifiable repository metadata and activity.

## Featured projects

- **GRAND** — the primary and largest case study: an actively developed, multi-module Django platform for public-service and internal LGU workflows.
- **TracePoint** — a focused Django case study covering secure citizen-request continuation, lifecycle policy, role-aware workflows, and audit history.
- **TraceSync** — a Python desktop case study covering preview-before-copy synchronization, provider abstraction, cancellation, and automated tests.

The site describes incomplete work transparently and does not present unavailable deployments as live demos.

## Structure

- `index.html` — hiring-focused homepage, flagship projects, and live repository feed.
- `projects/grand/` — GRAND multi-module Django/LGU platform case study.
- `projects/tracepoint/` — TracePoint Django/GovTech case study.
- `projects/tracesync/` — TraceSync desktop case study.
- `js/project-config.js` — curated portfolio copy and repository mapping.
- `js/github-api.js` — shared GitHub REST API client.
- `js/site.js` and `js/project-page.js` — page rendering and interaction.
- `portfolio-refresh.css` — shared responsive visual system.
- `scripts/validate_site.py` — dependency-free local and CI validation.

## GitHub API behavior

The homepage requests the public GitHub user repositories endpoint once, filters the response through `js/project-config.js`, and caches successful responses in `sessionStorage` for 15 minutes. Each case study uses the same client for repository metadata, recent commits, and pull requests.

The client sends no token, times out stalled requests, handles rate limits and offline states honestly, and never fabricates activity. Curated copy controls project positioning; GitHub controls dates, language, topics, branches, links, commits, and pull-request data.

## Project configuration

Add or revise projects in `js/project-config.js`. A project record maps the case-study narrative to an exact, case-sensitive GitHub repository name and can include a case-study route. Demo links should only be configured when the deployment is approved and publicly available.

## Local preview

```powershell
python -m http.server 8000
```

Open `http://localhost:8000/`.

Use root-relative URLs through the local server rather than opening HTML files directly.

## Validation

```powershell
python scripts/validate_site.py
```

The validator checks local links, fragment targets, required metadata, exact flagship repository names, required case-study routes, obsolete files, and résumé placement. GitHub Actions runs the same check.

## Deployment

The site has no production build step. GitHub Pages serves the HTML, CSS, JavaScript, and assets directly.
