"use client";

import { useState, useEffect, useRef } from "react";
import { useI18n } from "@/lib/i18n";
import { ParaphraseOptions } from "@/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (options: ParaphraseOptions) => void;
}

type StyleOption = ParaphraseOptions["style"];
type LengthOption = ParaphraseOptions["lengthAdjust"];

export function ParaphraseModal({ isOpen, onClose, onConfirm }: Props) {
  const { t } = useI18n();
  const m = t.paraphraseModal;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [style, setStyle] = useState<StyleOption>("keep");
  const [lengthAdjust, setLengthAdjust] = useState<LengthOption>("same");
  const [revisionNotes, setRevisionNotes] = useState("");

  // Focus textarea when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => textareaRef.current?.focus(), 120);
    }
  }, [isOpen]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setStyle("keep");
        setLengthAdjust("same");
        setRevisionNotes("");
      }, 250);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  function handleConfirm() {
    onConfirm({ style, lengthAdjust, revisionNotes });
  }

  const STYLES: { key: StyleOption; icon: string }[] = [
    { key: "formal",       icon: "📋" },
    { key: "warm",         icon: "🌱" },
    { key: "professional", icon: "⚡" },
    { key: "keep",         icon: "🔒" },
  ];

  const LENGTHS: { key: LengthOption; icon: string }[] = [
    { key: "shorter", icon: "↑" },
    { key: "same",    icon: "↔" },
    { key: "longer",  icon: "↓" },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleBackdropClick}
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-200 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(2px)" }}
      >
        {/* Modal card */}
        <div
          className={`bg-card border border-border rounded-2xl w-full max-w-[440px] shadow-2xl transition-all duration-200 ${
            isOpen ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-3 opacity-0"
          }`}
        >
          {/* Header */}
          <div className="flex items-start justify-between px-7 pt-6 pb-5 border-b border-border">
            <div>
              <p className="text-[15px] font-semibold text-foreground">✨ {m.title}</p>
              <p className="text-[12px] text-muted-foreground mt-0.5">{m.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="w-7 h-7 flex items-center justify-center rounded-lg text-[16px] text-muted-foreground hover:text-foreground hover:bg-muted transition-subtle leading-none mt-0.5"
            >
              ×
            </button>
          </div>

          {/* Body */}
          <div className="px-7 py-5 space-y-5">
            {/* Writing style picker */}
            <div className="space-y-2">
              <p className="text-[12px] font-semibold uppercase tracking-widest text-muted-foreground">
                {m.styleLabel}
              </p>
              <div className="grid grid-cols-4 gap-2">
                {STYLES.map(({ key, icon }) => {
                  const active = style === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setStyle(key)}
                      className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border text-center transition-subtle ${
                        active
                          ? "bg-secondary border-primary text-secondary-foreground"
                          : "bg-card border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      }`}
                    >
                      <span className="text-[16px] leading-none">{icon}</span>
                      <span className="text-[11px] font-medium leading-tight">{m.styleOptions[key]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Length picker */}
            <div className="space-y-2">
              <p className="text-[12px] font-semibold uppercase tracking-widest text-muted-foreground">
                {m.lengthLabel}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {LENGTHS.map(({ key, icon }) => {
                  const active = lengthAdjust === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setLengthAdjust(key)}
                      className={`flex flex-col items-center gap-1 py-3 px-3 rounded-xl border text-center transition-subtle ${
                        active
                          ? "bg-secondary border-primary text-secondary-foreground"
                          : "bg-card border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      }`}
                    >
                      <span className="text-[13px] font-bold leading-none">{icon}</span>
                      <span className="text-[11px] font-medium leading-tight">{m.lengthOptions[key]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Revision notes */}
            <div className="space-y-1.5">
              <p className="text-[12px] font-semibold uppercase tracking-widest text-muted-foreground">
                {m.notesLabel}{" "}
                <span className="normal-case tracking-normal font-normal text-muted-foreground/70">
                  {m.notesOptional}
                </span>
              </p>
              <textarea
                ref={textareaRef}
                value={revisionNotes}
                onChange={(e) => setRevisionNotes(e.target.value)}
                placeholder={m.notesPlaceholder}
                rows={3}
                className="w-full px-3 py-2.5 text-[12px] border border-border bg-background rounded-lg text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-1 focus:ring-primary/40 transition-subtle leading-relaxed"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-2.5 px-7 py-5 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-9 text-[13px] font-medium rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-subtle"
            >
              {m.cancel}
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="flex-[2] h-9 text-[13px] font-medium rounded-xl bg-foreground text-background hover:opacity-80 active:scale-[0.98] transition-subtle"
            >
              ✨ {m.confirm}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
