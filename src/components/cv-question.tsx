import { FormEvent, useState } from "react";
import ReactMarkdown from "react-markdown";

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

  async function ask(event: FormEvent<HTMLFormElement>) {
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
      if (!response.ok) {
        throw new Error(data.error || "Unable to answer that question.");
      }
      setAnswer(data.answer);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to answer that question."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8 max-w-3xl" id="ask-cv">
      <form onSubmit={ask}>
        <div className="prompt-ring rounded-2xl p-[2px] shadow-lg shadow-blue-900/10">
          <div className="flex items-center gap-3 rounded-[14px] bg-white px-4 py-3 sm:px-5">
            <span aria-hidden="true" className="text-lg text-gray-400">
              ✦
            </span>
            <input
              aria-label="Explore my experience"
              className="min-w-0 flex-1 bg-transparent py-2 text-base text-gray-900 outline-none placeholder:text-gray-400"
              maxLength={300}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Explore my experience…"
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
        <div className="mt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
            Try an example
          </p>
          <div className="flex flex-wrap gap-2">
            {examples.map((example) => (
              <button
                className="border border-gray-300 bg-white px-3 py-2 text-left text-xs font-medium text-gray-700 transition hover:border-blue-700 hover:text-blue-700 focus:border-blue-700 focus:outline-none"
                key={example}
                onClick={() => setQuestion(example)}
                type="button"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      )}

      {answer && (
        <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-5 text-sm leading-7 text-gray-700 shadow-sm">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
            From my experience
          </p>
          <ReactMarkdown
            components={{
              a: ({ children, href }) => (
                <a
                  className="font-medium text-blue-700 underline hover:text-blue-900"
                  href={href}
                  rel="noreferrer"
                  target="_blank"
                >
                  {children}
                </a>
              ),
              h1: ({ children }) => (
                <h3 className="mb-2 mt-4 text-base font-bold text-gray-900 first:mt-0">
                  {children}
                </h3>
              ),
              h2: ({ children }) => (
                <h3 className="mb-2 mt-4 text-base font-bold text-gray-900 first:mt-0">
                  {children}
                </h3>
              ),
              h3: ({ children }) => (
                <h3 className="mb-2 mt-4 font-semibold text-gray-900 first:mt-0">
                  {children}
                </h3>
              ),
              ol: ({ children }) => (
                <ol className="my-2 list-decimal space-y-1 pl-5">{children}</ol>
              ),
              p: ({ children }) => <p className="my-2 first:mt-0 last:mb-0">{children}</p>,
              strong: ({ children }) => (
                <strong className="font-semibold text-gray-900">{children}</strong>
              ),
              ul: ({ children }) => (
                <ul className="my-2 list-disc space-y-1 pl-5">{children}</ul>
              ),
            }}
          >
            {answer}
          </ReactMarkdown>
        </div>
      )}

      {error && (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {error}
        </p>
      )}

      <style jsx>{`
        .prompt-ring {
          animation: cv-gradient-flow 5s linear infinite;
          background: linear-gradient(
            90deg,
            #2563eb,
            #7c3aed,
            #db2777,
            #ea580c,
            #059669,
            #2563eb,
            #7c3aed,
            #db2777,
            #ea580c,
            #059669,
            #2563eb
          );
          background-size: 200% 100%;
        }

        @keyframes cv-gradient-flow {
          to {
            background-position: -100% 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .prompt-ring {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
