import { notFound } from "next/navigation";
import { caseStudies } from "@/content/caseStudies";
import { publishedCaseStudy, publishedCaseStudies } from "@/platform/cms/catalog";
import { CaseStudyDetail } from "@/components/templates/CaseStudyDetail";
import { createMetadata } from "@/lib/seo";
import { getLocale } from "@/i18n/server";

export function generateStaticParams() {
  const slugs = new Set(caseStudies.map((item) => item.slug));
  try {
    for (const item of publishedCaseStudies()) slugs.add(item.slug);
  } catch {
    /* file fallback */
  }
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = await getLocale();
  const c = publishedCaseStudy(slug, locale);
  if (!c) return {};
  return createMetadata({
    title: `${c.organization} — ${c.headline ?? c.industry}`,
    description: c.summary ?? c.challenge,
    path: `${locale === "en" ? "/en" : ""}/tri-thuc/case-study/${c.slug}`,
    image: c.coverImage,
  });
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = await getLocale();
  const c = publishedCaseStudy(slug, locale);
  if (!c) notFound();
  return <CaseStudyDetail c={c} />;
}
