import Link from "next/link";
import Image from "next/image";
import { getLocale } from "@/i18n/server";
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
      <p className="mt-1 whitespace-pre-line text-center text-sm text-vabix-muted">{expert.title}</p>
      <p className="mt-2 text-center text-xs tracking-wide text-vabix-gold">{(expert.tags ?? expert.expertise ?? []).slice(0, 2).join(" · ")}</p>
    </Link>
  );
}

export async function CaseStudyCard({ item, pillar }: { item: CaseStudy; pillar?: number }) {
  const en = (await getLocale()) === "en";
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
        {pillar ? (
          <span className="absolute right-3 top-3 grid h-14 w-14 place-items-center rounded-full border border-vabix-gold/70 bg-vabix-deep-teal/90 text-center leading-none shadow-[0_8px_20px_rgba(0,0,0,0.25)] backdrop-blur">
            <span>
              <span className="block text-[9px] font-semibold uppercase tracking-[0.18em] text-vabix-soft-gold">{en ? "Pillar" : "Trụ"}</span>
              <span className="mt-0.5 block text-xl font-bold text-vabix-gold">{String(pillar).padStart(2, "0")}</span>
            </span>
          </span>
        ) : null}
        <span className="absolute bottom-3 left-4 right-4 text-xs font-medium text-white/90">{item.industry}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-balance text-lg font-semibold leading-snug text-vabix-deep-teal">{title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-vabix-muted">{item.summary ?? item.challenge}</p>
        <p className="mt-4 rounded-xl bg-vabix-ivory p-4 text-sm leading-relaxed text-vabix-ink">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-vabix-gold">{en ? "Result" : "Kết quả"}</span>
          <span className="mt-1 line-clamp-4">{item.resultSummary ?? item.results}</span>
        </p>
        <Link
          href={`/tri-thuc/case-study/${item.slug}`}
          className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-vabix-deep-teal after:absolute after:inset-0 after:content-[''] group-hover:text-vabix-gold"
        >
          {en ? "View case study" : "Xem case study"} <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

export async function EventCard({ event }: { event: EventItem }) {
  const en = (await getLocale()) === "en";
  const date = new Date(event.startDate);
  const dateLabel = date.toLocaleDateString(en ? "en-GB" : "vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
  const statusLabel =
    event.status === "upcoming" ? (en ? "Upcoming" : "Sắp diễn ra") : event.status === "ongoing" ? (en ? "Ongoing" : "Đang diễn ra") : en ? "Completed" : "Đã diễn ra";
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
            {en ? "Details" : "Chi tiết"}
          </Link>
          {event.status !== "completed" && event.registrationUrl ? (
            <Link href={event.registrationUrl} className="text-sm font-semibold text-vabix-gold">
              {en ? "Register" : "Đăng ký"}
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export async function ArticleCard({ article, hrefPrefix = "" }: { article: Article; hrefPrefix?: string }) {
  const href = `${hrefPrefix}/tri-thuc/${article.slug}`;
  const en = (await getLocale()) === "en";
  const date = article.publishedAt ? new Date(article.publishedAt).toLocaleDateString(en ? "en-GB" : "vi-VN") : "";
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-vabix-deep-teal/10 bg-white transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-vabix-gold/50 hover:shadow-[0_18px_40px_rgba(22,60,62,0.12)]">
      <Link href={href} className="relative block aspect-[16/10] overflow-hidden bg-vabix-ivory" tabIndex={-1} aria-hidden="true">
        {article.coverImage ? (
          <Image src={article.coverImage} alt="" fill unoptimized className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" sizes="(max-width: 768px) 100vw, 33vw" />
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="flex flex-wrap items-center gap-x-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-vabix-gold">
          <span>{article.categoryLabel}</span>
          {date ? <span className="font-medium normal-case tracking-normal text-vabix-muted">· {date}</span> : null}
        </p>
        <h3 className="mt-2 text-lg font-semibold leading-snug text-vabix-deep-teal group-hover:text-vabix-gold">
          <Link href={href}>{article.title}</Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-vabix-muted">{article.excerpt}</p>
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

export async function SolutionCard({
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
  const en = (await getLocale()) === "en";
  return (
    <Link href={href} className="group flex h-full flex-col border border-vabix-deep-teal/10 bg-white p-6 hover:border-vabix-gold">
      <span className="text-sm font-semibold tracking-widest text-vabix-gold">{number}</span>
      <h3 className="mt-3 text-lg font-semibold text-vabix-deep-teal">{title}</h3>
      <p className="mt-3 flex-1 text-sm text-vabix-muted">{summary}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-vabix-deep-teal">
        {en ? "Learn more" : "Tìm hiểu thêm"} <ArrowIcon />
      </span>
    </Link>
  );
}
