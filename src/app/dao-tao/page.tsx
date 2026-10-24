import { PageHero } from "@/components/layout/PageHero";
import { Container, SectionHeading } from "@/components/ui/Section";
import { CTASection } from "@/components/sections/CTASection";
import { LeadForm } from "@/components/forms/LeadForm";
import { ProgramCatalog } from "@/components/catalog/ProgramCatalog";
import { trainingGroups as trainingGroupsVi, trainingMethod as trainingMethodVi } from "@/content/training";
import { trainingGroups as trainingGroupsEn, trainingMethod as trainingMethodEn } from "@/content/en/training";
import { programGroups as programGroupsVi } from "@/content/programs";
import { programGroupsEn } from "@/content/en/programs";
import { publishedPrograms } from "@/platform/cms/catalog";
import { threeW } from "@/content/threeW";
import { createMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/Button";
import { paths } from "@/lib/paths";
import Link from "next/link";
import { getLocale } from "@/i18n/server";

export async function generateMetadata() {
  const en = (await getLocale()) === "en";
  return createMetadata({
    title: en ? "Training and coaching" : "Đào tạo và huấn luyện",
    description: en
      ? "Learn to see clearly. Design to make it work. Implement to deliver results. Training & Coaching for business owners, CEOs, managers and teams."
      : "Học để nhìn rõ. Thiết kế để làm được. Triển khai để tạo kết quả. Training & Coaching cho doanh chủ, CEO, quản lý và đội ngũ.",
    path: en ? `/en${paths.training}` : paths.training,
  });
}

export default async function TrainingHubPage() {
  const locale = await getLocale();
  const en = locale === "en";
  const trainingGroups = en ? trainingGroupsEn : trainingGroupsVi;
  const trainingMethod = en ? trainingMethodEn : trainingMethodVi;
  const programGroups = en ? programGroupsEn : programGroupsVi;
  const programs = publishedPrograms(locale);
  const coaching = trainingGroups.find((group) => group.id === "coaching");
  return (
    <>
      <PageHero
        eyebrow="Training & Coaching"
        title={en ? "Hands-on training and coaching" : "Đào tạo và huấn luyện thực chiến"}
        description={en ? "Learn to see clearly. Design to make it work. Implement to deliver results." : "Học để nhìn rõ. Thiết kế để làm được. Triển khai để tạo kết quả."}
        crumbs={[{ name: en ? "Home" : "Trang chủ", href: "/" }, { name: en ? "Training & coaching" : "Đào tạo & huấn luyện" }]}
      />
      <Container className="grid gap-12 py-16 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          <section>
            <SectionHeading title={en ? "Positioning" : "Định vị"} />
            <p className="measure mt-4 text-vabix-muted">
              {en
                ? "From the CEO training ground and 1:1 coaching to training built around each company's needs — helping participants see problems clearly, design solutions, apply them at work and measure the results."
                : "Từ Thao trường CEO, huấn luyện 1:1 đến đào tạo theo nhu cầu doanh nghiệp — giúp người học nhìn rõ vấn đề, thiết kế giải pháp, ứng dụng vào công việc và đo lường kết quả."}
            </p>
          </section>
          <section id="doanh-chu">
            <SectionHeading title={en ? "A. For business owners & CEOs" : "A. Dành cho Doanh chủ & CEO"} />
            <ProgramList programs={programs.filter((p) => p.group === "ceo")} />
          </section>
          {coaching ? (
            <section id="coaching">
              <SectionHeading title={`${coaching.number}. ${coaching.title}`} />
              <p className="measure mt-4 text-vabix-muted">{coaching.goal}</p>
              <p className="measure mt-3 text-sm text-vabix-muted">{en ? "Audience" : "Đối tượng"}: {coaching.audience}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {coaching.topics.map((topic) => (
                  <li key={topic} className="border border-vabix-deep-teal/10 bg-white px-3 py-1.5 text-sm text-vabix-deep-teal">
                    {topic}
                  </li>
                ))}
              </ul>
              <p className="measure mt-4 text-sm text-vabix-muted">{coaching.outcomes.join(" · ")}</p>
            </section>
          ) : null}
          <section id="quan-ly">
            <SectionHeading title={en ? "B. For managers & staff" : "B. Dành cho đội ngũ quản lý & nhân viên"} />
            <ProgramList programs={programs.filter((p) => p.group === "management")} />
          </section>
          <section id="theo-yeu-cau">
            <SectionHeading title={en ? "C. Custom corporate training" : "C. Đào tạo theo yêu cầu doanh nghiệp"} />
            <ProgramList programs={programs.filter((p) => p.group === "custom")} />
          </section>
        </div>
        <aside>
          <div className="border border-vabix-deep-teal/10 bg-white p-6 lg:sticky lg:top-28">
            <LeadForm type="training" title={en ? "Training enquiry" : "Tư vấn đào tạo"} />
          </div>
        </aside>
      </Container>
      <section className="bg-vabix-ivory py-16">
        <Container>
          <SectionHeading title={en ? "The APPLIER method and the 3W standard" : "Phương pháp APPLIER và chuẩn 3W"} />
          <p className="measure mt-4 text-vabix-muted">{trainingMethod.positioning}</p>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trainingMethod.steps.map((s) => (
              <li key={s.title} className="bg-white p-5">
                <h3 className="font-semibold text-vabix-deep-teal">{s.title}</h3>
                <p className="mt-2 text-sm text-vabix-muted">{s.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-vabix-muted">{en ? "WOW in awareness • WELL in design • WIN in practice." : threeW.headline}</p>
          <Link href={paths.method("applier")} className="mt-4 mr-4 inline-block text-sm font-semibold text-vabix-deep-teal">
            {en ? "Explore APPLIER" : "Xem APPLIER"}
          </Link>
          <Link href={paths.method("3w")} className="mt-4 inline-block text-sm font-semibold text-vabix-deep-teal">
            {en ? "Explore 3W" : "Xem 3W"}
          </Link>
        </Container>
      </section>
      <Container className="py-16">
        <SectionHeading title={en ? "Full catalogue" : "Toàn bộ danh mục"} description={programGroups.map((g) => g.label).join(" · ")} />
        <div className="mt-8">
          <ProgramCatalog programs={programs} />
        </div>
        <div className="mt-8">
          <Button href={paths.programSchedule} variant="teal">
            {en ? "Schedule / open classes" : "Lịch học / lớp đang mở"}
          </Button>
        </div>
      </Container>
      <CTASection
        title={en ? "Talk to us about your company's training needs." : "Trao đổi nhu cầu đào tạo của doanh nghiệp bạn."}
        description={
          en
            ? "We survey your goals, audience and current situation before proposing content, duration and experts."
            : "Khảo sát mục tiêu, đối tượng và hiện trạng trước khi đề xuất nội dung, thời lượng và chuyên gia."
        }
        primary={{ label: en ? "Request a programme consultation" : "Đăng ký tư vấn chương trình", href: "/ket-noi#chuong-trinh" }}
      />
    </>
  );
}

function ProgramList({
  programs,
}: {
  programs: { slug: string; title: string; duration?: string; durationNote?: string; tagline?: string }[];
}) {
  return (
    <div className="mt-6 grid gap-3">
      {programs.map((p) => (
        <Link key={p.slug} href={paths.program(p.slug)} className="border border-vabix-deep-teal/10 p-5 hover:border-vabix-gold">
          <h3 className="font-semibold text-vabix-deep-teal">{p.title}</h3>
          <p className="mt-1 text-sm text-vabix-muted">{p.tagline ?? p.duration ?? p.durationNote}</p>
        </Link>
      ))}
    </div>
  );
}
