import * as networkVi from "@/content/network";
import * as networkEn from "@/content/en/network";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Section";
import { LeadForm } from "@/components/forms/LeadForm";
import { createMetadata } from "@/lib/seo";
import { getLocale } from "@/i18n/server";

export async function generateMetadata() {
  const en = (await getLocale()) === "en";
  return createMetadata({
    title: en ? "Become a partner" : "Trở thành đối tác",
    description: en
      ? "The path to becoming a supplier and partner in the VABIX Connection Village."
      : "Lộ trình trở thành nhà cung cấp và đối tác trong Làng kết nối VABIX.",
    path: en ? "/en/mang-luoi/tro-thanh-doi-tac" : "/mang-luoi/tro-thanh-doi-tac",
  });
}

export default async function BecomePartnerPage() {
  const en = (await getLocale()) === "en";
  const { supplierBenefits } = en ? networkEn : networkVi;
  return (
    <>
      <PageHero
        title={en ? "Propose a partnership with VABIX" : "Đề xuất hợp tác cùng VABIX"}
        description={
          en
            ? "Trustworking carries out initial screening based on profile, capability and evidence. VABIX provides no legal guarantee and does not guarantee revenue or successful deals."
            : "Trustworking sàng lọc ban đầu theo hồ sơ, năng lực và bằng chứng. VABIX không bảo lãnh pháp lý, không bảo đảm doanh thu hay ký kết thành công."
        }
        crumbs={[
          { name: en ? "Home" : "Trang chủ", href: "/" },
          { name: en ? "Network" : "Mạng lưới", href: "/mang-luoi" },
          { name: en ? "Become a partner" : "Trở thành đối tác" },
        ]}
      />
      <Container className="grid gap-12 py-16 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold text-vabix-deep-teal">{en ? "What suppliers gain" : "Giá trị dành cho nhà cung cấp"}</h2>
          <ol className="mt-6 space-y-4">
            {supplierBenefits.map((b) => (
              <li key={b.n} className="border-l-2 border-vabix-gold pl-4">
                <p className="text-sm font-semibold text-vabix-gold">{b.n}</p>
                <p className="font-semibold text-vabix-deep-teal">{b.title}</p>
                <p className="text-sm text-vabix-muted">{b.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-sm text-vabix-muted">
            {en
              ? "Suppliers must be registered legal entities and are vetted before official certification is granted. The criteria are adjusted at each stage of the Village's development."
              : "Nhà cung cấp phải là tổ chức có pháp nhân, được thẩm định trước khi cấp chứng nhận chính thức. Tiêu chuẩn được điều chỉnh theo từng giai đoạn phát triển của Làng."}
          </p>
        </div>
        <div className="border border-vabix-deep-teal/10 bg-white p-6">
            <LeadForm type="partnership" title={en ? "Partnership proposal" : "Đề xuất hợp tác"} />
        </div>
      </Container>
    </>
  );
}
