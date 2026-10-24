import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/siteConfig";
import { createMetadata } from "@/lib/seo";
import { getLocale } from "@/i18n/server";

export async function generateMetadata() {
  const en = (await getLocale()) === "en";
  return createMetadata({
    title: en ? "VABIX Resident Portal" : "Cổng Cư dân VABIX",
    description: en
      ? "The entry point for Supplier Residents, Part-time Residents and Permanent Residents of the VABIX Village."
      : "Cổng vào dành cho Cư dân Cung cấp, Cư dân bán trú và Cư dân thường trú của Làng VABIX.",
    path: en ? "/en/cong-cu-dan" : "/cong-cu-dan",
  });
}

export default async function ResidentPortalPage() {
  const en = (await getLocale()) === "en";
  return (
    <>
      <PageHero
        title={en ? "Resident Portal" : "Cổng Cư dân"}
        description={
          en
            ? "A utility portal for connection residents of the VABIX Village — not part of the main business navigation."
            : "Đây là cổng tiện ích dành cho cư dân kết nối của Làng VABIX — không phải mục điều hướng doanh nghiệp chính."
        }
        crumbs={[{ name: en ? "Home" : "Trang chủ", href: "/" }, { name: en ? "Resident Portal" : "Cổng Cư dân" }]}
      />
      <Container className="grid gap-6 py-16 md:grid-cols-2">
        <article className="border border-vabix-deep-teal/10 p-7">
          <h2 className="text-xl font-semibold text-vabix-deep-teal">{en ? "Resident sign-in" : "Đăng nhập cư dân"}</h2>
          <p className="mt-3 text-sm text-vabix-muted">
            {en
              ? "For Supplier Residents, Part-time Residents and Permanent Residents. The SMAR platform supports learning, connecting and operating within the Village."
              : "Dành cho Cư dân Cung cấp, Cư dân bán trú và Cư dân thường trú. Nền tảng SMAR phục vụ học tập, kết nối và vận hành trong Làng."}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={siteConfig.portals.resident} variant="teal">
              {en ? "Open SMAR" : "Vào SMAR"}
            </Button>
            <Button href={siteConfig.portals.login} variant="outline" className="border-vabix-deep-teal text-vabix-deep-teal">
              {en ? "Website sign-in" : "Đăng nhập website"}
            </Button>
          </div>
        </article>
        <article className="border border-vabix-deep-teal/10 p-7">
          <h2 className="text-xl font-semibold text-vabix-deep-teal">{en ? "Learning residents" : "Cư dân học tập"}</h2>
          <p className="mt-3 text-sm text-vabix-muted">
            {en
              ? "The mandatory training area before becoming a Professional Connection Resident, following the KLASS capability pyramid: communication skills, B2A, Village culture, AI and customer care."
              : "Khu vực đào tạo bắt buộc trước khi trở thành Cư dân Kết nối Chuyên nghiệp, theo tháp năng lực KLASS: kỹ năng giao tiếp, B2A, văn hóa Làng, AI và chăm sóc khách hàng."}
          </p>
          <div className="mt-6">
            <Button href="/dang-nhap" variant="gold">
              {en ? "Open the learning portal" : "Vào cổng học tập"}
            </Button>
          </div>
        </article>
      </Container>
    </>
  );
}
