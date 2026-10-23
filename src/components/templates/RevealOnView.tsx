"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Gắn data-inview="true" khi khối lọt vào màn hình (một lần) để CSS chạy hiệu ứng xuất hiện.
export function RevealOnView({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} data-inview={inView ? "true" : "false"}>
      {children}
    </div>
  );
}
