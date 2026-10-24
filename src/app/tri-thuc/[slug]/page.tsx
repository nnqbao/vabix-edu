import { notFound } from "next/navigation";
import { articles } from "@/content/articles";
import { publishedArticle, publishedArticles } from "@/platform/cms/catalog";
import { PageHero, Prose } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Section";
import { JsonLd } from "@/components/ui/Misc";
import { CTASection } from "@/components/sections/CTASection";
import { createMetadata, absUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/siteConfig";
import { getLocale } from "@/i18n/server";

export function generateStaticParams() {
  const slugs = new Set(articles.map((item) => item.slug));
  try {
    for (const item of publishedArticles()) slugs.add(item.slug);
  } catch {
    /* file fallback */
  }
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = await getLocale();
  const a = publishedArticle(slug, locale);
  if (!a) return {};
  return createMetadata({
    title: a.title,
    description: a.excerpt,
    path: `${locale === "en" ? "/en" : ""}/tri-thuc/${a.slug}`,
    type: "article",
    image: a.coverImage,
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = await getLocale();
  const en = locale === "en";
  const a = publishedArticle(slug, locale);
  if (!a) notFound();
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          datePublished: a.publishedAt,
          author: { "@type": "Person", name: a.author },
          publisher: { "@type": "Organization", name: siteConfig.siteName },
          image: absUrl(a.coverImage),
          description: a.excerpt,
        }}
      />
      <PageHero
        eyebrow={a.categoryLabel}
        title={a.title}
        description={a.excerpt}
        crumbs={[{ name: en ? "Home" : "Trang chủ", href: "/" }, { name: en ? "Knowledge" : "Tri thức", href: "/tri-thuc" }, { name: a.title }]}
      />
      <Container className="py-16">
        <p className="text-sm text-vabix-muted">
          {a.author} · {new Date(a.publishedAt).toLocaleDateString(en ? "en-GB" : "vi-VN")}
        </p>
        <Prose>
          {a.content.split("\n\n").map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </Prose>
      </Container>
      <CTASection
        title={en ? "Want to apply this knowledge in your business?" : "Muốn áp dụng tri thức này vào doanh nghiệp?"}
        description={en ? "Talk to VABIX to work out the right next step." : "Trao đổi với VABIX để xác định bước đi phù hợp."}
      />
    </>
  );
}
