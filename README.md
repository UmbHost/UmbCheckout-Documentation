# UmbCheckout documentation (source)

This repository holds the source of the UmbCheckout documentation at [docs.umbcheckout.net](https://docs.umbcheckout.net). It is built with [Astro](https://astro.build/) and [Starlight](https://starlight.astro.build/), the same stack and brand as the UmbHost knowledgebase and the UmbSocial docs, and served by Cloudflare.

There is one folder per major version, each a self-contained set of pages, table of contents and images:

| Folder | Documents | URL |
| ------ | --------- | --- |
| [`17/`](17/README.md) | UmbCheckout 17.x for Umbraco 17 (the latest) | `/17/` |
| [`13/`](13/README.md) | UmbCheckout 1.x for Umbraco 13 | `/13/` |

## Layout of a version folder

```
17/
├── README.md            # the version's home page
├── SUMMARY.md           # the table of contents (the site sidebar)
├── assets/              # images used by this version only
└── <section folders>/   # the pages
```

- `SUMMARY.md` is the single table of contents. `astro.config.mjs` parses it into the sidebar: `## Section` headings become groups, nested bullets become items and subgroups, and bullets linking to another site open in a new tab. A page appears in the sidebar only if it is listed there.
- A folder's `README.md` is its index page.
- Each version is served under its own URL: `17/core-services/basket-service.md` is `/17/core-services/basket-service/`. The site root `/` redirects to the latest version.

## Versions

`versions.mjs` is the one place versions are defined (id, label, folder, and which one is `latest`). It drives the content loader, the sidebars, the version selector in the header, the "older version" notice and the redirects.

To add a version (say Umbraco 18):

1. Copy the newest folder: `cp -r 17 18`, then update the pages that changed.
2. Add `{ id: '18', label: 'UmbCheckout 18', folder: './18', latest: true }` to `versions.mjs` and remove `latest: true` from the previous entry.
3. Run `npm run build` and `python scripts/check-links.py`.

## Old URLs

The docs used to be on GitBook, which served v13 without a version in the URL (`/getting-started/installation`) and v17 under `/v17/`. The build writes `dist/_redirects` so those URLs keep working:

- every v13 page at its old unversioned URL, with and without a trailing slash (`GITBOOK_ROOT_VERSION` in `astro.config.mjs`);
- `/v17/*` to `/17/*` and `/v13/*` to `/13/*`;
- the old GitBook redirects, kept in `GITBOOK_REDIRECTS` in `astro.config.mjs`.

When a page moves or is renamed, add its old path to `GITBOOK_REDIRECTS` (or to the rules in `redirectRules()`) so links to it keep working.

## Building the site

Node 22.12 or later.

```bash
npm ci
npm run dev        # live preview at http://localhost:4321
npm run build      # static site into dist/
```

## Authoring rules

- Every page starts with front matter holding `title` (the page heading; do not repeat it as an H1) and `description`.
- Callouts are Starlight asides: `:::note`, `:::tip`, `:::caution` or `:::danger`, closed by `:::`.
- A titled code block is a single fence: ` ```csharp title="MyComposer.cs" `. Razor views can be tagged `cshtml` or `razor`.
- Link to other pages with relative `.md` paths (they are rewritten to site URLs). Put images in the version's `assets/` and link them relative to the page. Never link a file in the other version's folder.
- Add every new page to that version's `SUMMARY.md`.

## Editing

- Edit the files in the version's folder on a branch and open a pull request into `master`. Merging to `master` publishes.
- **A change that applies to both versions** has to be made in both folders.
- **v17 is based on v13** (the same screens and information on new technology), so `17/` started as a copy of `13/`. When a page differs, the difference should be a real difference between the versions.

## Checking links

Before merging, check that every internal link and image resolves in both versions:

```bash
python scripts/check-links.py        # both versions
python scripts/check-links.py 17     # one version
```

It reports links that don't resolve, anchors that don't exist, `broken-reference` placeholders, and pages missing from `SUMMARY.md`.

## Publishing

`.github/workflows/docs.yml` checks that the site builds, on pull requests and pushes to `master`. Cloudflare builds and deploys the site itself from this repository.

### Owner setup

Cloudflare (Workers with static assets, connected to this repository) pulls each push, builds the site and serves `dist/` as `wrangler.jsonc` describes. Node 22 comes from `.node-version`.

- [ ] In Cloudflare, create the application from Git: `UmbHost/UmbCheckout-Documentation`, project name `umbcheckout-documentation`, production branch `master`.
- [ ] Build command `npm run build`; deploy command `npx wrangler deploy`; preview builds on.
- [ ] Check the preview URL, then move the custom domain `docs.umbcheckout.net` from GitBook to the Worker (the site is built for it: `SITE` in `astro.config.mjs`).
- [ ] Turn off Git Sync for the GitBook spaces so GitBook stops committing here, then close the GitBook site.
