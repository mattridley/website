import { toNodeHandler } from "@modelcontextprotocol/node";
import { createMcpHandler, McpServer } from "@modelcontextprotocol/server";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { cvAsText, searchCv } from "../../lib/cv-data";

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
          query: z
            .string()
            .min(1)
            .max(300)
            .describe("What to look for in Matt Ridley's CV"),
        }),
      },
      async ({ query }) => {
        const matches = searchCv(query);
        return {
          content: [
            {
              type: "text" as const,
              text: matches.length
                ? matches
                    .map((match) => `${match.title}\n${match.text}`)
                    .join("\n\n")
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
        content: [{ type: "text" as const, text: cvAsText() }],
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
      async (uri) => ({
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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  void nodeHandler(req, res);
}
