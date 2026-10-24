import type { CaseStudy } from "./types";

export const caseStudies: CaseStudy[] = [
  {
    id: "cs-vnpt-b2a",
    slug: "vnpt-b2a-baboso",
    organization: "VNPT",
    industry: "Viễn thông",
    challenge:
      "Đội ngũ kinh doanh trên nhiều địa bàn cần một ngôn ngữ chung để phân tích thị trường theo địa chỉ, địa bàn và chuẩn hóa hành trình khách hàng, thay vì phụ thuộc vào kinh nghiệm cá nhân.",
    solution:
      "VABIX thiết kế chương trình thực chiến kết hợp mô hình B2A (địa chỉ – địa bàn – chiến lược – kết quả) và triết lý bán hàng BABOSO, giúp chuyển tư duy thành quy trình và công cụ áp dụng được tại từng đơn vị.",
    methodologies: ["b2a", "baboso"],
    implementation:
      "Chương trình được triển khai theo đơn vị và địa bàn, với các lớp thực chiến tại VNPT Thái Bình, VNPT Bình Phước và nhiều tỉnh thành. Học viên làm trên dữ liệu và địa bàn thật, sau đó chuẩn hóa quy trình tiếp cận và chăm sóc khách hàng.",
    results:
      "Đội ngũ có khung phân tích địa bàn thống nhất, hành trình khách hàng được chuẩn hóa từ nhận diện thương hiệu đến dịch vụ và tái mua hàng. Mô hình triển khai được lặp lại trên nhiều địa điểm.",
    quote: {
      text: "Chương trình thực chiến giúp đội ngũ có ngôn ngữ chung để đọc địa bàn và chuẩn hóa hành trình khách hàng.",
      author: "VABIX",
      role: "Hồ sơ năng lực",
    },
    coverImage: "/images/covers/vnpt.jpg",
    gallery: ["/images/covers/vnpt.jpg"],
    relatedExperts: ["nguyen-chi-thanh"],
    context:
      "VNPT là tập đoàn bưu chính viễn thông với mạng lưới rộng. Việc nâng năng lực thực chiến cho đội ngũ kinh doanh đòi hỏi phương pháp vừa khoa học vừa đủ sát địa bàn.",
    lesson:
      "Với tổ chức nhiều chi nhánh, giá trị nằm ở việc chuyển tri thức thành quy trình có thể sao chép — không phải một buổi truyền cảm hứng.",
    featured: true,
  },
  {
    id: "cs-sihub",
    slug: "sihub-startup-sme",
    organization: "SIHUB",
    industry: "Khởi nghiệp & đổi mới sáng tạo",
    challenge:
      "Cộng đồng startup và SME cần tri thức quản trị thực chiến, phù hợp bối cảnh Việt Nam, chứ không phải mô hình quốc tế nguyên bản khó áp dụng.",
    solution:
      "VABIX phối hợp SIHUB (TP.HCM) triển khai chuỗi chương trình lan tỏa tri thức: quản trị dự án, nhân sự, thương hiệu, digital marketing, thuyết trình, bán hàng, chiến lược và tài chính doanh nghiệp.",
    methodologies: ["bizcar", "bmdo"],
    implementation:
      "Các lớp và hội thảo được tổ chức tại SIHUB, hướng tới startup và SME cần công cụ quản trị thực chiến. Số người tham dự và vai trò tổ chức cần được xác nhận trên từng sự kiện trước khi dùng làm số liệu truyền thông.",
    results:
      "Founder và quản lý được tiếp cận công cụ quản trị thực chiến, kết nối chuyên gia và cộng đồng học – chia sẻ – đồng hành. Phạm vi và số lượng cụ thể được ghi nhận theo từng chương trình, không suy diễn thành thành tích pháp nhân.",
    coverImage: "/images/covers/sihub.jpg",
    gallery: ["/images/covers/sihub.jpg"],
    relatedExperts: ["nguyen-chi-thanh", "tran-van-lieng"],
    context:
      "SIHUB là Trung tâm Khởi nghiệp Sáng tạo TP.HCM. Việc đưa tri thức quản trị sát thực tiễn giúp startup và SME rút ngắn khoảng cách từ ý tưởng đến vận hành.",
    lesson:
      "Lan tỏa tri thức chỉ có giá trị khi đi kèm công cụ, tình huống thật và môi trường kết nối — không dừng ở bài giảng.",
    featured: true,
  },
  {
    id: "cs-csed",
    slug: "csed-so-cong-thuong-tphcm",
    organization: "CSED",
    organizationFull: "CSED – Sở Công Thương TP.HCM",
    industry: "Nâng cao năng lực doanh nghiệp công nghiệp",
    headline: "Nâng cao năng lực quản trị, phát triển sản phẩm và thị trường cho doanh nghiệp công nghiệp",
    year: "2026",
    summary:
      "Đồng hành cùng CSED trong chương trình hỗ trợ doanh nghiệp thuộc 03 ngành trọng điểm: cơ khí – tự động hóa, cao su – nhựa và chế biến thực phẩm, VABIX triển khai 05 chuyên đề đào tạo thực chiến, từ quản trị công việc, phát triển nhân lực đến thương mại điện tử, phát triển và thương mại hóa sản phẩm.",
    resultSummary:
      "05 chuyên đề được triển khai, kết nối kiến thức quản trị với bài toán thực tế của doanh nghiệp, góp phần nâng cao năng lực vận hành, đổi mới sản phẩm và tiếp cận thị trường.",
    highlights: [
      { value: "03", label: "Ngành trọng điểm" },
      { value: "05", label: "Chuyên đề thực chiến" },
      { value: "2026", label: "Năm triển khai" },
    ],
    context:
      "Trong chương trình hỗ trợ phát triển doanh nghiệp thuộc 03 ngành trọng điểm của TP.HCM gồm cơ khí – tự động hóa, cao su – nhựa và chế biến thực phẩm, CSED triển khai các hoạt động nâng cao năng lực quản trị, cải tiến năng suất, chất lượng và phát triển thị trường cho doanh nghiệp.",
    challenge:
      "Doanh nghiệp cần nâng cao hiệu quả vận hành, phát triển nguồn nhân lực, thích ứng với xu hướng kinh doanh số và gia tăng khả năng đưa sản phẩm mới ra thị trường. Thách thức đặt ra là chuyển hóa kiến thức quản trị thành những công cụ thiết thực, phù hợp với điều kiện hoạt động của từng doanh nghiệp.",
    solution: "VABIX phối hợp cùng CSED triển khai 05 chuyên đề đào tạo:",
    solutionItems: [
      "Kỹ năng quản lý công việc hiệu quả.",
      "Kỹ năng tuyển dụng, đào tạo và phát triển nguồn nhân lực.",
      "Thương mại điện tử và tiếp thị liên kết hiện đại.",
      "Quản trị quy trình phát triển sản phẩm mới.",
      "Thương mại hóa sản phẩm mới.",
    ],
    solutionNote:
      "Chương trình chú trọng phương pháp đào tạo thực chiến, kết hợp kiến thức quản trị, tình huống thực tế và trao đổi kinh nghiệm ứng dụng tại doanh nghiệp.",
    methodologies: ["applier", "karot"],
    implementation:
      "Trong năm 2026, VABIX tổ chức 05 chuyên đề theo kế hoạch phối hợp với CSED, dành cho các doanh nghiệp thuộc nhóm ngành được hỗ trợ. Hoạt động đào tạo kết hợp hướng dẫn chuyên môn, thảo luận tình huống và giải đáp những vấn đề phát sinh trong thực tiễn quản trị, sản xuất, kinh doanh.",
    results:
      "05 chuyên đề được triển khai, góp phần trang bị kiến thức và công cụ về quản trị công việc, phát triển nhân lực, kinh doanh số, phát triển và thương mại hóa sản phẩm. Chương trình tạo điều kiện để học viên trao đổi kinh nghiệm, tiếp cận phương pháp quản trị thực tiễn và xác định hướng ứng dụng phù hợp với doanh nghiệp.",
    lesson:
      "Nâng cao năng lực cạnh tranh của doanh nghiệp cần bắt đầu từ năng lực quản trị bên trong, kết nối với đổi mới sản phẩm và phát triển thị trường. Đào tạo thực chiến chính là cầu nối giúp doanh nghiệp chuyển hóa tri thức thành hành động và hướng tới phát triển bền vững.",
    coverImage: "/images/case-studies/csed/csed-01.jpg",
    gallery: [1, 2, 3, 4, 5, 6].map((n) => `/images/case-studies/csed/csed-0${n}.jpg`),
    relatedExperts: ["nguyen-chi-thanh"],
    featured: true,
  },
  {
    id: "cs-suspro",
    slug: "suspro-ai-first",
    organization: "Doanh nghiệp",
    organizationFull: "Doanh nghiệp đồng hành · SUSPRO",
    headline: "AI-First Enterprise: đưa AI vào marketing, bán hàng và quản trị",
    industry: "Doanh nghiệp sản xuất / dịch vụ",
    challenge:
      "Doanh nghiệp cần nâng năng suất marketing, bán hàng và quản trị, đồng thời chuẩn hóa quy trình thay vì số hóa manh mún.",
    solution:
      "VABIX triển khai chương trình AI-First Enterprise™, tập trung vào marketing, sales, quản trị và tự động hóa — gắn AI vào workflow thay vì khẩu hiệu.",
    methodologies: ["bizcar", "bmdo"],
    implementation:
      "Chương trình kết hợp tư duy hệ thống BizCar với các công cụ AI cho năng suất, giúp đội ngũ chuẩn hóa quy trình then chốt và đo lường thay đổi.",
    results:
      "Tư duy AI-First được hình thành trong đội ngũ then chốt, quy trình được chuẩn hóa hơn, năng suất các khâu marketing – bán hàng – quản trị được cải thiện.",
    coverImage: "/images/covers/sihub.jpg",
    gallery: ["/images/covers/sihub.jpg"],
    relatedExperts: ["nguyen-chi-thanh", "nguyen-tran-doan-khoa"],
    context:
      "SUSPRO là doanh nghiệp đồng hành trong hồ sơ năng lực VABIX 2026, đại diện cho nhóm doanh nghiệp cần chuyển đổi gắn với vận hành thật.",
    lesson:
      "AI chỉ tạo giá trị khi được gắn vào quy trình và chỉ số — không khi đứng riêng như một dự án công nghệ.",
    featured: true,
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
