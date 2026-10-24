import { publishedEvents } from "@/platform/cms/catalog";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Section";
import { EventCard } from "@/components/cards/Cards";
import { createMetadata } from "@/lib/seo";
import { getLocale } from "@/i18n/server";

export async function generateMetadata() {
  const en = (await getLocale()) === "en";
  return createMetadata({
    title: en ? "Event archive" : "Lưu trữ sự kiện",
    description: en
      ? "Past VABIX events."
      : "Các sự kiện VABIX đã diễn ra.",
    path: en ? "/en/su-kien/archive" : "/su-kien/archive",
  });
}

export default async function EventArchivePage() {
  const locale = await getLocale();
  const en = locale === "en";
  const list = publishedEvents(locale).filter((e) => e.status === "completed");
  return (
    <>
      <PageHero
        title={en ? "Past events" : "Sự kiện đã diễn ra"}
        crumbs={[
          { name: en ? "Home" : "Trang chủ", href: "/" },
          { name: en ? "Events" : "Sự kiện", href: "/su-kien" },
          { name: en ? "Archive" : "Lưu trữ" },
        ]}
      />
      <Container className="grid gap-6 py-16 md:grid-cols-3">
        {list.map((e) => (
          <EventCard key={e.id} event={e} />
        ))}
      </Container>
    </>
  );
}
