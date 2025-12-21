import { Header } from "@/components/Header";
import { Route, Routes } from "react-router-dom";

import CounsellorDirectory from "@/components/CounsellorDirectory";
import AiMood from "@/pages/AiMood";
import Crisis from "@/pages/Crisis";
import EmergencySupport from "@/pages/EmergencySupportPage";
import Feedback from "@/pages/Feedback";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import RecommendationPage from "@/pages/recommendationPage";
import SessionPage from "@/pages/SessionPage";
import PatientDailyLogHistory from "@/pages/PatientDailyLogHistory";
import SessionDetailsPage from "@/pages/SessionDetailsPage";
import GiveFeedbackPage from "@/pages/GiveFeedback";
import ProgressPage from "@/components/ProgressPage";

const PatientRoutes = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/daily-log" element={<PatientDailyLogHistory />} />
        <Route path="/recommendation" element={<RecommendationPage />} />
        <Route path="/session" element={<SessionPage />} />
        <Route path="/sessions/:id" element={<SessionDetailsPage />} />
        <Route path="/session/give-feedback/:id" element={<GiveFeedbackPage />} />
        <Route path="/session/book" element={<CounsellorDirectory />} />
        {/* <Route path="/feedback" element={<Feedback />} /> */}
        <Route path="/moodanalysis" element={<AiMood />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/emergency" element={<EmergencySupport />} />
        <Route path="/crisis" element={<Crisis />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default PatientRoutes;
