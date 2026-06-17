"use client";

import { useI18n } from "@/lib/i18n";

interface Props {
  report: string;
  onChange: (text: string) => void;
  onRegenerate: () => void;
  onPolish: () => void;
  onReset: () => void;
}

export function ReportPreview({ report, onChange, onRegenerate, onPolish, onReset }: Props) {
  const { t } = useI18n();

  function handleCopy() {
    navigator.clipboard.writeText(report);
  }

  function handleDownload() {
    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "student-report.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[13px] font-semibold uppercase tracking-widest text-muted-foreground">
          {t.preview.title}
        </p>
        <div className="flex items-center gap-1">
          <ActionBtn onClick={onPolish} disabled={!report}>{t.buttons.polish}</ActionBtn>
          <ActionBtn onClick={onRegenerate} disabled={!report}>{t.buttons.regenerate}</ActionBtn>
          <ActionBtn onClick={handleCopy} disabled={!report}>{t.buttons.copy}</ActionBtn>
          <ActionBtn onClick={handleDownload} disabled={!report}>{t.buttons.download}</ActionBtn>
          <ActionBtn onClick={onReset} variant="ghost">{t.buttons.reset}</ActionBtn>
        </div>
      </div>

      {report ? (
        <div className="relative flex-1">
          <textarea
            value={report}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-full min-h-[560px] p-6 text-[15px] leading-[1.9] font-[var(--font-geist-mono)] bg-background border border-border rounded-xl text-foreground resize-none outline-none focus:ring-1 focus:ring-ring/30 transition-subtle"
            spellCheck={false}
          />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center min-h-[560px] bg-background border border-dashed border-border rounded-xl">
          <p className="text-[13px] text-muted-foreground text-center max-w-[240px] leading-relaxed">
            {t.preview.empty}
          </p>
        </div>
      )}
    </div>
  );
}

function ActionBtn({
  children,
  onClick,
  disabled,
  variant = "outline",
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: "outline" | "ghost";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`h-7 px-2.5 text-[12px] font-medium rounded-md transition-subtle disabled:opacity-40 disabled:cursor-not-allowed ${
        variant === "outline"
          ? "border border-border bg-card text-muted-foreground hover:text-foreground hover:border-foreground"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
