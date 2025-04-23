import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Input,
  Avatar,
} from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiBell, FiUser, FiLogOut } from "react-icons/fi";
import { useAuth } from "../../contexts/AuthContext";
import { User } from "firebase/auth";
import { showSuccessToast } from "../../utils/toast";

export default function DashboardHeader({
  toggleSidebar,
  user,
  userProfile,
}: {
  toggleSidebar: () => void;
  user: User | null;
  userProfile: any; // TODO: Replace with proper UserProfile type
}) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      showSuccessToast("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="bg-white shadow-sm dark:bg-neutral-900">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Mobile menu button */}
        <Button
          isIconOnly
          variant="light"
          className="md:hidden text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          onPress={toggleSidebar}
        >
          <FiMenu className="h-6 w-6" />
        </Button>

        {/* Search bar */}
        <div className="flex-1 min-w-0 md:ml-4">
          <div className="max-w-2xl mx-auto">
            <Input
              id="search"
              name="search"
              placeholder="Search projects..."
              variant="flat"
              size="md"
              startContent={
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
              }
              className="dark:bg-neutral-800 dark:border-neutral-700 dark:text-gray-200 dark:placeholder-gray-400"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="ml-4 flex items-center md:ml-6">
          {/* Notifications */}
          <Button
            isIconOnly
            variant="light"
            className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-neutral-800 dark:text-gray-300 dark:hover:text-white dark:focus:ring-offset-neutral-900"
          >
            <span className="sr-only">View notifications</span>
            <FiBell className="h-6 w-6" />
          </Button>

          {/* Profile dropdown */}
          <div className="ml-3 relative">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  isIconOnly
                  variant="light"
                  className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-neutral-800"
                  id="user-menu-button"
                >
                  {userProfile?.photoURL ? (
                    <Avatar
                      src={userProfile.photoURL}
                      alt="Profile"
                      radius="full"
                      size="md"
                      className="h-8 w-8"
                    />
                  ) : (
                    <Avatar
                      name={userProfile?.displayName || user?.email || ""}
                      radius="full"
                      size="md"
                      className="h-8 w-8 bg-indigo-500 text-white dark:bg-indigo-700"
                    >
                      {userProfile?.displayName?.[0] || user?.email?.[0] || ""}
                    </Avatar>
                  )}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="User menu"
                onAction={(key) => {
                  if (key === "profile") {
                    navigate("/dashboard/profile");
                  } else if (key === "logout") {
                    handleLogout();
                  }
                }}
              >
                <DropdownItem
                  key="profile"
                  startContent={<FiUser className="mr-2" />}
                >
                  Profile
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  startContent={<FiLogOut className="mr-2" />}
                >
                  Sign out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    </header>
  );
}
