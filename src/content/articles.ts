import type { Article, ArticleCategory } from "./types";
import { articlesA } from "./articles/group-a";
import { articlesB } from "./articles/group-b";
import { articlesC } from "./articles/group-c";
import { articlesD } from "./articles/group-d";
import { articlesE } from "./articles/group-e";

export const articleCategories: { id: ArticleCategory; label: string }[] = [
  { id: "insights", label: "VABIX Insights" },
  { id: "chien-luoc", label: "Chiến lược" },
  { id: "quan-tri", label: "Quản trị" },
  { id: "bizcar", label: "BizCar" },
  { id: "marketing", label: "Marketing" },
  { id: "sales", label: "Sales" },
  { id: "lanh-dao", label: "Lãnh đạo" },
  { id: "ai-chuyen-doi", label: "AI & Chuyển đổi" },
  { id: "case-study", label: "Case Study" },
  { id: "hoat-dong", label: "Hoạt động VABIX" },
];

// Bài viết chuyển từ vabix.vn/tin-tuc-trong-ngay, biên tập lại theo văn phong website (4 nhóm).
export const articles: Article[] = [...articlesE, ...articlesA, ...articlesB, ...articlesC, ...articlesD];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function articlesByCategory(category?: ArticleCategory) {
  const list = [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  return category ? list.filter((a) => a.category === category) : list;
}
