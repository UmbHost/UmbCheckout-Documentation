// MCP server settings shared by astro.config.mjs (build-time corpus and tool catalog)
// and worker/index.ts (the /mcp endpoint).
export const MCP = {
	serverName: 'umbcheckout-docs',
	siteLabel: 'UmbCheckout documentation',
	docsRedirect: '/17/getting-started/ai-assistants/',
	instructions: [
		'UmbCheckout is an eCommerce package for Umbraco CMS built on Stripe Checkout.',
		'Every doc path starts with its version: "17/" is UmbCheckout 17 for Umbraco 17 (the latest),',
		'"13/" is UmbCheckout 1.x for Umbraco 13. Use the version the user\'s site runs;',
		'if it is not known, prefer 17/ and say which version an answer comes from.',
	].join(' '),
};
