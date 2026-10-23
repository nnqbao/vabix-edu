import { bmdoK4 as k } from "@/content/bmdoK4";
import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumb } from "@/components/ui/Misc";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { siteConfig } from "@/lib/siteConfig";
import { paths } from "@/lib/paths";

const hotline = siteConfig.contact.hotline;
const hotlineHref = siteConfig.contact.hotlineHref;

function BizCarRing({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  const nodes = Array.from({ length: 12 }, (_, i) => {
    const a = ((i * 30 - 90) * Math.PI) / 180;
    return { n: i + 1, x: 200 + 150 * Math.cos(a), y: 200 + 150 * Math.sin(a), gold: i % 3 === 0 };
  });
  const line = dark ? "rgba(228,184,98,0.35)" : "rgba(22,60,62,0.16)";
  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label="Mô hình BizCar — 12 miền quản trị">
      <circle cx="200" cy="200" r="190" fill="none" stroke={line} />
      <circle cx="200" cy="200" r="150" fill="none" stroke={dark ? "rgba(222,164,67,0.6)" : "rgba(222,164,67,0.55)"} strokeWidth="1.5" />
      <circle cx="200" cy="200" r="104" fill="none" stroke={line} />
      <circle cx="200" cy="200" r="62" fill="#163c3e" stroke="#dea443" strokeWidth="2" />
      <text x="200" y="194" textAnchor="middle" fill="#dea443" fontSize="26" fontWeight="700">BIZ</text>
      <text x="200" y="224" textAnchor="middle" fill="#fcfbf8" fontSize="26" fontWeight="700">CAR</text>
      {nodes.map((p) => (
        <g key={p.n}>
          <circle cx={p.x} cy={p.y} r="15" fill={p.gold ? "#dea443" : "#163c3e"} stroke={dark ? "rgba(252,251,248,0.25)" : "#fcfbf8"} strokeWidth="2" />
          <text x={p.x} y={p.y + 4.5} textAnchor="middle" fill={p.gold ? "#163c3e" : "#fcfbf8"} fontSize="12" fontWeight="700">
            {p.n}
          </text>
        </g>
      ))}
    </svg>
  );
}

function Heading({ eyebrow, title, gold, light = false }: { eyebrow: string; title: string; gold: string; light?: boolean }) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className={`mt-3 text-balance text-[1.9rem] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[2.6rem] ${light ? "text-vabix-warm" : "text-vabix-deep-teal"}`}>
        {title} <span className="text-vabix-gold">{gold}</span>
      </h2>
    </div>
  );
}

export function BmdoLanding() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-vabix-deep-teal pt-28 text-vabix-warm sm:pt-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 60% 70% at 85% 30%, rgba(222,164,67,0.16), transparent 65%)" }}
        />
        <BizCarRing dark className="pointer-events-none absolute -right-40 top-24 hidden w-[44rem] opacity-15 lg:block" />
        <Container className="relative grid gap-12 pb-16 pt-10 sm:pb-20 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
          <div>
            <Breadcrumb
              light
              items={[
                { name: "Trang chủ", href: paths.home },
                { name: "Đào tạo & huấn luyện", href: paths.training },
                { name: "BMDO" },
              ]}
            />
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-vabix-soft-gold">
              BMDO / {k.cohort} · {k.eyebrow}
            </p>
            <span aria-hidden="true" className="mt-5 block h-px w-24 bg-vabix-gold" />
            <h1 className="mt-6 text-balance font-semibold uppercase leading-[1.05] tracking-[-0.01em]">
              <span className="block text-[2.6rem] text-vabix-warm sm:text-6xl">{k.titleLead}</span>
              <span className="mt-4 block text-xl normal-case leading-snug text-vabix-gold sm:text-[1.9rem]">{k.titleGold}</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-white/75 sm:text-lg">{k.promise}</p>
            <p className="mt-2 text-sm font-medium tracking-wide text-vabix-soft-gold">{k.motto}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#dang-ky">Đăng ký giữ chỗ →</Button>
              <Button href={hotlineHref} variant="outline" className="border-white/40 text-white">
                Gọi tư vấn {hotline}
              </Button>
            </div>
          </div>

          <div className="rounded-[26px] border border-vabix-gold/35 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-vabix-soft-gold">Dự kiến khai giảng</p>
            <p className="mt-2 text-4xl font-semibold text-vabix-warm">{k.enrol.opening}</p>
            <dl className="mt-6 space-y-4 border-t border-white/10 pt-6 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-white/55">Lịch học</dt>
                <dd className="mt-1 text-white/90">{k.enrol.schedule}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-white/55">Địa điểm</dt>
                <dd className="mt-1 text-white/90">{k.enrol.venue}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-white/55">Học phí ưu đãi</dt>
                <dd className="mt-1 flex flex-wrap items-baseline gap-x-3">
                  <span className="text-3xl font-semibold text-vabix-gold">{k.enrol.price}</span>
                  <span className="text-white/50 line-through">{k.enrol.listPrice}</span>
                </dd>
                <dd className="mt-2 inline-block rounded-full border border-vabix-gold/45 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-vabix-soft-gold">
                  {k.enrol.discount}
                </dd>
              </div>
            </dl>
          </div>
        </Container>
        <Container className="relative pb-14">
          <ul className="grid overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.05] sm:grid-cols-3">
            {k.stats.map((s, i) => (
              <li key={s.value} className={`px-6 py-5 ${i ? "border-t border-white/10 sm:border-l sm:border-t-0" : ""}`}>
                <p className="text-2xl font-semibold uppercase text-vabix-gold">{s.value}</p>
                <p className="mt-1 text-sm text-white/70">{s.label}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Tổng quan */}
      <section className="bg-vabix-warm py-16 sm:py-24">
        <Container>
          <Heading eyebrow="Tổng quan chương trình" title={k.overview.title} gold={k.overview.titleGold} />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-vabix-muted">{k.overview.body}</p>
          <div className="mt-10 rounded-[22px] bg-vabix-deep-teal p-6 text-vabix-warm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-vabix-gold">Phương pháp tiếp cận</p>
            <p className="mt-3 max-w-4xl text-lg leading-relaxed">{k.overview.approach}</p>
          </div>
          <p className="mt-14 text-sm font-semibold uppercase tracking-[0.16em] text-vabix-deep-teal">12 miền quản trị / Một bản thiết kế</p>
          <div className="mt-6 grid items-center gap-10 lg:grid-cols-2">
            <BizCarRing className="mx-auto w-full max-w-md" />
            <ol className="space-y-6">
              {k.overview.steps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-bold ${i % 2 ? "bg-vabix-deep-teal text-vabix-warm" : "bg-vabix-gold text-vabix-deep-teal"}`}>
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold uppercase tracking-wide text-vabix-deep-teal">{s.title}</p>
                    <p className="mt-1 text-vabix-muted">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <p className="mt-10 rounded-[18px] bg-vabix-ivory p-5 text-vabix-ink sm:p-6">
            <span className="font-semibold text-vabix-deep-teal">Nguyên tắc: </span>
            {k.overview.principle}
          </p>
        </Container>
      </section>

      {/* Lộ trình 12 ngày */}
      <section className="bg-vabix-ivory py-16 sm:py-24" id="lo-trinh">
        <Container>
          <Heading eyebrow="Lộ trình 12 ngày học" title="Bốn chặng," gold="mười hai miền quản trị." />
          <p className="mt-6 max-w-3xl text-lg text-vabix-muted">
            Mỗi ngày học gắn với một bộ phận của Chiếc Xe Doanh Nghiệp và kết thúc bằng một thiết kế đầu ra cụ thể cho doanh nghiệp của học viên.
          </p>
          <div className="mt-12 space-y-14">
            {k.phases.map((phase) => (
              <div key={phase.number} className="grid gap-6 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-10">
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-vabix-gold">
                    {phase.number} / {phase.label}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-vabix-deep-teal">{phase.title}</h3>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-vabix-muted">{phase.days} / 12</p>
                  <p className="mt-3 text-vabix-muted">{phase.lead}</p>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {phase.sessions.map((d) => (
                    <article key={d.day} className="flex flex-col rounded-[20px] border border-vabix-deep-teal/10 bg-white p-6">
                      <p className="text-3xl font-semibold text-vabix-gold">{d.day}</p>
                      <h4 className="mt-3 text-lg font-semibold leading-snug text-vabix-deep-teal">{d.title}</h4>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-vabix-muted">{d.part}</p>
                      <p className="mt-4 text-[15px] leading-relaxed text-vabix-ink">{d.body}</p>
                      <div className="mt-auto pt-5">
                        <p className="rounded-xl bg-vabix-ivory p-4 text-sm leading-relaxed text-vabix-ink">
                          <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-vabix-gold">Thiết kế đầu ra</span>
                          <span className="mt-1 block">{d.output}</span>
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

      {/* Phương pháp */}
      <section className="bg-vabix-deep-teal py-16 text-vabix-warm sm:py-24">
        <Container>
          <Heading light eyebrow="Phương pháp học và hỗ trợ" title={k.method.title} gold={k.method.titleGold} />
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/75">{k.method.body}</p>
          <p className="mt-12 text-sm font-semibold uppercase tracking-[0.16em] text-vabix-gold">Chu trình thực hành APPLIER</p>
          <ol className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
            {k.method.applier.map((s, i) => (
              <li key={s.title} className="rounded-[18px] border border-white/10 bg-white/[0.04] p-5">
                <p className="text-sm font-semibold text-vabix-gold">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-2 font-semibold uppercase tracking-wide">{s.title}</p>
                <p className="mt-1 text-sm text-white/70">{s.body}</p>
              </li>
            ))}
          </ol>

          <p className="mt-14 text-sm font-semibold uppercase tracking-[0.16em] text-vabix-gold">Một ngày học / 300 phút thực hành có hướng dẫn</p>
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

          <p className="mt-14 text-sm font-semibold uppercase tracking-[0.16em] text-vabix-gold">Ba lớp hỗ trợ cho việc ứng dụng</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {k.method.support.map((s) => (
              <div key={s.title} className="rounded-[20px] border border-vabix-gold/30 p-6">
                <p className="text-xl font-semibold uppercase text-vabix-gold">{s.title}</p>
                <p className="mt-2 text-white/75">{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Kết quả */}
      <section className="bg-vabix-warm py-16 sm:py-24">
        <Container>
          <Heading eyebrow="Kết quả mang về" title={k.outcomes.title} gold={k.outcomes.titleGold} />
          <p className="mt-6 max-w-3xl text-lg text-vabix-muted">{k.outcomes.body}</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {k.outcomes.items.map((o, i) => (
              <article key={o.title} className="flex gap-5 rounded-[20px] border border-vabix-deep-teal/10 bg-white p-6">
                <p className="text-3xl font-semibold text-vabix-gold">{String(i + 1).padStart(2, "0")}</p>
                <div>
                  <h3 className="font-semibold uppercase tracking-wide text-vabix-deep-teal">{o.title}</h3>
                  <p className="mt-2 text-vabix-muted">{o.body}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Đăng ký */}
      <section id="dang-ky" className="scroll-mt-24 bg-vabix-deep-teal py-16 text-vabix-warm sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <div>
            <span aria-hidden="true" className="block h-px w-full bg-vabix-gold/50" />
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-vabix-gold">BMDO / {k.cohort}</p>
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
