import { useState, useEffect } from "react";
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
  const { currentUser, getUserProfile } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Fetch user profile when currentUser changes
  useEffect(() => {
    const fetchProfile = async () => {
      if (currentUser?.uid) {
        const profile = await getUserProfile(currentUser.uid);
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
    };
    fetchProfile();
  }, [currentUser, getUserProfile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
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
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <DashboardSidebar onClose={toggleSidebar} userProfile={userProfile} />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
            <DashboardSidebar
              onClose={toggleSidebar}
              userProfile={userProfile}
            />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <DashboardHeader
          toggleSidebar={toggleSidebar}
          user={currentUser}
          userProfile={userProfile}
        />
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className=" sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
