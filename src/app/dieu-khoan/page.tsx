import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Section";
import { siteConfig } from "@/lib/siteConfig";
import { createMetadata } from "@/lib/seo";
import { getLocale } from "@/i18n/server";

export async function generateMetadata() {
  const en = (await getLocale()) === "en";
  return createMetadata({
    title: en ? "Terms of use" : "Điều khoản sử dụng",
    description: en
      ? "Terms of use for the VABIX website."
      : "Điều khoản sử dụng website VABIX.",
    path: en ? "/en/dieu-khoan" : "/dieu-khoan",
  });
}

export default async function TermsPage() {
  const en = (await getLocale()) === "en";
  if (en) {
    return (
      <>
        <PageHero title="Terms of use" crumbs={[{ name: "Home", href: "/" }, { name: "Terms" }]} />
        <Container className="py-16">
          <p className="measure text-vabix-muted">
            The content on {siteConfig.website} belongs to VABIX Joint Stock Company. Copying the knowledge and models (BizCar, B2A, BABOSO, BMDO, KAROT, KLASS, APPLIER, DGH) for commercial use without a written agreement is not permitted. Connection, training and consulting services are governed by separate contract terms when both parties sign.
          </p>
        </Container>
      </>
    );
  }
  return (
    <>
      <PageHero title="Điều khoản sử dụng" crumbs={[{ name: "Trang chủ", href: "/" }, { name: "Điều khoản" }]} />
      <Container className="py-16">
        <p className="measure text-vabix-muted">
          Nội dung trên {siteConfig.website} thuộc {siteConfig.legalName}. Việc sao chép tri thức, mô hình (BizCar, B2A, BABOSO, BMDO, KAROT, KLASS, APPLIER, DGH) để thương mại hóa khi chưa có thỏa thuận bằng văn bản là không được phép. Việc kết nối, đào tạo và tư vấn chịu điều khoản hợp đồng riêng khi hai bên ký kết.
        </p>
      </Container>
    </>
  );
}
