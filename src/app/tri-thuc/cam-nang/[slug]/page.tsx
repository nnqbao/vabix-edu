import { notFound } from "next/navigation";
import { handbooks } from "@/content/network";
import { handbooks as handbooksEn } from "@/content/en/books";
import { getLocale } from "@/i18n/server";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Section";
import { CTASection } from "@/components/sections/CTASection";
import { createMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return handbooks.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const en = (await getLocale()) === "en";
  const h = (en ? handbooksEn : handbooks).find((x) => x.slug === slug);
  if (!h) return {};
  return createMetadata({ title: h.title, description: h.summary, path: `${en ? "/en" : ""}/tri-thuc/cam-nang/${h.slug}` });
}

export default async function HandbookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const en = (await getLocale()) === "en";
  const h = (en ? handbooksEn : handbooks).find((x) => x.slug === slug);
  if (!h) notFound();
  return (
    <>
      <PageHero
        title={h.title}
        description={h.summary}
        crumbs={[
          { name: en ? "Home" : "Trang chủ", href: "/" },
          { name: en ? "Handbooks" : "Cẩm nang", href: "/tri-thuc/cam-nang" },
          { name: h.title },
        ]}
      />
      <Container className="py-16">
        <p className="measure text-vabix-muted">
          {en
            ? "This handbook was moved from the Handbooks section of the VABIX website. Detailed content continues to be updated in the knowledge library. To receive the full version or discuss a topic, please get in touch with VABIX."
            : "Cẩm nang này được chuyển từ chuyên mục Cẩm nang trên website VABIX. Nội dung chi tiết tiếp tục được cập nhật trên kho tri thức. Để nhận bản đầy đủ hoặc trao đổi chuyên đề, vui lòng kết nối với VABIX."}
        </p>
      </Container>
      <CTASection
        title={en ? "Need a handbook for your industry?" : "Cần cẩm nang cho ngành của bạn?"}
        description={en ? "VABIX helps Vietnamese entrepreneurs write books and compile industry knowledge." : "VABIX hỗ trợ doanh nhân Việt viết sách và biên soạn tri thức ngành."}
      />
    </>
  );
}
