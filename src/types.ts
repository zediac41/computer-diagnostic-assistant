export type YesNo = "Yes" | "No" | "";
export type YesNoNA = "Yes" | "No" | "N/A" | "";
export type SuccessState = "Yes" | "No" | "Pending";

export interface FormState {
  ticketNumber: string;
  orderNumber: string;
  contactType: string;
  store: string;
  customerName: string;
  deviceType: string;
  brand: string;
  model: string;
  motherboard: string;
  whenHappens: string;
  whenStarted: string;
  cpuTier: string;
  gpuInstalled: YesNo;
  gpuTier: string;
  gpuRiserCable: YesNo;
  ramSticks: string;
  ramPerStick: string;
  storageType: string;
  coolerType: string;
  visibleSymptoms: string[];
  customSymptoms: string[];
  commonQuestionAnswers: Record<string, YesNoNA>;
  notes: string;
}

export interface ResolutionState {
  actionsPerformed: string[];
  actionNotes: string;
  finalDiagnosis: string;
  finalFix: string;
  successful: SuccessState;
  escalated: YesNo;
  rmaRequired: YesNo;
  closeoutNotes: string;
}

export interface SimilarPastCase {
  id: number;
  ticketNumber: string;
  title: string;
  finalFix: string;
}

export interface ResultsData {
  recommendedSteps: string[];
  similarCases: SimilarPastCase[];
}

export interface SymptomFixRule {
  id: string;
  symptom: string;
  deviceType: "Desktop" | "Laptop" | "Both";
  fixes: string[];
  whenHappens?: string;
  whenStarted?: string;
  gpuInstalled?: YesNo;
}

export interface SavedCase {
  id: number;
  ticketNumber: string;
  orderNumber: string;
  customerName: string;
  symptomSummary: string;
  model: string;
  finalDiagnosis: string;
  outcome: string;
  date: string;
  rawForm: FormState;
}
