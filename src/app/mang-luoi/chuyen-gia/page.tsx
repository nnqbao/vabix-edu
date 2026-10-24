import { publishedExperts } from "@/platform/cms/catalog";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Section";
import { ExpertCard } from "@/components/cards/Cards";
import { createMetadata } from "@/lib/seo";
import { getLocale } from "@/i18n/server";

export async function generateMetadata() {
  const en = (await getLocale()) === "en";
  return createMetadata({
    title: en ? "Our experts" : "Đội ngũ chuyên gia",
    description: en
      ? "The VABIX expert network — people who have researched, led, advised and implemented solutions inside real businesses."
      : "Mạng lưới chuyên gia VABIX — những người đã nghiên cứu, điều hành, cố vấn và triển khai giải pháp trong môi trường doanh nghiệp.",
    path: en ? "/en/mang-luoi/chuyen-gia" : "/mang-luoi/chuyen-gia",
  });
}

export default async function ExpertsPage() {
  const locale = await getLocale();
  const en = locale === "en";
  const list = publishedExperts(locale);
  return (
    <>
      <PageHero
        title={en ? "Our experts" : "Đội ngũ chuyên gia"}
        description={
          en
            ? "VABIX brings together experts who have personally researched, led, advised and implemented solutions inside real businesses."
            : "VABIX quy tụ những chuyên gia đã trực tiếp nghiên cứu, điều hành, cố vấn và triển khai giải pháp trong môi trường doanh nghiệp."
        }
        crumbs={[
          { name: en ? "Home" : "Trang chủ", href: "/" },
          { name: en ? "Network" : "Mạng lưới", href: "/mang-luoi" },
          { name: en ? "Experts" : "Chuyên gia" },
        ]}
      />
      <Container className="grid gap-4 py-16 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((e) => (
          <ExpertCard key={e.id} expert={e} />
        ))}
      </Container>
    </>
  );
}
