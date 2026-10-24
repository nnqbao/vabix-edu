import { publishedCaseStudies } from "@/platform/cms/catalog";
import { Breadcrumb } from "@/components/ui/Misc";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { CaseStudyCard } from "@/components/cards/Cards";
import { HeroBackdrop } from "@/components/templates/BmdoLanding";
import { createMetadata } from "@/lib/seo";
import { paths } from "@/lib/paths";
import { getLocale } from "@/i18n/server";

export async function generateMetadata() {
  const en = (await getLocale()) === "en";
  return createMetadata({
    title: en ? "Case studies" : "Case Study",
    description: en
      ? "Consulting, training and transformation programmes delivered on the real problems of real organisations."
      : "Các chương trình tư vấn, đào tạo và chuyển đổi được triển khai trên bài toán thật của tổ chức.",
    path: en ? "/en/tri-thuc/case-study" : "/tri-thuc/case-study",
  });
}

export default async function CaseStudiesPage() {
  const locale = await getLocale();
  const en = locale === "en";
  const list = publishedCaseStudies(locale);
  const orgs = [...new Set(list.map((c) => c.organization))];

  return (
    <>
      <section className="relative overflow-hidden bg-vabix-deep-teal pt-28 text-vabix-warm sm:pt-32">
        <HeroBackdrop />
        <Container className="relative pb-14 pt-8 sm:pb-16">
          <Breadcrumb light items={[{ name: en ? "Home" : "Trang chủ", href: paths.home }, { name: en ? "Knowledge" : "Tri thức", href: paths.knowledge }, { name: en ? "Case studies" : "Case Study" }]} />
          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.22em] text-vabix-soft-gold">{en ? "Case studies · Featured projects" : "Case Study · Dự án tiêu biểu"}</p>
          <h1 className="mt-4 max-w-4xl text-balance text-[2.2rem] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[3.4rem]">
            {en ? (
              <>
                Hands-on partnership. <span className="text-vabix-gold">Real-world value.</span>
              </>
            ) : (
              <>
                Đồng hành thực chiến. <span className="text-vabix-gold">Kiến tạo giá trị thực tế.</span>
              </>
            )}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
            {en
              ? "Consulting, training and transformation programmes delivered on the real problems of real organisations, from context and solution to results and lessons."
              : "Các chương trình tư vấn, đào tạo và chuyển đổi được triển khai trên bài toán thật của tổ chức — từ bối cảnh, giải pháp đến kết quả và bài học."}
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {orgs.map((o, i) => (
              <li key={o} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-white/80">
                <span className="text-vabix-gold">{String(i + 1).padStart(2, "0")}</span>
                {o}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-vabix-warm py-14 sm:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">{en ? "Four pillars of partnership" : "Bốn trụ đồng hành"}</p>
              <h2 className="mt-3 text-balance text-[1.9rem] font-semibold leading-[1.15] tracking-[-0.02em] text-vabix-deep-teal sm:text-[2.4rem]">
                {en ? (
                  <>
                    From corporate groups and public agencies <span className="text-vabix-gold">to individual businesses.</span>
                  </>
                ) : (
                  <>
                    Từ tập đoàn, cơ quan quản lý <span className="text-vabix-gold">đến từng doanh nghiệp.</span>
                  </>
                )}
              </h2>
            </div>
            <p className="max-w-md text-vabix-muted">
              {en
                ? "Each pillar is a journey delivered on a real problem. Click through to see the context, solution, results and lessons."
                : "Mỗi trụ là một hành trình triển khai trên bài toán thật — bấm vào để xem bối cảnh, giải pháp, kết quả và bài học."}
            </p>
          </div>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {list.map((c, i) => (
              <li key={c.id} className="h-full">
                <CaseStudyCard item={c} pillar={i + 1} />
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-vabix-deep-teal py-16 text-vabix-warm sm:py-20">
        <HeroBackdrop />
        <Container className="relative text-center">
          <h2 className="mx-auto max-w-3xl text-balance text-[1.9rem] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[2.4rem]">
            {en ? (
              <>
                Your business&rsquo;s challenge <span className="text-vabix-gold">could be the next case study.</span>
              </>
            ) : (
              <>
                Bài toán của doanh nghiệp bạn <span className="text-vabix-gold">có thể là case study tiếp theo.</span>
              </>
            )}
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={paths.contact}>{en ? "Talk to VABIX →" : "Trao đổi cùng VABIX →"}</Button>
            <Button href={paths.training} variant="outline" className="border-white/40 text-white">
              {en ? "View training programmes" : "Xem chương trình đào tạo"}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
