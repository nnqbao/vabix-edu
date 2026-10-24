import type { ArticleCategory } from "../types";
import { knowledgeProductCategories as categoriesVi } from "../knowledgeProducts";

// Nhãn tiếng Anh cho các trang tri thức (/tri-thuc, /goc-chia-se, /san-pham-tri-thuc).

const CATEGORY_EN: Record<string, { title: string; summary: string }> = {
  sach: {
    title: "VABIX books",
    summary: "Knowledge publications that help business owners and their teams learn, apply and pass on practical methods.",
  },
  "cam-nang": {
    title: "Handbooks and guides",
    summary: "Topic-based guides that support decisions and action.",
  },
  "bieu-mau": {
    title: "Business management template set",
    summary: "Templates for assessing the current state, identifying problems, designing solutions, planning and tracking improvements.",
  },
  "hoc-lieu": {
    title: "Digital learning materials",
    summary: "Documents, videos, lectures and online learning content, opened only once the product and process are ready.",
  },
};

export const knowledgeProductCategories: typeof categoriesVi = categoriesVi.map((c) => ({ ...c, ...CATEGORY_EN[c.id] }));

export const articleCategories: { id: ArticleCategory; label: string }[] = [
  { id: "insights", label: "VABIX Insights" },
  { id: "chien-luoc", label: "Strategy" },
  { id: "quan-tri", label: "Management" },
  { id: "bizcar", label: "BizCar" },
  { id: "marketing", label: "Marketing" },
  { id: "sales", label: "Sales" },
  { id: "lanh-dao", label: "Leadership" },
  { id: "ai-chuyen-doi", label: "AI & Transformation" },
  { id: "case-study", label: "Case Study" },
  { id: "hoat-dong", label: "VABIX activities" },
];

export const supportServices = [
  { slug: "ho-tro-doanh-nhan-viet-sach", title: "Helping Vietnamese entrepreneurs write books", summary: "Working with entrepreneurs to turn hands-on knowledge into books." },
  { slug: "nhan-luc-thoi-vu", title: "Temporary staff for events", summary: "Staffing for events, programmes and activations." },
  { slug: "nha-dien-thuyet", title: "Professional speakers", summary: "Connecting speakers for conferences, kick-offs and internal programmes." },
  { slug: "ket-noi-kol", title: "KOL advice and connections", summary: "Connecting KOLs that fit your brand positioning and product category." },
];

export const workforce = {
  openTalent: {
    title: "Open talent",
    tagline: "Add expertise. Flex resources. Work towards shared goals.",
  },
  digitalTalent: {
    title: "Digital talent",
    tagline: "Clear tasks. The right permissions. Controlled operation.",
    principles: ["AI helps get the work done. People keep the decisions and the management accountability."],
  },
};
