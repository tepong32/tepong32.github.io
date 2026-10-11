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
PASS: publication commit 1884aef53eae014704a876311f617af2a79dc13d reached master.
Validate static portfolio run 38122154947 and Pages run 38122154175 succeeded.
The public download returned HTTP 200, exactly 12,805,215 bytes and the SHA-256
above; live case-study version, test count and displayed checksum also verified.
A later documentation-only commit records this completed deployment evidence.

Original checkout's untracked output/ and tmp/ were left untouched. The isolated
publication checkout is under .codex/worktrees/tracesync-portfolio-release.
