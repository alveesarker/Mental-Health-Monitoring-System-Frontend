import { DashboardMetrics } from "@/components/DashboardMetrics";
import { SessionHeader } from "@/components/SessionHeader";
import { CUpcomingSessions } from "./CUpcomingSessions";
import { CSessionHistory } from "./CSessionHistory";

const CounsellorSession = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* <SessionHeader /> */}

      <main className="container px-4 md:px-6 py-8 space-y-8">
        {/* Dashboard Metrics */}
        {/* <DashboardMetrics /> */}

        {/* Upcoming Sessions */}
        <CUpcomingSessions />

        {/* Session History */}
        <CSessionHistory />
      </main>
    </div>
  );
};

export default CounsellorSession;
