import * as pillarsVi from "@/content/pillars";
import * as pillarsEn from "@/content/en/pillars";
import { getLocale } from "@/i18n/server";
import { PageHero } from "@/components/layout/PageHero";
import { Container, SectionHeading } from "@/components/ui/Section";
import { CTASection } from "@/components/sections/CTASection";
import { createMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export async function generateMetadata() {
  const en = (await getLocale()) === "en";
  return createMetadata({
    title: en ? "3T Solutions" : "Giải pháp 3T",
    description: en
      ? "The three VABIX spearheads: Training & Coaching, Business Transformation Consulting and Trustworking — business connections built on trust."
      : "Ba mũi nhọn VABIX: Đào tạo & huấn luyện, Tư vấn chuyển đổi doanh nghiệp, Trustworking — kết nối kinh doanh dựa trên niềm tin.",
    path: en ? "/en/giai-phap" : "/giai-phap",
  });
}

export default async function SolutionsPage() {
  const en = (await getLocale()) === "en";
  const { pillars, supportingLayers } = en ? pillarsEn : pillarsVi;
  return (
    <>
      <PageHero
        eyebrow={en ? "Solutions" : "Giải pháp"}
        title={en ? "The three strategic 3T spearheads" : "Ba mũi nhọn chiến lược 3T"}
        description={
          en
            ? "Training & Coaching. Transformation. Trustworking. Knowledge products and workforce services form a supporting layer across all three — not a fourth pillar."
            : "Training & Coaching. Transformation. Trustworking. Sản phẩm tri thức và nhân lực là lớp hỗ trợ xuyên suốt — không phải trụ cột thứ tư."
        }
        crumbs={[{ name: en ? "Home" : "Trang chủ", href: "/" }, { name: en ? "Solutions" : "Giải pháp" }]}
      />
      <Container className="grid gap-6 py-16 lg:grid-cols-3">
        {pillars.map((p) => (
          <article key={p.id} id={p.id} className="flex h-full flex-col border border-vabix-deep-teal/10 p-8">
            <p className="eyebrow">{p.en}</p>
            <h2 className="mt-2 text-2xl font-semibold text-vabix-deep-teal">{p.vi}</h2>
            <p className="mt-4 text-sm text-vabix-muted">{p.problem}</p>
            <p className="mt-4 text-vabix-ink">{p.value}</p>
            <ul className="mt-6 space-y-2 text-sm">
              {p.services.map((s) => (
                <li key={s.label}>
                  <Link href={s.href} className="font-medium text-vabix-deep-teal">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-8">
              <Button href={p.href} variant="teal" className="w-full">
                {p.cta.label}
              </Button>
            </div>
          </article>
        ))}
      </Container>
      <section className="bg-vabix-ivory py-16">
        <Container>
          <SectionHeading
            title={en ? "Supporting capability layer" : "Lớp năng lực hỗ trợ"}
            description={en ? "Running across the ecosystem, not on a par with the 3T." : "Xuyên suốt hệ sinh thái, không ngang hàng 3T."}
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {supportingLayers.map((l) => (
              <Link key={l.href} href={l.href} className="bg-white p-6 hover:border-vabix-gold border border-transparent">
                <h3 className="font-semibold text-vabix-deep-teal">{l.title}</h3>
                <p className="mt-2 text-sm text-vabix-muted">{l.summary}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <CTASection
        title={en ? "Choose your starting point from your own challenge." : "Chọn điểm bắt đầu từ bài toán của bạn."}
        description={
          en
            ? "There is no need to go through the 3T in order. Share your needs and we will identify the right spearhead."
            : "Không bắt buộc đi tuần tự 3T. Trao đổi nhu cầu để xác định mũi nhọn phù hợp."
        }
      />
    </>
  );
}
