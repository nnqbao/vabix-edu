import type { Locale } from "./locale";

/** Chọn chuỗi / giá trị theo ngôn ngữ: `t(locale, "Tiếng Việt", "English")`. */
export function t<T>(locale: Locale, vi: T, en: T): T {
  return locale === "en" ? en : vi;
}

type WithSlug = { slug: string };

/**
 * Ghép bản dịch tiếng Anh (chỉ cần các trường văn bản) lên danh sách gốc theo `slug`.
 * Mục chưa có bản dịch giữ nguyên tiếng Việt.
 */
export function localizeList<T extends WithSlug>(list: T[], en: readonly (Partial<T> & WithSlug)[], locale: Locale): T[] {
  if (locale !== "en" || !en.length) return list;
  const map = new Map(en.map((item) => [item.slug, item]));
  return list.map((item) => {
    const tr = map.get(item.slug);
    return tr ? ({ ...item, ...tr } as T) : item;
  });
}

export function localizeItem<T extends WithSlug>(item: T | null | undefined, en: readonly (Partial<T> & WithSlug)[], locale: Locale): T | null {
  if (!item) return null;
  return localizeList([item], en, locale)[0];
}

// Học hàm trong tên chuyên gia cho bản tiếng Anh: "ThS. A" → "A, MA", "TS. A" → "Dr A", "ThS. NCS. A" → "A, MA, PhD candidate".
export function enHonorific(name: string): string {
  let rest = name.trim();
  let dr = false;
  let lawyer = false;
  const after: string[] = [];
  for (;;) {
    const m = rest.match(/^(ThS\.|TS\.|NCS\.?|Luật sư)\s+(.+)$/);
    if (!m) break;
    if (m[1] === "ThS.") after.push("MA");
    else if (m[1] === "TS.") dr = true;
    else if (m[1] === "Luật sư") lawyer = true;
    else after.push("PhD candidate");
    rest = m[2];
  }
  const prefix = dr ? "Dr " : lawyer ? "Lawyer " : "";
  return `${prefix}${rest}${after.length ? `, ${after.join(", ")}` : ""}`;
}
