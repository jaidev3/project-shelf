import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-6 dark:bg-neutral-900 dark:text-gray-200">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-xl font-bold mb-2">Project Shelf</h3>
        <p className="text-gray-400 dark:text-gray-400">
          © {currentYear} Project Shelf. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
