import * as networkVi from "@/content/network";
import * as networkEn from "@/content/en/network";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Section";
import { createMetadata } from "@/lib/seo";
import { getLocale } from "@/i18n/server";
import Link from "next/link";

export async function generateMetadata() {
  const en = (await getLocale()) === "en";
  return createMetadata({
    title: en ? "Industry villages" : "Làng ngành",
    description: en
      ? "The industry villages of VABIX \u2014 communities linked together so they can grow together."
      : "Các làng ngành trong VABIX — cộng đồng được liên kết để cùng phát triển.",
    path: en ? "/en/mang-luoi/lang-nganh" : "/mang-luoi/lang-nganh",
  });
}

export default async function VillagesPage() {
  const en = (await getLocale()) === "en";
  const { villages } = en ? networkEn : networkVi;
  return (
    <>
      <PageHero
        title={en ? "Industry villages" : "Làng ngành"}
        description={
          en
            ? "The business connection village is made up of linked industry villages. Each village gathers suppliers vetted according to VABIX's direction."
            : "Làng kết nối kinh doanh gồm các làng ngành được liên kết với nhau. Mỗi làng tập hợp nhà cung cấp được thẩm định theo định hướng của VABIX."
        }
        crumbs={[
          { name: en ? "Home" : "Trang chủ", href: "/" },
          { name: en ? "Network" : "Mạng lưới", href: "/mang-luoi" },
          { name: en ? "Industry villages" : "Làng ngành" },
        ]}
      />
      <Container className="grid gap-4 py-16 sm:grid-cols-2 lg:grid-cols-3">
        {villages.map((v) => (
          <Link key={v.slug} href={`/mang-luoi/lang-nganh/${v.slug}`} className="border border-vabix-deep-teal/10 p-6 hover:border-vabix-gold">
            <h2 className="font-semibold text-vabix-deep-teal">{v.name}</h2>
            <p className="mt-2 text-sm text-vabix-muted">{v.summary}</p>
          </Link>
        ))}
      </Container>
    </>
  );
}
