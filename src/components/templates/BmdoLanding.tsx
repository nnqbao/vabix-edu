import Image from "next/image";
import { bmdoClassPhotos, bmdoGraduates as grad, bmdoK4 as k } from "@/content/bmdoK4";
import { LeadForm } from "@/components/forms/LeadForm";
import { BmdoTvc } from "@/components/templates/BmdoTvc";
import { RevealOnView } from "@/components/templates/RevealOnView";
import { Lightbox } from "@/components/templates/Lightbox";
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
// Nhãn tên miền chạy trên elip rộng hơn ở hai bên (nhãn nằm ngang cần nhiều chỗ hơn theo chiều ngang).
// Phải khớp với @keyframes bmdo-ring-label trong globals.css.
const LABEL_RX = 234;
const LABEL_RY = 188;
const WHEEL_SECONDS = 120;

function BizCarRing({ className = "" }: { className?: string }) {
  const nodes = Array.from({ length: 12 }, (_, i) => {
    const a = ((i * 30 - 90) * Math.PI) / 180;
    // Thời điểm đầu vệt sáng chạm nút i — nút loé sáng đúng lúc đó (delay âm để chạy ổn định ngay khi tải).
    const reach = ((((i * RING_C) / 12 - COMET_SEG * COMET_SEGMENTS.length) / RING_C) * COMET_SECONDS + COMET_SECONDS) % COMET_SECONDS;
    const label = k.domains[i];
    return {
      n: i + 1,
      label,
      labelW: Math.round(label.length * 7.1 + 18),
      lx: 200 + LABEL_RX * Math.cos(a),
      ly: 200 + LABEL_RY * Math.sin(a),
      labelDelay: -(i / 12) * WHEEL_SECONDS,
      x: 200 + RING_R * Math.cos(a),
      y: 200 + RING_R * Math.sin(a),
      gold: i % 3 === 0,
      delay: reach - COMET_SECONDS,
    };
  });
  const ticks = Array.from({ length: 60 }, (_, i) => {
    const a = (i * 6 * Math.PI) / 180;
    const inner = i % 5 === 0 ? 181 : 185;
    return { x1: 200 + inner * Math.cos(a), y1: 200 + inner * Math.sin(a), x2: 200 + 190 * Math.cos(a), y2: 200 + 190 * Math.sin(a), major: i % 5 === 0 };
  });
  const logo = { x: 128, y: 119.5, w: 144, h: 161 };
  return (
    <svg viewBox="-94 0 588 400" className={`bmdo-ring ${className}`} role="img" aria-label={`Mô hình BizCar — 12 miền quản trị: ${k.domains.join(", ")}`}>
      <defs>
        <radialGradient id="bmdo-ring-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#dea443" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#dea443" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bmdo-ring-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff8e6" stopOpacity="0.75" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="bmdo-ring-logo-mask" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" style={{ maskType: "alpha" }}>
          <image href="/images/bmdo/bizcar-logo.webp" x={logo.x} y={logo.y} width={logo.w} height={logo.h} />
        </mask>
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

      <circle className="bmdo-ring-breathe" cx="200" cy="200" r="112" fill="url(#bmdo-ring-core)" />
      <circle className="bmdo-ring-spin-rev" cx="200" cy="200" r="104" fill="none" stroke="rgba(228,184,98,0.32)" strokeDasharray="2 6" />

      {/* Logo BizCar ở tâm: bồng bềnh nhẹ, có vệt sáng lướt qua (cắt theo hình logo). */}
      <g className="bmdo-ring-logo">
        <image href="/images/bmdo/bizcar-logo.webp" x={logo.x} y={logo.y} width={logo.w} height={logo.h} />
        <g mask="url(#bmdo-ring-logo-mask)">
          <rect className="bmdo-ring-logo-sheen" x={logo.x - 60} y={logo.y} width="60" height={logo.h} fill="url(#bmdo-ring-sheen)" />
        </g>
      </g>

      {/* Vòng 12 miền xoay chậm; vệt sáng chạy cùng vòng nên nút vẫn loé đúng lúc. Tên miền luôn đứng thẳng. */}
      <g className="bmdo-ring-wheel">
        <circle cx="200" cy="200" r={RING_R} fill="none" stroke="rgba(222,164,67,0.45)" strokeWidth="1.5" />
        <g transform="rotate(-90 200 200)" filter="url(#bmdo-ring-glow)">
          {COMET_SEGMENTS.map((opacity, i) => (
            <circle
              key={i}
              className="bmdo-ring-comet"
              cx="200"
              cy="200"
              r={RING_R}
              fill="none"
              stroke="#f4d7a6"
              strokeOpacity={opacity}
              strokeWidth={2 + i * 0.5}
              strokeLinecap="round"
              strokeDasharray={`${COMET_SEG} ${RING_C - COMET_SEG}`}
              style={{ ["--bmdo-comet-from" as string]: `${-i * COMET_SEG}`, ["--bmdo-comet-to" as string]: `${-i * COMET_SEG - RING_C}` }}
            />
          ))}
        </g>
        {nodes.map((p) => (
          <g key={p.n} className="bmdo-ring-upright" style={{ transformOrigin: `${p.x.toFixed(2)}px ${p.y.toFixed(2)}px` }}>
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
      </g>

      {/* Tên 12 miền: chạy theo elip cùng nhịp với vòng xoay, luôn nằm ngang và nằm ngoài nút. */}
      {nodes.map((p) => (
        <g
          key={`label-${p.n}`}
          className="bmdo-ring-label"
          transform={`translate(${p.lx.toFixed(2)} ${p.ly.toFixed(2)})`}
          style={{ animationDelay: `${p.labelDelay.toFixed(2)}s` }}
        >
          <rect x={-p.labelW / 2} y="-10.5" width={p.labelW} height="21" rx="10.5" fill="rgba(22,60,62,0.9)" stroke="rgba(228,184,98,0.4)" strokeWidth="0.75" />
          <text y="4.4" textAnchor="middle" fill="#f4d7a6" fontSize="12.5" fontWeight="600">
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

// Hạt sáng cố định vị trí (không random) để server và client render giống nhau.
const HERO_SPARKS = [
  { left: 6, size: 3, delay: 0, duration: 16 },
  { left: 14, size: 2, delay: 5, duration: 19 },
  { left: 23, size: 2.5, delay: 9, duration: 17 },
  { left: 31, size: 2, delay: 2, duration: 21 },
  { left: 42, size: 3, delay: 12, duration: 18 },
  { left: 51, size: 2, delay: 7, duration: 20 },
  { left: 58, size: 2.5, delay: 14, duration: 16 },
  { left: 66, size: 2, delay: 3, duration: 22 },
  { left: 74, size: 3, delay: 10, duration: 18 },
  { left: 82, size: 2, delay: 6, duration: 19 },
  { left: 89, size: 2.5, delay: 13, duration: 17 },
  { left: 95, size: 2, delay: 1, duration: 21 },
];

export function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="bmdo-hero-bg pointer-events-none absolute inset-0 overflow-hidden">
      <span className="bmdo-hero-blob bmdo-hero-blob-a" />
      <span className="bmdo-hero-blob bmdo-hero-blob-b" />
      <span className="bmdo-hero-blob bmdo-hero-blob-c" />
      <span className="bmdo-hero-grid" />
      {HERO_SPARKS.map((p, i) => (
        <span
          key={i}
          className="bmdo-hero-spark"
          style={{ left: `${p.left}%`, width: p.size, height: p.size, animationDelay: `-${p.delay}s`, animationDuration: `${p.duration}s` }}
        />
      ))}
      <span className="bmdo-hero-vignette" />
    </div>
  );
}

// Nền phần vinh danh: vầng sáng trôi, hai luồng đèn sân khấu quét chậm, bụi vàng lấp lánh bay lên.
const GRAD_DUST = Array.from({ length: 32 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  size: 3 + ((i * 7) % 4),
  delay: (i * 1.7) % 14,
  duration: 12 + ((i * 5) % 9),
  drift: ((i % 5) - 2) * 14,
}));

function GradBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <span className="bmdo-grad-glow bmdo-grad-glow-a" />
      <span className="bmdo-grad-glow bmdo-grad-glow-b" />
      <span className="bmdo-grad-beam bmdo-grad-beam-a" />
      <span className="bmdo-grad-beam bmdo-grad-beam-b" />
      {GRAD_DUST.map((d, i) => (
        <span
          key={i}
          className="bmdo-grad-dust"
          style={{
            left: `${d.left}%`,
            width: d.size,
            height: d.size,
            animationDelay: `-${d.delay}s`,
            animationDuration: `${d.duration}s`,
            ["--dust-drift" as string]: `${d.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

export function Heading({ eyebrow, title, gold, light = false, center = false }: { eyebrow: string; title: string; gold: string; light?: boolean; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className={`mt-3 text-balance text-[1.9rem] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[2.6rem] ${light ? "text-vabix-warm" : "text-vabix-deep-teal"}`}>
        {title} <span className="text-vabix-gold">{gold}</span>
      </h2>
    </div>
  );
}

// Thuộc tính để Lightbox mở ảnh lớn (`large`, mặc định chính ảnh đó). Bản nhân đôi của dải chạy không nhận focus.
const lg = (src: string) => src.replace(/\.jpg$/, "-lg.jpg");

function zoomProps(group: string, index: number, src: string, alt: string, duplicate = false, large = src) {
  return {
    "data-zoom-group": group,
    "data-zoom-index": index,
    "data-zoom-src": large,
    "data-zoom-fallback": src,
    "data-zoom-alt": alt,
    className: "bmdo-zoomable",
    ...(duplicate ? { tabIndex: -1 } : { tabIndex: 0, role: "button", "aria-label": `Xem lớn: ${alt}` }),
  };
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
                  <span {...zoomProps("lop", bmdoClassPhotos.indexOf(photo), photo.src, photo.alt, i >= row.length)}>
                    <Image src={photo.src} alt={i >= row.length ? "" : photo.alt} fill unoptimized loading="eager" sizes="368px" className="object-cover" />
                  </span>
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
        <HeroBackdrop />
        <Container className="relative grid gap-10 pb-14 pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] lg:items-center lg:gap-10 lg:pb-20">
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
            <p className="mt-6 border-l-2 border-vabix-gold/80 pl-4">
              <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-vabix-gold sm:text-sm">{k.slogan.lead}</span>
              <span className="bmdo-slogan mt-1.5 flex flex-col gap-1 text-base font-semibold uppercase tracking-[0.1em] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:text-lg">
                {k.slogan.points.map((pt, i) => (
                  <span key={pt} className="inline-flex items-center gap-3">
                    <span aria-hidden="true" className={`h-1.5 w-1.5 rotate-45 bg-vabix-gold ${i === 0 ? "sm:hidden" : ""}`} />
                    <span className="bmdo-slogan-text">{pt}</span>
                    {i < k.slogan.points.length - 1 ? <span className="sr-only">,</span> : null}
                  </span>
                ))}
              </span>
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              {k.eyebrow}. {k.promise}
            </p>
            <p className="mt-3 text-balance text-sm font-medium tracking-wide text-vabix-soft-gold">{k.motto}</p>
            <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
              <Button href="#dang-ky" className="w-full sm:w-auto">
                Đăng ký giữ chỗ →
              </Button>
              <Button href={hotlineHref} variant="outline" className="w-full border-white/40 text-white sm:w-auto">
                Gọi tư vấn {hotline}
              </Button>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[38rem]">
            <BizCarRing className="w-full" />
            {/* Điện thoại: nhãn trên vòng quá nhỏ nên ẩn đi và liệt kê 12 miền ở đây. */}
            <ol className="mt-3 grid grid-cols-3 gap-1.5 sm:hidden">
              {k.domains.map((d, i) => (
                <li key={d} className="flex items-center gap-1.5 rounded-full border border-vabix-gold/25 bg-white/[0.04] px-2 py-1.5 text-[12px] text-vabix-soft-gold">
                  <span className="font-semibold text-vabix-gold">{i + 1}</span>
                  <span className="truncate">{d}</span>
                </li>
              ))}
            </ol>
            <ul className="mt-4 grid grid-cols-3 gap-2">
              {k.stats.map((s, i) => (
                <li
                  key={s.value}
                  className="bmdo-stat flex min-h-[5.5rem] flex-col items-center justify-center rounded-2xl border border-vabix-gold/20 bg-vabix-deep-teal/85 px-3 py-3 text-center backdrop-blur"
                  style={{ ["--bmdo-stat-i" as string]: i }}
                >
                  <p className="text-lg font-semibold uppercase leading-tight text-vabix-gold sm:text-xl">{s.value}</p>
                  <p className="mt-1 text-balance text-[12px] leading-snug text-white/70 sm:text-xs">{s.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Thanh thông tin khoá */}
      <section className="relative z-10 bg-vabix-deep-teal">
        <Container>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[22px] bg-vabix-deep-teal/10 shadow-[0_24px_60px_rgba(0,0,0,0.3)] lg:grid-cols-4">
            {facts.map((f, i) => (
              <div
                key={f.label}
                className={`flex min-h-[7rem] flex-col items-center justify-center bg-white px-4 py-5 text-center sm:min-h-[8.5rem] sm:px-6 sm:py-6 ${i === 2 ? "col-span-2 sm:col-span-1" : ""}`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-vabix-muted">{f.label}</p>
                <span aria-hidden="true" className="mt-2.5 block h-px w-8 bg-vabix-gold/60" />
                <p className="mt-2.5 max-w-[16rem] text-balance text-[17px] font-semibold leading-snug text-vabix-deep-teal">
                  {f.value.split(" • ").map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            ))}
            <div className="col-span-2 flex min-h-[7rem] flex-col items-center justify-center bg-vabix-ivory px-4 py-5 text-center sm:col-span-1 sm:min-h-[8.5rem] sm:px-6 sm:py-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-vabix-muted">Học phí ưu đãi</p>
              <p className="mt-2 flex items-baseline justify-center gap-2">
                <span className="text-2xl font-semibold text-vabix-deep-teal">{k.enrol.price}</span>
                <span className="rounded-full bg-vabix-gold/15 px-2 py-0.5 text-[11px] font-semibold text-vabix-gold">−50%</span>
              </p>
              <p className="mt-0.5 text-xs text-vabix-muted">
                Giá niêm yết <span className="line-through">{k.enrol.listPrice}</span>
              </p>
              <Button href="#dang-ky" variant="teal" className="mt-3 min-h-10 px-6 py-2">
                Giữ chỗ →
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Phim giới thiệu (TVC) */}
      <section className="relative overflow-hidden bg-vabix-deep-teal pb-20 pt-16 sm:pb-24 sm:pt-20" aria-labelledby="bmdo-tvc">
        <HeroBackdrop />
        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Phim giới thiệu</p>
            <h2 id="bmdo-tvc" className="mt-3 text-balance text-[1.9rem] font-semibold leading-[1.15] tracking-[-0.02em] text-vabix-warm sm:text-[2.4rem]">
              BMDO Khoá 04 <span className="text-vabix-gold">trong 60 giây.</span>
            </h2>
          </div>
          <div className="mt-8 sm:mt-10">
            <BmdoTvc
              title="Phim giới thiệu BMDO Khoá 04"
              landscape={{ src: "/videos/bmdo/bmdo-k4-tvc-16x9.mp4", poster: "/videos/bmdo/bmdo-k4-tvc-16x9-poster.jpg" }}
              portrait={{ src: "/videos/bmdo/bmdo-k4-tvc-9x16.mp4", poster: "/videos/bmdo/bmdo-k4-tvc-9x16-poster.jpg" }}
            />
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
          <p className="mt-8 text-center text-sm font-medium text-vabix-muted md:hidden" aria-hidden="true">
            Vuốt ngang để xem 4 chặng →
          </p>
          <div className="-mx-4 mt-4 flex scroll-px-4 snap-x snap-mandatory items-start gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] md:mx-0 md:mt-12 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
            {k.phases.map((phase) => (
              <article
                key={phase.number}
                className="w-[88%] shrink-0 snap-start overflow-hidden rounded-[24px] border border-vabix-deep-teal/10 bg-white md:w-auto"
              >
                <header className="relative bg-vabix-deep-teal px-5 py-5 text-vabix-warm sm:px-7 sm:py-6">
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
                    <li key={d.day} className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-3 px-5 py-4 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-4 sm:px-7 sm:py-5">
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
      <section className="relative overflow-hidden bg-vabix-deep-teal py-16 text-vabix-warm sm:py-24">
        <HeroBackdrop />
        <Container className="relative">
          <RevealOnView className="bmdo-method">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
              <div className="bmdo-rv">
                <Heading light eyebrow="Phương pháp học và hỗ trợ" title={k.method.title} gold={k.method.titleGold} />
              </div>
              <p className="bmdo-rv text-lg leading-relaxed text-white/75" style={{ ["--rv-i" as string]: 1 }}>
                {k.method.body}
              </p>
            </div>

            <p className="bmdo-rv mt-14 text-sm font-semibold uppercase tracking-[0.16em] text-vabix-gold" style={{ ["--rv-i" as string]: 2 }}>
              Chu trình thực hành APPLIER
            </p>
            <ol className="relative mt-8 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 sm:gap-y-8 lg:grid-cols-7">
              <span aria-hidden="true" className="bmdo-applier-line absolute left-6 right-6 top-6 hidden h-px bg-vabix-gold/35 lg:block" />
              {k.method.applier.map((s, i) => (
                <li key={s.title} className="bmdo-rv relative" style={{ ["--rv-i" as string]: 3 + i }}>
                  <span
                    className="bmdo-applier-dot relative grid h-12 w-12 place-items-center rounded-full border border-vabix-gold bg-vabix-deep-teal text-sm font-semibold text-vabix-gold"
                    style={{ animationDelay: `${i}s` }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 font-semibold uppercase tracking-wide">{s.title}</p>
                  <p className="mt-1 text-sm text-white/70">{s.body}</p>
                </li>
              ))}
            </ol>

            <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
              <div className="bmdo-rv" style={{ ["--rv-i" as string]: 10 }}>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-vabix-gold">Một ngày học · 300 phút thực hành có hướng dẫn</p>
                <div className="mt-5 flex overflow-hidden rounded-full border border-white/10 text-xs font-semibold sm:text-sm">
                  {k.method.day.map((b, i) => (
                    <div
                      key={b.label}
                      style={{ flexGrow: b.minutes, ["--rv-i" as string]: 11 + i }}
                      className={`bmdo-day-seg basis-0 px-2 py-3 text-center ${b.label === "MyBizCar" ? "bmdo-day-seg-hot bg-vabix-gold text-vabix-deep-teal" : i % 2 ? "bg-white/10" : "bg-white/[0.04]"}`}
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
              <div className="bmdo-rv" style={{ ["--rv-i" as string]: 12 }}>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-vabix-gold">Ba lớp hỗ trợ cho việc ứng dụng</p>
                <ul className="mt-5 divide-y divide-white/10 overflow-hidden rounded-[20px] border border-vabix-gold/30 bg-vabix-deep-teal/40 backdrop-blur-sm">
                  {k.method.support.map((s, i) => (
                    <li
                      key={s.title}
                      className="bmdo-rv bmdo-support-row flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                      style={{ ["--rv-i" as string]: 13 + i }}
                    >
                      <span className="flex items-center gap-2.5 font-semibold uppercase text-vabix-gold">
                        <span aria-hidden="true" className="bmdo-support-dot h-1.5 w-1.5 rounded-full bg-vabix-gold" style={{ animationDelay: `${i * 0.8}s` }} />
                        {s.title}
                      </span>
                      <span className="text-sm text-white/75 sm:text-right">{s.body}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </RevealOnView>
        </Container>
      </section>

      {/* Kết quả */}
      <section className="bg-vabix-warm py-16 sm:py-24">
        <Container>
          <Heading eyebrow="Kết quả mang về" title={k.outcomes.title} gold={k.outcomes.titleGold} />
          <p className="mt-6 max-w-3xl text-lg text-vabix-muted">{k.outcomes.body}</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {k.outcomes.items.map((o, i) => (
              <article key={o.title} className="rounded-[20px] border border-vabix-deep-teal/10 bg-white p-5 shadow-[0_10px_30px_rgba(22,60,62,0.06)] sm:p-6">
                <span aria-hidden="true" className="block h-1 w-10 rounded-full bg-vabix-gold" />
                <p className="mt-5 text-3xl font-semibold text-vabix-gold">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 font-semibold uppercase tracking-wide text-vabix-deep-teal">{o.title}</h3>
                <p className="mt-2 text-vabix-muted">{o.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Vinh danh học viên tốt nghiệp */}
      <section className="bmdo-grad relative overflow-hidden py-16 sm:py-24" aria-labelledby="bmdo-grad-title">
        <GradBackdrop />
        <Container className="relative">
          <RevealOnView>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end">
              <div className="bmdo-rv">
                <p className="eyebrow">Lễ tốt nghiệp & vinh danh</p>
                <h2 id="bmdo-grad-title" className="mt-3 text-balance text-[1.9rem] font-semibold leading-[1.15] tracking-[-0.02em] text-vabix-deep-teal sm:text-[2.6rem]">
                  Vinh danh những doanh chủ <span className="text-vabix-gold">đã đi trọn hành trình.</span>
                </h2>
              </div>
              <p className="bmdo-rv text-lg leading-relaxed text-vabix-muted" style={{ ["--rv-i" as string]: 1 }}>
                Mỗi tấm chứng nhận là một bản thiết kế quản trị đã được hoàn thiện, phản biện và mang về triển khai trên chính doanh nghiệp của học viên.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:grid-rows-2">
              <figure className="bmdo-rv bmdo-grad-tile col-span-2 aspect-[4/3] lg:row-span-2 lg:aspect-auto" style={{ ["--rv-i" as string]: 2 }}>
                <span {...zoomProps("tot-nghiep", 0, grad.featured[0].src, grad.featured[0].alt, false, lg(grad.featured[0].src))}>
                  <Image src={grad.featured[0].src} alt={grad.featured[0].alt} fill unoptimized sizes="(max-width: 1023px) 100vw, 50vw" className="bmdo-grad-img object-cover" />
                </span>
                <figcaption className="bmdo-grad-caption">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-vabix-soft-gold">Graduation ceremony</span>
                  <span className="mt-1 block text-lg font-semibold sm:text-xl">Lễ tốt nghiệp & vinh danh học viên</span>
                </figcaption>
              </figure>
              <figure className="bmdo-rv bmdo-grad-tile aspect-[4/3]" style={{ ["--rv-i" as string]: 3 }}>
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  src={grad.clip.src}
                  poster={grad.clip.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="Khoảnh khắc lễ tốt nghiệp"
                />
                <span className="bmdo-grad-live" aria-hidden="true">
                  <span className="h-1.5 w-1.5 rounded-full bg-vabix-gold" />
                  Khoảnh khắc
                </span>
              </figure>
              {grad.featured.slice(1).map((ph, i) => (
                <figure key={ph.src} className="bmdo-rv bmdo-grad-tile aspect-[4/3]" style={{ ["--rv-i" as string]: 4 + i }}>
                  <span {...zoomProps("tot-nghiep", 1 + i, ph.src, ph.alt, false, lg(ph.src))}>
                    <Image src={ph.src} alt={ph.alt} fill unoptimized sizes="(max-width: 1023px) 50vw, 25vw" className="bmdo-grad-img object-cover" />
                  </span>
                </figure>
              ))}
            </div>
          </RevealOnView>
        </Container>

        <div className="relative mt-12 sm:mt-14">
          <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.24em] text-vabix-gold">Bức tường vinh danh</p>
          <div className="space-y-4">
            {[grad.wall.slice(0, Math.ceil(grad.wall.length / 2)), grad.wall.slice(Math.ceil(grad.wall.length / 2))].map((row, r) => (
              <div key={r} className="bmdo-marquee">
                <ul className="bmdo-marquee-track" data-reverse={r ? "" : undefined} style={{ ["--bmdo-marquee-duration" as string]: `${row.length * 7}s` }}>
                  {[...row, ...row].map((ph, i) => (
                    <li key={i} className="bmdo-honor mr-4 shrink-0" aria-hidden={i >= row.length || undefined}>
                      <span {...zoomProps("tot-nghiep", 4 + grad.wall.indexOf(ph), ph.src, "Học viên nhận chứng nhận tốt nghiệp", i >= row.length, lg(ph.src))}>
                      <Image
                        src={ph.src}
                        alt={i >= row.length ? "" : "Học viên nhận chứng nhận tốt nghiệp"}
                        width={ph.w}
                        height={ph.h}
                        unoptimized
                        loading="eager"
                        className="h-56 w-auto rounded-[14px] object-cover sm:h-72"
                      />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video các khoá trước */}
      <section className="relative overflow-hidden bg-vabix-deep-teal pb-8 pt-16 text-vabix-warm sm:pt-24" aria-labelledby="bmdo-recap">
        <HeroBackdrop />
        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Nhìn lại các khoá BMDO</p>
            <h2 id="bmdo-recap" className="mt-3 text-balance text-[1.9rem] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[2.4rem]">
              Những khoá học đã diễn ra, <span className="text-vabix-gold">những bản thiết kế đã thành hình.</span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/75">
              Doanh chủ và CEO cùng thực hành trên bài toán thật của doanh nghiệp mình, phản biện đa chiều và mang về bản thiết kế quản trị.
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-5xl sm:mt-10">
            <BmdoTvc
              title="Video các khoá BMDO đã tổ chức"
              landscape={{ src: "/videos/bmdo/bmdo-cac-khoa-720p.mp4", poster: "/videos/bmdo/bmdo-cac-khoa-poster.jpg" }}
              small={{ src: "/videos/bmdo/bmdo-cac-khoa-360p.mp4", poster: "/videos/bmdo/bmdo-cac-khoa-poster.jpg" }}
            />
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
            <div className="bmdo-zalo mt-8 flex flex-col items-center gap-5 rounded-[22px] border border-vabix-gold/40 bg-white/[0.04] p-5 text-center backdrop-blur-sm sm:flex-row sm:gap-6 sm:text-left">
              <a
                href={k.enrol.zaloGroup.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bmdo-zalo-qr relative shrink-0 rounded-2xl bg-white p-2 shadow-[0_12px_30px_rgba(0,0,0,0.3)]"
                aria-label={`Tham gia nhóm Zalo ${k.enrol.zaloGroup.name}`}
              >
                <Image src={k.enrol.zaloGroup.qr} alt={`Mã QR nhóm Zalo ${k.enrol.zaloGroup.name}`} width={608} height={604} unoptimized className="h-40 w-40 sm:h-32 sm:w-32" />
                <span aria-hidden="true" className="bmdo-zalo-scan" />
              </a>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-vabix-gold">Nhóm Zalo lớp học</p>
                <p className="mt-1.5 text-balance text-lg font-semibold leading-snug">{k.enrol.zaloGroup.name}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/65">Quét mã bằng Zalo để nhận thông tin lớp, lịch học và tài liệu.</p>
                <a
                  href={k.enrol.zaloGroup.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-vabix-gold/50 px-4 py-2 text-sm font-semibold text-vabix-soft-gold transition-colors hover:bg-vabix-gold hover:text-vabix-deep-teal"
                >
                  Mở Zalo tham gia nhóm →
                </a>
              </div>
            </div>
            <p className="mt-8 text-sm leading-relaxed text-white/60">{k.enrol.note}</p>
          </div>
          <div className="bmdo-form rounded-[22px] bg-white p-5 text-vabix-ink sm:p-8">
            <LeadForm type="bmdo" program="bmdo" title="Đăng ký giữ chỗ BMDO Khoá 04" />
          </div>
        </Container>
      </section>
      <Lightbox />
    </>
  );
}
