import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Section";
import { createMetadata } from "@/lib/seo";
import { getLocale } from "@/i18n/server";
import { paths } from "@/lib/paths";
import { publishedPrograms, publishedArticles, publishedMethodologies, publishedKnowledgeProducts } from "@/platform/cms/catalog";
import { books } from "@/content/network";
import { books as booksEn } from "@/content/en/network";
import Link from "next/link";

export async function generateMetadata() {
  const en = (await getLocale()) === "en";
  return createMetadata({
    title: en ? "Search" : "Tìm kiếm",
    description: en
      ? "Search VABIX programmes, articles, books and models."
      : "Tìm chương trình, bài viết, sách và mô hình VABIX.",
    path: en ? `/en${paths.search}` : paths.search,
  });
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const locale = await getLocale();
  const en = locale === "en";
  const query = q.trim().toLowerCase();
  const results: { type: string; href: string; title: string; excerpt: string }[] = [];
  if (query) {
    for (const p of publishedPrograms(locale)) {
      const hay = [p.title, p.shortTitle, p.audience, p.problem].join(" ").toLowerCase();
      if (hay.includes(query)) results.push({ type: en ? "Programme" : "Chương trình", href: paths.program(p.slug), title: p.title, excerpt: p.audience });
    }
    for (const a of publishedArticles(locale)) {
      const hay = [a.title, a.excerpt, a.content].join(" ").toLowerCase();
      if (hay.includes(query)) results.push({ type: en ? "Article" : "Bài viết", href: paths.article(a.slug), title: a.title, excerpt: a.excerpt });
    }
    for (const b of en ? booksEn : books) {
      const hay = [b.title, b.summary].join(" ").toLowerCase();
      if (hay.includes(query)) results.push({ type: en ? "Book" : "Sách", href: `/tri-thuc/sach/${b.slug}`, title: b.title, excerpt: b.summary });
    }
    for (const m of publishedMethodologies(locale)) {
      const hay = [m.name, m.summary, m.headline].join(" ").toLowerCase();
      if (hay.includes(query)) results.push({ type: en ? "Model" : "Mô hình", href: paths.method(m.slug), title: m.name, excerpt: m.summary });
    }
    for (const k of publishedKnowledgeProducts(locale)) {
      const hay = [k.title, k.summary].join(" ").toLowerCase();
      if (hay.includes(query)) results.push({ type: en ? "Knowledge" : "Tri thức", href: k.href ?? `/san-pham-tri-thuc/${k.slug}`, title: k.title, excerpt: k.summary });
    }
  }
  return (
    <>
      <PageHero
        title={en ? "Search" : "Tìm kiếm"}
        description={en ? "Programmes, articles, books and models / methods." : "Chương trình, bài viết, sách và mô hình / phương pháp."}
        crumbs={[{ name: en ? "Home" : "Trang chủ", href: "/" }, { name: en ? "Search" : "Tìm kiếm" }]}
      />
      <Container className="py-16">
        <form className="max-w-xl" action={en ? `/en${paths.search}` : paths.search} method="get">
          <label htmlFor="q" className="mb-2 block text-sm font-medium text-vabix-deep-teal">
            {en ? "Keywords" : "Từ khóa"}
          </label>
          <input id="q" name="q" defaultValue={q} className="input" placeholder="BMDO, KAROT, BizCar…" />
          <button className="mt-4 bg-vabix-deep-teal px-4 py-2 text-white">{en ? "Search" : "Tìm"}</button>
        </form>
        {query ? (
          <p className="mt-8 text-sm text-vabix-muted">
            {en ? `${results.length} result${results.length === 1 ? "" : "s"} for “${q}”.` : <>{results.length} kết quả cho “{q}”.</>}
          </p>
        ) : (
          <p className="mt-8 text-sm text-vabix-muted">
            {en ? "Enter a keyword to search programmes, articles, books and models." : "Nhập từ khóa để tìm trong chương trình, bài viết, sách và mô hình."}
          </p>
        )}
        <ul className="mt-6 space-y-4">
          {results.map((r) => (
            <li key={r.href} className="border-b border-vabix-deep-teal/10 pb-4">
              <p className="eyebrow">{r.type}</p>
              <Link href={r.href} className="text-lg font-semibold text-vabix-deep-teal">
                {r.title}
              </Link>
              <p className="mt-1 text-sm text-vabix-muted">{r.excerpt}</p>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
