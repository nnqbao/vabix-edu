import type { Book, Handbook } from "../types";
import { books as booksVi, handbooks as handbooksVi } from "../network";

// Bản tiếng Anh cho `books` và `handbooks` trong src/content/network.ts.
// Sách tiếng Việt giữ nguyên tên gốc; `titleEn` là phần dịch nghĩa tên sách, chỉ hiển thị ở /en.
export type BookEn = Book & { titleEn?: string };

const BOOKS_EN: Record<string, Partial<BookEn>> = {
  "nang-luong-hanh-phuc-gia-dinh-so-xa-hoi-xanh": {
    titleEn: "Happiness Energy in the Digital Family and the Green Society",
    summary: "A knowledge work on happiness energy in the context of the digital family and the green society.",
    publisher: "UEH Publishing House",
  },
  "quan-tri-kinh-doanh-thuc-chien-b2a": {
    titleEn: "Hands-on Business Management with the B2A Model",
    summary:
      "The knowledge foundation of the B2A model: from address and area to strategy and market results. A gift for Vietnamese aspirations.",
    publisher: "UEH Publishing House",
  },
  "chiec-xe-cuoc-doi-the-lifecar": {
    summary: "The life car model, The LifeCar, for seeing a person's journey as a system that can be designed.",
  },
  "bizcar-thiet-ke-van-hanh": {
    title: "BizCar: Designing and Running a Business",
    summary: "A framework of 12 functional blocks that helps leaders see the business as one unified system.",
  },
};

export const books: BookEn[] = booksVi.map((b) => ({ ...b, ...BOOKS_EN[b.slug] }));

const HANDBOOKS_EN: Record<string, Pick<Handbook, "title" | "summary">> = {
  "quan-ly-tai-chinh-ca-nhan": {
    title: "Personal finance management",
    summary: "A handbook to help members and learners take control of their personal cash flow.",
  },
  "lua-chon-thiet-bi-truyen-thong": {
    title: "Choosing communications equipment",
    summary: "Guidance on choosing communications equipment that fits a business's needs.",
  },
  "cam-nang-ve-gao": {
    title: "Understanding and choosing safe rice",
    summary: "A handbook for understanding and choosing safe rice with a transparent origin.",
  },
  "cam-nang-ve-gach": {
    title: "A handbook on bricks",
    summary: "A materials handbook for the architecture and construction village.",
  },
  "lua-chon-noi-that": {
    title: "Choosing furniture",
    summary: "Guidance on choosing furniture for living and working spaces.",
  },
  "mua-san-pham-sach": {
    title: "Buying clean products",
    summary: "A handbook for choosing clean products with a transparent origin.",
  },
  "cam-nang-du-lich": {
    title: "Travel handbook",
    summary: "Ideas for travel and accommodation experiences within the VABIX network.",
  },
};

export const handbooks: Handbook[] = handbooksVi.map((h) => ({ ...h, ...HANDBOOKS_EN[h.slug] }));
