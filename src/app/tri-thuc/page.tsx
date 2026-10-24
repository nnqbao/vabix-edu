import Image from "next/image";
import Link from "next/link";
import { knowledgeProductCategories as categoriesVi, workforce as workforceVi } from "@/content/knowledgeProducts";
import { books as booksVi, supportServices as supportServicesVi } from "@/content/network";
import { amazonLink, founderAuthor as authorVi, founderBooks as founderBooksVi } from "@/content/founderBooks";
import { founderAuthor as authorEn, founderBooks as founderBooksEn } from "@/content/en/founderBooks";
import { books as booksEn, type BookEn } from "@/content/en/books";
import { knowledgeProductCategories as categoriesEn, supportServices as supportServicesEn, workforce as workforceEn } from "@/content/en/knowledgeHub";
import { getLocale } from "@/i18n/server";
import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumb } from "@/components/ui/Misc";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { HeroBackdrop } from "@/components/templates/BmdoLanding";
import { RevealOnView } from "@/components/templates/RevealOnView";
import { BookshelfModal } from "@/components/templates/BookshelfModal";
import { createMetadata } from "@/lib/seo";
import { paths } from "@/lib/paths";

export async function generateMetadata() {
  const en = (await getLocale()) === "en";
  return createMetadata({
    title: en ? "Knowledge ecosystem" : "Hệ sinh thái tri thức",
    description: en
      ? "Books, digital learning materials, open talent, digital talent and support services from VABIX."
      : "Sách, học liệu số, nhân lực mở, nhân lực số và dịch vụ hỗ trợ của VABIX.",
    path: en ? `/en${paths.knowledge}` : paths.knowledge,
  });
}

const LEARNING_COPY: Record<string, string> = {
  "bieu-mau": "Biểu mẫu đánh giá hiện trạng, xác định vấn đề, thiết kế giải pháp, lập kế hoạch và theo dõi cải tiến.",
  "hoc-lieu": "Tài liệu, video và bài giảng trực tuyến đi kèm các chương trình đào tạo của VABIX.",
};

const LEARNING_COPY_EN: Record<string, string> = {
  "bieu-mau": "Templates for assessing the current state, identifying problems, designing solutions, planning and tracking improvements.",
  "hoc-lieu": "Documents, videos and online lectures that accompany VABIX training programmes.",
};

function Title({ eyebrow, title, gold, light = false }: { eyebrow: string; title: string; gold?: string; light?: boolean }) {
  return (
    <div>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className={`mt-3 text-balance text-[1.8rem] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[2.3rem] ${light ? "text-vabix-warm" : "text-vabix-deep-teal"}`}>
        {title} {gold ? <span className="text-vabix-gold">{gold}</span> : null}
      </h2>
    </div>
  );
}

export default async function KnowledgeEcosystemPage() {
  const en = (await getLocale()) === "en";
  const knowledgeProductCategories = en ? categoriesEn : categoriesVi;
  const books: BookEn[] = en ? booksEn : booksVi;
  const supportServices = en ? supportServicesEn : supportServicesVi;
  const author = en ? authorEn : authorVi;
  const founderBooks = en ? founderBooksEn : founderBooksVi;
  const learningCopy = en ? LEARNING_COPY_EN : LEARNING_COPY;
  const vnTag = en ? "Vietnamese" : "Tiếng Việt";
  const learning = knowledgeProductCategories.filter((c) => c.id === "hoc-lieu" || c.id === "bieu-mau");
  const fan = [founderBooks[0], founderBooks[2], founderBooks[5]];
  const shelf = [
    ...founderBooks.map((b) => ({ slug: b.slug, title: b.title, cover: b.cover, tag: "Amazon" })),
    ...books.filter((b) => b.cover).map((b) => ({ slug: b.slug, title: b.title, cover: b.cover!, tag: vnTag })),
  ];
  const WORKFORCE = [
    {
      id: "nhan-luc-mo",
      n: "03",
      title: en ? workforceEn.openTalent.title : workforceVi.openTalent.title,
      tagline: en ? workforceEn.openTalent.tagline : workforceVi.openTalent.tagline,
      summary: en
        ? "Connecting businesses with experts, project staff and flexible teams: work assigned against goals, signed off on results and tracked for quality."
        : "Kết nối doanh nghiệp với chuyên gia, nhân sự dự án và đội ngũ linh hoạt — giao việc theo mục tiêu, nghiệm thu theo kết quả và theo dõi chất lượng.",
      items: en
        ? ["Expert connections", "Project-based staff", "Flexible teams", "Work assigned by output", "Work quality tracking"]
        : ["Kết nối chuyên gia", "Nhân sự theo dự án", "Đội ngũ linh hoạt", "Giao việc theo kết quả đầu ra", "Theo dõi chất lượng công việc"],
      note: en
        ? "Adds capability at the right moment, without replacing the business's core team."
        : "Bổ sung năng lực đúng lúc, không thay thế đội ngũ nòng cốt của doanh nghiệp.",
    },
    {
      id: "nhan-luc-so",
      n: "04",
      title: en ? workforceEn.digitalTalent.title : workforceVi.digitalTalent.title,
      tagline: en ? workforceEn.digitalTalent.tagline : workforceVi.digitalTalent.tagline,
      summary: en
        ? "Designing, deploying and running AI assistants, AI agents and process automation, with human approval, data permissions and monitoring."
        : "Thiết kế, triển khai và vận hành trợ lý AI, AI Agent và tự động hóa quy trình — có con người phê duyệt, phân quyền dữ liệu và giám sát.",
      items: en
        ? ["AI assistants", "AI agents", "Process automation", "Human approval", "Data permissions", "Operational monitoring"]
        : ["Trợ lý AI", "AI Agent", "Tự động hóa quy trình", "Con người phê duyệt", "Phân quyền dữ liệu", "Giám sát vận hành"],
      note: en ? workforceEn.digitalTalent.principles[0] : workforceVi.digitalTalent.principles[0],
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-vabix-deep-teal pt-28 text-vabix-warm sm:pt-32">
        <HeroBackdrop />
        <Container className="relative grid gap-10 pb-14 pt-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center lg:gap-14 lg:pb-16">
          <div>
            <Breadcrumb light items={[{ name: en ? "Home" : "Trang chủ", href: paths.home }, { name: en ? "Knowledge ecosystem" : "Hệ sinh thái tri thức" }]} />
            <p className="mt-10 text-xs font-semibold uppercase tracking-[0.22em] text-vabix-soft-gold">VABIX Knowledge</p>
            <h1 className="mt-4 text-balance text-[2.4rem] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[3.4rem]">
              {en ? (
                <>
                  Knowledge <span className="text-vabix-gold">ecosystem</span>
                </>
              ) : (
                <>
                  Hệ sinh thái <span className="text-vabix-gold">tri thức</span>
                </>
              )}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
              {en
                ? "Books, learning materials, open talent, digital talent and support services: the capability layer that runs across the 3Ts."
                : "Sách, học liệu, nhân lực mở, nhân lực số và dịch vụ hỗ trợ — lớp năng lực xuyên suốt 3T."}
            </p>
            <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
              <BookshelfModal
                books={shelf}
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 bg-vabix-gold px-5 py-2.5 text-[15px] font-semibold tracking-wide text-vabix-deep-teal transition-colors hover:bg-vabix-soft-gold sm:w-auto"
              />
              <Button href="/tri-thuc/sach" variant="outline" className="w-full border-white/40 text-white sm:w-auto">
                {en ? "View the full bookshelf" : "Xem tủ sách đầy đủ"}
              </Button>
            </div>
          </div>
          <Link href="/tri-thuc/sach" className="kn-fan relative mx-auto hidden h-80 w-full max-w-[26rem] sm:block" aria-label={en ? "Bookshelf of Founder Nguyễn Chí Thành" : "Tủ sách của Founder Nguyễn Chí Thành"}>
            <span aria-hidden="true" className="absolute inset-[-8%] rounded-full bg-[radial-gradient(closest-side,rgba(222,164,67,0.3),transparent)] blur-2xl" />
            {fan.map((b, i) => (
              <Image
                key={b.slug}
                src={b.cover}
                alt=""
                width={460}
                height={660}
                unoptimized
                priority
                className={`kn-fan-book kn-fan-book-${i} absolute bottom-0 left-1/2 h-72 w-auto rounded-[6px]`}
              />
            ))}
          </Link>
        </Container>
      </section>

      {/* 01 Sách */}
      <section id="sach" className="scroll-mt-24 bg-vabix-warm py-16 sm:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Title eyebrow={en ? "01 · Books" : "01 · Sách"} title={en ? "The bookshelf of Founder" : "Tủ sách của Founder"} gold={author.name} />
            <Link href="/tri-thuc/sach" className="text-sm font-semibold text-vabix-deep-teal hover:text-vabix-gold">
              {en ? "View the full bookshelf →" : "Xem tủ sách đầy đủ →"}
            </Link>
          </div>

          <div className="mt-8 grid gap-6 rounded-[26px] border border-vabix-gold/30 bg-vabix-ivory p-5 sm:p-7 lg:grid-cols-[15rem_minmax(0,1fr)] lg:items-center lg:gap-10">
            <div className="flex items-center gap-4 lg:flex-col lg:items-start">
              <Image src={author.portrait} alt={author.name} width={160} height={160} unoptimized className="h-20 w-20 shrink-0 rounded-full border-2 border-vabix-gold/60 object-cover object-top lg:h-24 lg:w-24" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-vabix-gold">{en ? "Author" : "Tác giả"}</p>
                <p className="mt-1 text-lg font-semibold text-vabix-deep-teal">{author.name}</p>
                <p className="mt-2 hidden text-sm italic leading-relaxed text-vabix-muted lg:block">“{author.quote}”</p>
              </div>
            </div>
            <RevealOnView>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 lg:grid-cols-8">
                {founderBooks.map((b, i) => (
                  <li key={b.slug} className="bmdo-rv" style={{ ["--rv-i" as string]: i }}>
                    <Link href={`/tri-thuc/sach/${b.slug}`} className="group block">
                      <Image src={b.cover} alt={`${en ? "Book cover:" : "Bìa sách"} ${b.title}`} width={460} height={660} unoptimized className="book-cover aspect-[7/10] w-full rounded-[5px] object-cover" />
                      <p className="mt-2.5 text-[13px] font-semibold leading-snug text-vabix-deep-teal group-hover:text-vabix-gold">{b.title}</p>
                    </Link>
                    <a href={amazonLink(b)} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-xs font-semibold text-vabix-gold hover:underline">
                      Amazon ↗
                    </a>
                  </li>
                ))}
                {books
                  .filter((b) => b.cover)
                  .map((b, i) => (
                    <li key={b.slug} className="bmdo-rv" style={{ ["--rv-i" as string]: founderBooks.length + i }}>
                      <Link href={`/tri-thuc/sach/${b.slug}`} className="group block">
                        <Image src={b.cover!} alt={`${en ? "Book cover:" : "Bìa sách"} ${b.title}`} width={826} height={1166} unoptimized className="book-cover aspect-[7/10] w-full rounded-[5px] object-cover" />
                        <p className="mt-2.5 line-clamp-2 text-[13px] font-semibold leading-snug text-vabix-deep-teal group-hover:text-vabix-gold">{b.title}</p>
                        {en && b.titleEn ? <p className="mt-1 line-clamp-2 text-xs italic leading-snug text-vabix-muted">{b.titleEn}</p> : null}
                      </Link>
                      <span className="mt-1 inline-block text-xs font-semibold text-vabix-muted">{vnTag}</span>
                    </li>
                  ))}
              </ul>
            </RevealOnView>
          </div>

          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-vabix-muted">{en ? "Other knowledge works" : "Công trình tri thức khác"}</p>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {books.filter((b) => !b.cover).map((b) => (
              <li key={b.slug}>
                <Link href={`/tri-thuc/sach/${b.slug}`} className="group flex h-full flex-col items-center gap-3 rounded-[18px] lg:flex-row lg:items-start lg:gap-4 border border-vabix-deep-teal/10 bg-white p-5 transition-[border-color,box-shadow] hover:border-vabix-gold/60 hover:shadow-[0_12px_28px_rgba(22,60,62,0.08)]">
                  <span aria-hidden="true" className="h-1 w-10 shrink-0 rounded-full bg-vabix-gold lg:mt-1 lg:h-10 lg:w-1" />
                  <span>
                    <span className="block font-semibold text-vabix-deep-teal group-hover:text-vabix-gold">{b.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-vabix-muted">{b.summary}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 02 Học liệu & biểu mẫu */}
      <section id="hoc-lieu" className="scroll-mt-24 bg-vabix-warm py-16 sm:py-20">
        <Container className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:items-center lg:gap-14">
          <div>
            <Title
              eyebrow={en ? "02 · Learning materials & templates" : "02 · Học liệu & biểu mẫu"}
              title={en ? "Tools to learn and to do" : "Công cụ để học và làm"}
              gold={en ? "— coming soon" : "— sắp ra mắt"}
            />
            <p className="mt-4 text-vabix-muted">
              {en
                ? "The toolkit that accompanies VABIX training programmes is being finalised. Sign up to be notified when it opens."
                : "Bộ công cụ đi kèm các chương trình đào tạo của VABIX đang được hoàn thiện. Đăng ký để nhận thông báo khi mở."}
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {learning.map((c) => (
              <li key={c.id}>
                <Link href={c.href} className="group relative block h-full overflow-hidden rounded-[22px] bg-vabix-deep-teal p-6 text-vabix-warm transition-transform duration-300 hover:-translate-y-0.5">
                  <span aria-hidden="true" className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[radial-gradient(closest-side,rgba(222,164,67,0.3),transparent)]" />
                  <span className="relative inline-block rounded-full border border-vabix-gold/50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-vabix-soft-gold">{en ? "Coming soon" : "Sắp ra mắt"}</span>
                  <p className="relative mt-4 text-lg font-semibold group-hover:text-vabix-gold">{c.title}</p>
                  <p className="relative mt-2 text-sm leading-relaxed text-white/70">{learningCopy[c.id] ?? c.summary}</p>
                  <span className="relative mt-4 inline-block text-sm font-semibold text-vabix-soft-gold">{en ? "Get notified →" : "Nhận thông báo →"}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 03–04 Nhân lực */}
      <section className="relative overflow-hidden bg-vabix-deep-teal py-16 text-vabix-warm sm:py-20">
        <HeroBackdrop />
        <Container className="relative">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Title
              light
              eyebrow={en ? "03 – 04 · Talent" : "03 – 04 · Nhân lực"}
              title={en ? "The right people and the right tools" : "Đúng người, đúng công cụ"}
              gold={en ? "for every project" : "cho từng dự án"}
            />
            <p className="max-w-md text-white/70">
              {en
                ? "For when a business needs more capability but not yet a permanent hire: project-based experts and AI assistants under control."
                : "Khi doanh nghiệp cần thêm năng lực mà chưa cần tuyển dụng cố định: chuyên gia theo dự án và trợ lý AI có kiểm soát."}
            </p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {WORKFORCE.map((w) => (
              <article key={w.id} id={w.id} className="flex scroll-mt-24 flex-col rounded-[24px] border border-vabix-gold/30 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-vabix-gold">
                  {w.n} · {w.title}
                </p>
                <h3 className="mt-3 text-balance text-xl font-semibold sm:text-2xl">{w.tagline}</h3>
                <p className="mt-3 leading-relaxed text-white/75">{w.summary}</p>
                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {w.items.map((x) => (
                    <li key={x} className="flex items-start gap-2.5 text-sm text-white/85">
                      <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-vabix-gold" />
                      {x}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-white/10 pt-4 text-sm italic text-white/65">{w.note}</p>
                <Link href="/nhan-luc-mo-nhan-luc-so" className="mt-auto inline-block pt-5 text-sm font-semibold text-vabix-soft-gold hover:text-vabix-gold">
                  {en ? "Learn about" : "Tìm hiểu"} {w.title.toLowerCase()} →
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* 05 Dịch vụ hỗ trợ */}
      <section id="dich-vu-ho-tro" className="scroll-mt-24 bg-vabix-warm py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <Title
              eyebrow={en ? "05 · Support services" : "05 · Dịch vụ hỗ trợ"}
              title={en ? "Support beyond the classroom," : "Đồng hành ngoài lớp học,"}
              gold={en ? "in every project" : "trong từng dự án"}
            />
            <ul className="mt-8 divide-y divide-vabix-deep-teal/10 rounded-[20px] border border-vabix-deep-teal/10 bg-white">
              {supportServices.map((s) => (
                <li key={s.slug}>
                  <Link href={`/dich-vu-phu-tro/${s.slug}`} className="group flex items-center justify-between gap-4 px-5 py-4">
                    <span>
                      <span className="block font-semibold text-vabix-deep-teal group-hover:text-vabix-gold">{s.title}</span>
                      <span className="mt-0.5 block text-sm text-vabix-muted">{s.summary}</span>
                    </span>
                    <span aria-hidden="true" className="text-vabix-gold transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Button href={paths.contact} variant="teal" className="mt-6">
              {en ? "Talk to VABIX" : "Trao đổi cùng VABIX"}
            </Button>
          </div>
          <div className="bmdo-form rounded-[22px] bg-white p-5 shadow-[0_18px_40px_rgba(22,60,62,0.08)] sm:p-8">
            <LeadForm type="support-service" title={en ? "Support service request" : "Nhu cầu dịch vụ hỗ trợ"} />
          </div>
        </Container>
      </section>
    </>
  );
}
