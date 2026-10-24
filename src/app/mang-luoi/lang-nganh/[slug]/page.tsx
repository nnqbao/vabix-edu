import { notFound } from "next/navigation";
import { villages } from "@/content/network";
import { villages as villagesEn } from "@/content/en/network";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Section";
import { CTASection } from "@/components/sections/CTASection";
import { createMetadata } from "@/lib/seo";
import { getLocale } from "@/i18n/server";

export function generateStaticParams() {
  return villages.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const en = (await getLocale()) === "en";
  const v = (en ? villagesEn : villages).find((x) => x.slug === slug);
  if (!v) return {};
  return createMetadata({ title: v.name, description: v.summary, path: `${en ? "/en" : ""}/mang-luoi/lang-nganh/${v.slug}` });
}

export default async function VillagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const en = (await getLocale()) === "en";
  const v = (en ? villagesEn : villages).find((x) => x.slug === slug);
  if (!v) notFound();
  return (
    <>
      <PageHero
        title={v.name}
        description={v.summary}
        crumbs={[
          { name: en ? "Home" : "Trang chủ", href: "/" },
          { name: en ? "Industry villages" : "Làng ngành", href: "/mang-luoi/lang-nganh" },
          { name: v.name },
        ]}
      />
      <Container className="py-16">
        {en ? (
          <p className="measure text-vabix-muted">
            The {v.name} village brings together suitable suppliers and experts, vetted by VABIX before they are connected with residents and customers. To join as a supplier, please see the path to becoming a partner.
          </p>
        ) : (
          <p className="measure text-vabix-muted">
            Làng {v.name} tập hợp các nhà cung cấp và chuyên gia phù hợp, được VABIX thẩm định trước khi kết nối với cư dân và khách hàng. Để tham gia với tư cách nhà cung cấp, vui lòng xem lộ trình trở thành đối tác.
          </p>
        )}
      </Container>
      <CTASection
        title={en ? "Connect within the industry village" : "Kết nối trong làng ngành"}
        description={en ? "Send a connection request or a supplier profile." : "Gửi nhu cầu kết nối hoặc hồ sơ nhà cung cấp."}
      />
    </>
  );
}
