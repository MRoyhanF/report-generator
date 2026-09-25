import { NextRequest, NextResponse } from "next/server";
import { paraphraseReport } from "@/lib/ai/ReportGenerator";
import { Locale } from "@/lib/i18n";
import { ParaphraseOptions } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, locale, options } = body as {
      text: string;
      locale: Locale;
      options?: Partial<ParaphraseOptions>;
    };

    if (!text?.trim() || !locale) {
      return NextResponse.json({ error: "Missing text or locale" }, { status: 400 });
    }

    const report = await paraphraseReport(text, locale, options ?? {});
    return NextResponse.json({ report });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to paraphrase report";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
