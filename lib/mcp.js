import { createMCPClient } from '@ai-sdk/mcp';

const SERVER_URL = process.env.EARTH_DATA_MCP_URL;

let connection = null;

function reset() {
  connection = null;
}

// Tools are discovered at run time; adding one to the server needs no change here.
async function connect() {
  if (!SERVER_URL) {
    throw new Error(
      'EARTH_DATA_MCP_URL is not set. Point it at an earth-data-mcp instance, ' +
        'e.g. https://earth-data-mcp.vercel.app/mcp',
    );
  }

  const client = await createMCPClient({
    transport: {
      type: 'http',
      url: SERVER_URL,
      // A forgotten session 404s; drop the cached client rather than keep it.
      onSessionExpired: reset,
    },
    // Transport hiccups only; application errors are not retried. Safe because
    // every tool is a read.
    maxRetries: 2,
    onUncaughtError: (error) => {
      console.error('earth-data MCP client error:', error);
      reset();
    },
    clientName: 'earth-data-chat',
  });

  return { tools: await client.tools(), instructions: client.instructions };
}

export function allTools() {
  connection ??= connect().catch((error) => {
    reset(); // let the next request retry
    throw error;
  });
  return connection;
}
