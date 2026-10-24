import { notFound, redirect } from "next/navigation";
import {
  getKnowledgeProduct,
  knowledgeProductCanonicalPath,
  knowledgeProductPagePath,
  knowledgeProductsOnOwnRoute,
} from "@/content/knowledgeProducts";
import { publishedKnowledgeProduct, publishedKnowledgeProducts } from "@/platform/cms/catalog";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Section";
import { LeadForm } from "@/components/forms/LeadForm";
import { createMetadata } from "@/lib/seo";
import { getLocale } from "@/i18n/server";
import { localizeItem } from "@/i18n/pick";
import { knowledgeProductsEn } from "@/content/en/knowledgeProducts";
import Link from "next/link";

export function generateStaticParams() {
  const slugs = new Set(knowledgeProductsOnOwnRoute().map((item) => item.slug));
  try {
    for (const item of publishedKnowledgeProducts()) slugs.add(item.slug);
  } catch {
    /* file fallback */
  }
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = await getLocale();
  const p = publishedKnowledgeProduct(slug, locale) ?? localizeItem(getKnowledgeProduct(slug), knowledgeProductsEn, locale);
  if (!p) return {};
  const canonical = knowledgeProductCanonicalPath(p);
  if (canonical !== knowledgeProductPagePath(p)) return {};
  return createMetadata({ title: p.title, description: p.summary, path: locale === "en" ? `/en${canonical}` : canonical });
}

export default async function KnowledgeProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = await getLocale();
  const en = locale === "en";
  const p = publishedKnowledgeProduct(slug, locale) ?? localizeItem(getKnowledgeProduct(slug), knowledgeProductsEn, locale);
  if (!p) notFound();
  const canonical = knowledgeProductCanonicalPath(p);
  if (canonical !== knowledgeProductPagePath(p)) redirect(en ? `/en${canonical}` : canonical);
  return (
    <>
      <PageHero
        title={p.title}
        description={p.summary}
        crumbs={[
          { name: en ? "Home" : "Trang chủ", href: "/" },
          { name: en ? "Knowledge products" : "Sản phẩm tri thức", href: "/san-pham-tri-thuc" },
          { name: p.title },
        ]}
      />
      <Container className="grid gap-10 py-16 lg:grid-cols-2">
        <div>
          {p.status === "coming" ? (
            <p className="text-vabix-muted">
              {en
                ? "This product has a place in the ecosystem but is not yet open for purchase, payment or public download. VABIX does not publish prices, ISBNs or placeholder documents."
                : "Sản phẩm này đã được định vị trong hệ sinh thái nhưng chưa mở mua hàng, thanh toán hoặc tải file công khai. VABIX không công bố giá, ISBN hay tài liệu giả."}
            </p>
          ) : (
            <p className="text-vabix-muted">
              {en
                ? "A publication currently in the VABIX knowledge library. There is no public price on this website."
                : "Ấn phẩm hiện có trong kho tri thức VABIX. Không có giá bán công khai trên website này."}
            </p>
          )}
          {p.href && p.status === "published" ? (
            <Link href={p.href} className="mt-6 inline-block font-semibold text-vabix-deep-teal">
              {en ? "View the publication page" : "Xem trang ấn phẩm"}
            </Link>
          ) : null}
        </div>
        <div className="border border-vabix-deep-teal/10 p-6">
          <LeadForm type="consult" title={en ? "Enquire about knowledge products" : "Liên hệ về sản phẩm tri thức"} program={p.slug} />
        </div>
      </Container>
    </>
  );
}
