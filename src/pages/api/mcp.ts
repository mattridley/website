import type { NextApiRequest, NextApiResponse } from "next";
import { cvAsText, searchCv } from "../../lib/cv-data";

// This project is intentionally still on an older Next.js/TypeScript toolchain.
// Runtime require() keeps the official MCP v2 SDK isolated from the legacy compiler
// while still using the supported server and Node adapter at runtime.
const { createMcpHandler, McpServer } = require("@modelcontextprotocol/server");
const { toNodeHandler } = require("@modelcontextprotocol/node");
const z = require("zod/v4");

const mcp = createMcpHandler(
  () => {
    const server = new McpServer({
      name: "matt-ridley-cv",
      version: "1.0.0",
    });

    server.registerTool(
      "search_cv",
      {
        description:
          "Search Matt Ridley's public CV for relevant experience, skills, technologies and achievements.",
        inputSchema: z.object({
          query: z.string().min(1).max(300).describe("What to look for in Matt Ridley's CV"),
        }),
      },
      async ({ query }: { query: string }) => {
        const matches = searchCv(query);
        return {
          content: [
            {
              type: "text",
              text: matches.length
                ? matches.map((match) => `${match.title}\n${match.text}`).join("\n\n")
                : "No directly matching CV sections were found.",
            },
          ],
          structuredContent: { matches },
        };
      }
    );

    server.registerTool(
      "get_cv",
      {
        description: "Return Matt Ridley's complete public CV as plain text.",
      },
      async () => ({
        content: [{ type: "text", text: cvAsText() }],
      })
    );

    server.registerResource(
      "matt-ridley-cv",
      "cv://matt-ridley/full",
      {
        title: "Matt Ridley CV",
        description: "Matt Ridley's complete public professional CV",
        mimeType: "text/plain",
      },
      async (uri: URL) => ({
        contents: [
          {
            uri: uri.href,
            mimeType: "text/plain",
            text: cvAsText(),
          },
        ],
      })
    );

    return server;
  },
  { responseMode: "json" }
);

const nodeHandler = toNodeHandler(mcp);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  void nodeHandler(req, res);
}
