import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Misc";
import { Container } from "@/components/ui/Section";
import { CTASection } from "@/components/sections/CTASection";
import { RevealOnView } from "@/components/templates/RevealOnView";
import * as aboutVi from "@/content/about";
import * as aboutEn from "@/content/en/about";
import * as brandVi from "@/content/brand";
import * as brandEn from "@/content/en/brand";
import { pillars as pillarsVi } from "@/content/pillars";
import { pillars as pillarsEn } from "@/content/en/pillars";
import { strategicPartners } from "@/content/strategicPartners";
import { featuredExperts } from "@/content/experts";
import { publishedFeaturedExperts } from "@/platform/cms/catalog";
import { getLocale } from "@/i18n/server";
import { ExpertCard } from "@/components/cards/Cards";
import { createMetadata } from "@/lib/seo";
import { paths } from "@/lib/paths";
import { siteConfig } from "@/lib/siteConfig";

export async function generateMetadata() {
  const en = (await getLocale()) === "en";
  return createMetadata({
    title: en ? "About VABIX" : "Về VABIX",
    description: (en ? brandEn : brandVi).positioning,
    path: en ? "/en/ve-vabix" : "/ve-vabix",
  });
}

function Arrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function SectionHead({ eyebrow, title, gold, body, light = false }: { eyebrow: string; title: string; gold?: string; body?: string; light?: boolean }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className={`mt-3 text-balance text-3xl font-semibold leading-tight sm:text-[2.6rem] ${light ? "text-white" : "text-vabix-deep-teal"}`}>
        {title} {gold ? <span className="text-vabix-gold">{gold}</span> : null}
      </h2>
      {body ? <p className={`mt-4 text-base leading-relaxed sm:text-lg ${light ? "text-white/75" : "text-vabix-muted"}`}>{body}</p> : null}
    </div>
  );
}

export default async function AboutPage() {
  const en = (await getLocale()) === "en";
  const { principles, journey } = en ? aboutEn : aboutVi;
  const {
    mission,
    missionDetail,
    missionChannels,
    aspiration2031,
    aspirationDetail,
    aspirationHighlight,
    commitment,
    coreValues,
    founderQuote,
    founderMessage,
    positioning,
    tagline,
    aboutIntro,
    glossary,
  } = en ? brandEn : brandVi;
  const pillars = en ? pillarsEn : pillarsVi;
  const experts = en ? publishedFeaturedExperts("en") : featuredExperts;
  const founderTitle = en ? "Founder of VABIX · Chairman and CEO" : siteConfig.founder.role;
  const [introLead, introBody, introMotto] = aboutIntro;
  const half = Math.ceil(strategicPartners.length / 2);

  const nav = [
    { id: "ve-vabix", label: en ? "Who we are" : "VABIX là ai" },
    { id: "su-menh", label: en ? "Mission" : "Sứ mệnh" },
    { id: "gia-tri", label: en ? "Core values" : "Giá trị" },
    { id: "ba-mui-nhon", label: "3T" },
    { id: "nha-sang-lap", label: en ? "Founder" : "Nhà sáng lập" },
    { id: "hanh-trinh", label: en ? "Journey" : "Hành trình" },
    { id: "van-hoa", label: en ? "Six golden words" : "Sáu chữ vàng" },
    { id: "chuyen-gia", label: en ? "Experts" : "Chuyên gia" },
    { id: "doi-tac", label: en ? "Partners" : "Đối tác" },
  ];

  const stats = [
    { value: "3T", label: en ? "Three spearheads" : "Ba mũi nhọn" },
    { value: `${experts.length}+`, label: en ? "Experts in the network" : "Chuyên gia đồng hành" },
    { value: `${strategicPartners.length}+`, label: en ? "Partners & clients" : "Đối tác & khách hàng" },
    { value: "2031", label: en ? "Aspiration horizon" : "Khát vọng" },
  ];

  return (
    <>
      {/* 1 · Hero */}
      <section className="relative overflow-hidden bg-vabix-deep-teal pt-28 text-white sm:pt-32">
        <div aria-hidden="true" className="bmdo-hero-bg pointer-events-none absolute inset-0 overflow-hidden">
          <span className="bmdo-hero-blob bmdo-hero-blob-a" />
          <span className="bmdo-hero-blob bmdo-hero-blob-b" />
          <span className="bmdo-hero-blob bmdo-hero-blob-c" />
          <span className="bmdo-hero-grid" />
        </div>
        <Container className="relative grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div>
            <Breadcrumb light items={[{ name: en ? "Home" : "Trang chủ", href: "/" }, { name: en ? "About VABIX" : "Về VABIX" }]} />
            <p className="mt-7 inline-flex rounded-full border border-vabix-gold/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-vabix-gold">{tagline}</p>
            <h1 className="mt-5 text-balance text-[2.1rem] font-semibold leading-[1.12] sm:text-5xl lg:text-[3.4rem]">
              {en ? "An ecosystem of practical knowledge" : "Hệ sinh thái tri thức thực chiến"}{" "}
              <span className="text-vabix-gold">{en ? "and business development" : "và phát triển doanh nghiệp"}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">{positioning}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#ba-mui-nhon" className="inline-flex min-h-11 items-center gap-2 bg-vabix-gold px-5 text-sm font-semibold text-vabix-deep-teal transition-colors hover:bg-vabix-soft-gold">
                {en ? "Explore the 3T spearheads" : "Khám phá ba mũi nhọn 3T"} <Arrow />
              </Link>
              <Link href={paths.founderMessage} className="inline-flex min-h-11 items-center gap-2 border border-white/30 px-5 text-sm font-semibold text-white transition-colors hover:border-vabix-gold hover:text-vabix-gold">
                {en ? "A message from the founder" : "Thông điệp nhà sáng lập"}
              </Link>
            </div>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-[22rem] sm:max-w-[26rem]">
            <span aria-hidden="true" className="absolute inset-0 rounded-full border border-vabix-gold/25" />
            <span aria-hidden="true" className="about-orbit absolute inset-6 rounded-full border border-dashed border-white/15" />
            <span aria-hidden="true" className="absolute inset-14 rounded-full bg-[radial-gradient(circle,rgba(222,164,67,0.28),transparent_70%)]" />
            <Image src="/brand/hero-dual-core.png" alt={en ? "VABIX Dual Core emblem" : "Biểu tượng VABIX Dual Core"} width={640} height={640} unoptimized priority className="relative z-10 h-full w-full object-contain p-12 drop-shadow-[0_24px_50px_rgba(0,0,0,0.45)]" />
            <span className="absolute left-0 top-10 z-20 rounded-full border border-white/15 bg-vabix-deep-teal/90 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">{en ? "Knowledge connection" : "Kết nối tri thức"}</span>
            <span className="absolute bottom-12 right-0 z-20 rounded-full border border-vabix-gold/40 bg-vabix-deep-teal/90 px-3 py-1.5 text-xs font-semibold text-vabix-gold shadow-lg">{en ? "Business connection" : "Kết nối kinh doanh"}</span>
          </div>
        </Container>
        <Container className="relative pb-12 sm:pb-16">
          <ul className="grid grid-cols-2 overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.04] backdrop-blur lg:grid-cols-4">
            {stats.map((s, i) => (
              <li key={s.label} className={`px-5 py-5 text-center sm:py-6 ${i % 2 ? "border-l border-white/10" : ""} ${i > 1 ? "border-t border-white/10 lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}>
                <p className="text-2xl font-semibold text-vabix-gold sm:text-3xl">{s.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-white/65">{s.label}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Mục lục trang */}
      <nav aria-label={en ? "On this page" : "Trong trang này"} className="sticky top-[72px] z-30 border-b border-vabix-deep-teal/10 bg-vabix-warm/95 backdrop-blur">
        <Container>
          <ul className="flex snap-x gap-1 overflow-x-auto py-3 text-sm [scrollbar-width:none] lg:justify-center [&::-webkit-scrollbar]:hidden">
            {nav.map((n) => (
              <li key={n.id} className="snap-start">
                <a href={`#${n.id}`} className="block whitespace-nowrap rounded-full px-3.5 py-1.5 font-semibold text-vabix-deep-teal transition-colors hover:bg-vabix-deep-teal hover:text-white">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      {/* 2 · VABIX là ai */}
      <section id="ve-vabix" className="scroll-mt-32 py-16 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <RevealOnView>
            <p className="eyebrow bmdo-rv">{en ? "Who is VABIX?" : "VABIX là ai?"}</p>
            <h2 className="bmdo-rv mt-3 text-balance text-3xl font-semibold leading-tight text-vabix-deep-teal sm:text-[2.6rem]" style={{ ["--rv-i" as string]: 1 }}>
              {en ? "Knowledge turned into action," : "Tri thức thành hành động,"} <span className="text-vabix-gold">{en ? "partnerships built on trust." : "hợp tác bằng niềm tin."}</span>
            </h2>
            <p className="bmdo-rv mt-5 text-lg leading-relaxed text-vabix-ink" style={{ ["--rv-i" as string]: 2 }}>
              {introLead}
            </p>
            <p className="bmdo-rv mt-4 leading-relaxed text-vabix-muted" style={{ ["--rv-i" as string]: 3 }}>
              {introBody}
            </p>
            {introMotto ? (
              <p className="bmdo-rv mt-6 border-l-4 border-vabix-gold pl-4 text-lg font-semibold text-vabix-deep-teal" style={{ ["--rv-i" as string]: 4 }}>
                {introMotto}
              </p>
            ) : null}
          </RevealOnView>
          <div className="grid grid-cols-5 grid-rows-[auto_auto] gap-3">
            <Image src="/images/about/dao-tao-thuc-chien.jpg" alt={en ? "A VABIX hands-on training session" : "Buổi đào tạo thực chiến của VABIX"} width={900} height={600} unoptimized className="col-span-5 aspect-[16/10] w-full rounded-[24px] object-cover shadow-[0_24px_50px_rgba(22,60,62,0.18)]" />
            <Image src="/images/about/vnpt-session.jpg" alt={en ? "VABIX working with VNPT" : "VABIX đồng hành cùng VNPT"} width={600} height={400} unoptimized className="col-span-3 aspect-[4/3] w-full rounded-[20px] object-cover" />
            <Image src="/images/bmdo/lop/bmdo-lop-03.jpg" alt={en ? "A BMDO class at SIHUB" : "Lớp BMDO tại SIHUB"} width={400} height={400} unoptimized className="col-span-2 aspect-[3/4] h-full w-full rounded-[20px] object-cover" />
          </div>
        </Container>
      </section>

      {/* 3 · Sứ mệnh & khát vọng */}
      <section id="su-menh" className="scroll-mt-32 bg-vabix-ivory py-16 sm:py-24">
        <Container>
          <SectionHead eyebrow={en ? "Mission & aspiration" : "Sứ mệnh & khát vọng"} title={en ? "Why VABIX exists" : "VABIX tồn tại"} gold={en ? "and where we are heading" : "để làm gì, hướng đến đâu"} />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <article className="flex flex-col rounded-[28px] border border-vabix-deep-teal/10 bg-white p-7 sm:p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-vabix-gold">{en ? "Mission" : "Sứ mệnh"}</p>
              <p className="mt-4 text-xl font-semibold leading-snug text-vabix-deep-teal sm:text-2xl">{mission}</p>
              <p className="mt-4 leading-relaxed text-vabix-muted">{missionDetail}</p>
              <ul className="mt-auto grid gap-2 pt-7">
                {missionChannels.map((c, i) => {
                  const [name, desc] = c.split(" — ");
                  return (
                    <li key={c} className="flex items-center gap-3 rounded-2xl bg-vabix-ivory px-4 py-3 text-sm">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-vabix-deep-teal text-xs font-semibold text-vabix-gold">0{i + 1}</span>
                      <span>
                        <strong className="text-vabix-deep-teal">{name}</strong>
                        {desc ? <span className="text-vabix-muted"> — {desc.replace(/\.$/, "")}</span> : null}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </article>
            <article id="khat-vong" className="relative flex flex-col overflow-hidden rounded-[28px] bg-vabix-deep-teal p-7 text-white sm:p-10">
              <span aria-hidden="true" className="pointer-events-none absolute -right-10 -top-12 text-[11rem] font-bold leading-none text-white/[0.05]">2031</span>
              <p className="relative text-[11px] font-semibold uppercase tracking-[0.2em] text-vabix-gold">{en ? "Aspiration 2031" : "Khát vọng 2031"}</p>
              <p className="relative mt-4 text-xl font-semibold leading-snug sm:text-2xl">{aspiration2031}</p>
              <p className="relative mt-4 leading-relaxed text-white/75">{aspirationDetail}</p>
              <p className="relative mt-auto pt-7 text-lg font-semibold italic text-vabix-gold">“{aspirationHighlight}”</p>
              <p className="relative mt-2 text-xs text-white/50">{en ? "A direction for the future, not an achievement yet." : "Định hướng tương lai, chưa phải thành tích đã đạt."}</p>
            </article>
          </div>

          <div id="cam-ket" className="scroll-mt-32 mt-16">
            <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-vabix-gold">{en ? "Our commitment" : "Cam kết của VABIX"}</p>
            <RevealOnView className="mt-6 grid gap-4 md:grid-cols-3">
              {commitment.map((c, i) => (
                <div key={c} className="bmdo-rv rounded-[22px] border border-vabix-gold/30 bg-white p-6" style={{ ["--rv-i" as string]: i }}>
                  <span className="block h-1 w-10 rounded-full bg-vabix-gold" />
                  <p className="mt-4 leading-relaxed text-vabix-ink">{c}</p>
                </div>
              ))}
            </RevealOnView>
          </div>
        </Container>
      </section>

      {/* 4 · Giá trị cốt lõi */}
      <section id="gia-tri" className="scroll-mt-32 py-16 sm:py-24">
        <Container>
          <SectionHead eyebrow={en ? "Five core values" : "Năm giá trị cốt lõi"} title={en ? "Our" : "Kim chỉ nam"} gold={en ? "guiding principles" : "hiện hành"} />
          <RevealOnView className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {coreValues.map((v, i) => (
              <article key={v.title} className="bmdo-rv group relative overflow-hidden rounded-[24px] border border-vabix-deep-teal/10 bg-white p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-vabix-gold/60 hover:shadow-[0_18px_40px_rgba(22,60,62,0.1)]" style={{ ["--rv-i" as string]: i }}>
                <span aria-hidden="true" className="absolute -right-2 -top-4 text-7xl font-bold leading-none text-vabix-deep-teal/[0.05]">{String(i + 1).padStart(2, "0")}</span>
                <p className="relative text-sm font-semibold text-vabix-gold">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="relative mt-3 text-lg font-semibold leading-snug text-vabix-deep-teal">{v.title}</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-vabix-muted">{v.body}</p>
              </article>
            ))}
          </RevealOnView>
        </Container>
      </section>

      {/* 5 · Ba mũi nhọn 3T */}
      <section id="ba-mui-nhon" className="scroll-mt-32 relative overflow-hidden bg-vabix-deep-teal py-16 text-white sm:py-24">
        <span aria-hidden="true" className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full border border-vabix-gold/15" />
        <Container className="relative">
          <SectionHead
            light
            eyebrow={en ? "The three 3T spearheads" : "Ba mũi nhọn 3T"}
            title={en ? "One ecosystem," : "Một hệ sinh thái,"}
            gold={en ? "three ways to work with you" : "ba cách đồng hành"}
            body={
              en
                ? "“Knowledge connection” and “business connection” are the brand philosophy. The service structure is Training & Coaching, Transformation and Trustworking."
                : "“Kết nối tri thức” và “kết nối kinh doanh” là triết lý thương hiệu. Cấu trúc dịch vụ gồm Training & Coaching, Transformation và Trustworking."
            }
          />
          <RevealOnView className="mt-12 grid gap-5 md:grid-cols-3">
            {pillars.map((p, i) => (
              <Link key={p.id} href={p.href} className="bmdo-rv group flex flex-col rounded-[26px] border border-white/10 bg-white/[0.04] p-7 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-1 hover:border-vabix-gold/60 hover:bg-white/[0.07]" style={{ ["--rv-i" as string]: i }}>
                <span className="grid h-12 w-12 place-items-center rounded-full border border-vabix-gold/60 text-sm font-semibold text-vabix-gold">0{i + 1}</span>
                <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-vabix-gold">{p.en}</p>
                <h3 className="mt-2 text-2xl font-semibold">{p.vi}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{p.summary}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-vabix-gold">
                  {p.cta.label} <Arrow className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </RevealOnView>
        </Container>
      </section>

      {/* 6 · Nhà sáng lập */}
      <section id="nha-sang-lap" className="scroll-mt-32 py-16 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div className="relative mx-auto w-[calc(100%-0.75rem)] max-w-sm">
            <span aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rounded-[30px] border-2 border-vabix-gold/50" />
            <div className="relative aspect-[3/4] overflow-hidden rounded-[28px] bg-vabix-deep-teal">
              <Image src="/images/portraits/nguyen-chi-thanh.jpg" alt={en ? "Nguyễn Chí Thành, founder of VABIX" : "Nguyễn Chí Thành, nhà sáng lập VABIX"} fill unoptimized className="object-cover object-top" sizes="(min-width: 1024px) 24rem, 90vw" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-vabix-deep-teal via-vabix-deep-teal/70 to-transparent p-5 pt-16 text-center text-white">
                <p className="text-lg font-semibold tracking-[0.12em]">{siteConfig.founder.name.toUpperCase()}</p>
                <p className="mt-1 text-xs text-white/75">{founderTitle}</p>
              </div>
            </div>
          </div>
          <div>
            <p className="eyebrow">{en ? "A message from the founder" : "Thông điệp nhà sáng lập"}</p>
            <blockquote className="mt-4 text-balance text-2xl font-semibold leading-snug text-vabix-deep-teal sm:text-[1.9rem]">
              <span className="text-vabix-gold">“</span>
              {founderQuote}
              <span className="text-vabix-gold">”</span>
            </blockquote>
            <div className="mt-6 space-y-4">
              {founderMessage.map((p) => (
                <p key={p} className="leading-relaxed text-vabix-muted">
                  {p}
                </p>
              ))}
            </div>
            <Link href={paths.founderMessage} className="mt-7 inline-flex items-center gap-2 border-b-2 border-vabix-gold pb-1 text-sm font-semibold uppercase tracking-[0.14em] text-vabix-deep-teal hover:text-vabix-gold">
              {en ? "Read the full message" : "Đọc toàn bộ thông điệp"} <Arrow className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Container>
      </section>

      {/* 7 · Hành trình */}
      <section id="hanh-trinh" className="scroll-mt-32 bg-vabix-ivory py-16 sm:py-24">
        <Container>
          <SectionHead eyebrow={en ? "Our journey" : "Hành trình"} title={en ? "From practice" : "Từ thực chiến"} gold={en ? "to an ecosystem" : "đến hệ sinh thái"} />
          <RevealOnView className="relative mt-14">
            <span aria-hidden="true" className="absolute left-0 right-0 top-[1.15rem] hidden h-px bg-gradient-to-r from-vabix-gold/10 via-vabix-gold/60 to-vabix-gold/10 lg:block" />
            <ol className="grid gap-6 lg:grid-cols-4">
              {journey.map((j, i) => (
                <li key={j.year} className="bmdo-rv relative" style={{ ["--rv-i" as string]: i }}>
                  <span className={`relative z-10 mx-auto grid h-9 w-9 place-items-center rounded-full border-2 text-xs font-bold lg:mx-0 ${i === journey.length - 1 ? "border-vabix-gold bg-vabix-gold text-vabix-deep-teal" : "border-vabix-gold bg-vabix-deep-teal text-vabix-gold"}`}>
                    {i + 1}
                  </span>
                  <div className="mt-5 rounded-[22px] border border-vabix-deep-teal/10 bg-white p-6">
                    <p className="text-sm font-semibold text-vabix-gold">{j.year}</p>
                    <h3 className="mt-2 text-lg font-semibold text-vabix-deep-teal">{j.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-vabix-muted">{j.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </RevealOnView>
        </Container>
      </section>

      {/* 8 · Sáu chữ vàng */}
      <section id="van-hoa" className="scroll-mt-32 relative overflow-hidden bg-vabix-deep-teal py-16 text-white sm:py-24">
        <div aria-hidden="true" className="bmdo-hero-bg pointer-events-none absolute inset-0 overflow-hidden opacity-60">
          <span className="bmdo-hero-blob bmdo-hero-blob-b" />
          <span className="bmdo-hero-grid" />
        </div>
        <Container className="relative">
          <SectionHead
            light
            eyebrow={en ? "Cultural heritage" : "Di sản văn hóa"}
            title={en ? "The Six" : "Sáu"}
            gold={en ? "Golden Words" : "chữ vàng"}
            body={en ? "The cultural hallmark of the VABIX Village: how residents, experts and suppliers work together every day." : "Dấu ấn văn hóa của Làng VABIX: cách cư dân, chuyên gia và nhà cung cấp cùng làm việc mỗi ngày."}
          />
          <RevealOnView className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => (
              <article key={p.key} className="bmdo-rv rounded-[24px] border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-vabix-gold/50" style={{ ["--rv-i" as string]: i }}>
                <p className="text-3xl font-semibold tracking-[0.08em] text-vabix-gold">{p.key}</p>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-white/75">
                  {p.items.map((it) => (
                    <li key={it.title}>
                      <span className="font-semibold text-white">{it.title}.</span> {it.body}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </RevealOnView>
        </Container>
      </section>

      {/* 9 · Chuyên gia */}
      <section id="chuyen-gia" className="scroll-mt-32 py-16 sm:py-24">
        <Container>
          <SectionHead
            eyebrow={en ? "Expert network" : "Mạng lưới chuyên gia"}
            title={en ? "The people" : "Những người"}
            gold={en ? "who work alongside businesses" : "đồng hành cùng doanh nghiệp"}
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {experts.map((e) => (
              <ExpertCard key={e.id} expert={e} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/mang-luoi/chuyen-gia" className="inline-flex items-center gap-2 text-sm font-semibold text-vabix-deep-teal hover:text-vabix-gold">
              {en ? "See the full expert network" : "Xem toàn bộ mạng lưới chuyên gia"} <Arrow className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Container>
      </section>

      {/* 10 · Đối tác */}
      <section id="doi-tac" className="scroll-mt-32 bg-vabix-ivory py-16 sm:py-24">
        <Container>
          <SectionHead
            eyebrow={en ? "Partners & clients" : "Đối tác & khách hàng"}
            title={en ? "Trusted by" : "Đồng hành cùng"}
            gold={en ? "organisations and businesses" : "các tổ chức và doanh nghiệp"}
            body={
              en
                ? "Agencies, universities and businesses that have worked with VABIX across training, consulting and business connection."
                : "Các cơ quan, trường đại học và doanh nghiệp đã đồng hành cùng VABIX trong đào tạo, tư vấn và kết nối kinh doanh."
            }
          />
        </Container>
        <div className="vabix-partners-rows mt-12">
          {[strategicPartners.slice(0, half), strategicPartners.slice(half)].map((row, r) => (
            <div key={r} className="bmdo-marquee vabix-partners-marquee">
              <ul className="bmdo-marquee-track" data-reverse={r ? "" : undefined} style={{ ["--bmdo-marquee-duration" as string]: `${row.length * 4.5}s` }}>
                {[...row, ...row].map((p, i) => (
                  <li key={`${p.slug}-${i}`} className="vabix-partner-card" aria-hidden={i >= row.length || undefined}>
                    <Image src={`/images/partners/${p.slug}.webp`} alt={i >= row.length ? "" : p.name} width={180} height={100} unoptimized className="vabix-partner-logo" />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 11 · Thuật ngữ & hồ sơ năng lực */}
      <section id="thuat-ngu" className="scroll-mt-32 py-16 sm:py-24">
        <Container>
          <SectionHead eyebrow={en ? "Glossary" : "Thuật ngữ"} title={en ? "The VABIX" : "Ngôn ngữ"} gold={en ? "vocabulary" : "chung của VABIX"} />
          <dl className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {glossary.map((g) => (
              <div key={g.term} className="rounded-[22px] border border-vabix-deep-teal/10 bg-white p-5">
                <dt className="text-lg font-semibold text-vabix-deep-teal">{g.term}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-vabix-muted">{g.meaning}</dd>
              </div>
            ))}
          </dl>

          <div id="ho-so" className="scroll-mt-32 mt-14 flex flex-col items-center justify-between gap-6 rounded-[28px] bg-vabix-deep-teal p-8 text-center text-white sm:p-10 lg:flex-row lg:text-left">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-vabix-gold">{en ? "Capability profile" : "Hồ sơ năng lực"}</p>
              <p className="mt-2 text-2xl font-semibold">{en ? "VABIX capability profile, 2026 edition" : "Hồ sơ năng lực VABIX — ấn bản 2026"}</p>
              <p className="mt-2 text-white/70">{en ? "Contact us to receive the official document." : "Liên hệ để nhận tài liệu chính thức."}</p>
            </div>
            <Link href="/ket-noi#tu-van" className="inline-flex min-h-11 shrink-0 items-center gap-2 bg-vabix-gold px-6 text-sm font-semibold text-vabix-deep-teal hover:bg-vabix-soft-gold">
              {en ? "Request the profile" : "Liên hệ nhận hồ sơ"} <Arrow />
            </Link>
          </div>
        </Container>
      </section>

      <CTASection
        title={en ? "Working with you from real problems." : "Đồng hành từ bài toán thực tế."}
        description={
          en
            ? "The three 3T spearheads are designed to turn knowledge into capability, design into transformation and connection into shared value."
            : "Ba mũi nhọn 3T được thiết kế để chuyển tri thức thành năng lực, thiết kế thành chuyển đổi, kết nối thành giá trị cùng phát triển."
        }
      />
    </>
  );
}
