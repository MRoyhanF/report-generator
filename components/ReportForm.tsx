"use client";

import { useI18n } from "@/lib/i18n";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ObservationSection } from "@/components/ObservationSection";
import { ReportFormData, ReportLength, WritingStyle } from "@/types";

interface Props {
  values: ReportFormData;
  onChange: (values: ReportFormData) => void;
}

function Required() {
  return <span className="text-red-500 ml-0.5">*</span>;
}

function Field({
  label,
  id,
  value,
  onChange,
  placeholder,
  required = false,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-[13px] font-medium text-[#171717]">
        {label}{required && <Required />}
      </Label>
      <Input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="text-[13px] h-9 border-[#E7E5E4] bg-white rounded-lg placeholder:text-[#9CA3AF] transition-subtle hover:border-[#16A34A]/50 focus-visible:ring-[#16A34A]/30"
      />
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[13px] font-semibold uppercase tracking-widest text-[#6B7280] mb-4">
      {children}
    </p>
  );
}

function Divider() {
  return <div className="border-t border-[#E7E5E4] my-6" />;
}

function CardPicker<T extends string>({
  label,
  options,
  keys,
  value,
  onSelect,
  descriptions,
  required,
}: {
  label: string;
  options: string[];
  keys: T[];
  value: T;
  onSelect: (v: T) => void;
  descriptions?: string[];
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-[13px] font-medium text-[#171717]">
        {label}{required && <Required />}
      </Label>
      <div className="grid grid-cols-3 gap-2">
        {options.map((opt, idx) => {
          const active = value === keys[idx];
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelect(keys[idx])}
              className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl border text-[12px] font-medium transition-subtle ${
                active
                  ? "bg-[#F0FDF4] border-[#16A34A] text-[#15803D]"
                  : "bg-white border-[#E7E5E4] text-[#6B7280] hover:border-[#16A34A]/50 hover:text-[#171717]"
              }`}
            >
              <span>{opt}</span>
              {descriptions && (
                <span className={`text-[11px] mt-0.5 font-normal ${active ? "text-[#16A34A]/70" : "text-[#9CA3AF]"}`}>
                  {descriptions[idx]}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ReportForm({ values, onChange }: Props) {
  const { t } = useI18n();

  function set<K extends keyof ReportFormData>(key: K, val: ReportFormData[K]) {
    onChange({ ...values, [key]: val });
  }

  const p = t.form.placeholders;
  const opts = t.options;

  return (
    <div>
      <SectionTitle>{t.form.studentInfo}</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label={t.form.studentName} id="studentName" value={values.studentName} onChange={(v) => set("studentName", v)} placeholder={p.studentName} required />
        <Field label={t.form.teacherName} id="teacherName" value={values.teacherName} onChange={(v) => set("teacherName", v)} placeholder={p.teacherName} required />
        <Field label={t.form.classLevel} id="classLevel" value={values.classLevel} onChange={(v) => set("classLevel", v)} placeholder={p.classLevel} required />
        <Field label={t.form.reportPeriod} id="reportPeriod" value={values.reportPeriod} onChange={(v) => set("reportPeriod", v)} placeholder={p.reportPeriod} required />
      </div>

      <Divider />

      <SectionTitle>{t.form.learningInfo}</SectionTitle>
      <div className="space-y-4">
        <Field label={t.form.topicLearned} id="topicLearned" value={values.topicLearned} onChange={(v) => set("topicLearned", v)} placeholder={p.topicLearned} required />
        <Field label={t.form.project} id="project" value={values.project} onChange={(v) => set("project", v)} placeholder={p.project} required />
      </div>

      <Divider />

      <SectionTitle>{t.form.observations}</SectionTitle>
      <ObservationSection
        values={values}
        onChange={(obs) => onChange({ ...values, ...obs })}
      />

      <Divider />

      <div className="space-y-1.5">
        <Label htmlFor="teacherNotes" className="text-[13px] font-medium text-[#171717]">
          {t.form.teacherNotes}{" "}
          <span className="text-[#9CA3AF] font-normal">{t.form.teacherNotesOptional}</span>
        </Label>
        <Textarea
          id="teacherNotes"
          value={values.teacherNotes}
          onChange={(e) => set("teacherNotes", e.target.value.slice(0, 150))}
          placeholder={t.form.teacherNotesPlaceholder}
          className="text-[13px] border-[#E7E5E4] bg-white rounded-lg placeholder:text-[#9CA3AF] resize-none transition-subtle hover:border-[#16A34A]/50 focus-visible:ring-[#16A34A]/30 min-h-20"
        />
        <p className="text-[12px] text-[#9CA3AF] text-right">
          {values.teacherNotes.length}/150
        </p>
      </div>

      <Divider />

      <SectionTitle>{t.form.reportSettings}</SectionTitle>
      <div className="space-y-4">
        <CardPicker<ReportLength>
          label={t.form.reportLength}
          options={opts.reportLength}
          keys={["short", "standard", "detailed"]}
          value={values.reportLength}
          onSelect={(v) => set("reportLength", v)}
          descriptions={t.form.reportLengthDesc}
        />
        <CardPicker<WritingStyle>
          label={t.form.writingStyle}
          options={opts.writingStyle}
          keys={["formal", "warm", "professional"]}
          value={values.writingStyle}
          onSelect={(v) => set("writingStyle", v)}
          descriptions={t.form.writingStyleDesc}
        />
      </div>
    </div>
  );
}
