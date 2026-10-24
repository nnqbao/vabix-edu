// English version of the BABOSORA landing content (same shape as ../babosora).
import type { babosora as vi } from "../babosora";

/** Same shape as an `as const` object, with string literals widened to `string`. */
export type Widen<T> = T extends string ? string : { readonly [K in keyof T]: Widen<T[K]> };

export const babosora: Widen<typeof vi> = {
  badge: "Hands-on · 2 days · 4 sessions",
  title: "BABOSORA",
  subtitle: "Running and accelerating your revenue flow",
  tagline: ["Find the right customers", "Create opportunities", "Convert to orders", "Accelerate revenue"],
  lead: "Apply the B2A × BABOSORA model so your team proactively generates leads, develops real opportunities, lifts conversion rates and accelerates revenue through measurable actions.",
  stats: [
    { value: "12 hours", label: "Training & practice" },
    { value: "4 sessions", label: "Over 2 days" },
    { value: "4 workshops", label: "A deliverable every session" },
  ],
  audience: ["Business owners & CEOs", "Sales directors", "Sales managers & deputy managers", "Team leads & sales teams"],
  flow: [
    { code: "B2A", name: "Address & area", en: "Business to Address & Area" },
    { code: "BA", name: "Brand awareness", en: "Brand Awareness" },
    { code: "BO", name: "Business opportunity", en: "Business Opportunity" },
    { code: "SO", name: "Sales order", en: "Sales Order" },
    { code: "RA", name: "Revenue acceleration", en: "Revenue Acceleration" },
  ],
  problem: {
    title: "The market still has buyers.",
    titleGold: "So why is selling still so hard?",
    body: "A growing market does not mean every point of sale is growing. Some get plenty of price enquiries but few orders; some customers genuinely need the product but don't yet qualify, lack decision authority or aren't prioritising the purchase. Your team needs to answer five questions:",
    questions: [
      { code: "B2A", q: "Where are the customers with both the need and the ability to buy? Which addresses and areas still hold untapped revenue?" },
      { code: "BA", q: "Why isn't the brand remembered and chosen first? How do you mobilise brand resources and coverage effectively?" },
      { code: "BO", q: "Why do so many people show interest but so few become real buying opportunities? How do you actively hunt for opportunities instead of waiting for customers or raising ad spend?" },
      { code: "SO", q: "Why do customers who have researched, received a quote and tried the product still delay or choose a competitor? How do you ask for the close and turn it into an order?" },
      { code: "RA", q: "How do you grow revenue per customer and across the customer lifetime, rather than relying only on new customers or discounts?" },
    ],
    conclusion:
      "In a competitive market, sales effort alone is not enough. A business needs a systematic method to identify revenue sources, spot bottlenecks, design solutions and continuously run the activities that generate revenue.",
  },
  objectives: [
    {
      code: "B2A",
      title: "Master the market by address and area",
      body: "Identify, select and manage business addresses and areas; analyse average revenue by Address and Area; pinpoint growth zones, declining zones and development opportunities.",
    },
    {
      code: "BA",
      title: "Build a brand broadcasting network",
      body: "Mobilise the four dual brands and 16 brand-resonance pillars; design broadcasting stations, content, scripts and metrics to raise awareness, recall and preference.",
    },
    {
      code: "BO",
      title: "Actively hunt and develop business opportunities",
      body: "Design an opportunity-hunting network; identify needs with NAP and verify buying capability with CAP; uncover missing conditions and develop genuine opportunities.",
    },
    {
      code: "SO",
      title: "Convert opportunities into orders",
      body: "Use the ASKING closing method to reduce resistance, understand customers, bridge the decision gap and lift conversion rates across every channel.",
    },
    {
      code: "RA",
      title: "Accelerate revenue and run to targets",
      body: "Tap the six BRUCCS axes across new customers, existing customers and the ecosystem; run targets with KAROT through a 30/60/90-day acceleration plan.",
    },
  ],
  days: [
    {
      day: "Day 01",
      title: "Building revenue sources",
      sessions: [
        {
          no: "01",
          codes: "B2A × BA",
          title: "Master your territory – Build a brand coverage network",
          question: "Why do some areas grow while others decline? Why do customers seek out some points of sale while others must keep paying for ads?",
          topics: [
            "B2A thinking: anchor on sales addresses, manage territories, analyse average revenue",
            "The four dual brands: personal brand – company brand – product brand – place brand; owned and open brands",
            "Design BA broadcasting stations with BTS/7PS; measure awareness levels S0–S4",
          ],
          output: "A B2A map with a BA broadcasting plan: stations, content, owners, targets and metrics.",
        },
        {
          no: "02",
          codes: "BO",
          title: "The art of hunting and developing business opportunities",
          question: "Plenty of people need it, but few qualify, have the authority and are ready to buy. How do you find the right ones?",
          topics: [
            "NAP needs: Need – Aspiration – Pain; uncover current and latent needs",
            "CAP buying capability: Capacity × Authority × Priority; classify hot – warm – cold BOs with evidence",
            "BO hunting network via B2A, 4O, 7PS and TrustWorking 6G; lead magnets and outreach scripts",
          ],
          output: "A BO Hunting Map: BO sources, outreach scripts, verification criteria, owners and metrics.",
        },
      ],
    },
    {
      day: "Day 02",
      title: "Converting orders – Accelerating revenue",
      sessions: [
        {
          no: "03",
          codes: "SO",
          title: "The art of closing and converting BOs into SOs",
          question: "The customer has asked for a price, been advised and tried the product, yet still hasn't bought. Where is the gap?",
          topics: [
            "BO → SO bottlenecks: value, trust, finance, authority, timing",
            "The ASKING closing method, so customers see the value and decide for themselves",
            "Closing scripts for face-to-face, phone and online; measuring conversion rates",
          ],
          output: "A multichannel closing script set and a plan to improve the BO → SO conversion rate.",
        },
        {
          no: "04",
          codes: "RA",
          title: "Running and accelerating revenue with BRUCCS",
          question: "How do you grow revenue without relying only on new customers, bigger ad budgets or discounts?",
          topics: [
            "Identify untapped revenue in each customer, Address and Area",
            "The six BRUCCS acceleration axes and the advantage of a product and service ecosystem",
            "Run targets with KAROT, GAIN and MAIS; a 30/60/90-day acceleration plan",
          ],
          output: "A 30/60/90-day revenue acceleration plan: targets, key actions, accountable owners and Outcomes metrics.",
        },
      ],
    },
  ],
  tools: [
    {
      code: "NAP × CAP",
      title: "Read opportunities right",
      items: [
        { k: "N", v: "Need — what they must have" },
        { k: "A", v: "Aspiration — what they want" },
        { k: "P", v: "Pain — the problem to solve" },
        { k: "C", v: "Capacity — able to buy" },
        { k: "A", v: "Authority — the right decision-maker" },
        { k: "P", v: "Priority — buying is a priority" },
      ],
    },
    {
      code: "ASKING",
      title: "Ask so customers close themselves",
      items: [
        { k: "A", v: "Atmosphere — build a climate of trust" },
        { k: "S", v: "Situation — customers see where they are" },
        { k: "K", v: "Key Gap — customers recognise the problem" },
        { k: "I", v: "Implication — the cost of not buying" },
        { k: "N", v: "NAP Payoff — the value of buying" },
        { k: "G", v: "Gentle Close — customers decide for themselves" },
      ],
    },
    {
      code: "BRUCCS",
      title: "Six revenue acceleration axes",
      items: [
        { k: "B", v: "Brandnew-Sell — new sales" },
        { k: "R", v: "Renew-Sell — retention and repeat purchase" },
        { k: "U", v: "Up-Sell — higher transaction value" },
        { k: "C", v: "Cross-Sell — selling related products" },
        { k: "C", v: "Combo-Sell — bundled packages" },
        { k: "S", v: "Switch-Sell — competitors' customers" },
      ],
    },
  ],
  applier: [
    { k: "A", title: "Activate", body: "Start from real pain points and real business problems." },
    { k: "P", title: "Paradigm", body: "Explore practical management models and knowledge." },
    { k: "P", title: "Practise & Pitching", body: "Four groups design solutions and pitch them quickly." },
    { k: "L", title: "Lens", body: "Share perspectives and experience to enrich the solutions." },
    { k: "I", title: "Improve", body: "Take in critique and refine the plan." },
    { k: "E", title: "Extract", body: "Distil your own lessons and how to apply them." },
    { k: "R", title: "Resolve", body: "Commit to action and measure results at 30/60/90 days." },
  ],
  outcomes: [
    { title: "See revenue bottlenecks clearly", body: "Use B2A × BABOSORA to analyse revenue sources, opportunity quality and conversion potential by area and unit." },
    { title: "Proactive customer development", body: "A BA broadcasting script and a BO hunting network that fit your products, territory and resources." },
    { title: "Practical closing skills", body: "Apply ASKING to raise the quality of advice and the rate at which opportunities become orders." },
    { title: "Tap revenue acceleration sources", body: "Choose the right BRUCCS axes to grow revenue from new customers, existing customers and the ecosystem." },
    { title: "A measurable action plan", body: "Key Actions, owners and the Outcomes to reach within 30/60/90 days." },
  ],
  outcomesNote:
    "The two days build the knowledge, capability and action plan. Revenue results afterwards depend on the quality of implementation, market conditions and each company's operating mechanisms; VABIX does not promise an unfounded revenue growth rate.",
  manifesto: [
    ["Not just finding more customers", "but finding the right customers."],
    ["Not just creating more opportunities", "but developing opportunities with genuine buying potential."],
    ["Not just pushing sales", "but converting orders and growing the value of every customer."],
    ["Not just setting revenue targets", "but designing and running the key actions that deliver results."],
  ],
  enrol: {
    format: "Public class or a private in-house programme for your company",
    schedule: "The class schedule is being updated — leave your details to be the first to hear",
  },
};
