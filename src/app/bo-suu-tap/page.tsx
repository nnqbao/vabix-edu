import { collections } from "@/content/network";
import { collections as collectionsEn } from "@/content/en/network";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Section";
import { createMetadata } from "@/lib/seo";
import { getLocale } from "@/i18n/server";
import Link from "next/link";

export async function generateMetadata() {
  const en = (await getLocale()) === "en";
  return createMetadata({
    title: en ? "Collections" : "Bộ sưu tập",
    description: en
      ? "VABIX photos of signings, training and connection events, plus certificate samples."
      : "Hình ảnh ký kết, đào tạo, kết nối và mẫu chứng nhận của VABIX.",
    path: en ? "/en/bo-suu-tap" : "/bo-suu-tap",
  });
}

export default async function CollectionsPage() {
  const en = (await getLocale()) === "en";
  return (
    <>
      <PageHero
        title={en ? "Collections" : "Bộ sưu tập"}
        description={
          en
            ? "Photo records and certificates carried over from the existing website and organised in the new structure."
            : "Tư liệu hình ảnh và chứng nhận được giữ lại từ website hiện hữu, sắp xếp trong kiến trúc mới."
        }
        crumbs={[{ name: en ? "Home" : "Trang chủ", href: "/" }, { name: en ? "Collections" : "Bộ sưu tập" }]}
      />
      <Container className="grid gap-4 py-16 md:grid-cols-2">
        {(en ? collectionsEn : collections).map((c) => (
          <Link key={c.slug} href={`/bo-suu-tap/${c.slug}`} className="border border-vabix-deep-teal/10 p-6 hover:border-vabix-gold">
            <h2 className="font-semibold text-vabix-deep-teal">{c.title}</h2>
            <p className="mt-2 text-sm text-vabix-muted">{c.summary}</p>
          </Link>
        ))}
      </Container>
    </>
  );
}
