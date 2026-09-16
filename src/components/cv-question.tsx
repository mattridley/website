import { FormEvent, useState } from "react";

const examples = [
  "What has Matt built with MCP?",
  "Has Matt managed engineering teams?",
  "What enterprise integration experience does Matt have?",
];

export default function CvQuestion() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function ask(event: FormEvent) {
    event.preventDefault();
    if (!question.trim() || loading) return;

    setLoading(true);
    setAnswer("");
    setError("");

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
    <div className="mt-8 max-w-3xl" id="ask-cv">
      <form onSubmit={ask}>
        <div className="prompt-ring relative overflow-hidden rounded-2xl p-[2px] shadow-lg shadow-blue-900/10">
          <div className="relative z-10 flex items-center gap-3 rounded-[14px] bg-white px-4 py-3 sm:px-5">
            <span aria-hidden="true" className="text-lg text-gray-400">✦</span>
            <input
              aria-label="Ask my CV"
              className="min-w-0 flex-1 bg-transparent py-2 text-base text-gray-900 outline-none placeholder:text-gray-400"
              maxLength={300}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ask my CV anything…"
              value={question}
            />
            <button
              aria-label="Ask question"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-lg font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={!question.trim() || loading}
              type="submit"
            >
              {loading ? "…" : "→"}
            </button>
          </div>
        </div>
      </form>

      {!answer && !error && (
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500">
          <span>Try:</span>
          {examples.map((example) => (
            <button
              className="hover:text-gray-900 hover:underline"
              key={example}
              onClick={() => setQuestion(example)}
              type="button"
            >
              {example}
            </button>
          ))}
        </div>
      )}

      {answer && (
        <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-5 text-sm leading-7 text-gray-700 shadow-sm">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">From my CV</p>
          <p className="whitespace-pre-wrap">{answer}</p>
        </div>
      )}

      {error && (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</p>
      )}

      <style jsx>{`
        .prompt-ring::before {
          animation: cv-gradient-spin 5s linear infinite;
          background: conic-gradient(
            from 0deg,
            #2563eb,
            #7c3aed,
            #db2777,
            #ea580c,
            #059669,
            #2563eb
          );
          content: "";
          height: 420%;
          left: -160%;
          position: absolute;
          top: -160%;
          width: 420%;
        }

        @keyframes cv-gradient-spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .prompt-ring::before {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
