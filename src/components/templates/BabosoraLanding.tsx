import Image from "next/image";
import Link from "next/link";
import { babosora as babosoraVi } from "@/content/babosora";
import { babosora as babosoraEn, type Widen } from "@/content/en/babosora";
import { bmdoK4 as bmdoK4Vi } from "@/content/bmdoK4";
import { bmdoK4 as bmdoK4En } from "@/content/en/bmdoK4";
import { LeadForm } from "@/components/forms/LeadForm";
import { BmdoTvc } from "@/components/templates/BmdoTvc";
import { Breadcrumb } from "@/components/ui/Misc";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { HeroBackdrop, Heading } from "@/components/templates/BmdoLanding";
import { RevealOnView } from "@/components/templates/RevealOnView";
import { siteConfig } from "@/lib/siteConfig";
import { paths } from "@/lib/paths";
import { getLocale } from "@/i18n/server";

const hotline = siteConfig.contact.hotline;
const hotlineHref = siteConfig.contact.hotlineHref;

// Phễu dòng chảy doanh thu: B2A → BA → BO → SO là phễu, RA gia tốc và quay vòng về địa bàn.
const BAND_H = 62;
const BAND_GAP = 10;
const BAND_W = [380, 320, 260, 200, 150];
const DROPS = [
  { x: 186, delay: 0, dur: 4.2 },
  { x: 214, delay: 1.1, dur: 4.6 },
  { x: 198, delay: 2.3, dur: 4 },
  { x: 222, delay: 3.2, dur: 4.4 },
  { x: 178, delay: 3.9, dur: 4.8 },
  { x: 205, delay: 0.6, dur: 5 },
];

type Content = Widen<typeof babosoraVi>;

function RevenueFunnel({ b, en, className = "" }: { b: Content; en: boolean; className?: string }) {
  const bands = b.flow.slice(0, 4).map((f, i) => {
    const y = 16 + i * (BAND_H + BAND_GAP);
    const wt = BAND_W[i];
    const wb = BAND_W[i + 1];
    return { ...f, y, points: `${200 - wt / 2},${y} ${200 + wt / 2},${y} ${200 + wb / 2},${y + BAND_H} ${200 - wb / 2},${y + BAND_H}` };
  });
  const ra = b.flow[4];
  return (
    <svg viewBox="0 0 400 440" className={`babo-funnel ${className}`} role="img" aria-label={`${en ? "BABOSORA revenue flow" : "Dòng chảy doanh thu BABOSORA"}: ${b.flow.map((f) => `${f.code} ${f.name}`).join(" → ")}`}>
      <defs>
        <linearGradient id="babo-band" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#214f51" />
          <stop offset="1" stopColor="#1a4547" />
        </linearGradient>
        <radialGradient id="babo-ra-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#dea443" stopOpacity="0.55" />
          <stop offset="1" stopColor="#dea443" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Vòng quay lại: doanh thu gia tốc mở rộng địa bàn mới. */}
      <path className="babo-loop" d="M 252 372 C 372 372 398 250 392 48" fill="none" stroke="#e4b862" strokeOpacity="0.55" strokeWidth="1.5" strokeDasharray="4 7" />
      <path d="M 386 58 L 392 46 L 398 58" fill="none" stroke="#e4b862" strokeOpacity="0.7" strokeWidth="1.5" strokeLinecap="round" />

      {bands.map((band, i) => (
        <g key={band.code}>
          <polygon
            className="babo-band"
            points={band.points}
            fill="url(#babo-band)"
            stroke="rgba(228,184,98,0.55)"
            strokeWidth="1.25"
            style={{ animationDelay: `${i * 0.9}s` }}
          />
          <text x="200" y={band.y + 28} textAnchor="middle" fill="#dea443" fontSize="18" fontWeight="700" letterSpacing="1.5">
            {band.code}
          </text>
          <text x="200" y={band.y + 48} textAnchor="middle" fill="#fcfbf8" fillOpacity="0.85" fontSize="12.5" fontWeight="500">
            {band.name}
          </text>
        </g>
      ))}

      {DROPS.map((d, i) => (
        <circle key={i} className="babo-drop" cx={d.x} cy="24" r="2.6" fill="#f4d7a6" style={{ animationDelay: `${d.delay}s`, animationDuration: `${d.dur}s` }} />
      ))}

      <circle className="babo-ra-glow" cx="200" cy="372" r="74" fill="url(#babo-ra-glow)" />
      <circle cx="200" cy="372" r="52" fill="#dea443" stroke="#f4d7a6" strokeWidth="2" />
      <text x="200" y="370" textAnchor="middle" fill="#163c3e" fontSize="24" fontWeight="800" letterSpacing="1">
        {ra.code}
      </text>
      <text x="200" y="388" textAnchor="middle" fill="#163c3e" fontSize="10" fontWeight="700">
        {en ? "Revenue" : "Gia tốc"}
      </text>
      <text x="200" y="400" textAnchor="middle" fill="#163c3e" fontSize="10" fontWeight="700">
        {en ? "acceleration" : "doanh thu"}
      </text>
    </svg>
  );
}

export async function BabosoraLanding() {
  const en = (await getLocale()) === "en";
  const bmdoK4 = en ? bmdoK4En : bmdoK4Vi;
  const b: Content = en ? babosoraEn : babosoraVi;
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-vabix-deep-teal pt-28 text-vabix-warm sm:pt-32">
        <HeroBackdrop />
        <Container className="relative grid gap-10 pb-16 pt-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center lg:gap-14 lg:pb-24">
          <div>
            <Breadcrumb
              light
              items={[
                { name: en ? "Home" : "Trang chủ", href: paths.home },
                { name: en ? "Training & coaching" : "Đào tạo & huấn luyện", href: paths.training },
                { name: "BABOSORA" },
              ]}
            />
            <p className="mt-10 inline-flex items-center gap-2 rounded-full border border-vabix-gold/45 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-vabix-soft-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-vabix-gold" aria-hidden="true" />
              {b.badge}
            </p>
            <h1 className="mt-6">
              <span className="block text-[clamp(2.5rem,15vw,3.4rem)] font-bold leading-none tracking-[0.03em] text-vabix-warm sm:text-[5.6rem]">{b.title}</span>
              <span className="mt-5 block text-balance text-2xl font-semibold leading-snug text-vabix-gold sm:text-[2.1rem]">{b.subtitle}</span>
            </h1>
            <p className="mt-6 lg:border-l-2 lg:border-vabix-gold/80 lg:pl-4">
              <span className="flex flex-col items-center gap-1 text-sm font-semibold uppercase tracking-[0.1em] sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-3 sm:text-base lg:items-center lg:justify-start">
                {b.tagline.map((t, i) => (
                  <span key={t} className="inline-flex items-center gap-3">
                    <span aria-hidden="true" className={`h-1.5 w-1.5 rotate-45 bg-vabix-gold ${i === 0 ? "sm:hidden" : ""}`} />
                    <span className="bmdo-slogan-text">{t}</span>
                  </span>
                ))}
              </span>
            </p>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg lg:mx-0">{b.lead}</p>
            <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap sm:justify-center lg:justify-start">
              <Button href="#dang-ky" className="w-full sm:w-auto">
                {en ? "Register now →" : "Đăng ký tham gia →"}
              </Button>
              <Button href={hotlineHref} variant="outline" className="w-full border-white/40 text-white sm:w-auto">
                {en ? "Call us" : "Gọi tư vấn"} {hotline}
              </Button>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[30rem]">
            <RevenueFunnel b={b} en={en} className="w-full" />
            <ul className="mt-6 grid grid-cols-3 gap-2">
              {b.stats.map((s, i) => (
                <li
                  key={s.value}
                  className="bmdo-stat flex min-h-[5.5rem] flex-col items-center justify-center rounded-2xl border border-vabix-gold/20 bg-vabix-deep-teal/85 px-2 py-3 text-center backdrop-blur"
                  style={{ ["--bmdo-stat-i" as string]: i }}
                >
                  <p className="text-balance text-base font-semibold uppercase leading-tight text-vabix-gold sm:text-xl">{s.value}</p>
                  <p className="mt-1 text-balance text-[12px] leading-snug text-white/70 sm:text-xs">{s.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Phim giới thiệu (TVC) */}
      <section className="relative overflow-hidden bg-vabix-deep-teal pb-20 pt-4 sm:pb-24" aria-labelledby="babo-tvc">
        <HeroBackdrop />
        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">{en ? "Introductory film" : "Phim giới thiệu"}</p>
            <h2 id="babo-tvc" className="mt-3 text-balance text-[1.9rem] font-semibold leading-[1.15] tracking-[-0.02em] text-vabix-warm sm:text-[2.4rem]">
              BABOSORA <span className="text-vabix-gold">{en ? "in one minute." : "trong một phút."}</span>
            </h2>
          </div>
          <div className="mt-8 sm:mt-10">
            <BmdoTvc
              title={en ? "BABOSORA introductory film" : "Phim giới thiệu BABOSORA"}
              landscape={{ src: "/videos/babosora/babosora-tvc-16x9.mp4", poster: "/videos/babosora/babosora-tvc-16x9-poster.jpg" }}
              portrait={{ src: "/videos/babosora/babosora-tvc-9x16.mp4", poster: "/videos/babosora/babosora-tvc-9x16-poster.jpg" }}
            />
          </div>
        </Container>
      </section>

      {/* Bài toán */}
      <section className="bg-vabix-warm py-16 sm:py-24">
        <Container>
          <RevealOnView>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
              <div className="bmdo-rv">
                <Heading eyebrow={en ? "The revenue challenge" : "Bài toán doanh thu"} title={b.problem.title} gold={b.problem.titleGold} />
              </div>
              <p className="bmdo-rv text-lg leading-relaxed text-vabix-muted" style={{ ["--rv-i" as string]: 1 }}>
                {b.problem.body}
              </p>
            </div>
            <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {b.problem.questions.map((q, i) => (
                <li
                  key={q.code}
                  className="bmdo-rv flex flex-col rounded-[20px] border border-vabix-deep-teal/10 bg-white p-5 shadow-[0_10px_30px_rgba(22,60,62,0.06)]"
                  style={{ ["--rv-i" as string]: 2 + i }}
                >
                  <span className="self-start rounded-full bg-vabix-deep-teal px-3 py-1 text-xs font-bold tracking-[0.12em] text-vabix-gold">{q.code}</span>
                  <p className="mt-4 text-[15px] leading-relaxed text-vabix-ink">{q.q}</p>
                </li>
              ))}
            </ol>
            <p className="bmdo-rv mt-8 rounded-[18px] bg-vabix-ivory p-5 text-vabix-ink sm:p-6" style={{ ["--rv-i" as string]: 7 }}>
              {b.problem.conclusion}
            </p>
          </RevealOnView>
        </Container>
      </section>

      {/* Năm mục tiêu theo dòng chảy */}
      <section className="relative overflow-hidden bg-vabix-deep-teal py-16 text-vabix-warm sm:py-24">
        <HeroBackdrop />
        <Container className="relative">
          <RevealOnView>
            <div className="bmdo-rv">
              <Heading light center eyebrow={en ? "The B2A × BABOSORA model" : "Mô thức B2A × BABOSORA"} title={en ? "One flow," : "Một dòng chảy,"} gold={en ? "five points of impact." : "năm điểm tác động."} />
            </div>
            <p className="bmdo-rv mx-auto mt-5 max-w-2xl text-center text-lg text-white/75" style={{ ["--rv-i" as string]: 1 }}>
              {en
                ? "Revenue begins when customers become aware of the brand, have a need and are able to buy; it keeps being created as opportunities are uncovered, converted into orders and developed over the whole customer lifetime."
                : "Doanh thu hình thành từ khi khách hàng nhận biết thương hiệu, có nhu cầu và đủ điều kiện mua; tiếp tục được tạo ra khi cơ hội được phát hiện, chuyển hóa thành đơn hàng và phát triển trong suốt vòng đời khách hàng."}
            </p>
            <ol className="relative mt-12 grid gap-4 md:grid-cols-5">
              <span aria-hidden="true" className="bmdo-applier-line absolute left-[10%] right-[10%] top-7 hidden h-px md:block" />
              {b.objectives.map((o, i) => (
                <li key={o.code} className="bmdo-rv relative flex flex-col items-start md:items-center md:text-center" style={{ ["--rv-i" as string]: 2 + i }}>
                  <span
                    className="bmdo-applier-dot relative grid h-14 w-14 place-items-center rounded-full border border-vabix-gold bg-vabix-deep-teal text-sm font-bold tracking-wide text-vabix-gold"
                    style={{ animationDelay: `${i * 1.4}s`, animationDuration: "7s" }}
                  >
                    {o.code}
                  </span>
                  <h3 className="mt-4 text-balance font-semibold leading-snug">{o.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{o.body}</p>
                </li>
              ))}
            </ol>
          </RevealOnView>
        </Container>
      </section>

      {/* Nội dung 2 ngày – 4 buổi */}
      <section className="bg-vabix-ivory py-16 sm:py-24" id="noi-dung">
        <Container>
          <Heading center eyebrow={en ? "Programme content" : "Nội dung chương trình"} title={en ? "2 days, 4 sessions," : "02 ngày, 04 buổi,"} gold={en ? "4 deliverables to take home." : "04 sản phẩm mang về."} />
          <p className="mx-auto mt-5 max-w-2xl text-center text-lg text-vabix-muted">
            {en
              ? "Every session ends with a hands-on group workshop and a deliverable you can use at work straight away."
              : "Mỗi buổi kết thúc bằng một thao trường thực chiến theo nhóm và một sản phẩm dùng được ngay trong công việc."}
          </p>
          <div className="mt-12 space-y-12">
            {b.days.map((d) => (
              <div key={d.day}>
                <div className="flex items-baseline gap-4">
                  <span className="shrink-0 whitespace-nowrap rounded-full bg-vabix-gold px-4 py-1.5 text-sm font-bold uppercase tracking-[0.12em] text-vabix-deep-teal">{d.day}</span>
                  <h3 className="text-xl font-semibold text-vabix-deep-teal sm:text-2xl">{d.title}</h3>
                </div>
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  {d.sessions.map((s) => (
                    <article key={s.no} className="flex flex-col overflow-hidden rounded-[24px] border border-vabix-deep-teal/10 bg-white">
                      <header className="relative bg-vabix-deep-teal px-5 py-5 text-vabix-warm sm:px-7 sm:py-6">
                        <span aria-hidden="true" className="absolute right-5 top-2 text-6xl font-bold text-white/[0.06]">
                          {s.no}
                        </span>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-vabix-gold">
                          {en ? "Session" : "Buổi"} {s.no} · {s.codes}
                        </p>
                        <h4 className="mt-2 text-balance text-lg font-semibold leading-snug sm:text-xl">{s.title}</h4>
                      </header>
                      <div className="flex flex-1 flex-col px-5 py-5 sm:px-7 sm:py-6">
                        <p className="text-[15px] italic leading-relaxed text-vabix-muted">“{s.question}”</p>
                        <ul className="mt-4 space-y-2.5">
                          {s.topics.map((t) => (
                            <li key={t} className="flex gap-3 text-[15px] leading-relaxed text-vabix-ink">
                              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-vabix-gold" />
                              {t}
                            </li>
                          ))}
                        </ul>
                        <p className="mt-auto pt-5">
                          <span className="block rounded-xl bg-vabix-ivory p-4 text-sm leading-relaxed text-vabix-ink">
                            <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-vabix-gold">{en ? "Workshop · Deliverable" : "Thao trường · Sản phẩm đầu ra"}</span>
                            <span className="mt-1 block">{s.output}</span>
                          </span>
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Bộ công cụ + APPLIER */}
      <section className="relative overflow-hidden bg-vabix-deep-teal py-16 text-vabix-warm sm:py-24">
        <HeroBackdrop />
        <Container className="relative">
          <RevealOnView>
            <div className="bmdo-rv">
              <Heading light eyebrow={en ? "Practical toolkit" : "Bộ công cụ thực chiến"} title={en ? "Tools to take home," : "Công cụ mang về,"} gold={en ? "ready to use the next day." : "dùng được ngay hôm sau."} />
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {b.tools.map((t, i) => (
                <article
                  key={t.code}
                  className="bmdo-rv rounded-[22px] border border-vabix-gold/30 bg-vabix-deep-teal/50 p-6 backdrop-blur-sm transition-colors hover:border-vabix-gold/60"
                  style={{ ["--rv-i" as string]: 1 + i }}
                >
                  <p className="text-2xl font-bold tracking-[0.08em] text-vabix-gold">{t.code}</p>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-[0.12em] text-white/70">{t.title}</p>
                  <ul className="mt-5 space-y-2.5">
                    {t.items.map((it, j) => (
                      <li key={j} className="flex items-baseline gap-3 text-sm text-white/80">
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-vabix-gold/50 text-xs font-bold text-vabix-gold">{it.k}</span>
                        {it.v}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <p className="bmdo-rv mt-14 text-sm font-semibold uppercase tracking-[0.16em] text-vabix-gold" style={{ ["--rv-i" as string]: 4 }}>
              {en ? "The APPLIER teaching method — learn to do it, and do it well" : "Phương pháp dẫn giảng APPLIER — học để làm được và làm hiệu quả"}
            </p>
            <ol className="relative mt-8 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 sm:gap-y-8 lg:grid-cols-7">
              <span aria-hidden="true" className="bmdo-applier-line absolute left-6 right-6 top-6 hidden h-px lg:block" />
              {b.applier.map((s, i) => (
                <li key={s.title} className="bmdo-rv relative" style={{ ["--rv-i" as string]: 5 + i }}>
                  <span
                    className="bmdo-applier-dot relative grid h-12 w-12 place-items-center rounded-full border border-vabix-gold bg-vabix-deep-teal text-base font-bold text-vabix-gold"
                    style={{ animationDelay: `${i}s` }}
                  >
                    {s.k}
                  </span>
                  <p className="mt-4 font-semibold uppercase tracking-wide">{s.title}</p>
                  <p className="mt-1 text-sm text-white/70">{s.body}</p>
                </li>
              ))}
            </ol>
          </RevealOnView>
        </Container>
      </section>

      {/* Kết quả */}
      <section className="bg-vabix-warm py-16 sm:py-24">
        <Container>
          <Heading eyebrow={en ? "Expected outcomes" : "Kết quả kỳ vọng"} title={en ? "After two days," : "Sau hai ngày,"} gold={en ? "what will your team have in hand?" : "đội ngũ có gì trong tay?"} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {b.outcomes.map((o, i) => (
              <article key={o.title} className="rounded-[20px] border border-vabix-deep-teal/10 bg-white p-5 shadow-[0_10px_30px_rgba(22,60,62,0.06)] sm:p-6">
                <span aria-hidden="true" className="block h-1 w-10 rounded-full bg-vabix-gold" />
                <p className="mt-5 text-3xl font-semibold text-vabix-gold">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-balance font-semibold uppercase leading-snug tracking-wide text-vabix-deep-teal">{o.title}</h3>
                <p className="mt-2 text-[15px] text-vabix-muted">{o.body}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 max-w-4xl text-sm leading-relaxed text-vabix-muted">{b.outcomesNote}</p>

          <ul className="mt-14 grid gap-3 md:grid-cols-2">
            {b.manifesto.map(([a, c]) => (
              <li key={a} className="rounded-[18px] border-l-2 border-vabix-gold bg-vabix-ivory px-5 py-4 text-vabix-ink">
                <span className="text-vabix-muted">{a} – </span>
                <span className="font-semibold text-vabix-deep-teal">{c}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Bước tiếp theo: BMDO */}
      <section className="relative overflow-hidden bg-vabix-deep-teal py-16 text-vabix-warm sm:py-24">
        <HeroBackdrop />
        <Container className="relative">
          <div className="grid items-center gap-10 overflow-hidden rounded-[28px] border border-vabix-gold/35 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <div>
              <p className="eyebrow">{en ? "The next step after BABOSORA" : "Bước tiếp theo sau BABOSORA"}</p>
              <h2 className="mt-3 text-balance text-[1.9rem] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[2.6rem]">
                {en ? "From the revenue flow" : "Từ dòng chảy doanh thu"}{" "}
                <span className="text-vabix-gold">{en ? "to the whole business car." : "đến toàn bộ chiếc xe doanh nghiệp."}</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/75">
                {en
                  ? "BABOSORA optimises one domain: market and revenue. Revenue only lasts when strategy, brand, organisation, people, finance and operations work in sync. BMDO helps business owners and CEOs design all 12 management domains on the BizCar model."
                  : "BABOSORA tối ưu một miền: thị trường và doanh thu. Doanh thu chỉ bền khi chiến lược, thương hiệu, tổ chức, nhân lực, tài chính và vận hành cùng đồng bộ. BMDO giúp doanh chủ và CEO thiết kế cả 12 miền quản trị trên mô hình BizCar."}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2 text-sm">
                <li className="rounded-full border border-vabix-gold/40 px-3 py-1 text-vabix-soft-gold">{bmdoK4.cohort} · {en ? "Opens" : "Khai giảng"} {bmdoK4.enrol.opening}</li>
                <li className="rounded-full border border-vabix-gold/40 px-3 py-1 text-vabix-soft-gold">{en ? "60 hours · 12 Saturdays" : "60 giờ · 12 ngày Thứ Bảy"}</li>
                <li className="rounded-full border border-vabix-gold/40 px-3 py-1 text-vabix-soft-gold">{en ? "Offer" : "Ưu đãi"} {bmdoK4.enrol.price}</li>
              </ul>
              <div className="mt-8 grid gap-3 sm:flex">
                <Button href={paths.program("bmdo")} className="w-full sm:w-auto">
                  {en ? "Explore BMDO Cohort 04 →" : "Khám phá BMDO Khoá 04 →"}
                </Button>
              </div>
            </div>
            <Link href={paths.program("bmdo")} className="group relative mx-auto block w-56 sm:w-64" aria-label={en ? "View the BMDO programme" : "Xem chương trình BMDO"}>
              <span aria-hidden="true" className="absolute inset-[-12%] rounded-full bg-[radial-gradient(closest-side,rgba(222,164,67,0.35),transparent)] blur-2xl" />
              <Image
                src="/images/bmdo/bizcar-logo.webp"
                alt={en ? "BizCar logo — the foundation model of BMDO" : "Logo BizCar — mô hình nền tảng của BMDO"}
                width={536}
                height={600}
                unoptimized
                className="relative h-auto w-full transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
          </div>
        </Container>
      </section>

      {/* Đăng ký */}
      <section id="dang-ky" className="scroll-mt-24 bg-vabix-ivory py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-vabix-gold">BABOSORA</p>
            <h2 className="mt-3 text-3xl font-semibold uppercase text-vabix-deep-teal sm:text-4xl">{en ? "Register" : "Đăng ký tham gia"}</h2>
            <dl className="mt-8 space-y-5">
              <div>
                <dt className="text-xs uppercase tracking-[0.18em] text-vabix-muted">{en ? "Duration" : "Thời lượng"}</dt>
                <dd className="mt-1 text-lg text-vabix-ink">{en ? "12 hours · 2 days · 4 training and practice sessions" : "12 giờ · 02 ngày · 04 buổi đào tạo và thực hành"}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.18em] text-vabix-muted">{en ? "Who it is for" : "Dành cho"}</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {b.audience.map((a) => (
                    <span key={a} className="rounded-full border border-vabix-deep-teal/15 bg-white px-3 py-1 text-sm text-vabix-deep-teal">
                      {a}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.18em] text-vabix-muted">{en ? "Format" : "Hình thức"}</dt>
                <dd className="mt-1 text-lg text-vabix-ink">{b.enrol.format}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.18em] text-vabix-muted">{en ? "Schedule" : "Lịch học"}</dt>
                <dd className="mt-1 text-lg text-vabix-ink">{b.enrol.schedule}</dd>
              </div>
            </dl>
            <div className="mt-10 border-t border-vabix-deep-teal/15 pt-6">
              <p className="text-xs uppercase tracking-[0.18em] text-vabix-muted">{en ? "Advice hotline" : "Hotline tư vấn"}</p>
              <a href={hotlineHref} className="mt-2 inline-block text-3xl font-semibold text-vabix-deep-teal hover:text-vabix-gold">
                {hotline}
              </a>
            </div>
          </div>
          <div className="bmdo-form rounded-[22px] bg-white p-5 text-vabix-ink shadow-[0_18px_40px_rgba(22,60,62,0.08)] sm:p-8">
            <LeadForm type="training" program="babosora" title={en ? "Register for BABOSORA" : "Đăng ký tham gia BABOSORA"} />
          </div>
        </Container>
      </section>
    </>
  );
}
