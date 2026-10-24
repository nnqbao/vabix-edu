import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Section";
import { createMetadata } from "@/lib/seo";
import { getLocale } from "@/i18n/server";

export async function generateMetadata() {
  const en = (await getLocale()) === "en";
  return createMetadata({
    title: en ? "Important disclaimer" : "Khuyến cáo quan trọng",
    description: en
      ? "Disclaimer for using VABIX information and services."
      : "Khuyến cáo khi sử dụng thông tin và dịch vụ VABIX.",
    path: en ? "/en/khuyen-cao" : "/khuyen-cao",
  });
}

export default async function DisclaimerPage() {
  const en = (await getLocale()) === "en";
  if (en) {
    return (
      <>
        <PageHero title="Important disclaimer" crumbs={[{ name: "Home", href: "/" }, { name: "Disclaimer" }]} />
        <Container className="py-16">
          <p className="measure text-vabix-muted">
            The information on this website is intended to introduce our capabilities and knowledge. The results of each programme depend on the context, resources and level of implementation of each business. VABIX makes no commitment regarding revenue or financial results unless stated in a specific contract.
          </p>
        </Container>
      </>
    );
  }
  return (
    <>
      <PageHero title="Khuyến cáo quan trọng" crumbs={[{ name: "Trang chủ", href: "/" }, { name: "Khuyến cáo" }]} />
      <Container className="py-16">
        <p className="measure text-vabix-muted">
          Thông tin trên website mang tính giới thiệu năng lực và tri thức. Kết quả của từng chương trình phụ thuộc bối cảnh, nguồn lực và mức độ triển khai của doanh nghiệp. VABIX không cam kết doanh thu hay kết quả tài chính nếu chưa được nêu trong hợp đồng cụ thể.
        </p>
      </Container>
    </>
  );
}
