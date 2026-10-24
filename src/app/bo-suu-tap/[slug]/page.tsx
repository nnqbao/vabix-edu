import { notFound } from "next/navigation";
import { collections } from "@/content/network";
import { collections as collectionsEn } from "@/content/en/network";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Section";
import { createMetadata } from "@/lib/seo";
import { getLocale } from "@/i18n/server";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const en = (await getLocale()) === "en";
  const c = (en ? collectionsEn : collections).find((x) => x.slug === slug);
  if (!c) return {};
  return createMetadata({ title: c.title, description: c.summary, path: `${en ? "/en" : ""}/bo-suu-tap/${c.slug}` });
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const en = (await getLocale()) === "en";
  const c = (en ? collectionsEn : collections).find((x) => x.slug === slug);
  if (!c) notFound();
  return (
    <>
      <PageHero title={c.title} description={c.summary} crumbs={[{ name: en ? "Home" : "Trang chủ", href: "/" }, { name: en ? "Collections" : "Bộ sưu tập", href: "/bo-suu-tap" }, { name: c.title }]} />
      <Container className="py-16">
        <p className="measure text-vabix-muted">
          {en
            ? "This collection was moved from the corresponding section of the VABIX website. Event photos and certificates will continue to be added as high-quality originals become available from the operations team."
            : "Bộ sưu tập này được chuyển từ chuyên mục tương ứng trên website VABIX. Hình ảnh sự kiện và chứng nhận tiếp tục được bổ sung khi có bản gốc chất lượng cao từ đội ngũ vận hành."}
        </p>
      </Container>
    </>
  );
}
