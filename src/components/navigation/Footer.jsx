import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Project Shelf</h3>
          <p className="text-gray-400">
            A platform to showcase your professional projects and portfolio.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <nav className="space-y-2">
            <Link to="/" className="block text-gray-300 hover:text-white">
              Home
            </Link>
            <Link to="/login" className="block text-gray-300 hover:text-white">
              Login
            </Link>
            <Link to="/signup" className="block text-gray-300 hover:text-white">
              Sign Up
            </Link>
          </nav>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Connect</h4>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-300 hover:text-white">
              GitHub
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              LinkedIn
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              Twitter
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 py-4 text-center">
        <p className="text-gray-400">
          © {currentYear} Project Shelf. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
