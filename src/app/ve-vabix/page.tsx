import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Section";
import { CTASection } from "@/components/sections/CTASection";
import * as aboutVi from "@/content/about";
import * as aboutEn from "@/content/en/about";
import * as brandVi from "@/content/brand";
import * as brandEn from "@/content/en/brand";
import { pillars as pillarsVi } from "@/content/pillars";
import { pillars as pillarsEn } from "@/content/en/pillars";
import { partners } from "@/content/network";
import { featuredExperts } from "@/content/experts";
import { publishedFeaturedExperts } from "@/platform/cms/catalog";
import { getLocale } from "@/i18n/server";
import { ExpertCard, PartnerLogo } from "@/components/cards/Cards";
import { Button } from "@/components/ui/Button";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/siteConfig";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata() {
  const en = (await getLocale()) === "en";
  return createMetadata({
    title: en ? "About VABIX" : "Về VABIX",
    description: (en ? brandEn : brandVi).positioning,
    path: en ? "/en/ve-vabix" : "/ve-vabix",
  });
}

const partnerCaptionsEn: Record<string, string> = {
  vnpt: "Vietnam Posts and Telecommunications Group",
  mb: "Military Commercial Joint Stock Bank",
  suspro: "SUSPRO Joint Stock Company",
  sihub: "Saigon Innovation Hub (HCMC)",
  csed: "Centre for Enterprise Support and Economic Development",
};

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
  const missionText = mission;
  const founderTitle = en ? "Founder of VABIX · Chairman and CEO" : siteConfig.founder.role;
  return (
    <>
      <PageHero
        eyebrow={en ? "About VABIX" : "Về VABIX"}
        title={en ? "An ecosystem of practical knowledge and business development" : "Hệ sinh thái tri thức thực chiến và phát triển doanh nghiệp"}
        description={positioning}
        crumbs={[{ name: en ? "Home" : "Trang chủ", href: "/" }, { name: en ? "About VABIX" : "Về VABIX" }]}
      />

      <Container className="py-16">
        <p className="eyebrow">{tagline}</p>
        <h2 className="mt-3 text-3xl font-semibold text-vabix-deep-teal" id="ve-vabix">{en ? "Who is VABIX?" : "VABIX là ai?"}</h2>
        {aboutIntro.map((p) => (
          <p key={p} className="measure mt-4 text-lg text-vabix-muted">
            {p}
          </p>
        ))}
      </Container>

      <section id="su-menh" className="bg-vabix-ivory py-16">
        <Container>
          <p className="eyebrow">{en ? "Mission" : "Sứ mệnh"}</p>
          <p className="mt-4 max-w-4xl text-xl font-medium text-vabix-deep-teal">{missionText}</p>
          <p className="measure mt-4 text-vabix-muted">{missionDetail}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {missionChannels.map((c) => (
              <li key={c} className="bg-white p-4 font-semibold text-vabix-deep-teal">
                {c}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section id="khat-vong" className="py-16">
        <Container>
          <p className="eyebrow">{en ? "Aspiration 2031" : "Khát vọng 2031"}</p>
          <p className="mt-2 text-sm font-medium text-vabix-gold">{en ? "A direction for the future — not an achievement yet." : "Định hướng tương lai — chưa phải thành tích đã đạt."}</p>
          <p className="mt-4 max-w-4xl text-xl font-medium text-vabix-deep-teal">{aspiration2031}</p>
          <p className="measure mt-4 text-vabix-muted">{aspirationDetail}</p>
          <blockquote className="mt-8 max-w-3xl border-l-2 border-vabix-gold pl-5 text-lg text-vabix-deep-teal">
            {aspirationHighlight}
          </blockquote>
        </Container>
      </section>

      <section id="cam-ket" className="bg-vabix-ivory py-16">
        <Container>
          <p className="eyebrow">{en ? "Commitment" : "Cam kết"}</p>
          <div className="mt-6 space-y-4">
            {commitment.map((p) => (
              <p key={p} className="max-w-3xl text-vabix-ink">
                {p}
              </p>
            ))}
          </div>
        </Container>
      </section>

      <section id="gia-tri" className="py-16">
        <Container>
          <p className="eyebrow">{en ? "Five core values" : "Năm giá trị cốt lõi"}</p>
          <h2 className="mt-3 text-3xl font-semibold text-vabix-deep-teal">{en ? "Our guiding principles today" : "Kim chỉ nam hiện hành"}</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {coreValues.map((v, i) => (
              <article key={v.title} className="border border-vabix-deep-teal/10 p-6">
                <p className="text-sm font-semibold tracking-widest text-vabix-gold">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 text-xl font-semibold text-vabix-deep-teal">{v.title}</h3>
                <p className="mt-3 text-vabix-muted">{v.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-16" id="ba-mui-nhon">
        <h2 className="text-3xl font-semibold text-vabix-deep-teal">{en ? "The three 3T spearheads" : "Ba mũi nhọn 3T"}</h2>
        <p className="measure mt-4 text-vabix-muted">
          {en
            ? "“Knowledge connection” and “business connection” are the brand philosophy. The formal service structure is Training & Coaching, Transformation and Trustworking."
            : "“Kết nối tri thức” và “kết nối kinh doanh” là triết lý thương hiệu. Cấu trúc dịch vụ chính thức là Training & Coaching, Transformation và Trustworking."}
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {pillars.map((p) => (
            <article key={p.id} className="border border-vabix-deep-teal/10 p-7">
              <p className="eyebrow">{p.en}</p>
              <h3 className="mt-2 text-xl font-semibold text-vabix-deep-teal">{p.vi}</h3>
              <p className="mt-3 text-sm text-vabix-muted">{p.summary}</p>
              <Link href={p.href} className="mt-4 inline-block text-sm font-semibold text-vabix-deep-teal">
                {p.cta.label}
              </Link>
            </article>
          ))}
        </div>
      </Container>

      <Container className="grid items-center gap-10 py-16 lg:grid-cols-2" id="nha-sang-lap">
        <div>
          <p className="eyebrow">{en ? "A message from the founder" : "Thông điệp nhà sáng lập"}</p>
          <blockquote className="mt-4 text-2xl font-medium text-vabix-deep-teal">“{founderQuote}”</blockquote>
          {founderMessage.map((p) => (
            <p key={p} className="measure mt-4 text-vabix-muted">
              {p}
            </p>
          ))}
          <p className="mt-6 font-semibold text-vabix-deep-teal">{siteConfig.founder.name}</p>
          <p className="text-sm text-vabix-muted">{founderTitle}</p>
        </div>
        <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden bg-vabix-deep-teal">
          <Image
            src="/images/portraits/nguyen-chi-thanh.jpg"
            alt={en ? "Nguyễn Chí Thành, founder of VABIX" : "Nguyễn Chí Thành, nhà sáng lập VABIX"}
            fill
            priority
            unoptimized
            className="object-cover object-top"
            sizes="(min-width: 1024px) 24rem, min(100vw, 24rem)"
          />
        </div>
      </Container>

      <section className="bg-vabix-ivory py-16" id="hanh-trinh">
        <Container>
          <h2 className="text-3xl font-semibold text-vabix-deep-teal">{en ? "Our journey" : "Hành trình"}</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-4">
            {journey.map((j) => (
              <li key={j.year} className="border-t border-vabix-gold pt-4">
                <p className="text-sm font-semibold text-vabix-gold">{j.year}</p>
                <h3 className="mt-2 font-semibold text-vabix-deep-teal">{j.title}</h3>
                <p className="mt-2 text-sm text-vabix-muted">{j.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section id="van-hoa" className="bg-vabix-deep-teal py-20 text-white">
        <Container>
          <p className="eyebrow">{en ? "Cultural heritage" : "Di sản văn hóa"}</p>
          <h2 className="mt-3 text-3xl font-semibold">{en ? "The Six Golden Words" : "Sáu chữ vàng"}</h2>
          <p className="measure mt-4 text-white/75">
            {en
              ? "The “Six Golden Words” are kept as a cultural hallmark of the VABIX Village. The current core values are the five listed above. Whether the Six Golden Words continue as official values is subject to the Founder's confirmation."
              : "Bộ “Sáu chữ vàng” được giữ như dấu ấn văn hóa của Làng VABIX. Bộ giá trị cốt lõi hiện hành là năm giá trị phía trên. Việc tiếp tục dùng Sáu chữ vàng như giá trị chính thức cần Founder xác nhận."}
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p) => (
              <article key={p.key} className="border border-white/10 p-6">
                <p className="text-2xl font-semibold text-vabix-gold">{p.key}</p>
                <ul className="mt-4 space-y-2 text-sm text-white/80">
                  {p.items.map((i) => (
                    <li key={i.title}>
                      <span className="font-semibold text-white">{i.title}.</span> {i.body}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <h2 className="text-3xl font-semibold text-vabix-deep-teal">{en ? "Expert network" : "Mạng lưới chuyên gia"}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {experts.map((e) => (
              <ExpertCard key={e.id} expert={e} />
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-16">
        <h2 className="text-3xl font-semibold text-vabix-deep-teal">{en ? "Organisations in our capability profile" : "Tổ chức trong hồ sơ năng lực"}</h2>
        <p className="measure mt-3 text-sm text-vabix-muted">
          {en
            ? "Logos and organisation names should not be read as current contracted clients. See CONTENT_APPROVAL.md."
            : "Không suy diễn logo hoặc tên tổ chức thành khách hàng hợp đồng hiện tại. Xem CONTENT_APPROVAL.md."}
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {partners.map((p) => (
            <PartnerLogo key={p.id} name={p.name} caption={en ? (partnerCaptionsEn[p.id] ?? p.caption) : p.caption} />
          ))}
        </div>
      </Container>

      <section id="ho-so" className="bg-vabix-ivory py-16">
        <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-vabix-deep-teal">{en ? "Capability profile" : "Hồ sơ năng lực"}</h2>
            <p className="mt-2 text-vabix-muted">{en ? "2026 edition — contact us to receive the official document." : "Ấn bản 2026 — liên hệ để nhận tài liệu chính thức."}</p>
          </div>
          <Button href="/ket-noi#tu-van" variant="teal">
            {en ? "Contact us for the profile" : "Liên hệ để nhận hồ sơ"}
          </Button>
        </Container>
      </section>

      <section id="thuat-ngu" className="py-16">
        <Container>
          <h2 className="text-3xl font-semibold text-vabix-deep-teal">{en ? "Glossary" : "Thuật ngữ"}</h2>
          <dl className="mt-8 space-y-5">
            {glossary.map((g) => (
              <div key={g.term}>
                <dt className="font-semibold text-vabix-deep-teal">{g.term}</dt>
                <dd className="text-vabix-muted">{g.meaning}</dd>
              </div>
            ))}
          </dl>
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
