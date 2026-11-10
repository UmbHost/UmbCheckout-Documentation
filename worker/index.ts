import { createStaticMcpWorker } from 'starlight-mcp/cloudflare';
import { MCP } from '../mcp.config.mjs';

// The site is static. This Worker only runs for /mcp (run_worker_first in wrangler.jsonc)
// and answers from the corpus the starlight-mcp integration writes at /mcp/docs-index.json.
export default createStaticMcpWorker(MCP);
