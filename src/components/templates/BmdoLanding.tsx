import Image from "next/image";
import { bmdoClassPhotos, bmdoK4 as k } from "@/content/bmdoK4";
import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumb } from "@/components/ui/Misc";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { siteConfig } from "@/lib/siteConfig";
import { paths } from "@/lib/paths";

const hotline = siteConfig.contact.hotline;
const hotlineHref = siteConfig.contact.hotlineHref;

const RING_R = 150;
const RING_C = 2 * Math.PI * RING_R;
const COMET_SECONDS = 12;
const COMET_SEGMENTS = [0.12, 0.22, 0.38, 0.6, 1];
const COMET_SEG = 28;

function BizCarRing({ className = "" }: { className?: string }) {
  const nodes = Array.from({ length: 12 }, (_, i) => {
    const a = ((i * 30 - 90) * Math.PI) / 180;
    // Thời điểm đầu vệt sáng chạm nút i — nút loé sáng đúng lúc đó (delay âm để chạy ổn định ngay khi tải).
    const reach = ((((i * RING_C) / 12 - COMET_SEG * COMET_SEGMENTS.length) / RING_C) * COMET_SECONDS + COMET_SECONDS) % COMET_SECONDS;
    return { n: i + 1, x: 200 + RING_R * Math.cos(a), y: 200 + RING_R * Math.sin(a), gold: i % 3 === 0, delay: reach - COMET_SECONDS };
  });
  const ticks = Array.from({ length: 60 }, (_, i) => {
    const a = (i * 6 * Math.PI) / 180;
    const inner = i % 5 === 0 ? 181 : 185;
    return { x1: 200 + inner * Math.cos(a), y1: 200 + inner * Math.sin(a), x2: 200 + 190 * Math.cos(a), y2: 200 + 190 * Math.sin(a), major: i % 5 === 0 };
  });
  return (
    <svg viewBox="0 0 400 400" className={`bmdo-ring ${className}`} role="img" aria-label="Mô hình BizCar — 12 miền quản trị">
      <defs>
        <radialGradient id="bmdo-ring-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#dea443" stopOpacity="0.38" />
          <stop offset="100%" stopColor="#dea443" stopOpacity="0" />
        </radialGradient>
        <filter id="bmdo-ring-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className="bmdo-ring-orbit">
        <circle cx="200" cy="200" r="190" fill="none" stroke="rgba(228,184,98,0.22)" />
        {ticks.map((t, i) => (
          <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="#e4b862" strokeOpacity={t.major ? 0.45 : 0.18} strokeWidth="1" />
        ))}
        <circle cx="200" cy="10" r="3.5" fill="#e4b862" filter="url(#bmdo-ring-glow)" />
      </g>

      <circle className="bmdo-ring-breathe" cx="200" cy="200" r="100" fill="url(#bmdo-ring-core)" />
      <circle className="bmdo-ring-spin-rev" cx="200" cy="200" r="104" fill="none" stroke="rgba(228,184,98,0.32)" strokeDasharray="2 6" />

      <circle cx="200" cy="200" r={RING_R} fill="none" stroke="rgba(222,164,67,0.45)" strokeWidth="1.5" />
      <g transform="rotate(-90 200 200)" filter="url(#bmdo-ring-glow)">
        {COMET_SEGMENTS.map((opacity, k) => (
          <circle
            key={k}
            className="bmdo-ring-comet"
            cx="200"
            cy="200"
            r={RING_R}
            fill="none"
            stroke="#f4d7a6"
            strokeOpacity={opacity}
            strokeWidth={2 + k * 0.5}
            strokeLinecap="round"
            strokeDasharray={`${COMET_SEG} ${RING_C - COMET_SEG}`}
            style={{ ["--bmdo-comet-from" as string]: `${-k * COMET_SEG}`, ["--bmdo-comet-to" as string]: `${-k * COMET_SEG - RING_C}` }}
          />
        ))}
      </g>

      <circle cx="200" cy="200" r="62" fill="#214f51" stroke="#dea443" strokeWidth="2" />
      <text x="200" y="194" textAnchor="middle" fill="#dea443" fontSize="26" fontWeight="700">BIZ</text>
      <text x="200" y="224" textAnchor="middle" fill="#fcfbf8" fontSize="26" fontWeight="700">CAR</text>

      {nodes.map((p) => (
        <g key={p.n}>
          <circle className="bmdo-ring-halo" cx={p.x} cy={p.y} r="15" fill="none" stroke="#f4d7a6" strokeWidth="1.5" style={{ animationDelay: `${p.delay.toFixed(2)}s` }} />
          <circle
            className="bmdo-ring-node"
            cx={p.x}
            cy={p.y}
            r="15"
            fill={p.gold ? "#dea443" : "#214f51"}
            stroke="rgba(228,184,98,0.45)"
            strokeWidth="1.5"
            style={{ animationDelay: `${p.delay.toFixed(2)}s` }}
          />
          <text x={p.x} y={p.y + 4.5} textAnchor="middle" fill={p.gold ? "#163c3e" : "#fcfbf8"} fontSize="12" fontWeight="700">
            {p.n}
          </text>
        </g>
      ))}
    </svg>
  );
}

function Heading({ eyebrow, title, gold, light = false, center = false }: { eyebrow: string; title: string; gold: string; light?: boolean; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className={`mt-3 text-balance text-[1.9rem] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[2.6rem] ${light ? "text-vabix-warm" : "text-vabix-deep-teal"}`}>
        {title} <span className="text-vabix-gold">{gold}</span>
      </h2>
    </div>
  );
}

function ClassGallery() {
  // Chia ảnh thành hai hàng; hàng ngắn thì lặp cho đủ dài, rồi nhân đôi để vòng lặp -50% khớp đúng.
  const half = Math.ceil(bmdoClassPhotos.length / 2);
  const rows = [bmdoClassPhotos.slice(0, half), bmdoClassPhotos.slice(half)]
    .filter((row) => row.length)
    .map((row) => Array.from({ length: Math.ceil(8 / row.length) }, () => row).flat());
  return (
    <div className="space-y-4">
      {rows.map((row, r) => (
        <div key={r} className="bmdo-marquee">
          <ul className="bmdo-marquee-track" data-reverse={r ? "" : undefined} style={{ ["--bmdo-marquee-duration" as string]: `${row.length * 6}s` }}>
            {[...row, ...row].map((photo, i) => (
              <li key={i} className="mr-4 shrink-0" aria-hidden={i >= row.length || undefined}>
                <figure className="relative h-48 w-72 overflow-hidden rounded-[18px] sm:h-60 sm:w-[23rem]">
                  <Image src={photo.src} alt={i >= row.length ? "" : photo.alt} fill unoptimized loading="eager" sizes="368px" className="object-cover" />
                </figure>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function BmdoLanding() {
  const facts = [
    { label: "Khai giảng", value: k.enrol.opening },
    { label: "Lịch học", value: k.enrol.schedule },
    { label: "Địa điểm", value: k.enrol.venue },
  ];
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-vabix-deep-teal pt-28 text-vabix-warm sm:pt-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 55% 70% at 78% 45%, rgba(222,164,67,0.14), transparent 65%)" }}
        />
        <Container className="relative grid gap-10 pb-14 pt-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center lg:gap-14 lg:pb-20">
          <div>
            <Breadcrumb
              light
              items={[
                { name: "Trang chủ", href: paths.home },
                { name: "Đào tạo & huấn luyện", href: paths.training },
                { name: "BMDO" },
              ]}
            />
            <p className="mt-10 inline-flex items-center gap-2 rounded-full border border-vabix-gold/45 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-vabix-soft-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-vabix-gold" aria-hidden="true" />
              {k.cohort} · Khai giảng {k.enrol.opening}
            </p>
            <h1 className="mt-6">
              <span className="block text-[4.5rem] font-bold leading-none tracking-[0.04em] text-vabix-warm sm:text-[7rem]">BMDO</span>
              <span className="mt-5 block text-balance text-2xl font-semibold leading-snug text-vabix-gold sm:text-[2.1rem]">{k.titleGold}</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              {k.eyebrow}. {k.promise}
            </p>
            <p className="mt-3 text-sm font-medium tracking-wide text-vabix-soft-gold">{k.motto}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#dang-ky">Đăng ký giữ chỗ →</Button>
              <Button href={hotlineHref} variant="outline" className="border-white/40 text-white">
                Gọi tư vấn {hotline}
              </Button>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[30rem]">
            <BizCarRing className="w-full" />
            <ul className="mt-4 grid grid-cols-3 gap-2">
              {k.stats.map((s, i) => (
                <li
                  key={s.value}
                  className="bmdo-stat flex min-h-[5.5rem] flex-col items-center justify-center rounded-2xl border border-vabix-gold/20 bg-vabix-deep-teal/85 px-3 py-3 text-center backdrop-blur"
                  style={{ ["--bmdo-stat-i" as string]: i }}
                >
                  <p className="text-lg font-semibold uppercase leading-tight text-vabix-gold sm:text-xl">{s.value}</p>
                  <p className="mt-1 text-balance text-[11px] leading-snug text-white/65 sm:text-xs">{s.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Thanh thông tin khoá */}
      <section className="relative z-10 bg-vabix-warm">
        <Container>
          <div className="-mt-px grid gap-px overflow-hidden rounded-b-[22px] bg-vabix-deep-teal/10 shadow-[0_18px_40px_rgba(22,60,62,0.12)] md:grid-cols-[repeat(3,minmax(0,1fr))_minmax(0,1.25fr)]">
            {facts.map((f) => (
              <div key={f.label} className="bg-white px-6 py-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-vabix-muted">{f.label}</p>
                <p className="mt-1.5 font-semibold text-vabix-deep-teal">{f.value}</p>
              </div>
            ))}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-vabix-ivory px-6 py-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-vabix-muted">
                  Học phí ưu đãi · <span className="line-through">{k.enrol.listPrice}</span>
                </p>
                <p className="mt-1 text-2xl font-semibold text-vabix-deep-teal">
                  {k.enrol.price} <span className="ml-1 align-middle text-xs font-semibold uppercase tracking-[0.12em] text-vabix-gold">−50%</span>
                </p>
              </div>
              <Button href="#dang-ky" variant="teal">
                Giữ chỗ
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Tổng quan */}
      <section className="bg-vabix-warm py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <Heading eyebrow="Tổng quan chương trình" title={k.overview.title} gold={k.overview.titleGold} />
            <p className="mt-6 text-lg leading-relaxed text-vabix-muted">{k.overview.body}</p>
          </div>
          <div className="self-end rounded-[22px] bg-vabix-deep-teal p-7 text-vabix-warm sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-vabix-gold">Phương pháp tiếp cận</p>
            <p className="mt-3 text-lg leading-relaxed">{k.overview.approach}</p>
            <p className="mt-6 border-t border-white/10 pt-5 text-sm leading-relaxed text-white/70">
              <span className="font-semibold text-vabix-soft-gold">Nguyên tắc: </span>
              {k.overview.principle}
            </p>
          </div>
        </Container>
        <Container className="mt-14">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-vabix-deep-teal">12 miền quản trị / Một bản thiết kế</p>
          <ol className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {k.overview.steps.map((s, i) => (
              <li key={s.title} className="relative rounded-[20px] border border-vabix-deep-teal/10 bg-white p-5 sm:p-6">
                <span className="text-3xl sm:text-4xl font-semibold text-vabix-gold/80">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-4 font-semibold uppercase tracking-wide text-vabix-deep-teal">{s.title}</p>
                <p className="mt-1.5 text-vabix-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Hình ảnh lớp học */}
      <section className="overflow-hidden bg-vabix-ivory py-16 sm:py-24" aria-labelledby="bmdo-gallery">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div id="bmdo-gallery">
              <Heading eyebrow="Hình ảnh lớp học" title="Không khí" gold="thao trường BMDO." />
            </div>
            <p className="max-w-md text-vabix-muted">Doanh chủ và CEO cùng thực hành, phản biện và hoàn thiện thiết kế trên chính doanh nghiệp của mình.</p>
          </div>
        </Container>
        <div className="mt-10">
          <ClassGallery />
        </div>
      </section>

      {/* Lộ trình 12 ngày */}
      <section className="bg-vabix-warm py-16 sm:py-24" id="lo-trinh">
        <Container>
          <Heading center eyebrow="Lộ trình 12 ngày học" title="Bốn chặng," gold="mười hai miền quản trị." />
          <p className="mx-auto mt-5 max-w-2xl text-center text-lg text-vabix-muted">
            Mỗi ngày học gắn với một bộ phận của Chiếc Xe Doanh Nghiệp và kết thúc bằng một thiết kế đầu ra cụ thể.
          </p>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {k.phases.map((phase) => (
              <article key={phase.number} className="overflow-hidden rounded-[24px] border border-vabix-deep-teal/10 bg-white">
                <header className="relative bg-vabix-deep-teal px-7 py-6 text-vabix-warm">
                  <span aria-hidden="true" className="absolute right-6 top-3 text-6xl font-bold text-white/[0.06]">
                    {phase.number}
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-vabix-gold">
                    Chặng {phase.number} · {phase.label}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold">{phase.title}</h3>
                  <p className="mt-1 text-sm text-white/70">
                    {phase.days} · {phase.lead}
                  </p>
                </header>
                <ol className="divide-y divide-vabix-deep-teal/10">
                  {phase.sessions.map((d) => (
                    <li key={d.day} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-4 px-7 py-5">
                      <span className="text-2xl font-semibold text-vabix-gold">{d.day}</span>
                      <div>
                        <h4 className="font-semibold text-vabix-deep-teal">{d.title}</h4>
                        <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-vabix-muted">{d.part}</p>
                        <p className="mt-1.5 text-[15px] leading-relaxed text-vabix-ink">{d.body}</p>
                        <p className="mt-2 text-sm leading-relaxed text-vabix-muted">
                          <span className="font-semibold text-vabix-gold">Đầu ra → </span>
                          {d.output}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Phương pháp */}
      <section className="bg-vabix-deep-teal py-16 text-vabix-warm sm:py-24">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
            <Heading light eyebrow="Phương pháp học và hỗ trợ" title={k.method.title} gold={k.method.titleGold} />
            <p className="text-lg leading-relaxed text-white/75">{k.method.body}</p>
          </div>

          <p className="mt-14 text-sm font-semibold uppercase tracking-[0.16em] text-vabix-gold">Chu trình thực hành APPLIER</p>
          <ol className="relative mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-7">
            <span aria-hidden="true" className="absolute left-6 right-6 top-6 hidden h-px bg-vabix-gold/35 lg:block" />
            {k.method.applier.map((s, i) => (
              <li key={s.title} className="relative">
                <span className="relative grid h-12 w-12 place-items-center rounded-full border border-vabix-gold bg-vabix-deep-teal text-sm font-semibold text-vabix-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 font-semibold uppercase tracking-wide">{s.title}</p>
                <p className="mt-1 text-sm text-white/70">{s.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-vabix-gold">Một ngày học · 300 phút thực hành có hướng dẫn</p>
              <div className="mt-5 flex overflow-hidden rounded-full border border-white/10 text-xs font-semibold sm:text-sm">
                {k.method.day.map((b, i) => (
                  <div
                    key={b.label}
                    style={{ flexGrow: b.minutes }}
                    className={`basis-0 px-2 py-3 text-center ${b.label === "MyBizCar" ? "bg-vabix-gold text-vabix-deep-teal" : i % 2 ? "bg-white/10" : "bg-white/[0.04]"}`}
                  >
                    {b.minutes}’
                  </div>
                ))}
              </div>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-white/70">
                {k.method.day.map((b) => (
                  <li key={b.label}>
                    <span className="font-semibold text-vabix-soft-gold">{b.minutes}’</span> {b.label}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-vabix-gold">Ba lớp hỗ trợ cho việc ứng dụng</p>
              <ul className="mt-5 divide-y divide-white/10 rounded-[20px] border border-vabix-gold/30">
                {k.method.support.map((s) => (
                  <li key={s.title} className="flex items-baseline justify-between gap-4 px-5 py-4">
                    <span className="font-semibold uppercase text-vabix-gold">{s.title}</span>
                    <span className="text-right text-sm text-white/75">{s.body}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Kết quả */}
      <section className="bg-vabix-warm py-16 sm:py-24">
        <Container>
          <Heading eyebrow="Kết quả mang về" title={k.outcomes.title} gold={k.outcomes.titleGold} />
          <p className="mt-6 max-w-3xl text-lg text-vabix-muted">{k.outcomes.body}</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {k.outcomes.items.map((o, i) => (
              <article key={o.title} className="rounded-[20px] border border-vabix-deep-teal/10 bg-white p-6 shadow-[0_10px_30px_rgba(22,60,62,0.06)]">
                <span aria-hidden="true" className="block h-1 w-10 rounded-full bg-vabix-gold" />
                <p className="mt-5 text-3xl font-semibold text-vabix-gold">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 font-semibold uppercase tracking-wide text-vabix-deep-teal">{o.title}</h3>
                <p className="mt-2 text-vabix-muted">{o.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Đăng ký */}
      <section id="dang-ky" className="scroll-mt-24 bg-vabix-deep-teal py-16 text-vabix-warm sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-vabix-gold">BMDO / {k.cohort}</p>
            <h2 className="mt-3 text-3xl font-semibold uppercase sm:text-4xl">Đăng ký tham gia</h2>
            <p className="mt-3 font-semibold uppercase tracking-wide text-vabix-gold">Dự kiến khai giảng {k.enrol.opening}</p>
            <dl className="mt-8 space-y-5">
              <div>
                <dt className="text-xs uppercase tracking-[0.18em] text-white/55">Lịch học</dt>
                <dd className="mt-1 text-lg">{k.enrol.schedule}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.18em] text-white/55">Địa điểm</dt>
                <dd className="mt-1 text-lg">{k.enrol.venue}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.18em] text-white/55">Học phí</dt>
                <dd className="mt-1 text-white/60">
                  Giá niêm yết: <span className="line-through">{k.enrol.listPrice}</span>
                </dd>
                <dd className="mt-1 flex flex-wrap items-baseline gap-x-4">
                  <span className="text-4xl font-semibold text-vabix-gold">{k.enrol.price}</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.12em]">{k.enrol.discount}</span>
                </dd>
              </div>
            </dl>
            <div className="mt-10 border-t border-white/15 pt-6">
              <p className="text-xs uppercase tracking-[0.18em] text-white/55">Tư vấn / {k.enrol.advisor}</p>
              <a href={hotlineHref} className="mt-2 inline-block text-3xl font-semibold text-vabix-warm hover:text-vabix-gold">
                {hotline}
              </a>
            </div>
            <p className="mt-8 text-sm leading-relaxed text-white/60">{k.enrol.note}</p>
          </div>
          <div className="rounded-[22px] bg-white p-6 text-vabix-ink sm:p-8">
            <LeadForm type="bmdo" program="bmdo" title="Đăng ký giữ chỗ BMDO Khoá 04" />
          </div>
        </Container>
      </section>
    </>
  );
}
