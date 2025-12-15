import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "./components/ui/sonner";
// import your Toaster
import { TooltipProvider } from "@radix-ui/react-tooltip";
import Login from "./pages/Login";
import AdminRoutes from "./routes/AdminRoutes";
import CounsellorRoutes from "./routes/CounsellorRoutes";
import PatientRoutes from "./routes/PatientRoutes";

function App() {
  return (
    <BrowserRouter>
      {/* Mount Toaster once at the top level */}
      <TooltipProvider>
        <Toaster />
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/signup" element={<Signup />} /> */}

          <Route
            path="/admin/*"
            element={
              <ProtectedRoute role="admin">
                <AdminRoutes />
              </ProtectedRoute>
            }
          />

          <Route
            path="/counsellor/*"
            element={
              <ProtectedRoute role="counsellor">
                <CounsellorRoutes />
              </ProtectedRoute>
            }
          />

          <Route
            path="/*"
            element={
              <ProtectedRoute role="patient">
                <PatientRoutes />
              </ProtectedRoute>
            }
          />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  );
}

export default App;
