import type { Article } from "../types";

// Bản dịch tiếng Anh cho `src/content/articles.ts`: mỗi mục chỉ cần `slug` + các trường văn bản đã dịch.
// Được ghép lên dữ liệu gốc theo slug khi người xem ở /en (xem localizeList trong src/i18n/pick.ts).
export const articlesEn: (Partial<Article> & { slug: string })[] = [
  {
    slug: "thiet-ke-va-van-hanh-doanh-nghiep-toan-dien",
    title: "Designing and running the whole business",
    excerpt:
      "A business is not a random collection of departments. It is a car, with a driver, wheels, an engine and fuel.",
    content: `A business is not a random collection of departments. It is a car, with a driver, wheels, an engine and fuel. If one wheel turns out of line, the whole journey drifts off course. The leader's job is to design, tune and keep that car running reliably and quickly all the way to its destination.

That is the core idea behind the BizCar model, a thinking framework that helps leaders see their business as a system of 12 functional blocks. When the big picture is unclear, innovation easily becomes piecemeal. Once leaders can see the car, they know which part is weak, which wheel is slipping and which component to tighten first.

VABIX works alongside businesses on the SEE – DESIGN – ALIGN – OPERATE journey: see clearly, design, align and operate. Knowledge only matters when it is applied. Connections only have value when they lead to lasting collaboration.`,
    categoryLabel: "BizCar",
  },
  {
    slug: "giai-ma-b2a-tu-ket-noi-den-doanh-thu",
    title: "Decoding B2A: from connections to revenue",
    excerpt: "B2A takes sales teams from addresses and areas to strategy and results, instead of connecting in general terms.",
    content: `B2A is the model VABIX uses to turn connections into revenue with a clear address. Instead of talking about "expanding the market" in vague terms, B2A makes the team answer: which address, which area, what approach strategy and how resources will be allocated.

The four steps Address → Area → Strategy → Result help the team read the market by address. When every area has its own way of being read, coverage and customer care become more systematic and less dependent on a few outstanding individuals.

B2A complements BABOSO: one standardises how the market is worked across space, the other standardises the customer journey over time.`,
    categoryLabel: "Sales",
  },
  {
    slug: "doi-moi-sang-tao-quan-tri-sme-startup",
    title: "Innovation in SME and startup management: design thinking and hands-on operations",
    excerpt: "Innovation does not stop at declarations. A workshop with SIHUB brings innovation into every part of the business.",
    content: `The workshop "Innovation in SME and Startup Management: Design Thinking and Hands-on Business Operations" was co-organised by SIHUB and VABIX. Attendance figures and organising roles are recorded per event and are not used as default figures on this website.

Seen through a management lens, innovation has to be the process of turning ideas into real value: products, services, processes, marketing or business models. Following BizCar, once a business sees its own car clearly, it knows which wheel to change first and avoids "innovating on the wrong wheel".

Vietnamese SMEs and startups are like small cars: they need to be durable, agile and fuel-efficient. BizCar provides a shared language that links strategy, market, product, people, finance and operations.`,
    categoryLabel: "Strategy",
  },
  {
    slug: "khai-giang-bmdo-tai-sihub",
    title: "BMDO opens at SIHUB: an operations design workshop for Vietnamese businesses",
    excerpt: "BMDO is not a lecture course. It is a workshop where leaders redesign the operating capability of their own business.",
    content: `VABIX runs BMDO as an operations design workshop. Participants bring real problems and real data, and leave with a design of their own business.

The opening at SIHUB marks a step towards bringing this method closer to the startup and SME community in Ho Chi Minh City: organisations that need tools that are both rigorous and lean enough to use straight away.`,
    categoryLabel: "Management",
  },
  {
    slug: "quan-tri-niem-tin",
    title: "Managing trust: a foundational theory and a practical tool for businesses in an age of acceleration",
    excerpt: "Acceleration does not last without trust inside the organisation and with the market.",
    content: `In an age of acceleration, businesses easily chase new tools and channels while neglecting the foundation: trust. Managing trust is not a culture slogan. It is how an organisation keeps its word, operates transparently and creates a consistent experience that customers, employees and partners feel every day.

VABIX places trust within its six golden words, especially Thực tín (genuine integrity): keeping one's word, acting truthfully, being open and being trustworthy.`,
    categoryLabel: "Leadership",
  },
  {
    slug: "hanh-trinh-van-dam-cung-mybizcar",
    title: "The long road with MyBizCar",
    excerpt: "BizCar does not stop at an infographic. MyBizCar is the journey in which every leader drives their own business.",
    content: `MyBizCar is how VABIX invites leaders to turn the 12-block framework into a living map of their own business. Every stage is a chance to look back: does the strategy still fit the market? Can resources sustain operations? Is the culture the right oil for the system?

A long journey does not begin with speed. It begins with seeing the car you actually have.`,
    categoryLabel: "BizCar",
  },
];
