import Image from "next/image";
import Link from "next/link";
import { books } from "@/content/network";
import { amazonAuthorSearch, amazonLink, founderAuthor as author, founderBooks } from "@/content/founderBooks";
import { Breadcrumb } from "@/components/ui/Misc";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { HeroBackdrop } from "@/components/templates/BmdoLanding";
import { RevealOnView } from "@/components/templates/RevealOnView";
import { BookshelfModal } from "@/components/templates/BookshelfModal";
import { createMetadata } from "@/lib/seo";
import { paths } from "@/lib/paths";

export const metadata = createMetadata({
  title: "Sách của Founder Nguyễn Chí Thành",
  description:
    "Bộ sách của tác giả Nguyễn Chí Thành — The BizCar, Every Market Has an Address, KAROT, Building What Customers Feel, DGH Transformation, The LifeCar — phát hành trên Amazon, cùng các ấn phẩm tiếng Việt của VABIX.",
  path: "/tri-thuc/sach",
});

export default function BooksPage() {
  const vnPublished = books.filter((b) => b.cover);
  const vnOther = books.filter((b) => !b.cover);
  const shelf = [
    ...founderBooks.map((b) => ({ slug: b.slug, title: b.title, cover: b.cover, tag: "Amazon" })),
    ...vnPublished.map((b) => ({ slug: b.slug, title: b.title, cover: b.cover!, tag: "Tiếng Việt" })),
  ];
  return (
    <>
      {/* Hero tác giả */}
      <section className="relative overflow-hidden bg-vabix-deep-teal pt-28 text-vabix-warm sm:pt-32">
        <HeroBackdrop />
        <Container className="relative grid gap-10 pb-16 pt-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center lg:gap-14 lg:pb-20">
          <div>
            <Breadcrumb light items={[{ name: "Trang chủ", href: paths.home }, { name: "Tri thức", href: paths.knowledge }, { name: "Sách" }]} />
            <p className="mt-10 inline-flex items-center gap-2 rounded-full border border-vabix-gold/45 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-vabix-soft-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-vabix-gold" aria-hidden="true" />
              Tác giả · {author.motto}
            </p>
            <h1 className="mt-6 text-balance text-[2.4rem] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[3.6rem]">
              Sách của <span className="text-vabix-gold">{author.name}</span>
            </h1>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-white/60">{author.role}</p>
            <blockquote className="mt-8 border-l-2 border-vabix-gold/80 pl-5">
              <p className="text-balance text-lg italic leading-relaxed text-white/90 sm:text-xl">“{author.quote}”</p>
              <p className="mt-2 text-sm italic text-white/55">“{author.quoteEn}”</p>
            </blockquote>
            <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
              <BookshelfModal
                books={shelf}
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 bg-vabix-gold px-5 py-2.5 text-[15px] font-semibold tracking-wide text-vabix-deep-teal transition-colors hover:bg-vabix-soft-gold sm:w-auto"
              />
              <Button href="#bo-sach" variant="outline" className="w-full border-white/40 text-white sm:w-auto">
                Xem bộ sách
              </Button>
              <Button href={amazonAuthorSearch} variant="outline" className="w-full border-white/40 text-white sm:w-auto">
                Tìm sách trên Amazon ↗
              </Button>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[26rem]">
            <span aria-hidden="true" className="absolute inset-[-10%] rounded-full bg-[radial-gradient(closest-side,rgba(222,164,67,0.35),transparent)] blur-2xl" />
            <div className="relative overflow-hidden rounded-[28px] border border-vabix-gold/40 shadow-[0_30px_70px_rgba(0,0,0,0.4)]">
              <Image src={author.portrait} alt={author.name} width={720} height={900} unoptimized priority className="aspect-[4/5] w-full object-cover object-top" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-vabix-deep-teal via-vabix-deep-teal/70 to-transparent px-6 pb-5 pt-16">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-vabix-soft-gold">Author</p>
                <p className="mt-1 text-2xl font-semibold tracking-[0.04em]">{author.nameEn.toUpperCase()}</p>
              </div>
            </div>
            <p className="relative mt-4 text-center text-sm font-semibold tracking-wide text-white/70">
              <span className="text-vabix-gold">{founderBooks.length}</span> tựa sách quốc tế · <span className="text-vabix-gold">{books.filter((b) => b.cover).length}</span> sách tiếng Việt
            </p>
          </div>
        </Container>
      </section>

      {/* Bộ sách quốc tế */}
      <section id="bo-sach" className="scroll-mt-24 bg-vabix-warm py-16 sm:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-3xl">
              <p className="eyebrow">Bộ sách quốc tế · Available on Amazon</p>
              <h2 className="mt-3 text-balance text-[1.9rem] font-semibold leading-[1.15] tracking-[-0.02em] text-vabix-deep-teal sm:text-[2.6rem]">
                Mô hình quản trị thực chiến, <span className="text-vabix-gold">viết thành sách cho độc giả toàn cầu.</span>
              </h2>
            </div>
            <p className="max-w-md text-vabix-muted">Các mô hình VABIX dùng trong đào tạo và tư vấn — BizCar, B2A, KAROT, DGH — được hệ thống hóa thành sách tiếng Anh.</p>
          </div>

          <RevealOnView>
            <ol className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {founderBooks.map((b, i) => (
                <li key={b.slug} className="bmdo-rv group flex flex-col" style={{ ["--rv-i" as string]: i }}>
                  <Link href={`/tri-thuc/sach/${b.slug}`} className="book-shelf relative flex items-end justify-center rounded-[22px] bg-gradient-to-b from-vabix-ivory to-[#efe6d3] px-8 pb-6 pt-8">
                    <Image
                      src={b.cover}
                      alt={`Bìa sách ${b.title} — ${author.nameEn}`}
                      width={460}
                      height={660}
                      unoptimized
                      className="book-cover h-64 w-auto rounded-[6px] sm:h-72"
                    />
                    <span aria-hidden="true" className="absolute inset-x-6 bottom-4 h-2 rounded-full bg-vabix-deep-teal/15 blur-md" />
                  </Link>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-vabix-gold">Sách {String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-1.5 text-xl font-semibold text-vabix-deep-teal">
                    <Link href={`/tri-thuc/sach/${b.slug}`} className="hover:text-vabix-gold">
                      {b.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm italic leading-snug text-vabix-muted">{b.subtitle}</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-vabix-ink">{b.summary}</p>
                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
                    <a
                      href={amazonLink(b)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 bg-vabix-gold px-5 py-2.5 text-[15px] font-semibold text-vabix-deep-teal transition-colors hover:bg-vabix-soft-gold"
                    >
                      Mua trên Amazon ↗
                    </a>
                    <Link href={`/tri-thuc/sach/${b.slug}`} className="text-sm font-semibold text-vabix-deep-teal hover:text-vabix-gold">
                      Giới thiệu sách →
                    </Link>
                  </div>
                </li>
              ))}
            </ol>
          </RevealOnView>
        </Container>
      </section>

      {/* Sách tiếng Việt */}
      <section className="bg-vabix-ivory py-16 sm:py-20">
        <Container>
          <p className="eyebrow">Sách tiếng Việt · Đã xuất bản</p>
          <h2 className="mt-3 text-balance text-[1.9rem] font-semibold tracking-[-0.02em] text-vabix-deep-teal sm:text-[2.2rem]">
            Sách của {author.name} <span className="text-vabix-gold">tại Việt Nam.</span>
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {vnPublished.map((b) => (
              <article key={b.slug} className="group grid grid-cols-[8.5rem_minmax(0,1fr)] gap-6 rounded-[24px] border border-vabix-deep-teal/10 bg-white p-5 transition-[border-color,box-shadow] hover:border-vabix-gold/60 hover:shadow-[0_18px_40px_rgba(22,60,62,0.1)] sm:grid-cols-[10rem_minmax(0,1fr)] sm:p-6">
                <Link href={`/tri-thuc/sach/${b.slug}`} className="block">
                  <Image src={b.cover!} alt={`Bìa sách ${b.title}`} width={826} height={1166} unoptimized className="book-cover aspect-[7/10] w-full rounded-[5px] object-cover" />
                </Link>
                <div className="flex flex-col">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-vabix-gold">{b.publisher}</p>
                  <h3 className="mt-2 text-balance text-lg font-semibold leading-snug text-vabix-deep-teal sm:text-xl">
                    <Link href={`/tri-thuc/sach/${b.slug}`} className="hover:text-vabix-gold">
                      {b.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-vabix-muted">{b.author}</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-vabix-ink">{b.summary}</p>
                  <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2 pt-4 text-sm font-semibold">
                    <Link href={paths.contact} className="text-vabix-deep-teal hover:text-vabix-gold">
                      Liên hệ đặt sách →
                    </Link>
                    <Link href={`/tri-thuc/sach/${b.slug}`} className="text-vabix-muted hover:text-vabix-gold">
                      Giới thiệu sách
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-12 text-xs font-semibold uppercase tracking-[0.2em] text-vabix-muted">Công trình tri thức khác</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {vnOther.map((b) => (
              <Link
                key={b.slug}
                href={`/tri-thuc/sach/${b.slug}`}
                className="group flex gap-5 rounded-[20px] border border-vabix-deep-teal/10 bg-white p-6 transition-[border-color,box-shadow] hover:border-vabix-gold/60 hover:shadow-[0_14px_32px_rgba(22,60,62,0.1)]"
              >
                <span aria-hidden="true" className="mt-1 h-12 w-1 shrink-0 rounded-full bg-vabix-gold" />
                <span>
                  <span className="block text-lg font-semibold text-vabix-deep-teal group-hover:text-vabix-gold">{b.title}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-vabix-muted">{b.summary}</span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Đặt sách & hợp tác */}
      <section className="relative overflow-hidden bg-vabix-deep-teal py-16 text-vabix-warm sm:py-20">
        <HeroBackdrop />
        <Container className="relative text-center">
          <p className="eyebrow">Đặt sách & hợp tác</p>
          <h2 className="mx-auto mt-3 max-w-3xl text-balance text-[1.9rem] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[2.4rem]">
            Đặt sách số lượng lớn, làm quà tặng doanh nghiệp <span className="text-vabix-gold">hoặc mời tác giả chia sẻ.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/75">Liên hệ VABIX để đặt sách cho đội ngũ, chương trình đào tạo, sự kiện hoặc hợp tác xuất bản.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={paths.contact}>Liên hệ đặt sách →</Button>
            <Button href="/dich-vu-phu-tro/ho-tro-doanh-nhan-viet-sach" variant="outline" className="border-white/40 text-white">
              Hỗ trợ doanh nhân viết sách
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
