import type { Solution } from "../types";

// Bản dịch tiếng Anh cho `src/content/solutions.ts`: mỗi mục chỉ cần `slug` + các trường văn bản đã dịch.
// Được ghép lên dữ liệu gốc theo slug khi người xem ở /en (xem localizeList trong src/i18n/pick.ts).
export const solutionsEn: (Partial<Solution> & { slug: string })[] = [];
