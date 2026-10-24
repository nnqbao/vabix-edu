import { notFound } from "next/navigation";
import { methodologies, bizCarBlocks as bizCarBlocksVi } from "@/content/methodologies";
import { threeW as threeWVi } from "@/content/threeW";
import { threeW as threeWEn } from "@/content/en/threeW";
import { bizCarBlocksEn } from "@/content/en/methodologies";
import { getLocale } from "@/i18n/server";
import { MethodologyTemplate } from "@/components/templates/MethodologyTemplate";
import { publishedMethodology, publishedMethodologies, publishedFeaturedExperts, publishedCaseStudies } from "@/platform/cms/catalog";
import { ExpertCard, CaseStudyCard } from "@/components/cards/Cards";
import { SectionHeading } from "@/components/ui/Section";
import { createMetadata } from "@/lib/seo";
import Link from "next/link";

export function generateStaticParams() {
  const slugs = new Set(methodologies.map((item) => item.slug));
  try {
    for (const item of publishedMethodologies()) slugs.add(item.slug);
  } catch {
    /* file fallback */
  }
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = await getLocale();
  const m = publishedMethodology(slug, locale);
  if (!m) return {};
  return createMetadata({ title: m.name, description: m.summary, path: `${locale === "en" ? "/en" : ""}/mo-hinh-phuong-phap/${m.slug}` });
}

export default async function MethodPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = await getLocale();
  const en = locale === "en";
  const m = publishedMethodology(slug, locale);
  if (!m) notFound();
  const threeW = en ? threeWEn : threeWVi;
  const bizCarBlocks = en ? bizCarBlocksEn : bizCarBlocksVi;

  const extra =
    slug === "bizcar" ? (
      <div className="space-y-12">
        <section>
          <SectionHeading title={en ? "Why BizCar exists" : "Vì sao BizCar tồn tại"} />
          <p className="measure mt-4 text-vabix-muted">
            {en
              ? "When the big picture is unclear, change easily becomes piecemeal. BizCar gives leaders a way to see the business as one integrated car — knowing which wheel is slipping before changing it."
              : "Khi bức tranh tổng thể chưa rõ, đổi mới dễ manh mún. BizCar cho lãnh đạo một cách nhìn doanh nghiệp như chiếc xe thống nhất — biết bánh nào đang trượt trước khi đổi bánh."}
          </p>
        </section>
        <section>
          <SectionHeading title={en ? "The car metaphor" : "Ẩn dụ chiếc xe"} />
          <p className="measure mt-4 text-vabix-muted">
            {en
              ? "The engine is strategic direction. The wheels are market, value, people and finance. The gearbox and drivetrain are operations. The body is the brand. The chassis is the organisation. The steering wheel and the driver are leadership and executive management. The oil is culture. The fuel is core resources. The road is the business environment."
              : "Động cơ là định hướng chiến lược. Các bánh xe là thị trường, giá trị, nhân lực, tài lực. Hộp số và truyền dẫn là vận hành. Thân vỏ là thương hiệu. Khung gầm là tổ chức. Bánh lái và tài xế là lãnh đạo — điều hành. Nhớt là văn hóa. Nhiên liệu là nguồn lực lõi. Đường sá là môi trường kinh doanh."}
          </p>
        </section>
        <section>
          <SectionHeading title={en ? "12 functional blocks — three main groups" : "12 khối chức năng — ba nhóm lớn"} />
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {bizCarBlocks.map((g) => (
              <article key={g.groupId} className="border border-vabix-deep-teal/10 p-5">
                <h3 className="font-semibold text-vabix-deep-teal">{g.group}</h3>
                <ul className="mt-4 space-y-2 text-sm">
                  {g.items.map((i) => (
                    <li key={i.n}>
                      <span className="text-vabix-gold">{i.n}</span> {i.name}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
        <section>
          <SectionHeading title={en ? "How the diagnosis works" : "Chẩn đoán như thế nào"} />
          <p className="measure mt-4 text-vabix-muted">
            {en
              ? "Each block has measurement points. Leaders and their teams identify the weak components together, set the order of priorities and then redesign — instead of fighting local fires."
              : "Mỗi khối có điểm đo. Lãnh đạo và đội ngũ cùng nhận diện cấu phần yếu, chọn thứ tự ưu tiên, rồi thiết kế lại — thay vì chữa cháy cục bộ."}
          </p>
        </section>
        <section>
          <SectionHeading title={en ? "The BMDO programme and the MyBizCar tool" : "Chương trình BMDO và công cụ MyBizCar"} />
          <p className="measure mt-4 text-vabix-muted">
            {en
              ? "BizCar is the model. BMDO is a 12-day (60-hour) hands-on training ground. 3W is the WOW–WELL–WIN standard of success. MyBizCar is the assessment tool across the 12 blocks."
              : "BizCar là mô hình. BMDO là thao trường 12 ngày (60 giờ) đào tạo thực hành. 3W là chuẩn thành công WOW–WELL–WIN. MyBizCar là công cụ đánh giá trên 12 khối."}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/dao-tao/bmdo" className="border border-vabix-deep-teal/15 px-4 py-2 text-sm font-semibold text-vabix-deep-teal">BMDO</Link>
            <Link href="/mo-hinh-phuong-phap/3w" className="border border-vabix-deep-teal/15 px-4 py-2 text-sm font-semibold text-vabix-deep-teal">3W</Link>
            <Link href="/mo-hinh-phuong-phap/mybizcar" className="border border-vabix-deep-teal/15 px-4 py-2 text-sm font-semibold text-vabix-deep-teal">MyBizCar</Link>
            <Link href="/tu-van-chuyen-doi" className="border border-vabix-deep-teal/15 px-4 py-2 text-sm font-semibold text-vabix-deep-teal">{en ? "Transformation consulting" : "Tư vấn chuyển đổi"}</Link>
          </div>
        </section>
        <section className="bg-vabix-ivory p-6">
          <SectionHeading title="Case study" />
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {publishedCaseStudies(locale).slice(0, 2).map((c) => (
              <CaseStudyCard key={c.id} item={c} />
            ))}
          </div>
        </section>
        <section>
          <SectionHeading title={en ? "Our team" : "Đội ngũ"} />
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {publishedFeaturedExperts(locale).slice(0, 3).map((e) => (
              <ExpertCard key={e.id} expert={e} />
            ))}
          </div>
        </section>
        <section>
          <SectionHeading title={en ? "Frequently asked questions" : "Câu hỏi thường gặp"} />
          <details className="mt-4 border p-4">
            <summary className="cursor-pointer font-semibold text-vabix-deep-teal">{en ? "What is BizCar?" : "BizCar là gì?"}</summary>
            <p className="mt-2 text-sm text-vabix-muted">{m.summary}</p>
          </details>
          <details className="mt-3 border p-4">
            <summary className="cursor-pointer font-semibold text-vabix-deep-teal">{en ? "Is BizCar only for large businesses?" : "BizCar có phải chỉ dành cho doanh nghiệp lớn?"}</summary>
            <p className="mt-2 text-sm text-vabix-muted">
              {en
                ? "No. SMEs and startups use BizCar as a shared language to prioritise the right things when resources are limited."
                : "Không. SME và startup dùng BizCar như ngôn ngữ chung để ưu tiên đúng chỗ khi nguồn lực hữu hạn."}
            </p>
          </details>
        </section>
      </div>
    ) : slug === "3w" ? (
      <div className="space-y-10">
        <p className="max-w-2xl text-vabix-muted">{threeW.summary}</p>
        <section>
          <SectionHeading title={en ? "An output assessment framework — not a slogan" : "Khung đánh giá đầu ra — không phải slogan"} />
          <div className="mt-6 grid gap-5">
            {threeW.pillars.map((w) => (
              <article key={w.key} className="border border-vabix-deep-teal/10 p-5">
                <p className="text-sm font-semibold tracking-widest text-vabix-gold">{w.key}</p>
                <h3 className="mt-1 text-xl font-semibold text-vabix-deep-teal">{w.title}</h3>
                <p className="mt-2 text-vabix-muted">{w.body}</p>
                <p className="mt-3 text-sm text-vabix-deep-teal">{en ? "Example outputs" : "Ví dụ đầu ra"}: {w.outputs.join(" · ")}</p>
              </article>
            ))}
          </div>
        </section>
        <section>
          <SectionHeading title={en ? "Model, programme and standard: the difference" : "Phân biệt mô hình, chương trình và chuẩn"} />
          <dl className="mt-4 space-y-3">
            {threeW.distinction.map((d) => (
              <div key={d.term}>
                <dt className="font-semibold text-vabix-deep-teal">{d.term}</dt>
                <dd className="text-sm text-vabix-muted">{d.meaning}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    ) : undefined;

  return <MethodologyTemplate method={m} extra={extra} />;
}
