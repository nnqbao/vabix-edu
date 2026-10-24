import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Section";
import { siteConfig } from "@/lib/siteConfig";
import { createMetadata } from "@/lib/seo";
import { getLocale } from "@/i18n/server";

export async function generateMetadata() {
  const en = (await getLocale()) === "en";
  return createMetadata({
    title: en ? "Information security policy" : "Chính sách bảo mật thông tin",
    description: en
      ? "The VABIX commitment to information security."
      : "Cam kết bảo mật thông tin của VABIX.",
    path: en ? "/en/chinh-sach-bao-mat" : "/chinh-sach-bao-mat",
  });
}

export default async function SecurityPage() {
  const en = (await getLocale()) === "en";
  if (en) {
    return (
      <>
        <PageHero title="Information security policy" crumbs={[{ name: "Home", href: "/" }, { name: "Security" }]} />
        <Container className="py-16">
          <p className="measure text-vabix-muted">
            VABIX applies appropriate technical and organisational measures to limit unauthorised access to contact data. Resident Portal sign-in details are managed on a separate system ({siteConfig.portals.resident}). If you discover an incident, please report it to {siteConfig.contact.supportEmail}.
          </p>
        </Container>
      </>
    );
  }
  return (
    <>
      <PageHero title="Chính sách bảo mật thông tin" crumbs={[{ name: "Trang chủ", href: "/" }, { name: "Bảo mật" }]} />
      <Container className="py-16">
        <p className="measure text-vabix-muted">
          VABIX áp dụng các biện pháp kỹ thuật và tổ chức phù hợp để hạn chế truy cập trái phép vào dữ liệu liên hệ. Thông tin đăng nhập Cổng Cư dân được quản lý trên hệ thống riêng ({siteConfig.portals.resident}). Khi phát hiện sự cố, vui lòng báo về {siteConfig.contact.supportEmail}.
        </p>
      </Container>
    </>
  );
}
