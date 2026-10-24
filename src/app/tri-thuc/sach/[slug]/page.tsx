import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { books as booksVi } from "@/content/network";
import { amazonLink, founderAuthor as authorVi, founderBooks as founderBooksVi } from "@/content/founderBooks";
import { founderAuthor as authorEn, founderBooks as founderBooksEn } from "@/content/en/founderBooks";
import { books as booksEn, type BookEn } from "@/content/en/books";
import { getLocale } from "@/i18n/server";
import { publishedMethodologies } from "@/platform/cms/catalog";
import { Breadcrumb } from "@/components/ui/Misc";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { PageHero } from "@/components/layout/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { HeroBackdrop } from "@/components/templates/BmdoLanding";
import { createMetadata } from "@/lib/seo";
import { paths } from "@/lib/paths";

export function generateStaticParams() {
  return [...founderBooksVi, ...booksVi].map((b) => ({ slug: b.slug }));
}

async function localeContent() {
  const en = (await getLocale()) === "en";
  const books: BookEn[] = en ? booksEn : booksVi;
  return { en, books, author: en ? authorEn : authorVi, founderBooks: en ? founderBooksEn : founderBooksVi };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { en, books, author, founderBooks } = await localeContent();
  const prefix = en ? "/en" : "";
  const fb = founderBooks.find((x) => x.slug === slug);
  if (fb) {
    return createMetadata({
      title: `${fb.title} — ${author.nameEn}`,
      description: `${fb.subtitle}. ${fb.summary}`,
      path: `${prefix}/tri-thuc/sach/${fb.slug}`,
      image: fb.cover,
    });
  }
  const b = books.find((x) => x.slug === slug);
  if (!b) return {};
  return createMetadata({ title: en && b.titleEn ? `${b.title} (${b.titleEn})` : b.title, description: b.summary, path: `${prefix}/tri-thuc/sach/${b.slug}` });
}

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { en, books, author, founderBooks } = await localeContent();
  const coverAlt = en ? "Book cover:" : "Bìa sách";
  const aboutAuthor = en ? "About the author" : "Về tác giả";
  const fb = founderBooks.find((x) => x.slug === slug);

  if (fb) {
    const model = fb.relatedModel ? publishedMethodologies(en ? "en" : "vi").find((m) => m.slug === fb.relatedModel) : null;
    const others = founderBooks.filter((x) => x.slug !== fb.slug);
    return (
      <>
        <section className="relative overflow-hidden bg-vabix-deep-teal pt-28 text-vabix-warm sm:pt-32">
          <HeroBackdrop />
          <Container className="relative grid gap-12 pb-16 pt-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-16 lg:pb-20">
            <div className="relative mx-auto order-2 w-full max-w-[20rem] lg:order-1">
              <span aria-hidden="true" className="absolute inset-[-14%] rounded-full bg-[radial-gradient(closest-side,rgba(222,164,67,0.35),transparent)] blur-2xl" />
              <Image src={fb.cover} alt={`${coverAlt} ${fb.title}`} width={460} height={660} unoptimized priority className="book-cover relative w-full rounded-[8px]" />
            </div>
            <div className="order-1 lg:order-2">
              <Breadcrumb
                light
                items={[
                  { name: en ? "Home" : "Trang chủ", href: paths.home },
                  { name: en ? "Books" : "Sách", href: "/tri-thuc/sach" },
                  { name: fb.title },
                ]}
              />
              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-vabix-soft-gold">{author.nameEn} · Available on Amazon</p>
              <h1 className="mt-4 text-balance text-[2.4rem] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[3.4rem]">{fb.title}</h1>
              <p className="mt-3 text-lg italic leading-relaxed text-vabix-gold">{fb.subtitle}</p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">{fb.summary}</p>
              <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
                <a
                  href={amazonLink(fb)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 bg-vabix-gold px-6 py-2.5 text-[15px] font-semibold text-vabix-deep-teal transition-colors hover:bg-vabix-soft-gold sm:w-auto"
                >
                  {en ? "Buy on Amazon ↗" : "Mua trên Amazon ↗"}
                </a>
                <Button href={paths.contact} variant="outline" className="w-full border-white/40 text-white sm:w-auto">
                  {en ? "Bulk orders" : "Đặt sách số lượng lớn"}
                </Button>
              </div>
              {model ? (
                <p className="mt-6 text-sm text-white/65">
                  {en ? "Model in this book:" : "Mô hình trong sách:"}{" "}
                  <Link href={paths.method(model.slug)} className="font-semibold text-vabix-soft-gold hover:text-vabix-gold">
                    {model.name} →
                  </Link>
                </p>
              ) : null}
            </div>
          </Container>
        </section>

        <section className="bg-vabix-warm py-16 sm:py-20">
          <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-center">
            <div className="flex items-center gap-5">
              <Image src={author.portrait} alt={author.name} width={160} height={160} unoptimized className="h-24 w-24 rounded-full border-2 border-vabix-gold/60 object-cover object-top" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-vabix-gold">{aboutAuthor}</p>
                <p className="mt-1 text-xl font-semibold text-vabix-deep-teal">{author.name}</p>
                <p className="text-sm text-vabix-muted">{author.role}</p>
              </div>
            </div>
            <blockquote className="rounded-[22px] border border-vabix-gold/35 bg-vabix-ivory px-6 py-6 text-lg italic leading-relaxed text-vabix-deep-teal sm:px-8">“{author.quote}”</blockquote>
          </Container>
        </section>

        <section className="bg-vabix-ivory py-16 sm:py-20">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-[1.9rem] font-semibold tracking-[-0.02em] text-vabix-deep-teal">{en ? "Other titles" : "Các tựa sách khác"}</h2>
              <Link href="/tri-thuc/sach#bo-sach" className="text-sm font-semibold text-vabix-deep-teal hover:text-vabix-gold">
                {en ? "See the whole collection →" : "Xem cả bộ sách →"}
              </Link>
            </div>
            <ul className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/tri-thuc/sach/${o.slug}`} className="group block">
                    <Image src={o.cover} alt={`${coverAlt} ${o.title}`} width={460} height={660} unoptimized className="book-cover aspect-[7/10] w-full rounded-[6px] object-cover" />
                    <p className="mt-3 text-sm font-semibold text-vabix-deep-teal group-hover:text-vabix-gold">{o.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      </>
    );
  }

  const b = books.find((x) => x.slug === slug);
  if (!b) notFound();
  if (b.cover) {
    const others = books.filter((x) => x.cover && x.slug !== b.slug);
    return (
      <>
        <section className="relative overflow-hidden bg-vabix-deep-teal pt-28 text-vabix-warm sm:pt-32">
          <HeroBackdrop />
          <Container className="relative grid gap-12 pb-16 pt-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-16 lg:pb-20">
            <div className="relative order-2 mx-auto w-full max-w-[20rem] lg:order-1">
              <span aria-hidden="true" className="absolute inset-[-14%] rounded-full bg-[radial-gradient(closest-side,rgba(222,164,67,0.35),transparent)] blur-2xl" />
              <Image src={b.cover} alt={`${coverAlt} ${b.title}`} width={826} height={1166} unoptimized priority className="book-cover relative w-full rounded-[8px]" />
            </div>
            <div className="order-1 lg:order-2">
              <Breadcrumb
                light
                items={[
                  { name: en ? "Home" : "Trang chủ", href: paths.home },
                  { name: en ? "Books" : "Sách", href: "/tri-thuc/sach" },
                  { name: b.title },
                ]}
              />
              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-vabix-soft-gold">
                {b.author} · {b.publisher}
              </p>
              <h1 className="mt-4 text-balance text-[2.1rem] font-semibold leading-[1.12] tracking-[-0.02em] sm:text-[3rem]">{b.title}</h1>
              {en && b.titleEn ? <p className="mt-3 text-lg italic leading-relaxed text-vabix-gold">{b.titleEn}</p> : null}
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">{b.summary}</p>
              <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
                <Button href={paths.contact} className="w-full sm:w-auto">
                  {en ? "Contact us to order →" : "Liên hệ đặt sách →"}
                </Button>
                <Button href="/tri-thuc/sach" variant="outline" className="w-full border-white/40 text-white sm:w-auto">
                  {en ? "View the author's bookshelf" : "Xem tủ sách của tác giả"}
                </Button>
              </div>
            </div>
          </Container>
        </section>
        <section className="bg-vabix-warm py-16 sm:py-20">
          <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-center">
            <div className="flex items-center gap-5">
              <Image src={author.portrait} alt={author.name} width={160} height={160} unoptimized className="h-24 w-24 rounded-full border-2 border-vabix-gold/60 object-cover object-top" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-vabix-gold">{aboutAuthor}</p>
                <p className="mt-1 text-xl font-semibold text-vabix-deep-teal">{author.name}</p>
                <p className="text-sm text-vabix-muted">{author.role}</p>
              </div>
            </div>
            <blockquote className="rounded-[22px] border border-vabix-gold/35 bg-vabix-ivory px-6 py-6 text-lg italic leading-relaxed text-vabix-deep-teal sm:px-8">“{author.quote}”</blockquote>
          </Container>
        </section>
        <section className="bg-vabix-ivory py-16 sm:py-20">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-[1.9rem] font-semibold tracking-[-0.02em] text-vabix-deep-teal">{en ? "More books by the author" : "Sách khác của tác giả"}</h2>
              <Link href="/tri-thuc/sach" className="text-sm font-semibold text-vabix-deep-teal hover:text-vabix-gold">
                {en ? "View the whole bookshelf →" : "Xem cả tủ sách →"}
              </Link>
            </div>
            <ul className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-7">
              {[...others.map((o) => ({ slug: o.slug, title: o.title, cover: o.cover! })), ...founderBooks].map((o) => (
                <li key={o.slug}>
                  <Link href={`/tri-thuc/sach/${o.slug}`} className="group block">
                    <Image src={o.cover} alt={`${coverAlt} ${o.title}`} width={460} height={660} unoptimized className="book-cover aspect-[7/10] w-full rounded-[6px] object-cover" />
                    <p className="mt-3 line-clamp-2 text-sm font-semibold text-vabix-deep-teal group-hover:text-vabix-gold">{o.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      </>
    );
  }
  return (
    <>
      <PageHero
        eyebrow={en && b.titleEn ? b.titleEn : undefined}
        title={b.title}
        description={b.summary}
        crumbs={[{ name: en ? "Home" : "Trang chủ", href: "/" }, { name: en ? "Books" : "Sách", href: "/tri-thuc/sach" }, { name: b.title }]}
      />
      <Container className="py-16">
        <p className="measure text-vabix-muted">
          {en
            ? "A publication in the VABIX knowledge system. To order copies, propose a publishing collaboration or ask about our programme helping entrepreneurs write books, please get in touch."
            : "Ấn phẩm thuộc hệ thống tri thức VABIX. Để đặt sách, mời hợp tác xuất bản hoặc chương trình hỗ trợ doanh nhân viết sách, vui lòng liên hệ."}
        </p>
      </Container>
      <CTASection
        title={en ? "Helping Vietnamese entrepreneurs write books" : "Hỗ trợ doanh nhân Việt viết sách"}
        description={en ? "VABIX works with you to turn hands-on knowledge into a publication." : "VABIX đồng hành biến tri thức thực chiến thành ấn phẩm."}
        primary={{ label: en ? "Talk about publishing" : "Liên hệ xuất bản", href: "/dich-vu-phu-tro/ho-tro-doanh-nhan-viet-sach" }}
      />
    </>
  );
}
