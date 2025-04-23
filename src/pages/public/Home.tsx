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

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
            Why Choose Project Shelf?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 dark:bg-neutral-800 p-6 rounded-lg shadow-sm">
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
            <div className="bg-gray-50 dark:bg-neutral-800 p-6 rounded-lg shadow-sm">
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
            <div className="bg-gray-50 dark:bg-neutral-800 p-6 rounded-lg shadow-sm">
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
                Customizable Themes
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Choose from multiple pre-built themes and preview changes in
                real-time to match your personal brand.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-50 dark:bg-neutral-800 p-6 rounded-lg shadow-sm">
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">
                Analytics Dashboard
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Track portfolio traffic, engagement metrics, and see which case
                studies are getting the most attention.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gray-50 dark:bg-neutral-800 p-6 rounded-lg shadow-sm">
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
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">
                Mobile Responsive
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your portfolio looks great on all devices, from desktop to
                tablet to mobile phone.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gray-50 dark:bg-neutral-800 p-6 rounded-lg shadow-sm">
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
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">
                Client Testimonials
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Showcase feedback from clients and collaborators to build trust
                with potential employers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Examples */}
      <section className="py-16 bg-gray-50 dark:bg-neutral-800">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
            Showcase Your Work Like a Pro
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Example Portfolio 1 */}
            <div className="bg-white dark:bg-neutral-700 rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-gray-200 dark:bg-gray-600">
                <img
                  src="https://images.unsplash.com/photo-1541462608143-67571c6738dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="UX Designer Portfolio"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  Sarah J. - UX Designer
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Portfolio showcasing user-centered design projects with
                  detailed case studies and research insights.
                </p>
                <Link
                  to="/alice"
                  className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                >
                  View example →
                </Link>
              </div>
            </div>

            {/* Example Portfolio 2 */}
            <div className="bg-white dark:bg-neutral-700 rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-gray-200 dark:bg-gray-600">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Web Developer Portfolio"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  Mark T. - Web Developer
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Full-stack developer featuring interactive web applications
                  with technical breakdown and GitHub integrations.
                </p>
                <Link
                  to="/bob"
                  className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                >
                  View example →
                </Link>
              </div>
            </div>

            {/* Example Portfolio 3 */}
            <div className="bg-white dark:bg-neutral-700 rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-gray-200 dark:bg-gray-600">
                <img
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Content Writer Portfolio"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  Emily R. - Content Writer
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Collection of writing samples with campaign results, audience
                  metrics, and brand voice examples.
                </p>
                <Link
                  to="/carol"
                  className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                >
                  View example →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
            What Our Users Say
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 dark:bg-neutral-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden mr-4">
                  <img
                    src="https://randomuser.me/api/portraits/women/43.jpg"
                    alt="User testimonial"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold dark:text-white">
                    Jessica Williams
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Freelance Designer
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                "Project Shelf has completely transformed how I showcase my work
                to clients. The case study templates made it easy to highlight
                my process, and I've received so many compliments on the
                professional look."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-50 dark:bg-neutral-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden mr-4">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="User testimonial"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold dark:text-white">Alex Chen</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    UI Developer
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                "The analytics dashboard has been a game-changer for me. I can
                see which case studies are getting the most attention and
                optimize my portfolio based on real data. I landed two major
                contracts since using Project Shelf!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Showcase Your Work?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of creatives who use Project Shelf to highlight their
            skills and win more clients.
          </p>
          {currentUser ? (
            <Link
              to="/dashboard"
              className="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-lg hover:bg-indigo-50 transition-colors inline-block"
            >
              Go to Your Dashboard
            </Link>
          ) : (
            <Link
              to="/signup"
              className="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-lg hover:bg-indigo-50 transition-colors inline-block"
            >
              Create Your Portfolio For Free
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
