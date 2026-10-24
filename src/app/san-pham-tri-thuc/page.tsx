import { PageHero } from "@/components/layout/PageHero";
import { Container, SectionHeading } from "@/components/ui/Section";
import { CTASection } from "@/components/sections/CTASection";
import { knowledgeProductCategories as categoriesVi } from "@/content/knowledgeProducts";
import { knowledgeProductCategories as categoriesEn } from "@/content/en/knowledgeHub";
import { publishedKnowledgeProducts } from "@/platform/cms/catalog";
import { createMetadata } from "@/lib/seo";
import { getLocale } from "@/i18n/server";
import Link from "next/link";

export async function generateMetadata() {
  const en = (await getLocale()) === "en";
  return createMetadata({
    title: en ? "Knowledge products" : "Sản phẩm tri thức",
    description: en
      ? "Books, handbooks, management templates and digital learning materials that help business owners turn knowledge into decisions and action."
      : "Sách, cẩm nang, bộ biểu mẫu quản trị và học liệu số — hỗ trợ doanh chủ chuyển kiến thức thành quyết định và hành động.",
    path: en ? "/en/san-pham-tri-thuc" : "/san-pham-tri-thuc",
  });
}

export default async function KnowledgeProductsPage() {
  const locale = await getLocale();
  const en = locale === "en";
  const knowledgeProductCategories = en ? categoriesEn : categoriesVi;
  return (
    <>
      <PageHero
        title={en ? "Knowledge products" : "Sản phẩm tri thức"}
        description={
          en
            ? "Helping business owners turn knowledge into decisions, action and results. Distinct from our free articles and blog. Purchasing, payment and downloads open only once the product, access rights and business process are ready."
            : "Hỗ trợ doanh chủ chuyển kiến thức thành quyết định, hành động và kết quả. Phân biệt với bài viết / blog miễn phí. Mua hàng, thanh toán và tải tài liệu chỉ mở khi sản phẩm, quyền truy cập và quy trình kinh doanh đã sẵn sàng."
        }
        crumbs={[{ name: en ? "Home" : "Trang chủ", href: "/" }, { name: en ? "Knowledge products" : "Sản phẩm tri thức" }]}
      />
      <Container className="grid gap-4 py-16 md:grid-cols-2">
        {knowledgeProductCategories.map((c) => (
          <Link key={c.id} href={c.href} className="border border-vabix-deep-teal/10 p-7 hover:border-vabix-gold">
            <h2 className="text-xl font-semibold text-vabix-deep-teal">{c.title}</h2>
            <p className="mt-3 text-sm text-vabix-muted">{c.summary}</p>
          </Link>
        ))}
      </Container>
      <section className="bg-vabix-ivory py-16">
        <Container>
          <SectionHeading title={en ? "Current catalogue" : "Danh mục hiện có"} />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {publishedKnowledgeProducts(locale).map((p) => (
              <article key={p.id} className="bg-white p-6">
                <p className="eyebrow">{p.status === "coming" ? (en ? "Not yet publicly available" : "Chưa mở truy cập công khai") : en ? "Publication" : "Ấn phẩm"}</p>
                <h3 className="mt-2 text-lg font-semibold text-vabix-deep-teal">{p.title}</h3>
                <p className="mt-3 text-sm text-vabix-muted">{p.summary}</p>
                {p.href && p.status === "published" ? (
                  <Link href={p.href} className="mt-4 inline-block text-sm font-semibold text-vabix-deep-teal">
                    {en ? "View details" : "Xem chi tiết"}
                  </Link>
                ) : (
                  <p className="mt-4 text-sm text-vabix-muted">
                    {en
                      ? "Contact us if you need it for a programme or a consulting engagement."
                      : "Liên hệ tư vấn khi cần sử dụng trong chương trình hoặc tư vấn."}
                  </p>
                )}
              </article>
            ))}
          </div>
        </Container>
      </section>
      <CTASection
        title={en ? "Use knowledge right when a decision is needed." : "Dùng tri thức đúng lúc cần quyết định."}
        description={
          en
            ? "VABIX does not invent books, prices, ISBNs or downloads. New products are announced only once they have been approved."
            : "VABIX không tự bịa sách, giá, ISBN hay file tải. Sản phẩm mới chỉ công bố khi đã được phê duyệt."
        }
      />
    </>
  );
}
