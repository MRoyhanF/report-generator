"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useI18n, type Locale } from "@/lib/i18n";

export function Navbar() {
  const { locale, setLocale, t } = useI18n();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
      <div className="max-w-[1440px] mx-auto px-6 h-14 flex items-center justify-between">
        <span className="text-[15px] font-semibold text-foreground tracking-tight">
          {t.nav.title}
        </span>

        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <div className="flex items-center gap-1 bg-card border border-border rounded-lg p-0.5">
            {(["id", "en"] as Locale[]).map((l) => (
              <button
                key={l}
                onClick={() => setLocale(l)}
                className={`px-3 py-1 text-[13px] font-medium rounded-md transition-subtle ${
                  locale === l
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l === "id" ? "ID" : "EN"}
              </button>
            ))}
          </div>

          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground transition-subtle"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
