import { DashboardLayout } from "@/components/counsellor/DashboardLayout";
import { Route, Routes } from "react-router-dom";

import AIAnalysis from "@/pages/counsellor/AIAnalysis";
import CounsellorSession from "@/pages/counsellor/CounsellorSession";
import CounsellorSessionDetails from "@/pages/counsellor/CounsellorSessionDetails";
import DailyLogs from "@/pages/counsellor/DailyLogs";
import DailyLogsUsers from "@/pages/counsellor/DailyLogsUsers";
import Dashboard from "@/pages/counsellor/Dashboard";
import GiveProgress from "@/pages/counsellor/GiveProgress";
import Recommendations from "@/pages/counsellor/Recommendations";
import Users from "@/pages/counsellor/Users";
import NotFound from "@/pages/NotFound";

const CounsellorRoutes = () => {
  return (
    <Routes>
      <Route
        path=""
        element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        }
      />
      <Route
        path="/users"
        element={
          <DashboardLayout>
            <Users />
          </DashboardLayout>
        }
      />
      <Route
        path="/session"
        element={
          <DashboardLayout>
            <CounsellorSession />
          </DashboardLayout>
        }
      />
      {/* <Route
        path="/sessions/:id"
        element={
          <DashboardLayout>
            <CounsellorSessionDetails />
          </DashboardLayout>
        }
      /> */}
      <Route
        path="/session/give-progress/:id"
        element={
          <DashboardLayout>
            <GiveProgress />
          </DashboardLayout>
        }
      />

      <Route
        path="/daily-logs"
        element={
          <DashboardLayout>
            <DailyLogsUsers />
          </DashboardLayout>
        }
      />
      <Route
        path="/daily-logs/:id"
        element={
          <DashboardLayout>
            <DailyLogs />
          </DashboardLayout>
        }
      />
      <Route
        path="/ai-analysis"
        element={
          <DashboardLayout>
            <AIAnalysis />
          </DashboardLayout>
        }
      />
      <Route
        path="/recommendations"
        element={
          <DashboardLayout>
            <Recommendations />
          </DashboardLayout>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default CounsellorRoutes;
