import type { CaseStudy } from "../types";

// Bản dịch tiếng Anh cho `src/content/caseStudies.ts`: mỗi mục chỉ cần `slug` + các trường văn bản đã dịch.
// Được ghép lên dữ liệu gốc theo slug khi người xem ở /en (xem localizeList trong src/i18n/pick.ts).
export const caseStudiesEn: (Partial<CaseStudy> & { slug: string })[] = [
  {
    slug: "vnpt-b2a-baboso",
    organizationFull: "VNPT – Vietnam Posts and Telecommunications Group",
    industry: "Telecommunications",
    headline: "Hands-on training for sales teams across many areas with B2A and BABOSO",
    summary:
      "Over more than 15 years alongside VNPT, VABIX has trained sales teams to shift their mindset and build hands-on capability, focusing on the B2A model and the BABOSO sales philosophy. The programme has run at many units, including VNPT Ho Chi Minh City, VNPT Hai Phong, VNPT Ca Mau, VNPT Thai Binh and VNPT Binh Phuoc.",
    resultSummary:
      "Teams share one framework for analysing their areas, the customer journey is standardised, and the delivery model has been repeated across many provinces.",
    highlights: [
      { value: "15+", label: "Years working together" },
      { value: "02", label: "Methods: B2A · BABOSO" },
      { value: "Multi-province", label: "Rolled out area by area" },
    ],
    context:
      "VNPT is a posts and telecommunications group with a nationwide network. Building hands-on capability for its sales teams requires a method that is rigorous yet close enough to each local area, and that can be applied consistently across many units.",
    challenge:
      "Sales teams in many areas needed a shared language for analysing the market by address and area, and for standardising the customer journey, rather than relying on individual experience.",
    solution: "VABIX designed a hands-on programme focused on two methods:",
    solutionItems: [
      "The B2A model: analysing each address, assessing the potential of each area, choosing the approach strategy and optimising resources to extend coverage.",
      "The BABOSO sales philosophy: standardising the journey from brand awareness and business opportunity to order, service and repeat purchase.",
    ],
    solutionNote:
      "The programme turns mindset into processes and tools that each unit can apply, tied to the participants' real data and real areas.",
    implementation:
      "The programme was delivered unit by unit and area by area: training courses at VNPT Ho Chi Minh City, VNPT Hai Phong (the 2026 hands-on area training programme), VNPT Thai Binh, VNPT Binh Phuoc and many other provinces. At VNPT Ca Mau, the team applied it straight away in field sales and customer care campaigns in Phuoc Long, Tran Van Thoi and Hoa Binh. Participants worked on real data and real areas, then standardised how they approach and care for customers.",
    results:
      "Teams share one framework for analysing their areas, and the customer journey is standardised from brand recognition to service and repeat purchase. The delivery model has been repeated in many locations, linked to field sales campaigns in each area.",
    quote: {
      text: "The hands-on programme gave the team a shared language for reading their areas and standardising the customer journey.",
      author: "VABIX",
      role: "Company profile",
    },
    galleryAlts: [
      "VNPT participants at a hands-on training session",
      "VNPT Ho Chi Minh City: the “Green Warriors” programme",
      "VNPT Ca Mau field sales and customer care campaign in Tran Van Thoi",
      "VNPT Ca Mau field sales and customer care campaign in Phuoc Long",
      "Working session at VNPT Ho Chi Minh City",
      "VNPT Ca Mau field sales and customer care campaign in Phuoc Long",
      "VNPT Hai Phong hands-on area training course, 2026",
      "VNPT Ca Mau campaign at the Hoa Binh service point",
    ],
    lesson:
      "For organisations with many branches, the value lies in turning knowledge into processes that can be replicated, not in a single inspirational session.",
  },
  {
    slug: "sihub-startup-sme",
    industry: "Startups & innovation",
    challenge:
      "The startup and SME community needs hands-on management knowledge that fits the Vietnamese context, not international models copied wholesale that are hard to apply.",
    solution:
      "VABIX worked with SIHUB (Ho Chi Minh City) on a series of knowledge-sharing programmes: project management, people management, branding, digital marketing, presentation, sales, strategy and corporate finance.",
    implementation:
      "Courses and workshops were held at SIHUB for startups and SMEs that need hands-on management tools. Attendance figures and organising roles must be confirmed for each event before being used in communications.",
    results:
      "Founders and managers gained access to hands-on management tools and connected with experts and a community that learns, shares and grows together. Specific scope and numbers are recorded per programme and are not extrapolated into achievements of the legal entity.",
    context:
      "SIHUB is the Saigon Innovation Hub of Ho Chi Minh City. Bringing practical management knowledge to startups and SMEs helps them shorten the distance from idea to operations.",
    lesson:
      "Sharing knowledge only has value when it comes with tools, real cases and a connected environment, and does not stop at the lecture.",
  },
  {
    slug: "csed-so-cong-thuong-tphcm",
    organizationFull: "CSED – HCMC Department of Industry and Trade",
    industry: "Capability building for industrial businesses",
    headline: "Building management, product development and market capability for industrial businesses",
    summary:
      "Working with CSED on a support programme for businesses in 03 key sectors (mechanical engineering and automation, rubber and plastics, and food processing), VABIX delivered 05 hands-on training modules, from work management and workforce development to e-commerce, product development and commercialisation.",
    resultSummary:
      "05 modules delivered, linking management knowledge to the businesses' real problems and helping to strengthen operations, product innovation and market access.",
    highlights: [
      { value: "03", label: "Key sectors" },
      { value: "05", label: "Hands-on modules" },
      { value: "2026", label: "Year delivered" },
    ],
    context:
      "As part of a programme supporting businesses in 03 key sectors of Ho Chi Minh City (mechanical engineering and automation, rubber and plastics, and food processing), CSED runs activities to strengthen management capability, improve productivity and quality, and develop markets for businesses.",
    challenge:
      "Businesses need to operate more efficiently, develop their workforce, adapt to digital business trends and get new products to market more effectively. The challenge is to turn management knowledge into practical tools that fit each business's operating conditions.",
    solution: "VABIX worked with CSED to deliver 05 training modules:",
    solutionItems: [
      "Effective work management skills.",
      "Recruiting, training and developing the workforce.",
      "E-commerce and modern affiliate marketing.",
      "Managing the new product development process.",
      "Commercialising new products.",
    ],
    solutionNote:
      "The programme emphasises hands-on training, combining management knowledge, real cases and the exchange of experience in applying it within businesses.",
    implementation:
      "In 2026, VABIX ran 05 modules under a joint plan with CSED for businesses in the supported sectors. The training combined expert guidance, case discussions and answers to issues arising in day-to-day management, production and business.",
    results:
      "05 modules were delivered, helping to equip participants with knowledge and tools for work management, workforce development, digital business, and product development and commercialisation. The programme gave participants the chance to exchange experience, learn practical management methods and identify how to apply them in their own businesses.",
    lesson:
      "Strengthening a business's competitiveness has to start with its internal management capability, connected to product innovation and market development. Hands-on training is the bridge that helps businesses turn knowledge into action and move towards sustainable growth.",
  },
  {
    slug: "suspro-ai-first",
    organization: "Enterprise",
    organizationFull: "Partner enterprise · SUSPRO",
    headline: "AI-First Enterprise: bringing AI into marketing, sales and management",
    industry: "Manufacturing / services business",
    challenge:
      "The business needed to raise productivity in marketing, sales and management, while standardising processes rather than digitising piecemeal.",
    solution:
      "VABIX delivered the AI-First Enterprise™ programme, focused on marketing, sales, management and automation, building AI into workflows rather than slogans.",
    implementation:
      "The programme combined BizCar systems thinking with AI productivity tools, helping the team standardise key processes and measure change.",
    results:
      "An AI-First mindset took root in the core team, processes became more standardised, and productivity improved across marketing, sales and management.",
    context:
      "SUSPRO is a partner enterprise in the VABIX 2026 company profile, representing businesses that need transformation tied to real operations.",
    lesson:
      "AI only creates value when it is built into processes and metrics, not when it stands alone as a technology project.",
  },
];
