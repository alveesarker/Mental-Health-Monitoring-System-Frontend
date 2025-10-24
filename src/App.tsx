import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CounsellorDirectory from "./components/CounsellorDirectory";
import { Header } from "./components/Header";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SessionPage from "./pages/SessionPage";
import AiMood from "./pages/AiMood";

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
          <Route path="/session" element={<SessionPage />} />
          <Route path="/session/book" element={<CounsellorDirectory />} />
          <Route path="/moodanalysis" element={<AiMood />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
