# Portfolio continuation

Updated 2026-10-11. Read AGENTS.md and README.md before editing.

## TraceSync v0.11.0 publication

New portable Windows x64 download and SHA-256 file under assets/downloads/.
Source release: tepong32/TraceSync master and v0.11.0 at
378bad89a10b5e7ee90e6b7277ba60e61b00a08d (remote verified).
Build: 12,805,215 bytes, SHA-256
1205D84AE619D395B42D367F01901388E4185355AA01879285CDA1E63F37810C.

Project config and case study report v0.11.0, with new packaged UI screenshots,
159 passing release tests, backup recovery and the explicit overwrite concurrency
limitation. SFTP is excluded. v0.10.0 and v0.9.1 downloads, hashes and historical
product-tour evidence remain unchanged. No shared CSS/JS behavior changed.

## Validation

PASS: python scripts/validate_site.py (4 pages, local links and structure).
PASS: browser inspection of case study and download cards at desktop and 390px
mobile viewport; no horizontal overflow, download/checksum keyboard navigation.
PASS: TraceSync executable sample sync and backup restore (see its CONTINUE.md).
Publication: push this change to master, wait for Validate static portfolio and
Pages success, then verify deployed executable SHA-256 against the value above.

Original checkout's untracked output/ and tmp/ were left untouched. The isolated
publication checkout is under .codex/worktrees/tracesync-portfolio-release.
