"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Label } from "@/components/ui/label";
import { Observations, ObsIndex } from "@/types";

interface Props {
  values: Observations;
  onChange: (values: Observations) => void;
}

function Required() {
  return <span className="text-red-500 ml-0.5">*</span>;
}

function SegmentedPill({
  label,
  options,
  value,
  onSelect,
  colors,
  required,
}: {
  label: string;
  options: string[];
  value: ObsIndex | null;
  onSelect: (idx: ObsIndex) => void;
  colors: [string, string, string];
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[13px] font-medium text-foreground">
        {label}{required && <Required />}
      </Label>
      <div className="flex rounded-lg border border-border overflow-hidden bg-card">
        {options.map((opt, idx) => {
          const active = value === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelect(idx as ObsIndex)}
              className={`flex-1 py-2 text-[12px] font-medium transition-subtle border-r last:border-r-0 border-border ${
                active ? colors[idx] : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ChipGroupWithCustom({
  label,
  options,
  selected,
  onToggle,
  multiHint,
  customItems,
  onAddCustom,
  onRemoveCustom,
  addPlaceholder,
  addLabel,
  required,
}: {
  label: string;
  options: string[];
  selected: number[];
  onToggle: (idx: number) => void;
  multiHint: string;
  customItems: string[];
  onAddCustom: (text: string) => void;
  onRemoveCustom: (idx: number) => void;
  addPlaceholder: string;
  addLabel: string;
  required?: boolean;
}) {
  const [inputVal, setInputVal] = useState("");

  function handleAdd() {
    const trimmed = inputVal.trim();
    if (!trimmed) return;
    onAddCustom(trimmed);
    setInputVal("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  }

  return (
    <div className="space-y-2.5">
      {/* Header */}
      <div className="flex items-baseline gap-2">
        <Label className="text-[13px] font-medium text-foreground">
          {label}{required && <Required />}
        </Label>
        <span className="text-[11px] text-muted-foreground">{multiHint}</span>
      </div>

      {/* Predefined quick-select chips */}
      <div className="flex flex-wrap gap-2">
        {options.map((opt, idx) => {
          const active = selected.includes(idx);
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onToggle(idx)}
              className={`px-3 py-1.5 text-[12px] font-medium rounded-full border transition-subtle ${
                active
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:border-primary hover:text-primary"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* Custom items — show as removable chips */}
      {customItems.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {customItems.map((item, idx) => (
            <span
              key={idx}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium rounded-full bg-secondary border border-primary/30 text-secondary-foreground"
            >
              {item}
              <button
                type="button"
                onClick={() => onRemoveCustom(idx)}
                aria-label="Remove"
                className="flex items-center justify-center w-3.5 h-3.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-subtle text-[11px] leading-none"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Free-text custom input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={addPlaceholder}
          className="flex-1 h-8 px-3 text-[12px] rounded-lg border border-dashed border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-subtle"
        />
        <button
          type="button"
          onClick={handleAdd}
          disabled={!inputVal.trim()}
          className="h-8 px-3 text-[12px] font-medium rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/50 disabled:opacity-40 disabled:cursor-not-allowed transition-subtle whitespace-nowrap"
        >
          {addLabel}
        </button>
      </div>
    </div>
  );
}

export function ObservationSection({ values, onChange }: Props) {
  const { t } = useI18n();
  const opts = t.options;

  function set<K extends keyof Observations>(key: K, val: Observations[K]) {
    onChange({ ...values, [key]: val });
  }

  function toggle(key: "challenges" | "strengths", idx: number) {
    const current = values[key] as number[];
    const next = current.includes(idx)
      ? current.filter((x) => x !== idx)
      : [...current, idx];
    set(key, next);
  }

  function addCustom(key: "customChallenges" | "customStrengths", text: string) {
    set(key, [...(values[key] ?? []), text]);
  }

  function removeCustom(key: "customChallenges" | "customStrengths", idx: number) {
    const next = (values[key] ?? []).filter((_, i) => i !== idx);
    set(key, next);
  }

  const greenAmberRed: [string, string, string] = [
    "bg-[#16A34A] text-white",
    "bg-[#D97706] text-white",
    "bg-[#DC2626] text-white",
  ];
  const greenAmberGray: [string, string, string] = [
    "bg-[#16A34A] text-white",
    "bg-[#D97706] text-white",
    "bg-[#9CA3AF] text-white",
  ];

  const multiHint = t.form.multiSelectHint;

  return (
    <div className="space-y-5">
      <SegmentedPill
        label={t.form.understanding}
        options={opts.understanding}
        value={values.understanding}
        onSelect={(v) => set("understanding", v)}
        colors={greenAmberRed}
        required
      />
      <SegmentedPill
        label={t.form.participation}
        options={opts.participation}
        value={values.participation}
        onSelect={(v) => set("participation", v)}
        colors={greenAmberRed}
        required
      />
      <SegmentedPill
        label={t.form.focus}
        options={opts.focus}
        value={values.focus}
        onSelect={(v) => set("focus", v)}
        colors={greenAmberRed}
        required
      />
      <SegmentedPill
        label={t.form.taskCompletion}
        options={opts.taskCompletion}
        value={values.taskCompletion}
        onSelect={(v) => set("taskCompletion", v)}
        colors={greenAmberGray}
        required
      />
      <SegmentedPill
        label={t.form.confidence}
        options={opts.confidence}
        value={values.confidence}
        onSelect={(v) => set("confidence", v)}
        colors={greenAmberRed}
        required
      />

      <div className="pt-1 space-y-5">
        <ChipGroupWithCustom
          label={t.form.challenges}
          options={opts.challenges}
          selected={values.challenges}
          onToggle={(idx) => toggle("challenges", idx)}
          multiHint={multiHint}
          customItems={values.customChallenges ?? []}
          onAddCustom={(text) => addCustom("customChallenges", text)}
          onRemoveCustom={(idx) => removeCustom("customChallenges", idx)}
          addPlaceholder={t.form.addChallenge}
          addLabel={t.form.addButton}
        />
        <ChipGroupWithCustom
          label={t.form.strengths}
          options={opts.strengths}
          selected={values.strengths}
          onToggle={(idx) => toggle("strengths", idx)}
          multiHint={multiHint}
          customItems={values.customStrengths ?? []}
          onAddCustom={(text) => addCustom("customStrengths", text)}
          onRemoveCustom={(idx) => removeCustom("customStrengths", idx)}
          addPlaceholder={t.form.addStrength}
          addLabel={t.form.addButton}
        />
      </div>
    </div>
  );
}
