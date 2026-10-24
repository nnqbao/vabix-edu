import { articleCategories as articleCategoriesVi } from "@/content/articles";
import { articleCategories as articleCategoriesEn } from "@/content/en/knowledgeHub";
import { getLocale } from "@/i18n/server";
import { publishedArticlesByCategory } from "@/platform/cms/catalog";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Section";
import { ArticleCard } from "@/components/cards/Cards";
import { createMetadata } from "@/lib/seo";
import { paths } from "@/lib/paths";
import Link from "next/link";
import type { ArticleCategory } from "@/content/types";

export async function generateMetadata() {
  const en = (await getLocale()) === "en";
  return createMetadata({
    title: en ? "Insights" : "Góc chia sẻ",
    description: en
      ? "Articles, cases, news and events, and expert content from VABIX."
      : "Bài viết, case, tin tức / sự kiện và nội dung chuyên môn của VABIX.",
    path: en ? `/en${paths.insights}` : paths.insights,
  });
}

export default async function InsightsPage({
  searchParams,
}: {
  searchParams: Promise<{ "chuyen-muc"?: string }>;
}) {
  const sp = await searchParams;
  const cat = sp["chuyen-muc"] as ArticleCategory | undefined;
  const locale = await getLocale();
  const en = locale === "en";
  const articleCategories = en ? articleCategoriesEn : articleCategoriesVi;
  const list = publishedArticlesByCategory(cat && articleCategories.some((c) => c.id === cat) ? cat : undefined, locale);
  return (
    <>
      <PageHero
        title={en ? "Insights" : "Góc chia sẻ"}
        description={
          en
            ? "Articles, cases and activities, news and events, and expert content. No editorial notes are published here."
            : "Bài viết, case / hoạt động, tin tức / sự kiện và nội dung chuyên môn. Không đăng ghi chú biên tập."
        }
        crumbs={[{ name: en ? "Home" : "Trang chủ", href: "/" }, { name: en ? "Insights" : "Góc chia sẻ" }]}
      />
      <Container className="py-12">
        <div className="flex flex-wrap gap-2">
          <Link href={paths.insights} className="border px-3 py-1.5 text-xs font-semibold tracking-wide uppercase">
            {en ? "All" : "Tất cả"}
          </Link>
          {articleCategories.map((c) => (
            <Link key={c.id} href={`${paths.insights}?chuyen-muc=${c.id}`} className="border border-vabix-deep-teal/15 px-3 py-1.5 text-xs font-semibold tracking-wide text-vabix-deep-teal uppercase">
              {c.label}
            </Link>
          ))}
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {list.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      </Container>
    </>
  );
}
