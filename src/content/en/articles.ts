import type { Article } from "../types";
import { articlesAEn } from "./articles/group-a";
import { articlesBEn } from "./articles/group-b";
import { articlesCEn } from "./articles/group-c";
import { articlesDEn } from "./articles/group-d";
import { articlesEEn } from "./articles/group-e";

// Bản dịch tiếng Anh cho `src/content/articles.ts`: mỗi mục chỉ cần `slug` + các trường văn bản đã dịch.
// Được ghép lên dữ liệu gốc theo slug khi người xem ở /en (xem localizeList trong src/i18n/pick.ts).
export const articlesEn: (Partial<Article> & { slug: string })[] = [...articlesEEn, ...articlesAEn, ...articlesBEn, ...articlesCEn, ...articlesDEn];
