export type CvRole = {
  title: string;
  company: string;
  dates: string;
  summary: string;
  highlights: string[];
  technologies?: string[];
};

export const cv = {
  name: "Matt Ridley",
  headline: "Engineering Leader | Platform, Connectivity & Agentic Systems",
  profile:
    "Commercially minded, product-focused engineering leader with 15 years of experience across engineering management, platforms, enterprise integrations, authentication and customer-facing delivery. Currently Technical Lead for ThousandEyes Agentic Systems Engineering, running the team responsible for the internal agent runtime and Agentic SDLC. Hands-on with MCP, including proxy architecture and tool development, alongside experience building and managing teams and driving adoption of shared platforms across distributed organisations.",
  strengths: [
    "Engineering management & coaching",
    "MCP & agent runtimes",
    "Agentic SDLC",
    "OAuth 2.0 & SAML 2.0",
    "Enterprise integrations",
    "Platform & distributed systems",
    "Cross-org / cross-region delivery",
    "APIs & event-driven architecture",
  ],
  roles: [
    {
      title: "Software Engineering Technical Leader",
      company: "Cisco ThousandEyes",
      dates: "June 2024 – Present",
      summary:
        "Technical Lead for Agentic Systems Engineering, responsible for the internal agent runtime and Agentic SDLC, with prior ownership of complex full-stack BGP capabilities.",
      highlights: [
        "Runs the Agentic Systems Engineering team and drives adoption of the internal agent runtime across ThousandEyes and Cisco.",
        "Owns key parts of the MCP architecture, including an MCP proxy that keeps MCP credentials out of agent runtime environments.",
        "Leads internal education and example implementations around Codex, Agent Skills and agentic development practices.",
        "Previously led BGP Easy Onboarding, automating test and alert-rule creation and contributing to a 7% increase in BGP test revenue in its first month.",
        "Drove quality and infrastructure work that reduced customer-reported bugs by 13.3% and BGP COGS by $52k per year.",
      ],
      technologies: ["MCP", "Vue.js", "TypeScript", "Kotlin", "Spring Boot", "Kafka", "Elasticsearch", "MySQL", "ClickHouse"],
    },
    {
      title: "Lead Software Engineer",
      company: "Vorboss",
      dates: "April 2023 – June 2024",
      summary:
        "Led and managed a team of eight full-stack product engineers building fibre planning, build and network-management software.",
      highlights: [
        "Owned the roadmap for Fibre Build, Planning and Network Management software with senior business stakeholders.",
        "Acted as technical design authority for mission-critical fibre planning, build and network operations systems.",
        "Built fibre-route visualisation, network maps, test and device data, helping enable service delivery in two weeks versus typical industry timelines of 8–12 weeks.",
      ],
      technologies: ["React", "TypeScript", "Node.js", "GraphQL", "Neo4j", "Postgres", "OpenTelemetry"],
    },
    {
      title: "Head of Solutions Engineering",
      company: "Blink",
      dates: "May 2019 – April 2023",
      summary:
        "Built and led a global Solutions Engineering team spanning pre-sales and professional-services engineering while working directly with major enterprise customers.",
      highlights: [
        "Before building the team, owned Blink integrations end-to-end from customer requirements through design and delivery.",
        "Built enterprise connectivity across SCIM, SAML and OAuth plus API integrations into Workday, Google and other enterprise systems.",
        "Turned early customer integration work into a reusable library of integrations and connectivity patterns.",
        "Led design, delivery and certification of the Workday integration associated with Blink's $20m Series A.",
      ],
      technologies: ["React", "Next.js", "TypeScript", "Scala", "MySQL", "Node.js", "Redis"],
    },
    {
      title: "Full Stack Developer",
      company: "Blink",
      dates: "July 2015 – May 2019",
      summary:
        "Built product capabilities end-to-end across application and AWS infrastructure.",
      highlights: [
        "Built core enterprise identity and provisioning capabilities including OAuth 2.0, SAML 2.0 and SCIM, alongside APIs used by Blink's integration ecosystem.",
        "Developed shared component and data-layer libraries used across multiple web applications.",
      ],
      technologies: ["JavaScript", "Node.js", "React", "AWS", "PHP", "Scala"],
    },
    {
      title: "Development Lead – Architecture Team",
      company: "RBC Capital Markets",
      dates: "March 2013 – July 2015",
      summary:
        "Led development of a single-pane-of-glass architecture platform tracking real-time data flows across the bank through APIs and event-driven integration, backed by Neo4j.",
      highlights: ["Built operational visibility including progress and ETA reporting based on historical processing times and D3 visualisation."],
      technologies: ["Neo4j", "D3", "APIs", "Event-driven architecture"],
    },
  ] as CvRole[],
  education: ["Systems Engineering, BEng (Hons), Loughborough University, 2007–2011"],
  certifications: [
    "AWS Certified Solutions Architect – Associate, January 2026",
    "Neo4j Certified Professional, June 2023",
  ],
  community: [
    "BCS My Digital Future Programme – Coach (2024–Present)",
    "IMechE Formula Student – Marshal (2025–Present)",
    "RSPCA Bedfordshire South Branch – Chair of Trustees (2018–2021), Trustee (2016–2022)",
    "British Computer Society",
    "British Motorsports Marshals Club",
  ],
};

export function cvAsText() {
  const roles = cv.roles
    .map((role) => `${role.title} — ${role.company} (${role.dates})\n${role.summary}\n${role.highlights.map((h) => `- ${h}`).join("\n")}\nTechnologies: ${(role.technologies || []).join(", ")}`)
    .join("\n\n");

  return `${cv.name}\n${cv.headline}\n\nProfile\n${cv.profile}\n\nCore strengths\n${cv.strengths.join(", ")}\n\nExperience\n${roles}\n\nEducation\n${cv.education.join("\n")}\n\nCertifications\n${cv.certifications.join("\n")}\n\nCommunity\n${cv.community.join("\n")}`;
}

export function searchCv(query: string) {
  const terms = query.toLowerCase().split(/[^a-z0-9.+#-]+/).filter((term) => term.length > 1);
  const sections = [
    { title: "Profile and strengths", text: `${cv.profile}\n${cv.strengths.join(", ")}` },
    ...cv.roles.map((role) => ({
      title: `${role.title} — ${role.company}`,
      text: `${role.summary}\n${role.highlights.join("\n")}\n${(role.technologies || []).join(", ")}`,
    })),
    { title: "Education and certifications", text: `${cv.education.join("\n")}\n${cv.certifications.join("\n")}` },
    { title: "Community", text: cv.community.join("\n") },
  ];

  return sections
    .map((section) => ({ ...section, score: terms.reduce((n, term) => n + (`${section.title} ${section.text}`.toLowerCase().includes(term) ? 1 : 0), 0) }))
    .filter((section) => section.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(({ title, text }) => ({ title, text }));
}
