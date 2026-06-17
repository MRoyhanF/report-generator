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
  short: "Keep the report concise — 100–150 words total.",
  standard: "Write a standard-length report — 150–220 words total.",
  detailed: "Write a thorough, detailed report — 220–300 words total.",
};

const LENGTH_INSTRUCTION_ID: Record<string, string> = {
  short: "Buat laporan yang ringkas — total 100–150 kata.",
  standard: "Tulis laporan dengan panjang standar — total 150–220 kata.",
  detailed: "Tulis laporan yang lengkap dan mendetail — total 220–300 kata.",
};

const STYLE_INSTRUCTION: Record<string, string> = {
  formal: "Use a formal, academic tone.",
  warm: "Use a warm, friendly, and encouraging tone.",
  professional: "Use a professional yet approachable tone.",
};

const STYLE_INSTRUCTION_ID: Record<string, string> = {
  formal: "Gunakan nada yang formal dan akademis.",
  warm: "Gunakan nada yang hangat, ramah, dan memotivasi.",
  professional: "Gunakan nada yang profesional namun tetap mudah dipahami.",
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
  const challenges = data.challenges.length > 0 ? data.challenges.map((i) => challengeLabels[i]).join(", ") : (isId ? "Tidak ada" : "None");
  const strengths = data.strengths.length > 0 ? data.strengths.map((i) => strengthLabels[i]).join(", ") : (isId ? "Tidak ada" : "None");
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

  return `You are an expert educational report writer with years of classroom experience.

Task: Write a student progress report using ONLY the data provided. Do not add facts that are not in the input.

Tone & Style:
- ${styleInstruction}
- ${lengthInstruction}
- Write as a real teacher would — natural, human, and varied.
- Each report must feel unique. Avoid formulaic or repetitive sentence patterns.
- Start the Learning Progress section with a different opening each time (do NOT always begin with the student's name).
- Mix sentence lengths: some short and punchy, some longer and descriptive.
- Challenges must sound like growth opportunities, never criticism.
- Parent recommendation must be practical and specific to the topic.
- Do not mention AI, scores, or grades.
- Output language: ${outputLang}

Variation rules (rotate these):
- Vary how you open the Learning Progress paragraph: sometimes start with an observation, sometimes with the topic, sometimes with a quality the student showed.
- Vary how challenges are framed: "continuing to develop...", "with more opportunities to...", "as [name] grows more comfortable with..."
- Vary strength descriptions: be specific, not generic. Reference the topic or project when relevant.

Output this exact structure (section headers as-is, no markdown, no bold, no bullet points):

${header}

${sections.info}
${labels.name}: ${data.studentName}
${labels.level}: ${data.classLevel}
${labels.teacher}: ${data.teacherName}
${labels.period}: ${data.reportPeriod}

${sections.progress}
[2–4 sentences of flowing prose. Weave in understanding, participation, focus, task completion, and confidence naturally. If teacher notes are provided, integrate them organically — do not append them as a separate sentence.]

${sections.activity}
[2–3 sentences. Describe what the student actually did in the project/topic. Be specific and concrete.]

${sections.challenges}
[One sentence per challenge, framed as a growth opportunity. Vary the sentence structure across items.]

${sections.strengths}
[One sentence per strength. Be specific — connect each strength to how it shows up in this student's work.]

${sections.recommendation}
[One paragraph, 2–3 sentences. Give parents a concrete, topic-specific action they can do at home.]

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

Write the report now. Make it feel like it was written by a thoughtful, experienced teacher — not a template.`;
}
