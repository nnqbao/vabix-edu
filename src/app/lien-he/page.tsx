import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Section";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteConfig } from "@/lib/siteConfig";
import { createMetadata } from "@/lib/seo";
import { getLocale } from "@/i18n/server";

const addressEn = "2nd Floor, Thanh Long Building, 456 Xô Viết Nghệ Tĩnh, Thạnh Mỹ Tây Ward, Ho Chi Minh City";

export async function generateMetadata() {
  const en = (await getLocale()) === "en";
  return createMetadata({
    title: en ? "Contact VABIX" : "Liên hệ VABIX",
    description: en
      ? `Contact VABIX — ${addressEn}. Hotline ${siteConfig.contact.hotline}.`
      : `Liên hệ VABIX — ${siteConfig.contact.address}. Hotline ${siteConfig.contact.hotline}.`,
    path: en ? "/en/lien-he" : "/lien-he",
  });
}

export default async function ContactPage() {
  const en = (await getLocale()) === "en";
  const c = siteConfig.contact;
  return (
    <>
      <PageHero
        title={en ? "Contact VABIX" : "Liên hệ VABIX"}
        description={
          en
            ? "Connect with the right knowledge. Meet the right partners. Build lasting value."
            : "Kết nối đúng tri thức. Gặp gỡ đúng đối tác. Kiến tạo giá trị bền vững."
        }
        crumbs={[{ name: en ? "Home" : "Trang chủ", href: "/" }, { name: en ? "Contact" : "Liên hệ" }]}
      />
      <Container className="grid gap-12 py-16 lg:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold text-vabix-deep-teal">{en ? "VABIX Connection Village" : "Làng Kết nối VABIX"}</h2>
          <address className="mt-4 space-y-2 not-italic text-vabix-muted">
            <p>{en ? addressEn : c.address}</p>
            <p>
              Hotline: <a href={c.hotlineHref}>{c.hotline}</a>
            </p>
            <p>
              {en ? "Office phone" : "Điện thoại văn phòng"}: <a href={c.officePhoneHref}>{c.officePhone}</a>
            </p>
            <p>
              Email: <a href={c.emailHref}>{c.email}</a>
            </p>
            <p>
              {en ? "Support" : "Hỗ trợ"}: <a href={c.supportEmailHref}>{c.supportEmail}</a>
            </p>
          </address>
          <ul className="mt-6 space-y-1 text-sm">
            <li>
              <a href={siteConfig.social.facebook}>Facebook</a>
            </li>
            <li>
              <a href={siteConfig.social.linkedin}>LinkedIn</a>
            </li>
            <li>
              <a href={siteConfig.social.youtube}>YouTube</a>
            </li>
          </ul>
        </div>
        <div className="border border-vabix-deep-teal/10 p-6">
          <LeadForm type="consult" title={en ? "Send us your details" : "Gửi thông tin liên hệ"} />
        </div>
      </Container>
    </>
  );
}
