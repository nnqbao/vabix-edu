import Image from "next/image";
import Link from "next/link";
import { aiWorklab as w } from "@/content/aiWorklab";
import { publishedExperts } from "@/platform/cms/catalog";
import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumb } from "@/components/ui/Misc";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { HeroBackdrop, Heading } from "@/components/templates/BmdoLanding";
import { RevealOnView } from "@/components/templates/RevealOnView";
import { siteConfig } from "@/lib/siteConfig";
import { paths } from "@/lib/paths";

const hotline = siteConfig.contact.hotline;
const hotlineHref = siteConfig.contact.hotlineHref;

// Sơ đồ "Work → Workflow": 4 bước D4 nối bằng đường dẫn có hạt sáng chạy.
function D4Flow({ className = "" }: { className?: string }) {
  const nodes = [
    { x: 70, y: 300 },
    { x: 170, y: 190 },
    { x: 290, y: 250 },
    { x: 390, y: 120 },
  ];
  const d = "M70 300 C 110 240, 130 200, 170 190 S 250 260, 290 250 S 360 150, 390 120";
  return (
    <svg viewBox="0 0 460 380" className={`wl-flow ${className}`} role="img" aria-label="Lộ trình D4: Decode → Delegate → Design → Deploy">
      <defs>
        <linearGradient id="wl-path" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#e4b862" stopOpacity="0.25" />
          <stop offset="1" stopColor="#f4d7a6" />
        </linearGradient>
      </defs>
      <text x="30" y="350" fill="#fcfbf8" fillOpacity="0.55" fontSize="13" fontWeight="600" letterSpacing="2">
        WORK
      </text>
      <text x="350" y="70" fill="#dea443" fontSize="13" fontWeight="700" letterSpacing="2">
        WORKFLOW
      </text>
      <path d={d} fill="none" stroke="url(#wl-path)" strokeWidth="2" />
      <path className="wl-flow-dash" d={d} fill="none" stroke="#f4d7a6" strokeWidth="2" strokeDasharray="4 10" />
      {[0, 1, 2].map((i) => (
        <circle key={i} r="4" fill="#fff3d6" className="wl-flow-dot">
          <animateMotion dur="5s" begin={`${i * 1.6}s`} repeatCount="indefinite" path={d} />
        </circle>
      ))}
      {nodes.map((n, i) => (
        <g key={i} className="wl-flow-node" style={{ ["--i" as string]: i }}>
          <circle cx={n.x} cy={n.y} r="38" fill="#163c3e" stroke="#dea443" strokeWidth="1.5" />
          <text x={n.x} y={n.y - 4} textAnchor="middle" fill="#dea443" fontSize="11" fontWeight="700">
            {String(i + 1).padStart(2, "0")}
          </text>
          <text x={n.x} y={n.y + 12} textAnchor="middle" fill="#fcfbf8" fontSize="10.5" fontWeight="700" letterSpacing="0.3">
            {w.d4[i].code.toUpperCase()}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function AiWorklabLanding() {
  const expert = publishedExperts().find((e) => e.slug === w.expertSlug);
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-vabix-deep-teal pt-28 text-vabix-warm sm:pt-32">
        <HeroBackdrop />
        <Container className="relative grid gap-10 pb-14 pt-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center lg:gap-12 lg:pb-16">
          <div>
            <Breadcrumb
              light
              items={[
                { name: "Trang chủ", href: paths.home },
                { name: "Đào tạo & huấn luyện", href: paths.training },
                { name: "AI WorkLab" },
              ]}
            />
            <p className="mt-10 inline-flex items-center gap-2 rounded-full border border-vabix-gold/45 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-vabix-soft-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-vabix-gold" aria-hidden="true" />
              {w.badge}
            </p>
            <h1 className="mt-6">
              <span className="block text-[3.2rem] font-bold leading-none tracking-[0.02em] sm:text-[5rem]">{w.title}</span>
              <span className="mt-3 block text-xl font-semibold uppercase tracking-[0.2em] text-vabix-gold sm:text-2xl">{w.tagline}</span>
            </h1>
            <p className="mt-5 max-w-xl text-balance text-lg font-medium text-white/90">{w.subtitle}</p>
            <p className="mt-3 max-w-xl leading-relaxed text-white/70">{w.lead}</p>
            {expert ? (
              <Link href={`/mang-luoi/chuyen-gia/${expert.slug}`} className="group mt-7 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.05] py-1.5 pl-1.5 pr-5 transition-colors hover:border-vabix-gold/60">
                <Image src={expert.portrait} alt={expert.name} width={96} height={96} unoptimized className="h-11 w-11 rounded-full object-cover object-top" />
                <span>
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-vabix-soft-gold">Chuyên gia huấn luyện</span>
                  <span className="block font-semibold group-hover:text-vabix-gold">{expert.name}</span>
                </span>
              </Link>
            ) : null}
            <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
              <Button href="#dang-ky" className="w-full sm:w-auto">
                Đăng ký tư vấn chương trình →
              </Button>
              <Button href={hotlineHref} variant="outline" className="w-full border-white/40 text-white sm:w-auto">
                Gọi {hotline}
              </Button>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[30rem]">
            <D4Flow className="w-full" />
            <ul className="mt-4 grid grid-cols-3 gap-2">
              {w.stats.map((s, i) => (
                <li
                  key={s.value}
                  className="bmdo-stat flex min-h-[5.5rem] flex-col items-center justify-center rounded-2xl border border-vabix-gold/20 bg-vabix-deep-teal/85 px-2 py-3 text-center backdrop-blur"
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

      {/* Tổng quan */}
      <section className="bg-vabix-warm py-16 sm:py-24">
        <Container>
          <RevealOnView>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
              <div className="bmdo-rv">
                <Heading eyebrow="01 · Tổng quan" title={w.overview.title} gold={w.overview.titleGold} />
                <p className="mt-5 text-lg font-medium text-vabix-deep-teal">{w.overview.lead}</p>
                <p className="mt-4 leading-relaxed text-vabix-muted">{w.overview.body}</p>
              </div>
              <div className="bmdo-rv space-y-4" style={{ ["--rv-i" as string]: 1 }}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-vabix-gold">Đối tượng phù hợp</p>
                <ul className="grid gap-3 sm:grid-cols-3">
                  {w.overview.audience.map((a) => (
                    <li key={a.title} className="rounded-[18px] border border-vabix-deep-teal/10 bg-white p-5">
                      <p className="font-semibold text-vabix-deep-teal">{a.title}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-vabix-muted">{a.body}</p>
                    </li>
                  ))}
                </ul>
                <dl className="grid gap-px overflow-hidden rounded-[18px] bg-vabix-deep-teal/10 sm:grid-cols-3">
                  {w.overview.format.map((f) => (
                    <div key={f.k} className="bg-vabix-ivory px-5 py-4">
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-vabix-muted">{f.k}</dt>
                      <dd className="mt-1 text-sm font-semibold text-vabix-deep-teal">{f.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <div className="bmdo-rv mt-12 rounded-[24px] bg-vabix-deep-teal p-6 text-vabix-warm sm:p-8" style={{ ["--rv-i" as string]: 2 }}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-vabix-gold">Kết quả kỳ vọng sau chương trình</p>
              <ul className="mt-5 grid gap-x-8 gap-y-3 md:grid-cols-2">
                {w.overview.outcomes.map((o) => (
                  <li key={o} className="flex gap-3 leading-relaxed text-white/85">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-vabix-gold" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </RevealOnView>
        </Container>
      </section>

      {/* D4 + phương pháp */}
      <section className="relative overflow-hidden bg-vabix-deep-teal py-16 text-vabix-warm sm:py-24">
        <HeroBackdrop />
        <Container className="relative">
          <RevealOnView>
            <div className="bmdo-rv">
              <Heading light eyebrow="02 · Kiến trúc chương trình" title="D4 AI Work Transformation" gold="— từ biết dùng AI đến thiết kế cách làm việc với AI" />
            </div>
            <ol className="relative mt-12 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
              <span aria-hidden="true" className="bmdo-applier-line absolute left-[12%] right-[12%] top-7 hidden h-px md:block" />
              {w.d4.map((s, i) => (
                <li key={s.code} className="bmdo-rv relative flex flex-col items-start md:items-center md:text-center" style={{ ["--rv-i" as string]: 1 + i }}>
                  <span className="bmdo-applier-dot relative grid h-14 w-14 place-items-center rounded-full border border-vabix-gold bg-vabix-deep-teal text-sm font-bold text-vabix-gold" style={{ animationDelay: `${i * 1.75}s` }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 text-lg font-semibold uppercase tracking-wide">{s.code}</p>
                  <p className="mt-1 text-sm text-white/70">{s.body}</p>
                </li>
              ))}
            </ol>

            <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
              <div className="bmdo-rv" style={{ ["--rv-i" as string]: 5 }}>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-vabix-gold">Phương pháp học · 70% thực hành</p>
                <div className="mt-5 flex overflow-hidden rounded-full border border-white/10 text-xs font-semibold sm:text-sm">
                  {w.method.map((m) => (
                    <div
                      key={m.label}
                      style={{ flexGrow: m.pct }}
                      className={`basis-0 px-2 py-3 text-center ${m.label === "Worklab" ? "bmdo-day-seg-hot relative overflow-hidden bg-vabix-gold text-vabix-deep-teal" : m.label === "Demo" ? "bg-white/10" : "bg-white/[0.04]"}`}
                    >
                      {m.pct}%
                    </div>
                  ))}
                </div>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {w.method.map((m) => (
                    <li key={m.label} className="text-sm text-white/75">
                      <span className="font-semibold uppercase tracking-wide text-vabix-soft-gold">
                        {m.pct}% {m.label}
                      </span>{" "}
                      — {m.body}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bmdo-rv" style={{ ["--rv-i" as string]: 6 }}>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-vabix-gold">Nguyên tắc thiết kế</p>
                <ul className="mt-5 divide-y divide-white/10 overflow-hidden rounded-[20px] border border-vabix-gold/30 bg-vabix-deep-teal/40">
                  {w.principles.map((p) => (
                    <li key={p.k} className="bmdo-support-row px-5 py-3.5">
                      <p className="font-semibold text-vabix-gold">{p.k}</p>
                      <p className="mt-0.5 text-sm text-white/75">{p.v}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </RevealOnView>
        </Container>
      </section>

      {/* Pre-work */}
      <section className="bg-vabix-ivory py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:items-center lg:gap-14">
          <div>
            <Heading eyebrow="03 · Trước khóa học" title="AI Work Diagnostic" gold="— học trên việc thật" />
            <p className="mt-5 leading-relaxed text-vabix-muted">{w.diagnostic.lead}</p>
            <p className="mt-4 rounded-[16px] border-l-2 border-vabix-gold bg-white px-5 py-4 text-sm leading-relaxed text-vabix-ink">{w.diagnostic.note}</p>
          </div>
          <div>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {w.diagnostic.items.map((it, i) => (
                <li key={it} className="rounded-[16px] border border-vabix-deep-teal/10 bg-white p-4">
                  <p className="text-xs font-semibold text-vabix-gold">{String(i + 1).padStart(2, "0")}</p>
                  <p className="mt-1.5 text-sm font-semibold leading-snug text-vabix-deep-teal">{it}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-[18px] bg-vabix-deep-teal px-5 py-4 text-sm leading-relaxed text-white/85">
              <span className="font-semibold text-vabix-gold">Đầu ra: </span>
              {w.diagnostic.output}
            </p>
          </div>
        </Container>
      </section>

      {/* 4 buổi */}
      <section className="bg-vabix-warm py-16 sm:py-24" id="noi-dung">
        <Container>
          <Heading center eyebrow="04 · Nội dung" title="04 buổi × 03 giờ," gold="mỗi buổi một sản phẩm mang về" />
          <div className="mt-12 space-y-6">
            {w.sessions.map((s) => (
              <article key={s.no} className="overflow-hidden rounded-[26px] border border-vabix-deep-teal/10 bg-white lg:grid lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
                <div className="p-6 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-vabix-gold">
                    Buổi {s.no} · {s.code}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-vabix-deep-teal sm:text-[1.7rem]">{s.title}</h3>
                  <p className="mt-2 text-vabix-muted">{s.goal}</p>
                  <ol className="mt-5 space-y-2.5">
                    {s.modules.map((m, i) => (
                      <li key={m} className="flex gap-3 text-[15px] leading-snug text-vabix-ink">
                        <span className="mt-0.5 text-xs font-semibold text-vabix-gold">{String(i + 1).padStart(2, "0")}</span>
                        {m}
                      </li>
                    ))}
                  </ol>
                  <p className="mt-6 rounded-xl bg-vabix-ivory p-4 text-sm leading-relaxed text-vabix-ink">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-vabix-gold">Output buổi {s.no}</span>
                    <span className="mt-1 block">{s.output}</span>
                  </p>
                </div>
                <div className="relative overflow-hidden bg-vabix-deep-teal p-6 text-vabix-warm sm:p-8">
                  <span aria-hidden="true" className="absolute -right-6 -top-8 text-[8rem] font-bold leading-none text-white/[0.04]">
                    {s.no}
                  </span>
                  <p className="relative text-xs font-semibold uppercase tracking-[0.2em] text-vabix-gold">Công cụ trọng tâm</p>
                  <p className="relative mt-2 text-xl font-semibold">{s.tool.name}</p>
                  <ul className="relative mt-5 space-y-2.5">
                    {s.tool.items.map((t) => (
                      <li key={t.k + t.v} className="flex items-start gap-3 text-sm text-white/85">
                        <span className="grid h-7 min-w-7 shrink-0 place-items-center rounded-full border border-vabix-gold/50 px-1.5 text-[11px] font-bold text-vabix-gold">{t.k}</span>
                        <span className="pt-1">{t.v}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Use case library */}
      <section className="bg-vabix-ivory py-16 sm:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Heading eyebrow="05 · Thư viện use case" title="Bài toán doanh nghiệp" gold="theo nhóm công việc" />
            <p className="max-w-md text-vabix-muted">Use case gợi ý — case thực hành chính thức được tùy biến theo ngành, dữ liệu và quy trình của từng doanh nghiệp.</p>
          </div>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {w.useCases.map((u) => (
              <li key={u.group} className="rounded-[18px] border border-vabix-deep-teal/10 bg-white p-5 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-vabix-gold/60">
                <p className="font-semibold uppercase tracking-wide text-vabix-deep-teal">{u.group}</p>
                <p className="mt-2 text-sm leading-relaxed text-vabix-muted">{u.items}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-4xl text-sm italic text-vabix-muted">{w.useCaseNote}</p>
        </Container>
      </section>

      {/* Toolkit + deliverables */}
      <section className="relative overflow-hidden bg-vabix-deep-teal py-16 text-vabix-warm sm:py-24">
        <HeroBackdrop />
        <Container className="relative grid gap-12 lg:grid-cols-2 lg:gap-14">
          <div>
            <Heading light eyebrow="06 · Bộ công cụ" title="Frameworks & templates" gold="học viên mang về" />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {w.toolkit.map((t) => (
                <li key={t.k} className="rounded-[16px] border border-white/10 bg-white/[0.04] p-4">
                  <p className="font-semibold text-vabix-gold">{t.k}</p>
                  <p className="mt-1 text-sm text-white/75">{t.v}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Heading light eyebrow="07 · Deliverables" title="Doanh nghiệp nhận được gì" gold="ngoài 12 giờ đào tạo" />
            <ol className="mt-8 grid gap-2 sm:grid-cols-2">
              {w.deliverables.map((d, i) => (
                <li key={d} className="flex items-center gap-3 rounded-full border border-vabix-gold/30 px-4 py-2.5 text-sm">
                  <span className="text-xs font-bold text-vabix-gold">{String(i + 1).padStart(2, "0")}</span>
                  {d}
                </li>
              ))}
            </ol>
            <p className="mt-6 rounded-[18px] bg-white/[0.06] p-5 text-sm leading-relaxed text-white/80">{w.deliverablesNote}</p>
          </div>
        </Container>
      </section>

      {/* Triển khai */}
      <section className="bg-vabix-warm py-16 sm:py-24">
        <Container>
          <Heading eyebrow="08 · Triển khai" title="4 buổi trong 2–4 tuần," gold="có khoảng thử nghiệm giữa các buổi" />
          <ol className="mt-10 grid gap-3 md:grid-cols-3 lg:grid-cols-6">
            {w.timeline.map((t, i) => (
              <li key={t.what} className={`rounded-[18px] p-5 ${i === 0 || i === w.timeline.length - 1 ? "border border-dashed border-vabix-gold/60 bg-vabix-ivory" : "bg-vabix-deep-teal text-vabix-warm"}`}>
                <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${i === 0 || i === w.timeline.length - 1 ? "text-vabix-gold" : "text-vabix-soft-gold"}`}>{t.when}</p>
                <p className={`mt-2 font-semibold ${i === 0 || i === w.timeline.length - 1 ? "text-vabix-deep-teal" : ""}`}>{t.what}</p>
                <p className={`mt-1.5 text-sm leading-relaxed ${i === 0 || i === w.timeline.length - 1 ? "text-vabix-muted" : "text-white/70"}`}>{t.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <div className="rounded-[22px] border border-vabix-deep-teal/10 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-vabix-gold">Gói tiêu chuẩn</p>
              <ul className="mt-4 space-y-2 text-sm text-vabix-ink">
                {w.scope.included.map((x) => (
                  <li key={x} className="flex gap-2.5">
                    <span aria-hidden="true" className="text-vabix-gold">✓</span>
                    {x}
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-vabix-deep-teal/10 pt-3 text-xs leading-relaxed text-vabix-muted">
                <span className="font-semibold">Không bao gồm: </span>
                {w.scope.excluded}
              </p>
            </div>
            <div className="rounded-[22px] border border-vabix-deep-teal/10 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-vabix-gold">Tùy biến theo doanh nghiệp</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {w.customize.map((c) => (
                  <li key={c} className="rounded-full border border-vabix-deep-teal/15 px-3 py-1 text-sm text-vabix-deep-teal">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[22px] bg-vabix-deep-teal p-6 text-vabix-warm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-vabix-gold">Phương án mở rộng</p>
              <ol className="mt-4 space-y-3">
                {w.scope.phases.map((p) => (
                  <li key={p.k} className="text-sm leading-relaxed text-white/85">
                    <span className="font-semibold text-vabix-soft-gold">{p.k}</span> — {p.v}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      {/* Chuyên gia + thông điệp */}
      {expert ? (
        <section className="overflow-hidden bg-vabix-ivory py-16 sm:py-20">
          <Container className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
            <div className="relative mx-auto w-full max-w-[22rem]">
              <span aria-hidden="true" className="absolute inset-[-8%] rounded-full bg-[radial-gradient(closest-side,rgba(222,164,67,0.3),transparent)] blur-2xl" />
              <Image src={expert.portrait} alt={expert.name} width={720} height={900} unoptimized className="relative aspect-[4/5] w-full rounded-[26px] border border-vabix-gold/40 object-cover object-top shadow-[0_24px_60px_rgba(22,60,62,0.2)]" />
            </div>
            <div>
              <p className="eyebrow">Chuyên gia huấn luyện</p>
              <h2 className="mt-3 text-[2rem] font-semibold tracking-[-0.02em] text-vabix-deep-teal sm:text-[2.6rem]">{expert.name}</h2>
              <p className="mt-1 font-semibold text-vabix-gold">{expert.title}</p>
              <p className="mt-5 text-lg leading-relaxed text-vabix-ink">{expert.shortBio}</p>
              <blockquote className="mt-8 border-l-2 border-vabix-gold pl-5 text-lg italic leading-relaxed text-vabix-deep-teal">“{w.message}”</blockquote>
              <Link href={`/mang-luoi/chuyen-gia/${expert.slug}`} className="mt-6 inline-block text-sm font-semibold text-vabix-deep-teal hover:text-vabix-gold">
                Xem hồ sơ chuyên gia →
              </Link>
            </div>
          </Container>
        </section>
      ) : null}

      {/* Đăng ký */}
      <section id="dang-ky" className="scroll-mt-24 bg-vabix-deep-teal py-16 text-vabix-warm sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-vabix-gold">VABIX AI WorkLab</p>
            <h2 className="mt-3 text-3xl font-semibold uppercase sm:text-4xl">Triển khai cho doanh nghiệp</h2>
            <p className="mt-4 max-w-md leading-relaxed text-white/75">
              Chương trình tổ chức riêng (in-house) cho từng doanh nghiệp. Để lại thông tin để VABIX khảo sát nhu cầu, đề xuất cấu hình lớp và lịch triển khai.
            </p>
            <dl className="mt-8 space-y-4">
              <div>
                <dt className="text-xs uppercase tracking-[0.18em] text-white/55">Thời lượng</dt>
                <dd className="mt-1 text-lg">04 buổi × 03 giờ · trong 2–4 tuần</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.18em] text-white/55">Hình thức</dt>
                <dd className="mt-1 text-lg">Onsite / Hybrid · 25–50 học viên mỗi lớp</dd>
              </div>
            </dl>
            <div className="mt-8 border-t border-white/15 pt-6">
              <p className="text-xs uppercase tracking-[0.18em] text-white/55">Hotline tư vấn</p>
              <a href={hotlineHref} className="mt-2 inline-block text-3xl font-semibold text-vabix-warm hover:text-vabix-gold">
                {hotline}
              </a>
            </div>
          </div>
          <div className="bmdo-form rounded-[22px] bg-white p-5 text-vabix-ink sm:p-8">
            <LeadForm type="corporate-training" program="ai-worklab" title="Đăng ký tư vấn AI WorkLab" />
          </div>
        </Container>
      </section>
    </>
  );
}
