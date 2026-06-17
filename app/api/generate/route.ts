import { NextRequest, NextResponse } from "next/server";
import { generateReport } from "@/lib/ai/ReportGenerator";
import { ReportFormData } from "@/types";
import { Locale } from "@/lib/i18n";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { data, locale } = body as { data: ReportFormData; locale: Locale };

    if (!data || !locale) {
      return NextResponse.json({ error: "Missing data or locale" }, { status: 400 });
    }

    const report = await generateReport(data, locale);
    return NextResponse.json({ report });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to generate report";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
