# Cristino Agapito Jr Portfolio

A lightweight GitHub Pages portfolio for presenting software engineering work focused on process improvement, workflow automation, and practical operational software.

The homepage introduces Cristino Agapito Jr as a Software Engineer before presenting selected projects. The redesign keeps the existing Bootstrap-based static structure and organizes the portfolio around practical engineering themes rather than a long project list.

## Portfolio structure

- **Hero**: concise professional introduction, summary, GitHub link, project CTA, and resume access.
- **About Me**: accounting-influenced software engineering narrative focused on accuracy, maintainability, and operational efficiency.
- **Skills**: grouped by languages, frameworks, data and automation, and tools.
- **What I Enjoy Solving**: minimal overview of workflow automation, process optimization, government digitalization, desktop software, business systems, data management, Excel automation, and AI-assisted software development.
- **Selected Engineering Projects**: categorized project cards for government process improvement, desktop productivity, and accounting automation.

## Project metadata

Project cards are rendered from `js/portfolio-refresh.js`. The page attempts to load repository metadata from the GitHub API for the `tepong32` account and gracefully falls back to concise static copy if metadata is unavailable.

Each project card is written to answer:

- What problem does this solve?
- Who is it for?
- Why is it useful?

## Files

- `index.html` — main GitHub Pages portfolio page.
- `portfolio-refresh.css` — custom portfolio styling layered on Bootstrap.
- `js/portfolio-refresh.js` — navigation behavior, footer year, and GitHub repository metadata rendering.
- `assets/` — existing portfolio image and resume assets.

## Compatibility

This repository remains a static Bootstrap site compatible with GitHub Pages. No build step or additional runtime dependency is required.

## Sources

- Bootstrap: <https://getbootstrap.com/>
- Bootstrap Icons: <https://icons.getbootstrap.com/>
