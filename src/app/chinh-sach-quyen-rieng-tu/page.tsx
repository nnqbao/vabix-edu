import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Section";
import { siteConfig } from "@/lib/siteConfig";
import { createMetadata } from "@/lib/seo";
import { getLocale } from "@/i18n/server";

export async function generateMetadata() {
  const en = (await getLocale()) === "en";
  return createMetadata({
    title: en ? "Privacy policy" : "Chính sách quyền riêng tư",
    description: en
      ? "The VABIX privacy policy."
      : "Chính sách quyền riêng tư của VABIX.",
    path: en ? "/en/chinh-sach-quyen-rieng-tu" : "/chinh-sach-quyen-rieng-tu",
  });
}

export default async function PrivacyPage() {
  const en = (await getLocale()) === "en";
  if (en) {
    return (
      <>
        <PageHero title="Privacy policy" crumbs={[{ name: "Home", href: "/" }, { name: "Privacy" }]} />
        <Container className="space-y-4 py-16 text-vabix-muted">
          <p className="measure">
            VABIX Joint Stock Company collects your full name, company, job title, phone number, email address and message when you submit a form on this website. This data is used to contact you, advise you and improve our services — it is not sold to third parties.
          </p>
          <p className="measure">
            You have the right to request access to, correction of or deletion of your data by emailing {siteConfig.contact.email}. By using this website, you confirm that you have read this policy.
          </p>
        </Container>
      </>
    );
  }
  return (
    <>
      <PageHero title="Chính sách quyền riêng tư" crumbs={[{ name: "Trang chủ", href: "/" }, { name: "Quyền riêng tư" }]} />
      <Container className="space-y-4 py-16 text-vabix-muted">
        <p className="measure">
          {siteConfig.legalName} thu thập họ tên, doanh nghiệp, chức vụ, điện thoại, email và nội dung trao đổi khi bạn gửi form trên website. Dữ liệu được dùng để liên hệ, tư vấn và cải thiện dịch vụ — không bán cho bên thứ ba.
        </p>
        <p className="measure">
          Bạn có quyền yêu cầu xem, sửa hoặc xóa dữ liệu bằng cách gửi email tới {siteConfig.contact.email}. Việc sử dụng website đồng nghĩa với việc bạn đã đọc chính sách này.
        </p>
      </Container>
    </>
  );
}
