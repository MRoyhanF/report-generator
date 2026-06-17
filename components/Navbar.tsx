"use client";

import { useI18n, type Locale } from "@/lib/i18n";

export function Navbar() {
  const { locale, setLocale, t } = useI18n();

  return (
    <header className="sticky top-0 z-50 bg-[#FAFAF8]/90 backdrop-blur-sm border-b border-[#E7E5E4]">
      <div className="max-w-[1440px] mx-auto px-6 h-14 flex items-center justify-between">
        <span className="text-[15px] font-semibold text-[#171717] tracking-tight">
          {t.nav.title}
        </span>

        <div className="flex items-center gap-1 bg-white border border-[#E7E5E4] rounded-lg p-0.5">
          {(["id", "en"] as Locale[]).map((l) => (
            <button
              key={l}
              onClick={() => setLocale(l)}
              className={`px-3 py-1 text-[13px] font-medium rounded-md transition-subtle ${
                locale === l
                  ? "bg-[#16A34A] text-white"
                  : "text-[#6B7280] hover:text-[#171717]"
              }`}
            >
              {l === "id" ? "ID" : "EN"}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
