import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Home() {
  const { currentUser } = useAuth();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Showcase Your Creative Work with Project Shelf
            </h1>
            <p className="text-xl mb-8">
              Create stunning portfolios and detailed case studies that
              highlight your creative process and results.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {currentUser ? (
                <Link
                  to="/dashboard"
                  className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors"
                  >
                    Create Your Portfolio
                  </Link>
                  <Link
                    to="/login"
                    className="border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Templates Showcase */}
      <section className="py-16 bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
            Professional Portfolio Templates for Every Discipline
          </h2>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Designer Portfolio */}
            <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
              <div className="h-56 bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <img
                    src="https://randomuser.me/api/portraits/women/24.jpg"
                    alt="Designer"
                    className="w-20 h-20 rounded-full border-4 border-white"
                  />
                </div>
                <h3 className="text-white text-2xl font-bold z-10 mt-20">
                  Design Portfolio
                </h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Perfect for UX/UI designers, graphic designers, and other
                  visual creatives. Showcase your work with eye-catching visuals
                  and demonstrate your design process.
                </p>
                <Link
                  to="/example/alice"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium px-5 py-2 rounded-lg hover:opacity-90 transition-opacity inline-block"
                >
                  View Example
                </Link>
              </div>
            </div>

            {/* Developer Portfolio */}
            <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
              <div className="h-56 bg-gray-900 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <img
                    src="https://randomuser.me/api/portraits/men/44.jpg"
                    alt="Developer"
                    className="w-20 h-20 rounded-full border-4 border-white"
                  />
                </div>
                <h3 className="text-green-400 text-2xl font-bold font-mono z-10 mt-20">
                  &lt;Dev Portfolio /&gt;
                </h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Designed for developers and engineers to showcase projects
                  with code snippets, technical details, and demonstrate
                  problem-solving abilities.
                </p>
                <Link
                  to="/example/bob"
                  className="bg-blue-600 text-white font-medium px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block"
                >
                  View Example
                </Link>
              </div>
            </div>

            {/* Writer Portfolio */}
            <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
              <div className="h-56 bg-amber-50 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                  <img
                    src="https://randomuser.me/api/portraits/women/67.jpg"
                    alt="Writer"
                    className="w-20 h-20 rounded-full border-4 border-amber-800"
                  />
                </div>
                <h3 className="text-gray-800 text-2xl font-bold font-serif z-10 mt-20">
                  Writer's Portfolio
                </h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Ideal for content creators, copywriters, and authors to
                  highlight writing samples, demonstrate versatility, and
                  showcase content strategy expertise.
                </p>
                <Link
                  to="/example/carol"
                  className="bg-amber-800 text-white font-medium px-5 py-2 rounded-lg hover:bg-amber-700 transition-colors inline-block"
                >
                  View Example
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-neutral-800">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
            Why Choose Project Shelf?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-neutral-700 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">
                Custom Portfolio URL
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get your own personalized URL with your username that you can
                share with clients and employers.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-neutral-700 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">
                Modular Case Studies
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Create detailed case studies with project overviews, media
                galleries, timelines, and outcome metrics.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-neutral-700 p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">
                Professional Templates
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Choose specialized templates designed for designers, developers,
                and writers that showcase your specific skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Build Your Portfolio?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who use Project Shelf to showcase
            their work and land their dream opportunities.
          </p>
          <Link
            to="/signup"
            className="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Get Started For Free
          </Link>
        </div>
      </section>
    </div>
  );
}
