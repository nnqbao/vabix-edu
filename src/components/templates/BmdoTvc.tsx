"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Source = { src: string; poster: string };

// Máy tính (≥1024px) xem bản ngang 16:9; máy tính bảng và điện thoại xem bản dọc 9:16.
// Chỉ tải đúng một bản, chỉ khi cuộn tới; tự phát không tiếng, dừng khi cuộn qua.
const WIDE_QUERY = "(min-width: 1024px)";

export function BmdoTvc({ landscape, portrait, title }: { landscape: Source; portrait: Source; title: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [wide, setWide] = useState<boolean | null>(null);
  const [inView, setInView] = useState(false);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia(WIDE_QUERY);
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
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

  const source = wide ? landscape : portrait;

  return (
    <div
      ref={boxRef}
      className="relative mx-auto aspect-[9/16] w-full max-w-[24rem] overflow-hidden rounded-[24px] border border-vabix-gold/35 bg-vabix-deep-teal shadow-[0_24px_60px_rgba(22,60,62,0.28)] sm:max-w-[26rem] lg:aspect-video lg:max-w-none"
    >
      <Image src={portrait.poster} alt="" fill unoptimized sizes="26rem" className="object-cover lg:hidden" />
      <Image src={landscape.poster} alt="" fill unoptimized sizes="75rem" className="hidden object-cover lg:block" />
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
          className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-vabix-gold/50 bg-vabix-deep-teal/80 px-4 py-2 text-sm font-semibold text-vabix-soft-gold backdrop-blur transition-colors hover:bg-vabix-deep-teal"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5 6 9H3v6h3l5 4V5z" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
          </svg>
          Bật tiếng
        </button>
      ) : null}
    </div>
  );
}
