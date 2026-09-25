"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ReportForm } from "@/components/ReportForm";
import { ReportPreview } from "@/components/ReportPreview";
import { ParaphraseModal } from "@/components/ParaphraseModal";
import { useI18n } from "@/lib/i18n";
import { ReportFormData, DEFAULT_OBSERVATIONS, ParaphraseOptions } from "@/types";

const defaultValues: ReportFormData = {
  studentName: "",
  teacherName: "",
  classLevel: "",
  reportPeriod: "",
  topicLearned: "",
  project: "",
  ...DEFAULT_OBSERVATIONS,
};

function isFormValid(data: ReportFormData): boolean {
  return !!(
    data.studentName.trim() &&
    data.teacherName.trim() &&
    data.classLevel.trim() &&
    data.reportPeriod.trim() &&
    data.topicLearned.trim() &&
    data.project.trim() &&
    data.understanding !== null &&
    data.participation !== null &&
    data.focus !== null &&
    data.taskCompletion !== null &&
    data.confidence !== null
  );
}

function PageContent() {
  const { locale, t } = useI18n();
  const [formData, setFormData] = useState<ReportFormData>(defaultValues);
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);
  const [paraphrasing, setParaphrasing] = useState(false);
  const [showParaphraseModal, setShowParaphraseModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: formData, locale }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed to generate report");
      setReport(json.report);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to generate report");
    } finally {
      setLoading(false);
    }
  }

  async function handleParaphrase(options: ParaphraseOptions) {
    if (!report.trim()) return;
    setShowParaphraseModal(false);
    setParaphrasing(true);
    setError(null);
    try {
      const res = await fetch("/api/paraphrase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: report, locale, options }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed to paraphrase report");
      setReport(json.report);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to paraphrase");
    } finally {
      setParaphrasing(false);
    }
  }

  function handleReset() {
    setFormData(defaultValues);
    setReport("");
    setError(null);
  }

  const valid = isFormValid(formData);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-360 mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left: Form — 2 cols */}
          <section className="lg:col-span-2">
            <div className="bg-card border border-border rounded-2xl p-7">
              <ReportForm values={formData} onChange={setFormData} />

              <div className="mt-8">
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={!valid || loading}
                  className="w-full h-10 text-[14px] font-medium bg-foreground text-background rounded-xl transition-subtle hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {loading ? t.buttons.generating : t.buttons.generate}
                </button>
                {!valid && (
                  <p className="mt-2 text-[12px] text-[#9CA3AF] text-center">
                    {t.validation.fillRequired}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Right: Preview — 3 cols */}
          <section className="lg:col-span-3 lg:sticky lg:top-20 lg:self-start">
            <div className="bg-card border border-border rounded-2xl p-7">
              {error && (
                <p className="mb-3 text-[12px] text-red-500">{error}</p>
              )}
              <ReportPreview
                report={report}
                onChange={setReport}
                onRegenerate={handleGenerate}
                onPolish={() => setShowParaphraseModal(true)}
                onReset={handleReset}
                paraphrasing={paraphrasing}
              />
            </div>
          </section>
        </div>
      </main>

      {/* Paraphrase modal — portal at page level */}
      <ParaphraseModal
        isOpen={showParaphraseModal}
        onClose={() => setShowParaphraseModal(false)}
        onConfirm={handleParaphrase}
      />
    </div>
  );
}

export default function Home() {
  return <PageContent />;
}
