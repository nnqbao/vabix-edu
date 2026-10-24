import type { Pillar } from "../types";

// English versions of the `src/content/pillars.ts` exports. `vi` holds the localised display name.

export const pillars: Pillar[] = [
  {
    id: "dao-tao-huan-luyen",
    number: "01",
    en: "Training & Coaching",
    vi: "Training and coaching",
    href: "/dao-tao",
    problem:
      "Learners need to see the problem clearly, design solutions, apply them at work and measure the results — not just sit through another theory course.",
    value:
      "From the CEO Practice Ground and 1:1 coaching to training tailored to each business — helping learners see the problem clearly, design solutions, apply them at work and measure the results.",
    summary:
      "From the CEO Practice Ground and 1:1 coaching to training tailored to each business — helping learners see the problem clearly, design solutions, apply them at work and measure the results.",
    services: [
      { label: "For business owners & CEOs", href: "/dao-tao#doanh-chu" },
      { label: "For managers & staff", href: "/dao-tao#quan-ly" },
      { label: "Custom in-company training", href: "/dao-tao/theo-yeu-cau-doanh-nghiep" },
      { label: "Schedule / open classes", href: "/dao-tao/lich" },
    ],
    cta: { label: "Explore training and coaching", href: "/dao-tao" },
  },
  {
    id: "tu-van-chuyen-doi",
    number: "02",
    en: "Transformation",
    vi: "Transformation consulting",
    href: "/tu-van-chuyen-doi",
    problem:
      "Businesses have plenty of initiatives but lack a diagnosis of their bottlenecks, a coherent design and support through implementation.",
    value:
      "Look at the whole business to set the right priorities, design the way forward and support the change through implementation — connecting strategy, market, people, finance, technology and operations.",
    summary:
      "Look at the whole business to set the right priorities, design the way forward and support the change through implementation — connecting strategy, market, people, finance, technology and operations.",
    services: [
      { label: "Comprehensive assessment and diagnosis", href: "/tu-van-chuyen-doi/danh-gia-toan-dien" },
      { label: "Business restructuring", href: "/tu-van-chuyen-doi/tai-cau-truc" },
      { label: "Digital transformation and AI adoption", href: "/tu-van-chuyen-doi/chuyen-doi-so-ai" },
      { label: "Implementation support", href: "/tu-van-chuyen-doi/dong-hanh-trien-khai" },
    ],
    cta: { label: "Explore transformation consulting", href: "/tu-van-chuyen-doi" },
  },
  {
    id: "trustworking",
    number: "03",
    en: "Trustworking",
    vi: "Business connections built on trust",
    href: "/trustworking",
    problem:
      "Ordinary networking is wide but shallow: it is easy to meet the wrong partners, there is little screening and it rarely leads to lasting collaboration.",
    value:
      "Connect businesses, experts and partners according to their needs and matching capabilities. We take care to understand each side, cross-check information and clarify expectations before any introduction, aiming for responsible, long-term partnerships.",
    summary:
      "Connect businesses, experts and partners according to their needs and matching capabilities. We take care to understand each side, cross-check information and clarify expectations before any introduction.",
    services: [
      { label: "For suppliers", href: "/trustworking#nha-cung-cap" },
      { label: "For clients / partners", href: "/trustworking#khach-hang" },
      { label: "The Trustworking process", href: "/trustworking#quy-trinh" },
      { label: "Submit a connection request", href: "/trustworking#ket-noi" },
    ],
    cta: { label: "Explore Trustworking", href: "/trustworking" },
  },
];

export const supportingLayers: typeof import("../pillars").supportingLayers = [
  {
    title: "Books",
    href: "/sach",
    summary: "Knowledge publications that help business owners and teams learn, apply and pass on practical methods.",
  },
  {
    title: "Handbooks",
    href: "/cam-nang",
    summary: "Topic-based guides that support decisions and action.",
  },
  {
    title: "Learning materials",
    href: "/tri-thuc#hoc-lieu",
    summary: "Digital learning materials for programmes and for putting ideas into practice.",
  },
  {
    title: "Open workforce",
    href: "/nhan-luc-mo-nhan-luc-so#nhan-luc-mo",
    summary: "Add expertise. Flex resources. Coordinate around goals.",
  },
  {
    title: "Digital workforce",
    href: "/nhan-luc-mo-nhan-luc-so#nhan-luc-so",
    summary: "Clear tasks. Right permissions. Controlled operation.",
  },
];
