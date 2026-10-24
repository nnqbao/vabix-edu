import type { KnowledgeProduct } from "../types";

// Bản dịch tiếng Anh cho `src/content/knowledgeProducts.ts`: mỗi mục chỉ cần `slug` + các trường văn bản đã dịch.
// Được ghép lên dữ liệu gốc theo slug khi người xem ở /en (xem localizeList trong src/i18n/pick.ts).
export const knowledgeProductsEn: (Partial<KnowledgeProduct> & { slug: string })[] = [
  {
    slug: "quan-tri-kinh-doanh-thuc-chien-b2a",
    title: "Quản trị kinh doanh thực chiến theo mô hình B2A (Hands-on Business Management with the B2A Model)",
    summary: "The knowledge foundation of the B2A model: from address and area to strategy and market results.",
  },
  {
    slug: "bizcar-thiet-ke-van-hanh",
    title: "BizCar: Designing and Running a Business",
    summary: "A framework of 12 functional blocks that helps leaders see the business as one unified system.",
  },
  {
    slug: "chiec-xe-cuoc-doi-the-lifecar",
    title: "Chiếc Xe Cuộc Đời — The LifeCar",
    summary: "The life car model: The LifeCar.",
  },
  {
    slug: "nang-luong-hanh-phuc-gia-dinh-so-xa-hoi-xanh",
    title: "Năng lượng hạnh phúc trong gia đình số và xã hội xanh (Happiness Energy in the Digital Family and the Green Society)",
    summary: "A knowledge work on happiness energy in the context of the digital family and the green society.",
  },
  {
    slug: "bo-bieu-mau-quan-tri",
    title: "Business management template set",
    summary:
      "Supports assessing the current state, identifying problems, designing solutions, planning and tracking improvements. Not yet on sale or available for public download until the product and access rights are approved.",
  },
  {
    slug: "hoc-lieu-so",
    title: "Digital learning materials",
    summary:
      "Documents, videos, lectures and online learning content. Access will open once there is a real product, usage rights and a business process in place.",
  },
];
