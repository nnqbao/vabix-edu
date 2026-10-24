import { threeW } from "@/content/threeW";
import { threeW as threeWEn } from "@/content/en/threeW";
import { getLocale } from "@/i18n/server";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Section";
import { createMetadata } from "@/lib/seo";
import { publishedMethodologies } from "@/platform/cms/catalog";
import Link from "next/link";

export async function generateMetadata() {
  const en = (await getLocale()) === "en";
  return createMetadata({
    title: en ? "Models & methods" : "Mô hình & phương pháp",
    description: en
      ? "The BizCar, APPLIER, MAIS, 3W, KAROT, KLASS, BABOSO, DGH — plus B2A and MyBizCar."
      : "The BizCar, APPLIER, MAIS, 3W, KAROT, KLASS, BABOSO, DGH — cùng B2A và MyBizCar.",
    path: en ? "/en/mo-hinh-phuong-phap" : "/mo-hinh-phuong-phap",
  });
}

export default async function MethodsIndexPage() {
  const locale = await getLocale();
  const en = locale === "en";
  const list = publishedMethodologies(locale);
  return (
    <>
      <PageHero
        title={en ? "Models, programmes and the standard of success" : "Mô hình, chương trình và chuẩn thành công"}
        description={
          en
            ? "A clear distinction: BizCar = the management model. BMDO = the hands-on CEO training programme. 3W = the WOW–WELL–WIN standard of success."
            : "Phân biệt rõ: BizCar = mô hình quản trị. BMDO = chương trình đào tạo CEO thực chiến. 3W = chuẩn thành công WOW–WELL–WIN."
        }
        crumbs={[{ name: en ? "Home" : "Trang chủ", href: "/" }, { name: en ? "Models & methods" : "Mô hình & phương pháp" }]}
      />
      <Container className="py-10">
        <p className="max-w-3xl text-vabix-muted">{(en ? threeWEn : threeW).headline}</p>
        <Link href="/mo-hinh-phuong-phap/3w" className="mt-3 inline-block font-semibold text-vabix-deep-teal">
          {en ? "See the 3W standard" : "Xem chuẩn 3W"}
        </Link>
      </Container>
      <Container className="grid gap-4 pb-16 md:grid-cols-2">
        {list.map((m) => (
          <Link key={m.slug} href={`/mo-hinh-phuong-phap/${m.slug}`} className="border border-vabix-deep-teal/10 p-7 hover:border-vabix-gold">
            <p className="eyebrow">{m.eyebrow}</p>
            <h2 className="mt-2 text-2xl font-semibold text-vabix-deep-teal">{m.name}</h2>
            <p className="mt-3 text-sm text-vabix-muted">{m.summary}</p>
          </Link>
        ))}
      </Container>
    </>
  );
}
