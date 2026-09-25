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
  challenges: number[];        // indices into the predefined challenges list
  strengths: number[];         // indices into the predefined strengths list
  customChallenges: string[];  // free-text challenges added by teacher
  customStrengths: string[];   // free-text strengths added by teacher
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
  customChallenges: [],
  customStrengths: [],
  teacherNotes: "",
  reportLength: "standard",
  writingStyle: "professional",
};

export interface ParaphraseOptions {
  style: "formal" | "warm" | "professional" | "keep";
  lengthAdjust: "shorter" | "same" | "longer";
  revisionNotes: string;
}
