import { founderBooks as founderBooksVi, type FounderBook } from "../founderBooks";

// Bản tiếng Anh cho src/content/founderBooks.ts. Tên sách vốn là tiếng Anh; chỉ dịch phần giới thiệu.
export const founderAuthor = {
  name: "Nguyễn Chí Thành",
  nameEn: "Nguyen Chi Thanh",
  role: "Founder & CEO of VABIX · Author",
  portrait: "/images/portraits/nguyen-chi-thanh.webp",
  quote: "Turning an idea into a good book is difficult, but reading a good book can inspire ideas of great value.",
  quoteEn: "Turning an idea into a good book is difficult, but reading a good book can inspire ideas of great value.",
  motto: "Books for a brighter tomorrow",
};

const SUMMARIES: Record<string, string> = {
  "the-bizcar":
    "Seeing a business as a car: 12 parts that must be designed together to run as one. The foundation of the BMDO programme.",
  "every-market-has-an-address":
    "The B2A model: the market is read by address and area, not only by the B2B or B2C classification.",
  karot: "Design backwards, operate forwards, connect early: an operating system that turns targets into results and key actions.",
  "building-what-customers-feel":
    "Turning ideas into products and services that create experiences customers can genuinely feel.",
  "dgh-transformation":
    "A roadmap for Digital – Green – Happiness transformation, where people, data and value grow together sustainably.",
  "the-lifecar": "The life car: seeing the journey of living, working and learning as a system that can be designed.",
};

export const founderBooks: FounderBook[] = founderBooksVi.map((b) => ({ ...b, summary: SUMMARIES[b.slug] ?? b.summary }));
