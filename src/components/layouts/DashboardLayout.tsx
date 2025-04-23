import { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../navigation/DashboardSidebar";
import DashboardHeader from "../navigation/DashboardHeader";
import { useAuth } from "../../contexts/AuthContext";

// Add UserProfile type
type UserProfile = {
  displayName?: string;
  photoURL?: string;
  username?: string;
  [key: string]: any;
};

export default function DashboardLayout() {
  const { currentUser } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  console.log("currentUser", currentUser);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-dark-background">
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-40 flex md:hidden transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={toggleSidebar}
        ></div>
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-neutral-900">
          <DashboardSidebar onClose={toggleSidebar} user={currentUser} />
        </div>
      </div>

      {/* Desktop sidebar - fixed with screen height */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="w-64 flex flex-col h-screen">
          <div className="flex flex-col h-full border-r border-gray-200 bg-white dark:bg-neutral-900 dark:border-neutral-700">
            <DashboardSidebar onClose={toggleSidebar} user={currentUser} />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader toggleSidebar={toggleSidebar} user={currentUser} />
        <main className="flex-1 relative overflow-y-auto focus:outline-none bg-gray-50 dark:bg-dark-background transition-colors">
          <div className="py-6 sm:px-6 lg:px-8 h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
