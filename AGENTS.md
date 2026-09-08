# Developer portfolio - repository guide

## Project context and documentation map

Dependency-free GitHub Pages portfolio with curated project narratives, shared JavaScript rendering and a public GitHub REST API client. HTML/CSS and assets are the deployable site; no backend or database is required.

### Durable boundaries

Keep claims grounded in source/release evidence. Do not present unavailable deployments as live demos or fabricate GitHub activity. Keep the public API client token-free and preserve honest offline/rate-limit behavior. Curated text and live repository metadata have distinct ownership.

### Development state

Current source includes GRAND, TracePoint and TraceSync case studies, release comparisons and the developer resume refresh. Local generated output/tmp artifacts are not authoritative source.

### Read next

- [README.md](README.md)
- [index.html](index.html)
- [js/project-config.js](js/project-config.js)
- [js/github-api.js](js/github-api.js)
- [scripts/validate_site.py](scripts/validate_site.py)
- [Continuation entry point](CONTINUE.md)

### Project validation

Run `python scripts/validate_site.py` for site changes. Inspect affected routes at desktop/mobile widths and keyboard navigation for UI changes; expand across pages when shared CSS/JS changes. Documentation-only edits require reference checks, not browser or full-site testing by ritual.

## Repository continuity and proportional testing

- Maintain this root AGENTS.md in version control as portable operational context. Preserve applicable nested instructions. Update it in the same phase as durable architecture, security, integration, major completion/deferral or testing-policy changes.
- Keep this file concise: identity, boundaries, decisions and a documentation map. Replace stale summaries; never append transcripts, line-by-line diaries or duplicate full specifications.
- Before substantial work read AGENTS.md, CONTINUE.md (and its canonical handoff target), the relevant roadmap/architecture/feature documents, recent Git history/status and affected tests. Reconcile stale snapshots against source; do not ask the user to repeat documented context.
- At task completion update the canonical handoff for immediate state, actual validation, blockers and next steps; update the roadmap for agreed direction changes and specialized architecture/feature/audit/testing documents where applicable. Cross-link instead of duplicating them. Do not invent completed phases or new priorities.
- Test the changed area first: direct unit/feature tests, related integration tests and dependent regressions. Expand for shared models/services/utilities, auth/permissions, middleware, schema/migrations, settings/environments, shared UI, cross-app APIs, reporting, jobs or build/deployment changes. Uncertain impact requires broader validation.
- Full suites are appropriate for broad refactors, cross-module/security/infrastructure changes, major milestones and release/production gates, not automatically every isolated edit. Preserve stricter project-specific safety, reachability, hardware and release checks.
- Record relevant commands, scope rationale and outcomes in the handoff or appropriate validation report: PASS; FAIL - CAUSED BY CURRENT WORK; FAIL - PRE-EXISTING (with evidence); NOT RUN - OUT OF SCOPE (with rationale); NOT RUN - ENVIRONMENTAL (with limitation).
- Investigate failures before calling them unrelated. Fix regressions caused by the change and document evidence for pre-existing failures. A skipped test or unperformed human/operational acceptance is never a pass.
- Keep documentation, code and validation evidence sufficient for a fresh session to resume without a conversation transcript.
- Install additional standalone software/tooling under C:/xxx/_INSTALLS/_HERE/_xxx unless the user specifies otherwise.
