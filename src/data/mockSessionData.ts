interface SessionRecord {
  sessionID: number;
  sessionDate: string; // instead of `date`
  stability: string;
  depressionLevel: number;
  stressLevel: number;
  workPerformance: number;
  energyLevel: number;
  fatigueLevel: number;
  note: string;
}


// export const mockSessionData: SessionRecord[] = [
//   {
//     sessionID: ,
//     date: "2024-01-05",
//     stability: "critical",
//     depressionLevel: 8,
//     stressLevel: 9,
//     workPerformance: 3,
//     energyLevel: 2,
//     fatigueLevel: 9,
//     note: "Initial assessment. Patient reports severe anxiety and sleep issues."
//   },
//   {
//     sessionID: "S002",
//     date: "2024-01-12",
//     stability: "declining",
//     depressionLevel: 7,
//     stressLevel: 8,
//     workPerformance: 4,
//     energyLevel: 3,
//     fatigueLevel: 8,
//     note: "Started medication. Some resistance to therapy exercises."
//   },
//   {
//     sessionID: "S003",
//     date: "2024-01-19",
//     stability: "stable",
//     depressionLevel: 6,
//     stressLevel: 7,
//     workPerformance: 5,
//     energyLevel: 4,
//     fatigueLevel: 7,
//     note: "Slight improvement. Patient engaging more in sessions."
//   },
//   {
//     sessionID: "S004",
//     date: "2024-01-26",
//     stability: "improving",
//     depressionLevel: 5,
//     stressLevel: 6,
//     workPerformance: 6,
//     energyLevel: 5,
//     fatigueLevel: 6,
//     note: "Good progress with CBT techniques. Sleep improving."
//   },
//   {
//     sessionID: "S005",
//     date: "2024-02-02",
//     stability: "improving",
//     depressionLevel: 4,
//     stressLevel: 5,
//     workPerformance: 6,
//     energyLevel: 6,
//     fatigueLevel: 5,
//     note: "Patient reports better mood. Work attendance improved."
//   },
//   {
//     sessionID: "S006",
//     date: "2024-02-09",
//     stability: "stable",
//     depressionLevel: 4,
//     stressLevel: 6,
//     workPerformance: 6,
//     energyLevel: 5,
//     fatigueLevel: 5,
//     note: "Minor setback due to work stress. Coping strategies discussed."
//   },
//   {
//     sessionID: "S007",
//     date: "2024-02-16",
//     stability: "improving",
//     depressionLevel: 3,
//     stressLevel: 4,
//     workPerformance: 7,
//     energyLevel: 7,
//     fatigueLevel: 4,
//     note: "Significant improvement. Patient practicing mindfulness daily."
//   },
//   {
//     sessionID: "S008",
//     date: "2024-02-23",
//     stability: "improving",
//     depressionLevel: 3,
//     stressLevel: 4,
//     workPerformance: 7,
//     energyLevel: 7,
//     fatigueLevel: 3,
//     note: "Consistent progress. Social activities resumed."
//   },
//   {
//     sessionID: "S009",
//     date: "2024-03-01",
//     stability: "stable",
//     depressionLevel: 3,
//     stressLevel: 5,
//     workPerformance: 7,
//     energyLevel: 6,
//     fatigueLevel: 4,
//     note: "Maintaining gains. Discussed long-term wellness plan."
//   },
//   {
//     sessionID: "S010",
//     date: "2024-03-08",
//     stability: "improving",
//     depressionLevel: 2,
//     stressLevel: 3,
//     workPerformance: 8,
//     energyLevel: 8,
//     fatigueLevel: 3,
//     note: "Excellent progress. Patient feeling optimistic about future."
//   },
//   {
//     sessionID: "S011",
//     date: "2024-03-15",
//     stability: "stable",
//     depressionLevel: 2,
//     stressLevel: 3,
//     workPerformance: 8,
//     energyLevel: 8,
//     fatigueLevel: 2,
//     note: "Stable and positive. Reducing session frequency discussed."
//   },
//   {
//     sessionID: "S012",
//     date: "2024-03-22",
//     stability: "improving",
//     depressionLevel: 2,
//     stressLevel: 2,
//     workPerformance: 9,
//     energyLevel: 8,
//     fatigueLevel: 2,
//     note: "Best session yet. Patient has developed strong coping mechanisms."
//   }
// ];

export const getOverallStability = (data: SessionRecord[]): string => {
  const latest = data[data.length - 1];
  const avgDepression = data.reduce((acc, s) => acc + s.depressionLevel, 0) / data.length;
  
  if (latest.stability === 'improving' && avgDepression < 4) return 'Excellent';
  if (latest.stability === 'improving' || latest.stability === 'stable') return 'Good';
  if (latest.stability === 'declining') return 'Needs Attention';
  return 'Critical';
};

export const getAverageDepression = (data: SessionRecord[]): number => {
  return Number((data.reduce((acc, s) => acc + s.depressionLevel, 0) / data.length).toFixed(1));
};

export const getLastSessionChange = (data: SessionRecord[]): { value: number; trend: 'up' | 'down' | 'neutral' } => {
  if (data.length < 2) return { value: 0, trend: 'neutral' };
  
  const last = data[data.length - 1];
  const prev = data[data.length - 2];
  
  const lastScore = (10 - last.depressionLevel + 10 - last.stressLevel + last.workPerformance + last.energyLevel + 10 - last.fatigueLevel) / 5;
  const prevScore = (10 - prev.depressionLevel + 10 - prev.stressLevel + prev.workPerformance + prev.energyLevel + 10 - prev.fatigueLevel) / 5;
  
  const change = Number((lastScore - prevScore).toFixed(1));
  
  return {
    value: Math.abs(change),
    trend: change > 0 ? 'up' : change < 0 ? 'down' : 'neutral'
  };
};
