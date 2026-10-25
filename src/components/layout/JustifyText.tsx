"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Canh đều hai bên cho đoạn văn nhiều dòng, nhưng chỉ khi kết quả đẹp:
 * thử canh đều rồi đo khoảng trắng giữa các chữ; nếu chỗ hở lớn nhất vượt MAX_GAP (tính theo cỡ chữ)
 * — thường gặp ở thẻ hẹp, nhãn ngắn, chữ in hoa — thì trả lại kiểu canh cũ.
 * Dòng cuối giữ kiểu canh ban đầu (giữa / trái) nên bố cục không đổi. Canh đều không đổi chỗ xuống dòng,
 * nên áp dụng sau khi tải không làm trang giật.
 */
const SELECTOR = "main p, main li, main dd, main blockquote, footer p";
const SKIP = "form, nav, button, [class*='marquee'], .text-balance, [data-no-justify]";
const MAX_GAP = 0.9;
const MARK = "data-jt";

function lastAlign(textAlign: string) {
  if (textAlign === "center") return "center";
  if (textAlign === "right" || textAlign === "end") return "end";
  return "start";
}

function lines(el: HTMLElement) {
  const rows = new Map<number, DOMRect[]>();
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const text = n.textContent ?? "";
    for (const m of text.matchAll(/\S+/g)) {
      range.setStart(n, m.index ?? 0);
      range.setEnd(n, (m.index ?? 0) + m[0].length);
      const rects = range.getClientRects();
      if (rects.length !== 1) continue;
      const r = rects[0];
      const key = Math.round(r.top);
      const row = rows.get(key) ?? [];
      row.push(r);
      rows.set(key, row);
    }
  }
  return [...rows.entries()].sort((a, b) => a[0] - b[0]).map(([, row]) => row.sort((a, b) => a.left - b.left));
}

function worstGap(el: HTMLElement, fontSize: number) {
  const rows = lines(el);
  let worst = 0;
  for (const row of rows.slice(0, -1)) {
    for (let i = 1; i < row.length; i++) worst = Math.max(worst, (row[i].left - row[i - 1].right) / fontSize);
  }
  return { worst, count: rows.length };
}

function reset() {
  document.querySelectorAll<HTMLElement>(`[${MARK}]`).forEach((el) => {
    el.style.removeProperty("text-align");
    el.style.removeProperty("text-align-last");
    el.removeAttribute(MARK);
  });
}

function apply() {
  reset();
  for (const el of document.querySelectorAll<HTMLElement>(SELECTOR)) {
    if (el.closest(SKIP) || !el.getClientRects().length) continue;
    const cs = getComputedStyle(el);
    if (cs.textAlign === "justify" || cs.textTransform === "uppercase" || cs.whiteSpace.startsWith("nowrap")) continue;
    if ((el.textContent ?? "").trim().length < 60) continue;
    const fontSize = parseFloat(cs.fontSize) || 16;
    const before = cs.textAlign;
    el.style.setProperty("text-align", "justify", "important");
    el.style.setProperty("text-align-last", lastAlign(before), "important");
    el.setAttribute(MARK, "");
    const { worst, count } = worstGap(el, fontSize);
    if (count < 2 || worst > MAX_GAP) {
      el.style.removeProperty("text-align");
      el.style.removeProperty("text-align-last");
      el.removeAttribute(MARK);
    }
  }
}

export function JustifyText() {
  const pathname = usePathname();

  useEffect(() => {
    let timer: number | undefined;
    const schedule = (delay = 120) => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        observer.disconnect();
        apply();
        observer.observe(document.body, { childList: true, subtree: true });
      }, delay);
    };
    const observer = new MutationObserver(() => schedule(250));
    let width = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth === width) return;
      width = window.innerWidth;
      schedule(200);
    };
    schedule(0);
    document.fonts?.ready.then(() => schedule(0));
    window.addEventListener("resize", onResize);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [pathname]);

  return null;
}
