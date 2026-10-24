import * as networkVi from "@/content/network";
import * as networkEn from "@/content/en/network";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/siteConfig";
import { createMetadata } from "@/lib/seo";
import { getLocale } from "@/i18n/server";

export async function generateMetadata() {
  const en = (await getLocale()) === "en";
  return createMetadata({
    title: en ? "Suppliers" : "Nhà cung cấp",
    description: en
      ? "Digital storefronts of suppliers in the VABIX Village \u2014 matching supply and demand on a vetted platform."
      : "Gian hàng số của các nhà cung cấp trong Làng VABIX — kết nối cung cầu trên nền tảng có thẩm định.",
    path: en ? "/en/mang-luoi/nha-cung-cap" : "/mang-luoi/nha-cung-cap",
  });
}

export default async function SuppliersPage() {
  const en = (await getLocale()) === "en";
  const { testimonials } = en ? networkEn : networkVi;
  return (
    <>
      <PageHero
        title={en ? "Supplier storefronts" : "Gian hàng nhà cung cấp"}
        description={
          en
            ? "The digital space for suppliers in the VABIX Village. Participation is vetted — these are not open storefronts."
            : "Không gian số của các nhà cung cấp trong Làng VABIX. Việc tham gia được thẩm định — không phải gian hàng tự do."
        }
        crumbs={[
          { name: en ? "Home" : "Trang chủ", href: "/" },
          { name: en ? "Network" : "Mạng lưới", href: "/mang-luoi" },
          { name: en ? "Suppliers" : "Nhà cung cấp" },
        ]}
      />
      <Container className="py-16">
        <p className="measure text-vabix-muted">
          {en
            ? "The digital storefronts run on VABIX's existing platform. You can browse them, learn about supplier capabilities and get in touch to connect."
            : "Gian hàng số đang vận hành trên nền tảng hiện hữu của VABIX. Quý khách có thể tham quan, tìm hiểu năng lực nhà cung cấp và liên hệ kết nối."}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={siteConfig.portals.marketplace} variant="teal">
            {en ? "Visit the digital storefronts" : "Vào gian hàng số"}
          </Button>
          <Button href="/mang-luoi/tro-thanh-doi-tac" variant="outline" className="border-vabix-deep-teal text-vabix-deep-teal">
            {en ? "Become a supplier" : "Trở thành nhà cung cấp"}
          </Button>
        </div>
        <h2 className="mt-14 text-2xl font-semibold text-vabix-deep-teal">{en ? "Voices from the community" : "Tiếng nói từ cộng đồng"}</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote key={t.id} className="border border-vabix-deep-teal/10 p-6">
              <p className="text-sm text-vabix-ink">“{t.quote}”</p>
              <footer className="mt-4 text-sm font-semibold text-vabix-deep-teal">
                {t.author} <span className="block font-normal text-vabix-muted">{t.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </>
  );
}
