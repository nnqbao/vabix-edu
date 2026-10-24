import { programs } from "@/content/programs";
import { methodologies } from "@/content/methodologies";
import { experts } from "@/content/experts";
import { articles } from "@/content/articles";
import { caseStudies } from "@/content/caseStudies";
import { events } from "@/content/events";
import { knowledgeProducts } from "@/content/knowledgeProducts";
import { solutions } from "@/content/solutions";
import { consultingServices } from "@/content/consulting";
import { programsEn } from "@/content/en/programs";
import { methodologiesEn } from "@/content/en/methodologies";
import { expertsEn } from "@/content/en/experts";
import { articlesEn } from "@/content/en/articles";
import { caseStudiesEn } from "@/content/en/caseStudies";
import { eventsEn } from "@/content/en/events";
import { knowledgeProductsEn } from "@/content/en/knowledgeProducts";
import { solutionsEn } from "@/content/en/solutions";
import { consultingServicesEn } from "@/content/en/consulting";
import { enHonorific, localizeList } from "@/i18n/pick";
import type { Locale } from "@/i18n/locale";
import { getCms, listPublishedCms, publicPayload, type CmsDocument } from "./service";
import { parseJson } from "@/platform/sanitize";
import { mapExpertCmsPayload } from "./expertPayload";
import { seedCmsFromFiles } from "./seed";
import { fileSeedSourceFrom, isOrphanedFileSeed, type FileSeedSource } from "./orphans";
import { pickAllowlisted } from "@/platform/permissions/registry";
import type { ArticleCategory, Expert, TrainingProgram as Program } from "@/content/types";

// Every content file that `seedCmsFromFiles()` copies into `cms_documents`, keyed by CMS type.
// Used to ignore leftover `file-seed` rows whose entry has been removed from `src/content/*`.
const FILE_SEED_ITEMS: Record<string, () => readonly { slug: string; id?: string }[]> = {
  program: () => programs,
  methodology: () => methodologies,
  expert: () => experts,
  article: () => articles,
  case_study: () => caseStudies,
  event: () => events,
  knowledge_product: () => knowledgeProducts,
  solution: () => [...solutions, ...consultingServices],
};

const fileSeedSources = new Map<string, FileSeedSource>();

function fileSeedSource(type: string): FileSeedSource | null {
  const items = FILE_SEED_ITEMS[type];
  if (!items) return null;
  let source = fileSeedSources.get(type);
  if (!source) {
    source = fileSeedSourceFrom(items());
    fileSeedSources.set(type, source);
  }
  return source;
}

type PayloadMapper = (doc: CmsDocument) => Record<string, unknown>;

function expertPayload(doc: CmsDocument): Record<string, unknown> {
  return mapExpertCmsPayload(
    doc.title,
    parseJson<Record<string, unknown>>(doc.payload, {}),
    publicPayload<Record<string, unknown>>(doc),
  );
}

function overlayList<T extends { slug: string }>(
  type: string,
  files: T[],
  toPayload: PayloadMapper = (doc) => publicPayload<Record<string, unknown>>(doc),
): T[] {
  try {
    seedCmsFromFiles();
    const docs = listPublishedCms(type);
    const published = new Map(docs.map((doc) => [doc.slug, toPayload(doc) as Partial<T>]));
    const taken = new Set<string>();
    const merged: T[] = [];
    for (const file of files) {
      const doc = getCms(type, file.slug);
      if (doc) {
        if (doc.status === "published") {
          merged.push(mergeFileAndCms(file, published.get(file.slug)));
          taken.add(file.slug);
        }
        continue;
      }
      merged.push(file);
    }
    for (const doc of docs) {
      if (
        !taken.has(doc.slug) &&
        !files.some((file) => file.slug === doc.slug) &&
        !isOrphanedFileSeed(doc, fileSeedSource(type))
      ) {
        merged.push(toPayload(doc) as unknown as T);
      }
    }
    return merged;
  } catch {
    return files;
  }
}

function mergeFileAndCms<T extends object>(file: T, cms?: Partial<T>): T {
  if (!cms) return file;
  const merged = { ...file, ...cms } as T;
  for (const key of Object.keys(file) as (keyof T)[]) {
    const original = file[key];
    const next = merged[key];
    if (Array.isArray(original) && !Array.isArray(next)) merged[key] = original;
    if (original && typeof original === "object" && !Array.isArray(original) && (next == null || typeof next !== "object")) {
      merged[key] = original;
    }
    if (typeof original === "string" && typeof next !== "string") merged[key] = original;
  }
  return merged;
}

// Mọi hàm published* nhận `locale`: ở /en, bản dịch trong src/content/en/* được ghép lên theo slug.
export function publishedPrograms(locale: Locale = "vi"): Program[] {
  const files = programs.filter((item) => item.status === "published");
  const list = localizeList(overlayList("program", files).filter((item) => item.status !== "draft"), programsEn, locale);
  return locale === "en" ? list.map((p) => (p.durationNote === "Thời lượng được thiết kế theo nhu cầu" ? { ...p, durationNote: "Duration tailored to your needs" } : p)) : list;
}

export function publishedProgram(slug: string, locale: Locale = "vi") {
  return publishedPrograms(locale).find((item) => item.slug === slug) ?? null;
}

export function publishedFeaturedPrograms(locale: Locale = "vi") {
  return publishedPrograms(locale).filter((item) => item.featured);
}

export function publishedMethodologies(locale: Locale = "vi") {
  return localizeList(overlayList("methodology", methodologies), methodologiesEn, locale);
}

export function publishedMethodology(slug: string, locale: Locale = "vi") {
  return publishedMethodologies(locale).find((item) => item.slug === slug) ?? null;
}

export function publishedExperts(locale: Locale = "vi"): Expert[] {
  const list = localizeList(overlayList("expert", experts, expertPayload), expertsEn, locale);
  return locale === "en" ? list.map((e) => ({ ...e, name: enHonorific(e.name) })) : list;
}

export function publishedExpert(slug: string, locale: Locale = "vi") {
  return publishedExperts(locale).find((item) => item.slug === slug) ?? null;
}

export function publishedFeaturedExperts(locale: Locale = "vi") {
  return publishedExperts(locale)
    .filter((item) => item.featured)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function publishedArticles(locale: Locale = "vi") {
  return localizeList(overlayList("article", articles), articlesEn, locale);
}

export function publishedArticle(slug: string, locale: Locale = "vi") {
  return publishedArticles(locale).find((item) => item.slug === slug) ?? null;
}

export function publishedArticlesByCategory(category?: ArticleCategory, locale: Locale = "vi") {
  const list = [...publishedArticles(locale)].sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
  return category ? list.filter((item) => item.category === category) : list;
}

export function publishedCaseStudies(locale: Locale = "vi") {
  return localizeList(overlayList("case_study", caseStudies), caseStudiesEn, locale);
}

export function publishedCaseStudy(slug: string, locale: Locale = "vi") {
  return publishedCaseStudies(locale).find((item) => item.slug === slug) ?? null;
}

export function publishedEvents(locale: Locale = "vi") {
  return localizeList(overlayList("event", events), eventsEn, locale);
}

export function publishedEvent(slug: string, locale: Locale = "vi") {
  return publishedEvents(locale).find((item) => item.slug === slug) ?? null;
}

export function publishedUpcomingEvents(locale: Locale = "vi") {
  const rank: Record<string, number> = { upcoming: 0, ongoing: 1, completed: 2 };
  return [...publishedEvents(locale)].sort((a, b) => {
    const ra = rank[a.status] ?? 9;
    const rb = rank[b.status] ?? 9;
    if (ra !== rb) return ra - rb;
    return (a.startDate ?? "").localeCompare(b.startDate ?? "");
  });
}

export function publishedKnowledgeProducts(locale: Locale = "vi") {
  return localizeList(overlayList("knowledge_product", knowledgeProducts), knowledgeProductsEn, locale);
}

export function publishedKnowledgeProduct(slug: string, locale: Locale = "vi") {
  return publishedKnowledgeProducts(locale).find((item) => item.slug === slug) ?? null;
}

export function publishedSolutions(locale: Locale = "vi") {
  return localizeList(overlayList("solution", solutions), solutionsEn, locale);
}

export function publishedSolution(slug: string, locale: Locale = "vi") {
  return publishedSolutions(locale).find((item) => item.slug === slug) ?? null;
}

/** Dịch vụ tư vấn chuyển đổi (src/content/consulting.ts) theo ngôn ngữ. */
export function localizedConsultingServices<T extends { slug: string }>(list: T[], locale: Locale = "vi") {
  return localizeList(list, consultingServicesEn as unknown as (Partial<T> & { slug: string })[], locale);
}

export function publishedPage(slug: string) {
  try {
    seedCmsFromFiles();
    const doc = getCms("page", slug);
    if (!doc || doc.status !== "published") return null;
    return publicPayload<Record<string, unknown>>(doc);
  } catch {
    return null;
  }
}

export function publicCmsRecord(type: string, slug: string) {
  const doc = getCms(type, slug);
  if (!doc || doc.status !== "published") return null;
  if (isOrphanedFileSeed(doc, fileSeedSource(type))) return null;
  const record = type === "expert" ? expertPayload(doc) : { ...publicPayload(doc), title: doc.title };
  return pickAllowlisted(type, { ...record, slug: doc.slug });
}

export type { TrainingProgram } from "@/content/types";
