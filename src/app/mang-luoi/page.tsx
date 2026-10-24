import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Section";
import { createMetadata } from "@/lib/seo";
import { getLocale } from "@/i18n/server";
import Link from "next/link";

export async function generateMetadata() {
  const en = (await getLocale()) === "en";
  return createMetadata({
    title: en ? "VABIX Network" : "Mạng lưới VABIX",
    description: en
      ? "Experts, partners, industry villages and suppliers — the network layer of Trustworking, with selective connections built on trust."
      : "Chuyên gia, đối tác, làng ngành và nhà cung cấp — lớp mạng lưới của Trustworking, kết nối có chọn lọc dựa trên niềm tin.",
    path: en ? "/en/mang-luoi" : "/mang-luoi",
  });
}

const items = [
  { href: "/mang-luoi/chuyen-gia", title: "Đội ngũ chuyên gia", body: "Hồ sơ chuyên gia thực tế trong hệ sinh thái đào tạo, tư vấn và kết nối." },
  { href: "/mang-luoi/doi-tac", title: "Đối tác", body: "Tổ chức xuất hiện trong hồ sơ năng lực — phạm vi hợp tác cần xác nhận khi công bố." },
  { href: "/mang-luoi/lang-nganh", title: "Làng ngành", body: "Cộng đồng ngành được liên kết trong Trustworking." },
  { href: "/mang-luoi/nha-cung-cap", title: "Nhà cung cấp", body: "Hồ sơ năng lực cung cấp; sàng lọc ban đầu không đồng nghĩa bảo lãnh." },
  { href: "/mang-luoi/tro-thanh-doi-tac", title: "Trở thành đối tác", body: "Đề xuất hợp tác, giới thiệu giải pháp hoặc tìm đối tác." },
  { href: "/trustworking", title: "Trustworking", body: "Kết nối đúng nhà cung cấp đến đúng thị trường." },
];

const itemsEn = [
  { href: "/mang-luoi/chuyen-gia", title: "Our experts", body: "Profiles of practising experts in the training, consulting and connection ecosystem." },
  { href: "/mang-luoi/doi-tac", title: "Partners", body: "Organisations that appear in our capability profile — the scope of cooperation must be confirmed before publication." },
  { href: "/mang-luoi/lang-nganh", title: "Industry villages", body: "Industry communities linked through Trustworking." },
  { href: "/mang-luoi/nha-cung-cap", title: "Suppliers", body: "Supplier capability profiles; initial screening is not a guarantee." },
  { href: "/mang-luoi/tro-thanh-doi-tac", title: "Become a partner", body: "Propose cooperation, introduce a solution or find a partner." },
  { href: "/trustworking", title: "Trustworking", body: "Connecting the right suppliers to the right markets." },
];

export default async function NetworkPage() {
  const en = (await getLocale()) === "en";
  return (
    <>
      <PageHero
        title={en ? "The network within Trustworking" : "Mạng lưới trong Trustworking"}
        description={
          en
            ? "VABIX connects selectively — it is not a social club or a trading platform. Each party does its own due diligence before working together."
            : "VABIX kết nối có chọn lọc — không phải hội nhóm giao lưu hay sàn giao dịch. Mỗi bên tự thẩm định trước khi hợp tác."
        }
        crumbs={[{ name: en ? "Home" : "Trang chủ", href: "/" }, { name: en ? "Network" : "Mạng lưới" }]}
      />
      <Container className="grid gap-4 py-16 md:grid-cols-2">
        {(en ? itemsEn : items).map((i) => (
          <Link key={i.href} href={i.href} className="border border-vabix-deep-teal/10 p-7 hover:border-vabix-gold">
            <h2 className="text-xl font-semibold text-vabix-deep-teal">{i.title}</h2>
            <p className="mt-2 text-sm text-vabix-muted">{i.body}</p>
          </Link>
        ))}
      </Container>
    </>
  );
}
