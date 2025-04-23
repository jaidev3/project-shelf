import { Routes, Route, Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../contexts/AuthContext";

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
import ProfileSettings from "../pages/dashboard/ProfileSettings";
import ThemeSettings from "../pages/dashboard/ThemeSettings";
import Analytics from "../pages/dashboard/Analytics";

// Public pages
import Home from "../pages/public/Home";
import PortfolioHome from "../pages/public/PortfolioHome";
import CaseStudyDetails from "../pages/public/CaseStudyDetails";
import NotFound from "../pages/NotFound";

// Protected route wrapper
function ProtectedRoute({ children }: { children: ReactNode }) {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export const AppRoutes = () => {
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
        <Route path="case-study/new" element={<CaseStudyEditor />} />
        <Route path="profile" element={<ProfileSettings />} />
        <Route path="theme" element={<ThemeSettings />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>

      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
