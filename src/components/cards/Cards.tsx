import Link from "next/link";
import Image from "next/image";
import type { Expert } from "@/content/types";
import type { CaseStudy } from "@/content/types";
import type { EventItem } from "@/content/types";
import type { Article } from "@/content/types";
import { ArrowIcon } from "@/components/ui/Misc";

export function ExpertCard({ expert }: { expert: Expert }) {
  return (
    <Link
      href={`/mang-luoi/chuyen-gia/${expert.slug}`}
      className="group block border border-vabix-deep-teal/10 bg-white p-5 transition-colors hover:border-vabix-gold"
    >
      <div className="relative mx-auto aspect-square w-28 overflow-hidden rounded-full bg-vabix-deep-teal">
        {expert.portrait ? (
          <Image src={expert.portrait} alt={expert.name} fill className="object-cover object-top" sizes="112px" />
        ) : null}
      </div>
      <h3 className="mt-4 text-center text-base font-semibold text-vabix-deep-teal">{expert.name}</h3>
      <p className="mt-1 text-center text-sm text-vabix-muted">{expert.title}</p>
      <p className="mt-2 text-center text-xs tracking-wide text-vabix-gold">{(expert.expertise ?? []).slice(0, 2).join(" · ")}</p>
    </Link>
  );
}

export function CaseStudyCard({ item }: { item: CaseStudy }) {
  const title = item.headline ?? item.industry;
  return (
    <article className="cs-card group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-vabix-deep-teal/10 bg-white shadow-[0_12px_32px_rgba(22,60,62,0.06)] transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1.5 hover:border-vabix-gold/50 hover:shadow-[0_22px_48px_rgba(22,60,62,0.14)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-vabix-deep-teal">
        {item.coverImage ? (
          <Image
            src={item.coverImage}
            alt={`${item.organization} — ${title}`}
            fill
            unoptimized
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : null}
        <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-vabix-deep-teal/70 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-vabix-gold/50 bg-vabix-deep-teal/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-vabix-soft-gold backdrop-blur">
          {item.organization}
        </span>
        <span className="absolute bottom-3 left-4 right-4 text-xs font-medium text-white/90">{item.industry}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-balance text-lg font-semibold leading-snug text-vabix-deep-teal">{title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-vabix-muted">{item.summary ?? item.challenge}</p>
        <p className="mt-4 rounded-xl bg-vabix-ivory p-4 text-sm leading-relaxed text-vabix-ink">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-vabix-gold">Kết quả</span>
          <span className="mt-1 line-clamp-3 block">{item.resultSummary ?? item.results}</span>
        </p>
        <Link
          href={`/tri-thuc/case-study/${item.slug}`}
          className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-vabix-deep-teal after:absolute after:inset-0 after:content-[''] group-hover:text-vabix-gold"
        >
          Xem case study <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

export function EventCard({ event }: { event: EventItem }) {
  const date = new Date(event.startDate);
  const dateLabel = date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
  const statusLabel = event.status === "upcoming" ? "Sắp diễn ra" : event.status === "ongoing" ? "Đang diễn ra" : "Đã diễn ra";
  return (
    <article className="flex h-full flex-col border border-vabix-deep-teal/10 bg-white">
      <div className="relative aspect-[16/10] bg-vabix-teal">
        {event.image ? (
          <Image src={event.image} alt="" fill className="object-cover opacity-70" sizes="(max-width: 768px) 100vw, 33vw" />
        ) : null}
        <p className="absolute left-4 top-4 bg-vabix-deep-teal px-2 py-1 text-xs font-semibold tracking-wide text-white uppercase">
          {statusLabel}
        </p>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm text-vabix-gold">{dateLabel}</p>
        <p className="eyebrow mt-2">{event.category}</p>
        <h3 className="mt-2 text-lg font-semibold text-vabix-deep-teal">{event.title}</h3>
        <p className="mt-2 text-sm text-vabix-muted">{event.location}</p>
        <div className="mt-auto flex gap-3 pt-4">
          <Link href={`/su-kien/${event.slug}`} className="text-sm font-semibold text-vabix-deep-teal">
            Chi tiết
          </Link>
          {event.status !== "completed" && event.registrationUrl ? (
            <Link href={event.registrationUrl} className="text-sm font-semibold text-vabix-gold">
              Đăng ký
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function ArticleCard({ article, hrefPrefix = "" }: { article: Article; hrefPrefix?: string }) {
  return (
    <article className="flex h-full flex-col border border-vabix-deep-teal/10 bg-white">
      <div className="relative aspect-[16/10] bg-vabix-ivory">
        {article.coverImage ? (
          <Image src={article.coverImage} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow">{article.categoryLabel}</p>
        <h3 className="mt-2 text-lg font-semibold text-vabix-deep-teal">
          <Link href={`${hrefPrefix}/tri-thuc/${article.slug}`}>{article.title}</Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-vabix-muted">{article.excerpt}</p>
      </div>
    </article>
  );
}

export function PartnerLogo({ name, caption }: { name: string; caption?: string }) {
  return (
    <div className="flex min-h-[88px] items-center justify-center border border-vabix-deep-teal/10 bg-white px-4 py-5 grayscale">
      <div className="text-center">
        <p className="text-sm font-bold tracking-[0.12em] text-vabix-deep-teal uppercase">{name}</p>
        {caption ? <p className="mt-1 text-[11px] text-vabix-muted">{caption}</p> : null}
      </div>
    </div>
  );
}

export function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-t border-vabix-gold/40 pt-5">
      <p className="text-3xl font-semibold text-vabix-gold sm:text-4xl">{value}</p>
      <p className="mt-2 text-sm text-white/80">{label}</p>
    </div>
  );
}

export function SolutionCard({
  number,
  title,
  summary,
  href,
}: {
  number: string;
  title: string;
  summary: string;
  href: string;
}) {
  return (
    <Link href={href} className="group flex h-full flex-col border border-vabix-deep-teal/10 bg-white p-6 hover:border-vabix-gold">
      <span className="text-sm font-semibold tracking-widest text-vabix-gold">{number}</span>
      <h3 className="mt-3 text-lg font-semibold text-vabix-deep-teal">{title}</h3>
      <p className="mt-3 flex-1 text-sm text-vabix-muted">{summary}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-vabix-deep-teal">
        Tìm hiểu thêm <ArrowIcon />
      </span>
    </Link>
  );
}
