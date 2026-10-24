import { handbooks as handbooksVi } from "@/content/network";
import { handbooks as handbooksEn } from "@/content/en/books";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Section";
import { createMetadata } from "@/lib/seo";
import { getLocale } from "@/i18n/server";
import Link from "next/link";

export async function generateMetadata() {
  const en = (await getLocale()) === "en";
  return createMetadata({
    title: en ? "VABIX handbooks" : "Cẩm nang VABIX",
    description: en
      ? "Industry and skills handbooks: practical knowledge from the VABIX ecosystem."
      : "Cẩm nang ngành và kỹ năng — tri thức thực tiễn trong hệ sinh thái VABIX.",
    path: en ? "/en/tri-thuc/cam-nang" : "/tri-thuc/cam-nang",
  });
}

export default async function HandbooksPage() {
  const en = (await getLocale()) === "en";
  const handbooks = en ? handbooksEn : handbooksVi;
  return (
    <>
      <PageHero
        title={en ? "Handbooks" : "Cẩm nang"}
        description={
          en
            ? "The handbooks already on the VABIX platform have been kept and reorganised in the knowledge library."
            : "Các cẩm nang hiện có trên nền tảng VABIX được giữ lại và sắp xếp lại trong kho tri thức."
        }
        crumbs={[{ name: en ? "Home" : "Trang chủ", href: "/" }, { name: en ? "Knowledge" : "Tri thức", href: "/tri-thuc" }, { name: en ? "Handbooks" : "Cẩm nang" }]}
      />
      <Container className="grid gap-4 py-16 md:grid-cols-2">
        {handbooks.map((h) => (
          <Link key={h.slug} href={`/tri-thuc/cam-nang/${h.slug}`} className="border border-vabix-deep-teal/10 p-6 hover:border-vabix-gold">
            <h2 className="font-semibold text-vabix-deep-teal">{h.title}</h2>
            <p className="mt-2 text-sm text-vabix-muted">{h.summary}</p>
          </Link>
        ))}
      </Container>
    </>
  );
}
