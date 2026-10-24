import type { Solution } from "../types";

// Bản dịch tiếng Anh cho `src/content/solutions.ts`: mỗi mục chỉ cần `slug` + các trường văn bản đã dịch.
// Được ghép lên dữ liệu gốc theo slug khi người xem ở /en (xem localizeList trong src/i18n/pick.ts).
export const solutionsEn: (Partial<Solution> & { slug: string })[] = [
  {
    slug: "tu-van-chien-luoc",
    title: "Strategy consulting",
    shortTitle: "Strategy consulting",
    summary:
      "VABIX helps leaders see the current situation clearly, set priorities and turn strategy into a roadmap that can be executed.",
    whoFor: [
      "Business owners and leadership teams who need to reset their growth strategy",
      "Growing businesses whose strategy has not yet become an action plan",
      "Organisations that want to redesign their business model and enterprise architecture",
    ],
    painPoints: [
      "Strategy is unclear or has not been turned into an action plan",
      "Priorities are scattered; leaders fight fires rather than lead the system",
      "The management model does not fit the Vietnamese context",
    ],
    outcomes: [
      "A clear picture of the current state and strategic priorities",
      "A phased development roadmap tied to real resources",
      "Tracking and adjustment tools so the team can run things itself",
    ],
    scope: [
      "Setting direction and designing the growth strategy",
      "Designing the business model and enterprise architecture",
      "Restructuring the organisation and coordination mechanisms",
      "Market, brand and sales strategy",
      "People, finance and core resources strategy",
      "Standardising processes and operating systems",
    ],
    process: [
      { step: "01", title: "Survey and diagnosis", body: "Gather information, analyse internal factors and market context, identify the SWOT." },
      { step: "02", title: "Set objectives", body: "Clarify the vision, strategic objectives and the issues to prioritise." },
      { step: "03", title: "Design the solution", body: "Build an overall solution and a phased action plan." },
      { step: "04", title: "Support implementation", body: "Support execution, track progress, challenge and adjust." },
      { step: "05", title: "Transfer capability", body: "Measure results and hand over the tools so the business can run things itself." },
    ],
    deliverables: [
      "Current-state diagnostic report",
      "Strategic priority map",
      "Phased implementation roadmap",
      "Tracking and adjustment toolkit",
    ],
    faqs: [
      { question: "How is VABIX strategy consulting different from a training programme?", answer: "Consulting starts from the specific problem of the business: surveying, diagnosing, designing a roadmap and supporting implementation. Training focuses on building the capability of leaders and teams. The two are often combined when a business needs both direction and the capability to execute." },
      { question: "Is it suitable for small and medium-sized businesses?", answer: "Yes. BizCar and the VABIX consulting process are designed so that SMEs and startups can see the whole system and prioritise the right areas, rather than applying international models as they are." },
    ],
  },
  {
    slug: "dao-tao-doanh-nhan",
    title: "Entrepreneur training",
    shortTitle: "Entrepreneur training",
    summary:
      "Developing leadership thinking, management capability and business model design skills for founders, CEOs, the next generation and management teams.",
    whoFor: [
      "Founders, CEOs and business owners",
      "The next generation in family businesses",
      "Management teams who need systems thinking",
    ],
    painPoints: [
      "Managers lack systems thinking and practical operating tools",
      "Decisions rely on personal experience rather than data and systems",
      "A lack of successors and of a strong enough corporate culture",
    ],
    outcomes: [
      "Stronger strategic thinking and long-term vision",
      "Greater ability to lead oneself and the team",
      "Know-how to design and run an effective business model",
    ],
    scope: [
      "Developing strategic thinking and long-term vision",
      "Strengthening leadership and self-management",
      "Designing and running the business model",
      "Making decisions based on data and systems",
      "Building successors and corporate culture",
    ],
    process: [
      { step: "01", title: "Identify", body: "Define the learner profile, business context and capability goals." },
      { step: "02", title: "Design", body: "Build the programme around real cases, tools and applied exercises." },
      { step: "03", title: "Facilitate", body: "Facilitation: questions – cases – tools – solutions for the business." },
      { step: "04", title: "Apply", body: "Learners design solutions during the programme, using real data." },
      { step: "05", title: "Measure", body: "Review results, adjust and hand over tools for self-management." },
    ],
    deliverables: [
      "An applicable leadership capability framework",
      "A design of the business's own model / strategic priorities",
      "A set of practical tools and templates",
    ],
    faqs: [
      { question: "Is the programme suitable for first-time founders?", answer: "Yes. VABIX designs by business stage. Startups and SMEs gain a common language that links strategy, market, people, finance and operations." },
    ],
  },
  {
    slug: "huan-luyen-doanh-nghiep",
    title: "In-company training",
    shortTitle: "In-company training",
    summary:
      "Programmes designed around each organisation's needs, industry and challenges, combining knowledge, real cases and post-course coaching.",
    whoFor: [
      "Businesses that need to strengthen a specific function",
      "Sales, marketing, HR, finance and operations teams",
      "Organisations that want to tie training to KPIs and behaviour change",
    ],
    painPoints: [
      "Departments work in silos without coordination mechanisms",
      "Internal training stays theoretical and rarely becomes tools",
      "The business is growing faster than its operating capability",
    ],
    outcomes: [
      "Stronger leadership and management capability in the team",
      "Better operating performance and efficiency",
      "Real business problems addressed directly",
      "Greater alignment and cohesion across the organisation",
    ],
    scope: [
      "Strategic management",
      "Project management",
      "Human resource management",
      "Corporate finance management",
      "Brand management",
      "Practical digital marketing",
      "Sales skills",
      "Presentation and fundraising skills",
    ],
    process: [
      { step: "01", title: "Needs survey", body: "Clarify the organisational problem, the learners and the desired results." },
      { step: "02", title: "Design the topics", body: "Build content, cases and tools for the industry and context." },
      { step: "03", title: "Run the sessions", body: "Combine theory, practice and the business's real cases." },
      { step: "04", title: "Post-course coaching", body: "Support application and track changes in behaviour and results." },
    ],
    deliverables: [
      "A programme tailored to the business",
      "Learning materials, templates and applied tools",
      "A before-and-after progress report",
    ],
    faqs: [
      { question: "Can it be delivered in-house?", answer: "Yes. VABIX in-company training programmes are designed to order and can be delivered at your premises, at a partner centre or blended with online sessions." },
    ],
  },
  {
    slug: "thiet-ke-van-hanh-doanh-nghiep",
    title: "Business design & operations",
    shortTitle: "Design & operations",
    summary:
      "Using the BizCar framework to see the business as a system of 12 functional blocks, diagnose bottlenecks and redesign operating capability.",
    whoFor: [
      "Leaders who need a common language for the whole business system",
      "Businesses fighting local fires without the big picture",
      "Organisations that want to standardise operations before growing further",
    ],
    painPoints: [
      "The business is growing faster than its operating capability",
      "Piecemeal innovation not tied to the key components",
      "No measurement points for each functional block",
    ],
    outcomes: [
      "An overall design for the business",
      "The ability to diagnose weaknesses across the 12 functional blocks",
      "Decisions based on systems thinking rather than firefighting",
    ],
    scope: [
      "Diagnosis of the 12 BizCar functional blocks",
      "Redesigning priorities through SEE – DESIGN – ALIGN – OPERATE",
      "Implementation support and tool handover",
    ],
    process: [
      { step: "01", title: "SEE", body: "See the current state of the 12 functional blocks and the priority bottlenecks clearly." },
      { step: "02", title: "DESIGN", body: "Redesign structure, processes and capabilities to suit the stage of growth." },
      { step: "03", title: "ALIGN", body: "Align leaders, teams and resources around a common language." },
      { step: "04", title: "OPERATE", body: "Operate, measure, adjust and hand over." },
    ],
    deliverables: [
      "The business's BizCar map",
      "Bottleneck and priority matrix",
      "Phased operating roadmap",
    ],
    faqs: [
      { question: "How is BizCar different from ordinary canvas models?", answer: "BizCar does more than describe a business model. It is a framework of 12 functional blocks that helps leaders see the business as one integrated car — from strategy, market, resources and operations to leadership, culture and context." },
    ],
  },
  {
    slug: "ket-noi-doanh-nghiep",
    title: "Business connections",
    shortTitle: "Business connections",
    summary:
      "Connecting business owners, experts, partners and the right resources to build a foundation for lasting collaboration.",
    whoFor: [
      "Businesses that need partners, experts or resources suited to their problem",
      "Organisations that want to join a community with standards and vetting",
      "Leaders who want to cut the time it takes to find the right people for the right need",
    ],
    painPoints: [
      "Businesses struggle to reach the right partners and markets",
      "Networks are wide but lack depth and real value",
      "Time is wasted screening unsuitable partners",
    ],
    outcomes: [
      "Meet the right partners at the right time",
      "Cut the time and cost of searching",
      "More opportunities for in-depth collaboration",
    ],
    scope: [
      "Receiving needs and capability profiles",
      "Screening for fit and connection goals",
      "Organising meetings, industry forums and connection programmes",
      "Following up partnership opportunities and developing long-term relationships",
    ],
    process: [
      { step: "01", title: "Intake", body: "Record the business's needs, capabilities and direction." },
      { step: "02", title: "Screening", body: "Assess fit and define the goal of the connection." },
      { step: "03", title: "Introduction", body: "Organise meetings, forums or trade programmes." },
      { step: "04", title: "Support", body: "Follow up partnership opportunities and support discussions." },
      { step: "05", title: "Record", body: "Record outcomes and develop long-term relationships." },
    ],
    deliverables: [
      "A standardised needs / capability profile",
      "Suggested suitable partners",
      "A connection session or themed programme",
    ],
    faqs: [
      { question: "Is business connection a trading marketplace?", answer: "No. VABIX builds a connection environment based on understanding businesses, member reputation and the principle of growing together. The aim is in-depth collaboration, not one-off transactions." },
    ],
  },
  {
    slug: "xuc-tien-thuong-mai",
    title: "Trade promotion",
    shortTitle: "Trade promotion",
    summary:
      "Matching supply and demand, helping introduce products, expand markets and drive effective trade opportunities.",
    whoFor: [
      "Businesses that need to expand markets and distribution channels",
      "Suppliers that want to reach the right customer segments",
      "Organisations and associations that need promotion programmes by industry or region",
    ],
    painPoints: [
      "Good products that have not reached the right market",
      "Customer acquisition costs are high and hard to measure",
      "No ecosystem supporting sales and after-sales care",
    ],
    outcomes: [
      "Better access to suitable partners and customers",
      "More partnership opportunities and sustainable market expansion",
      "Sharing knowledge and resources to create value",
    ],
    scope: [
      "Introducing products and services to the right networks",
      "Matching supply and demand by industry and region",
      "Trade programmes, events and communication support",
      "Support along the BABOSO journey, from awareness to repeat purchase",
    ],
    process: [
      { step: "01", title: "Profile", body: "Standardise capabilities, products and target markets." },
      { step: "02", title: "Matching", body: "Identify supply, demand and suitable opportunities." },
      { step: "03", title: "Promotion", body: "Organise programmes, introductions and support discussions." },
      { step: "04", title: "Follow-up", body: "Support partnership opportunities and record outcomes." },
    ],
    deliverables: [
      "Suggested channels / market partners",
      "A promotion programme or connection event",
      "Communication support within the VABIX ecosystem",
    ],
    faqs: [
      { question: "Can a business that is not yet a Village supplier take part?", answer: "Yes. VABIX accepts connection and promotion requests. Becoming a supplier in the Village is a separate, vetted pathway, described in the Become a partner section." },
    ],
  },
];
