import { ReportFormData } from "@/types";

// ── English sentence pools ───────────────────────────────────────────────────

const en = {
  openings: [
    (n: string, t: string) => `${n} has shown meaningful progress in learning about ${t} this period.`,
    (n: string, t: string) => `Throughout this period, there has been a clear and positive engagement with the topic of ${t}.`,
    (n: string, t: string) => `The study of ${t} brought out some genuinely encouraging qualities in ${n} this period.`,
    (n: string, t: string) => `This period's focus on ${t} gave ${n} a solid opportunity to grow, and the results have been encouraging.`,
    (n: string, t: string) => `It has been a productive period of learning for ${n}, particularly in the exploration of ${t}.`,
    (n: string, t: string) => `A noteworthy level of effort and curiosity was evident as ${n} worked through the topic of ${t}.`,
  ],
  understanding: [
    [
      "demonstrated an excellent grasp of the concepts introduced, often making connections that showed real depth of understanding.",
      "grasped the material with impressive speed and clarity, consistently applying new ideas with confidence.",
      "showed outstanding comprehension throughout — ideas that were introduced quickly became tools that were actively used.",
    ],
    [
      "developed a solid understanding of the material over the course of this period, with steady and consistent growth.",
      "followed the lesson content well and showed a reliable ability to apply what was learned.",
      "showed a good, working understanding of the key concepts, with some areas continuing to deepen.",
    ],
    [
      "is in the early stages of building understanding, and with the right support, the foundation is clearly there.",
      "is working through the material at a thoughtful pace — understanding is developing well with continued guidance.",
      "is building comprehension step by step, and responds positively when given time and encouragement to work things through.",
    ],
  ],
  participation: [
    [
      "actively contributed to class discussions, often asking questions that enriched the learning for the whole group.",
      "was a consistent and energetic presence in class — always willing to share ideas and engage with peers.",
      "brought enthusiasm and initiative to every session, making the learning environment livelier for everyone.",
    ],
    [
      "participated at a steady and reliable level throughout the period.",
      "engaged with class activities in a consistent and calm manner.",
      "was a dependable participant, contributing when prompted and following along with care.",
    ],
    [
      "is gradually finding more confidence to participate, and small moments of engagement have been genuinely encouraging.",
      "tends to observe carefully before joining in — a thoughtfulness that is beginning to translate into more active participation.",
      "is warming to the class dynamic and is increasingly willing to share thoughts when given the space to do so.",
    ],
  ],
  focus: [
    [
      "maintained a strong and sustained level of focus throughout learning activities.",
      "rarely lost concentration — even during longer or more complex tasks, attention remained sharp.",
      "showed the kind of focus that allows learning to really take root — consistent, purposeful, and calm.",
    ],
    [
      "generally stayed on task and was able to engage meaningfully during most activities.",
      "maintained a workable level of focus across the majority of the period.",
      "showed adequate concentration for the demands of the lessons, with only occasional drifting.",
    ],
    [
      "is developing the ability to hold attention for longer stretches, and gentle reminders have been helpful in supporting this.",
      "occasionally needed a nudge to refocus, but responded well and quickly got back on track.",
      "concentration is an area that is actively being worked on — there are already signs of improvement.",
    ],
  ],
  taskCompletion: [
    [
      "All assigned tasks were completed to a high standard and submitted on time.",
      "Every piece of work was finished carefully and with evident effort and attention to detail.",
      "Work was consistently completed — and completed well — throughout the period.",
    ],
    [
      "The majority of tasks were completed satisfactorily, with good effort shown across the board.",
      "Most learning tasks were finished to a solid standard, with only minor gaps remaining.",
      "Work was largely completed, and the quality of what was submitted reflected genuine engagement.",
    ],
    [
      "Task completion is an area of active focus — progress is being made, and the intention to finish work is clearly there.",
      "Some tasks remained incomplete, though this is something being addressed with encouragement and structure.",
      "With continued support, completing work more consistently will come — the motivation is building.",
    ],
  ],
  confidence: [
    [
      "approached every activity with a clear and grounded sense of self-assurance.",
      "showed strong confidence throughout — particularly when tackling unfamiliar challenges.",
      "carried a quiet but unmistakable confidence that made the learning process feel natural and self-directed.",
    ],
    [
      "is steadily growing in confidence, and the difference from the start of the period to now is noticeable.",
      "confidence is building at a healthy pace — each small success seems to fuel the next.",
      "is beginning to back themselves more in class, which is having a really positive effect on engagement.",
    ],
    [
      "responds warmly to encouragement and is gradually developing a stronger belief in their own abilities.",
      "confidence is something being actively nurtured — the potential is absolutely there, and it is beginning to surface.",
      "with the right support and affirmation, the confidence to fully engage is clearly on its way.",
    ],
  ],

  // Challenges: full sentence functions, one per predefined option (index 0–5)
  challenges: [
    (n: string) => `With more regular and deliberate practice, ${n} will steadily build the fluency and depth this topic deserves.`,
    (n: string) => `Broadening curiosity by exploring ideas beyond the surface is a natural next horizon for ${n}.`,
    (n: string) => `Building the stamina to maintain full focus over longer stretches is something ${n} is actively working on.`,
    (n: string) => `Becoming comfortable with a wider range of reading materials is an area ${n} is continuing to develop at their own pace.`,
    (n: string) => `With more opportunity to express ideas both verbally and in writing, ${n}'s communication will open up further.`,
    (n: string) => `Listening carefully and following multi-step instructions is a skill ${n} is building, with encouraging progress already visible.`,
  ],

  // Varied sentence wrappers for custom free-text challenges
  customChallengeSentences: [
    (n: string, c: string) => `${n} is also actively working on ${c}.`,
    (n: string, c: string) => `Another area of continued growth for ${n} is ${c}.`,
    (n: string, c: string) => `Support is also in place to help ${n} with ${c}.`,
    (n: string, c: string) => `Making progress with ${c} is something ${n} is being actively encouraged to develop.`,
  ],

  // Strengths: full sentence functions, one per predefined option (index 0–5)
  strengths: [
    (n: string) => `${n} brings genuine creative energy to every task — seeing possibilities and angles that others often miss.`,
    (n: string) => `A natural curiosity drives ${n}'s engagement, turning every new idea into something worth pursuing.`,
    (n: string) => `The ability to work independently — with real focus and without needing constant direction — is one of ${n}'s most reliable strengths.`,
    (n: string) => `When things get difficult, ${n} responds with persistence rather than avoidance — a quality that will serve well in any challenge.`,
    (n: string) => `New concepts tend to click quickly for ${n}, and what is learned one day is confidently applied the next.`,
    (n: string) => `${n}'s collaborative spirit enriches the classroom — group work becomes more productive and more enjoyable when ${n} is part of it.`,
  ],

  // Varied sentence wrappers for custom free-text strengths
  customStrengthSentences: [
    (n: string, s: string) => `${n} also stands out for ${s} — a quality that shows up clearly in daily learning.`,
    (n: string, s: string) => `${s.charAt(0).toUpperCase() + s.slice(1)} is another notable quality that ${n} brings to the classroom.`,
    (n: string, s: string) => `It is also worth recognising ${n}'s ${s}, which makes a real difference.`,
    (n: string, s: string) => `${n} consistently demonstrates ${s} in a way that enriches the learning environment.`,
  ],

  recommendations: [
    "Short, enjoyable practice sessions at home — even just ten minutes — will go a long way toward building fluency and confidence.",
    "Exploring the topic through age-appropriate books, videos, or podcasts at home would be a wonderful extension of what is being covered in class.",
    "A calm and consistent study space at home, even briefly, can make a significant difference to focus and task completion.",
    "Reading together at home, choosing materials that match your child's interests, will support both comprehension and a love of learning.",
    "Encouraging your child to tell you about their day in detail — what they learned, how they felt — builds vocabulary and communication skills naturally.",
    "Working through simple, real-life tasks together that involve following steps or instructions is a great way to practise this at home.",
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
  activityTemplates: [
    (n: string, t: string, p: string) =>
      `${n} engaged with the topic of ${t} through the project: ${p}. The activity offered a hands-on way to explore and apply the ideas introduced in class, and the effort put in was clearly visible.`,
    (n: string, t: string, p: string) =>
      `The project "${p}" gave ${n} a practical context in which to explore ${t}. It was an opportunity to move beyond theory and into genuine application, and the engagement it sparked was encouraging.`,
    (n: string, t: string, p: string) =>
      `Through "${p}", ${n} had the chance to bring the concepts of ${t} to life in a tangible way. The activity was designed to bridge classroom learning with real, hands-on experience.`,
  ],
  noChallenges: (n: string) => `${n} is making well-rounded progress across all observed areas — a reflection of real effort and growing capability.`,
  noStrengths: (n: string) => `The dedication and enthusiasm that ${n} brings to learning are qualities worth recognising and nurturing.`,
  defaultRecommendation: "Continue to celebrate your child's efforts — not just the results — and nurture the enthusiasm for learning that is already clearly there.",
  notesBridge: [
    (note: string) => `It is also worth noting that ${note.toLowerCase()}.`,
    (note: string) => `One observation that stood out this period: ${note.toLowerCase()}.`,
    (note: string) => `${note} — and this has been reflected in the learning across the period.`,
  ],
};

// ── Indonesian sentence pools ────────────────────────────────────────────────

const id = {
  openings: [
    (n: string, t: string) => `${n} menunjukkan perkembangan yang berarti dalam pembelajaran materi ${t} pada periode ini.`,
    (n: string, t: string) => `Selama periode ini, terlihat keterlibatan yang jelas dan positif dalam topik ${t}.`,
    (n: string, t: string) => `Pembelajaran tentang ${t} memunculkan beberapa kualitas yang menggembirakan dari diri ${n}.`,
    (n: string, t: string) => `Fokus pada materi ${t} memberikan kesempatan yang baik bagi ${n} untuk berkembang, dan hasilnya sangat menggembirakan.`,
    (n: string, t: string) => `Ini adalah periode pembelajaran yang produktif bagi ${n}, terutama dalam eksplorasi materi ${t}.`,
    (n: string, t: string) => `Semangat dan rasa ingin tahu yang nyata terlihat ketika ${n} mempelajari topik ${t} pada periode ini.`,
  ],
  understanding: [
    [
      "menunjukkan pemahaman yang sangat baik terhadap konsep-konsep yang diajarkan, sering membuat koneksi yang mencerminkan kedalaman berpikir yang sesungguhnya.",
      "memahami materi dengan kecepatan dan kejelasan yang mengesankan, secara konsisten menerapkan ide-ide baru dengan penuh keyakinan.",
      "menunjukkan pemahaman yang luar biasa — konsep yang baru diperkenalkan dengan cepat menjadi alat yang digunakan secara aktif.",
    ],
    [
      "membangun pemahaman yang kuat terhadap materi sepanjang periode ini, dengan perkembangan yang stabil dan konsisten.",
      "mengikuti isi pelajaran dengan baik dan menunjukkan kemampuan yang andal dalam menerapkan apa yang dipelajari.",
      "menunjukkan pemahaman yang cukup baik terhadap konsep-konsep utama, dengan beberapa area yang terus berkembang.",
    ],
    [
      "sedang dalam tahap awal membangun pemahaman, dan dengan dukungan yang tepat, fondasinya sudah jelas terlihat.",
      "menyerap materi dengan tempo yang penuh pertimbangan — pemahaman berkembang dengan baik seiring bimbingan yang diberikan.",
      "membangun pemahaman selangkah demi selangkah, dan merespons dengan baik ketika diberi waktu dan dorongan untuk berpikir.",
    ],
  ],
  participation: [
    [
      "berkontribusi aktif dalam diskusi kelas, sering mengajukan pertanyaan yang memperkaya pembelajaran seluruh kelompok.",
      "hadir dengan penuh semangat dan energi — selalu siap berbagi ide dan berinteraksi dengan teman-teman.",
      "membawa antusias dan inisiatif dalam setiap sesi, menciptakan suasana belajar yang lebih hidup bagi semua.",
    ],
    [
      "berpartisipasi secara stabil dan andal sepanjang periode.",
      "terlibat dalam kegiatan kelas dengan cara yang konsisten dan tenang.",
      "menjadi peserta yang bisa diandalkan, berkontribusi ketika diajak dan mengikuti pelajaran dengan seksama.",
    ],
    [
      "perlahan-lahan menemukan kepercayaan diri untuk berpartisipasi, dan momen-momen kecil keterlibatan sangat menggembirakan.",
      "cenderung mengamati dengan cermat sebelum bergabung — sebuah ketelitian yang mulai berbuah menjadi partisipasi yang lebih aktif.",
      "semakin nyaman dengan dinamika kelas dan semakin bersedia berbagi pikiran ketika diberi ruang untuk melakukannya.",
    ],
  ],
  focus: [
    [
      "menjaga tingkat fokus yang kuat dan berkelanjutan sepanjang kegiatan pembelajaran.",
      "jarang kehilangan konsentrasi — bahkan saat menghadapi tugas yang lebih panjang atau kompleks, perhatian tetap tajam.",
      "menunjukkan fokus yang memungkinkan pembelajaran benar-benar meresap — konsisten, bertujuan, dan tenang.",
    ],
    [
      "umumnya tetap pada jalur tugas dan mampu terlibat secara bermakna selama sebagian besar kegiatan.",
      "menjaga tingkat konsentrasi yang memadai sepanjang sebagian besar periode.",
      "menunjukkan konsentrasi yang cukup sesuai tuntutan pelajaran, dengan sesekali perhatian yang beralih.",
    ],
    [
      "sedang mengembangkan kemampuan untuk mempertahankan perhatian lebih lama, dan pengingat lembut telah membantu mendukung ini.",
      "sesekali memerlukan dorongan untuk kembali fokus, namun merespons dengan baik dan segera kembali ke jalur.",
      "konsentrasi adalah area yang sedang aktif dikerjakan — dan sudah ada tanda-tanda kemajuan yang nyata.",
    ],
  ],
  taskCompletion: [
    [
      "Semua tugas yang diberikan diselesaikan dengan standar tinggi dan dikumpulkan tepat waktu.",
      "Setiap pekerjaan diselesaikan dengan cermat dan dengan upaya serta perhatian terhadap detail yang nyata.",
      "Pekerjaan secara konsisten diselesaikan — dan diselesaikan dengan baik — sepanjang periode.",
    ],
    [
      "Sebagian besar tugas diselesaikan dengan memuaskan, dengan upaya yang baik terlihat secara keseluruhan.",
      "Hampir semua tugas pembelajaran diselesaikan dengan standar yang solid, dengan hanya sedikit kekurangan.",
      "Pekerjaan sebagian besar diselesaikan, dan kualitas yang dikumpulkan mencerminkan keterlibatan yang sungguh-sungguh.",
    ],
    [
      "Penyelesaian tugas adalah area yang sedang aktif difokuskan — kemajuan sedang terjadi, dan niat untuk menyelesaikan pekerjaan jelas terlihat.",
      "Beberapa tugas belum selesai, meski ini sedang ditangani dengan dorongan dan struktur yang tepat.",
      "Dengan dukungan yang berkelanjutan, menyelesaikan pekerjaan secara lebih konsisten akan datang — motivasinya sedang tumbuh.",
    ],
  ],
  confidence: [
    [
      "mendekati setiap kegiatan dengan rasa percaya diri yang jelas dan matang.",
      "menunjukkan kepercayaan diri yang kuat sepanjang periode — terutama saat menghadapi tantangan yang belum pernah dihadapi.",
      "membawa kepercayaan diri yang tenang namun tak terbantahkan, membuat proses belajar terasa alami dan mandiri.",
    ],
    [
      "kepercayaan dirinya terus tumbuh secara stabil, dan perbedaannya dari awal periode hingga sekarang sangat terlihat.",
      "kepercayaan diri berkembang dengan laju yang sehat — setiap keberhasilan kecil tampaknya memicu yang berikutnya.",
      "mulai lebih meyakini kemampuan diri sendiri di kelas, yang berdampak sangat positif pada keterlibatan belajar.",
    ],
    [
      "merespons dengan hangat terhadap dorongan dan perlahan-lahan membangun keyakinan yang lebih kuat terhadap kemampuannya.",
      "kepercayaan diri adalah sesuatu yang sedang aktif dipupuk — potensinya jelas ada, dan mulai muncul ke permukaan.",
      "dengan dukungan dan afirmasi yang tepat, kepercayaan diri untuk terlibat sepenuhnya jelas sedang dalam perjalanannya.",
    ],
  ],

  // Tantangan: kalimat penuh, satu per opsi predefined (indeks 0–5)
  challenges: [
    (n: string) => `Dengan latihan yang lebih rutin dan disengaja, ${n} akan terus membangun kelancaran dan kedalaman yang dibutuhkan dalam materi ini.`,
    (n: string) => `Memperluas rasa ingin tahu dengan mengeksplorasi ide lebih dalam adalah cakrawala alami berikutnya bagi ${n}.`,
    (n: string) => `Membangun stamina untuk mempertahankan fokus penuh dalam waktu yang lebih lama adalah sesuatu yang sedang aktif dikerjakan oleh ${n}.`,
    (n: string) => `Menjadi lebih nyaman dengan berbagai jenis bahan bacaan adalah area yang ${n} terus kembangkan dengan langkah yang sesuai.`,
    (n: string) => `Dengan lebih banyak kesempatan untuk mengekspresikan ide — baik secara lisan maupun tulisan — komunikasi ${n} akan terus berkembang.`,
    (n: string) => `Mendengarkan dengan seksama dan mengikuti instruksi bertahap adalah keterampilan yang ${n} sedang bangun, dengan kemajuan yang sudah terlihat nyata.`,
  ],

  // Variasi kalimat untuk tantangan custom (teks bebas)
  customChallengeSentences: [
    (n: string, c: string) => `${n} juga sedang aktif mengembangkan diri dalam hal ${c}.`,
    (n: string, c: string) => `Area pertumbuhan lainnya yang terus dikerjakan oleh ${n} adalah ${c}.`,
    (n: string, c: string) => `Dukungan juga diberikan untuk membantu ${n} berkembang dalam ${c}.`,
    (n: string, c: string) => `Kemajuan dalam ${c} adalah hal yang terus didorong dan difasilitasi untuk ${n}.`,
  ],

  // Kekuatan: kalimat penuh, satu per opsi predefined (indeks 0–5)
  strengths: [
    (n: string) => `${n} menghadirkan energi kreatif yang nyata dalam setiap tugas — melihat kemungkinan dan sudut pandang yang sering terlewat oleh orang lain.`,
    (n: string) => `Rasa ingin tahu yang alami mendorong keterlibatan ${n}, mengubah setiap ide baru menjadi sesuatu yang layak dijelajahi.`,
    (n: string) => `Kemampuan bekerja secara mandiri — dengan fokus dan tanpa banyak bergantung pada arahan — adalah salah satu kekuatan paling andal dari ${n}.`,
    (n: string) => `Ketika menghadapi kesulitan, ${n} merespons dengan kegigihan, bukan penghindaran — sebuah kualitas yang akan sangat berguna dalam setiap tantangan.`,
    (n: string) => `Konsep baru cenderung langsung dipahami oleh ${n}, dan apa yang dipelajari hari ini dengan percaya diri diterapkan keesokan harinya.`,
    (n: string) => `Semangat kolaborasi ${n} memperkaya kelas — kerja kelompok menjadi lebih produktif dan menyenangkan ketika ${n} terlibat di dalamnya.`,
  ],

  // Variasi kalimat untuk kekuatan custom (teks bebas)
  customStrengthSentences: [
    (n: string, s: string) => `${n} juga menonjol dalam hal ${s} — kualitas yang terlihat jelas dalam proses belajar sehari-hari.`,
    (n: string, s: string) => `${s.charAt(0).toUpperCase() + s.slice(1)} adalah kualitas lain yang ${n} bawa ke dalam kelas dengan cara yang positif.`,
    (n: string, s: string) => `Patut pula diakui ${s} yang dimiliki ${n}, yang memberikan dampak nyata dalam pembelajaran.`,
    (n: string, s: string) => `${n} secara konsisten menunjukkan ${s} dengan cara yang memperkaya lingkungan belajar.`,
  ],

  recommendations: [
    "Sesi latihan singkat yang menyenangkan di rumah — bahkan hanya sepuluh menit — akan sangat membantu membangun kelancaran dan kepercayaan diri.",
    "Menjelajahi topik ini melalui buku, video, atau podcast yang sesuai usia di rumah akan menjadi perluasan yang luar biasa dari apa yang dipelajari di kelas.",
    "Ruang belajar yang tenang dan konsisten di rumah, meski hanya sebentar, dapat membuat perbedaan besar pada fokus dan penyelesaian tugas.",
    "Membaca bersama di rumah, memilih bahan yang sesuai minat anak, akan mendukung pemahaman sekaligus kecintaan pada belajar.",
    "Dorong anak untuk menceritakan harinya secara detail — apa yang dipelajari, bagaimana perasaannya — ini membangun kosakata dan kemampuan komunikasi secara alami.",
    "Mengerjakan tugas-tugas sederhana di kehidupan sehari-hari yang melibatkan langkah-langkah berurutan adalah cara yang bagus untuk berlatih mengikuti arahan di rumah.",
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
  activityTemplates: [
    (n: string, t: string, p: string) =>
      `${n} mengikuti pembelajaran materi ${t} melalui proyek: ${p}. Kegiatan ini menawarkan cara yang konkret untuk mengeksplorasi dan menerapkan ide-ide yang diperkenalkan di kelas, dan upaya yang ditunjukkan sangat terlihat.`,
    (n: string, t: string, p: string) =>
      `Proyek "${p}" memberi ${n} konteks yang nyata untuk mengeksplorasi ${t}. Ini adalah kesempatan untuk melampaui teori dan masuk ke penerapan yang sesungguhnya, dan keterlibatan yang dipicunya sangat menggembirakan.`,
    (n: string, t: string, p: string) =>
      `Melalui proyek "${p}", ${n} berkesempatan menghidupkan konsep-konsep ${t} dengan cara yang nyata dan bisa dirasakan. Kegiatan ini dirancang untuk menjembatani pembelajaran di kelas dengan pengalaman langsung yang bermakna.`,
  ],
  noChallenges: (n: string) => `${n} menunjukkan perkembangan yang merata di semua area yang diobservasi — sebuah cerminan dari upaya nyata dan kemampuan yang terus berkembang.`,
  noStrengths: (n: string) => `Dedikasi dan semangat yang dibawa ${n} dalam belajar adalah kualitas yang layak untuk diakui dan terus dipupuk.`,
  defaultRecommendation: "Terus rayakan upaya anak — bukan hanya hasilnya — dan jaga semangat belajar yang sudah jelas terlihat.",
  notesBridge: [
    (note: string) => `Perlu dicatat pula bahwa ${note.toLowerCase()}.`,
    (note: string) => `Satu observasi yang menonjol periode ini: ${note.toLowerCase()}.`,
    (note: string) => `${note} — dan hal ini tercermin dalam proses belajar sepanjang periode.`,
  ],
};

interface Lang {
  openings: ((n: string, t: string) => string)[];
  understanding: string[][];
  participation: string[][];
  focus: string[][];
  taskCompletion: string[][];
  confidence: string[][];
  challenges: ((n: string) => string)[];
  customChallengeSentences: ((n: string, c: string) => string)[];
  strengths: ((n: string) => string)[];
  customStrengthSentences: ((n: string, s: string) => string)[];
  recommendations: string[];
  reportHeader: string;
  sections: { studentInfo: string; progress: string; activities: string; challenges: string; strengths: string; recommendation: string };
  labels: { name: string; class: string; teacher: string; period: string };
  activityTemplates: ((n: string, t: string, p: string) => string)[];
  noChallenges: (n: string) => string;
  noStrengths: (n: string) => string;
  defaultRecommendation: string;
  notesBridge: ((note: string) => string)[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function pick<T>(arr: T[], seed: string, offset = 0): T {
  let hash = offset * 1000;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) & 0xffffffff;
  return arr[Math.abs(hash) % arr.length];
}

function pickVariant(pool: string[][], index: number, seed: string): string {
  const variants = pool[index] ?? pool[0];
  return pick(variants, seed);
}

// ── Main builder ─────────────────────────────────────────────────────────────

export function buildReport(data: ReportFormData, locale: "id" | "en"): string {
  const lang: Lang = locale === "en" ? en : id;
  const name = data.studentName;
  const seed = name + data.topicLearned + data.project;

  const opening = pick(lang.openings, seed)(name, data.topicLearned);

  const u = data.understanding !== null ? pickVariant(lang.understanding, data.understanding, seed + "u") : "";
  const p = data.participation !== null ? pickVariant(lang.participation, data.participation, seed + "p") : "";
  const f = data.focus !== null ? pickVariant(lang.focus, data.focus, seed + "f") : "";
  const tc = data.taskCompletion !== null ? pickVariant(lang.taskCompletion, data.taskCompletion, seed + "tc") : "";
  const conf = data.confidence !== null ? pickVariant(lang.confidence, data.confidence, seed + "conf") : "";

  const hasNotes = data.teacherNotes.trim().length > 0;
  const notesBridgeSentence = hasNotes
    ? " " + pick(lang.notesBridge, seed + "notes")(data.teacherNotes.trim())
    : "";

  const progressParts: string[] = [opening];

  if (data.reportLength === "short") {
    if (u) progressParts.push(`${name} ${u}`);
    if (p) progressParts.push(`${name} ${p}`);
    if (hasNotes) progressParts.push(notesBridgeSentence.trim());
  } else if (data.reportLength === "detailed") {
    if (u) progressParts.push(`${name} ${u}`);
    if (p) progressParts.push(`${name} ${p}`);
    if (f) progressParts.push(`${name} ${f}`);
    if (tc) progressParts.push(tc);
    if (conf) progressParts.push(`${name} ${conf}`);
    if (hasNotes) progressParts.push(notesBridgeSentence.trim());
  } else {
    if (u) progressParts.push(`${name} ${u}`);
    if (p) progressParts.push(`${name} ${p}`);
    if (f) progressParts.push(`${name} ${f}`);
    if (tc) progressParts.push(tc);
    if (hasNotes) progressParts.push(notesBridgeSentence.trim());
  }

  const progress = progressParts.filter(Boolean).join(" ");

  const activity = pick(lang.activityTemplates, seed + "act")(name, data.topicLearned, data.project);

  // ── Challenges: predefined (sentence fn) + custom (wrapped in varied sentence)
  const predefinedChallengeSentences = data.challenges.map(
    (idx) => lang.challenges[idx]?.(name) ?? ""
  );
  const customChallengeSentences = (data.customChallenges ?? []).map((c, i) =>
    pick(lang.customChallengeSentences, seed + "cc" + i, i)(name, c)
  );
  const allChallengeLines = [...predefinedChallengeSentences, ...customChallengeSentences].filter(Boolean);
  const challengeLines = allChallengeLines.length > 0
    ? allChallengeLines.join("\n")
    : lang.noChallenges(name);

  // ── Strengths: predefined (sentence fn) + custom (wrapped in varied sentence)
  const predefinedStrengthSentences = data.strengths.map(
    (idx) => lang.strengths[idx]?.(name) ?? ""
  );
  const customStrengthSentences = (data.customStrengths ?? []).map((s, i) =>
    pick(lang.customStrengthSentences, seed + "cs" + i, i)(name, s)
  );
  const allStrengthLines = [...predefinedStrengthSentences, ...customStrengthSentences].filter(Boolean);
  const strengthLines = allStrengthLines.length > 0
    ? allStrengthLines.join("\n")
    : lang.noStrengths(name);

  const recommendation =
    data.challenges.length > 0
      ? lang.recommendations[data.challenges[0]]
      : data.customChallenges && data.customChallenges.length > 0
      ? lang.defaultRecommendation
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
  [/\bmenunjukkan\b/g, ["memperlihatkan", "mencerminkan", "menampilkan", "menunjukkan"]],
  [/\bperkembangan\b/g, ["kemajuan", "peningkatan", "perkembangan", "pertumbuhan"]],
  [/\bpemahaman\b/g, ["pemahaman", "penguasaan", "kemampuan memahami", "wawasan"]],
  [/\bkegiatan\b/g, ["aktivitas", "kegiatan", "proses", "pembelajaran"]],
  [/\bterus\b/g, ["terus", "semakin", "kian", "makin"]],
  [/\bsangat\b/g, ["sangat", "amat", "begitu", "sungguh"]],
  [/\bmemiliki\b/g, ["memiliki", "mempunyai", "menghadirkan"]],
];

const synonymsEn: [RegExp, string[]][] = [
  [/\bshows\b/g, ["demonstrates", "displays", "reveals", "reflects"]],
  [/\bprogress\b/g, ["growth", "development", "advancement", "progress"]],
  [/\bunderstanding\b/g, ["comprehension", "grasp", "understanding", "insight"]],
  [/\bcontinues\b/g, ["continues", "keeps", "persists in", "goes on"]],
  [/\bstrong\b/g, ["strong", "solid", "impressive", "notable"]],
  [/\bgreat\b/g, ["great", "excellent", "wonderful", "superb"]],
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
