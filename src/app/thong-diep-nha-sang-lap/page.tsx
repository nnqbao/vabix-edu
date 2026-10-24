import Image from "next/image";
import { founderLetter as founderLetterVi } from "@/content/brand";
import { founderLetter as founderLetterEn } from "@/content/en/brand";
import { Container } from "@/components/ui/Section";
import { siteConfig } from "@/lib/siteConfig";
import { createMetadata } from "@/lib/seo";
import { paths } from "@/lib/paths";
import { getLocale } from "@/i18n/server";

export async function generateMetadata() {
  const en = (await getLocale()) === "en";
  return createMetadata({
    title: en ? "A message from the founder" : "Thông điệp từ nhà sáng lập",
    description: en
      ? "A message from Nguyễn Chí Thành, founder of VABIX: building inner strength, widening connections and growing sustainably on a foundation of knowledge and trust."
      : "Thông điệp của Nguyễn Chí Thành, nhà sáng lập VABIX: kiến tạo nội lực, mở rộng kết nối và phát triển bền vững trên nền tảng tri thức và niềm tin.",
    path: en ? `/en${paths.founderMessage}` : paths.founderMessage,
    type: "article",
  });
}

export default async function FounderMessagePage() {
  const en = (await getLocale()) === "en";
  const founderLetter = en ? founderLetterEn : founderLetterVi;
  const founderRole = en ? "Founder of VABIX" : "Nhà sáng lập VABIX";
  return (
    <article className="vabix-letter">
      <Container>
        <header className="vabix-letter-head">
          <Image
            src="/images/portraits/nguyen-chi-thanh.jpg"
            alt=""
            width={96}
            height={120}
            unoptimized
            className="vabix-letter-portrait"
          />
          <div>
            <p className="eyebrow">{en ? "A message from the founder" : "Thông điệp từ nhà sáng lập"}</p>
            <h1>{en ? "Building inner strength, widening connections, growing sustainably" : "Kiến tạo nội lực, mở rộng kết nối, phát triển bền vững"}</h1>
            <p className="vabix-letter-byline">
              {siteConfig.founder.name}
              <span>{founderRole}</span>
            </p>
          </div>
        </header>
        <div className="vabix-letter-body">
          <p className="vabix-letter-salute">{founderLetter.salutation}</p>
          {founderLetter.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="vabix-letter-motto">{founderLetter.motto}</p>
          <p className="vabix-letter-close">{founderLetter.closing}</p>
          <p className="vabix-letter-sign">
            {siteConfig.founder.name}
            <span>{founderRole}</span>
          </p>
        </div>
      </Container>
    </article>
  );
}
