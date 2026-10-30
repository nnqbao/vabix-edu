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
  const [lead, ...others] = list;
  const side = others.slice(0, 2);
  const rest = others.slice(2);
  const fmt = (d: string) => new Date(d).toLocaleDateString(en ? "en-GB" : "vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });

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
          <div className={`mt-10 grid gap-6 ${side.length ? "lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]" : ""}`}>
            {/* Bài mới nhất: ảnh tràn khung, chữ trên nền ảnh */}
            <Link
              href={`/tri-thuc/${lead.slug}`}
              className="group relative flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-[28px] bg-vabix-deep-teal text-white shadow-[0_24px_60px_rgba(22,60,62,0.18)] sm:min-h-[30rem] lg:min-h-[32rem]"
            >
              <Image src={lead.coverImage} alt="" fill unoptimized priority className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" sizes="(max-width: 1024px) 100vw, 60vw" />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-vabix-deep-teal via-vabix-deep-teal/75 to-vabix-deep-teal/5" />
              <span className="relative block p-6 sm:p-9">
                <span className="inline-flex items-center gap-2 rounded-full bg-vabix-gold px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-vabix-deep-teal">
                  {en ? "Latest" : "Mới nhất"}
                </span>
                <span className="mt-4 block text-[11px] font-semibold uppercase tracking-[0.18em] text-vabix-gold">
                  {lead.categoryLabel} · {fmt(lead.publishedAt)}
                </span>
                <span className="mt-3 block text-2xl font-semibold leading-snug sm:text-[2.1rem] sm:leading-tight">{lead.title}</span>
                <span className="mt-4 line-clamp-2 block max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">{lead.excerpt}</span>
                <span className="mt-6 inline-flex items-center gap-2 font-semibold text-vabix-gold">
                  {en ? "Read the article" : "Đọc bài viết"} <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </span>
            </Link>

            {/* Hai bài kế tiếp */}
            {side.length ? (
              <div className="grid gap-6">
                {side.map((a) => (
                  <Link
                    key={a.id}
                    href={`/tri-thuc/${a.slug}`}
                    className="group flex flex-col overflow-hidden rounded-[24px] border border-vabix-deep-teal/10 bg-white transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-vabix-gold/50 hover:shadow-[0_18px_40px_rgba(22,60,62,0.12)] sm:flex-row"
                  >
                    <span className="relative block aspect-[16/10] shrink-0 overflow-hidden bg-vabix-ivory sm:aspect-auto sm:w-[44%]">
                      <Image src={a.coverImage} alt="" fill unoptimized className="object-cover transition-transform duration-500 group-hover:scale-[1.05]" sizes="(max-width: 1024px) 100vw, 20vw" />
                    </span>
                    <span className="flex flex-1 flex-col p-5 sm:p-6">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-vabix-gold">
                        {a.categoryLabel} · <span className="font-medium normal-case tracking-normal text-vabix-muted">{fmt(a.publishedAt)}</span>
                      </span>
                      <span className="mt-2 line-clamp-3 block text-lg font-semibold leading-snug text-vabix-deep-teal group-hover:text-vabix-gold">{a.title}</span>
                      <span className="mt-2 line-clamp-2 block text-sm leading-relaxed text-vabix-muted [text-align:left!important]">{a.excerpt}</span>
                      <span className="mt-auto pt-4 text-sm font-semibold text-vabix-deep-teal group-hover:text-vabix-gold">{en ? "Read more →" : "Đọc tiếp →"}</span>
                    </span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <p className="mt-10 text-vabix-muted">{en ? "No articles in this category yet." : "Chuyên mục này chưa có bài viết."}</p>
        )}

        {rest.length ? (
          <h2 className="mt-14 text-xl font-semibold text-vabix-deep-teal">{en ? "More articles" : "Bài viết khác"}</h2>
        ) : null}
        {rest.length ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        ) : null}
      </Container>
    </>
  );
}
