import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ThemeToggle } from "../ThemeToggle";

export default function PublicHeader() {
  const { currentUser } = useAuth();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          Project Shelf
        </Link>
        <nav className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-indigo-600">
            Home
          </Link>
          {!currentUser ? (
            <>
              <Link to="/login" className="text-gray-700 hover:text-indigo-600">
                Login
              </Link>
              <Link
                to="/signup"
                className="text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md"
              >
                Sign Up
              </Link>
              <ThemeToggle />
            </>
          ) : (
            <Link
              to="/dashboard"
              className="text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md"
            >
              Dashboard
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
