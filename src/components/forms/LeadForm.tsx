"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { localeFromPathname } from "@/i18n/locale";
import { siteConfig } from "@/lib/siteConfig";
import type { LeadType } from "@/lib/leads";
import { Button } from "@/components/ui/Button";

const defaultNeeds = [
  "Đào tạo & huấn luyện",
  "Tư vấn chuyển đổi doanh nghiệp",
  "Trustworking — tìm nhà cung cấp / đối tác",
  "Trustworking — giới thiệu giải pháp",
  "Kết nối chuyên gia",
  "Đăng ký chương trình",
  "Nhân lực mở / nhân lực số",
  "Dịch vụ hỗ trợ",
  "Hợp tác cùng VABIX",
  "Khác",
];

const needByType: Partial<Record<LeadType, string[]>> = {
  "trust-buyer": ["Tìm nhà cung cấp", "Tìm đối tác hợp tác", "Tìm giải pháp theo ngành", "Khác"],
  "trust-supplier": ["Giới thiệu sản phẩm / dịch vụ", "Mở rộng thị trường", "Tham gia làng ngành", "Khác"],
  "trust-expert": ["Tư vấn chuyên môn", "Đồng hành dự án", "Giảng dạy / huấn luyện", "Khác"],
  partnership: ["Hợp tác chương trình", "Hợp tác truyền thông", "Hợp tác mạng lưới", "Khác"],
  program: ["Đăng ký chương trình", "Tư vấn chương trình theo yêu cầu", "Khảo sát nội bộ", "Khác"],
  training: ["Tư vấn chương trình", "Đăng ký lớp", "Khảo sát nội bộ", "Khác"],
  "corporate-training": ["Thiết kế chương trình nội bộ", "Khảo sát hiện trạng", "Đào tạo theo phòng ban", "Khác"],
  bmdo: ["Tư vấn BMDO", "Lớp đang mở", "Khảo sát doanh nghiệp", "Khác"],
  mbm: ["Tư vấn MBM", "Lịch khai giảng", "Đối tượng phù hợp", "Khác"],
  transformation: ["Đánh giá nhu cầu chuyển đổi", "Chẩn đoán doanh nghiệp", "Đồng hành triển khai", "Khác"],
  trustworking: ["Tìm nhà cung cấp", "Giới thiệu năng lực cung cấp", "Kết nối đối tác", "Khác"],
  "open-workforce": ["Kết nối chuyên gia", "Nhân sự dự án", "Đội ngũ linh hoạt", "Khác"],
  "digital-workforce": ["Trợ lý AI", "AI Agent", "Automation có kiểm soát", "Khác"],
  "support-service": ["Nhân sự sự kiện", "Kết nối diễn giả", "KOL", "Hỗ trợ bản thảo sách", "Khác"],
};

const sizes = ["Dưới 20 người", "20–50", "51–200", "Trên 200"];

const defaultNeedsEn = [
  "Training & coaching",
  "Business transformation consulting",
  "Trustworking — find suppliers / partners",
  "Trustworking — present a solution",
  "Connect with experts",
  "Program registration",
  "Open workforce / digital workforce",
  "Support services",
  "Partner with VABIX",
  "Other",
];

const needByTypeEn: Partial<Record<LeadType, string[]>> = {
  "trust-buyer": ["Find suppliers", "Find partners", "Find industry solutions", "Other"],
  "trust-supplier": ["Present products / services", "Expand markets", "Join an industry village", "Other"],
  "trust-expert": ["Expert advice", "Project partnership", "Teaching / coaching", "Other"],
  partnership: ["Program partnership", "Media partnership", "Network partnership", "Other"],
  program: ["Program registration", "Custom program advice", "In-house assessment", "Other"],
  training: ["Program advice", "Class registration", "In-house assessment", "Other"],
  "corporate-training": ["Design an in-house program", "Current-state assessment", "Department training", "Other"],
  bmdo: ["BMDO advice", "Open classes", "Business assessment", "Other"],
  mbm: ["Program advice", "Schedule", "Who it suits", "Other"],
  transformation: ["Transformation needs review", "Business diagnosis", "Implementation support", "Other"],
  trustworking: ["Find suppliers", "Present supply capabilities", "Connect partners", "Other"],
  "open-workforce": ["Connect experts", "Project staff", "Flexible teams", "Other"],
  "digital-workforce": ["AI assistants", "AI agents", "Controlled automation", "Other"],
  "support-service": ["Event staff", "Speaker booking", "KOL", "Book-writing support", "Other"],
};

const sizesEn = ["Under 20 people", "20–50", "51–200", "Over 200"];

const L = {
  vi: {
    ok: "Yêu cầu đã được ghi nhận. VABIX sẽ liên hệ trong thời gian sớm nhất.",
    fail: "Không gửi được yêu cầu.",
    name: "Họ tên",
    company: "Doanh nghiệp",
    role: "Chức vụ",
    phone: "Số điện thoại",
    size: "Quy mô doanh nghiệp",
    sizePick: "Chọn quy mô",
    need: "Nhu cầu",
    needPick: "Chọn nhu cầu",
    message: "Nội dung cần trao đổi",
    consentA: "Tôi đã đọc",
    privacy: "Chính sách quyền riêng tư",
    consentB: "và đồng ý để VABIX xử lý thông tin tôi cung cấp nhằm tiếp nhận, tư vấn và liên hệ về yêu cầu này.",
    marketing: "Tôi đồng ý nhận thông tin chương trình, sự kiện và tri thức từ VABIX (không bắt buộc).",
    orCall: "Hoặc gọi",
    sending: "Đang gửi...",
    send: "Gửi yêu cầu",
  },
  en: {
    ok: "Your request has been received. VABIX will contact you shortly.",
    fail: "We could not send your request.",
    name: "Full name",
    company: "Company",
    role: "Position",
    phone: "Phone",
    size: "Company size",
    sizePick: "Select size",
    need: "Need",
    needPick: "Select a need",
    message: "What would you like to discuss?",
    consentA: "I have read the",
    privacy: "Privacy Policy",
    consentB: "and agree that VABIX may process the information I provide to receive, advise on and follow up this request.",
    marketing: "I agree to receive program, event and knowledge updates from VABIX (optional).",
    orCall: "Or call",
    sending: "Sending...",
    send: "Send request",
  },
};

function readUtm() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
    const value = params.get(key);
    if (value) utm[key] = value;
  }
  return utm;
}

export function LeadForm({
  type = "consult",
  title,
  eventSlug,
  program,
}: {
  type?: LeadType;
  title?: string;
  eventSlug?: string;
  program?: string;
}) {
  const started = useMemo(() => Date.now(), []);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const locale = localeFromPathname(usePathname() ?? "/");
  const en = locale === "en";
  const tx = L[locale];
  const needs = en ? (needByTypeEn[type] ?? defaultNeedsEn) : (needByType[type] ?? defaultNeeds);
  const sizeOptions = en ? sizesEn : sizes;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setMessage("");
    const fd = new FormData(e.currentTarget);
    const payload = {
      type,
      name: String(fd.get("name") ?? ""),
      company: String(fd.get("company") ?? ""),
      role: String(fd.get("role") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      companySize: String(fd.get("companySize") ?? ""),
      need: String(fd.get("need") ?? ""),
      message: String(fd.get("message") ?? ""),
      program: program ?? String(fd.get("program") ?? ""),
      eventSlug,
      consent: fd.get("consent") === "on",
      marketingConsent: fd.get("marketingConsent") === "on",
      website: String(fd.get("website") ?? ""),
      elapsedMs: Date.now() - started,
      sourcePage: typeof window !== "undefined" ? window.location.pathname : "",
      utm: readUtm(),
    };
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await res.json()) as { ok: boolean; message?: string };
    if (data.ok) {
      setStatus("success");
      setMessage(tx.ok);
      e.currentTarget.reset();
      return;
    }
    setStatus("error");
    setMessage(en ? tx.fail : (data.message ?? tx.fail));
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {title ? <h3 className="text-xl font-semibold text-vabix-deep-teal">{title}</h3> : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="name" label={tx.name} required autoComplete="name" />
        <Field name="company" label={tx.company} autoComplete="organization" />
        <Field name="role" label={tx.role} autoComplete="organization-title" />
        <Field name="phone" label={tx.phone} type="tel" required autoComplete="tel" />
        <Field name="email" label="Email" type="email" required autoComplete="email" />
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-vabix-deep-teal">{tx.size}</span>
          <select name="companySize" className="input">
            <option value="">{tx.sizePick}</option>
            {sizeOptions.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1.5 block font-medium text-vabix-deep-teal">{tx.need}</span>
          <select name="need" className="input">
            <option value="">{tx.needPick}</option>
            {needs.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1.5 block font-medium text-vabix-deep-teal">{tx.message}</span>
          <textarea name="message" rows={4} className="input min-h-[120px]" />
        </label>
      </div>
      <div className="hidden" aria-hidden>
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="flex items-start gap-2 text-sm text-vabix-muted">
        <input type="checkbox" name="consent" className="mt-1" required />
        <span>
          {tx.consentA}{" "}
          <a className="underline" href={en ? "/en/chinh-sach-quyen-rieng-tu" : "/chinh-sach-quyen-rieng-tu"}>
            {tx.privacy}
          </a>{" "}
          {tx.consentB}
        </span>
      </label>
      <label className="flex items-start gap-2 text-sm text-vabix-muted">
        <input type="checkbox" name="marketingConsent" className="mt-1" />
        <span>{tx.marketing}</span>
      </label>
      {message ? (
        <p className={`text-sm ${status === "success" ? "text-vabix-forest" : "text-red-800"}`} role="status">
          {message}
        </p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm text-vabix-muted">
          {tx.orCall}{" "}
          <a href={siteConfig.contact.hotlineHref} className="font-semibold text-vabix-deep-teal">
            {siteConfig.contact.hotline}
          </a>{" "}
          / email{" "}
          <a href={siteConfig.contact.emailHref} className="font-semibold text-vabix-deep-teal">
            {siteConfig.contact.email}
          </a>
          .
        </p>
      ) : null}
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? tx.sending : tx.send}
      </Button>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  autoComplete,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-vabix-deep-teal">
        {label}
        {required ? " *" : ""}
      </span>
      <input name={name} type={type} required={required} autoComplete={autoComplete} className="input" />
    </label>
  );
}
