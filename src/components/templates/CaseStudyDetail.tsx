import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/content/types";
import { publishedCaseStudies, publishedExperts, publishedMethodologies } from "@/platform/cms/catalog";
import { Breadcrumb } from "@/components/ui/Misc";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { CaseStudyCard } from "@/components/cards/Cards";
import { HeroBackdrop } from "@/components/templates/BmdoLanding";
import { Lightbox } from "@/components/templates/Lightbox";
import { RevealOnView } from "@/components/templates/RevealOnView";
import { paths } from "@/lib/paths";

const SECTIONS = [
  { id: "boi-canh", label: "Bối cảnh" },
  { id: "bai-toan", label: "Bài toán" },
  { id: "giai-phap", label: "Giải pháp" },
  { id: "trien-khai", label: "Quá trình triển khai" },
  { id: "ket-qua", label: "Kết quả" },
  { id: "bai-hoc", label: "Bài học" },
] as const;

// Ảnh có bản -lg (1600px) thì Lightbox mở bản lớn, không thì dùng chính ảnh đó.
function zoomAttrs(index: number, src: string, alt: string) {
  return {
    "data-zoom-group": "case-study",
    "data-zoom-index": index,
    "data-zoom-src": src.startsWith("/images/case-studies/") ? src.replace(/\.jpg$/, "-lg.jpg") : src,
    "data-zoom-fallback": src,
    "data-zoom-alt": alt,
    tabIndex: 0,
    role: "button",
    "aria-label": `Xem lớn: ${alt}`,
  };
}

function SectionTitle({ n, id, children }: { n: number; id: string; children: string }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="text-sm font-semibold tracking-[0.2em] text-vabix-gold">{String(n).padStart(2, "0")}</span>
      <h2 id={id} className="scroll-mt-28 text-2xl font-semibold tracking-[-0.01em] text-vabix-deep-teal sm:text-[1.9rem]">
        {children}
      </h2>
    </div>
  );
}

export function CaseStudyDetail({ c }: { c: CaseStudy }) {
  const methods = publishedMethodologies().filter((m) => c.methodologies.includes(m.slug));
  const experts = publishedExperts().filter((e) => c.relatedExperts?.includes(e.slug));
  const others = publishedCaseStudies().filter((x) => x.slug !== c.slug).slice(0, 3);
  const gallery = c.gallery.filter((g, i, a) => a.indexOf(g) === i && (a.length > 1 || g !== c.coverImage));
  const title = c.headline ?? c.industry;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-vabix-deep-teal pt-28 text-vabix-warm sm:pt-32">
        <HeroBackdrop />
        <Container className="relative grid gap-10 pb-16 pt-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center lg:gap-14 lg:pb-20">
          <div>
            <Breadcrumb
              light
              items={[
                { name: "Trang chủ", href: paths.home },
                { name: "Case Study", href: "/tri-thuc/case-study" },
                { name: c.organization },
              ]}
            />
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-vabix-gold/45 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-vabix-soft-gold">
                <span className="h-1.5 w-1.5 rounded-full bg-vabix-gold" aria-hidden="true" />
                {c.organizationFull ?? c.organization}
              </span>
              {c.year ? <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-[0.14em] text-white/80">{c.year}</span> : null}
            </div>
            {c.headline ? <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-vabix-gold">{c.industry}</p> : null}
            <h1 className="mt-4 text-balance text-[2rem] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[2.75rem]">{title}</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">{c.summary ?? c.challenge}</p>
            {methods.length ? (
              <ul className="mt-6 flex flex-wrap gap-2">
                {methods.map((m) => (
                  <li key={m.slug}>
                    <Link href={paths.method(m.slug)} className="inline-block rounded-full border border-white/20 px-3 py-1 text-xs font-semibold tracking-wide text-white/85 transition-colors hover:border-vabix-gold hover:text-vabix-gold">
                      {m.shortName ?? m.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <figure className="cs-cover relative">
            <span aria-hidden="true" className="bmdo-tvc-corner bmdo-tvc-corner-tl" />
            <span aria-hidden="true" className="bmdo-tvc-corner bmdo-tvc-corner-br" />
            <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] border border-vabix-gold/40 shadow-[0_30px_70px_rgba(0,0,0,0.4)]">
              <span {...zoomAttrs(0, c.coverImage, `${c.organization} — ${title}`)} className="bmdo-zoomable">
                <Image src={c.coverImage} alt={`${c.organization} — ${title}`} fill unoptimized priority sizes="(max-width: 1023px) 100vw, 45vw" className="bmdo-grad-img object-cover" />
              </span>
            </div>
          </figure>
        </Container>
        {c.highlights?.length ? (
          <Container className="relative pb-14">
            <ul className="grid grid-cols-3 gap-2 sm:gap-3">
              {c.highlights.map((h, i) => (
                <li
                  key={h.label}
                  className="bmdo-stat flex min-h-[5.5rem] flex-col items-center justify-center rounded-2xl border border-vabix-gold/20 bg-vabix-deep-teal/85 px-2 py-3 text-center backdrop-blur"
                  style={{ ["--bmdo-stat-i" as string]: i }}
                >
                  <p className="text-2xl font-semibold text-vabix-gold sm:text-3xl">{h.value}</p>
                  <p className="mt-1 text-balance text-[12px] leading-snug text-white/70 sm:text-sm">{h.label}</p>
                </li>
              ))}
            </ul>
          </Container>
        ) : null}
      </section>

      {/* Nội dung */}
      <section className="bg-vabix-warm py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="Mục lục case study" className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-vabix-gold">Nội dung</p>
              <ol className="mt-4 space-y-1 border-l border-vabix-deep-teal/10">
                {SECTIONS.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="-ml-px flex gap-3 border-l-2 border-transparent py-1.5 pl-4 text-sm text-vabix-muted transition-colors hover:border-vabix-gold hover:text-vabix-deep-teal">
                      <span className="text-vabix-gold/80">{String(i + 1).padStart(2, "0")}</span>
                      {s.label}
                    </a>
                  </li>
                ))}
                {gallery.length ? (
                  <li>
                    <a href="#hinh-anh" className="-ml-px flex gap-3 border-l-2 border-transparent py-1.5 pl-4 text-sm text-vabix-muted transition-colors hover:border-vabix-gold hover:text-vabix-deep-teal">
                      <span className="text-vabix-gold/80">07</span>
                      Hình ảnh
                    </a>
                  </li>
                ) : null}
              </ol>
              <Button href={paths.contact} variant="teal" className="mt-8 w-full">
                Trao đổi cùng VABIX
              </Button>
            </div>
          </nav>

          <RevealOnView className="min-w-0 space-y-16">
            <div className="grid gap-5 md:grid-cols-2">
              <article className="bmdo-rv rounded-[22px] border border-vabix-deep-teal/10 bg-white p-6 shadow-[0_10px_30px_rgba(22,60,62,0.05)] sm:p-8">
                <SectionTitle n={1} id="boi-canh">Bối cảnh</SectionTitle>
                <p className="mt-4 leading-relaxed text-vabix-ink">{c.context}</p>
              </article>
              <article className="bmdo-rv rounded-[22px] border border-vabix-gold/30 bg-vabix-ivory p-6 sm:p-8" style={{ ["--rv-i" as string]: 1 }}>
                <SectionTitle n={2} id="bai-toan">Bài toán</SectionTitle>
                <p className="mt-4 leading-relaxed text-vabix-ink">{c.challenge}</p>
              </article>
            </div>

            <div className="bmdo-rv" style={{ ["--rv-i" as string]: 2 }}>
              <SectionTitle n={3} id="giai-phap">Giải pháp</SectionTitle>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-vabix-ink">{c.solution}</p>
              {c.solutionItems?.length ? (
                <ol className="mt-6 grid gap-3 sm:grid-cols-2">
                  {c.solutionItems.map((item, i) => (
                    <li key={item} className="flex items-start gap-4 rounded-[18px] border border-vabix-deep-teal/10 bg-white p-5 transition-colors hover:border-vabix-gold/50">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-vabix-deep-teal text-sm font-semibold text-vabix-gold">{String(i + 1).padStart(2, "0")}</span>
                      <span className="pt-2 font-medium leading-snug text-vabix-deep-teal">{item.replace(/\.$/, "")}</span>
                    </li>
                  ))}
                </ol>
              ) : null}
              {c.solutionNote ? <p className="mt-5 max-w-3xl leading-relaxed text-vabix-muted">{c.solutionNote}</p> : null}
            </div>

            <div className="bmdo-rv grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-start" style={{ ["--rv-i" as string]: 3 }}>
              <div>
                <SectionTitle n={4} id="trien-khai">Quá trình triển khai</SectionTitle>
                <p className="mt-4 border-l-2 border-vabix-gold/60 pl-5 leading-relaxed text-vabix-ink">{c.implementation}</p>
              </div>
              <article className="relative overflow-hidden rounded-[22px] bg-vabix-deep-teal p-6 text-vabix-warm sm:p-8">
                <span aria-hidden="true" className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[radial-gradient(closest-side,rgba(222,164,67,0.35),transparent)]" />
                <div className="relative flex items-baseline gap-4">
                  <span className="text-sm font-semibold tracking-[0.2em] text-vabix-gold">05</span>
                  <h2 id="ket-qua" className="scroll-mt-28 text-2xl font-semibold sm:text-[1.9rem]">
                    Kết quả
                  </h2>
                </div>
                <p className="relative mt-4 leading-relaxed text-white/85">{c.results}</p>
              </article>
            </div>

            <figure className="bmdo-rv relative rounded-[24px] border border-vabix-gold/35 bg-vabix-ivory px-6 py-10 sm:px-12" style={{ ["--rv-i" as string]: 4 }}>
              <span aria-hidden="true" className="absolute left-6 top-2 font-serif text-7xl leading-none text-vabix-gold/40 sm:left-10">
                “
              </span>
              <div className="flex items-baseline gap-4">
                <span className="text-sm font-semibold tracking-[0.2em] text-vabix-gold">06</span>
                <h2 id="bai-hoc" className="scroll-mt-28 text-sm font-semibold uppercase tracking-[0.2em] text-vabix-deep-teal">
                  Bài học
                </h2>
              </div>
              <blockquote className="mt-4 text-balance text-xl font-medium leading-relaxed text-vabix-deep-teal sm:text-2xl">{c.lesson}</blockquote>
            </figure>

            {c.quote ? (
              <blockquote className="border-l-2 border-vabix-gold pl-5 text-lg text-vabix-deep-teal">
                “{c.quote.text}”
                <footer className="mt-2 text-sm text-vabix-muted">
                  {c.quote.author} · {c.quote.role}
                </footer>
              </blockquote>
            ) : null}

            {experts.length ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-vabix-gold">Chuyên gia đồng hành</p>
                <ul className="mt-4 flex flex-wrap gap-3">
                  {experts.map((e) => (
                    <li key={e.slug}>
                      <Link href={`/mang-luoi/chuyen-gia/${e.slug}`} className="flex items-center gap-3 rounded-full border border-vabix-deep-teal/10 bg-white py-1.5 pl-1.5 pr-4 transition-colors hover:border-vabix-gold/60">
                        {e.portrait ? (
                          <Image src={e.portrait} alt="" width={40} height={40} unoptimized className="h-10 w-10 rounded-full object-cover" />
                        ) : null}
                        <span className="text-sm font-semibold text-vabix-deep-teal">{e.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </RevealOnView>
        </Container>
      </section>

      {/* Hình ảnh */}
      {gallery.length ? (
        <section className="bg-vabix-ivory py-16 sm:py-20" aria-labelledby="hinh-anh">
          <Container>
            <p className="eyebrow">Hình ảnh triển khai</p>
            <h2 id="hinh-anh" className="mt-3 scroll-mt-28 text-[1.9rem] font-semibold tracking-[-0.02em] text-vabix-deep-teal sm:text-[2.4rem]">
              Khoảnh khắc <span className="text-vabix-gold">tại chương trình.</span>
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
              {gallery.map((src, i) => {
                const alt = c.galleryAlts?.[c.gallery.indexOf(src)] ?? `${c.organization} — hình ảnh ${i + 1}`;
                return (
                <figure key={src} className={`bmdo-grad-tile ${i === 0 ? "col-span-2 aspect-[4/3] lg:row-span-2 lg:aspect-auto" : "aspect-[4/3]"}`}>
                  <span {...zoomAttrs(1 + i, src, alt)} className="bmdo-zoomable">
                    <Image src={src} alt={alt} fill unoptimized sizes="(max-width: 1023px) 50vw, 33vw" className="object-cover transition-transform duration-700 hover:scale-105" />
                  </span>
                </figure>
                );
              })}
            </div>
          </Container>
        </section>
      ) : null}

      {/* Case study khác */}
      {others.length ? (
        <section className="bg-vabix-warm py-16 sm:py-20">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Case study khác</p>
                <h2 className="mt-3 text-[1.9rem] font-semibold tracking-[-0.02em] text-vabix-deep-teal sm:text-[2.2rem]">Những hành trình đồng hành khác</h2>
              </div>
              <Link href="/tri-thuc/case-study" className="text-sm font-semibold text-vabix-deep-teal hover:text-vabix-gold">
                Xem tất cả case study →
              </Link>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {others.map((x) => (
                <CaseStudyCard key={x.id} item={x} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* CTA */}
      <section className="relative overflow-hidden bg-vabix-deep-teal py-16 text-vabix-warm sm:py-20">
        <HeroBackdrop />
        <Container className="relative text-center">
          <p className="eyebrow">Đồng hành cùng VABIX</p>
          <h2 className="mx-auto mt-3 max-w-3xl text-balance text-[1.9rem] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[2.4rem]">
            Muốn một chương trình được thiết kế <span className="text-vabix-gold">theo bài toán của bạn?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/75">VABIX không sao chép giáo trình. Chúng tôi khảo sát hiện trạng và thiết kế theo bối cảnh tổ chức.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={paths.contact}>Trao đổi cùng VABIX →</Button>
            <Button href={paths.training} variant="outline" className="border-white/40 text-white">
              Xem chương trình đào tạo
            </Button>
          </div>
        </Container>
      </section>

      <Lightbox />
    </>
  );
}
