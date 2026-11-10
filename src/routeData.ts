import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import { versions } from '../versions.mjs';

// The configured sidebar holds one group per version. Show only the entries of
// the version being read, so each version keeps its own sidebar.
export const onRequest = defineRouteMiddleware((context) => {
	const route = context.locals.starlightRoute;
	const version = versions.find((v) => route.id === v.id || route.id.startsWith(v.id + '/'));
	if (!version) return;
	const group = route.sidebar.find((e) => e.type === 'group' && e.label === version.id);
	if (group && group.type === 'group') route.sidebar = group.entries;
});
