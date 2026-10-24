import { publishedUpcomingEvents } from "@/platform/cms/catalog";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Section";
import { EventCard } from "@/components/cards/Cards";
import { createMetadata } from "@/lib/seo";
import { getLocale } from "@/i18n/server";
import Link from "next/link";

export async function generateMetadata() {
  const en = (await getLocale()) === "en";
  return createMetadata({
    title: en ? "VABIX events" : "Sự kiện VABIX",
    description: en
      ? "VABIX connection events, BMDO programmes, workshops and resident training."
      : "Sự kiện kết nối, chương trình BMDO, workshop và đào tạo cư dân của VABIX.",
    path: en ? "/en/su-kien" : "/su-kien",
  });
}

export default async function EventsPage() {
  const locale = await getLocale();
  const en = locale === "en";
  const list = publishedUpcomingEvents(locale).filter((e) => e.status !== "completed");
  return (
    <>
      <PageHero
        title={en ? "Events & programmes" : "Sự kiện & chương trình"}
        description={
          en
            ? "Upcoming events come first. Past events are kept in the archive."
            : "Ưu tiên các sự kiện sắp diễn ra. Sự kiện đã diễn ra được lưu tại kho lưu trữ."
        }
        crumbs={[{ name: en ? "Home" : "Trang chủ", href: "/" }, { name: en ? "Events" : "Sự kiện" }]}
      />
      <Container className="py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {list.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
        <Link href="/su-kien/archive" className="mt-10 inline-block font-semibold text-vabix-deep-teal">
          {en ? "See past events" : "Xem sự kiện đã diễn ra"}
        </Link>
      </Container>
    </>
  );
}
