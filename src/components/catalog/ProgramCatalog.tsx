"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeFromPathname } from "@/i18n/locale";
import { programGroupsEn } from "@/content/en/programs";
import { topicCategories as topicCategoriesEn } from "@/content/en/training";
import { programs as filePrograms, programGroups } from "@/content/programs";
import { topicCategories } from "@/content/training";
import type { ProgramGroupId, TopicCategoryId, TrainingProgram } from "@/content/types";

export function ProgramCatalog({ programs = filePrograms }: { programs?: TrainingProgram[] }) {
  const en = localeFromPathname(usePathname() ?? "/") === "en";
  const groups = en ? programGroupsEn : programGroups;
  const topics = en ? topicCategoriesEn : topicCategories;
  const [q, setQ] = useState("");
  const [group, setGroup] = useState<ProgramGroupId | "all">("all");
  const [topic, setTopic] = useState<TopicCategoryId | "all">("all");

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    return programs.filter((p) => {
      if (p.status !== "published") return false;
      if (group !== "all" && p.group !== group) return false;
      if (topic !== "all" && !p.topicCategories.includes(topic)) return false;
      if (!query) return true;
      const hay = [p.title, p.shortTitle, p.audience, p.problem, ...p.topics].join(" ").toLowerCase();
      return hay.includes(query);
    });
  }, [q, group, topic, programs]);

  return (
    <div>
      <div className="grid gap-3 md:grid-cols-3">
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-vabix-deep-teal">{en ? "Find a program" : "Tìm chương trình"}</span>
          <input
            className="input"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={en ? "Name, audience, topic…" : "Tên, đối tượng, chuyên đề…"}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-vabix-deep-teal">{en ? "Group" : "Nhóm"}</span>
          <select className="input" value={group} onChange={(e) => setGroup(e.target.value as ProgramGroupId | "all")}>
            <option value="all">{en ? "All groups" : "Tất cả nhóm"}</option>
            {groups.map((g) => (
              <option key={g.id} value={g.id}>
                {g.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-vabix-deep-teal">{en ? "Topic area" : "Lĩnh vực chuyên đề"}</span>
          <select className="input" value={topic} onChange={(e) => setTopic(e.target.value as TopicCategoryId | "all")}>
            <option value="all">{en ? "All topics" : "Tất cả lĩnh vực"}</option>
            {topics.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="mt-4 text-sm text-vabix-muted">{list.length} {en ? (list.length === 1 ? "matching program" : "matching programs") : "chương trình phù hợp"}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {list.map((p) => (
          <Link key={p.slug} href={`/dao-tao/${p.slug}`} className="flex h-full flex-col border border-vabix-deep-teal/10 bg-white p-6 hover:border-vabix-gold">
            <p className="eyebrow">{groups.find((g) => g.id === p.group)?.label}</p>
            <h2 className="mt-2 text-lg font-semibold text-vabix-deep-teal">{p.title}</h2>
            <p className="mt-3 flex-1 text-sm text-vabix-muted">{p.audience}</p>
            <p className="mt-4 text-sm font-semibold text-vabix-gold">{p.duration ?? p.durationNote ?? (en ? "Contact us for details" : "Liên hệ tư vấn chương trình")}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
