import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Section";
import { LeadForm } from "@/components/forms/LeadForm";
import { createMetadata } from "@/lib/seo";
import { getLocale } from "@/i18n/server";
import { pillars } from "@/content/pillars";
import Link from "next/link";

export async function generateMetadata() {
  const en = (await getLocale()) === "en";
  return createMetadata({
    title: en ? "Discuss your business needs" : "Trao đổi nhu cầu doanh nghiệp",
    description: en
      ? "Request advice on training, business transformation or Trustworking, or propose a partnership with VABIX."
      : "Đăng ký tư vấn đào tạo, chuyển đổi doanh nghiệp, Trustworking hoặc hợp tác cùng VABIX.",
    path: en ? "/en/ket-noi" : "/ket-noi",
  });
}

const pillarTitlesEn: Record<string, string> = {
  "dao-tao-huan-luyen": "Training and coaching",
  "tu-van-chuyen-doi": "Transformation consulting",
  trustworking: "Trust-based business connections",
};

export default async function ConnectPage() {
  const en = (await getLocale()) === "en";
  return (
    <>
      <PageHero
        title={en ? "Discuss your business needs" : "Trao đổi nhu cầu doanh nghiệp"}
        description={
          en
            ? "Start from the real problem. One focused conversation usually costs far less than months of operating in the wrong direction."
            : "Bắt đầu từ bài toán thực tế. Một cuộc trao đổi đúng trọng tâm thường tiết kiệm hơn nhiều tháng vận hành lệch hướng."
        }
        crumbs={[{ name: en ? "Home" : "Trang chủ", href: "/" }, { name: en ? "Connect" : "Kết nối" }]}
      />
      <Container className="grid gap-6 py-10 sm:grid-cols-3">
        {pillars.map((p) => (
          <Link key={p.id} href={p.href} className="border border-vabix-deep-teal/10 p-5 hover:border-vabix-gold">
            <p className="eyebrow">{p.en}</p>
            <h2 className="mt-1 font-semibold text-vabix-deep-teal">{en ? (pillarTitlesEn[p.id] ?? p.en) : p.vi}</h2>
          </Link>
        ))}
      </Container>
      <Container className="grid gap-10 pb-16 lg:grid-cols-2">
        <div id="tu-van" className="border border-vabix-deep-teal/10 p-6">
          <LeadForm type="consult" title={en ? "Business consulting" : "Tư vấn doanh nghiệp"} />
        </div>
        <div className="space-y-10">
          <div id="chuong-trinh" className="border border-vabix-deep-teal/10 p-6">
            <LeadForm type="program" title={en ? "Programme registration / advice" : "Đăng ký / tư vấn chương trình"} />
          </div>
          <div id="trustworking" className="border border-vabix-deep-teal/10 p-6">
            <LeadForm type="connect" title={en ? "Trustworking / partnership" : "Trustworking / hợp tác"} />
          </div>
        </div>
      </Container>
    </>
  );
}
