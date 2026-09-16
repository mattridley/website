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
    "Commercially minded, product-focused engineering leader with 15 years of experience across engineering management, platforms, enterprise integrations, authentication and customer-facing delivery. Currently Technical Lead for ThousandEyes Agentic Systems Engineering, running the team responsible for the internal agent runtime and Agentic SDLC. Hands-on with MCP, including proxy architecture and tool development, alongside experience building and managing teams and driving adoption of shared platforms across distributed organisations. Passionate about collaboration, quality and developing others.",
  strengths: [
    "Engineering management & coaching",
    "MCP & agent runtimes",
    "Agentic SDLC",
    "OAuth 2.0 & SAML 2.0",
    "Enterprise integrations",
    "Platform & distributed systems",
    "Cross-org / cross-region delivery",
    "APIs & event-driven architecture",
    "Technical architecture & design",
    "Product ownership & stakeholder collaboration",
    "Engineering quality & developer enablement",
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
        "Partners with engineering teams across ThousandEyes and other Cisco business units to understand agentic use cases, turn them into platform improvements and drive adoption of the runtime.",
        "Leads internal education and example implementations around Codex, Agent Skills and agentic development practices.",
        "Previously acted as technical leader for complex full-stack features, collaborating with product to create architecture and design documentation, validate technology choices and coordinate delivery.",
        "Experimented with agentic specification and implementation breakdown, acceptance-criteria validation and task orchestration through the ThousandEyes AI First Development programme.",
        "Previously led BGP Easy Onboarding, automating test and alert-rule creation through an intelligent matching engine and contributing to a 7% increase in BGP test revenue in its first month.",
        "As a key member of the Frontend Quality Guild, documented best practices, created example code and delivered technical talks that contributed to a 13.3% reduction in customer-reported bugs.",
        "Championed Komodor-based infrastructure right-sizing for the BGP team, reducing BGP COGS by $52k per year as part of projected company-wide savings of $192k per year.",
      ],
      technologies: ["MCP", "Vue.js", "TypeScript", "Kotlin", "Spring Boot", "Kafka", "Elasticsearch", "MySQL", "ClickHouse"],
    },
    {
      title: "Lead Software Engineer",
      company: "Vorboss",
      dates: "April 2023 – June 2024",
      summary:
        "Led and managed a team of eight full-stack product engineers building bespoke, mission-critical fibre planning, build and network-management software.",
      highlights: [
        "Managed a team of eight full-stack product engineers across a range of experience levels, combining people leadership with hands-on technical direction.",
        "Owned the product roadmap for Fibre Build, Planning and Network Management software with senior business stakeholders.",
        "Acted as technical design authority for mission-critical fibre planning, build and network operations systems, empowering the team to own delivery and architecture through regular design-review sessions.",
        "Built fibre-route visualisation, network maps, test and device data, helping enable service delivery in two weeks versus typical industry timelines of 8–12 weeks.",
        "Used OpenTelemetry and modern platform practices to improve visibility into systems supporting day-to-day network operations.",
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
        "Built a global team including two pre-sales Solutions Consultants and three professional-services Solutions Engineers while continuing to engage directly with Blink's largest customers and prospects.",
        "As Blink's first Solutions Engineer, conducted all pre-sales and professional-services engagements for the first $5m in revenue, then built the team that supported the next $5m.",
        "Before building the team, owned Blink integrations end-to-end from customer requirements through design and delivery.",
        "Built enterprise connectivity across SCIM, SAML and OAuth plus API integrations into Workday, Google and other enterprise systems.",
        "Turned early customer integration work into a reusable library of integrations and connectivity patterns rather than one-off implementations.",
        "Led design, delivery and certification of the Workday integration associated with Blink's $20m Series A.",
        "Introduced structured engagement processes focused on deeply understanding customer requirements, impact and demonstrable value.",
        "Collaborated with Implementation to design repeatable launch and integration packages for new customers, worth up to 20% of first-year annual licensing cost.",
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
        "Owned features from specification through testing and deployment, working alongside a Product Designer.",
        "Developed shared component and data-layer libraries used across multiple web applications.",
        "Built product areas including a WYSIWYG editor, billing UI, chat and content management alongside authentication and integration capabilities.",
      ],
      technologies: ["JavaScript", "Node.js", "React", "AWS", "PHP", "Scala"],
    },
    {
      title: "Development Lead – Architecture Team",
      company: "RBC Capital Markets",
      dates: "March 2013 – July 2015",
      summary:
        "Led development of a single-pane-of-glass architecture platform tracking real-time data flows across the bank through APIs and event-driven integration, backed by Neo4j.",
      highlights: [
        "Built operational visibility including progress and ETA reporting based on historical processing times and D3 visualisation.",
      ],
      technologies: ["Neo4j", "D3", "APIs", "Event-driven architecture"],
    },
    {
      title: "Technology Graduate",
      company: "RBC Capital Markets",
      dates: "September 2011 – March 2013",
      summary:
        "Started career on the RBC Capital Markets technology graduate programme before moving into the Architecture Team and later becoming Development Lead.",
      highlights: [],
    },
  ] as CvRole[],
  education: ["Systems Engineering, BEng (Hons), Loughborough University, 2007–2011"],
  certifications: [
    "AWS Certified Solutions Architect – Associate, January 2026",
    "Neo4j Certified Professional, June 2023",
  ],
  community: [
    "BCS My Digital Future Programme – Coach (October 2024–Present)",
    "IMechE Formula Student – Marshal (July 2025–Present)",
    "RSPCA Bedfordshire South Branch – Chair of Trustees (December 2018–October 2021), Trustee (May 2016–May 2022)",
    "British Computer Society – Member (January 2024–Present)",
    "British Motorsports Marshals Club – Member (March 2024–Present)",
  ],
};

export function cvAsText() {
  const roles = cv.roles
    .map((role) => `${role.title} — ${role.company} (${role.dates})\n${role.summary}\n${role.highlights.map((h) => `- ${h}`).join("\n")}${role.technologies?.length ? `\nTechnologies: ${role.technologies.join(", ")}` : ""}`)
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
