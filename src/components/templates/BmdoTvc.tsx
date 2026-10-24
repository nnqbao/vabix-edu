"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Source = { src: string; poster: string };

// Máy tính (≥1024px) xem bản ngang 16:9; máy tính bảng và điện thoại xem bản dọc 9:16.
// Không có bản dọc thì mọi màn hình xem khung ngang; điện thoại (<640px) dùng bản nhẹ `small` nếu có.
// Chỉ tải đúng một bản, chỉ khi cuộn tới; tự phát không tiếng, dừng khi cuộn qua.
const WIDE_QUERY = "(min-width: 1024px)";
const PHONE_QUERY = "(max-width: 639px)";

export function BmdoTvc({ landscape, portrait, small, title }: { landscape: Source; portrait?: Source; small?: Source; title: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [wide, setWide] = useState<boolean | null>(null);
  const [phone, setPhone] = useState(false);
  const [inView, setInView] = useState(false);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia(WIDE_QUERY);
    const mp = window.matchMedia(PHONE_QUERY);
    const update = () => {
      setWide(mq.matches);
      setPhone(mp.matches);
    };
    update();
    mq.addEventListener("change", update);
    mp.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      mp.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.35 },
    );
    io.observe(box);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (inView) {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!reduced || !muted) v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [inView, wide, muted]);

  useEffect(() => {
    if (ref.current) ref.current.muted = muted;
  }, [muted, wide]);

  const landscapeOnly = !portrait;
  const source = wide ? landscape : (portrait ?? (phone && small ? small : landscape));

  return (
    <div ref={boxRef} className={`bmdo-tvc relative mx-auto w-full ${landscapeOnly ? "" : "max-w-[24rem] sm:max-w-[26rem] lg:max-w-none"}`}>
      <span aria-hidden="true" className="bmdo-tvc-glow" />
      <span aria-hidden="true" className="bmdo-tvc-corner bmdo-tvc-corner-tl" />
      <span aria-hidden="true" className="bmdo-tvc-corner bmdo-tvc-corner-tr" />
      <span aria-hidden="true" className="bmdo-tvc-corner bmdo-tvc-corner-bl" />
      <span aria-hidden="true" className="bmdo-tvc-corner bmdo-tvc-corner-br" />
      <div className="bmdo-tvc-border relative rounded-[26px] p-[2px]">
        <div className={`relative overflow-hidden rounded-[24px] bg-vabix-deep-teal ${landscapeOnly ? "aspect-video" : "aspect-[9/16] lg:aspect-video"}`}>
          {portrait ? (
            <>
              <Image src={portrait.poster} alt="" fill unoptimized sizes="26rem" className="object-cover lg:hidden" />
              <Image src={landscape.poster} alt="" fill unoptimized sizes="75rem" className="hidden object-cover lg:block" />
            </>
          ) : (
            <Image src={landscape.poster} alt="" fill unoptimized sizes="(max-width: 1023px) 100vw, 75rem" className="object-cover" />
          )}
          {wide !== null ? (
            <video
              key={source.src}
              ref={ref}
              className="absolute inset-0 h-full w-full object-cover"
              src={started ? source.src : undefined}
              poster={source.poster}
              aria-label={title}
              muted
              loop
              playsInline
              controls
              preload={started ? "auto" : "none"}
              onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
            />
          ) : null}
          {muted ? (
            <button
              type="button"
              onClick={() => {
                setMuted(false);
                ref.current?.play().catch(() => {});
              }}
              className="absolute left-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-full border border-vabix-gold/50 bg-vabix-deep-teal/80 px-3 py-1.5 text-xs font-semibold sm:left-4 sm:top-4 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm text-vabix-soft-gold backdrop-blur transition-colors hover:bg-vabix-deep-teal"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 5 6 9H3v6h3l5 4V5z" />
                <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
              </svg>
              Bật tiếng
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
