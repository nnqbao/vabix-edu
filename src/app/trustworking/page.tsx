import { PageHero } from "@/components/layout/PageHero";
import { Container, SectionHeading } from "@/components/ui/Section";
import { CTASection } from "@/components/sections/CTASection";
import { LeadForm } from "@/components/forms/LeadForm";
import { trustworking as trustworkingVi } from "@/content/trustworking";
import { trustworking as trustworkingEn } from "@/content/en/trustworking";
import { getLocale } from "@/i18n/server";
import { villages } from "@/content/network";
import { createMetadata } from "@/lib/seo";
import { paths } from "@/lib/paths";
import Link from "next/link";

export async function generateMetadata() {
  const en = (await getLocale()) === "en";
  return createMetadata({
    title: "VABIX Trustworking",
    description: (en ? trustworkingEn : trustworkingVi).summary,
    path: en ? `/en${paths.trustworking}` : paths.trustworking,
  });
}

const villageNamesEn: Record<string, string> = {
  "tu-van-dao-tao": "Consulting & Training",
  "truyen-thong-tiep-thi": "Communications and Marketing",
  "thuc-pham-thuc-uong": "Food & Beverage",
  "tai-chinh-bao-hiem": "Finance & Insurance",
  "khoa-hoc-cong-nghe": "Science & Technology",
  "nong-lam-ngu": "Agriculture, Forestry & Fisheries",
  "vien-thong": "Telecoms & Television",
  "kien-truc-xay-dung": "Architecture & Construction",
  "vat-tu": "Supplies & Materials",
  "noi-that": "Interior & Exterior",
  "dien-tu": "Electronics & Electromechanics",
  "giao-nhan": "Freight & Transport",
};

export default async function TrustworkingPage() {
  const en = (await getLocale()) === "en";
  const trustworking = en ? trustworkingEn : trustworkingVi;
  return (
    <>
      <PageHero
        eyebrow="VABIX TRUSTWORKING"
        title={trustworking.headline}
        description={trustworking.summary}
        crumbs={[{ name: en ? "Home" : "Trang chủ", href: "/" }, { name: "Trustworking" }]}
      />
      <Container className="py-16">
        <p className="max-w-3xl text-lg text-vabix-ink">{trustworking.screening}</p>
        <ul className="mt-6 space-y-2 text-vabix-muted">
          {trustworking.notNetworking.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </Container>
      <section className="bg-vabix-ivory py-16">
        <Container className="grid gap-8 md:grid-cols-2">
          <article className="bg-white p-8" id="nha-cung-cap">
            <h2 className="text-2xl font-semibold text-vabix-deep-teal">{en ? "For suppliers" : "Dành cho nhà cung cấp"}</h2>
            <ul className="mt-5 list-disc space-y-2 pl-5 text-vabix-ink">
              {trustworking.supplierValue.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </article>
          <article className="bg-white p-8" id="khach-hang">
            <h2 className="text-2xl font-semibold text-vabix-deep-teal">{en ? "For clients / partners" : "Dành cho khách hàng / đối tác"}</h2>
            <ul className="mt-5 list-disc space-y-2 pl-5 text-vabix-ink">
              {trustworking.buyerValue.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </article>
        </Container>
      </section>
      <Container className="py-16" id="quy-trinh">
        <SectionHeading title={en ? "The Trustworking process" : "Quy trình Trustworking"} />
        <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {trustworking.process.map((s) => (
            <li key={s.step} className="border-t border-vabix-gold pt-4">
              <p className="text-sm font-semibold text-vabix-gold">{s.step}</p>
              <h3 className="mt-1 font-semibold text-vabix-deep-teal">{s.title}</h3>
              <p className="mt-2 text-sm text-vabix-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </Container>
      <section className="bg-vabix-ivory py-16" id="nguyen-tac">
        <Container>
          <SectionHeading title={en ? "Trustworking principles" : "Nguyên tắc Trustworking"} />
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {trustworking.principles.map((x) => (
              <li key={x} className="bg-white p-4 text-vabix-deep-teal">
                {x}
              </li>
            ))}
          </ul>
          <h3 className="mt-10 text-xl font-semibold text-vabix-deep-teal">{en ? "Limits of responsibility" : "Giới hạn trách nhiệm"}</h3>
          <p className="measure mt-3 text-vabix-muted">{trustworking.limitation}</p>
        </Container>
      </section>
      <Container className="py-16">
        <SectionHeading title={en ? "Services" : "Dịch vụ con"} />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {trustworking.services.map((s) => (
            <Link key={s.href} href={s.href} className="border border-vabix-deep-teal/10 p-6 hover:border-vabix-gold">
              <h3 className="font-semibold text-vabix-deep-teal">{s.title}</h3>
              <p className="mt-2 text-sm text-vabix-muted">{s.body}</p>
            </Link>
          ))}
        </div>
        <h3 className="mt-12 text-xl font-semibold text-vabix-deep-teal">{en ? "Current industry villages" : "Làng ngành hiện có"}</h3>
        <p className="mt-2 text-sm text-vabix-muted">
          {en
            ? "A supplier profile is not a legal certification or a guarantee of absolute quality."
            : "Hồ sơ nhà cung cấp không đồng nghĩa chứng nhận pháp lý hay bảo đảm chất lượng tuyệt đối."}
        </p>
        <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {villages.slice(0, 12).map((v) => (
            <Link key={v.slug} href={`/mang-luoi/lang-nganh/${v.slug}`} className="text-sm text-vabix-deep-teal hover:text-vabix-gold">
              {en ? (villageNamesEn[v.slug] ?? v.name) : v.name}
            </Link>
          ))}
        </div>
      </Container>
      <section className="bg-vabix-ivory py-16" id="ket-noi">
        <Container>
          <SectionHeading title={en ? "Submit a connection request" : "Gửi nhu cầu kết nối"} />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {trustworking.ctas.map((c) => (
              <div key={c.id} id={c.id} className="border border-vabix-deep-teal/10 bg-white p-6">
                <LeadForm type={c.type} title={c.title} />
              </div>
            ))}
          </div>
        </Container>
      </section>
      <CTASection
        title={en ? "The right connections, built on trust." : "Kết nối đúng, trên nền tảng niềm tin."}
        description={en ? "Screening before introduction. Each party carries out its own due diligence and makes its own decisions." : "Sàng lọc trước khi giới thiệu. Mỗi bên tự thẩm định và quyết định."}
      />
    </>
  );
}
