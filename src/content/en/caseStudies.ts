import type { CaseStudy } from "../types";

// Bản dịch tiếng Anh cho `src/content/caseStudies.ts`: mỗi mục chỉ cần `slug` + các trường văn bản đã dịch.
// Được ghép lên dữ liệu gốc theo slug khi người xem ở /en (xem localizeList trong src/i18n/pick.ts).
export const caseStudiesEn: (Partial<CaseStudy> & { slug: string })[] = [];
