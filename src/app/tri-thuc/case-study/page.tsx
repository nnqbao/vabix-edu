import Image from "next/image";
import Link from "next/link";
import { publishedCaseStudies } from "@/platform/cms/catalog";
import { Breadcrumb } from "@/components/ui/Misc";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { CaseStudyCard } from "@/components/cards/Cards";
import { HeroBackdrop } from "@/components/templates/BmdoLanding";
import { RevealOnView } from "@/components/templates/RevealOnView";
import { createMetadata } from "@/lib/seo";
import { paths } from "@/lib/paths";

export const metadata = createMetadata({
  title: "Case Study",
  description: "Các chương trình tư vấn, đào tạo và chuyển đổi được triển khai trên bài toán thật của tổ chức.",
  path: "/tri-thuc/case-study",
});

export default function CaseStudiesPage() {
  const list = publishedCaseStudies();
  const [lead, ...rest] = list;
  const orgs = [...new Set(list.map((c) => c.organization))];

  return (
    <>
      <section className="relative overflow-hidden bg-vabix-deep-teal pt-28 text-vabix-warm sm:pt-32">
        <HeroBackdrop />
        <Container className="relative pb-14 pt-8 sm:pb-16">
          <Breadcrumb light items={[{ name: "Trang chủ", href: paths.home }, { name: "Tri thức", href: paths.knowledge }, { name: "Case Study" }]} />
          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.22em] text-vabix-soft-gold">Case Study · Dự án tiêu biểu</p>
          <h1 className="mt-4 max-w-4xl text-balance text-[2.2rem] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[3.4rem]">
            Đồng hành thực chiến. <span className="text-vabix-gold">Kiến tạo giá trị thực tế.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
            Các chương trình tư vấn, đào tạo và chuyển đổi được triển khai trên bài toán thật của tổ chức — từ bối cảnh, giải pháp đến kết quả và bài học.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {orgs.map((o) => (
              <li key={o} className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-white/80">
                {o}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-vabix-warm py-14 sm:py-20">
        <Container>
          {lead ? (
            <RevealOnView>
              <Link
                href={`/tri-thuc/case-study/${lead.slug}`}
                className="bmdo-rv group grid overflow-hidden rounded-[28px] border border-vabix-deep-teal/10 bg-white shadow-[0_18px_44px_rgba(22,60,62,0.08)] transition-[box-shadow,border-color] duration-500 hover:border-vabix-gold/50 hover:shadow-[0_26px_56px_rgba(22,60,62,0.14)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-vabix-deep-teal lg:aspect-auto">
                  <Image src={lead.coverImage} alt={`${lead.organization} — ${lead.headline ?? lead.industry}`} fill unoptimized priority sizes="(max-width: 1023px) 100vw, 55vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute left-5 top-5 rounded-full bg-vabix-gold px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-vabix-deep-teal">Nổi bật</span>
                </div>
                <div className="flex flex-col p-6 sm:p-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-vabix-gold">{lead.organizationFull ?? lead.organization}</p>
                  <h2 className="mt-3 text-balance text-2xl font-semibold leading-snug text-vabix-deep-teal sm:text-[1.9rem]">{lead.headline ?? lead.industry}</h2>
                  <p className="mt-4 leading-relaxed text-vabix-muted">{lead.summary ?? lead.challenge}</p>
                  {lead.highlights?.length ? (
                    <ul className="mt-6 grid grid-cols-3 gap-2">
                      {lead.highlights.map((h) => (
                        <li key={h.label} className="rounded-xl bg-vabix-ivory px-3 py-3 text-center">
                          <p className="text-xl font-semibold text-vabix-gold">{h.value}</p>
                          <p className="mt-0.5 text-[11px] leading-snug text-vabix-muted">{h.label}</p>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 font-semibold text-vabix-deep-teal group-hover:text-vabix-gold">
                    Xem case study <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            </RevealOnView>
          ) : null}

          {rest.length ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((c) => (
                <CaseStudyCard key={c.id} item={c} />
              ))}
            </div>
          ) : null}
        </Container>
      </section>

      <section className="relative overflow-hidden bg-vabix-deep-teal py-16 text-vabix-warm sm:py-20">
        <HeroBackdrop />
        <Container className="relative text-center">
          <h2 className="mx-auto max-w-3xl text-balance text-[1.9rem] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[2.4rem]">
            Bài toán của doanh nghiệp bạn <span className="text-vabix-gold">có thể là case study tiếp theo.</span>
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={paths.contact}>Trao đổi cùng VABIX →</Button>
            <Button href={paths.training} variant="outline" className="border-white/40 text-white">
              Xem chương trình đào tạo
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
