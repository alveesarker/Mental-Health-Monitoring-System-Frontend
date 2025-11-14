import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";

// Patient Components
import CounsellorDirectory from "./components/CounsellorDirectory";
import { Header } from "./components/Header";
import AiMood from "./pages/AiMood";
import Crisis from "./pages/Crisis";
import EmergencySupport from "./pages/EmergencySupportPage";
import Feedback from "./pages/Feedback";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import RecommendationPage from "./pages/recommendationPage";
import SessionPage from "./pages/SessionPage";

// Admin Components
import { AppSidebar } from "./components/admin/AppSidebar";
import { DashboardHeader } from "./components/admin/DashboardHeader";
import { SidebarProvider } from "./components/ui/sidebar";
import AdminDailyLogsDetails from "./pages/AdminDailyLogsDetails";
import AdminDailyLogsPage from "./pages/AdminDailyLogsPage";
import AdminRecommendation from "./pages/AdminRecommendation";
import AIAnalysisDetail from "./pages/AIAnalysisDetail";
import AIAnalysisSearch from "./pages/AIAnalysisSearch";
import Alerts from "./pages/Alerts";
import Counsellors from "./pages/Counsellors";
import Dashboard from "./pages/Dashboard";
import SessionDetailsPage from "./pages/SessionDetailsPage";
import SessionManagement from "./pages/SessionManagement";
import Users from "./pages/Users";

// Counsellor Components
import { DashboardLayout } from "./components/counsellor/DashboardLayout";
import CounsellorDashBoard from "../src/pages/counsellor/Dashboard";
import CounsellorUsers from "../src/pages/counsellor/Users"
import AIAnalysis from "./pages/counsellor/AIAnalysis";
import DailyLogs from "./pages/counsellor/DailyLogs";

// Auth
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { CounsellorAppSidebar } from "./components/counsellor/AppSidebar";
import CounsellorSession from "./pages/counsellor/CounsellorSession";
import CounsellorSessionDetails from "./pages/counsellor/CounsellorSessionDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Routes>
            {/* -------- PUBLIC ROUTE -------- */}
            <Route path="/login" element={<LoginPage />} />

            {/* -------- ADMIN ROUTES -------- */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute allowed={["admin"]}>
                  <SidebarProvider>
                    <div className="flex min-h-screen w-full">
                      <AppSidebar />
                      <div className="flex flex-1 flex-col">
                        <DashboardHeader />
                        <main className="flex-1 p-6 bg-background">
                          <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/users" element={<Users />} />
                            <Route
                              path="/counsellors"
                              element={<Counsellors />}
                            />
                            <Route path="/alerts" element={<Alerts />} />
                            <Route
                              path="/sessions"
                              element={<SessionManagement />}
                            />
                            <Route
                              path="/sessions/:id"
                              element={<SessionDetailsPage />}
                            />
                            <Route
                              path="/ai-analysis"
                              element={<AIAnalysisSearch />}
                            />
                            <Route
                              path="/ai-analysis/:userId"
                              element={<AIAnalysisDetail />}
                            />
                            <Route
                              path="/daily-logs"
                              element={<AdminDailyLogsPage />}
                            />
                            <Route
                              path="/daily-logs/:userId"
                              element={<AdminDailyLogsDetails />}
                            />
                            <Route
                              path="/recommendation"
                              element={<AdminRecommendation />}
                            />
                            <Route path="*" element={<NotFound />} />
                          </Routes>
                        </main>
                      </div>
                    </div>
                  </SidebarProvider>
                </ProtectedRoute>
              }
            />

            {/* -------- COUNSELLOR ROUTES -------- */}
            <Route
              path="/counsellor/*"
              element={
                <ProtectedRoute allowed={["counsellor"]}>
                          <Routes>
                            <Route
                              path="/"
                              element={
                                <DashboardLayout>
                                  <CounsellorDashBoard />
                                </DashboardLayout>
                              }
                            />
                            <Route
                              path="/users"
                              element={
                                <DashboardLayout>
                                  <CounsellorUsers />
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
                            <Route
                              path="/sessions/:id"
                              element={
                                <DashboardLayout>
                                  <CounsellorSessionDetails />
                                </DashboardLayout>
                              }
                            />
                            <Route
                              path="/daily-logs"
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
                            <Route path="*" element={<NotFound />} />
                          </Routes>
                </ProtectedRoute>
              }
            />

            {/* -------- PATIENT ROUTES -------- */}
            <Route
              path="/*"
              element={
                <ProtectedRoute allowed={["patient"]}>
                  <>
                    <Header />
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route
                        path="/recommendation"
                        element={<RecommendationPage />}
                      />
                      <Route path="/session" element={<SessionPage />} />
                      <Route
                        path="/session/book"
                        element={<CounsellorDirectory />}
                      />
                      <Route path="/feedback" element={<Feedback />} />
                      <Route path="/moodanalysis" element={<AiMood />} />
                      <Route path="/emergency" element={<EmergencySupport />} />
                      <Route path="/crisis" element={<Crisis />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </>
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
