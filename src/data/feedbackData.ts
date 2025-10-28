export interface CounsellorFeedback {
  id: string;
  sessionDate: string;
  patientName: string;
  counsellorName: string;
  feedbackScore: number;
  briefNotes: string;
  detailedDescription: string;
  improvementStatus: string;
}

export const mockFeedbackData: CounsellorFeedback[] = [
  {
    id: "1",
    sessionDate: "2024-01-15",
    patientName: "John Doe",
    counsellorName: "Dr. Sarah Williams",
    feedbackScore: 8,
    briefNotes: "Positive progress in anxiety management",
    detailedDescription: "Patient has shown significant improvement in managing anxiety through cognitive behavioral techniques. Able to identify triggers more effectively and apply coping strategies. Recommended continued weekly sessions with focus on exposure therapy for specific phobias. Family support system is strong and actively engaged in the treatment process.",
    improvementStatus: "Improving"
  },
  {
    id: "2",
    sessionDate: "2024-01-20",
    patientName: "Jane Smith",
    counsellorName: "Dr. Michael Chen",
    feedbackScore: 9,
    briefNotes: "Excellent engagement in therapy sessions",
    detailedDescription: "Outstanding participation and openness during sessions. Patient has made remarkable progress in addressing depression symptoms through a combination of CBT and mindfulness practices. Homework assignments completed thoroughly with meaningful insights. Family dynamics improving significantly. Sleep patterns normalized and energy levels increased.",
    improvementStatus: "Excellent Progress"
  },
  {
    id: "3",
    sessionDate: "2024-01-22",
    patientName: "Robert Johnson",
    counsellorName: "Dr. Emily Taylor",
    feedbackScore: 6,
    briefNotes: "Moderate progress, needs more support",
    detailedDescription: "Patient showing some resistance to exploring deeper emotional issues related to childhood trauma. Attendance has been inconsistent over the past month. Discussed barriers to engagement including work stress and financial concerns. Developed modified treatment plan focusing on building trust and rapport before proceeding with trauma work. Considering referral to support groups.",
    improvementStatus: "Stable"
  },
  {
    id: "4",
    sessionDate: "2024-01-25",
    patientName: "Maria Garcia",
    counsellorName: "Dr. Sarah Williams",
    feedbackScore: 7,
    briefNotes: "Good response to stress management techniques",
    detailedDescription: "Patient implementing mindfulness practices regularly with positive results. Noted improvement in work-life balance and stress levels decreased by approximately 40% based on self-reported measures. Some challenges remain with interpersonal relationships, particularly with colleagues. Plan to introduce communication skills training and assertiveness techniques in upcoming sessions.",
    improvementStatus: "Improving"
  },
  {
    id: "5",
    sessionDate: "2024-01-28",
    patientName: "David Lee",
    counsellorName: "Dr. Michael Chen",
    feedbackScore: 9,
    briefNotes: "Struggling with adherence to treatment plan",
    detailedDescription: "Patient experiencing difficulties following through with recommended interventions including medication compliance and between-session exercises. Discussed potential adjustments to approach including reducing homework load and incorporating more in-session practice. May benefit from more structured support and shorter-term, achievable goals. Considering case management referral for additional support. Follow-up scheduled for next week.",
    improvementStatus: "Excellent Progress"
  },
  {
    id: "5",
    sessionDate: "2024-01-28",
    patientName: "David Lee",
    counsellorName: "Dr. Michael Chen",
    feedbackScore: 3,
    briefNotes: "Struggling with adherence to treatment plan",
    detailedDescription: "Patient experiencing difficulties following through with recommended interventions including medication compliance and between-session exercises. Discussed potential adjustments to approach including reducing homework load and incorporating more in-session practice. May benefit from more structured support and shorter-term, achievable goals. Considering case management referral for additional support. Follow-up scheduled for next week.",
    improvementStatus: "stable"
  },
  {
    id: "5",
    sessionDate: "2024-01-28",
    patientName: "David Lee",
    counsellorName: "Dr. Michael Chen",
    feedbackScore: 2,
    briefNotes: "Struggling with adherence to treatment plan",
    detailedDescription: "Patient experiencing difficulties following through with recommended interventions including medication compliance and between-session exercises. Discussed potential adjustments to approach including reducing homework load and incorporating more in-session practice. May benefit from more structured support and shorter-term, achievable goals. Considering case management referral for additional support. Follow-up scheduled for next week.",
    improvementStatus: "Needs Support"
  },
  {
    id: "5",
    sessionDate: "2024-01-28",
    patientName: "David Lee",
    counsellorName: "Dr. Michael Chen",
    feedbackScore: 5,
    briefNotes: "Struggling with adherence to treatment plan",
    detailedDescription: "Patient experiencing difficulties following through with recommended interventions including medication compliance and between-session exercises. Discussed potential adjustments to approach including reducing homework load and incorporating more in-session practice. May benefit from more structured support and shorter-term, achievable goals. Considering case management referral for additional support. Follow-up scheduled for next week.",
    improvementStatus: "improving"
  },
];
