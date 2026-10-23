// Nội dung landing BABOSORA — khoá phễu dẫn vào BMDO.
// Nguồn: đề xuất "Vận hành và gia tốc dòng chảy doanh thu (B2A × BABOSORA)"; đã khái quát cho mọi ngành,
// bỏ tên khách hàng và chi tiết riêng ngành ô tô của bản đề xuất gốc.
export const babosora = {
  badge: "Thực chiến · 02 ngày · 04 buổi",
  title: "BABOSORA",
  subtitle: "Vận hành và gia tốc dòng chảy doanh thu",
  tagline: ["Tìm đúng khách hàng", "Kiến tạo cơ hội", "Chuyển hóa đơn hàng", "Gia tốc doanh thu"],
  lead: "Ứng dụng mô thức B2A × BABOSORA để đội ngũ chủ động tạo nguồn khách hàng, phát triển cơ hội thực chất, nâng tỷ lệ chuyển đổi và gia tốc doanh thu bằng những hành động đo lường được.",
  stats: [
    { value: "12 giờ", label: "Đào tạo & thực hành" },
    { value: "04 buổi", label: "Trong 02 ngày" },
    { value: "04 thao trường", label: "Ra sản phẩm mỗi buổi" },
  ],
  audience: ["Doanh chủ & CEO", "Giám đốc kinh doanh", "Trưởng / phó phòng kinh doanh", "Trưởng nhóm & đội ngũ bán hàng"],
  // Dòng chảy doanh thu: B2A là nền địa bàn, BA → BO → SO là phễu, RA gia tốc và quay vòng.
  flow: [
    { code: "B2A", name: "Địa chỉ & địa bàn", en: "Business to Address & Area" },
    { code: "BA", name: "Nhận biết thương hiệu", en: "Brand Awareness" },
    { code: "BO", name: "Cơ hội kinh doanh", en: "Business Opportunity" },
    { code: "SO", name: "Đơn hàng", en: "Sales Order" },
    { code: "RA", name: "Gia tốc doanh thu", en: "Revenue Acceleration" },
  ],
  problem: {
    title: "Thị trường vẫn có khách mua.",
    titleGold: "Vì sao đội ngũ vẫn khó bán?",
    body: "Thị trường tăng trưởng không có nghĩa mọi điểm bán đều tăng trưởng. Có nơi nhiều lượt hỏi giá nhưng ít đơn hàng; có khách rất cần nhưng chưa đủ điều kiện, chưa có quyền quyết định hoặc chưa ưu tiên mua. Đội ngũ cần trả lời năm câu hỏi:",
    questions: [
      { code: "B2A", q: "Khách hàng có nhu cầu và khả năng mua đang ở đâu? Địa chỉ, địa bàn nào còn doanh thu chưa được khai thác?" },
      { code: "BA", q: "Vì sao thương hiệu chưa được nhớ đến và ưu tiên lựa chọn? Huy động nguồn lực thương hiệu và phủ sóng thế nào cho hiệu quả?" },
      { code: "BO", q: "Vì sao nhiều người quan tâm nhưng ít cơ hội mua thực chất? Làm sao chủ động săn cơ hội thay vì chờ khách hoặc tăng chi phí quảng cáo?" },
      { code: "SO", q: "Vì sao khách đã tìm hiểu, nhận báo giá, trải nghiệm mà vẫn trì hoãn hoặc chọn đối thủ? Làm sao hỏi chốt và chuyển hóa thành đơn hàng?" },
      { code: "RA", q: "Làm sao gia tăng doanh thu trên mỗi khách hàng và trong suốt vòng đời khách hàng, không chỉ trông vào khách mới hay giảm giá?" },
    ],
    conclusion:
      "Trong thị trường cạnh tranh, nỗ lực bán hàng đơn thuần chưa đủ. Doanh nghiệp cần một phương pháp có hệ thống để nhận diện nguồn doanh thu, phát hiện điểm nghẽn, thiết kế giải pháp và vận hành liên tục các hoạt động tạo doanh thu.",
  },
  objectives: [
    {
      code: "B2A",
      title: "Làm chủ thị trường theo địa chỉ, địa bàn",
      body: "Nhận diện, lựa chọn và quản trị địa chỉ, địa bàn kinh doanh; phân tích doanh thu bình quân theo Address và Area; xác định vùng tăng trưởng, vùng suy giảm và cơ hội phát triển.",
    },
    {
      code: "BA",
      title: "Kiến tạo mạng lưới phát sóng thương hiệu",
      body: "Huy động bốn Hiệu kép và 16 trụ cộng hưởng thương hiệu; thiết kế trạm phát sóng, nội dung, kịch bản và cách đo để tăng nhận biết, ghi nhớ và ưu tiên lựa chọn.",
    },
    {
      code: "BO",
      title: "Chủ động săn và phát triển cơ hội kinh doanh",
      body: "Thiết kế mạng lưới săn cơ hội; nhận diện Khả cần NAP và xác minh Khả mua CAP; phát hiện điều kiện còn thiếu và phát triển cơ hội thực chất.",
    },
    {
      code: "SO",
      title: "Chuyển hóa cơ hội thành đơn hàng",
      body: "Vận dụng phương pháp hỏi chốt ASKING để giảm kháng cự, thấu hiểu khách hàng, xử lý khoảng cách quyết định và nâng tỷ lệ chuyển đổi trên mọi kênh.",
    },
    {
      code: "RA",
      title: "Gia tốc doanh thu và vận hành mục tiêu",
      body: "Khai thác sáu trục BRUCCS từ khách mới, khách hiện hữu và hệ sinh thái; vận hành mục tiêu bằng KAROT với kế hoạch gia tốc 30/60/90 ngày.",
    },
  ],
  days: [
    {
      day: "Ngày 01",
      title: "Kiến tạo nguồn doanh thu",
      sessions: [
        {
          no: "01",
          codes: "B2A × BA",
          title: "Làm chủ địa bàn – Kiến tạo mạng lưới phủ sóng thương hiệu",
          question: "Vì sao có địa bàn tăng, có địa bàn giảm? Vì sao có điểm bán được khách chủ động tìm đến, nơi khác phải liên tục chi tiền quảng cáo?",
          topics: [
            "Tư duy B2A: bám địa chỉ bán hàng, quản trị địa bàn, phân tích doanh thu bình quân",
            "Bốn Hiệu kép: Nhân hiệu – Doanh hiệu – Phẩm hiệu – Phương hiệu; Hiệu chủ và Hiệu mở",
            "Thiết kế trạm phát sóng BA theo BTS/7PS; đo cấp độ nhận biết S0–S4",
          ],
          output: "Bản đồ B2A kèm kế hoạch phát sóng BA: trạm phát, nội dung, người phụ trách, mục tiêu và chỉ số đo.",
        },
        {
          no: "02",
          codes: "BO",
          title: "Nghệ thuật săn và phát triển cơ hội kinh doanh",
          question: "Người cần thì nhiều, người đủ điều kiện, có thẩm quyền và sẵn sàng mua thì ít. Làm sao tìm đúng họ?",
          topics: [
            "Khả cần NAP: Need – Aspiration – Pain; phát hiện nhu cầu hiện hữu và tiềm ẩn",
            "Khả mua CAP: Capacity × Authority × Priority; phân loại BO nóng – ấm – lạnh bằng bằng chứng",
            "Mạng lưới săn BO theo B2A, 4O, 7PS và TrustWorking 6G; giá trị mồi và kịch bản tiếp cận",
          ],
          output: "Bản đồ săn cơ hội (BO Hunting Map): nguồn BO, kịch bản tiếp cận, tiêu chí xác minh, người phụ trách và cách đo.",
        },
      ],
    },
    {
      day: "Ngày 02",
      title: "Chuyển hóa đơn hàng – Gia tốc doanh thu",
      sessions: [
        {
          no: "03",
          codes: "SO",
          title: "Nghệ thuật hỏi chốt và chuyển hóa BO thành SO",
          question: "Khách đã hỏi giá, đã được tư vấn, đã trải nghiệm nhưng vẫn chưa mua. Khoảng cách nằm ở đâu?",
          topics: [
            "Điểm nghẽn BO → SO: giá trị, niềm tin, tài chính, thẩm quyền, thời điểm",
            "Phương pháp hỏi chốt ASKING để khách tự nhận ra giá trị và tự quyết định",
            "Kịch bản hỏi chốt trực tiếp, qua điện thoại và trực tuyến; đo tỷ lệ chuyển đổi",
          ],
          output: "Bộ kịch bản hỏi chốt đa kênh và phương án cải thiện tỷ lệ chuyển đổi BO → SO.",
        },
        {
          no: "04",
          codes: "RA",
          title: "Vận hành và gia tốc doanh thu bằng BRUCCS",
          question: "Làm sao tăng doanh thu mà không chỉ trông vào tìm khách mới, tăng ngân sách quảng cáo hay giảm giá?",
          topics: [
            "Nhận diện nguồn doanh thu chưa khai thác trên từng khách hàng, Address và Area",
            "Sáu trục gia tốc BRUCCS và lợi thế hệ sinh thái sản phẩm, dịch vụ",
            "Vận hành mục tiêu bằng KAROT, GAIN và MAIS; kế hoạch gia tốc 30/60/90 ngày",
          ],
          output: "Kế hoạch gia tốc doanh thu 30/60/90 ngày: mục tiêu, hành động then chốt, người chịu trách nhiệm và chỉ số Outcomes.",
        },
      ],
    },
  ],
  tools: [
    {
      code: "NAP × CAP",
      title: "Đọc đúng cơ hội",
      items: [
        { k: "N", v: "Need — nhu cầu cần thiết" },
        { k: "A", v: "Aspiration — nhu cầu ước muốn" },
        { k: "P", v: "Pain — nỗi đau cần giải quyết" },
        { k: "C", v: "Capacity — đủ điều kiện mua" },
        { k: "A", v: "Authority — đúng người quyết" },
        { k: "P", v: "Priority — dành ưu tiên mua" },
      ],
    },
    {
      code: "ASKING",
      title: "Hỏi để khách tự chốt",
      items: [
        { k: "A", v: "Atmosphere — tạo không khí tin cậy" },
        { k: "S", v: "Situation — khách tự thấy hiện trạng" },
        { k: "K", v: "Key Gap — khách nhận ra vấn đề" },
        { k: "I", v: "Implication — hệ quả nếu không mua" },
        { k: "N", v: "NAP Payoff — giá trị nếu mua" },
        { k: "G", v: "Gentle Close — khách tự quyết định" },
      ],
    },
    {
      code: "BRUCCS",
      title: "Sáu trục gia tốc doanh thu",
      items: [
        { k: "B", v: "Brandnew-Sell — bán mới" },
        { k: "R", v: "Renew-Sell — duy trì, mua lại" },
        { k: "U", v: "Up-Sell — tăng giá trị giao dịch" },
        { k: "C", v: "Cross-Sell — bán chéo" },
        { k: "C", v: "Combo-Sell — gói kết hợp" },
        { k: "S", v: "Switch-Sell — khách của đối thủ" },
      ],
    },
  ],
  applier: [
    { k: "A", title: "Activate", body: "Khởi động bằng điểm đau và bài toán kinh doanh thật." },
    { k: "P", title: "Paradigm", body: "Tiếp cận mô thức và tri thức quản trị thực chiến." },
    { k: "P", title: "Practise & Pitching", body: "04 nhóm thiết kế giải pháp và trình bày nhanh." },
    { k: "L", title: "Lens", body: "Chia sẻ góc nhìn, kinh nghiệm để làm giàu giải pháp." },
    { k: "I", title: "Improve", body: "Tiếp nhận phản biện, cải tiến phương án." },
    { k: "E", title: "Extract", body: "Tự đúc kết bài học và cách ứng dụng." },
    { k: "R", title: "Resolve", body: "Cam kết hành động, đo kết quả 30/60/90 ngày." },
  ],
  outcomes: [
    { title: "Thấy rõ điểm nghẽn doanh thu", body: "Dùng B2A × BABOSORA phân tích nguồn doanh thu, chất lượng cơ hội và khả năng chuyển đổi theo từng địa bàn, đơn vị." },
    { title: "Phát triển khách hàng chủ động", body: "Có kịch bản phát sóng BA và mạng lưới săn BO phù hợp sản phẩm, địa bàn và nguồn lực." },
    { title: "Năng lực hỏi chốt thực chiến", body: "Vận dụng ASKING nâng chất lượng tư vấn và tỷ lệ chuyển hóa cơ hội thành đơn hàng." },
    { title: "Khai thác nguồn gia tốc doanh thu", body: "Chọn đúng các trục BRUCCS để tăng doanh thu từ khách mới, khách hiện hữu và hệ sinh thái." },
    { title: "Kế hoạch hành động có đo lường", body: "Key Actions, người phụ trách và Outcomes cần đạt trong 30/60/90 ngày." },
  ],
  outcomesNote:
    "Hai ngày học tạo nền tảng tri thức, năng lực và kế hoạch hành động. Kết quả doanh thu sau đó phụ thuộc chất lượng triển khai, điều kiện thị trường và cơ chế vận hành của từng doanh nghiệp; VABIX không ấn định một tỷ lệ tăng doanh thu thiếu căn cứ.",
  manifesto: [
    ["Không chỉ tìm thêm khách hàng", "mà biết tìm đúng khách hàng."],
    ["Không chỉ tạo thêm cơ hội", "mà biết phát triển cơ hội có khả năng mua thực chất."],
    ["Không chỉ thúc đẩy bán hàng", "mà biết chuyển hóa đơn hàng và gia tăng giá trị trên mỗi khách hàng."],
    ["Không chỉ đặt mục tiêu doanh thu", "mà biết thiết kế và vận hành những hành động then chốt tạo ra kết quả."],
  ],
  enrol: {
    format: "Lớp công khai hoặc tổ chức riêng (in-house) cho doanh nghiệp",
    schedule: "Lịch khai giảng đang cập nhật — để lại thông tin để nhận lịch sớm nhất",
  },
} as const;
