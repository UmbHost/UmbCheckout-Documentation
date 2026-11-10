---
title: Using AI Assistants
description: Search these docs from Claude, Cursor, VS Code and other AI assistants
---

These docs can be searched straight from an AI assistant, so it answers from the current documentation instead of from memory.

### Connect the MCP server

The docs have an [MCP](https://modelcontextprotocol.io) server at `https://docs.umbcheckout.net/mcp`. It gives your assistant three tools: search the docs, read a page, and list every page.

Every page path starts with its version: `17/` is UmbCheckout 17 for Umbraco 17, and `13/` is UmbCheckout 1.x for Umbraco 13. Tell your assistant which version your site runs.

**Claude Code**

```bash
claude mcp add --transport http umbcheckout-docs https://docs.umbcheckout.net/mcp
```

**Cursor** (`.cursor/mcp.json`) and other clients that take a URL

```json
{
  "mcpServers": {
    "umbcheckout-docs": { "url": "https://docs.umbcheckout.net/mcp" }
  }
}
```

**VS Code** (`.vscode/mcp.json`)

```json
{
  "servers": {
    "umbcheckout-docs": { "type": "http", "url": "https://docs.umbcheckout.net/mcp" }
  }
}
```

The list of tools is at [`/mcp-schema.json`](https://docs.umbcheckout.net/mcp-schema.json).

### Plain-text versions of the docs

For tools that read a file rather than connect to a server, the docs are also published as plain text, following [llms.txt](https://llmstxt.org/):

- [`/llms.txt`](https://docs.umbcheckout.net/llms.txt): what the docs cover, with links to the files below.
- [`/llms-full.txt`](https://docs.umbcheckout.net/llms-full.txt): every page of both versions.
- [`/llms-small.txt`](https://docs.umbcheckout.net/llms-small.txt): the same, shortened.
- One file per version, linked from `/llms.txt`.
