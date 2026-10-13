# GitBook setup: one site, two versions

This repository now has one folder per version: `17/` (UmbCheckout 17 for Umbraco 17) and `13/` (UmbCheckout 1.x for Umbraco 13). In GitBook each folder is its own space, and the two spaces are **content variants** of the docs site, so readers get a version dropdown like the one on docs.umbraco.com.

These are the steps to do in GitBook. They're based on GitBook's documentation as of 2026-10-13 (sources at the end). GitBook now calls a space's content a "section" in places, and the site's tabs are also called "sections". Where this guide says **space**, it means the content you edit (the thing Git Sync fills).

## The plan

| Space | Git Sync folder | Variant label | Variant slug | URLs |
| ----- | --------------- | ------------- | ------------ | ---- |
| **The existing live space**, renamed "UmbCheckout 17" | `17` | UmbCheckout 17 | none (the default) | `docs.umbcheckout.net/<page>`, as today |
| **A duplicate of the live space**, named "UmbCheckout 13" | `13` | UmbCheckout 13 | `v13` | `docs.umbcheckout.net/v13/<page>` |

**Why the live space becomes v17:**
- The default variant is served at the site root without a slug. So the live space, as the default, keeps every URL it has today, and its page IDs, history and search ranking.
- `17/` started as a copy of today's pages with the same paths. Every existing URL still opens the matching page, now describing the current version.
- Today's v13 content moves to the new space under `/v13/`.

**Why not the other way round?** If the live space became v13, it would move under `/v13/` and lose its root URLs. The new v17 space would start with no history.

## Before you start

- **Don't merge the branch to `master` yet.** The live space syncs from the root of `master`. Once this branch is merged, the root has no `SUMMARY.md` (the content is in `13/` and `17/`), so the live space would sync the wrong content. Step 2 disconnects it first.
- **Make sure GitBook has no unsynced edits.** Any "GITBOOK-N" commits on `master` made after this branch was cut must be merged into the branch first. Their changes need copying into `13/` (and into `17/` if they apply to v17).
- Push the branch `restructure/v13-v17` to GitHub (`git push origin restructure/v13-v17`) so GitBook can see it if you want to try the setup on the branch first.

## Step 1: create the v13 space

1. In GitBook, open the live space (the UmbCheckout documentation).
2. Open its **Actions menu** (the `⋯` next to its name in the sidebar) and choose **Duplicate**. GitBook copies the content into a new space next to it. Revisions and history aren't copied.
3. Rename the copy **UmbCheckout 13**.
4. Open the copy and check its header. If it shows Git Sync as connected to this repository, disconnect it (GitBook doesn't document whether a duplicate keeps the sync, and two spaces must not sync one folder).

## Step 2: disconnect the live space from the repository root

1. Open the live space, then its Git Sync configuration (the **Git Sync** button in the space header).
2. Disconnect it. The content stays in GitBook. Only the link to the repository is removed.
3. Rename the live space **UmbCheckout 17**.

GitBook doesn't document how to point an existing sync at another folder. Disconnecting and setting it up again (step 4) is the documented route.

## Step 3: merge the branch

Merge `restructure/v13-v17` into `master` and push. Nothing is published yet, because neither space is connected.

**Holding the v13 update pages.** The last commits on the branch start with `v13-update:` and only touch `13/`. They document the v13 update release, which hasn't shipped yet. To publish everything else now, merge the commit just before the first `v13-update:` commit (`git log --oneline` shows them), and merge the rest when v13's update is released.

## Step 4: connect each space to its folder

GitBook has two ways to do this. Use the first if your plan has it, otherwise the second.

### Option A: site Git Sync (one connection for the whole site)

1. Open the docs site (not a space), then **Git Sync** in the site sidebar.
2. Connect GitHub if asked, and under **Source repository** choose `UmbHost/UmbCheckout-Documentation`, branch `master`.
3. **Initial sync direction:** choose **Swap direction** so it reads **GitHub → GitBook**. The repository is the source of truth here.
   - GitBook warns that "GitHub → GitBook can replace your section's content". That's intended: both spaces should become exactly what's in `17/` and `13/`.
   - Double-check the branch is `master` and that the merged branch is on it before you click Sync. An empty folder would empty the space.
4. Leave **Project directory** empty (the repository root).
5. Under **Content mapping**, map:
   - **UmbCheckout 17** → `./17`
   - **UmbCheckout 13** → `./13`
6. Click **Sync**.

GitBook keeps the site's Git Sync settings in a `gitbook-docs.yaml` file at the root of the project directory. If GitBook commits one, keep it. Each space's own settings are in `17/.gitbook.yaml` and `13/.gitbook.yaml` (already there: they name `README.md` and `SUMMARY.md` and, for v17, list redirects). Don't change the `key` of a space in `gitbook-docs.yaml`: GitBook matches spaces by key, and a new key creates a new space.

### Option B: Git Sync per space

Do this for each space in turn: first **UmbCheckout 17** with `17`, then **UmbCheckout 13** with `13`.

1. If the space is in the site's **Content mapping** (option A), remove it there first.
2. Open the space and click **Set up** next to **Git Sync** in its header. Choose **GitHub Sync**, and in the scope step choose **Space Git Sync**.
3. Choose the repository `UmbHost/UmbCheckout-Documentation` and the branch `master`.
4. Set **Project directory** to `17` (or `13`).
5. Choose **GitHub → GitBook** as the initial sync direction (**Swap direction**), for the reasons in option A.
6. Click **Sync**.

From now on an edit in either space commits to `master` in that space's folder only.

## Step 5: add the v13 space to the site as a variant

1. Open the docs site, then **Site structure** in the site sidebar.
2. In the site's section (there's one, holding the live space), click **Add variant** and choose **UmbCheckout 13**.
3. In the variants table, click **Edit** on each row and set:
   - **UmbCheckout 17:** name **UmbCheckout 17**.
   - **UmbCheckout 13:** name **UmbCheckout 13**, slug **v13**. Slugs must be unique across your organisation, so choose another slug if `v13` is taken.
   - Click **Save** each time.
4. On the **UmbCheckout 17** row, open the **Actions menu** and choose **Set as default**, if it isn't already. The default is served at the root with no slug.
5. Publish the site if your plan needs a separate publish step. The version dropdown now shows both labels.

Don't use **New section** for this: sections are tabs for different content, and variants are the documented way to offer versions of the same content.

## Step 6: redirects

**Existing URLs.** The live space keeps its root URLs (step 1 explains why).

**Pages moved or removed in v17.** `17/` keeps every page path of today's docs except one, which has a redirect in `17/.gitbook.yaml` (Git Sync applies it):

| Old URL path | Now |
| ------------ | --- |
| `core-services/database-service` | `core-services/addons/database-service` (the Core database service no longer exists in v17) |

The "Developer License" page keeps its path (`getting-started/developer-license`) with the new title "Development Licenses and Development Mode". Two pages that weren't in the table of contents were deleted (`getting-started/starter-kits/stripe`, an old copy of the starter kit page, and `payment-providers/stripe/object-reference/session`, which was empty).

If you'd rather manage them in the site, add them under site **Settings → Redirects → Add redirect → Manual**, as **Permanent (308)**.

**v13 readers.** Readers who want v13 choose it in the dropdown. If you want an old URL to land on the v13 page instead, add a site redirect from that path to the page in the v13 variant (the page picker keeps working if the page moves later). A trailing `*` with **Replace wildcard with matched text** redirects a whole folder.

**If you change which variant is the default later,** GitBook adds automatic redirects for the variant that moves to the root. Check the URLs of the variant that leaves the root.

## Checks after setup

- [ ] `docs.umbcheckout.net/` opens the v17 home page, with a version dropdown showing "UmbCheckout 17" and "UmbCheckout 13".
- [ ] Choosing "UmbCheckout 13" opens `docs.umbcheckout.net/v13/`.
- [ ] Each space's sidebar matches that folder's `SUMMARY.md`. The images show on the "MetaData Property Editor", "Tax Rates Property Editor" and "Payment Flow / Lifecycle" pages in both versions.
- [ ] `docs.umbcheckout.net/core-services/database-service` redirects to the v17 add-on Database Service page.
- [ ] An edit made in GitBook to the v13 space commits only under `13/` in the repository.

## Sources (GitBook documentation, 2026-10-13)

- Content variants: https://gitbook.com/docs/manage-your-site/site-structure/variants
- Site structure and URLs: https://gitbook.com/docs/manage-your-site/site-structure
- Site sections: https://gitbook.com/docs/manage-your-site/site-structure/site-sections
- Enabling GitHub Sync: https://gitbook.com/docs/docs-as-code/git-sync/enabling-github-sync
- Git Sync with monorepos: https://gitbook.com/docs/docs-as-code/git-sync/monorepos
- Content configuration (`.gitbook.yaml`, redirects): https://gitbook.com/docs/docs-as-code/git-sync/content-configuration
- Syncing a whole site: https://gitbook.com/docs/guides/editing-and-publishing-documentation/how-to-sync-your-entire-docs-site-with-a-git-repository
- Site redirects: https://gitbook.com/docs/publish/site-redirects
- Sections and spaces (duplicating): https://gitbook.com/docs/creating-content/content-structure/space

Not confirmed in GitBook's documentation:
- whether a duplicated space keeps Git Sync (hence step 1.4);
- how to edit an existing sync's folder (hence disconnect and reconnect);
- whether variants need a particular plan (sections need Ultimate);
- the exact name of the folder field in the space-level setup.
