import type { Methodology } from "../types";
import type { bizCarBlocks as bizCarBlocksVi } from "../methodologies";

// Bản dịch tiếng Anh cho `src/content/methodologies.ts`: mỗi mục chỉ cần `slug` + các trường văn bản đã dịch.
// Được ghép lên dữ liệu gốc theo slug khi người xem ở /en (xem localizeList trong src/i18n/pick.ts).
export const methodologiesEn: (Partial<Methodology> & { slug: string })[] = [
  {
    slug: "bizcar",
    headline: "Designing and running the whole business",
    summary:
      "BizCar is a thinking framework that helps leaders see the business as one integrated system, pinpoint the real bottlenecks and redesign operating capability to fit each stage of growth.",
    description:
      "A business is not a random collection of departments; it is a car with a driver, wheels, an engine and fuel. If one wheel turns out of line, the whole journey drifts off course. BizCar divides the business into 12 functional blocks in three groups: Direction & Market, Resources & Operations, and Leadership & Organisation.",
    whoFor: ["CEOs, founders and leadership teams", "Management teams who need a shared language", "SMEs and startups who need a measurable tool"],
    outcomes: [
      "An overall design blueprint for the business",
      "The ability to diagnose weak spots across the 12 functional blocks",
      "Decisions grounded in systems thinking rather than firefighting",
    ],
    process: [
      { step: "SEE", title: "See clearly", body: "Diagnose the 12 blocks and identify which wheels are slipping." },
      { step: "DESIGN", title: "Design", body: "Redesign the priority components for the current stage." },
      { step: "ALIGN", title: "Align", body: "Bring strategy, people and resources together around one picture." },
      { step: "OPERATE", title: "Operate", body: "Implement, measure and improve continuously." },
    ],
  },
  {
    slug: "applier",
    eyebrow: "Training method",
    headline: "Learn to see clearly. Design to make it work. Implement to deliver results.",
    summary:
      "APPLIER is VABIX's training and coaching method: activate together, grasp the paradigm, practise designing, apply a multi-angle lens, improve, extract the lessons and resolve into results.",
    description:
      "APPLIER is not a theory course. Participants work on real problems, challenge them from multiple angles and then commit to applying what they design. Results are described as goals that are measured — not as a promise of higher revenue or profit.",
    whoFor: ["BMDO participants", "Custom in-company training classes", "One-to-one coaching"],
    outcomes: [
      "Participants see their own problem clearly",
      "A design output that can be applied",
      "An implementation commitment and a way to measure it",
    ],
    process: [
      { step: "A", title: "ACTIVATE — Getting started together", body: "Open the learning space and clarify the goals and the problems people bring with them." },
      { step: "P1", title: "PARADIGM — A practical paradigm", body: "Take on a thinking framework and a shared language for looking at the business." },
      { step: "P2", title: "PRACTICE — Design practice", body: "Work on the participant's own data and real problems." },
      { step: "L", title: "LENS — A multi-angle lens", body: "Challenge assumptions, options and risks before deciding." },
      { step: "I", title: "IMPROVE — Improvement", body: "Refine the management output after the challenge." },
      { step: "E", title: "EXTRACT — Extracting the lessons", body: "Draw out what has been proven so it can be reused." },
      { step: "R", title: "RESOLVE — Delivering results", body: "Commit to owners, deadlines and a way to track progress." },
    ],
  },
  {
    slug: "mais",
    eyebrow: "Measurement and standardisation",
    headline: "Measure → Analyse → Improve → Standardise",
    summary:
      "MAIS is the VABIX improvement loop for turning designs into operating habits: measure, read, adjust, then standardise what has worked.",
    description:
      "MAIS complements APPLIER and 3W in the steps after the classroom: results do not stop at insight or a design blueprint, but are tracked, analysed, improved and standardised. MAIS is not used to claim guaranteed business performance.",
    whoFor: ["CEOs implementing after BMDO", "Transformation consulting teams", "Operations managers who need an improvement loop"],
    outcomes: [
      "Indicators and evidence to read the current situation",
      "Bottlenecks analysed rather than handled by gut feeling",
      "What has worked well becomes standard practice",
    ],
    process: [
      { step: "01", title: "Measure", body: "Define the data, indicators and evidence to track." },
      { step: "02", title: "Analyse", body: "Read the causes, not just the symptoms." },
      { step: "03", title: "Improve", body: "Adjust the approach based on evidence." },
      { step: "04", title: "Standardise", body: "Keep the approaches that worked as habits or processes." },
    ],
  },
  {
    slug: "3w",
    eyebrow: "Standard of success",
    headline: "WOW in insight • WELL in design • WIN in practice.",
    summary:
      "3W is the framework for assessing the outputs of learning and implementation — not a promise of absolute business results.",
    description:
      "WOW: meaningful insight / an eye-opening realisation. WELL: better design and execution. WIN: progress and results in practice. Example outputs include identified bottlenecks, a management design blueprint, an action plan, tracking indicators and evidence of improvement. The distinction: BizCar is the management model; BMDO is the programme; 3W is the standard of success.",
    whoFor: ["BMDO participants", "CEOs redesigning their business", "Teams supporting transformation"],
    outcomes: [
      "An eye-opening understanding of the bottlenecks",
      "Better-designed management outputs",
      "Progress in practice that is measured and verified",
    ],
    process: [
      { step: "WOW", title: "Meaningful insight", body: "Seeing what had not been seen before in the business." },
      { step: "WELL", title: "Better design and execution", body: "Creating management outputs that can be applied." },
      { step: "WIN", title: "Progress in practice", body: "Turning designs into action and evidence of improvement." },
    ],
  },
  {
    slug: "karot",
    eyebrow: "Focus and priorities",
    headline: "A clear destination. The right problem. Focused resources.",
    summary:
      "KAROT helps leaders clarify goals, scope and priorities before designing or implementing change.",
    description:
      "KAROT sets the focus and priorities for change. Before redesigning the system, a business needs a way to set its goals, scope and order of priorities — so the team does not spread itself across too many initiatives. KAROT is used in transformation consulting and in BMDO workshops.",
    whoFor: ["Leadership teams juggling too many initiatives", "Businesses preparing a transformation programme", "Project teams who need to agree on a focus"],
    outcomes: [
      "A clear strategic focus",
      "A short priority list with clear ownership",
      "A team aligned on a shared language before implementation",
    ],
    process: [
      { step: "01", title: "Direction", body: "Clarify the destination and scope." },
      { step: "02", title: "Diagnosis", body: "Identify the key bottlenecks." },
      { step: "03", title: "Prioritisation", body: "Choose which components to tackle first." },
      { step: "04", title: "Commitment", body: "Agree on indicators and responsibilities." },
    ],
  },
  {
    slug: "klass",
    eyebrow: "Capability pyramid",
    headline: "Build solid foundations. Practise with guidance. Grow through evidence.",
    summary:
      "KLASS is a capability pyramid and development path — from foundations to practice, professional mastery and a global outlook.",
    description:
      "KLASS links people development to capability levels that can be observed, coached and measured. Its four levels are used as a path: foundation, practice, professional and global. The meaning of each letter in the name has not yet been officially published on the website.",
    whoFor: ["VABIX participants", "Businesses that want to standardise capabilities by level", "People who design development paths"],
    outcomes: [
      "A clear capability path for each level",
      "Learning programmes tied to real work",
      "Development based on evidence, not just gut feeling",
    ],
    process: [
      { step: "01", title: "Foundation", body: "Build core skills and habits." },
      { step: "02", title: "Practice", body: "Do guided work on real tasks." },
      { step: "03", title: "Professional", body: "Standardise capabilities that can be observed and coached." },
      { step: "04", title: "Global", body: "Extend the capacity to connect and lead at a wider scale." },
    ],
  },
  {
    slug: "baboso",
    eyebrow: "Market journey",
    headline: "Get known. Get considered. Get chosen.",
    summary:
      "BABOSO standardises the journey from brand awareness to business opportunity and sales order.",
    description:
      "BABOSO uses the official structure BA — Brand Awareness, BO — Business Opportunity, SO — Sales Order. After the order, customer care is presented as a continuation through service and relationship development — not as a new letter in the acronym.",
    whoFor: ["Sales and customer care teams", "Suppliers in the VABIX network", "Businesses that want to standardise the customer journey"],
    outcomes: [
      "A customer journey standardised as BA · BO · SO",
      "A team that distinguishes awareness, opportunity and order",
      "After-sales service seen as relationship development, not a separate step in the acronym",
    ],
    process: [
      { step: "BA", title: "Brand Awareness", body: "Getting known: customers recognise and understand the value." },
      { step: "BO", title: "Business Opportunity", body: "Getting considered: an opportunity takes shape that fits the need." },
      { step: "SO", title: "Sales Order", body: "Getting chosen: reaching the order." },
      { step: "→", title: "Continuation", body: "Serving and developing the relationship after the order — not a new part of the acronym." },
    ],
  },
  {
    slug: "dgh",
    eyebrow: "Transformation direction",
    headline: "DGH — A direction framework for Digital, Green and Happy transformation",
    summary:
      "DGH sets the direction of transformation along three axes: Digital, Green and Happy — digital transformation, green transformation and transformation towards happiness.",
    description:
      "D: Digital Transformation. G: Green Transformation. H: Happy Transformation — transformation towards happiness. The website labels DGH as a direction framework; it does not yet describe DGH as a complete transformation architecture until the responsibility model, interactions, indicators and governance are fully in place.",
    whoFor: ["Leadership teams setting a transformation direction", "Businesses that need a shared language for digital, green and happy"],
    outcomes: [
      "The three transformation axes seen together, not in isolation",
      "Priorities discussed before implementation",
      "DGH kept from becoming a slogan without scope",
    ],
    process: [
      { step: "D", title: "Digital Transformation", body: "Digital transformation — data, processes, technology and human accountability." },
      { step: "G", title: "Green Transformation", body: "Green transformation — environmental responsibility tied to real operations." },
      { step: "H", title: "Happy Transformation", body: "Transformation towards happiness — people, culture and the working environment." },
    ],
  },
  {
    slug: "b2a",
    eyebrow: "From territory to results",
    headline: "Market analysis by address and territory",
    summary:
      "B2A is a model that helps sales teams analyse each address, assess the potential of each territory, choose an approach strategy and optimise resources to expand coverage.",
    description:
      "B2A moves from Address (detailed analysis of each point), to Territory (assessing the potential of an area), to Strategy (choosing an effective approach) and on to Results (optimising resources and expanding coverage). It is also the foundation of the book Quản trị kinh doanh thực chiến theo mô hình B2A (Practical Business Management with the B2A Model).",
    whoFor: ["Sales and market development teams", "Organisations with networks across many territories", "Businesses that need a standard way to work local markets"],
    outcomes: [
      "A clear map of territories and addresses",
      "An approach strategy for each area",
      "Resources allocated where they matter",
    ],
    process: [
      { step: "01", title: "Address", body: "Analyse each address / touchpoint in detail." },
      { step: "02", title: "Territory", body: "Assess the potential of the area and the resources available." },
      { step: "03", title: "Strategy", body: "Choose the right approach for each territory." },
      { step: "04", title: "Results", body: "Optimise resources and expand coverage." },
    ],
  },
  {
    slug: "mybizcar",
    eyebrow: "Business design file",
    headline: "Bringing the BizCar model onto a living map of your business",
    summary:
      "MyBizCar is a design file and tool that helps leaders turn the 12-block framework into their own business's assessment, design and tracking.",
    description:
      "In BMDO, the business is the practice ground; MyBizCar is the design file; evidence is the basis for assessing results. MyBizCar does not replace BizCar or BMDO. The interface may be refined to match the brand; the meaning of the indicators, the demo data, the assessments and the access rights of MyBizCar 3D are not changing in this round.",
    whoFor: ["CEOs taking BMDO", "Consulting teams sharing the BizCar language", "Businesses that want to track the 12 blocks over time"],
    outcomes: [
      "A home for the 12-block assessment",
      "Tracking of improvement priorities",
      "The tool tied to the programme and to consulting, not standing alone",
    ],
    process: [
      { step: "01", title: "BizCar", body: "See the business across 12 blocks." },
      { step: "02", title: "Assess", body: "Record the current state of each block." },
      { step: "03", title: "Prioritise", body: "Choose which components to tackle first." },
      { step: "04", title: "Track", body: "Come back and measure after implementation." },
    ],
  },
];

export const bizCarBlocksEn: typeof bizCarBlocksVi = [
  {
    group: "Direction and market",
    groupId: "direction",
    items: [
      { n: "01", name: "Strategic direction", icon: "target" },
      { n: "02", name: "Value management", icon: "diamond" },
      { n: "03", name: "Market management", icon: "chart" },
      { n: "04", name: "Brand management", icon: "tag" },
    ],
  },
  {
    group: "Resources and operations",
    groupId: "operations",
    items: [
      { n: "05", name: "People management", icon: "people" },
      { n: "06", name: "Financial management", icon: "finance" },
      { n: "07", name: "Core resource management", icon: "nodes" },
      { n: "08", name: "Operations management", icon: "gear" },
    ],
  },
  {
    group: "Leadership and organisation",
    groupId: "leadership",
    items: [
      { n: "09", name: "Leadership and executive management", icon: "lead" },
      { n: "10", name: "Organisational management", icon: "org" },
      { n: "11", name: "Corporate culture", icon: "heart" },
      { n: "12", name: "Business environment", icon: "globe" },
    ],
  },
];
