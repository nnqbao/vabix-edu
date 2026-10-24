import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Section";
import { EventCard } from "@/components/cards/Cards";
import { publishedUpcomingEvents } from "@/platform/cms/catalog";
import { createMetadata } from "@/lib/seo";
import { paths } from "@/lib/paths";
import { LeadForm } from "@/components/forms/LeadForm";
import Link from "next/link";
import { getLocale } from "@/i18n/server";

export async function generateMetadata() {
  const en = (await getLocale()) === "en";
  return createMetadata({
    title: en ? "Schedule / Open classes" : "Lịch học / Lớp đang mở",
    description: en
      ? "VABIX classes and training events. Start dates are shown only once confirmed."
      : "Các lớp và sự kiện đào tạo VABIX. Lịch khai giảng chỉ hiển thị khi đã được xác nhận.",
    path: paths.programSchedule,
  });
}

export default async function TrainingSchedulePage() {
  const locale = await getLocale();
  const en = locale === "en";
  const events = publishedUpcomingEvents(locale).filter((item) => item.status !== "completed");
  return (
    <>
      <PageHero
        title={en ? "Schedule / Open classes" : "Lịch học / Lớp đang mở"}
        description={
          en
            ? "Events and classes are published once the date, venue and registration status are set. We do not create new start dates on our own."
            : "Sự kiện và lớp được công bố khi đã có ngày, địa điểm và trạng thái đăng ký. Không tự tạo lịch khai giảng mới."
        }
        crumbs={[
          { name: en ? "Home" : "Trang chủ", href: "/" },
          { name: en ? "Training" : "Đào tạo", href: paths.training },
          { name: en ? "Schedule" : "Lịch học" },
        ]}
      />
      <Container className="grid gap-12 py-16 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {events.length ? (
            <div className="grid gap-6 md:grid-cols-2">
              {events.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          ) : (
            <p className="text-vabix-muted">
              {en
                ? "No classes are published on the website yet. Please leave your request and VABIX will contact you when a suitable schedule is available."
                : "Hiện chưa có lớp công bố trên website. Vui lòng để lại nhu cầu để VABIX liên hệ khi có lịch phù hợp."}
            </p>
          )}
          <Link href={paths.events} className="mt-8 inline-block font-semibold text-vabix-deep-teal">
            {en ? "View all events" : "Xem tất cả sự kiện"}
          </Link>
        </div>
        <div className="border border-vabix-deep-teal/10 bg-white p-6">
          <LeadForm type="training" title={en ? "Get the class schedule" : "Đăng ký nhận lịch lớp"} />
        </div>
      </Container>
    </>
  );
}
