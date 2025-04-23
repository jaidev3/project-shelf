import { Routes, Route } from "react-router-dom";
import { useProtectedRoute } from "../hooks/useProtectedRoute";

// Layout components
import PublicLayout from "../components/layouts/PublicLayout";
import DashboardLayout from "../components/layouts/DashboardLayout";

// Auth pages
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import ForgotPassword from "../pages/auth/ForgotPassword";

// Dashboard pages
import Dashboard from "../pages/dashboard/Dashboard";
import CaseStudyEditor from "../pages/dashboard/CaseStudyEditor";
import NewCaseStudy from "../pages/dashboard/NewCaseStudy";
import ProfileSettings from "../pages/dashboard/ProfileSettings";

// Public pages
import Home from "../pages/public/Home";
import PortfolioHome from "../pages/public/PortfolioHome";
import CaseStudyDetails from "../pages/public/CaseStudyDetails";
import NotFound from "../pages/NotFound";

export const AppRoutes = () => {
  const ProtectedRoute = useProtectedRoute();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Portfolio public routes - Dynamic based on username */}
      <Route path="/:username" element={<PublicLayout />}>
        <Route index element={<PortfolioHome />} />
        <Route path="case-study/:caseStudyId" element={<CaseStudyDetails />} />
      </Route>

      {/* Dashboard protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="case-study/:caseStudyId" element={<CaseStudyEditor />} />
        <Route path="case-study/create" element={<CaseStudyEditor />} />
        <Route path="case-study/" element={<NewCaseStudy />} />
        <Route path="profile" element={<ProfileSettings />} />
      </Route>

      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
