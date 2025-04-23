import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiPlusCircle, FiUser } from "react-icons/fi";
import { TfiPalette } from "react-icons/tfi";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: FiHome },
  {
    name: "New Case Study",
    path: "/dashboard/case-study",
    icon: FiPlusCircle,
  },
  { name: "Profile", path: "/dashboard/profile", icon: FiUser },
  { name: "Theme", path: "/dashboard/theme", icon: TfiPalette },
];

export default function DashboardSidebar({
  onClose,
  user,
}: {
  onClose?: () => void;
  user: any;
}) {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="h-full flex flex-col bg-white shadow-sm dark:bg-neutral-900">
      {/* Mobile close button */}
      {onClose && (
        <div className="flex items-center justify-between p-4 md:hidden">
          <div className="font-semibold text-xl">Project Shelf</div>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
            onClick={onClose}
          >
            <span className="sr-only">Close sidebar</span>
            {/* <FiX className="h-6 w-6" /> */}
          </button>
        </div>
      )}

      {/* User info */}
      <div className="px-4 py-6">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 overflow-hidden dark:bg-neutral-800 dark:text-gray-300">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || "User"}
                className="h-full w-full object-cover"
              />
            ) : (
              <FiUser className="h-6 w-6" />
            )}
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-900 truncate max-w-[150px] dark:text-gray-100">
              {user?.displayName || "Your Portfolio"}
            </h2>
            <p className="text-sm text-gray-500 truncate max-w-[150px] dark:text-gray-400">
              @{user?.username || "username"}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-6 flex-1 px-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                group flex items-center px-4 py-2 text-sm font-medium rounded-md
                ${
                  isActive(item.path)
                    ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-neutral-800 dark:hover:text-white"
                }
              `}
            >
              <Icon
                className={`
                  mr-3 h-5 w-5
                  ${
                    isActive(item.path)
                      ? "text-indigo-500"
                      : "text-gray-400 group-hover:text-gray-500"
                  }
                `}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* View public portfolio link */}
      <div className="px-3 py-4 border-t border-gray-200 dark:border-neutral-700">
        <Link
          to={`/${user?.username || "#"}`}
          className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-indigo-600 hover:text-indigo-700 hover:bg-gray-50 dark:text-indigo-400 dark:hover:text-indigo-300 dark:hover:bg-neutral-800"
        >
          <span className="truncate">View Public Portfolio</span>
        </Link>
      </div>
    </div>
  );
}
