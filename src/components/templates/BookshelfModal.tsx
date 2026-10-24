"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type ShelfBook = { slug: string; title: string; cover: string; tag: string };

// Nút "Mở tủ sách" + popup tủ sách gỗ: sách lần lượt được đặt lên kệ, rê chuột thì nhấc ra, bấm để xem.
export function BookshelfModal({ books, label = "Mở tủ sách", className = "" }: { books: ShelfBook[]; label?: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const perShelf = Math.ceil(books.length / 2);
  const shelves = [books.slice(0, perShelf), books.slice(perShelf)];

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus({ preventScroll: true });
    const trigger = triggerRef.current;
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      trigger?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      <button ref={triggerRef} type="button" onClick={() => setOpen(true)} className={className} aria-haspopup="dialog">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 20h18M5 20V5h3v15M10 20V7h3v13M15.5 20l-1.5-12 3-.5 1.5 12" />
        </svg>
        {label}
      </button>

      {open ? (
        <div
          className="shelf-overlay fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Tủ sách của Nguyễn Chí Thành"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="shelf-cabinet relative w-full max-w-5xl">
            <button ref={closeRef} type="button" onClick={() => setOpen(false)} className="bmdo-lightbox-btn absolute -top-3 right-0 z-20 -translate-y-full sm:-right-3" aria-label="Đóng tủ sách">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>

            {/* Mặt tiền tủ: nóc có biển tên, đèn rọi */}
            <div className="shelf-crown">
              <span className="shelf-plaque">Tủ sách · Nguyễn Chí Thành</span>
              <span aria-hidden="true" className="shelf-lamp shelf-lamp-l" />
              <span aria-hidden="true" className="shelf-lamp shelf-lamp-r" />
            </div>

            <div className="shelf-body">
              {shelves.map((row, r) => (
                <div key={r} className="shelf-bay">
                  <ul className="shelf-row">
                    {row.map((b, i) => (
                      <li key={b.slug} className="shelf-book" style={{ ["--i" as string]: r * perShelf + i }}>
                        <Link href={`/tri-thuc/sach/${b.slug}`} className="group block" onClick={() => setOpen(false)}>
                          <span className="shelf-book-inner block">
                            <Image src={b.cover} alt={`Bìa sách ${b.title}`} width={460} height={660} unoptimized className="aspect-[7/10] w-full rounded-[3px] object-cover" />
                          </span>
                          <span className="shelf-label">
                            <span className="block text-[13px] font-semibold leading-snug">{b.title}</span>
                            <span className="mt-0.5 block text-[11px] uppercase tracking-[0.14em] text-vabix-soft-gold">{b.tag}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <span aria-hidden="true" className="shelf-plank" />
                </div>
              ))}
            </div>
            <div aria-hidden="true" className="shelf-base" />
            <p className="mt-4 text-center text-sm text-white/70">Chọn một cuốn sách để xem giới thiệu · Nhấn Esc để đóng</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
