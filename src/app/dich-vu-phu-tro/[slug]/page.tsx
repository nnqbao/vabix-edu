import { notFound } from "next/navigation";
import { supportServices } from "@/content/network";
import { supportServices as supportServicesEn } from "@/content/en/network";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Section";
import { LeadForm } from "@/components/forms/LeadForm";
import { createMetadata } from "@/lib/seo";
import { getLocale } from "@/i18n/server";

export function generateStaticParams() {
  return supportServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const en = (await getLocale()) === "en";
  const s = (en ? supportServicesEn : supportServices).find((x) => x.slug === slug);
  if (!s) return {};
  return createMetadata({ title: s.title, description: s.summary, path: `${en ? "/en" : ""}/dich-vu-phu-tro/${s.slug}` });
}

export default async function SupportServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const en = (await getLocale()) === "en";
  const s = (en ? supportServicesEn : supportServices).find((x) => x.slug === slug);
  if (!s) notFound();
  return (
    <>
      <PageHero
        title={s.title}
        description={s.summary}
        crumbs={[{ name: en ? "Home" : "Trang chủ", href: "/" }, { name: s.title }]}
      />
      <Container className="grid gap-10 py-16 lg:grid-cols-2">
        <p className="measure text-vabix-muted">
          {en
            ? "This is a support service within the VABIX ecosystem, carried over from the existing website and placed within the business connection flow."
            : "Đây là dịch vụ phụ trợ trong hệ sinh thái VABIX, được giữ lại từ website hiện hữu và đặt trong luồng kết nối doanh nghiệp."}
        </p>
        <div className="border border-vabix-deep-teal/10 p-6">
          <LeadForm type="consult" title={en ? "Request this service" : "Đăng ký dịch vụ"} />
        </div>
      </Container>
    </>
  );
}
