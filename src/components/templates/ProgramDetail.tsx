import Link from "next/link";
import { programs } from "@/content/programs";
import { programGroups } from "@/content/programs";
import { publishedProgram, publishedPrograms } from "@/platform/cms/catalog";
import { topicCategories } from "@/content/training";
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
  const p = publishedProgram(slug);
  if (!p) return {};
  if (slug === "ai-worklab") {
    return createMetadata({
      title: "VABIX AI WorkLab — From Work to Workflow",
      description: "Chương trình 04 buổi ứng dụng AI vào công việc, quy trình và vận hành doanh nghiệp: C.L.E.A.R, AI Workflow Canvas, Human Gate, use case pilot. Huấn luyện bởi chuyên gia Trần Anh Vũ.",
      path: paths.program(p.slug),
    });
  }
  if (slug === "babosora") {
    return createMetadata({
      title: "BABOSORA — Vận hành và gia tốc dòng chảy doanh thu",
      description: "Chương trình thực chiến 02 ngày cho doanh chủ, CEO và đội ngũ kinh doanh: B2A × BABOSORA, săn cơ hội NAP × CAP, hỏi chốt ASKING và sáu trục gia tốc doanh thu BRUCCS.",
      path: paths.program(p.slug),
    });
  }
  if (slug === "bmdo") {
    return createMetadata({
      title: "BMDO Khoá 04 — Thiết kế và vận hành doanh nghiệp toàn diện",
      description: "Chương trình 60 giờ, 12 ngày Thứ Bảy dành cho doanh chủ & CEO: thiết kế 12 miền quản trị theo mô hình BizCar trên MyBizCar. Khai giảng dự kiến 05.12.2026 tại SIHUB, TP.HCM.",
      path: paths.program(p.slug),
    });
  }
  return createMetadata({ title: p.title, description: p.seoDescription, path: paths.program(p.slug) });
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
  const p = publishedProgram(slug);
  if (!p) notFound();
  if (slug === "bmdo") return <BmdoLanding />;
  if (slug === "babosora") return <BabosoraLanding />;
  if (slug === "ai-worklab") return <AiWorklabLanding />;
  const groupLabel = programGroups.find((g) => g.id === p.group)?.label;
  const topics = (p.topicCategories ?? []).map((id) => topicCategories.find((t) => t.id === id)?.label).filter(Boolean);
  const related = publishedPrograms().filter((x) => (p.relatedPrograms ?? []).includes(x.slug));
  const leadType = slug === "bmdo" ? "bmdo" : slug === "mbm" ? "mbm" : slug === "theo-yeu-cau-doanh-nghiep" ? "corporate-training" : "training";

  return (
    <>
      <PageHero
        eyebrow={groupLabel}
        title={p.title}
        description={p.tagline ?? (p.englishName ? `${p.englishName}. ${p.audience}` : p.audience)}
        crumbs={[
          { name: "Trang chủ", href: paths.home },
          { name: "Đào tạo & huấn luyện", href: paths.training },
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
            <p className="font-semibold text-vabix-deep-teal">Thời lượng: {p.duration}</p>
          ) : (
            <p className="text-vabix-muted">{p.durationNote ?? "Thời lượng được thiết kế theo nhu cầu"}</p>
          )}
          {p.durationNote && p.duration ? <p className="text-sm text-vabix-muted">{p.durationNote}</p> : null}
          {topics.length ? <p className="text-sm text-vabix-muted">Lĩnh vực: {topics.join(" · ")}</p> : null}
          <Block title="Đối tượng" items={p.audienceList} />
          <section>
            <SectionHeading title="Bài toán" />
            <p className="mt-4 text-vabix-muted">{p.problem}</p>
          </section>
          <Block title="Mục tiêu" items={p.objectives} />
          <Block title="Nội dung / chuyên đề" items={p.topics} />
          <section>
            <SectionHeading title="Phương pháp" />
            <p className="mt-4 text-vabix-muted">{p.methodology}</p>
          </section>
          <Block title="Đầu ra" items={p.deliverables} />
          <Block title="Kết quả hướng đến" items={p.outcomes} />
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
              <SectionHeading title="Công nhận hoàn thành" />
              <p className="mt-4 text-vabix-muted">{p.certificate}</p>
            </section>
          ) : null}
          {(p.relatedModels ?? []).length ? (
            <section>
              <SectionHeading title="Mô hình / phương pháp liên quan" />
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
              <SectionHeading title="Chương trình liên quan" />
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
            <LeadForm type={leadType} program={p.slug} title="Liên hệ tư vấn chương trình" />
          </div>
        </aside>
      </Container>
      <CTASection
        title="Thiết kế theo nhu cầu doanh nghiệp."
        description="Khảo sát hiện trạng trước khi chốt nội dung, thời lượng và đội ngũ chuyên gia."
        primary={{ label: "Trao đổi cùng VABIX", href: paths.consult }}
      />
    </>
  );
}
