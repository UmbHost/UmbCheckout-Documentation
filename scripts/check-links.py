#!/usr/bin/env python3
"""Check every internal link and image path in the versioned docs.

Usage: python scripts/check-links.py [version-dir ...]   (default: 13 17)

For each version directory it checks:
  - every page listed in SUMMARY.md exists;
  - every page in the directory is listed in SUMMARY.md (warning only);
  - every relative markdown link, <img src>, <a href> and front-matter `cover:`
    resolves to a file inside the same version directory (a link to a folder
    resolves to its README.md), and its #anchor matches a heading when the
    target is a markdown page;
  - no page still contains GitBook's "broken-reference" placeholder.
Exits 1 when anything is broken.
"""
import os
import re
import sys
import urllib.parse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LINK_RE = re.compile(r'(?<!!)\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)')
IMG_MD_RE = re.compile(r'!\[[^\]]*\]\(([^)]+)\)')
SRC_RE = re.compile(r'<(?:img|a)\b[^>]*?(?:src|href)="([^"]+)"', re.I)
COVER_RE = re.compile(r'^cover:\s*(.+)$', re.M)
CODE_RE = re.compile(r'```.*?```', re.S)
INLINE_CODE_RE = re.compile(r'`[^`\n]*`')
HEADING_RE = re.compile(r'^#{1,6}\s+(.*)$', re.M)


def slug(text):
    text = re.sub(r'<[^>]+>', '', text)
    text = re.sub(r'[*_`\\]', '', text).strip().lower()
    text = re.sub(r'[^\w\- ]', '', text)
    return re.sub(r'\s+', '-', text)


def anchors(path):
    with open(path, encoding='utf-8') as f:
        body = CODE_RE.sub('', f.read())
    return {slug(h) for h in HEADING_RE.findall(body)}


def resolve(base_dir, target, version_root):
    target = urllib.parse.unquote(target)
    path, _, anchor = target.partition('#')
    if not path:
        return None, anchor
    full = os.path.normpath(os.path.join(base_dir, path))
    if os.path.isdir(full):
        full = os.path.join(full, 'README.md')
    if not full.startswith(version_root + os.sep):
        return 'OUTSIDE:' + full, anchor
    return full, anchor


def check(version):
    vroot = os.path.join(ROOT, version)
    errors, warnings = [], []
    summary = os.path.join(vroot, 'SUMMARY.md')
    listed = set()
    pages = []
    for d, _, files in os.walk(vroot):
        if os.sep + '.git' in d:
            continue
        pages += [os.path.join(d, f) for f in files if f.endswith('.md')]
    if not os.path.exists(summary):
        return ['%s: SUMMARY.md missing' % version], []
    for page in pages:
        with open(page, encoding='utf-8') as f:
            raw = f.read()
        text = INLINE_CODE_RE.sub('', CODE_RE.sub('', raw))
        rel = os.path.relpath(page, ROOT)
        if 'broken-reference' in text:
            errors.append('%s: contains a broken-reference placeholder' % rel)
        targets = LINK_RE.findall(text) + IMG_MD_RE.findall(text) + SRC_RE.findall(text)
        targets += [c.strip() for c in COVER_RE.findall(raw)]
        for t in targets:
            if re.match(r'^(https?:|mailto:|#|broken-reference)', t):
                if t.startswith('#') and t[1:] and slug(t[1:]) not in anchors(page) and t[1:] not in anchors(page):
                    errors.append('%s: anchor %s not found' % (rel, t))
                continue
            full, anchor = resolve(os.path.dirname(page), t, vroot)
            if full is None:
                continue
            if full.startswith('OUTSIDE:') or not os.path.exists(full):
                errors.append('%s: %s does not resolve' % (rel, t))
                continue
            if os.path.basename(page) == 'SUMMARY.md' and page == summary:
                listed.add(full)
            if anchor and full.endswith('.md') and anchor not in anchors(full):
                errors.append('%s: anchor #%s not in %s' % (rel, anchor, os.path.relpath(full, ROOT)))
    for page in pages:
        if page != summary and page not in listed:
            warnings.append('%s: not listed in SUMMARY.md' % os.path.relpath(page, ROOT))
    return errors, warnings


def main():
    versions = sys.argv[1:] or ['13', '17']
    failed = False
    for v in versions:
        if not os.path.isdir(os.path.join(ROOT, v)):
            print('%s: directory missing' % v)
            failed = True
            continue
        errors, warnings = check(v)
        for w in warnings:
            print('warning: ' + w)
        for e in errors:
            print('error: ' + e)
        print('%s: %d error(s), %d warning(s)' % (v, len(errors), len(warnings)))
        failed = failed or bool(errors)
    sys.exit(1 if failed else 0)


if __name__ == '__main__':
    main()
