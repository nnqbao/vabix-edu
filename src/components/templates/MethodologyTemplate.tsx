import type { ReactNode } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { Container, SectionHeading } from "@/components/ui/Section";
import { CTASection } from "@/components/sections/CTASection";
import { LeadForm } from "@/components/forms/LeadForm";
import { JsonLd } from "@/components/ui/Misc";
import { breadcrumbJsonLd } from "@/lib/seo";
import type { Methodology } from "@/content/types";
import { getLocale } from "@/i18n/server";
import { withLocale } from "@/i18n/locale";

export async function MethodologyTemplate({ method, extra }: { method: Methodology; extra?: ReactNode }) {
  const locale = await getLocale();
  const en = locale === "en";
  const crumbs = [
    { name: en ? "Home" : "Trang chủ", href: "/" },
    { name: en ? "Programmes & models" : "Chương trình & Mô hình", href: "/mo-hinh-phuong-phap" },
    { name: method.shortName },
  ];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs.map((c) => ({ name: c.name, path: withLocale(c.href ?? `/mo-hinh-phuong-phap/${method.slug}`, locale) })))} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: method.name,
          description: method.summary,
          provider: { "@type": "Organization", name: "VABIX" },
        }}
      />
      <PageHero dark eyebrow={method.eyebrow} title={method.name} description={method.headline} crumbs={crumbs} />
      <Container className="grid gap-12 py-16 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          <p className="max-w-2xl text-lg text-vabix-ink">{method.summary}</p>
          <p className="max-w-2xl text-vabix-muted">{method.description}</p>
          {extra}
          <section>
            <SectionHeading title={en ? "Who it is for" : "Phù hợp với ai"} />
            <ul className="mt-4 list-disc pl-5">
              {(method.whoFor ?? []).map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </section>
          <section>
            <SectionHeading title={en ? "Intended outcomes" : "Kết quả hướng tới"} />
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {(method.outcomes ?? []).map((x) => (
                <li key={x} className="bg-vabix-ivory p-4 text-sm">
                  {x}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <SectionHeading title={en ? "The journey" : "Hành trình"} />
            <ol className="mt-6 grid gap-5 sm:grid-cols-2">
              {(method.process ?? []).map((p) => (
                <li key={p.step} className="border-t border-vabix-gold pt-4">
                  <p className="text-sm font-semibold text-vabix-gold">{p.step}</p>
                  <h3 className="mt-1 font-semibold text-vabix-deep-teal">{p.title}</h3>
                  <p className="mt-1 text-sm text-vabix-muted">{p.body}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>
        <aside>
          <div className="border border-vabix-deep-teal/10 bg-white p-6 lg:sticky lg:top-28">
            <LeadForm type="consult" title={en ? "Talk to us about this model" : "Trao đổi về mô hình này"} />
          </div>
        </aside>
      </Container>
      <CTASection
        title={en ? "Apply the model to your own challenge." : "Đưa mô hình vào bài toán của bạn."}
        description={
          en
            ? "VABIX works alongside you from diagnosis to capability transfer — not stopping at an infographic."
            : "VABIX đồng hành từ nhận diện đến chuyển giao năng lực — không dừng ở infographic."
        }
      />
    </>
  );
}
