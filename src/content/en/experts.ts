import type { Expert } from "../types";

// Bản dịch tiếng Anh cho `src/content/experts.ts`: mỗi mục chỉ cần `slug` + các trường văn bản đã dịch.
// Được ghép lên dữ liệu gốc theo slug khi người xem ở /en (xem localizeList trong src/i18n/pick.ts).
export const expertsEn: (Partial<Expert> & { slug: string })[] = [
  {
    slug: "nguyen-chi-thanh",
    title: "Founder of VABIX and creator of Vietnamese management doctrines and knowledge models.",
    organizationRole: "Founder of VABIX · Chairman and CEO",
    expertise: ["BizCar", "BMDO", "B2A", "Strategy", "Operating design"],
    shortBio:
      "Founder of VABIX and of the BizCar model. Author of the BMDO, MTA Engine and B2A frameworks, he works alongside Vietnamese businesses on practical operating design and execution.",
    fullBio:
      "Mr Nguyễn Chí Thành is the Founder of VABIX and Chairman and CEO of VABIX Joint Stock Company, as well as the author of the BizCar model. He has researched and applied practical management frameworks, including BMDO, MTA Engine and B2A, to help leaders see their business as one integrated system, identify bottlenecks and redesign operating capabilities to fit each stage of growth. He accompanies the Vietnamese business community on its journey to build inner strength and widen its connections.",
  },
  {
    slug: "tran-van-lieng",
    title: "Senior advisor; Chairman of the Ho Chi Minh City Quality Association; strategic management expert",
    organizationRole: "Senior advisor · Chairman of the Ho Chi Minh City Quality Association",
    expertise: ["Strategic management", "Quality", "Management systems"],
    shortBio:
      "Senior advisor to VABIX, Chairman of the Ho Chi Minh City Quality Association and a strategic management expert with experience supporting Vietnamese businesses.",
    fullBio:
      "Dr Trần Văn Liêng is a senior advisor to VABIX, Chairman of the Ho Chi Minh City Quality Association and a strategic management expert. He brings systems thinking and quality standards to VABIX consulting and training programmes, helping businesses link strategy to operations and measure real results.",
  },
  {
    slug: "dang-minh-nguyen",
    title: "Marketing and TOT facilitation expert",
    organizationRole: "VABIX expert",
    expertise: ["Marketing", "Facilitation", "Training of Trainers"],
    shortBio:
      "Marketing and TOT facilitation expert who works with VABIX on designing learning materials and facilitating sessions using a learning-by-doing approach.",
    fullBio:
      "Đặng Minh Nguyên (MA) specialises in marketing and TOT facilitation. He helps VABIX turn knowledge into practical tools, so that participants can analyse situations themselves and build solutions for their own businesses.",
  },
  {
    slug: "nguyen-thi-thanh-thuy",
    title: "External relations expert; leads Partnership.",
    organizationRole: "VABIX expert",
    expertise: ["External relations", "Partnerships", "Network building"],
    shortBio:
      "External relations expert who leads Partnership, connecting VABIX with organisations, associations and the business community.",
    fullBio:
      "Nguyễn Thị Thanh Thùy (MA) is an external relations expert who leads Partnership across the VABIX network. She helps design cooperation models with businesses, universities, training institutes and business support organisations.",
  },
  {
    slug: "ho-xuan-vinh",
    title: "Human resource management expert",
    organizationRole: "VABIX expert",
    expertise: ["Human resource management", "Organisation", "Team development"],
    shortBio:
      "Human resource management expert who helps businesses design their structure, coordination mechanisms and team capabilities.",
    fullBio:
      "Hồ Xuân Vinh (MA) works with VABIX on human resource management and organisational programmes. He helps businesses connect people to the operating system rather than treating HR as a separate department.",
  },
  {
    slug: "kieu-tan-vu",
    title: "Marketing and communications systems expert.",
    organizationRole: "VABIX expert",
    expertise: ["Marketing", "Communications", "Brand systems"],
    shortBio:
      "Marketing and communications systems expert who helps businesses standardise their brand and market messaging.",
    fullBio:
      "Kiều Tấn Vũ (MA) specialises in marketing and communications systems. He takes part in brand coaching, digital marketing and message standardisation programmes for businesses in the VABIX network.",
  },
  {
    slug: "le-anh-tu",
    title: "Finance expert with many years of experience at PwC",
    organizationRole: "VABIX expert · Many years of experience at PwC",
    expertise: ["Corporate finance", "Audit", "Performance management"],
    shortBio:
      "Finance expert with many years of experience at PwC who helps businesses read their financial health accurately and design management tools.",
    fullBio:
      "Mr Lê Anh Tú is a finance expert who brings many years of finance and audit experience at PwC to VABIX programmes. He helps leaders see clearly their cash flow, cost structure and the indicators to track when redesigning operations.",
  },
  {
    slug: "pham-kim-phuong",
    title: "Finance and e-commerce expert",
    organizationRole: "VABIX expert",
    expertise: ["Finance", "E-commerce"],
    shortBio: "Finance and e-commerce expert who links cash-flow management with digital business models.",
    fullBio:
      "Phạm Kim Phượng (MA) works with VABIX on corporate finance and e-commerce topics, helping participants turn figures into decisions.",
  },
  {
    slug: "vu-thi-huyen",
    title: "Legal and intellectual property expert.",
    organizationRole: "VABIX expert",
    expertise: ["Corporate law", "Intellectual property"],
    shortBio:
      "Lawyer specialising in corporate law and intellectual property who helps businesses operate within the legal framework.",
    fullBio:
      "Lawyer Vũ Thị Huyền advises on legal and intellectual property matters in the VABIX ecosystem, helping businesses protect their knowledge assets and stay compliant as they expand their connections.",
  },
  {
    slug: "nguyen-tran-doan-khoa",
    title: "Digital transformation and AI expert",
    organizationRole: "VABIX expert",
    expertise: ["Digital transformation", "AI", "Productivity"],
    shortBio:
      "Digital transformation and AI expert who helps businesses build technology into their processes instead of stopping at slogans.",
    fullBio:
      "Mr Nguyễn Trần Đoan Khoa works on the VABIX AI-First Enterprise programmes, helping leaders and teams bring AI into their workflows, productivity and decision-making.",
  },
  {
    slug: "nguyen-van-quyet",
    title: "Innovative entrepreneurship training expert",
    organizationRole: "VABIX expert",
    expertise: ["Training", "Entrepreneurship", "Innovation"],
    shortBio:
      "Innovative entrepreneurship training expert who works with startups and SMEs to shape their operating models.",
    fullBio:
      "Mr Nguyễn Văn Quyết takes part in knowledge-sharing programmes with SIHUB and the startup community, helping founders access practical management tools.",
  },
  {
    slug: "tran-anh-vu",
    title: "Founder & CEO, VSC GROUP\nCo-Founder & CAIO, VABIX\nLecturer – Speaker – AI Marketing expert",
    organizationRole: "Co-Founder & CAIO, VABIX",
    expertise: [
      "AI Marketing & brand strategy",
      "Applied artificial intelligence in business",
      "Digital transformation & operations automation",
      "Communications strategy & content creation",
      "AI capability training and development",
    ],
    tags: ["AI Marketing", "Applied AI"],
    shortBio:
      "An expert in AI Marketing, brand strategy and applying artificial intelligence to business management; Founder & CEO of VSC GROUP and Co-Founder & CAIO of VABIX.",
    fullBio: `Trần Anh Vũ (MA, PhD candidate) is an expert in AI Marketing, brand strategy and the application of artificial intelligence to business management. He is the Founder and CEO of VSC GROUP and also serves as Co-Founder and Chief AI Officer (CAIO) of VABIX.

With an interdisciplinary background in marketing, business management, multimedia communications and technology, he combines strategic thinking, creativity and applied AI to solve real business problems.

As a leader and adviser, he focuses on researching and developing applied AI solutions, AI Agent systems and automation models that help businesses streamline operations, make better decisions and grow their marketing sustainably.

Alongside his business work, he teaches, trains and shares knowledge on marketing, communications and artificial intelligence. He concentrates on turning complex technology concepts into methods, tools and practical skills that fit each group of learners and each organisation.

At VABIX, he helps build AI capability, connects knowledge with technology and works with businesses as they move from traditional management thinking to operating models supported by artificial intelligence.`,
    philosophy:
      "He believes the value of AI lies not only in what it can automate, but in how people design, direct and control the technology to create real value.",
    quote: "AI supports the work. People set the direction, make the decisions and take responsibility for the value created.",
  },
];
