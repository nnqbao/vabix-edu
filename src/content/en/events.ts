import type { EventItem } from "../types";

// Bản dịch tiếng Anh cho `src/content/events.ts`: mỗi mục chỉ cần `slug` + các trường văn bản đã dịch.
// Được ghép lên dữ liệu gốc theo slug khi người xem ở /en (xem localizeList trong src/i18n/pick.ts).
export const eventsEn: (Partial<EventItem> & { slug: string })[] = [
  {
    slug: "khai-giang-bmdo-sihub",
    title: "BMDO opens at SIHUB: an operating design workshop for Vietnamese businesses",
    category: "Programme",
    excerpt:
      "Opening the BMDO operating design workshop with SIHUB, helping SME and startup leaders sketch out a practical operating system.",
    content:
      "The BMDO programme at SIHUB is designed as a working studio: participants look at their business through the BizCar framework, identify bottlenecks and redesign their operating capabilities. It is not a theory class but a facilitation space — questions, cases, tools and solutions for their own business.",
    location: "SIHUB, Ho Chi Minh City",
  },
  {
    slug: "su-kien-ket-noi-doanh-nghiep",
    title: "VABIX business connection event",
    category: "Connection",
    excerpt:
      "Meet experts, partners and businesses in the VABIX network to create opportunities for in-depth cooperation.",
    content:
      "Connection events are held regularly to bring value to customers, partners and residents of the Village. The programme covers capability introductions, cooperation discussions and industry-based supply–demand matching.",
    location: "Thanh Long Building, Ho Chi Minh City",
  },
  {
    slug: "workshop-chua-lanh-nang-luong-ceo-bmdo-01",
    title: "Healing and energy workshop for CEOs – BMDO cohort 01",
    category: "Workshop",
    excerpt:
      "A space for the CEOs of BMDO cohort 01, combining leadership energy with the operating design journey.",
    content:
      "The workshop was held as part of BMDO cohort 01 for the group of CEOs working with VABIX. The programme combined a space for sharing with a focus on sustainable leadership capability.",
    location: "Ho Chi Minh City",
  },
  {
    slug: "le-ra-mat-nen-tang-vabix",
    title: "VABIX platform launch",
    category: "Event",
    excerpt: "Launch of the VABIX Connection Village platform — a digital space for residents, suppliers and customers.",
    content:
      "The launch marked the start of a connection platform serving four groups: customers, suppliers, connection residents and the VABIX team.",
    location: "Ho Chi Minh City",
  },
  {
    slug: "dao-tao-cu-dan-ket-noi",
    title: "Connection resident training",
    category: "Training",
    excerpt:
      "A mandatory programme that helps residents complete the KLASS capability pyramid before connecting professionally.",
    content:
      "Connection resident training covers Village culture, communication skills, customer care, B2A, KLASS and AI tools — the requirements for becoming a Professional Connection Resident.",
    location: "Online & Ho Chi Minh City",
  },
  {
    slug: "ket-noi-khach-hang-chung-cu",
    title: "Connecting with apartment-building customers",
    category: "Connection",
    excerpt:
      "A supply–demand matching programme for resident communities and businesses that serve urban life.",
    content:
      "An event connecting businesses with customers in apartment complexes, part of the VABIX trade promotion pillar.",
    location: "Ho Chi Minh City",
  },
];
