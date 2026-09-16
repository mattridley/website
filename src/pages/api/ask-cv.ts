import type { NextApiRequest, NextApiResponse } from "next";
import { cvAsText, searchCv } from "../../lib/cv-data";

const MODEL = "mistral/ministral-8b";
const MAX_QUESTION_LENGTH = 300;
const MAX_OUTPUT_TOKENS = 320;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const question = String(req.body?.question || "").trim().slice(0, MAX_QUESTION_LENGTH);
  if (!question) return res.status(400).json({ error: "Please ask a question." });

  const matches = searchCv(question);
  const context = matches.length
    ? matches.map((match) => `${match.title}\n${match.text}`).join("\n\n")
    : cvAsText();

  try {
    // Runtime require keeps the current legacy TypeScript toolchain isolated from
    // the modern AI SDK's type surface. On Vercel, model strings authenticate to
    // AI Gateway using the deployment's OIDC credentials automatically.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { generateText } = require("ai");

    const { text } = await generateText({
      model: MODEL,
      system:
        "Answer questions about Matt Ridley's professional experience using only the CV evidence below. Be concise, specific and factual. Prefer concrete evidence and outcomes. Do not invent or infer unsupported experience. If the evidence does not answer the question, say so clearly.\n\nCV evidence:\n" +
        context,
      prompt: question,
      temperature: 0.2,
      maxOutputTokens: MAX_OUTPUT_TOKENS,
    });

    if (!text) return res.status(502).json({ error: "No answer was returned." });

    return res.status(200).json({ answer: text, model: MODEL });
  } catch (error) {
    console.error("CV assistant error", error);
    return res.status(500).json({ error: "The CV assistant is temporarily unavailable." });
  }
}
