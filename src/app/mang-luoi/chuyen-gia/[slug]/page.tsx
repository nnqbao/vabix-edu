import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { experts } from "@/content/experts";
import { publishedExpert, publishedExperts, publishedCaseStudies, publishedArticles, publishedMethodologies } from "@/platform/cms/catalog";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Section";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/ui/Misc";
import { createMetadata, absUrl } from "@/lib/seo";
import { getLocale } from "@/i18n/server";

export function generateStaticParams() {
  const slugs = new Set(experts.map((item) => item.slug));
  try {
    for (const item of publishedExperts()) slugs.add(item.slug);
  } catch {
    /* file fallback */
  }
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = await getLocale();
  const e = publishedExpert(slug, locale);
  if (!e) return {};
  return createMetadata({ title: e.name, description: e.shortBio, path: `${locale === "en" ? "/en" : ""}/mang-luoi/chuyen-gia/${e.slug}` });
}

export default async function ExpertDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = await getLocale();
  const en = locale === "en";
  const e = publishedExpert(slug, locale);
  if (!e) notFound();
  const relatedCases = publishedCaseStudies(locale).filter((c) => e.caseStudies?.includes(c.slug));
  const relatedArticles = publishedArticles(locale).filter((a) => e.articles?.includes(a.slug));
  const relatedPrograms = publishedMethodologies(locale).filter((m) => e.programs?.includes(m.slug));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: e.name,
          jobTitle: e.organizationRole,
          image: absUrl(e.portrait),
          worksFor: { "@type": "Organization", name: "VABIX" },
          description: e.shortBio,
        }}
      />
      <PageHero
        title={e.name}
        description={e.title}
        crumbs={[
          { name: en ? "Home" : "Trang chủ", href: "/" },
          { name: en ? "Experts" : "Chuyên gia", href: "/mang-luoi/chuyen-gia" },
          { name: e.name },
        ]}
      />
      <Container className="grid gap-10 py-16 lg:grid-cols-[280px_1fr]">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-full bg-vabix-deep-teal">
            <Image src={e.portrait} alt={e.name} fill className="object-cover object-top" sizes="280px" />
          </div>
          <p className="mt-4 text-center text-sm font-semibold uppercase tracking-[0.14em] text-vabix-gold lg:text-left">{e.organizationRole}</p>
          {e.linkedin ? (
            <a href={e.linkedin} className="mt-2 inline-block text-sm text-vabix-gold">
              LinkedIn
            </a>
          ) : null}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-vabix-deep-teal">{en ? "Areas of expertise" : "Lĩnh vực chuyên môn"}</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {e.expertise.map((x) => (
              <li key={x} className="flex items-start gap-2.5 rounded-xl border border-vabix-deep-teal/10 bg-white px-4 py-3 text-sm font-medium text-vabix-deep-teal">
                <span aria-hidden="true" className="mt-0.5 text-vabix-gold">◆</span>
                {x}
              </li>
            ))}
          </ul>
          <h2 className="mt-10 text-xl font-semibold text-vabix-deep-teal">{en ? "Biography" : "Tiểu sử"}</h2>
          <div className="measure mt-3 space-y-4 leading-relaxed text-vabix-muted">
            {e.fullBio.split(/\n\s*\n/).map((para) => (
              <p key={para.slice(0, 40)}>{para}</p>
            ))}
          </div>
          {e.philosophy || e.quote ? (
            <>
              <h2 className="mt-10 text-xl font-semibold text-vabix-deep-teal">{en ? "Professional outlook" : "Định hướng chuyên môn"}</h2>
              {e.philosophy ? <p className="measure mt-3 leading-relaxed text-vabix-muted">{e.philosophy}</p> : null}
              {e.quote ? (
                <blockquote className="mt-6 max-w-2xl rounded-[22px] border-l-4 border-vabix-gold bg-vabix-ivory px-6 py-5 text-lg font-medium italic leading-relaxed text-vabix-deep-teal">
                  “{e.quote}”
                </blockquote>
              ) : null}
            </>
          ) : null}
          {relatedPrograms.length ? (
            <>
              <h2 className="mt-10 text-xl font-semibold text-vabix-deep-teal">{en ? "Programmes" : "Chương trình"}</h2>
              <ul className="mt-3 space-y-2">
                {relatedPrograms.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/mo-hinh-phuong-phap/${p.slug}`} className="text-vabix-deep-teal">
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          {relatedCases.length ? (
            <>
              <h2 className="mt-10 text-xl font-semibold text-vabix-deep-teal">Case study</h2>
              <ul className="mt-3 space-y-2">
                {relatedCases.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/tri-thuc/case-study/${c.slug}`}>{c.organization}</Link>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          {relatedArticles.length ? (
            <>
              <h2 className="mt-10 text-xl font-semibold text-vabix-deep-teal">{en ? "Articles" : "Bài viết"}</h2>
              <ul className="mt-3 space-y-2">
                {relatedArticles.map((a) => (
                  <li key={a.slug}>
                    <Link href={`/tri-thuc/${a.slug}`}>{a.title}</Link>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </Container>
      <CTASection
        title={en ? "Talk to a VABIX expert" : "Trao đổi cùng chuyên gia VABIX"}
        description={en ? "Book a session to define your challenge and the right way to work together." : "Đặt lịch để xác định bài toán và hướng đồng hành phù hợp."}
      />
    </>
  );
}
