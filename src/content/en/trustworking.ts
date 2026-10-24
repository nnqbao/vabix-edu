// English version of `src/content/trustworking.ts`.

export const trustworking: typeof import("../trustworking").trustworking = {
  headline: "Connecting the right suppliers to the right markets.",
  summary:
    "VABIX Trustworking is a selective business-connection service that helps businesses offering reliable products, services and solutions reach the right customers, partners and target markets.",
  screening:
    "VABIX carries out an initial screening based on each supplier's profile, delivery capability, quality, real-world evidence and level of commitment, while also reviewing the needs, conditions and partnership readiness of the market side before making a connection.",
  notNetworking: [
    "Not the same as ordinary networking.",
    "Not just joining groups, socialising, swapping business cards or running events.",
    "Not a marketplace, not a legal guarantee and not a promise that a deal will be signed.",
  ],
  supplierValue: [
    "Reach the right group of prospective customers / partners.",
    "Spend less time chasing unsuitable opportunities.",
    "Build credibility through a documented profile and delivery evidence.",
    "Expand into new markets / partnership opportunities.",
    "Get feedback to refine products, services and approach.",
  ],
  buyerValue: [
    "Access suppliers that have passed an initial screening.",
    "Choose solutions that fit your needs.",
    "Reduce information risk when looking for partners.",
    "Save time on evaluation and introductions.",
    "Improve the chances of building valuable long-term relationships.",
  ],
  process: [
    { step: "01", title: "Receive the need", body: "Record the problem, partnership conditions and capability profiles of each party." },
    { step: "02", title: "Screen suppliers", body: "Review profile, delivery capability, quality, evidence and level of commitment." },
    { step: "03", title: "Identify the right market", body: "Match against the needs, conditions and partnership readiness of the market / client side." },
    { step: "04", title: "Purposeful introduction", body: "Introduce the right party to the right party — no mass introductions." },
    { step: "05", title: "Follow up and feedback", body: "Track progress and gather feedback to improve profiles and approach." },
  ],
  principles: [
    "Fit before connection.",
    "Trust based on evidence.",
    "Transparency about needs and delivery capability.",
    "Respect for each party's right to decide.",
    "Partnership based on mutual value.",
    "Lasting relationships over short-term transactions.",
  ],
  limitation:
    "VABIX provides initial screening, introductions and support in forming partnership opportunities. Each party remains responsible for its own due diligence, negotiation and decisions before entering into any transaction or partnership. VABIX does not provide legal guarantees and does not guarantee absolute quality, revenue or that a deal will be signed.",
  services: [
    { title: "Expert connections", href: "/mang-luoi/chuyen-gia", body: "Meet experts in the right field for a specific problem." },
    { title: "Partner connections", href: "/mang-luoi/doi-tac", body: "Collaborate with organisations, associations and businesses on mutual value." },
    { title: "Resources and opportunities", href: "/mang-luoi/nha-cung-cap", body: "Introductions to delivery capabilities that have passed an initial screening." },
    { title: "Events and community activities", href: "/su-kien", body: "Purposeful spaces to meet, tied to real needs." },
    { title: "VABIX Connection Village", href: "/cong-cu-dan", body: "The platform for residents, industry villages and profiles in the ecosystem." },
  ],
  ctas: [
    { id: "buyer", label: "I'm looking for a supplier / partner", type: "trust-buyer" as const, title: "Find a supplier or partner" },
    { id: "supplier", label: "I want to present a solution", type: "trust-supplier" as const, title: "Present your solution / delivery capability" },
    { id: "expert", label: "I want to connect with an expert", type: "trust-expert" as const, title: "Connect with an expert" },
    { id: "partner", label: "Propose a partnership with VABIX", type: "partnership" as const, title: "Propose a partnership" },
  ],
};
