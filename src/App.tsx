import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import CounsellorDirectory from "./components/CounsellorDirectory";
// import { Header } from "./components/Header";
// import AiMood from "./pages/AiMood";
// import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
// import RecommendationPage from "./pages/recommendationPage";
// import SessionPage from "./pages/SessionPage";
// import Feedback from "./pages/Feedback";
// import EmergencySupport from "./pages/EmergencySupportPage";
// import Crisis from "./pages/Crisis";

import { AppSidebar } from "./components/admin/AppSidebar";
import { DashboardHeader } from "./components/admin/DashboardHeader";
import { SidebarProvider } from "./components/ui/sidebar";
import AdminDailyLogsPage from "./pages/AdminDailyLogsPage";
import AIAnalysisDetail from "./pages/AIAnalysisDetail";
import AIAnalysisSearch from "./pages/AIAnalysisSearch";
import Alerts from "./pages/Alerts";
import Counsellors from "./pages/Counsellors";
import Dashboard from "./pages/Dashboard";
import SessionDetailsPage from "./pages/SessionDetailsPage";
import SessionManagement from "./pages/SessionManagement";
import Users from "./pages/Users";
import AdminDailyLogsDetails from "./pages/AdminDailyLogsDetails";

const queryClient = new QueryClient();

const App = () => (
  // <QueryClientProvider client={queryClient}>
  //   <TooltipProvider>
  //     <Toaster />
  //     <Sonner />
  //     <BrowserRouter>
  //       <Header />
  //       <Routes>
  //         <Route path="/" element={<Index />} />
  //         <Route path="/recommendation" element={<RecommendationPage />} />
  //         <Route path="/session" element={<SessionPage />} />
  //         <Route path="/session/book" element={<CounsellorDirectory />} />
  //         <Route path="/feedback" element={<Feedback />} />
  //         <Route path="/moodanalysis" element={<AiMood />} />
  //         <Route path="/emergency" element={<EmergencySupport />} />
  //         <Route path="/crisis" element={<Crisis />} />
  //         {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
  //         <Route path="*" element={<NotFound />} />
  //       </Routes>
  //     </BrowserRouter>
  //   </TooltipProvider>
  // </QueryClientProvider>

  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
                  <Route
                    path="/sessions/:id"
                    element={<SessionDetailsPage />}
                  />
                  {/* <Route path="/ai-analysis" element={<Dashboard />} /> */}
                  <Route path="/analytics" element={<Dashboard />} />
                  <Route path="/security" element={<Dashboard />} />
                  <Route path="/settings" element={<Dashboard />} />
                  <Route path="/ai-analysis" element={<AIAnalysisSearch />} />
                  <Route
                    path="/ai-analysis/:userId"
                    element={<AIAnalysisDetail />}
                  />

                  <Route path="/daily-logs" element={<AdminDailyLogsPage />} />
                  <Route path="/daily-logs/:userId" element={<AdminDailyLogsDetails />} />

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
