import Head from "next/head";
import Header from "../components/header";

const impactHighlights = [
  {
    value: "7%",
    label: "BGP test revenue increase in the first month after launch",
  },
  {
    value: "$10m",
    label: "Blink revenue supported through early GTM solutions engineering",
  },
  {
    value: "13.3%",
    label: "reduction in customer reported bugs through frontend quality work",
  },
];

const roles = [
  {
    title: "Software Engineering Technical Leader",
    company: "Cisco ThousandEyes",
    dates: "June 2024 - Present",
    summary:
      "Leading complex full-stack BGP features, technical architecture, AI-first development practices, and cross-team frontend quality improvements.",
  },
  {
    title: "Lead Software Engineer",
    company: "Vorboss",
    dates: "April 2023 - June 2024",
    summary:
      "Managed a team of 8 full-stack product engineers building fibre planning, build, and network operations software for fast service delivery.",
  },
  {
    title: "Head of Solutions Engineering",
    company: "Blink",
    dates: "May 2019 - April 2023",
    summary:
      "Built global pre-sales and professional services teams, led strategic customer work, and supported growth through major enterprise integrations.",
  },
  {
    title: "Full Stack Developer and Development Lead",
    company: "Blink / RBC Capital Markets",
    dates: "2011 - 2019",
    summary:
      "Built product features, shared libraries, cloud infrastructure, authentication, reporting dashboards, and graph-backed architecture tooling.",
  },
];

const technologies = [
  "TypeScript",
  "React",
  "Vue.js",
  "Next.js",
  "Node.js",
  "Kotlin",
  "Spring Boot",
  "GraphQL",
  "Kafka",
  "Postgres",
  "MySQL",
  "Neo4j",
  "Elasticsearch",
  "ClickHouse",
  "AWS",
  "OpenTelemetry",
];

export default function Index() {
  return (
    <>
      <Head>
        <title>Matt Ridley | Engineering Leader</title>
        <meta
          name="description"
          content="Matt Ridley is a product-focused engineering leader building high-quality software teams, network observability products, and AI-assisted engineering workflows."
        />
      </Head>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Header />
        <main>
          <section className="border-b border-gray-200 bg-white">
            <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24 lg:px-8">
              <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-blue-700">
                Product-focused engineering leader
              </p>
              <div className="grid gap-12 lg:grid-cols-3 lg:items-end">
                <div className="lg:col-span-2">
                  <h1 className="max-w-4xl text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
                    I build teams and software systems that turn complex
                    technical domains into useful products.
                  </h1>
                  <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-700">
                    I am a commercially minded technical leader with experience
                    across network observability, fibre operations, enterprise
                    SaaS, integrations, AI-assisted delivery, and full-stack
                    product engineering.
                  </p>
                </div>
                <div className="border-l-4 border-blue-700 bg-gray-50 p-6">
                  <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                    Current focus
                  </p>
                  <p className="mt-3 text-base leading-7 text-gray-700">
                    Cisco ThousandEyes technical leadership, BGP product
                    delivery, AI-first development practices, and engineering
                    quality at scale.
                  </p>
                </div>
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  className="inline-flex items-center border border-gray-900 bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-700"
                  href="https://reportsmaster.ridley.dev"
                  rel="noreferrer"
                  target="_blank"
                >
                  View Reports Master
                </a>
                <a
                  className="inline-flex items-center border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 hover:border-gray-900"
                  href="https://github.com/mattridley/reports-master"
                  rel="noreferrer"
                  target="_blank"
                >
                  GitHub project
                </a>
                <a
                  className="inline-flex items-center border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 hover:border-gray-900"
                  href="https://www.linkedin.com/in/mattcrdley"
                  rel="noreferrer"
                  target="_blank"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </section>

          <section className="border-b border-gray-200 bg-gray-100">
            <div className="mx-auto grid max-w-6xl gap-4 px-6 py-10 lg:grid-cols-3 lg:px-8">
              {impactHighlights.map((highlight) => (
                <div
                  className="border border-gray-300 bg-white p-6"
                  key={highlight.value}
                >
                  <p className="text-3xl font-bold text-gray-900">
                    {highlight.value}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {highlight.label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white">
            <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-5 lg:px-8">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  Experience
                </h2>
                <p className="mt-4 text-base leading-7 text-gray-700">
                  I work best where product judgement, delivery discipline, and
                  technical depth all matter. Recent work spans BGP onboarding,
                  alert automation, agentic development workflows, and quality
                  practices that help teams ship with confidence.
                </p>
              </div>
              <div className="space-y-6 lg:col-span-3">
                {roles.map((role) => (
                  <article
                    className="border-t border-gray-200 pt-6"
                    key={`${role.company}-${role.title}`}
                  >
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {role.title}
                      </h3>
                      <p className="text-sm font-medium text-gray-500">
                        {role.dates}
                      </p>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-blue-700">
                      {role.company}
                    </p>
                    <p className="mt-3 text-base leading-7 text-gray-700">
                      {role.summary}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="border-t border-b border-gray-200 bg-gray-50">
            <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-2 lg:px-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Featured project
                </h2>
                <p className="mt-4 text-base leading-7 text-gray-700">
                  Reports Master is my new project for educators preparing
                  student reports, built to make drafting, reviewing, and
                  refining high-quality report comments faster and more
                  consistent.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    className="inline-flex items-center border border-gray-900 bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-700"
                    href="https://reportsmaster.ridley.dev"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Open Reports Master
                  </a>
                  <a
                    className="inline-flex items-center border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 hover:border-gray-900"
                    href="https://github.com/mattridley/reports-master"
                    rel="noreferrer"
                    target="_blank"
                  >
                    View on GitHub
                  </a>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Technologies
                </h2>
                <div className="mt-5 flex flex-wrap gap-2">
                  {technologies.map((technology) => (
                    <span
                      className="border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700"
                      key={technology}
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white">
            <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 lg:grid-cols-3 lg:px-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Certifications
                </h2>
                <p className="mt-4 text-base leading-7 text-gray-700">
                  AWS Certified Solutions Architect Associate, January 2026.
                  Neo4j Certified Professional, June 2023.
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Education</h2>
                <p className="mt-4 text-base leading-7 text-gray-700">
                  Systems Engineering, BEng (Hons), Loughborough University.
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Community</h2>
                <p className="mt-4 text-base leading-7 text-gray-700">
                  BCS My Digital Future coach, Formula Student marshal, BCS
                  member, and former RSPCA Bedfordshire South trustee and Chair
                  of Trustees.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
