import type * as vi from "../network";

// Bản tiếng Anh cho các mục trong `src/content/network.ts` dùng ở trang mạng lưới, bộ sưu tập,
// dịch vụ phụ trợ và tìm kiếm. Cùng tên export, cùng cấu trúc; slug/id giữ nguyên.

export const partners: typeof vi.partners = [
  { id: "vnpt", name: "VNPT", caption: "Vietnam Posts and Telecommunications Group", group: "enterprise" },
  { id: "asl", name: "ASL Logistics", caption: "ASL Logistics", group: "enterprise" },
  { id: "mb", name: "MB", caption: "Military Commercial Joint Stock Bank", group: "enterprise" },
  { id: "suspro", name: "SUSPRO", caption: "SUSPRO Joint Stock Company", group: "enterprise" },
  { id: "sihub", name: "SIHUB", caption: "Saigon Innovation Hub", group: "partner" },
  { id: "csed", name: "CSED", caption: "Center for Business Support and Economic Development", group: "partner" },
];

export const smeSegments: typeof vi.smeSegments = [
  { id: "startup", name: "Startups" },
  { id: "family", name: "Family businesses" },
  { id: "manufacturing", name: "Manufacturing businesses" },
  { id: "service", name: "Service businesses" },
];

export const testimonials: typeof vi.testimonials = [
  {
    id: "t1",
    quote:
      "Since joining VABIX, we have not only gained more high-quality orders but also received support with our marketing strategy and management.",
    author: "Mr Thuyền",
    role: "CEO, T&M Company",
  },
  {
    id: "t2",
    quote:
      "What I value most about VABIX is the sense of community. We have been connected with many partners in the same trade cluster to learn from each other and grow together.",
    author: "Mr Tỵ",
    role: "CEO, Lê Gia helmet company",
  },
  {
    id: "t3",
    quote:
      "The business opportunities that connection residents bring are consistently high quality and reach the right customers, which raises our order conversion rate.",
    author: "Ms Vân",
    role: "CEO, V.E.V Company",
  },
];

export const books: typeof vi.books = [
  {
    id: "b1",
    slug: "nang-luong-hanh-phuc-gia-dinh-so-xa-hoi-xanh",
    title: "Năng lượng hạnh phúc trong gia đình số và xã hội xanh (Happiness energy in the digital family and green society)",
    summary: "A knowledge work on happiness energy in the context of the digital family and a green society.",
    cover: "/images/books/nang-luong-hanh-phuc-gia-dinh-so-xa-hoi-xanh.jpg",
    author: "Nguyễn Chí Thành",
    publisher: "Ho Chi Minh City Economic Publishing House",
  },
  {
    id: "b2",
    slug: "quan-tri-kinh-doanh-thuc-chien-b2a",
    title: "Quản trị kinh doanh thực chiến theo mô hình B2A (Practical business management with the B2A model)",
    summary:
      "The knowledge foundation of the B2A model — from address and territory to strategy and market results. A gift for Vietnamese aspirations.",
    cover: "/images/books/quan-tri-kinh-doanh-thuc-chien-b2a.jpg",
    author: "Nguyễn Chí Thành",
    publisher: "Ho Chi Minh City Economic Publishing House",
  },
  {
    id: "b3",
    slug: "chiec-xe-cuoc-doi-the-lifecar",
    title: "Chiếc Xe Cuộc Đời — The LifeCar",
    summary: "The LifeCar model, for seeing a person's journey as a system that can be designed.",
  },
  {
    id: "b4",
    slug: "bizcar-thiet-ke-van-hanh",
    title: "BizCar — Designing and operating a business",
    summary: "A framework of 12 functional blocks that helps leaders see the business as one integrated system.",
  },
];

export const villages: typeof vi.villages = [
  { id: "v1", slug: "tu-van-dao-tao", name: "Consulting & Training", summary: "Brings together business consultants, trainers and coaches." },
  { id: "v2", slug: "truyen-thong-tiep-thi", name: "Communications & Marketing", summary: "360-degree marketing solutions, from strategy to content and brand." },
  { id: "v3", slug: "thuc-pham-thuc-uong", name: "Food & Beverage", summary: "Suppliers vetted for reputation, quality and safety." },
  { id: "v4", slug: "tai-chinh-bao-hiem", name: "Finance & Insurance", summary: "Financial services, insurance and resource advisory." },
  { id: "v5", slug: "khoa-hoc-cong-nghe", name: "Science & Technology", summary: "Technology solutions, digital transformation and innovation." },
  { id: "v6", slug: "nong-lam-ngu", name: "Agriculture, Forestry & Fisheries", summary: "Trade clusters and suppliers across the agriculture, forestry and fisheries chain." },
  { id: "v7", slug: "vien-thong", name: "Telecommunications & Television", summary: "Telecommunications, television and connectivity infrastructure services." },
  { id: "v8", slug: "kien-truc-xay-dung", name: "Architecture & Construction", summary: "Design, consulting and construction of buildings and works." },
  { id: "v9", slug: "vat-tu", name: "Supplies & Materials", summary: "Supplies and raw materials for construction and manufacturing." },
  { id: "v10", slug: "noi-that", name: "Interior & Exterior", summary: "Solutions for living and commercial spaces." },
  { id: "v11", slug: "dien-tu", name: "Electronics & Electromechanics", summary: "Electronic and electromechanical equipment and solutions." },
  { id: "v12", slug: "giao-nhan", name: "Freight & Transport", summary: "Logistics, freight forwarding and transport." },
  { id: "v13", slug: "bat-dong-san", name: "Real Estate Exchange", summary: "Connecting real estate needs across the network." },
  { id: "v14", slug: "du-lich", name: "Travel & Accommodation", summary: "Travel, accommodation and experience services." },
  { id: "v15", slug: "bao-bi", name: "Packaging & Labelling", summary: "Design and production of packaging and brand identity materials." },
  { id: "v16", slug: "an-pham", name: "Print & Gifts", summary: "Corporate publications and branded gifts." },
  { id: "v17", slug: "suc-khoe", name: "Health & Beauty", summary: "Health and beauty care services and products." },
  { id: "v18", slug: "phap-ly", name: "Legal Services", summary: "Corporate legal advice and compliance." },
  { id: "v19", slug: "ke-toan", name: "Accounting & Auditing", summary: "Accounting, auditing and financial management services." },
  { id: "v20", slug: "moi-truong", name: "Cleaning & Environment", summary: "Cleaning, environmental and landscaping services." },
];

export const collections: typeof vi.collections = [
  { slug: "quyet-dinh-bo-nhiem", title: "Appointment decisions", summary: "Appointment records and organisational milestones of VABIX." },
  { slug: "hinh-anh-ky-ket", title: "Signing ceremonies", summary: "Moments of cooperation, signing and partnership with our partners." },
  { slug: "hinh-anh-dao-tao", title: "Training", summary: "Coaching courses, workshops and hands-on classes." },
  { slug: "hinh-anh-ket-noi", title: "Connection events", summary: "Events connecting businesses, experts and residents." },
  { slug: "mau-chung-nhan", title: "Certificate samples", summary: "Supplier and resident certificates in the VABIX Village." },
];

export const supportServices: typeof vi.supportServices = [
  { slug: "ho-tro-doanh-nhan-viet-sach", title: "Book-writing support for Vietnamese entrepreneurs", summary: "Helping entrepreneurs turn hands-on knowledge into a book." },
  { slug: "nhan-luc-thoi-vu", title: "Temporary staff for events", summary: "Staffing for events, programmes and activations." },
  { slug: "nha-dien-thuyet", title: "Professional speakers", summary: "Connecting speakers for conferences, kick-offs and internal programmes." },
  { slug: "ket-noi-kol", title: "KOL advisory and matching", summary: "Connecting KOLs who fit the brand positioning and product category." },
];

export const supplierBenefits: typeof vi.supplierBenefits = [
  { n: "01", title: "Reach the right market", body: "Trustworking screens needs before making introductions, cutting the time spent meeting unsuitable partners." },
  { n: "02", title: "Profile and proof of capability", body: "Standardise your supplier profile to build credibility when you are introduced." },
  { n: "03", title: "Feedback to improve", body: "Receive feedback from the connection process to refine your products, services and approach." },
  { n: "04", title: "Expert network", body: "Access expertise within the ecosystem when a challenge needs support." },
  { n: "05", title: "Events and industry villages", body: "Take part in purposeful community activities, not business-card swapping." },
  { n: "06", title: "Long-term cooperation", body: "Pursue lasting relationships. VABIX does not guarantee revenue or successful deals." },
];
