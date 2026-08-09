# Cristino Agapito Jr — Developer Portfolio

A static GitHub Pages portfolio focused on Python, Django, workflow automation, and operations-aware software development.

## Structure

- `index.html` — hiring-focused homepage and live repository feed.
- `projects/tracepoint/` — TracePoint Django/GovTech case study.
- `projects/tracesync/` — TraceSync desktop case study.
- `js/project-config.js` — curated portfolio copy and repository mapping.
- `js/github-api.js` — shared GitHub REST API client.
- `js/site.js` and `js/project-page.js` — page rendering and interaction.
- `portfolio-refresh.css` — shared responsive visual system.

## GitHub API behavior

The homepage requests the public GitHub user repositories endpoint once, merges returned metadata with curated project records, and caches successful responses in `sessionStorage` for 15 minutes. Case studies use the same client for repository metadata, commits, and pull requests.

The client sends no token, times out stalled requests, handles rate limits and offline states honestly, and never fabricates activity.

## Local preview

```powershell
python -m http.server 8000
```

Open `http://localhost:8000/`.

## Validation

```powershell
python scripts/validate_site.py
```

The validator checks local links, fragment targets, required metadata, flagship repository names, obsolete files, and résumé placement. GitHub Actions runs the same check.

## Deployment

The site has no production build step. GitHub Pages serves the HTML, CSS, JavaScript, and assets directly.
