"use client";

import { useI18n } from "@/lib/i18n";
import { Label } from "@/components/ui/label";
import { Observations, ObsIndex, ReportLength, WritingStyle } from "@/types";

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
      <Label className="text-[13px] font-medium text-[#171717]">
        {label}{required && <Required />}
      </Label>
      <div className="flex rounded-lg border border-[#E7E5E4] overflow-hidden bg-white">
        {options.map((opt, idx) => {
          const active = value === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelect(idx as ObsIndex)}
              className={`flex-1 py-2 text-[12px] font-medium transition-subtle border-r last:border-r-0 border-[#E7E5E4] ${
                active ? colors[idx] : "text-[#6B7280] hover:bg-[#F5F5F4] hover:text-[#171717]"
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

function ChipGroup({
  label,
  options,
  selected,
  onToggle,
  multiHint,
  required,
}: {
  label: string;
  options: string[];
  selected: number[];
  onToggle: (idx: number) => void;
  multiHint: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline gap-2">
        <Label className="text-[13px] font-medium text-[#171717]">
          {label}{required && <Required />}
        </Label>
        <span className="text-[11px] text-[#9CA3AF]">{multiHint}</span>
      </div>
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
                  ? "bg-[#16A34A] text-white border-[#16A34A]"
                  : "bg-white text-[#6B7280] border-[#E7E5E4] hover:border-[#16A34A] hover:text-[#16A34A]"
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
        <ChipGroup
          label={t.form.challenges}
          options={opts.challenges}
          selected={values.challenges}
          onToggle={(idx) => toggle("challenges", idx)}
          multiHint={multiHint}
        />
        <ChipGroup
          label={t.form.strengths}
          options={opts.strengths}
          selected={values.strengths}
          onToggle={(idx) => toggle("strengths", idx)}
          multiHint={multiHint}
        />
      </div>
    </div>
  );
}
