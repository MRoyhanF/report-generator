import { ReportFormData, ReportLength, ObsIndex } from "@/types";

// ── English sentence pools ───────────────────────────────────────────────────

const en = {
  openings: [
    (n: string, t: string) => `${n} has shown positive progress in learning about ${t} this period.`,
    (n: string, t: string) => `Throughout this period, ${n} actively engaged with the topic of ${t}.`,
    (n: string, t: string) => `${n} participated in learning activities centered around ${t} with good overall engagement.`,
  ],
  understanding: [
    ["demonstrates an excellent grasp of the material and follows explanations quickly.", "has shown outstanding comprehension of the concepts taught."],
    ["shows a solid understanding of the material that continues to grow.", "demonstrates adequate comprehension and is making steady progress."],
    ["is actively building understanding of the material with additional guidance.", "is developing comprehension of the topic with appropriate support in place."],
  ],
  participation: [
    ["actively participates in class, often asking questions and contributing to discussions.", "engages enthusiastically in every learning session."],
    ["participates in class activities at a consistent and steady level.", "shows a reasonable level of engagement during lessons."],
    ["is gradually building confidence to participate more actively in class.", "is developing the habit of engaging more in classroom activities."],
  ],
  focus: [
    ["maintains excellent concentration throughout learning activities.", "demonstrates strong and consistent focus during lessons."],
    ["maintains adequate focus during the majority of learning activities.", "generally stays on task and engaged throughout lessons."],
    ["occasionally benefits from gentle reminders to maintain focus.", "is developing the ability to sustain attention over longer periods."],
  ],
  taskCompletion: [
    ["All assigned tasks are completed thoroughly and on time.", "Every learning task has been finished with care and in a timely manner."],
    ["The majority of tasks have been completed to a good standard.", "Most learning tasks have been finished satisfactorily."],
    ["Is making progress in completing assigned tasks and is being encouraged to finish work more consistently.", "Task completion is still developing and is an area of focus going forward."],
  ],
  confidence: [
    ["demonstrates strong self-confidence across all activities.", "approaches tasks with a clear sense of self-assurance."],
    ["is steadily growing in confidence from week to week.", "is beginning to show increasing self-confidence in their work."],
    ["responds well to encouragement and is gradually building confidence.", "is developing self-confidence and benefits greatly from positive reinforcement."],
  ],
  challenges: [
    "building deeper understanding through more consistent practice",
    "broadening curiosity by exploring topics in greater depth",
    "developing the ability to concentrate for longer periods",
    "becoming comfortable with a wider variety of reading materials",
    "strengthening the ability to express ideas both verbally and in writing",
    "practising the habit of listening carefully and following directions",
  ],
  strengths: [
    "a strong creative flair when expressing ideas",
    "an admirable curiosity and eagerness to learn new things",
    "the ability to work independently without relying heavily on others",
    "remarkable persistence and determination when facing challenges",
    "the ability to absorb new information quickly and effectively",
    "a wonderful team spirit and willingness to work well with peers",
  ],
  recommendations: [
    "Short, regular practice sessions at home will support continued growth.",
    "Encourage exploration of the topic through age-appropriate books or videos.",
    "Help establish a consistent and distraction-free study routine at home.",
    "Reading together at home using materials that match your child's interests will be very beneficial.",
    "Encourage your child to share stories or opinions about their day at home.",
    "Practise simple step-by-step instructions during everyday activities at home.",
  ],
  reportHeader: "STUDENT PROGRESS REPORT",
  sections: {
    studentInfo: "Student Information",
    progress: "Learning Progress",
    activities: "Project / Learning Activities",
    challenges: "Challenges",
    strengths: "Strengths / Potentials",
    recommendation: "Parent Support Recommendation",
  },
  labels: { name: "Student Name", class: "Class / Level", teacher: "Teacher", period: "Report Period" },
  activityTemplate: (n: string, t: string, p: string) =>
    `${n} took part in learning activities focused on ${t} through the project: ${p}. This activity was designed to reinforce conceptual understanding through hands-on engagement.`,
  noChallenges: (n: string) => `${n} is showing well-rounded progress across all areas of learning.`,
  noStrengths: (n: string) => `${n} demonstrates dedication and enthusiasm that is very much appreciated.`,
  defaultRecommendation: "Continue to support your child's enthusiasm for learning with encouragement and appreciation for every achievement.",
};

// ── Indonesian sentence pools ────────────────────────────────────────────────

const id = {
  openings: [
    (n: string, t: string) => `${n} menunjukkan perkembangan yang positif dalam mempelajari materi ${t}.`,
    (n: string, t: string) => `Selama periode ini, ${n} aktif mengikuti pembelajaran tentang ${t}.`,
    (n: string, t: string) => `${n} telah mengikuti kegiatan belajar seputar ${t} dengan baik secara keseluruhan.`,
  ],
  understanding: [
    ["memiliki pemahaman yang sangat baik terhadap materi dan dapat mengikuti penjelasan dengan cepat.", "memahami konsep yang diajarkan dengan sangat baik."],
    ["menunjukkan pemahaman yang cukup baik terhadap materi dan terus berkembang.", "menunjukkan pemahaman yang memadai dan membuat kemajuan yang stabil."],
    ["sedang membangun pemahaman terhadap materi dengan bimbingan tambahan.", "mengembangkan pemahaman terhadap topik ini dengan dukungan yang sesuai."],
  ],
  participation: [
    ["berpartisipasi aktif di kelas, sering bertanya dan berkontribusi dalam diskusi.", "terlibat dengan antusias dalam setiap sesi pembelajaran."],
    ["berpartisipasi dalam kegiatan kelas secara konsisten dan stabil.", "menunjukkan tingkat keterlibatan yang cukup selama pelajaran."],
    ["sedang membangun kepercayaan diri untuk berpartisipasi lebih aktif di kelas.", "mengembangkan kebiasaan untuk lebih terlibat dalam kegiatan kelas."],
  ],
  focus: [
    ["menjaga konsentrasi yang sangat baik selama kegiatan pembelajaran.", "menunjukkan fokus yang kuat dan konsisten selama pelajaran."],
    ["menjaga fokus yang memadai selama sebagian besar kegiatan pembelajaran.", "umumnya tetap fokus dan terlibat sepanjang pelajaran."],
    ["sesekali membutuhkan pengingat lembut untuk menjaga fokus.", "sedang mengembangkan kemampuan untuk mempertahankan perhatian dalam jangka waktu lebih lama."],
  ],
  taskCompletion: [
    ["Semua tugas yang diberikan diselesaikan dengan lengkap dan tepat waktu.", "Setiap tugas pembelajaran telah diselesaikan dengan baik dan tepat waktu."],
    ["Sebagian besar tugas telah diselesaikan dengan standar yang baik.", "Hampir semua tugas pembelajaran telah diselesaikan dengan memuaskan."],
    ["Sedang membuat kemajuan dalam menyelesaikan tugas dan terus didorong untuk lebih konsisten.", "Penyelesaian tugas masih berkembang dan menjadi fokus ke depannya."],
  ],
  confidence: [
    ["menunjukkan kepercayaan diri yang kuat dalam semua aktivitas.", "mendekati setiap tugas dengan rasa percaya diri yang jelas."],
    ["terus tumbuh dalam kepercayaan diri dari minggu ke minggu.", "mulai menunjukkan kepercayaan diri yang semakin meningkat dalam pekerjaannya."],
    ["merespons dengan baik terhadap dorongan dan secara bertahap membangun kepercayaan diri.", "sedang mengembangkan kepercayaan diri dan sangat diuntungkan oleh penguatan positif."],
  ],
  challenges: [
    "membangun pemahaman yang lebih dalam melalui latihan yang lebih konsisten",
    "memperluas rasa ingin tahu dengan mengeksplorasi topik lebih dalam",
    "mengembangkan kemampuan berkonsentrasi dalam jangka waktu yang lebih lama",
    "membiasakan diri dengan berbagai jenis bahan bacaan",
    "memperkuat kemampuan menyampaikan ide secara lisan maupun tulisan",
    "melatih kebiasaan mendengarkan dengan saksama dan mengikuti arahan",
  ],
  strengths: [
    "kreativitas yang kuat dalam mengekspresikan ide",
    "rasa ingin tahu yang tinggi dan semangat belajar hal baru",
    "kemampuan bekerja secara mandiri tanpa banyak bergantung pada orang lain",
    "ketekunan dan tekad yang luar biasa dalam menghadapi tantangan",
    "kemampuan menyerap informasi baru dengan cepat dan efektif",
    "semangat kerja tim yang baik dan kemauan bekerja sama dengan teman",
  ],
  recommendations: [
    "Latihan singkat dan rutin di rumah akan mendukung perkembangan siswa.",
    "Dorong eksplorasi topik melalui buku atau video yang sesuai usia.",
    "Bantu membangun rutinitas belajar yang konsisten dan minim gangguan di rumah.",
    "Membaca bersama di rumah menggunakan bahan bacaan yang sesuai minat anak akan sangat bermanfaat.",
    "Dorong anak untuk berbagi cerita atau pendapat tentang kesehariannya di rumah.",
    "Latih instruksi langkah demi langkah yang sederhana dalam kegiatan sehari-hari di rumah.",
  ],
  reportHeader: "LAPORAN PERKEMBANGAN SISWA",
  sections: {
    studentInfo: "Informasi Siswa",
    progress: "Perkembangan Belajar",
    activities: "Aktivitas / Proyek Pembelajaran",
    challenges: "Tantangan",
    strengths: "Kekuatan / Potensi",
    recommendation: "Rekomendasi Dukungan Orang Tua",
  },
  labels: { name: "Nama Siswa", class: "Kelas / Level", teacher: "Teacher", period: "Periode" },
  activityTemplate: (n: string, t: string, p: string) =>
    `${n} mengikuti kegiatan pembelajaran bertema ${t} melalui aktivitas: ${p}. Kegiatan ini dirancang untuk memperkuat pemahaman konsep secara langsung dan mendorong keterlibatan aktif siswa.`,
  noChallenges: (n: string) => `${n} menunjukkan perkembangan yang merata di berbagai aspek pembelajaran.`,
  noStrengths: (n: string) => `${n} menunjukkan dedikasi dan semangat belajar yang patut diapresiasi.`,
  defaultRecommendation: "Terus dukung semangat belajar siswa dengan memberikan apresiasi atas setiap pencapaiannya.",
};

interface Lang {
  openings: ((n: string, t: string) => string)[];
  understanding: string[][];
  participation: string[][];
  focus: string[][];
  taskCompletion: string[][];
  confidence: string[][];
  challenges: string[];
  strengths: string[];
  recommendations: string[];
  reportHeader: string;
  sections: { studentInfo: string; progress: string; activities: string; challenges: string; strengths: string; recommendation: string };
  labels: { name: string; class: string; teacher: string; period: string };
  activityTemplate: (n: string, t: string, p: string) => string;
  noChallenges: (n: string) => string;
  noStrengths: (n: string) => string;
  defaultRecommendation: string;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function pick<T>(arr: T[], seed: string): T {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) & 0xffffffff;
  return arr[Math.abs(hash) % arr.length];
}

// ── Main builder ─────────────────────────────────────────────────────────────

export function buildReport(data: ReportFormData, locale: "id" | "en"): string {
  const lang: Lang = locale === "en" ? en : id;
  const name = data.studentName;
  const seed = name + data.topicLearned;

  const opening = pick(lang.openings, seed)(name, data.topicLearned);

  const u = data.understanding !== null ? lang.understanding[data.understanding][0] : "";
  const p = data.participation !== null ? lang.participation[data.participation][1] : "";
  const f = data.focus !== null ? lang.focus[data.focus][0] : "";
  const tc = data.taskCompletion !== null ? lang.taskCompletion[data.taskCompletion][1] : "";
  const conf = data.confidence !== null ? lang.confidence[data.confidence][0] : "";

  const notesPart = data.teacherNotes.trim() ? ` ${data.teacherNotes.trim()}` : "";

  const progress =
    data.reportLength === "short"
      ? `${opening} ${name} ${u} ${name} ${p}${notesPart}`
      : data.reportLength === "detailed"
      ? `${opening} ${name} ${u} ${name} ${p} ${name} ${f} ${tc} ${name} ${conf}${notesPart}`
      : `${opening} ${name} ${u} ${name} ${p} ${name} ${f} ${tc}${notesPart}`;

  const activity = lang.activityTemplate(name, data.topicLearned, data.project);

  const challengeLines =
    data.challenges.length > 0
      ? data.challenges.map((idx, i) => `${i + 1}. ${name} — ${lang.challenges[idx]}.`).join("\n")
      : lang.noChallenges(name);

  const strengthLines =
    data.strengths.length > 0
      ? data.strengths.map((idx, i) => `${i + 1}. ${name} — ${lang.strengths[idx]}.`).join("\n")
      : lang.noStrengths(name);

  const recommendation =
    data.challenges.length > 0
      ? lang.recommendations[data.challenges[0]]
      : lang.defaultRecommendation;

  const s = lang.sections;
  const l = lang.labels;

  return [
    lang.reportHeader,
    "",
    s.studentInfo,
    `${l.name.padEnd(16)}: ${name}`,
    `${l.class.padEnd(16)}: ${data.classLevel}`,
    `${l.teacher.padEnd(16)}: ${data.teacherName}`,
    `${l.period.padEnd(16)}: ${data.reportPeriod}`,
    "",
    s.progress,
    progress,
    "",
    s.activities,
    activity,
    "",
    s.challenges,
    challengeLines,
    "",
    s.strengths,
    strengthLines,
    "",
    s.recommendation,
    recommendation,
  ].join("\n");
}

// ── Polish / Rapikan ─────────────────────────────────────────────────────────

const synonymsId: [RegExp, string[]][] = [
  [/\bmenunjukkan\b/g, ["memperlihatkan", "menampilkan", "menunjukkan"]],
  [/\bperkembangan\b/g, ["kemajuan", "perkembangan", "peningkatan"]],
  [/\bpemahaman\b/g, ["pemahaman", "penguasaan", "kemampuan memahami"]],
  [/\bkegiatan\b/g, ["aktivitas", "kegiatan", "proses"]],
  [/\bterus\b/g, ["terus", "semakin", "kian"]],
];

const synonymsEn: [RegExp, string[]][] = [
  [/\bshows\b/g, ["demonstrates", "displays", "shows"]],
  [/\bprogress\b/g, ["growth", "progress", "development"]],
  [/\bunderstanding\b/g, ["comprehension", "understanding", "grasp"]],
  [/\bcontinues\b/g, ["continues", "keeps", "persists in"]],
];

export function polishText(text: string, locale: "id" | "en"): string {
  const synonyms = locale === "en" ? synonymsEn : synonymsId;
  let result = text;
  let toggle = 0;
  for (const [pattern, replacements] of synonyms) {
    result = result.replace(pattern, () => {
      const word = replacements[toggle % replacements.length];
      toggle++;
      return word;
    });
  }
  return result;
}
