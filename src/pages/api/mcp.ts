import type { NextApiRequest, NextApiResponse } from "next";
import { cv, cvAsText, searchCv } from "../../lib/cv-data";

const tools = [
  {
    name: "search_cv",
    description: "Search Matt Ridley's CV for relevant experience, skills, technologies and achievements.",
    inputSchema: {
      type: "object",
      properties: { query: { type: "string", description: "What to look for in the CV" } },
      required: ["query"],
    },
  },
  {
    name: "get_cv",
    description: "Return Matt Ridley's full public CV text.",
    inputSchema: { type: "object", properties: {} },
  },
];

function result(id: unknown, value: unknown) {
  return { jsonrpc: "2.0", id, result: value };
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "content-type,mcp-protocol-version,mcp-method,mcp-name,mcp-session-id");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("MCP-Protocol-Version", "2026-07-28");
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST for MCP requests." });

  const body = req.body || {};
  const { id, method, params } = body;

  if (method === "server/discover") {
    return res.status(200).json(result(id, {
      protocolVersion: "2026-07-28",
      serverInfo: { name: "matt-ridley-cv", version: "1.0.0" },
      capabilities: { tools: {}, resources: {} },
    }));
  }

  if (method === "initialize") {
    res.setHeader("Mcp-Session-Id", "matt-ridley-cv-stateless");
    return res.status(200).json(result(id, {
      protocolVersion: params?.protocolVersion || "2025-11-25",
      serverInfo: { name: "matt-ridley-cv", version: "1.0.0" },
      capabilities: { tools: {}, resources: {} },
    }));
  }

  if (method === "notifications/initialized") return res.status(204).end();
  if (method === "ping") return res.status(200).json(result(id, {}));

  if (method === "tools/list") {
    return res.status(200).json(result(id, { tools, _meta: { ttlMs: 3600000 } }));
  }

  if (method === "tools/call") {
    const name = params?.name;
    if (name === "get_cv") {
      return res.status(200).json(result(id, { content: [{ type: "text", text: cvAsText() }] }));
    }
    if (name === "search_cv") {
      const query = String(params?.arguments?.query || "").slice(0, 300);
      const matches = searchCv(query);
      return res.status(200).json(result(id, {
        content: [{ type: "text", text: matches.length ? JSON.stringify(matches, null, 2) : "No directly matching CV sections found." }],
        structuredContent: { matches },
      }));
    }
    return res.status(200).json(result(id, { content: [{ type: "text", text: `Unknown tool: ${name}` }], isError: true }));
  }

  if (method === "resources/list") {
    return res.status(200).json(result(id, {
      resources: [{ uri: "cv://matt-ridley/full", name: "Matt Ridley CV", description: cv.headline, mimeType: "text/plain" }],
    }));
  }

  if (method === "resources/read" && params?.uri === "cv://matt-ridley/full") {
    return res.status(200).json(result(id, { contents: [{ uri: params.uri, mimeType: "text/plain", text: cvAsText() }] }));
  }

  return res.status(200).json({ jsonrpc: "2.0", id, error: { code: -32601, message: `Method not found: ${method}` } });
}
