import { ReportFormData } from "@/types";

const OBS_LABELS_EN = {
  understanding: ["Excellent", "Good", "Needs Support"],
  participation: ["Active", "Moderate", "Passive"],
  focus: ["Excellent", "Moderate", "Needs Reminder"],
  taskCompletion: ["Complete", "Mostly Complete", "Partial"],
  confidence: ["High", "Growing", "Needs Encouragement"],
};

const OBS_LABELS_ID = {
  understanding: ["Sangat Baik", "Baik", "Perlu Dukungan"],
  participation: ["Aktif", "Cukup", "Pasif"],
  focus: ["Sangat Baik", "Cukup", "Perlu Diingatkan"],
  taskCompletion: ["Lengkap", "Hampir Lengkap", "Sebagian"],
  confidence: ["Tinggi", "Berkembang", "Perlu Dorongan"],
};

const CHALLENGES_EN = [
  "Need More Practice",
  "Exploration",
  "Focus",
  "Reading Adaptation",
  "Communication",
  "Following Instructions",
];

const STRENGTHS_EN = [
  "Creative",
  "Curious",
  "Independent",
  "Persistent",
  "Fast Learner",
  "Collaborative",
];

const CHALLENGES_ID = [
  "Perlu Lebih Banyak Latihan",
  "Eksplorasi",
  "Fokus",
  "Adaptasi Membaca",
  "Komunikasi",
  "Mengikuti Instruksi",
];

const STRENGTHS_ID = [
  "Kreatif",
  "Ingin Tahu",
  "Mandiri",
  "Tekun",
  "Cepat Belajar",
  "Kolaboratif",
];

const LENGTH_INSTRUCTION: Record<string, string> = {
  short: "Keep the report concise — around 100–150 words total. Focus on the 2–3 most notable observations.",
  standard: "Write a balanced report — around 150–220 words. Cover all observations naturally without rushing.",
  detailed: "Write a rich, thorough report — around 220–300 words. Expand each section with texture and specific detail.",
};

const LENGTH_INSTRUCTION_ID: Record<string, string> = {
  short: "Buat laporan yang ringkas — sekitar 100–150 kata. Fokus pada 2–3 observasi yang paling menonjol.",
  standard: "Tulis laporan yang seimbang — sekitar 150–220 kata. Sampaikan semua observasi secara mengalir.",
  detailed: "Tulis laporan yang kaya dan mendetail — sekitar 220–300 kata. Kembangkan setiap bagian dengan tekstur dan detail yang spesifik.",
};

const STYLE_INSTRUCTION: Record<string, string> = {
  formal: "Use a formal, structured academic tone. Sentences should be complete and precise.",
  warm: "Use a warm, personal, and encouraging tone — as if speaking directly to a parent who cares deeply about their child.",
  professional: "Use a professional yet human tone — clear and confident, but not cold.",
};

const STYLE_INSTRUCTION_ID: Record<string, string> = {
  formal: "Gunakan nada formal dan akademis. Kalimat harus lengkap dan presisi.",
  warm: "Gunakan nada yang hangat, personal, dan memotivasi — seolah-olah berbicara langsung kepada orang tua yang peduli.",
  professional: "Gunakan nada profesional namun tetap terasa manusiawi — jelas dan percaya diri, tapi tidak terasa dingin.",
};

export function buildPrompt(data: ReportFormData, locale: "id" | "en" = "en"): string {
  const isId = locale === "id";
  const obsLabels = isId ? OBS_LABELS_ID : OBS_LABELS_EN;
  const challengeLabels = isId ? CHALLENGES_ID : CHALLENGES_EN;
  const strengthLabels = isId ? STRENGTHS_ID : STRENGTHS_EN;
  const lengthMap = isId ? LENGTH_INSTRUCTION_ID : LENGTH_INSTRUCTION;
  const styleMap = isId ? STYLE_INSTRUCTION_ID : STYLE_INSTRUCTION;

  const understanding = data.understanding !== null ? obsLabels.understanding[data.understanding] : "-";
  const participation = data.participation !== null ? obsLabels.participation[data.participation] : "-";
  const focus = data.focus !== null ? obsLabels.focus[data.focus] : "-";
  const taskCompletion = data.taskCompletion !== null ? obsLabels.taskCompletion[data.taskCompletion] : "-";
  const confidence = data.confidence !== null ? obsLabels.confidence[data.confidence] : "-";
  const allChallenges = [
    ...data.challenges.map((i) => challengeLabels[i]),
    ...(data.customChallenges ?? []),
  ];
  const allStrengths = [
    ...data.strengths.map((i) => strengthLabels[i]),
    ...(data.customStrengths ?? []),
  ];
  const challenges = allChallenges.length > 0 ? allChallenges.join(", ") : (isId ? "Tidak ada" : "None");
  const strengths = allStrengths.length > 0 ? allStrengths.join(", ") : (isId ? "Tidak ada" : "None");

  const hasTeacherNotes = data.teacherNotes.trim().length > 0;
  const teacherNotes = data.teacherNotes.trim() || (isId ? "Tidak ada" : "None");

  const lengthInstruction = lengthMap[data.reportLength] ?? lengthMap.standard;
  const styleInstruction = styleMap[data.writingStyle] ?? styleMap.professional;
  const outputLang = isId ? "Indonesian (Bahasa Indonesia)" : "English";

  const header = isId ? "LAPORAN PERKEMBANGAN SISWA" : "STUDENT PROGRESS REPORT";
  const sections = isId
    ? { info: "Informasi Siswa", progress: "Perkembangan Belajar", activity: "Aktivitas / Proyek Pembelajaran", challenges: "Tantangan", strengths: "Kekuatan / Potensi", recommendation: "Rekomendasi Dukungan Orang Tua" }
    : { info: "Student Information", progress: "Learning Progress", activity: "Project / Learning Activities", challenges: "Challenges", strengths: "Strengths / Potentials", recommendation: "Parent Support Recommendation" };

  const labels = isId
    ? { name: "Nama Siswa", level: "Kelas / Level", teacher: "Teacher", period: "Periode" }
    : { name: "Student Name", level: "Level / Class", teacher: "Teacher", period: "Report Period" };

  const teacherNotesGuidance = hasTeacherNotes
    ? (isId
        ? `PENTING — Teacher Notes adalah panduan utama untuk nada dan fokus laporan ini. Catatan: "${teacherNotes}". Gunakan ini sebagai titik awal atau benang merah yang mewarnai keseluruhan laporan. Jangan kutip langsung, tapi biarkan maknanya mengalir secara organik ke dalam narasi.`
        : `IMPORTANT — Teacher Notes are the primary shaping reference for this report's focus and tone. Note: "${teacherNotes}". Use this as the lens through which you interpret the observations. Do not quote it directly — instead, let its meaning flow organically through the narrative.`)
    : (isId
        ? "Tidak ada catatan khusus dari teacher."
        : "No special teacher notes provided.");

  return `You are a seasoned teacher and expert educational report writer. You write reports that feel genuinely personal, not generated from a template.

${teacherNotesGuidance}

Your task: Write a student progress report using ONLY the data provided. Do not invent facts.

Tone & Style:
- ${styleInstruction}
- ${lengthInstruction}
- Write the way a real, experienced teacher would speak — thoughtful, nuanced, and human.
- NEVER start two consecutive sentences the same way.
- NEVER use the student's name more than twice in any paragraph.
- Vary your vocabulary deliberately: if you used "demonstrates" once, use "shows", "reveals", "reflects" next.
- Mix sentence lengths naturally: short punchy sentences next to longer flowing ones.
- Observations should feel woven into a story, not listed as facts.
- Challenges must feel like natural next steps on a journey, not shortcomings.
- Strengths should be specific and vivid — tie them directly to the topic or project, not just generic praise.
- The parent recommendation must feel personally crafted for this child's specific topic and situation.
- Do not mention AI, scores, or numeric grades.
- Output language: ${outputLang}

Structural variety rules:
- Learning Progress: Never open with the student's full name. Start with an observation, a quality, the topic, or a scene from class. Weave all five observation dimensions (understanding, participation, focus, task completion, confidence) naturally — not as a list.
- Activity section: Be vivid and concrete. What did the student actually do? What did it look like in class?
- Challenges: Frame each one as "where the journey continues" — forward-looking, not backward-looking. Each challenge gets exactly one sentence with a different grammatical structure.
- Strengths: Each strength gets one sentence. Connect it specifically to the topic/project — not just a label.
- Recommendation: Sound like a teacher personally advising a parent, not a printed pamphlet.

Output this exact structure (headers exactly as shown, plain text, no markdown, no asterisks, no bullet points, no numbering in challenges/strengths):

${header}

${sections.info}
${labels.name}: ${data.studentName}
${labels.level}: ${data.classLevel}
${labels.teacher}: ${data.teacherName}
${labels.period}: ${data.reportPeriod}

${sections.progress}
[Flowing prose only. 2–4 sentences depending on length setting. Weave all five dimensions naturally. If teacher notes exist, let them guide what gets emphasized.]

${sections.activity}
[2–3 vivid, concrete sentences about what the student did in the project/topic.]

${sections.challenges}
[Each challenge on its own SEPARATE LINE — no blank lines between them, no numbering, no dashes, no bullet points. Each sentence uses a completely different grammatical opening. Framed as forward-looking growth opportunities, never as criticism.]

${sections.strengths}
[Each strength on its own SEPARATE LINE — no blank lines between them, no numbering, no dashes, no bullet points. Each sentence is vivid and specific — connect to the topic or project when possible.]

${sections.recommendation}
[1 paragraph, 2–3 sentences. Personally crafted advice for this specific child and topic.]

---
INPUT DATA

Student: ${data.studentName}
Class: ${data.classLevel}
Teacher: ${data.teacherName}
Period: ${data.reportPeriod}
Topic: ${data.topicLearned}
Project: ${data.project}
Understanding: ${understanding}
Participation: ${participation}
Focus: ${focus}
Task Completion: ${taskCompletion}
Confidence: ${confidence}
Challenges: ${challenges}
Strengths: ${strengths}
Teacher Notes: ${teacherNotes}

Write the report now. Make it feel like only this teacher could have written this — about only this student.`;
}

// ── Paraphrase prompt ─────────────────────────────────────────────────────────

import { ParaphraseOptions } from "@/types";

const STYLE_INSTR_EN: Record<string, string> = {
  formal:       "Shift the tone to be more formal and academic — structured, precise, and composed.",
  warm:         "Shift the tone to be warmer, more personal, and encouraging — as if speaking directly to a parent who cares deeply.",
  professional: "Shift the tone to be professional yet human — confident and clear, but never cold.",
  keep:         "Maintain the existing writing style and tone.",
};

const STYLE_INSTR_ID: Record<string, string> = {
  formal:       "Ubah nada menjadi lebih formal dan akademis — terstruktur, presisi, dan tenang.",
  warm:         "Ubah nada menjadi lebih hangat, personal, dan memotivasi — seolah berbicara langsung kepada orang tua yang peduli.",
  professional: "Ubah nada menjadi profesional namun tetap terasa manusiawi — percaya diri dan jelas, tapi tidak dingin.",
  keep:         "Pertahankan gaya dan nada penulisan yang ada.",
};

const LENGTH_INSTR_EN: Record<string, string> = {
  shorter: "Make the report noticeably more concise — aim for 20–30% fewer words while keeping all essential information.",
  same:    "Keep the overall length approximately the same.",
  longer:  "Expand the report with richer detail and texture — aim for 20–30% more words, adding depth to each section.",
};

const LENGTH_INSTR_ID: Record<string, string> = {
  shorter: "Buat laporan menjadi lebih ringkas secara signifikan — targetkan pengurangan 20–30% kata sambil menjaga semua informasi penting.",
  same:    "Pertahankan panjang keseluruhan kira-kira sama.",
  longer:  "Kembangkan laporan dengan detail yang lebih kaya — targetkan penambahan 20–30% kata, perdalam setiap bagian.",
};

export function buildParaphrasePrompt(
  text: string,
  locale: "id" | "en",
  options: Partial<ParaphraseOptions> = {}
): string {
  const isId = locale === "id";
  const { style = "keep", lengthAdjust = "same", revisionNotes = "" } = options;

  const styleInstr = isId ? STYLE_INSTR_ID[style] : STYLE_INSTR_EN[style];
  const lengthInstr = isId ? LENGTH_INSTR_ID[lengthAdjust] : LENGTH_INSTR_EN[lengthAdjust];
  const hasNotes = revisionNotes.trim().length > 0;
  const notesBlock = hasNotes
    ? (isId
        ? `\nCATATAN REVISI DARI TEACHER (WAJIB DIINTEGRASIKAN): "${revisionNotes.trim()}"\nIntegrasikan poin-poin ini secara alami ke dalam narasi — jangan hanya menambahkan sebagai kalimat terpisah di akhir.`
        : `\nTEACHER REVISION NOTES (MUST BE INTEGRATED): "${revisionNotes.trim()}"\nWeave these points naturally into the narrative — do not simply append as a separate sentence at the end.`)
    : "";

  return isId
    ? `Kamu adalah editor profesional laporan pendidikan. Kamu diberi laporan perkembangan siswa yang mungkin sudah diedit sebagian oleh teacher.

PREFERENSI PARAFRASE:
• Gaya: ${styleInstr}
• Panjang: ${lengthInstr}${notesBlock}

ATURAN KETAT:
1. JAGA semua fakta dan data PERSIS sama — nama siswa, teacher, kelas, dan periode tidak boleh berubah
2. PERTAHANKAN semua header bagian (contoh: "Perkembangan Belajar", "Tantangan", dll.) persis seperti aslinya
3. PERTAHANKAN blok informasi siswa persis seperti aslinya
4. Variasikan pembukaan kalimat — tidak ada dua kalimat berurutan yang dimulai dengan cara yang sama
5. Buat bahasa terasa alami seperti ditulis guru berpengalaman yang sungguh peduli
6. Perbaiki kalimat canggung atau terasa seperti template
7. Output dalam Bahasa Indonesia
8. Teks biasa saja — tidak ada markdown, tidak ada cetak tebal, tidak ada tanda bintang

Kembalikan HANYA laporan yang sudah diperbaiki, tidak ada penjelasan lain.

LAPORAN YANG PERLU DIPARAFRASE:
${text}`
    : `You are a professional editor of educational reports. You have been given a student progress report that may have been partially edited by the teacher.

PARAPHRASE PREFERENCES:
• Style: ${styleInstr}
• Length: ${lengthInstr}${notesBlock}

STRICT RULES:
1. KEEP all facts and data EXACTLY the same — student name, teacher, class, and period must not change
2. PRESERVE all section headers (e.g. "Learning Progress", "Challenges", etc.) exactly as they are
3. PRESERVE the student information block exactly as it is
4. Vary sentence openings — no two consecutive sentences should begin in the same way
5. Make the language feel natural, as if written by a thoughtful, experienced teacher who genuinely cares
6. Fix any awkward or template-sounding phrasing
7. Output in English
8. Plain text only — no markdown, no bold, no asterisks

Return ONLY the improved report, nothing else.

REPORT TO PARAPHRASE:
${text}`;
}
