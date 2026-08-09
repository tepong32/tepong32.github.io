from __future__ import annotations

import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
OBSOLETE = {"EasyFolio", "index2.html", "tracepoint.html", "tracepoint-live.html", "tublight.html", "floating-smiley.html", "teppy.pdf"}

class Parser(HTMLParser):
    def __init__(self):
        super().__init__(); self.references=[]; self.ids=set(); self.meta=set(); self.title=False; self.main=False; self.skip=False
    def handle_starttag(self, tag, attrs):
        values=dict(attrs)
        if values.get("id"): self.ids.add(values["id"])
        if tag=="meta" and values.get("name"): self.meta.add(values["name"])
        if tag=="title": self.title=True
        if tag=="main": self.main=True
        if tag=="a" and "skip-link" in (values.get("class") or "").split(): self.skip=True
        for attr in ("href","src"):
            if values.get(attr): self.references.append(values[attr])

def resolve(source, reference):
    split=urlsplit(reference)
    if split.scheme or split.netloc or reference.startswith(("mailto:","tel:","data:","javascript:")): return None
    path=unquote(split.path)
    if not path: return source.resolve()
    target=ROOT/path.lstrip("/") if path.startswith("/") else source.parent/path
    if path.endswith("/"): target/= "index.html"
    return target.resolve()

def validate_page(path, errors):
    parser=Parser(); parser.feed(path.read_text(encoding="utf-8")); rel=path.relative_to(ROOT)
    if not parser.title: errors.append(f"{rel}: missing title")
    if not parser.main: errors.append(f"{rel}: missing main")
    if not parser.skip: errors.append(f"{rel}: missing skip link")
    if "description" not in parser.meta: errors.append(f"{rel}: missing description")
    for reference in parser.references:
        split=urlsplit(reference); target=resolve(path,reference)
        if target is not None:
            try: target.relative_to(ROOT)
            except ValueError: errors.append(f"{rel}: reference escapes root: {reference}"); continue
            if not target.exists(): errors.append(f"{rel}: missing target: {reference}"); continue
        if split.fragment and (not split.path or target==path.resolve()) and split.fragment not in parser.ids: errors.append(f"{rel}: missing fragment #{split.fragment}")

def main():
    errors=[]; pages=sorted(ROOT.rglob("*.html"))
    for page in pages: validate_page(page,errors)
    config=(ROOT/"js/project-config.js").read_text(encoding="utf-8")
    for repo in ("grand","TracePoint","TraceSync"):
        if not re.search(rf"repo:\s*['\"]{repo}['\"]",config): errors.append(f"missing exact repository name {repo}")
    for route in ("projects/grand/index.html","projects/tracepoint/index.html","projects/tracesync/index.html"):
        if not (ROOT/route).exists(): errors.append(f"missing flagship case study: {route}")
    if not (ROOT/"assets/cristino-agapito-resume.pdf").exists(): errors.append("missing canonical résumé")
    for item in OBSOLETE:
        if (ROOT/item).exists(): errors.append(f"obsolete path remains: {item}")
    if list(ROOT.glob("*.zip")): errors.append("root ZIP archives remain")
    if errors:
        print("Site validation failed:"); [print(f"- {error}") for error in errors]; return 1
    print(f"Validated {len(pages)} HTML pages with no local-link or structure errors."); return 0

if __name__=="__main__": sys.exit(main())
