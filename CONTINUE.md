# Portfolio continuation

Updated 2026-10-18. Read AGENTS.md and README.md before editing.

## GRAND Finance/inventory case-study publication

User requested a stronger case study matching the developer resume, then actual
screenshots of current Finance/inventory work. Updated `projects/grand/index.html`,
its scoped gallery CSS, and GRAND's homepage record in `js/project-config.js`.
The narrative now covers Budget-to-Treasury workflows, integrated inventory,
database boundaries, independent approvals, retained history and test evidence.
Claims are pinned to published v0.7.182 / 4e60e996f64c7c16fc39a4b5966e62b6b8e2cebf;
the 2,724-case result remains explicitly attributed to the v0.7.174 integration.
Production and municipal acceptance remain pending. No public app demo is claimed.

Five actual application screenshots use fresh synthetic Finance and inventory
records in a detached source checkout. Full-size links, descriptive alt text and
dated captions accompany them; older captures remain in a collapsed gallery.
[Capture provenance](assets/img/projects/grand/README.md) records source, routes,
fixture generation and limitations. Existing GRAND source/databases were preserved.
The isolated capture checkout is `.codex/worktrees/grand-portfolio-capture-20261018`;
its ignored `.tmp/portfolio_*` scripts and runtime allow local reproduction.

The public resume asset and other case studies are unchanged. On 18 October 2026
the user authorized Version Manager commit, integration and live publication.
The reviewed release contains only the portfolio source, five screenshots and
documentation; generated output/tmp files remain local. Hosted validation and
live verification are the next publication gates.

Validation for this refresh:
- PASS: `python scripts/validate_site.py` (4 pages) and `git diff --check`.
- PASS: Playwright inspection of GRAND and its homepage card at desktop/mobile;
  GRAND has no document overflow at 1440, 390 or 320px. The new images retain
  their full aspect ratios. Scoped stylesheet versioning prevents stale crops.
- PASS: keyboard skip link, full-size screenshot activation, and historical
  gallery expansion/collapse; all ten images decode, unique IDs, no portfolio
  browser console errors, and GitHub activity loads honestly.
- PASS: three pinned source-document destinations returned HTTP 200. Actual
  captures and captions were visually reviewed; source capture checkout has no
  tracked modifications. Browser artifacts are under `output/playwright/`.
- NOT RUN - OUT OF SCOPE: GRAND full/native test suites and release gates;
  application code was unchanged. Synthetic fixture generation and screenshot
  inspection do not establish production or municipal acceptance.

Next: run hosted validation on the release branch, fast-forward master, publish
the release tag, and verify the Pages deployment and live asset bytes. Preserve
local resume outputs and other unrelated work.

## Local ATS resume deliverables

Two application resumes were created locally under `output/resume/`: Python /
Automation Developer and Application / Technical Support, each in DOCX and PDF.
They incorporate user-confirmed employer titles/dates and omit the unconfirmed
CSAT ranking. Both now place experience and skills immediately after contact
details, followed by summary, projects, and education, per the user's revision.
The later revision adds confirmed family-business work (2019-2022), TESDA NC II
training/certifications (2014-2017), and project case-study links. GRAND now leads
the projects with verified Finance, inventory, permissions and testing scope;
production acceptance remains pending. Its public v0.7.182 source was checked.
Local `output/resume/application-checklist.txt` and
`output/resume/validation-notes.txt` accompany them; they are not published files.
PASS: one page each, final visual inspection, matching extracted text, contact
and employment/training checks, seven links per file, original PDF hashes unchanged.
Builder and checks are in `tmp/resume-ats/`; these remain local generated work,
not authoritative public portfolio source. The resume phase changed no website
assets; the subsequent GRAND refresh is described above. Next: tailor the
appropriate version to a vacancy.

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
