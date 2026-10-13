# UmbCheckout documentation (source)

This repository holds the source of the UmbCheckout documentation at [docs.umbcheckout.net](https://docs.umbcheckout.net). It is published by GitBook through Git Sync.

There is one folder per major version. Each folder is a complete GitBook space with its own pages, table of contents and images:

| Folder | Documents | GitBook space | Site variant label |
| ------ | --------- | ------------- | ------------------ |
| [`17/`](17/README.md) | UmbCheckout 17.x for Umbraco 17 | Git Sync project directory `17` | Umbraco 17 (v17), the default |
| [`13/`](13/README.md) | UmbCheckout 1.x for Umbraco 13 | Git Sync project directory `13` | Umbraco 13 (v13) |

Both spaces are variants of one docs site, so readers switch version with the dropdown next to the site title. How the spaces, Git Sync and the variants are set up in GitBook is in [GITBOOK-SETUP.md](GITBOOK-SETUP.md).

## Layout of a version folder

```
13/
├── .gitbook.yaml        # tells GitBook where README.md and SUMMARY.md are
├── .gitbook/assets/     # images used by this version only
├── README.md            # the space's home page
├── SUMMARY.md           # the table of contents (sidebar)
└── <section folders>/   # the pages
```

- A page appears in the sidebar only if `SUMMARY.md` lists it.
- Images live in the version's own `.gitbook/assets/`. Link them with a path relative to the page, for example `../../.gitbook/assets/image.png`. Never link an image in the other version's folder: each space only sees its own folder.
- Keep GitBook's markdown as the existing pages use it: `{% hint style="info" %}`, `{% code title="..." %}`, `{% embed url="..." %}`, `<figure><img src="..."></figure>`, and front matter (`description:`).

## Editing

- **In GitBook:** edit the space for the version. GitBook commits to `master` here, in that version's folder only ("GITBOOK-N" commits).
- **In Git:** edit the files in the version's folder and push to `master`. A push to `master` publishes at once, so work on a branch and merge when it's ready.
- **A change that applies to both versions** has to be made in both folders.
- **v17 is based on v13** (the same screens and information on new technology), so `17/` started as a copy of `13/`. When a page differs, the difference should be a real difference between the versions.

## Checking links

Before merging, check that every internal link and image resolves in both versions:

```bash
python scripts/check-links.py        # both versions
python scripts/check-links.py 17     # one version
```

It reports links and images that don't resolve, anchors that don't exist, GitBook `broken-reference` placeholders, and pages missing from `SUMMARY.md`.
