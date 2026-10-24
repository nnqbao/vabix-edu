"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeFromPathname, switchLocalePath, type Locale } from "@/i18n/locale";

// Chọn ngôn ngữ bằng cờ: cờ đang chọn sáng, có viền vàng; cờ còn lại mờ.
export function LanguageSwitch({ inverted }: { inverted?: boolean }) {
  const pathname = usePathname() ?? "/";
  const locale = localeFromPathname(pathname);

  return (
    <div className="flex items-center gap-1.5" role="group" aria-label={locale === "en" ? "Language" : "Ngôn ngữ"}>
      <FlagLink code="vi" label="Tiếng Việt" current={locale} href={switchLocalePath(pathname, "vi")} inverted={inverted} />
      <FlagLink code="en" label="English" current={locale} href={switchLocalePath(pathname, "en")} inverted={inverted} />
    </div>
  );
}

function FlagLink({ code, label, current, href, inverted }: { code: Locale; label: string; current: Locale; href: string; inverted?: boolean }) {
  const on = current === code;
  return (
    <Link
      href={href}
      hrefLang={code}
      aria-current={on ? "true" : undefined}
      aria-label={label}
      title={label}
      className={`grid h-8 w-8 place-items-center rounded-full transition-[opacity,box-shadow,transform] duration-200 hover:scale-110 ${
        on ? "opacity-100 shadow-[0_0_0_2px_#dea443]" : `opacity-55 hover:opacity-100 ${inverted ? "shadow-[0_0_0_1px_rgba(255,255,255,0.25)]" : "shadow-[0_0_0_1px_rgba(22,60,62,0.15)]"}`
      }`}
    >
      {code === "vi" ? <FlagVN /> : <FlagGB />}
    </Link>
  );
}

function FlagVN() {
  return (
    <svg viewBox="0 0 30 30" className="h-6 w-6 rounded-full" aria-hidden="true">
      <clipPath id="flag-vn">
        <circle cx="15" cy="15" r="15" />
      </clipPath>
      <g clipPath="url(#flag-vn)">
        <rect width="30" height="30" fill="#da251d" />
        <path d="M15 7.2l1.83 5.63h5.92l-4.79 3.48 1.83 5.63L15 18.46l-4.79 3.48 1.83-5.63-4.79-3.48h5.92z" fill="#ffcd00" />
      </g>
    </svg>
  );
}

function FlagGB() {
  return (
    <svg viewBox="0 0 30 30" className="h-6 w-6 rounded-full" aria-hidden="true">
      <clipPath id="flag-gb">
        <circle cx="15" cy="15" r="15" />
      </clipPath>
      <g clipPath="url(#flag-gb)">
        <rect width="30" height="30" fill="#012169" />
        <path d="M0 0l30 30M30 0L0 30" stroke="#fff" strokeWidth="6" />
        <path d="M0 0l30 30M30 0L0 30" stroke="#c8102e" strokeWidth="2.4" />
        <path d="M15 0v30M0 15h30" stroke="#fff" strokeWidth="9" />
        <path d="M15 0v30M0 15h30" stroke="#c8102e" strokeWidth="5" />
      </g>
    </svg>
  );
}
