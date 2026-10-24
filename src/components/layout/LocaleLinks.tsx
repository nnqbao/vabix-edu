"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { isLocaleSkipped, localeFromPathname, withLocale } from "@/i18n/locale";

const FILE = /\.[a-z0-9]{2,5}$/i;

function localize(href: string | null) {
  if (!href || !href.startsWith("/") || href.startsWith("//") || href.startsWith("/en/") || href === "/en") return null;
  const path = href.split(/[?#]/)[0];
  if (path.startsWith("/_next") || path.startsWith("/api") || FILE.test(path) || isLocaleSkipped(path)) return null;
  return withLocale(href, "en");
}

/**
 * Ở trang tiếng Anh (/en/...), giữ người xem ở bản tiếng Anh: mọi link nội bộ được đổi sang /en/...
 * (cả thuộc tính href để mở tab mới, lẫn điều hướng khi bấm).
 */
export function LocaleLinks() {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const en = localeFromPathname(pathname) === "en";

  useEffect(() => {
    if (!en) return;
    const rewrite = (root: ParentNode) => {
      // Bỏ qua nút chọn ngôn ngữ (có hreflang), nếu không cờ Việt Nam cũng bị đổi sang /en.
      root.querySelectorAll<HTMLAnchorElement>("a[href^='/']:not([hreflang])").forEach((a) => {
        const next = localize(a.getAttribute("href"));
        if (next) {
          a.setAttribute("href", next);
          a.dataset.l10n = "1";
        }
      });
    };
    rewrite(document);
    const observer = new MutationObserver((records) => {
      for (const r of records) r.addedNodes.forEach((n) => n instanceof Element && rewrite(n.parentNode ?? n));
    });
    observer.observe(document.body, { childList: true, subtree: true });

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download") || a.hasAttribute("hreflang")) return;
      const href = a.getAttribute("href");
      const next = a.dataset.l10n === "1" ? href : localize(href);
      if (!next) return;
      e.preventDefault();
      e.stopPropagation();
      router.push(next);
    };
    window.addEventListener("click", onClick, true);
    return () => {
      observer.disconnect();
      window.removeEventListener("click", onClick, true);
    };
  }, [en, pathname, router]);

  return null;
}
