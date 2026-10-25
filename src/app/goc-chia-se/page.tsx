import Image from "next/image";
import Link from "next/link";
import { articleCategories as articleCategoriesVi } from "@/content/articles";
import { articleCategories as articleCategoriesEn } from "@/content/en/knowledgeHub";
import { getLocale } from "@/i18n/server";
import { publishedArticlesByCategory } from "@/platform/cms/catalog";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Section";
import { ArticleCard } from "@/components/cards/Cards";
import { createMetadata } from "@/lib/seo";
import { paths } from "@/lib/paths";
import type { ArticleCategory } from "@/content/types";

export async function generateMetadata() {
  const en = (await getLocale()) === "en";
  return createMetadata({
    title: en ? "Articles" : "Bài viết",
    description: en
      ? "Articles, programme news, case studies and expert perspectives from VABIX."
      : "Bài viết, tin hoạt động, case study và góc nhìn chuyên môn từ VABIX.",
    path: en ? `/en${paths.insights}` : paths.insights,
  });
}

export default async function InsightsPage({
  searchParams,
}: {
  searchParams: Promise<{ "chuyen-muc"?: string }>;
}) {
  const sp = await searchParams;
  const locale = await getLocale();
  const en = locale === "en";
  const categories = en ? articleCategoriesEn : articleCategoriesVi;
  const all = publishedArticlesByCategory(undefined, locale);
  const used = categories.filter((c) => all.some((a) => a.category === c.id));
  const cat = used.some((c) => c.id === sp["chuyen-muc"]) ? (sp["chuyen-muc"] as ArticleCategory) : undefined;
  const list = cat ? all.filter((a) => a.category === cat) : all;
  const [lead, ...rest] = list;

  const chip = (active: boolean) =>
    `rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
      active ? "border-vabix-deep-teal bg-vabix-deep-teal text-white" : "border-vabix-deep-teal/15 bg-white text-vabix-deep-teal hover:border-vabix-gold hover:text-vabix-gold"
    }`;

  return (
    <>
      <PageHero
        eyebrow={en ? "VABIX Knowledge" : "Tri thức VABIX"}
        title={en ? "Articles" : "Bài viết"}
        description={
          en
            ? "Management models, perspectives from practice, and news from VABIX programmes with businesses and partners."
            : "Mô hình quản trị, góc nhìn thực chiến và tin hoạt động từ các chương trình VABIX cùng doanh nghiệp, đối tác."
        }
        crumbs={[{ name: en ? "Home" : "Trang chủ", href: "/" }, { name: en ? "Knowledge" : "Tri thức", href: paths.knowledge }, { name: en ? "Articles" : "Bài viết" }]}
      />
      <Container className="py-12 sm:py-16">
        <nav aria-label={en ? "Categories" : "Chuyên mục"} className="flex flex-wrap gap-2">
          <Link href={paths.insights} className={chip(!cat)} aria-current={!cat ? "page" : undefined}>
            {en ? "All" : "Tất cả"} <span className="opacity-60">({all.length})</span>
          </Link>
          {used.map((c) => (
            <Link key={c.id} href={`${paths.insights}?chuyen-muc=${c.id}`} className={chip(cat === c.id)} aria-current={cat === c.id ? "page" : undefined}>
              {c.label} <span className="opacity-60">({all.filter((a) => a.category === c.id).length})</span>
            </Link>
          ))}
        </nav>

        {lead ? (
          <Link
            href={`/tri-thuc/${lead.slug}`}
            className="group mt-10 grid overflow-hidden rounded-[28px] border border-vabix-deep-teal/10 bg-vabix-deep-teal text-white transition-shadow hover:shadow-[0_24px_60px_rgba(22,60,62,0.22)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]"
          >
            <span className="relative block aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[22rem]">
              <Image src={lead.coverImage} alt="" fill unoptimized priority className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" sizes="(max-width: 1024px) 100vw, 55vw" />
            </span>
            <span className="flex flex-col justify-center p-6 sm:p-10">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-vabix-gold">
                {en ? "Latest" : "Mới nhất"} · {lead.categoryLabel}
              </span>
              <span className="mt-3 block text-balance text-2xl font-semibold leading-snug sm:text-[1.9rem]">{lead.title}</span>
              <span className="mt-4 line-clamp-4 block text-sm leading-relaxed text-white/75 sm:text-base">{lead.excerpt}</span>
              <span className="mt-6 inline-flex font-semibold text-vabix-gold">{en ? "Read the article →" : "Đọc bài viết →"}</span>
            </span>
          </Link>
        ) : (
          <p className="mt-10 text-vabix-muted">{en ? "No articles in this category yet." : "Chuyên mục này chưa có bài viết."}</p>
        )}

        {rest.length ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        ) : null}
      </Container>
    </>
  );
}
