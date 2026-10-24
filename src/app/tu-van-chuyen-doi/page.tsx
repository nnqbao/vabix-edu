import { PageHero } from "@/components/layout/PageHero";
import { Container, SectionHeading } from "@/components/ui/Section";
import { CTASection } from "@/components/sections/CTASection";
import { LeadForm } from "@/components/forms/LeadForm";
import * as consultingVi from "@/content/consulting";
import * as consultingEn from "@/content/en/consultingExtras";
import { localizedConsultingServices } from "@/platform/cms/catalog";
import { getLocale } from "@/i18n/server";
import { createMetadata } from "@/lib/seo";
import { paths } from "@/lib/paths";
import Link from "next/link";
import { ArrowIcon } from "@/components/ui/Misc";

export async function generateMetadata() {
  const en = (await getLocale()) === "en";
  return createMetadata({
    title: "Business Transformation Consulting",
    description: (en ? consultingEn : consultingVi).consultingPositioning,
    path: en ? `/en${paths.consulting}` : paths.consulting,
  });
}

export default async function TransformationLandingPage() {
  const locale = await getLocale();
  const en = locale === "en";
  const { consultingProcess, consultingOutcomes, consultingPositioning, consultingNote } = en ? consultingEn : consultingVi;
  const consultingServices = localizedConsultingServices(consultingVi.consultingServices, locale);
  return (
    <>
      <PageHero
        eyebrow="Transformation"
        title="Business Transformation Consulting"
        description={consultingPositioning}
        crumbs={[{ name: en ? "Home" : "Trang chủ", href: "/" }, { name: en ? "Transformation consulting" : "Tư vấn chuyển đổi" }]}
      />
      <Container className="grid gap-12 py-16 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          <p className="max-w-3xl text-vabix-muted">{consultingNote}</p>
          <section id="quy-trinh">
            <SectionHeading title={en ? "Our approach — a five-step process" : "Phương pháp tiếp cận — quy trình năm bước"} />
            <ol className="mt-8 grid gap-5 sm:grid-cols-2">
              {consultingProcess.map((s) => (
                <li key={s.step} className="border-t border-vabix-gold pt-4">
                  <p className="text-sm font-semibold text-vabix-gold">{s.step}</p>
                  <h3 className="mt-1 font-semibold text-vabix-deep-teal">{s.title}</h3>
                  <p className="mt-2 text-sm text-vabix-muted">{s.body}</p>
                </li>
              ))}
            </ol>
          </section>
          <section>
            <SectionHeading title={en ? "Intended outcomes" : "Kết quả hướng đến"} />
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {consultingOutcomes.map((x) => (
                <li key={x} className="bg-vabix-ivory p-4 text-sm text-vabix-deep-teal">
                  {x}
                </li>
              ))}
            </ul>
          </section>
        </div>
        <aside id="danh-gia">
          <div className="border border-vabix-deep-teal/10 bg-white p-6 lg:sticky lg:top-28">
            <LeadForm type="transformation" title={en ? "Request a needs assessment" : "Đăng ký đánh giá nhu cầu"} />
          </div>
        </aside>
      </Container>
      <section className="bg-vabix-ivory py-16" id="nhom-dich-vu">
        <Container>
          <SectionHeading title={en ? "Service areas" : "Các nhóm dịch vụ"} />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {consultingServices.map((s) => (
              <Link key={s.slug} href={paths.consultingService(s.slug)} className="border border-transparent bg-white p-6 hover:border-vabix-gold">
                <p className="text-sm font-semibold tracking-widest text-vabix-gold">{s.number}</p>
                <h3 className="mt-2 text-lg font-semibold text-vabix-deep-teal">{s.title}</h3>
                <p className="mt-3 text-sm text-vabix-muted">{s.summary}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-vabix-deep-teal">
                  {en ? "Scope & deliverables" : "Phạm vi & đầu ra"} <ArrowIcon />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <CTASection
        title={en ? "Start from where you are, not from an off-the-shelf solution." : "Bắt đầu từ hiện trạng, không từ giải pháp có sẵn."}
        description={
          en
            ? "VABIX works with you through assessment, design and implementation — with no promises of ROI before there is a basis for them."
            : "VABIX đồng hành đánh giá, thiết kế và triển khai — không cam kết ROI khi chưa có căn cứ."
        }
      />
    </>
  );
}
