import { AppSidebar } from "@/components/admin/AppSidebar";
import { DashboardHeader } from "@/components/admin/DashboardHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Route, Routes } from "react-router-dom";

import ADailyLog from "@/pages/ADailyLog";
import AdminDailyLogsDetails from "@/pages/AdminDailyLogsDetails";
import AIAnalysisSearch from "@/pages/AIAnalysisSearch";
import Alerts from "@/pages/Alerts";
import ARecommendation from "@/pages/ARecommendation";
import Counsellors from "@/pages/Counsellors";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";
import SessionDetailsPage from "@/pages/SessionDetailsPage";
import SessionManagement from "@/pages/SessionManagement";
import Users from "@/pages/Users";
import AdminProgressPage from "@/pages/AdminProgress";
import AdminFeedbackPage from "@/pages/AdminFeedback";
import QuestionsPage from "@/pages/Questions";

const AdminRoutes = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6 bg-background">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/counsellors" element={<Counsellors />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/sessions" element={<SessionManagement />} />
              <Route path="/sessions/:id" element={<SessionDetailsPage />} />
              <Route path="/ai-analysis" element={<AIAnalysisSearch />} />
              <Route path="/daily-logs" element={<ADailyLog />} />
              <Route path="/recommendation" element={<ARecommendation />} />
              <Route path="/progress" element={<AdminProgressPage />} />
              <Route path="/feedback" element={<AdminFeedbackPage />} />
              <Route path="/questions" element={<QuestionsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminRoutes;
