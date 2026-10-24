import { PageHero } from "@/components/layout/PageHero";
import { Container, SectionHeading } from "@/components/ui/Section";
import { CTASection } from "@/components/sections/CTASection";
import { LeadForm } from "@/components/forms/LeadForm";
import { workforce as workforceVi } from "@/content/knowledgeProducts";
import { workforce as workforceEn } from "@/content/en/workforce";
import { getLocale } from "@/i18n/server";
import { createMetadata } from "@/lib/seo";
import Link from "next/link";

export async function generateMetadata() {
  const en = (await getLocale()) === "en";
  return createMetadata({
    title: en ? "Open Workforce & Digital Workforce" : "Nhân lực mở & Nhân lực số",
    description: (en ? workforceEn : workforceVi).positioning,
    path: en ? "/en/nhan-luc-mo-nhan-luc-so" : "/nhan-luc-mo-nhan-luc-so",
  });
}

export default async function WorkforcePage() {
  const en = (await getLocale()) === "en";
  const workforce = en ? workforceEn : workforceVi;
  const support = en ? "Supporting the 3T" : "Hỗ trợ 3T";
  return (
    <>
      <PageHero
        title={en ? "Open Workforce & Digital Workforce" : "Nhân lực mở & Nhân lực số"}
        description={workforce.positioning}
        crumbs={[{ name: en ? "Home" : "Trang chủ", href: "/" }, { name: en ? "Open & digital workforce" : "Nhân lực mở & nhân lực số" }]}
      />
      <Container className="grid gap-8 py-16 lg:grid-cols-2">
        <article className="border border-vabix-deep-teal/10 p-8" id="nhan-luc-mo">
          <p className="eyebrow">{support}</p>
          <h2 className="mt-2 text-2xl font-semibold text-vabix-deep-teal">{workforce.openTalent.title}</h2>
          <p className="mt-4 text-vabix-muted">{workforce.openTalent.summary}</p>
          <ul className="mt-6 list-disc space-y-2 pl-5">
            {workforce.openTalent.services.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <Link href="/mang-luoi/chuyen-gia" className="mt-6 inline-block text-sm font-semibold text-vabix-deep-teal">
            {en ? "View the expert network" : "Xem mạng lưới chuyên gia"}
          </Link>
        </article>
        <article className="border border-vabix-gold/40 p-8" id="nhan-luc-so">
          <p className="eyebrow">{support}</p>
          <h2 className="mt-2 text-2xl font-semibold text-vabix-deep-teal">{workforce.digitalTalent.title}</h2>
          <p className="mt-4 text-vabix-muted">{workforce.digitalTalent.summary}</p>
          <ul className="mt-6 list-disc space-y-2 pl-5">
            {workforce.digitalTalent.services.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <ul className="mt-6 space-y-2 text-sm text-vabix-muted">
            {workforce.digitalTalent.principles.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </article>
      </Container>
      <section className="bg-vabix-ivory py-16">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading title={en ? "The right capabilities at the right stage" : "Kết nối đúng năng lực, đúng giai đoạn"} />
            <p className="measure mt-4 text-vabix-muted">
              {en
                ? "Temporary staffing, speakers and KOL connections already available in the ecosystem are kept as ancillary services — not raised to the level of a pillar. Earlier services: book-writing support, event staffing, speakers, KOLs."
                : "Nhân lực thời vụ, diễn giả và kết nối KOL hiện có trong hệ sinh thái được giữ như dịch vụ phụ trợ — không nâng thành trụ cột. Dịch vụ cũ: hỗ trợ viết sách, nhân lực sự kiện, nhà diễn thuyết, KOL."}
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/dich-vu-phu-tro/nhan-luc-thoi-vu" className="text-vabix-deep-teal">
                  {en ? "Temporary event staffing" : "Nhân lực thời vụ cho sự kiện"}
                </Link>
              </li>
              <li>
                <Link href="/dich-vu-phu-tro/nha-dien-thuyet" className="text-vabix-deep-teal">
                  {en ? "Professional speakers" : "Nhà diễn thuyết chuyên nghiệp"}
                </Link>
              </li>
              <li>
                <Link href="/dich-vu-phu-tro/ket-noi-kol" className="text-vabix-deep-teal">
                  {en ? "KOL consulting and connections" : "Tư vấn và kết nối KOL"}
                </Link>
              </li>
            </ul>
          </div>
          <div className="border border-vabix-deep-teal/10 bg-white p-6">
          <LeadForm type="open-workforce" title={en ? "Open / digital workforce request" : "Nhu cầu nhân lực mở / nhân lực số"} />
          </div>
        </Container>
      </section>
      <CTASection
        title={en ? "Deploy capability to fit the problem, not an AI slogan." : "Bố trí năng lực theo bài toán, không theo khẩu hiệu AI."}
        description={en ? "Permissions, data, accountability and approvals remain with people." : "Quyền hạn, dữ liệu, trách nhiệm và phê duyệt vẫn thuộc về con người."}
      />
    </>
  );
}
