import * as networkVi from "@/content/network";
import * as networkEn from "@/content/en/network";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Section";
import { PartnerLogo } from "@/components/cards/Cards";
import { CTASection } from "@/components/sections/CTASection";
import { createMetadata } from "@/lib/seo";
import { getLocale } from "@/i18n/server";

export async function generateMetadata() {
  const en = (await getLocale()) === "en";
  return createMetadata({
    title: en ? "Partners & clients" : "Đối tác & khách hàng",
    description: en
      ? "Organisations that appear in the VABIX capability profile. Being named does not imply a current contract or a client endorsement."
      : "Tổ chức xuất hiện trong hồ sơ năng lực VABIX. Việc nêu tên không đồng nghĩa hợp đồng hiện tại hay chứng nhận khách hàng.",
    path: en ? "/en/mang-luoi/doi-tac" : "/mang-luoi/doi-tac",
  });
}

export default async function PartnersPage() {
  const en = (await getLocale()) === "en";
  const { partners, smeSegments } = en ? networkEn : networkVi;
  return (
    <>
      <PageHero
        title={en ? "Organisations in our capability profile" : "Tổ chức trong hồ sơ năng lực"}
        description={
          en
            ? "The list below is carried over from existing website data and records. It should not be read as contracted clients, exclusive partners or permission for unlimited publication."
            : "Danh sách dưới đây được giữ từ dữ liệu website và hồ sơ hiện có. Không suy diễn thành khách hàng hợp đồng, đối tác độc quyền hoặc được phép công bố không giới hạn."
        }
        crumbs={[
          { name: en ? "Home" : "Trang chủ", href: "/" },
          { name: en ? "Network" : "Mạng lưới", href: "/mang-luoi" },
          { name: en ? "Partners" : "Đối tác" },
        ]}
      />
      <Container className="py-16">
        <h2 className="text-xl font-semibold text-vabix-deep-teal">{en ? "Enterprises" : "Khối doanh nghiệp"}</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {partners.filter((p) => p.group === "enterprise").map((p) => (
            <PartnerLogo key={p.id} name={p.name} caption={p.caption} />
          ))}
        </div>
        <h2 className="mt-12 text-xl font-semibold text-vabix-deep-teal">{en ? "Partner organisations" : "Khối đối tác"}</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {partners.filter((p) => p.group === "partner").map((p) => (
            <PartnerLogo key={p.id} name={p.name} caption={p.caption} />
          ))}
        </div>
        <h2 className="mt-12 text-xl font-semibold text-vabix-deep-teal">{en ? "SMEs" : "Khối SME"}</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {smeSegments.map((s) => (
            <PartnerLogo key={s.id} name={s.name} />
          ))}
        </div>
      </Container>
      <CTASection
        title={en ? "Become a VABIX partner" : "Trở thành đối tác của VABIX"}
        description={en ? "Design a cooperation model that fits your goals, resources and implementation context." : "Thiết kế mô hình hợp tác phù hợp mục tiêu, nguồn lực và bối cảnh triển khai."}
        primary={{ label: en ? "Apply to partner" : "Đăng ký hợp tác", href: "/mang-luoi/tro-thanh-doi-tac" }}
      />
    </>
  );
}
