import Link from "next/link";
import { programs } from "@/content/programs";
import { programGroups as programGroupsVi } from "@/content/programs";
import { programGroupsEn } from "@/content/en/programs";
import { publishedProgram, publishedPrograms } from "@/platform/cms/catalog";
import { topicCategories as topicCategoriesVi } from "@/content/training";
import { topicCategories as topicCategoriesEn } from "@/content/en/training";
import { getLocale } from "@/i18n/server";
import { bmdoLanding } from "@/content/bmdo";
import { BmdoLanding } from "@/components/templates/BmdoLanding";
import { BabosoraLanding } from "@/components/templates/BabosoraLanding";
import { AiWorklabLanding } from "@/components/templates/AiWorklabLanding";
import { PageHero } from "@/components/layout/PageHero";
import { Container, SectionHeading } from "@/components/ui/Section";
import { CTASection } from "@/components/sections/CTASection";
import { LeadForm } from "@/components/forms/LeadForm";
import { createMetadata } from "@/lib/seo";
import { paths } from "@/lib/paths";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function programStaticParams() {
  const slugs = new Set(programs.filter((item) => item.status === "published").map((item) => item.slug));
  try {
    for (const item of publishedPrograms()) slugs.add(item.slug);
  } catch {
    /* file fallback */
  }
  return [...slugs].map((slug) => ({ slug }));
}

export async function programMetadata(slug: string): Promise<Metadata> {
  const locale = await getLocale();
  const en = locale === "en";
  const p = publishedProgram(slug, locale);
  if (!p) return {};
  if (slug === "ai-worklab") {
    return createMetadata({
      title: "VABIX AI WorkLab — From Work to Workflow",
      description: en
        ? "A 4-session programme applying AI to work, processes and business operations: C.L.E.A.R, AI Workflow Canvas, Human Gate, use case pilot. Coached by expert Trần Anh Vũ."
        : "Chương trình 04 buổi ứng dụng AI vào công việc, quy trình và vận hành doanh nghiệp: C.L.E.A.R, AI Workflow Canvas, Human Gate, use case pilot. Huấn luyện bởi chuyên gia Trần Anh Vũ.",
      path: `${en ? "/en" : ""}${paths.program(p.slug)}`,
    });
  }
  if (slug === "babosora") {
    return createMetadata({
      title: en ? "BABOSORA — Running and accelerating the revenue flow" : "BABOSORA — Vận hành và gia tốc dòng chảy doanh thu",
      description: en
        ? "A hands-on 2-day programme for business owners, CEOs and sales teams: B2A × BABOSORA, NAP × CAP opportunity hunting, ASKING closing and the six BRUCCS revenue acceleration levers."
        : "Chương trình thực chiến 02 ngày cho doanh chủ, CEO và đội ngũ kinh doanh: B2A × BABOSORA, săn cơ hội NAP × CAP, hỏi chốt ASKING và sáu trục gia tốc doanh thu BRUCCS.",
      path: `${en ? "/en" : ""}${paths.program(p.slug)}`,
    });
  }
  if (slug === "bmdo") {
    return createMetadata({
      title: en ? "BMDO Cohort 04 — Designing and running the whole business" : "BMDO Khoá 04 — Thiết kế và vận hành doanh nghiệp toàn diện",
      description: en
        ? "A 60-hour programme over 12 Saturdays for business owners & CEOs: designing 12 management domains with the BizCar model on MyBizCar. Expected to start on 05.12.2026 at SIHUB, Ho Chi Minh City."
        : "Chương trình 60 giờ, 12 ngày Thứ Bảy dành cho doanh chủ & CEO: thiết kế 12 miền quản trị theo mô hình BizCar trên MyBizCar. Khai giảng dự kiến 05.12.2026 tại SIHUB, TP.HCM.",
      path: `${en ? "/en" : ""}${paths.program(p.slug)}`,
    });
  }
  return createMetadata({ title: p.title, description: p.seoDescription, path: `${en ? "/en" : ""}${paths.program(p.slug)}` });
}

function Block({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <section>
      <SectionHeading title={title} />
      <ul className="mt-4 list-disc space-y-2 pl-5">
        {items.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </section>
  );
}

export async function ProgramDetail({ slug }: { slug: string }) {
  const locale = await getLocale();
  const en = locale === "en";
  const p = publishedProgram(slug, locale);
  if (!p) notFound();
  if (slug === "bmdo") return <BmdoLanding />;
  if (slug === "babosora") return <BabosoraLanding />;
  if (slug === "ai-worklab") return <AiWorklabLanding />;
  const programGroups = en ? programGroupsEn : programGroupsVi;
  const topicCategories = en ? topicCategoriesEn : topicCategoriesVi;
  const groupLabel = programGroups.find((g) => g.id === p.group)?.label;
  const topics = (p.topicCategories ?? []).map((id) => topicCategories.find((t) => t.id === id)?.label).filter(Boolean);
  const related = publishedPrograms(locale).filter((x) => (p.relatedPrograms ?? []).includes(x.slug));
  const leadType = slug === "bmdo" ? "bmdo" : slug === "mbm" ? "mbm" : slug === "theo-yeu-cau-doanh-nghiep" ? "corporate-training" : "training";

  return (
    <>
      <PageHero
        eyebrow={groupLabel}
        title={p.title}
        description={p.tagline ?? (p.englishName ? `${p.englishName}. ${p.audience}` : p.audience)}
        crumbs={[
          { name: en ? "Home" : "Trang chủ", href: paths.home },
          { name: en ? "Training & coaching" : "Đào tạo & huấn luyện", href: paths.training },
          { name: p.shortTitle },
        ]}
      />
      <Container className="grid gap-12 py-16 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          {p.clarification ? (
            <p className="border-l-2 border-vabix-gold bg-vabix-ivory p-4 text-sm text-vabix-ink" role="note">
              {p.clarification}
            </p>
          ) : null}
          {p.shortDescription ? <p className="text-lg text-vabix-ink">{p.shortDescription}</p> : <p className="text-lg text-vabix-ink">{p.problem}</p>}
          {p.duration ? (
            <p className="font-semibold text-vabix-deep-teal">{en ? "Duration" : "Thời lượng"}: {p.duration}</p>
          ) : (
            <p className="text-vabix-muted">{p.durationNote ?? (en ? "Duration tailored to your needs" : "Thời lượng được thiết kế theo nhu cầu")}</p>
          )}
          {p.durationNote && p.duration ? <p className="text-sm text-vabix-muted">{p.durationNote}</p> : null}
          {topics.length ? <p className="text-sm text-vabix-muted">{en ? "Areas" : "Lĩnh vực"}: {topics.join(" · ")}</p> : null}
          <Block title={en ? "Who it is for" : "Đối tượng"} items={p.audienceList} />
          <section>
            <SectionHeading title={en ? "The challenge" : "Bài toán"} />
            <p className="mt-4 text-vabix-muted">{p.problem}</p>
          </section>
          <Block title={en ? "Objectives" : "Mục tiêu"} items={p.objectives} />
          <Block title={en ? "Content / topics" : "Nội dung / chuyên đề"} items={p.topics} />
          <section>
            <SectionHeading title={en ? "Method" : "Phương pháp"} />
            <p className="mt-4 text-vabix-muted">{p.methodology}</p>
          </section>
          <Block title={en ? "Deliverables" : "Đầu ra"} items={p.deliverables} />
          <Block title={en ? "Intended outcomes" : "Kết quả hướng đến"} items={p.outcomes} />
          {slug === "bmdo" ? (
            <section className="space-y-6">
              <SectionHeading title="BMDO — các cấu phần then chốt" />
              <p className="font-medium text-vabix-deep-teal">{bmdoLanding.keyStatement}</p>
              <p className="text-sm text-vabix-muted">{bmdoLanding.cadence}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {bmdoLanding.sections.map((section) => (
                  <article key={section.id} className="border border-vabix-deep-teal/10 p-5">
                    <h3 className="font-semibold text-vabix-deep-teal">{section.title}</h3>
                    <p className="mt-2 text-sm text-vabix-muted">{section.body}</p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}
          {p.certificate ? (
            <section>
              <SectionHeading title={en ? "Completion recognition" : "Công nhận hoàn thành"} />
              <p className="mt-4 text-vabix-muted">{p.certificate}</p>
            </section>
          ) : null}
          {(p.relatedModels ?? []).length ? (
            <section>
              <SectionHeading title={en ? "Related models / methods" : "Mô hình / phương pháp liên quan"} />
              <div className="mt-4 flex flex-wrap gap-3">
                {(p.relatedModels ?? []).map((m) => (
                  <Link key={m} href={paths.method(m)} className="border border-vabix-deep-teal/15 px-4 py-2 text-sm font-semibold text-vabix-deep-teal">
                    {m.toUpperCase()}
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
          {related.length ? (
            <section>
              <SectionHeading title={en ? "Related programmes" : "Chương trình liên quan"} />
              <ul className="mt-4 space-y-2">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={paths.program(r.slug)} className="text-vabix-deep-teal">
                      {r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
        <aside>
          <div className="border border-vabix-deep-teal/10 bg-white p-6 lg:sticky lg:top-28">
            <LeadForm type={leadType} program={p.slug} title={en ? "Programme enquiry" : "Liên hệ tư vấn chương trình"} />
          </div>
        </aside>
      </Container>
      <CTASection
        title={en ? "Designed around your company's needs." : "Thiết kế theo nhu cầu doanh nghiệp."}
        description={
          en
            ? "We assess your current situation before finalising content, duration and the expert team."
            : "Khảo sát hiện trạng trước khi chốt nội dung, thời lượng và đội ngũ chuyên gia."
        }
        primary={{ label: en ? "Talk to VABIX" : "Trao đổi cùng VABIX", href: paths.consult }}
      />
    </>
  );
}
