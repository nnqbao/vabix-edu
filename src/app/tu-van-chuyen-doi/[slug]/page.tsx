import { notFound } from "next/navigation";
import { consultingServices, getConsultingService, consultingProcess as consultingProcessVi } from "@/content/consulting";
import { consultingProcess as consultingProcessEn } from "@/content/en/consultingExtras";
import { localizedConsultingServices } from "@/platform/cms/catalog";
import { getLocale } from "@/i18n/server";
import { PageHero } from "@/components/layout/PageHero";
import { Container, SectionHeading } from "@/components/ui/Section";
import { CTASection } from "@/components/sections/CTASection";
import { LeadForm } from "@/components/forms/LeadForm";
import { createMetadata } from "@/lib/seo";
import { paths } from "@/lib/paths";
import Link from "next/link";

export function generateStaticParams() {
  return consultingServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = await getLocale();
  const base = getConsultingService(slug);
  const s = base ? localizedConsultingServices([base], locale)[0] : undefined;
  if (!s) return {};
  return createMetadata({ title: s.title, description: s.summary, path: `${locale === "en" ? "/en" : ""}${paths.consultingService(s.slug)}` });
}

export default async function ConsultingServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = await getLocale();
  const en = locale === "en";
  const base = getConsultingService(slug);
  const s = base ? localizedConsultingServices([base], locale)[0] : undefined;
  if (!s) notFound();
  const consultingProcess = en ? consultingProcessEn : consultingProcessVi;
  return (
    <>
      <PageHero
        eyebrow={en ? `Service ${s.number}` : `Dịch vụ ${s.number}`}
        title={s.title}
        description={s.summary}
        crumbs={[
          { name: en ? "Home" : "Trang chủ", href: "/" },
          { name: en ? "Transformation consulting" : "Tư vấn chuyển đổi", href: paths.consulting },
          { name: s.title },
        ]}
      />
      <Container className="grid gap-12 py-16 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          <section>
            <SectionHeading title={en ? "Scope" : "Phạm vi"} />
            <ul className="mt-4 list-disc space-y-2 pl-5">
              {s.scope.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </section>
          <section>
            <SectionHeading title={en ? "Deliverables" : "Sản phẩm bàn giao"} />
            <ul className="mt-4 list-disc space-y-2 pl-5">
              {s.deliverables.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </section>
          <section>
            <SectionHeading title={en ? "Intended outcomes" : "Kết quả hướng đến"} />
            <ul className="mt-4 space-y-2">
              {s.outcomes.map((x) => (
                <li key={x} className="bg-vabix-ivory p-4 text-sm">
                  {x}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <SectionHeading title={en ? "Part of the five-step process" : "Nằm trong quy trình năm bước"} />
            <p className="mt-3 text-sm text-vabix-muted">
              {en
                ? "Every service follows the same way of working: assess — bottlenecks — design — implement — measure."
                : "Mỗi dịch vụ được đặt trong cùng một cách làm: đánh giá — điểm nghẽn — thiết kế — triển khai — đo lường."}
            </p>
            <ol className="mt-4 flex flex-wrap gap-2 text-sm">
              {consultingProcess.map((p) => (
                <li key={p.step} className="border border-vabix-deep-teal/15 px-3 py-1.5">
                  {p.step} {p.title}
                </li>
              ))}
            </ol>
          </section>
          <p className="text-sm text-vabix-muted">
            {en
              ? "VABIX does not promise ROI, revenue or quantified improvement rates without a basis for measurement."
              : "VABIX không cam kết ROI, doanh thu hay tỷ lệ cải thiện định lượng khi chưa có căn cứ đo lường."}
          </p>
          <Link href={paths.consulting} className="inline-block text-sm font-semibold text-vabix-deep-teal">
            {en ? "← All consulting services" : "← Tất cả dịch vụ tư vấn"}
          </Link>
        </div>
        <aside>
          <div className="border border-vabix-deep-teal/10 bg-white p-6 lg:sticky lg:top-28">
            <LeadForm type="transformation" title={en ? "Discuss this service" : "Trao đổi về dịch vụ này"} program={s.slug} />
          </div>
        </aside>
      </Container>
      <CTASection
        title={en ? "Discuss your transformation needs." : "Trao đổi nhu cầu chuyển đổi."}
        description={en ? "Start from your business's current state and priority bottlenecks." : "Bắt đầu từ hiện trạng và điểm nghẽn ưu tiên của doanh nghiệp bạn."}
      />
    </>
  );
}
