import { ReportFormData } from "@/types";
import { buildPrompt } from "@/lib/prompt";
import { buildReport } from "@/lib/template";
import { AIProvider } from "./AIProvider";
import { GroqProvider } from "./GroqProvider";
import { Locale } from "@/lib/i18n";

const SYSTEM_PROMPT = `You are an expert educational report writer.
Generate student progress reports that are professional, warm, and constructive.
Never mention AI, scores, or grades. Base content strictly on the provided data.
Output plain text only — no markdown, no JSON.`;

function getTemperature(style: ReportFormData["writingStyle"]): number {
  if (style === "formal") return 0.5;
  if (style === "warm") return 0.9;
  return 0.7;
}

function validateInput(data: ReportFormData): void {
  if (!data.studentName.trim()) throw new Error("Student name is required");
  if (!data.teacherName.trim()) throw new Error("Teacher name is required");
  if (!data.topicLearned.trim()) throw new Error("Topic is required");
}

export async function generateReport(
  data: ReportFormData,
  locale: Locale = "en",
  provider: AIProvider = new GroqProvider()
): Promise<string> {
  validateInput(data);

  const userPrompt = buildPrompt(data, locale);
  const temperature = getTemperature(data.writingStyle);

  const response = await provider.generate({
    systemPrompt: SYSTEM_PROMPT,
    userPrompt,
    temperature,
    maxTokens: 1024,
  });

  if (response.success && response.text) {
    return response.text;
  }

  // Fallback to template-based generation if AI fails
  console.warn("[ReportGenerator] AI failed, using template fallback");
  return buildReport(data, locale);
}
