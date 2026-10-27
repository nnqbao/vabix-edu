import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Nội dung bài viết dạng "markdown nhẹ":
 *   đoạn văn cách nhau 1 dòng trống · "## Tiêu đề" · "### Tiêu đề phụ" · "- mục" / "1. mục"
 *   "> trích dẫn" (dòng cuối "> — Tác giả" là nguồn) · "![chú thích](/images/...)" · "**đậm**" · "[chữ](url)"
 *   bảng: các dòng "| a | b |" (dòng thứ 2 là "|---|---|") · khung nổi bật: các dòng bắt đầu bằng ">> "
 */
type Block =
  | { kind: "p"; text: string }
  | { kind: "h2" | "h3"; text: string }
  | { kind: "ul" | "ol"; items: string[] }
  | { kind: "quote"; text: string; cite?: string }
  | { kind: "callout"; lines: string[] }
  | { kind: "table"; head: string[]; rows: string[][] }
  | { kind: "img"; src: string; caption: string };

export function parseArticle(content: string): Block[] {
  const blocks: Block[] = [];
  for (const chunk of content.replace(/\r/g, "").split(/\n\s*\n/)) {
    const lines = chunk.split("\n").map((l) => l.trim()).filter(Boolean);
    if (!lines.length) continue;
    const first = lines[0];
    const img = first.match(/^!\[(.*)\]\((.+)\)$/);
    if (img) blocks.push({ kind: "img", caption: img[1], src: img[2] });
    else if (first.startsWith("### ")) blocks.push({ kind: "h3", text: first.slice(4) });
    else if (first.startsWith("## ")) blocks.push({ kind: "h2", text: first.slice(3) });
    else if (lines.every((l) => l.startsWith("- "))) blocks.push({ kind: "ul", items: lines.map((l) => l.slice(2)) });
    else if (lines.every((l) => /^\d+\.\s/.test(l))) blocks.push({ kind: "ol", items: lines.map((l) => l.replace(/^\d+\.\s/, "")) });
    else if (lines.every((l) => l.startsWith(">> "))) blocks.push({ kind: "callout", lines: lines.map((l) => l.slice(3)) });
    else if (lines.length >= 2 && lines.every((l) => l.startsWith("|"))) {
      const cells = (l: string) => l.replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
      const [head, , ...rows] = lines;
      blocks.push({ kind: "table", head: cells(head), rows: rows.map(cells) });
    } else if (lines.every((l) => l.startsWith(">"))) {
      const q = lines.map((l) => l.replace(/^>\s?/, ""));
      const cite = q.length > 1 && /^[—–-]\s/.test(q[q.length - 1]) ? q.pop()!.replace(/^[—–-]\s/, "") : undefined;
      blocks.push({ kind: "quote", text: q.join(" "), cite });
    } else blocks.push({ kind: "p", text: lines.join(" ") });
  }
  return blocks;
}

export function headingId(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function inline(text: string, strongClass = "font-semibold text-vabix-deep-teal"): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className={strongClass}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const external = /^https?:/.test(link[2]);
      return (
        <a key={i} href={link[2]} className="font-semibold text-vabix-gold underline decoration-vabix-gold/40 underline-offset-4 hover:decoration-vabix-gold" {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {link[1]}
        </a>
      );
    }
    return part;
  });
}

export function ArticleBody({ content }: { content: string }) {
  const blocks = parseArticle(content);
  let imgIndex = 0;
  return (
    <div className="article-body text-[17px] leading-[1.8] text-vabix-ink [&_li]:text-justify [&_p]:text-justify [&_td]:text-left [&_th]:text-left">
      {blocks.map((b, i) => {
        switch (b.kind) {
          case "h2":
            return (
              <h2 key={i} id={headingId(b.text)} className="mt-12 scroll-mt-28 text-2xl font-semibold leading-snug text-vabix-deep-teal first:mt-0 sm:text-[1.7rem]">
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="mt-8 text-lg font-semibold text-vabix-deep-teal sm:text-xl">
                {b.text}
              </h3>
            );
          case "ul":
          case "ol": {
            const List = b.kind === "ul" ? "ul" : "ol";
            return (
              <List key={i} className="mt-5 space-y-2.5">
                {b.items.map((it, j) => (
                  <li key={j} className="article-li relative pl-7">
                    <span aria-hidden="true" className="absolute left-0 top-0 text-sm font-semibold text-vabix-gold">
                      {b.kind === "ol" ? String(j + 1).padStart(2, "0") : "◆"}
                    </span>
                    {inline(it)}
                  </li>
                ))}
              </List>
            );
          }
          case "callout":
            return (
              <aside key={i} className="relative my-10 overflow-hidden rounded-[24px] border border-vabix-gold/50 bg-vabix-deep-teal px-6 py-7 text-white shadow-[0_24px_50px_rgba(22,60,62,0.22)] sm:px-9 sm:py-9">
                <span aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border border-vabix-gold/25" />
                {b.lines.map((l, j) =>
                  l.startsWith("- ") ? (
                    <p key={j} className="relative mt-2 flex gap-3 text-[15px] leading-relaxed text-white/85 sm:text-base">
                      <span aria-hidden="true" className="text-vabix-gold">◆</span>
                      <span>{inline(l.slice(2), "font-semibold text-vabix-gold")}</span>
                    </p>
                  ) : j === 0 ? (
                    <p key={j} className="relative text-[11px] font-semibold uppercase tracking-[0.2em] text-vabix-gold">
                      {l}
                    </p>
                  ) : (
                    <p key={j} className="relative mt-3 text-lg font-semibold leading-snug sm:text-xl">
                      {inline(l, "font-semibold text-vabix-gold")}
                    </p>
                  ),
                )}
              </aside>
            );
          case "table":
            return (
              <div key={i} className="my-8 overflow-x-auto rounded-[20px] border border-vabix-deep-teal/10 bg-white">
                <table className="w-full min-w-[30rem] border-collapse text-left text-[15px]">
                  <thead>
                    <tr className="bg-vabix-deep-teal text-white">
                      {b.head.map((h) => (
                        <th key={h} className="px-5 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-vabix-gold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j} className="border-t border-vabix-deep-teal/10 even:bg-vabix-ivory/60">
                        {r.map((c, k) => (
                          <td key={k} className={`px-5 py-4 align-top leading-relaxed ${k === 0 ? "font-semibold text-vabix-deep-teal" : "text-vabix-ink"}`}>
                            {inline(c)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "quote":
            return (
              <figure key={i} className="my-10 rounded-[22px] border-l-4 border-vabix-gold bg-vabix-ivory px-6 py-6 sm:px-8">
                <blockquote className="text-lg font-medium italic leading-relaxed text-vabix-deep-teal sm:text-xl">“{b.text}”</blockquote>
                {b.cite ? <figcaption className="mt-3 text-sm font-semibold not-italic text-vabix-gold">— {b.cite}</figcaption> : null}
              </figure>
            );
          case "img": {
            const zoom = imgIndex++;
            return (
              <figure key={i} className="my-10">
                <Image
                  src={b.src}
                  alt={b.caption}
                  width={1600}
                  height={1000}
                  unoptimized
                  className="mx-auto h-auto max-h-[36rem] w-auto max-w-full cursor-zoom-in sm:max-h-[50rem] rounded-[22px] object-contain"
                  tabIndex={0}
                  data-zoom-group="article"
                  data-zoom-index={zoom}
                  data-zoom-src={b.src}
                  data-zoom-alt={b.caption}
                />
                {b.caption ? <figcaption className="mt-3 text-center text-sm text-vabix-muted">{b.caption}</figcaption> : null}
              </figure>
            );
          }
          default:
            return (
              <p key={i} className="mt-5 first:mt-0">
                {inline(b.text)}
              </p>
            );
        }
      })}
    </div>
  );
}

export function articleHeadings(content: string) {
  return parseArticle(content)
    .filter((b): b is { kind: "h2"; text: string } => b.kind === "h2")
    .map((b) => ({ id: headingId(b.text), text: b.text }));
}

export function countImages(content: string) {
  return parseArticle(content).filter((b) => b.kind === "img").length;
}

export function readingMinutes(content: string) {
  return Math.max(1, Math.round(content.split(/\s+/).length / 220));
}
