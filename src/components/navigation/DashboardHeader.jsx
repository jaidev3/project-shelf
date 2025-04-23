import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiBell, FiUser, FiLogOut, FiSettings } from "react-icons/fi";
import { useAuth } from "../../contexts/AuthContext";

export default function DashboardHeader({ toggleSidebar, user, userProfile }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden text-gray-500 hover:text-gray-900"
          onClick={toggleSidebar}
        >
          <FiMenu className="h-6 w-6" />
        </button>

        {/* Search bar */}
        <div className="flex-1 min-w-0 md:ml-4">
          <div className="max-w-2xl mx-auto">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                id="search"
                name="search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search projects..."
                type="search"
              />
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="ml-4 flex items-center md:ml-6">
          {/* Notifications */}
          <button
            type="button"
            className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="sr-only">View notifications</span>
            <FiBell className="h-6 w-6" />
          </button>

          {/* Profile dropdown */}
          <div className="ml-3 relative">
            <div>
              <button
                type="button"
                className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="sr-only">Open user menu</span>
                {userProfile?.photoURL ? (
                  <img
                    className="h-8 w-8 rounded-full"
                    src={userProfile.photoURL}
                    alt="Profile"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                    {userProfile?.displayName?.[0] || user?.email?.[0] || ""}
                  </div>
                )}
              </button>
            </div>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div
                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabIndex="-1"
              >
                <Link
                  to="/dashboard/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  role="menuitem"
                  tabIndex="-1"
                >
                  <FiUser className="mr-2" /> Profile
                </Link>
                <Link
                  to="/dashboard/theme"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  role="menuitem"
                  tabIndex="-1"
                >
                  <FiSettings className="mr-2" /> Theme
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  role="menuitem"
                  tabIndex="-1"
                >
                  <FiLogOut className="mr-2" /> Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
