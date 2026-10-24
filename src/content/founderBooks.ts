// Bộ sách của Founder Nguyễn Chí Thành (bản tiếng Anh, phát hành trên Amazon).
// `amazonUrl`: khi có link sản phẩm chính xác thì dán vào đây; chưa có thì nút mua dẫn tới kết quả tìm kiếm Amazon theo tên sách + tác giả.
export type FounderBook = {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  cover: string;
  amazonUrl?: string;
  relatedModel?: string;
};

export const founderAuthor = {
  name: "Nguyễn Chí Thành",
  nameEn: "Nguyen Chi Thanh",
  role: "Founder & Tổng Giám đốc VABIX · Tác giả",
  portrait: "/images/portraits/nguyen-chi-thanh.webp",
  quote: "Một ý tưởng khó viết thành cuốn sách hay, nhưng đọc một cuốn sách có thể cho ta những ý tưởng giá trị.",
  quoteEn: "Turning an idea into a good book is difficult, but reading a good book can inspire ideas of great value.",
  motto: "Books for a brighter tomorrow",
};

export const founderBooks: FounderBook[] = [
  {
    slug: "the-bizcar",
    title: "The BizCar",
    subtitle: "Why your business needs a whole system — and how to get every part moving together",
    summary: "Nhìn doanh nghiệp như một chiếc xe: 12 bộ phận phải được thiết kế đồng bộ để cùng vận hành. Nền tảng của chương trình BMDO.",
    cover: "/images/books/the-bizcar.jpg",
    relatedModel: "bizcar",
  },
  {
    slug: "every-market-has-an-address",
    title: "Every Market Has an Address",
    subtitle: "Guide ideas to areas & address (DNA) — why B2B and B2C no longer fit the market",
    summary: "Mô hình B2A: thị trường được đọc theo địa chỉ và địa bàn, không chỉ theo phân loại B2B hay B2C.",
    cover: "/images/books/every-market-has-an-address.jpg",
    relatedModel: "b2a",
  },
  {
    slug: "karot",
    title: "KAROT",
    subtitle: "A practical operating system for turning targets into outcomes and outcomes into action",
    summary: "Thiết kế ngược, vận hành xuôi, kết nối sớm: hệ điều hành biến mục tiêu thành kết quả và hành động then chốt.",
    cover: "/images/books/karot.jpg",
    relatedModel: "karot",
  },
  {
    slug: "building-what-customers-feel",
    title: "Building What Customers Feel",
    subtitle: "A practical system for turning ideas into things that shape people's experience",
    summary: "Biến ý tưởng thành sản phẩm, dịch vụ tạo nên trải nghiệm mà khách hàng thật sự cảm nhận được.",
    cover: "/images/books/building-what-customers-feel.jpg",
  },
  {
    slug: "dgh-transformation",
    title: "DGH Transformation",
    subtitle: "A practical roadmap to real, sustainable growth where people, data and value happen",
    summary: "Lộ trình chuyển đổi Số – Xanh – Hạnh phúc, nơi con người, dữ liệu và giá trị cùng tăng trưởng bền vững.",
    cover: "/images/books/dgh-transformation.jpg",
    relatedModel: "dgh",
  },
  {
    slug: "the-lifecar",
    title: "The LifeCar",
    subtitle: "A practical system for navigating life, work, learning, purpose and meaning",
    summary: "Chiếc xe cuộc đời: nhìn hành trình sống, làm việc và học tập như một hệ thống có thể thiết kế.",
    cover: "/images/books/the-lifecar.jpg",
  },
];

export function amazonLink(b: FounderBook) {
  return b.amazonUrl ?? `https://www.amazon.com/s?k=${encodeURIComponent(`${b.title} Nguyen Chi Thanh`)}&i=stripbooks`;
}

export const amazonAuthorSearch = "https://www.amazon.com/s?k=Nguyen+Chi+Thanh&i=stripbooks";
