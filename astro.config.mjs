// @ts-check
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import rehypeExternalLinks from 'rehype-external-links';
import { versions, latestVersion } from './versions.mjs';

const SITE = 'https://docs.umbcheckout.net';
const ROOT = fileURLToPath(new URL('./', import.meta.url));

/** Page file (relative to the repo root, e.g. 17/x.md) to site URL path. README.md is a folder index. */
function pageUrl(rel) {
	const p = rel
		.replace(/\\/g, '/')
		.replace(/\.mdx?$/, '')
		.replace(/(^|\/)README$/i, '$1')
		.replace(/\/$/, '');
	return p === '' ? '/' : '/' + p + '/';
}

/**
 * Builds a version's sidebar from its SUMMARY.md: `## Section` headings become groups,
 * nested bullets become items, and a bullet with children becomes a subgroup
 * whose first item is the bullet's own page.
 */
function sidebarFromSummary(version) {
	const dir = version.folder.replace(/^\.\//, '');
	const lines = fs.readFileSync(path.join(ROOT, dir, 'SUMMARY.md'), 'utf8').split(/\r?\n/);
	const root = [];
	let section = null;
	let stack = [];
	for (const line of lines) {
		const heading = line.match(/^##\s+(.*)$/);
		if (heading) {
			section = { label: heading[1].trim(), items: [] };
			root.push(section);
			stack = [];
			continue;
		}
		const bullet = line.match(/^(\s*)[*-]\s+\[([^\]]+)\]\(([^)]+)\)/);
		if (!bullet) continue;
		const indent = bullet[1].length;
		const external = /^[a-z][a-z0-9+.-]*:/i.test(bullet[3]);
		const item = {
			label: bullet[2].trim(),
			link: external ? bullet[3] : pageUrl(dir + '/' + bullet[3]),
			external,
			children: [],
		};
		while (stack.length && stack[stack.length - 1].indent >= indent) stack.pop();
		const parent = stack.length ? stack[stack.length - 1].node : null;
		if (parent) parent.children.push(item);
		else if (section) section.items.push(item);
		else root.push(item);
		stack.push({ indent, node: item });
	}
	const convert = (n) => {
		if (n.items) return { label: n.label, collapsed: false, items: n.items.map(convert) };
		if (!n.children.length)
			return n.external
				? { label: n.label, link: n.link, attrs: { target: '_blank', rel: 'noopener noreferrer' } }
				: { label: n.label, link: n.link };
		return {
			label: n.label,
			collapsed: true,
			items: [{ label: 'Overview', link: n.link }, ...n.children.map(convert)],
		};
	};
	return root.map(convert);
}

/** Resolves relative links to other pages (written as x.md so they work on GitHub too) to site URLs. */
function remarkPageLinks() {
	return (tree, file) => {
		const from = path.relative(ROOT, file.path ?? '').replace(/\\/g, '/');
		const walk = (node) => {
			if (node.type === 'link' && !/^([a-z][a-z0-9+.-]*:|#|\/)/i.test(node.url)) {
				const [target, hash] = node.url.split('#');
				if (/\.mdx?$/.test(target) || target.endsWith('/')) {
					const abs = path.posix.normalize(path.posix.join(path.posix.dirname(from), target));
					const rel = target.endsWith('/') ? abs.replace(/\/?$/, '/README.md') : abs;
					node.url = pageUrl(rel) + (hash ? '#' + hash : '');
				}
			}
			if (node.children) node.children.forEach(walk);
		};
		walk(tree);
	};
}

/** Every page file in a version folder, relative to the repo root (e.g. 17/x/README.md). */
function versionPages(version) {
	const dir = version.folder.replace(/^\.\//, '');
	return fs
		.readdirSync(path.join(ROOT, dir), { recursive: true })
		.map((f) => dir + '/' + String(f).replace(/\\/g, '/'))
		.filter((f) => /\.mdx?$/.test(f) && !f.endsWith('/SUMMARY.md'));
}

/**
 * The GitBook site served the latest version without a version in the URL (/getting-started/installation),
 * v13 under /v13/, and kept GitBook redirects for moved pages. Those URLs keep working.
 */
const GITBOOK_REDIRECTS = {
	'core-services/database-service': 'core-services/addons/database-service/',
};

function redirectRules() {
	const v = latestVersion.id;
	const rules = [`/ /${v}/ 302`];
	for (const page of versionPages(latestVersion)) {
		const url = pageUrl(page);
		const old = url.slice(v.length + 1).replace(/\/$/, '');
		if (old === '') continue;
		rules.push(`${old} ${url} 301`, `${old}/ ${url} 301`);
	}
	for (const [from, to] of Object.entries(GITBOOK_REDIRECTS)) {
		rules.push(`/${from} /${v}/${to} 301`, `/${from}/ /${v}/${to} 301`);
	}
	rules.push('/v13 /13/ 301', '/v13/* /13/:splat 301');
	return rules;
}

export default defineConfig({
	site: SITE,
	output: 'static',
	// The root has no page of its own: send it to the latest version.
	redirects: { '/': `/${latestVersion.id}/` },
	markdown: {
		remarkPlugins: [remarkPageLinks],
		rehypePlugins: [
			[rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
		],
	},
	integrations: [
		starlight({
			title: 'UmbCheckout Documentation',
			titleDelimiter: '-',
			markdown: { processedDirs: versions.map((v) => v.folder) },
			// GitBook pages tag Razor views as cshtml.
			expressiveCode: { shiki: { langAlias: { cshtml: 'razor' } } },
			favicon: '/favicon.ico',
			logo: {
				src: './src/assets/umbhost-logo-no-slogon.svg',
				replacesTitle: true,
			},
			customCss: [
				'./src/styles/brand/fonts.css',
				'./src/styles/brand/colors.css',
				'./src/styles/brand/buttons.css',
				'./src/styles/custom.css',
			],
			components: {
				MarkdownContent: './src/overrides/MarkdownContent.astro',
				SocialIcons: './src/overrides/SocialIcons.astro',
				Pagination: './src/overrides/Pagination.astro',
				Footer: './src/overrides/Footer.astro',
			},
			social: [
				{ icon: 'external', label: 'umbhost.net', href: 'https://umbhost.net' },
				{ icon: 'x.com', label: 'X (Twitter)', href: 'https://twitter.com/UmbHost' },
				{ icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/umbhost/' },
				{ icon: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/UmbHost' },
				{ icon: 'mastodon', label: 'Mastodon', href: 'https://umbracocommunity.social/@UmbHost' },
				{ icon: 'blueSky', label: 'Bluesky', href: 'https://bsky.app/profile/umbhost.net' },
			],
			head: [{ tag: 'link', attrs: { rel: 'sitemap', href: '/sitemap-index.xml' } }],
			// One group per version; src/routeData.ts shows only the current version's entries.
			sidebar: versions.map((v) => ({ label: v.id, items: sidebarFromSummary(v) })),
			routeMiddleware: './src/routeData.ts',
		}),
		sitemap(),
		{
			// Cloudflare serves _redirects for static assets: a real redirect beats the HTML redirect page.
			name: 'redirects',
			hooks: {
				'astro:build:done': ({ dir }) => {
					fs.writeFileSync(path.join(fileURLToPath(dir), '_redirects'), redirectRules().join('\n') + '\n');
				},
			},
		},
	],
});
