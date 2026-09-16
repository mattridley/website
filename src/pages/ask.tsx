import Head from "next/head";
import { FormEvent, useState } from "react";
import Header from "../components/header";

const examples = [
  "What experience does Matt have with MCP and agentic systems?",
  "What enterprise integration experience does Matt have?",
  "What measurable outcomes has Matt delivered?",
  "Has Matt managed engineering teams?",
];

export default function AskCv() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function ask(event?: FormEvent) {
    event?.preventDefault();
    if (!question.trim() || loading) return;

    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const response = await fetch("/api/ask-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to answer that question.");
      setAnswer(data.answer);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to answer that question.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Ask my CV | Matt Ridley</title>
        <meta name="description" content="Ask questions about Matt Ridley's engineering leadership, connectivity, platform and agentic systems experience." />
      </Head>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Header />
        <main className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">AI + MCP</p>
          <h1 className="mt-4 text-4xl font-bold text-gray-900 sm:text-5xl">Ask my CV</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-700">
            Ask a focused question about my experience. Answers are generated from the same structured CV data exposed through my public MCP server, and are constrained to what the CV actually supports.
          </p>

          <form className="mt-10 border border-gray-300 bg-white p-6" onSubmit={ask}>
            <label className="block text-sm font-semibold text-gray-800" htmlFor="question">Question</label>
            <textarea
              id="question"
              className="mt-3 min-h-[120px] w-full border border-gray-300 p-4 text-base leading-7 outline-none focus:border-blue-700"
              maxLength={300}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="e.g. What experience does Matt have building enterprise integrations?"
              value={question}
            />
            <div className="mt-4 flex items-center justify-between gap-4">
              <p className="text-xs text-gray-500">One question at a time · 300 character limit · short answers by design</p>
              <button
                className="border border-gray-900 bg-gray-900 px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!question.trim() || loading}
                type="submit"
              >
                {loading ? "Asking…" : "Ask my CV"}
              </button>
            </div>
          </form>

          <div className="mt-6 flex flex-wrap gap-2">
            {examples.map((example) => (
              <button
                className="border border-gray-300 bg-white px-3 py-2 text-left text-sm text-gray-700 hover:border-gray-900"
                key={example}
                onClick={() => setQuestion(example)}
                type="button"
              >
                {example}
              </button>
            ))}
          </div>

          {answer && (
            <section className="mt-8 border-l-4 border-blue-700 bg-white p-6">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500">Answer</h2>
              <p className="mt-4 whitespace-pre-wrap text-base leading-7 text-gray-800">{answer}</p>
            </section>
          )}

          {error && <p className="mt-8 border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</p>}

          <section className="mt-14 border-t border-gray-200 pt-10">
            <h2 className="text-2xl font-bold">Use the CV as an MCP server</h2>
            <p className="mt-4 text-base leading-7 text-gray-700">
              The same CV is exposed as a stateless MCP endpoint for compatible clients. It provides <code>search_cv</code> and <code>get_cv</code> tools plus a full CV resource, without invoking a model on the server.
            </p>
            <div className="mt-5 overflow-x-auto border border-gray-300 bg-gray-900 p-4 font-mono text-sm text-gray-100">
              /api/mcp
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
