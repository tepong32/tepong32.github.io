# Cristino Agapito Jr Portfolio

A lightweight GitHub Pages portfolio for presenting software engineering work focused on process improvement, workflow automation, and practical operational software.

The homepage introduces Cristino Agapito Jr as a Software Engineer before presenting selected projects. The site keeps the existing Bootstrap-based static structure and organizes the portfolio around practical engineering themes rather than a long project list.

## Portfolio structure

- **Hero**: concise professional introduction, summary, GitHub link, project CTA, and resume access.
- **About Me**: accounting-influenced software engineering narrative focused on accuracy, maintainability, and operational efficiency.
- **Skills**: grouped by languages, frameworks, data and automation, and tools.
- **What I Enjoy Solving**: minimal overview of workflow automation, process optimization, government digitalization, desktop software, business systems, data management, Excel automation, and AI-assisted software development.
- **Selected Engineering Projects**: categorized project cards for government process improvement, desktop productivity, and accounting automation.

## Selected Engineering Projects

Project cards are rendered from `js/portfolio-refresh.js` and are organized into these categories:

### Government Process Improvement

- TracePoint — <https://github.com/tepong32/Tracepoint>
- GRAND — <https://github.com/tepong32/grand>

GRAND is labeled as the original prototype that eventually evolved into TracePoint.

### Desktop Productivity

- TraceSync — <https://github.com/tepong32/TraceSync>
- Excel Companion — <https://github.com/tepong32/xl_tkinter>

### Accounting Automation

- Accounting Payroll/reporting automation — <https://github.com/tepong32/acctgFiles>

## GitHub metadata

Each project fetches repository information directly from the GitHub API by exact repository name. The page uses GitHub-provided repository description, repository URL, homepage/live demo URL when available, and language/topic metadata when available.

If GitHub metadata is unavailable, the layout still renders with concise fallback text and the known repository link.

Each project card is written to answer:

- What problem does this solve?
- Who is it for?
- Why is it useful?

## Files

- `index.html` — main GitHub Pages portfolio page.
- `portfolio-refresh.css` — custom portfolio styling layered on Bootstrap.
- `js/portfolio-refresh.js` — navigation behavior, footer year, exact GitHub repository metadata fetching, and categorized project rendering.
- `assets/` — existing portfolio image and resume assets.

## Compatibility

This repository remains a static Bootstrap site compatible with GitHub Pages. No build step or additional runtime dependency is required.

## Sources

- Bootstrap: <https://getbootstrap.com/>
- Bootstrap Icons: <https://icons.getbootstrap.com/>
