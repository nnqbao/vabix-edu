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
