"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { localeFromPathname } from "@/i18n/locale";

type Item = { src: string; fallback: string; alt: string };

// Xem ảnh phóng to cho cả trang. Phần tử nào có data-zoom-group + data-zoom-src + data-zoom-index
// sẽ mở được bằng click hoặc Enter/Space; ảnh trùng index (bản nhân đôi của dải chạy) gộp làm một.
function collect(group: string): Item[] {
  const seen = new Map<number, Item>();
  document.querySelectorAll<HTMLElement>(`[data-zoom-group="${group}"]`).forEach((el) => {
    const i = Number(el.dataset.zoomIndex);
    if (!seen.has(i)) seen.set(i, { src: el.dataset.zoomSrc ?? "", fallback: el.dataset.zoomFallback ?? "", alt: el.dataset.zoomAlt ?? "" });
  });
  return [...seen.entries()].sort((a, b) => a[0] - b[0]).map(([, v]) => v);
}

export function Lightbox() {
  const [items, setItems] = useState<Item[]>([]);
  const [index, setIndex] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);
  const touchX = useRef<number | null>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const en = localeFromPathname(usePathname() ?? "/") === "en";

  const open = useCallback((el: HTMLElement) => {
    const group = el.dataset.zoomGroup;
    if (!group) return;
    lastFocus.current = el;
    setItems(collect(group));
    setLoaded(false);
    setIndex(Number(el.dataset.zoomIndex));
  }, []);

  useEffect(() => {
    const target = (e: Event) => (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-zoom-group]");
    const onClick = (e: MouseEvent) => {
      const el = target(e);
      if (el) {
        e.preventDefault();
        open(el);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const el = target(e);
      if (el) {
        e.preventDefault();
        open(el);
      }
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = useCallback(() => {
    setIndex(null);
    lastFocus.current?.focus({ preventScroll: true });
  }, []);
  const go = useCallback(
    (d: number) => {
      setLoaded(false);
      setIndex((i) => (i === null ? i : (i + d + items.length) % items.length));
    },
    [items.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [index === null, close, go]); // eslint-disable-line react-hooks/exhaustive-deps

  // Tải trước ảnh kế tiếp và trước đó để chuyển ảnh không phải chờ.
  useEffect(() => {
    if (index === null || items.length < 2) return;
    for (const d of [1, -1]) new window.Image().src = items[(index + d + items.length) % items.length].src;
  }, [index, items]);

  if (index === null || !items[index]) return null;
  const item = items[index];

  return (
    <div
      className="bmdo-lightbox fixed inset-0 z-[100] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={en ? "Enlarged image viewer" : "Xem ảnh phóng to"}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      }}
    >
      <figure className="bmdo-lightbox-frame pointer-events-none relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={item.src}
          src={item.src}
          alt={item.alt}
          onLoad={() => setLoaded(true)}
          onError={(e) => {
            // Chưa có bản lớn thì dùng ảnh đang hiển thị trên trang.
            if (item.fallback && e.currentTarget.src !== new URL(item.fallback, location.href).href) e.currentTarget.src = item.fallback;
            else setLoaded(true);
          }}
          className={`bmdo-lightbox-img pointer-events-auto block max-h-[82vh] max-w-[92vw] rounded-[14px] object-contain ${loaded ? "is-loaded" : ""}`}
        />
        {!loaded ? <span className="bmdo-lightbox-spinner" aria-hidden="true" /> : null}
        {item.alt ? <figcaption className="mt-3 text-center text-sm text-white/75">{item.alt}</figcaption> : null}
      </figure>

      <button ref={closeRef} type="button" onClick={close} className="bmdo-lightbox-btn absolute right-4 top-4 sm:right-6 sm:top-6" aria-label={en ? "Close" : "Đóng"}>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>
      {items.length > 1 ? (
        <>
          <button type="button" onClick={() => go(-1)} className="bmdo-lightbox-btn absolute left-3 top-1/2 -translate-y-1/2 sm:left-6" aria-label={en ? "Previous image" : "Ảnh trước"}>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <button type="button" onClick={() => go(1)} className="bmdo-lightbox-btn absolute right-3 top-1/2 -translate-y-1/2 sm:right-6" aria-label={en ? "Next image" : "Ảnh tiếp theo"}>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-vabix-gold/40 bg-vabix-deep-teal/70 px-4 py-1.5 text-sm font-semibold tracking-wide text-vabix-soft-gold">
            {index + 1} / {items.length}
          </p>
        </>
      ) : null}
    </div>
  );
}
