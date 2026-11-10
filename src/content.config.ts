import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { versions } from '../versions.mjs';

// Pages live in one folder per version (17/, 18/, ...), not src/content/docs, so
// the folder layout other tooling reads stays put. Ids are prefixed with the
// version (17/extending/...), which becomes the URL. README.md is a folder index.
const folders = versions.map((v) => v.folder.replace(/^\.\//, ''));

export const collections = {
	docs: defineCollection({
		loader: glob({
			base: '.',
			pattern: [...folders.map((f) => `${f}/**/*.{md,mdx}`), '!**/SUMMARY.md'],
			generateId: ({ entry }) =>
				entry
					.replace(/\.mdx?$/, '')
					.replace(/(^|\/)README$/i, '$1index')
					.replace(/\/$/, '') || 'index',
		}),
		schema: docsSchema(),
	}),
};
