import * as vi from "../bmdoK4";

// Bỏ kiểu literal của `as const` để bản tiếng Anh có cùng cấu trúc với bản tiếng Việt.
export type Widen<T> = T extends string ? string : T extends number ? number : T extends readonly (infer U)[] ? readonly Widen<U>[] : { readonly [K in keyof T]: Widen<T[K]> };

// English content for the BMDO Cohort 04 landing page (mirrors src/content/bmdoK4.ts).
export const bmdoK4: Widen<typeof vi.bmdoK4> = {
  cohort: "Cohort 04",
  eyebrow: "A programme for business owners & CEOs",
  titleLead: "Chief Executive Officer",
  titleGold: "Designing and running the whole business",
  motto: "Learn fast – Understand deeply – Apply in practice – Create results",
  slogan: { lead: "Run your business", points: ["Lean", "End-to-end", "Profit-optimised"] },
  promise: "A journey to redesign the way your business runs.",
  domains: ["Strategy", "Environment", "Value", "Market", "Brand", "Organisation", "People", "Finance", "Operations", "Leadership", "Culture", "Core resources"],
  stats: [
    { value: "60 hours", label: "Hands-on training" },
    { value: "12 days", label: "Every Saturday" },
    { value: "MyBizCar", label: "Practice on the platform" },
  ],
  overview: {
    title: "See your business",
    titleGold: "as a system.",
    body: "A strategy that is hard to execute, a team that does not coordinate, tight cash flow and a leader buried in day-to-day issues are not separate problems. BMDO helps business owners and CEOs see how they connect, set priorities and design a management plan that fits the reality of their business.",
    approach:
      "Through the Business Car – BizCar model, participants connect the 12 management domains with systems thinking, then complete their design step by step on MyBizCar.",
    steps: [
      { title: "Direction", body: "Understand the destination, priorities and bottlenecks." },
      { title: "Alignment", body: "See clearly how the parts relate to each other." },
      { title: "Design", body: "Turn knowledge into management tools." },
      { title: "Validation", body: "Update from data and real-world feedback." },
    ],
    principle:
      "Every learning day produces a concrete output; the outputs are reviewed together to form a management plan that can actually be implemented.",
  },
  phases: [
    {
      number: "01",
      label: "Laying the foundation",
      days: "Days 01 – 03",
      title: "Destination and value",
      lead: "From strategic direction to the business environment and the value proposition.",
      sessions: [
        {
          day: "01",
          title: "Strategic direction",
          part: "Strategy engine",
          body: "Clarify the destination, priority choices and bottlenecks; set up the picture of your business on MyBizCar.",
          output: "Strategic direction, focus goals and implementation priorities.",
        },
        {
          day: "02",
          title: "Business environment",
          part: "Environment & roads",
          body: "Analyse customers, competitors, trends and external conditions that shape your business choices.",
          output: "A map of opportunities, risks and adaptation options by priority.",
        },
        {
          day: "03",
          title: "Value management",
          part: "Value wheel",
          body: "Clarify the customer problem to solve, your distinctive value and the product and service experience.",
          output: "Value proposition, priority portfolio and experience standards to deliver.",
        },
      ],
    },
    {
      number: "02",
      label: "Building the system",
      days: "Days 04 – 06",
      title: "Market and organisation",
      lead: "Connect market growth with the brand and the organisational structure.",
      sessions: [
        {
          day: "04",
          title: "Market management",
          part: "Market wheel",
          body: "Choose customers, territories and channels; connect awareness, opportunities, orders and growth through BABOSORA.",
          output: "A go-to-market design, revenue flow and tracking metrics.",
        },
        {
          day: "05",
          title: "Brand management",
          part: "Business body",
          body: "Coordinate the personal, company, product and method brands in the 04 dual-brand structure; choose credible sources and the right messages.",
          output: "An owned–open brand map, touchpoints and a BA coverage plan.",
        },
        {
          day: "06",
          title: "Organisational management",
          part: "Chassis system",
          body: "Design the structure around the work to be done; clarify functions, delegation and coordination between departments.",
          output: "Organisation chart, key responsibilities and coordination principles.",
        },
      ],
    },
    {
      number: "03",
      label: "Building capability",
      days: "Days 07 – 09",
      title: "Resources and execution",
      lead: "Strengthen people capability, master cash flow and optimise operations.",
      sessions: [
        {
          day: "07",
          title: "People management",
          part: "People wheel",
          body: "Identify key positions, capability requirements, and how to deploy, develop and evaluate the team against goals.",
          output: "A people map, capability gaps and a development plan for priority roles.",
        },
        {
          day: "08",
          title: "Financial management",
          part: "Finance wheel",
          body: "Read the links between revenue, costs, profit and cash flow; determine capital needs according to the plan.",
          output: "Priority budget, cash-flow plan and thresholds to monitor.",
        },
        {
          day: "09",
          title: "Operations management",
          part: "Gearbox & transmission",
          body: "Turn goals into work; connect the stages, identify bottlenecks and control the quality of execution.",
          output: "Key processes, control points, operating metrics and an improvement plan.",
        },
      ],
    },
    {
      number: "04",
      label: "Leading & integrating",
      days: "Days 10 – 12",
      title: "Leading for growth",
      lead: "Turn leadership responsibility into an execution rhythm and a 90-day plan.",
      sessions: [
        {
          day: "10",
          title: "Leadership and management",
          part: "Steering wheel & driver",
          body: "Practise decision-making, assigning work, delegating, giving feedback and setting a management rhythm so the team executes together.",
          output: "Management calendar, decision-making principles and an accountability review mechanism.",
        },
        {
          day: "11",
          title: "Corporate culture",
          part: "Culture oil",
          body: "Turn desired values into concrete behaviours; address inconsistency in coordination and keeping commitments.",
          output: "A set of core behaviours, a recognition mechanism and a way to handle misaligned behaviour.",
        },
        {
          day: "12",
          title: "Core resource management",
          part: "Business fuel",
          body: "Review finance, people, relationships, data, brand and innovation; integrate the designs built so far.",
          output: "A resource mobilisation map, the 12-domain file on MyBizCar and a 90-day plan.",
        },
      ],
    },
  ],
  method: {
    title: "Learn on real problems.",
    titleGold: "Take home a real design.",
    body: "The APPLIER cycle puts participants in the role of business designer: examine the patterns, practise on their own case, challenge and validate through implementation.",
    applier: [
      { title: "Activate", body: "Set the context and goals." },
      { title: "Patterns", body: "Identify principles and structures." },
      { title: "Design", body: "Practise directly on MyBizCar." },
      { title: "Perspectives", body: "Share viewpoints and challenge." },
      { title: "Improve", body: "Adjust the design to reality." },
      { title: "Synthesise", body: "Consolidate the takeaways." },
      { title: "Apply", body: "Commit to action between sessions." },
    ],
    day: [
      { minutes: 30, label: "Activate" },
      { minutes: 75, label: "Patterns" },
      { minutes: 120, label: "MyBizCar" },
      { minutes: 45, label: "Perspectives & improvement" },
      { minutes: 30, label: "Synthesise" },
    ],
    support: [
      { title: "MyBizCar", body: "Complete the 12-domain design." },
      { title: "AI Agent", body: "Structure the work and prompt reviews." },
      { title: "1:1 mentoring", body: "Unblock your priority problem." },
    ],
  },
  outcomes: {
    title: "After the course, where can",
    titleGold: "your business start?",
    body: "The programme's outputs go beyond understanding: they are management designs you can keep refining inside your business.",
    items: [
      { title: "12-domain file", body: "Goals, current state, options and the links between domains on MyBizCar." },
      { title: "Bottleneck list", body: "What needs to be tackled, ranked by priority and resources." },
      { title: "90-day roadmap", body: "Tasks, owners, resources, deadlines and tracking metrics." },
      { title: "Validation mechanism", body: "Evaluate by conversion, turnaround time, cost, cash flow or productivity." },
    ],
  },
  enrol: {
    opening: "05.12.2026",
    schedule: "Every Saturday • 12 days",
    venue: "SIHUB Building, 123 Truong Dinh, Ho Chi Minh City",
    listPrice: "VND 20,000,000",
    price: "VND 10,000,000",
    discount: "50% off • Save VND 10 million",
    advisor: "Ms. Thanh Thuỳ, MSc",
    zaloGroup: { name: "BMDO K4 Chief Executive Course", url: "https://zaloapp.com/qr/g/d0kpihdzmlptu6dewwaw?src=qr", qr: "/images/bmdo/zalo-bmdo-k4-qr.png" },
    note: "Participants should bring a laptop, one priority problem and basic management data. Course details may be updated once confirmed by the organisers.",
  },
};

const classAlts: Record<string, string> = {
  "bmdo-lop-01": "Group photo of BMDO participants on the opening-day stage",
  "bmdo-lop-02": "Participants practising in groups on a design",
  "bmdo-lop-03": "The BMDO class at the SIHUB space",
  "bmdo-lop-25": "The lecturer leading a session as participants listen closely",
  "bmdo-lop-04": "The lecturer presenting the BizCar model",
  "bmdo-lop-05": "Participants analysing a business design together",
  "bmdo-lop-06": "BMDO class group photo",
  "bmdo-lop-07": "Participants working in class",
  "bmdo-lop-08": "A group of participants discussing options",
  "bmdo-lop-26": "The lecturer presenting the KAROT model and the LENS multi-perspective view",
  "bmdo-lop-09": "Guests and participants at the BMDO opening ceremony",
  "bmdo-lop-10": "The lecturer leading a BMDO session",
  "bmdo-lop-11": "A participant presenting a plan with their group",
  "bmdo-lop-12": "BMDO participants at the end-of-course get-together",
  "bmdo-lop-13": "Group photo of BMDO participants on stage at a CEO programme",
  "bmdo-lop-14": "Participants talking at the practice table",
  "bmdo-lop-15": "The atmosphere of a BMDO class at SIHUB",
  "bmdo-lop-16": "Participants following the lecture",
  "bmdo-lop-17": "Participants chatting during a break",
  "bmdo-lop-27": "Participants applauding during a session",
  "bmdo-lop-18": "BMDO class group photo at the end of a session",
  "bmdo-lop-19": "Participants focused on a practice exercise",
  "bmdo-lop-20": "The BMDO class at a get-together",
  "bmdo-lop-21": "The lecturer talking with participants",
  "bmdo-lop-22": "Participants attending a session",
  "bmdo-lop-28": "The lecturer talking with participants",
  "bmdo-lop-23": "Group photo of BMDO participants",
  "bmdo-lop-24": "BMDO participants on a field trip",
};

export const bmdoClassPhotos: Widen<typeof vi.bmdoClassPhotos> = vi.bmdoClassPhotos.map((p) => ({
  src: p.src,
  alt: classAlts[p.src.replace(/^.*\/|\.jpg$/g, "")] ?? p.alt,
}));

const featuredAlts = [
  "Group photo of participants at the graduation and honours ceremony",
  "Women participants posing for a keepsake photo on the graduation stage",
  "A participant receiving flowers and a graduation certificate",
  "Participants holding their graduation certificates on stage",
];

export const bmdoGraduates: Widen<typeof vi.bmdoGraduates> = {
  ...vi.bmdoGraduates,
  featured: vi.bmdoGraduates.featured.map((p, i) => ({ ...p, alt: featuredAlts[i] ?? p.alt })),
};
