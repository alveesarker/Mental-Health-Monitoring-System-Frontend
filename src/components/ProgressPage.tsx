import { ProgressChart } from "@/components/ProgressChart";
import { ProgressTable } from "@/components/ProgressTable";
import { SummaryCard } from "@/components/SummaryCard";
import { Activity, Brain, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

interface SessionRecord {
  sessionID: number;
  sessionDate: string;
  stability: string;
  depressionLevel: number;
  stressLevel: number;
  workPerformance: number;
  energyLevel: number;
  fatigueLevel: number;
  note: string;
}

const ProgressPage = () => {
  const [sessions, setSessions] = useState<SessionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const patientID = user.userID;

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await fetch(`http://localhost:5000/progress/patient/${patientID}`);
        const json = await res.json();
        if (json.success) {
          setSessions(json.data);
        }
      } catch (err) {
        console.error("Failed to fetch progress data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading progress...</p>;

  // Compute summaries dynamically
  const overallStability =
    sessions[sessions.length - 1]?.stability || "Unknown";
  const avgDepression = Math.round(
    sessions.reduce((acc, s) => acc + s.depressionLevel, 0) / sessions.length
  );
  const lastChange = {
    value:
      sessions.length > 1
        ? sessions[sessions.length - 1].depressionLevel -
          sessions[sessions.length - 2].depressionLevel
        : 0,
    trend:
      sessions.length > 1
        ? sessions[sessions.length - 1].depressionLevel <
          sessions[sessions.length - 2].depressionLevel
          ? "up"
          : sessions[sessions.length - 1].depressionLevel >
            sessions[sessions.length - 2].depressionLevel
          ? "down"
          : "neutral"
        : "neutral",
  };

  const getStabilityVariant = (stability: string) => {
    switch (stability) {
      case "Stable":
        return "success";
      case "Needs Attention":
        return "warning";
      case "Critical":
        return "danger";
      default:
        return "default";
    }
  };

  const getDepressionVariant = (avg: number) => {
    if (avg <= 3) return "success";
    if (avg <= 5) return "warning";
    return "danger";
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Summary Cards */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <SummaryCard
            title="Overall Stability"
            value={overallStability}
            subtitle="Based on recent trends"
            icon={Activity}
            variant={getStabilityVariant(overallStability)}
          />
          <SummaryCard
            title="Avg Depression Level"
            value={`${avgDepression}/10`}
            subtitle="Across all sessions"
            icon={Brain}
            variant={getDepressionVariant(avgDepression)}
          />
          <SummaryCard
            title="Last Session Change"
            value={`${
              lastChange.trend === "up"
                ? "+"
                : lastChange.trend === "down"
                ? "-"
                : ""
            }${lastChange.value}`}
            subtitle={
              lastChange.trend === "up"
                ? "Improvement"
                : lastChange.trend === "down"
                ? "Decline"
                : "No change"
            }
            icon={TrendingUp}
            trend={lastChange.trend as "up" | "down" | "neutral"}
          />
        </section>

        {/* Charts Section */}
        <section className="mb-8">
          <ProgressChart data={sessions} />
        </section>

        {/* Table Section */}
        <section>
          <ProgressTable data={sessions} />
        </section>
      </main>
    </div>
  );
};

export default ProgressPage;
