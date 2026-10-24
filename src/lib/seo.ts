import type { Metadata } from "next";
import { siteConfig } from "./siteConfig";

const defaultOg = "/brand/logo-og.jpg";

export function absUrl(path = "/") {
  const base = siteConfig.website.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createMetadata({
  title,
  description,
  path = "/",
  image = defaultOg,
  type = "website",
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
}): Metadata {
  const url = absUrl(path);
  const en = path === "/en" || path.startsWith("/en/");
  const viPath = en ? path.slice(3) || "/" : path;
  const fullTitle = title.includes("VABIX") ? title : `${title} | VABIX`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: url, languages: { vi: absUrl(viPath), en: absUrl(viPath === "/" ? "/en" : `/en${viPath}`) } },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.siteName,
      locale: en ? "en_US" : siteConfig.locale,
      alternateLocale: en ? siteConfig.locale : "en_US",
      type,
      images: [{ url: absUrl(image), alt: siteConfig.siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absUrl(image)],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    alternateName: siteConfig.siteName,
    url: siteConfig.website,
    logo: absUrl("/brand/logo-lockup-light.png"),
    description: siteConfig.description,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.hotline,
    taxID: siteConfig.taxId,
    founder: { "@type": "Person", name: siteConfig.founder.name },
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address,
      addressLocality: "Thành phố Hồ Chí Minh",
      addressCountry: "VN",
    },
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.linkedin,
      siteConfig.social.youtube,
      siteConfig.marketplaceWebsite,
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absUrl(item.path),
    })),
  };
}
