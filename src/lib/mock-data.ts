export interface ProgressRecord {
  id: string;
  sessionID: string;
  stability: "Stable" | "Moderate" | "Critical";
  stressLevel: number;
  depressionLevel: number;
  workPerformance: number;
  energyLevel: number;
  fatigueLevel: number;
  note: string;
}

export interface FeedbackRecord {
  id: string;
  sessionID: string;
  rating: number;
  comfortLevel: number;
  clarityLevel: number;
  comment: string;
}

export interface QuestionRule {
  id: string;
  category: string;
  value: string;
}

export interface QuestionRecord {
  id: string;
  questionID: string;
  questionText: string;
  type: "SCALE RATING" | "MULTIPLE CHOICE" | "TEXT RESPONSE" | "BOOLEAN" | "DATE TIME" | "FREQUENCY COUNT" | "CHECKLIST" | "CONDITIONAL";
  rules: QuestionRule[];
}

// Mock session IDs for dropdowns
export const sessionIDs = [
  "SES-001",
  "SES-002",
  "SES-003",
  "SES-004",
  "SES-005",
  "SES-006",
  "SES-007",
  "SES-008",
];

export const stabilityOptions = ["Stable", "Moderate", "Critical"] as const;
export const questionTypes = ["SCALE RATING",
  "MULTIPLE CHOICE",
  "TEXT RESPONSE",
  "BOOLEAN",
  "DATE TIME",
  "FREQUENCY COUNT",
  "CHECKLIST",
  "CONDITIONAL"] as const;
export const ruleCategories = [
  "sleepDuration",
  "stressLevel",
  "depressionLevel",
  "fatigueLevel",
  "anxietyLevel",
  "moodScore",
] as const;

// Generate mock data
export const mockProgressData: ProgressRecord[] = [
  {
    id: "1",
    sessionID: "SES-001",
    stability: "Stable",
    stressLevel: 3,
    depressionLevel: 2,
    workPerformance: 8,
    energyLevel: 7,
    fatigueLevel: 3,
    note: "Patient showing good progress",
  },
  {
    id: "2",
    sessionID: "SES-002",
    stability: "Moderate",
    stressLevel: 6,
    depressionLevel: 5,
    workPerformance: 5,
    energyLevel: 4,
    fatigueLevel: 6,
    note: "Needs follow-up session",
  },
  {
    id: "3",
    sessionID: "SES-003",
    stability: "Critical",
    stressLevel: 9,
    depressionLevel: 8,
    workPerformance: 2,
    energyLevel: 2,
    fatigueLevel: 9,
    note: "Urgent intervention required",
  },
  {
    id: "4",
    sessionID: "SES-004",
    stability: "Stable",
    stressLevel: 2,
    depressionLevel: 1,
    workPerformance: 9,
    energyLevel: 8,
    fatigueLevel: 2,
    note: "Excellent progress this week",
  },
  {
    id: "5",
    sessionID: "SES-005",
    stability: "Moderate",
    stressLevel: 5,
    depressionLevel: 4,
    workPerformance: 6,
    energyLevel: 5,
    fatigueLevel: 5,
    note: "Stable but monitoring needed",
  },
];

export const mockFeedbackData: FeedbackRecord[] = [
  {
    id: "1",
    sessionID: "SES-001",
    rating: 5,
    comfortLevel: 9,
    clarityLevel: 8,
    comment: "Very helpful session, felt understood",
  },
  {
    id: "2",
    sessionID: "SES-002",
    rating: 4,
    comfortLevel: 7,
    clarityLevel: 7,
    comment: "Good progress but need more time",
  },
  {
    id: "3",
    sessionID: "SES-003",
    rating: 3,
    comfortLevel: 5,
    clarityLevel: 6,
    comment: "Difficult session, many challenges",
  },
  {
    id: "4",
    sessionID: "SES-004",
    rating: 5,
    comfortLevel: 10,
    clarityLevel: 9,
    comment: "Best session yet, breakthrough moment",
  },
];
