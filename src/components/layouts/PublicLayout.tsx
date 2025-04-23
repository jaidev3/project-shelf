import { Outlet, useLocation } from "react-router-dom";
import PublicHeader from "../navigation/PublicHeader";
import Footer from "../navigation/Footer";

export default function PublicLayout() {
  const location = useLocation();
  const path = location.pathname;

  // Check if the path matches the pattern /:username
  // This regex excludes paths starting with /login, /signup, etc.
  const isUserPortfolioPage =
    /^\/[^/]+$/.test(path) &&
    !["/login", "/signup", "/forgot-password", "/"].includes(path);

  return (
    <div className="min-h-screen flex flex-col">
      {!isUserPortfolioPage && <PublicHeader />}
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
