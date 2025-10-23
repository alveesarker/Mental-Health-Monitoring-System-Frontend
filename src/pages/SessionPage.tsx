import { DashboardMetrics } from "@/components/DashboardMetrics";
import { SessionHeader } from "@/components/SessionHeader";
import { SessionHistory } from "@/components/SessionHistory";
import { UpcomingSessions } from "@/components/UpcomingSessions";

const SessionPage = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* <SessionHeader /> */}

      <main className="container px-4 md:px-6 py-8 space-y-8">
        {/* Dashboard Metrics */}
        <DashboardMetrics />

        {/* Upcoming Sessions */}
        <UpcomingSessions />

        {/* Session History */}
        <SessionHistory />
      </main>
    </div>
  );
};

export default SessionPage;
