import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CounsellorDirectory from "./components/CounsellorDirectory";
import { Header } from "./components/Header";
import AiMood from "./pages/AiMood";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RecommendationPage from "./pages/recommendationPage";
import SessionPage from "./pages/SessionPage";
import Feedback from "./pages/Feedback";
import EmergencySupport from "./pages/EmergencySupportPage";
import Crisis from "./pages/Crisis";

// import Alerts from "./pages/Alerts";
// import Counsellors from "./pages/Counsellors";
// import Dashboard from "./pages/Dashboard";
// import Users from "./pages/Users";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/recommendation" element={<RecommendationPage />} />
          <Route path="/session" element={<SessionPage />} />
          <Route path="/session/book" element={<CounsellorDirectory />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/moodanalysis" element={<AiMood />} />
          <Route path="/emergency" element={<EmergencySupport />} />
          <Route path="/crisis" element={<Crisis />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>

  // <QueryClientProvider client={queryClient}>
  //   <TooltipProvider>
  //     <Toaster />
  //     <Sonner />
  //     <BrowserRouter>
  //       <SidebarProvider>
  //         <div className="flex min-h-screen w-full">
  //           <AppSidebar />
  //           <div className="flex flex-1 flex-col">
  //             <DashboardHeader />
  //             <main className="flex-1 p-6 bg-background">
  //               <Routes>
  //                 <Route path="/" element={<Dashboard />} />
  //                 <Route path="/users" element={<Users />} />
  //                 <Route path="/counsellors" element={<Counsellors />} />
  //                 <Route path="/alerts" element={<Alerts />} />
  //                 <Route path="/sessions" element={<Dashboard />} />
  //                 <Route path="/ai-analysis" element={<Dashboard />} />
  //                 <Route path="/analytics" element={<Dashboard />} />
  //                 <Route path="/security" element={<Dashboard />} />
  //                 <Route path="/settings" element={<Dashboard />} />
  //                 <Route path="*" element={<NotFound />} />
  //               </Routes>
  //             </main>
  //           </div>
  //         </div>
  //       </SidebarProvider>
  //     </BrowserRouter>
  //   </TooltipProvider>
  // </QueryClientProvider>
);

export default App;
