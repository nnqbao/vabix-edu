import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/content/articles";
import { publishedArticle, publishedArticles } from "@/platform/cms/catalog";
import { Breadcrumb, JsonLd } from "@/components/ui/Misc";
import { Container } from "@/components/ui/Section";
import { CTASection } from "@/components/sections/CTASection";
import { ArticleBody, articleHeadings, countImages, readingMinutes } from "@/components/article/ArticleBody";
import { ArticleCard } from "@/components/cards/Cards";
import { Lightbox } from "@/components/templates/Lightbox";
import { createMetadata, absUrl } from "@/lib/seo";
import { paths } from "@/lib/paths";
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

  const all = publishedArticles(locale).filter((x) => x.slug !== a.slug);
  const sorted = [...all].sort((x, y) => (y.publishedAt ?? "").localeCompare(x.publishedAt ?? ""));
  const related = [...sorted.filter((x) => x.category === a.category), ...sorted.filter((x) => x.category !== a.category)].slice(0, 3);
  const toc = articleHeadings(a.content);
  const gallery = a.gallery ?? [];
  const bodyImages = countImages(a.content);
  const date = new Date(a.publishedAt).toLocaleDateString(en ? "en-GB" : "vi-VN", { day: "2-digit", month: "long", year: "numeric" });

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

      <section className="relative overflow-hidden bg-vabix-deep-teal pb-40 pt-28 text-white sm:pb-48 sm:pt-32">
        <span aria-hidden="true" className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full border border-vabix-gold/20" />
        <span aria-hidden="true" className="pointer-events-none absolute -right-10 top-10 h-60 w-60 rounded-full border border-white/10" />
        <Container className="relative py-10 sm:py-14">
          <Breadcrumb
            light
            items={[
              { name: en ? "Home" : "Trang chủ", href: "/" },
              { name: en ? "Articles" : "Bài viết", href: paths.insights },
              { name: a.categoryLabel },
            ]}
          />
          <Link
            href={`${paths.insights}?chuyen-muc=${a.category}`}
            className="mt-7 inline-flex rounded-full border border-vabix-gold/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-vabix-gold hover:bg-vabix-gold/10"
          >
            {a.categoryLabel}
          </Link>
          <h1 className="mt-5 max-w-4xl text-[30px] font-semibold leading-tight sm:text-5xl sm:leading-[1.15]">{a.title}</h1>
          <p className="mt-5 max-w-3xl text-justify text-base leading-relaxed text-white/75 [text-align-last:center] sm:text-lg lg:[text-align-last:left]">{a.excerpt}</p>
          <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/60">
            <span className="font-semibold text-white/85">{a.author}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={a.publishedAt}>{date}</time>
            <span aria-hidden="true">·</span>
            <span>{en ? `${readingMinutes(a.content)} min read` : `${readingMinutes(a.content)} phút đọc`}</span>
          </p>
        </Container>
      </section>

      <Container className="relative -mt-32 sm:-mt-40">
        <Image
          src={a.coverImage}
          alt={a.title}
          width={1600}
          height={900}
          unoptimized
          priority
          className="mx-auto aspect-[16/9] w-full max-w-5xl cursor-zoom-in rounded-[28px] object-cover shadow-[0_30px_70px_rgba(22,60,62,0.28)]"
          tabIndex={0}
          data-zoom-group="article"
          data-zoom-index={-1}
          data-zoom-src={a.coverImage}
          data-zoom-alt={a.title}
        />
      </Container>

      <Container className="py-14 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_17rem]">
          <article className="mx-auto w-full max-w-[46rem] lg:mx-0">
            <ArticleBody content={a.content} />

            {gallery.length ? (
              <section className="mt-14">
                <h2 className="text-xl font-semibold text-vabix-deep-teal">{en ? "Photo gallery" : "Hình ảnh hoạt động"}</h2>
                <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {gallery.map((src, i) => (
                    <li key={src}>
                      <Image
                        src={src}
                        alt={a.galleryAlts?.[i] ?? a.title}
                        width={600}
                        height={450}
                        unoptimized
                        className="aspect-[4/3] w-full cursor-zoom-in rounded-2xl object-cover transition-transform duration-300 hover:scale-[1.02]"
                        tabIndex={0}
                        data-zoom-group="article"
                        data-zoom-index={bodyImages + i}
                        data-zoom-src={src}
                        data-zoom-alt={a.galleryAlts?.[i] ?? a.title}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {a.cta ? (
              <section className="relative mt-14 overflow-hidden rounded-[28px] bg-vabix-deep-teal p-8 text-center text-white sm:p-10">
                <span aria-hidden="true" className="pointer-events-none absolute -left-16 -top-20 h-56 w-56 rounded-full border border-vabix-gold/25" />
                <span aria-hidden="true" className="pointer-events-none absolute -bottom-24 -right-10 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(222,164,67,0.22),transparent_70%)]" />
                {a.cta.title ? <p className="relative text-2xl font-semibold leading-snug sm:text-[1.7rem]">{a.cta.title}</p> : null}
                <a
                  href={a.cta.href}
                  {...(/^https?:/.test(a.cta.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="relative mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-vabix-gold px-7 text-sm font-semibold uppercase tracking-[0.12em] text-vabix-deep-teal shadow-[0_12px_30px_rgba(222,164,67,0.35)] transition-colors hover:bg-vabix-soft-gold"
                >
                  {a.cta.label} →
                </a>
                {a.cta.note ? <p className="relative mt-4 text-sm text-white/65">{a.cta.note}</p> : null}
              </section>
            ) : null}

            <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-vabix-deep-teal/10 pt-6 text-sm">
              <Link href={paths.insights} className="font-semibold text-vabix-deep-teal hover:text-vabix-gold">
                ← {en ? "All articles" : "Tất cả bài viết"}
              </Link>
              <Link href={`${paths.insights}?chuyen-muc=${a.category}`} className="font-semibold text-vabix-gold hover:underline">
                {en ? `More in ${a.categoryLabel} →` : `Thêm bài ${a.categoryLabel} →`}
              </Link>
            </div>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-6">
              {toc.length > 1 ? (
                <nav aria-label={en ? "In this article" : "Trong bài này"} className="rounded-[22px] border border-vabix-deep-teal/10 bg-white p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-vabix-gold">{en ? "In this article" : "Trong bài này"}</p>
                  <ol className="mt-3 space-y-2 text-sm">
                    {toc.map((h) => (
                      <li key={h.id}>
                        <a href={`#${h.id}`} className="block leading-snug text-vabix-muted hover:text-vabix-deep-teal">
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              ) : null}
              <div className="rounded-[22px] bg-vabix-deep-teal p-5 text-white">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-vabix-gold">VABIX</p>
                <p className="mt-2 font-semibold leading-snug">
                  {a.cta?.title ?? (en ? "Turn this knowledge into results in your business." : "Biến tri thức này thành kết quả trong doanh nghiệp của bạn.")}
                </p>
                {a.cta ? (
                  <a href={a.cta.href} {...(/^https?:/.test(a.cta.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="mt-4 inline-flex rounded-full bg-vabix-gold px-4 py-2 text-sm font-semibold text-vabix-deep-teal hover:bg-vabix-soft-gold">
                    {a.cta.label} →
                  </a>
                ) : (
                  <Link href={paths.contact} className="mt-4 inline-flex rounded-full bg-vabix-gold px-4 py-2 text-sm font-semibold text-vabix-deep-teal hover:bg-vabix-soft-gold">
                    {en ? "Talk to VABIX →" : "Trao đổi cùng VABIX →"}
                  </Link>
                )}
              </div>
            </div>
          </aside>
        </div>
      </Container>

      {related.length ? (
        <section className="bg-vabix-ivory py-16 sm:py-20">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">{en ? "Keep reading" : "Đọc tiếp"}</p>
                <h2 className="mt-2 text-2xl font-semibold text-vabix-deep-teal sm:text-3xl">{en ? "Related articles" : "Bài viết liên quan"}</h2>
              </div>
              <Link href={paths.insights} className="text-sm font-semibold text-vabix-deep-teal hover:text-vabix-gold">
                {en ? "All articles →" : "Tất cả bài viết →"}
              </Link>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <ArticleCard key={r.id} article={r} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <CTASection
        title={en ? "Want to apply this knowledge in your business?" : "Muốn áp dụng tri thức này vào doanh nghiệp?"}
        description={en ? "Talk to VABIX to work out the right next step." : "Trao đổi với VABIX để xác định bước đi phù hợp."}
      />
      <Lightbox />
    </>
  );
}
