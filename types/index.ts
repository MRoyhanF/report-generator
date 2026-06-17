export interface StudentInfo {
  studentName: string;
  teacherName: string;
  classLevel: string;
  reportPeriod: string;
}

export interface LearningInfo {
  topicLearned: string;
  project: string;
}

export type ReportLength = "short" | "standard" | "detailed";
export type WritingStyle = "formal" | "warm" | "professional";

// Stored as index 0|1|2 so they are language-agnostic
export type ObsIndex = 0 | 1 | 2;

export interface Observations {
  understanding: ObsIndex | null;
  participation: ObsIndex | null;
  focus: ObsIndex | null;
  taskCompletion: ObsIndex | null;
  confidence: ObsIndex | null;
  challenges: number[];   // indices into the challenges list
  strengths: number[];    // indices into the strengths list
  teacherNotes: string;
  reportLength: ReportLength;
  writingStyle: WritingStyle;
}

export interface ReportFormData extends StudentInfo, LearningInfo, Observations {}

export const DEFAULT_OBSERVATIONS: Observations = {
  understanding: null,
  participation: null,
  focus: null,
  taskCompletion: null,
  confidence: null,
  challenges: [],
  strengths: [],
  teacherNotes: "",
  reportLength: "standard",
  writingStyle: "professional",
};
