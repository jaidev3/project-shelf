import React from "react";
import { useParams, Link } from "react-router-dom";

// Import the dummy data (in real app, this would be from a central data store)
// Using a smaller dataset for simplicity
const DUMMY_USERS = {
  alice: {
    name: "Alice Cooper",
    title: "UX Designer & Researcher",
    caseStudies: [
      {
        id: "cs1",
        title: "E-commerce Checkout Redesign",
        description:
          "Increased conversion rates by 27% through a streamlined checkout experience",
        image:
          "https://images.unsplash.com/photo-1661956602139-ec64991b8b16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=665&q=80",
        tags: ["UX Design", "E-commerce", "Conversion Optimization"],
        overview:
          "The client was facing a significant drop-off rate during checkout, impacting their overall conversion rates. My goal was to identify user pain points and redesign the checkout experience to improve conversions.",
        challenge:
          "The existing checkout process had a 73% abandonment rate, considerably higher than industry standards. Users reported confusion about shipping costs, too many steps, and concerns about payment security.",
        process: [
          {
            title: "Research & Analysis",
            description:
              "Conducted user interviews, session recordings analysis, and competitive research to identify pain points in the checkout flow.",
          },
          {
            title: "Wireframing & Prototyping",
            description:
              "Created low and high-fidelity wireframes of a streamlined checkout process, reducing steps from 5 to 3.",
          },
          {
            title: "User Testing",
            description:
              "Conducted usability testing with 12 participants, iterating on designs based on feedback.",
          },
          {
            title: "Implementation & Monitoring",
            description:
              "Worked with developers to implement the new design and set up analytics to track performance.",
          },
        ],
        results: [
          "Reduced checkout abandonment rate from 73% to 46%",
          "Increased overall conversion rate by 27%",
          "Improved average checkout time from 4.2 minutes to 2.7 minutes",
          "Positive user feedback with satisfaction score increasing from 3.2/5 to 4.6/5",
        ],
        tools: ["Figma", "Hotjar", "UsabilityHub", "Google Analytics"],
      },
    ],
  },
  bob: {
    name: "Bob Johnson",
    title: "Full Stack Developer",
    caseStudies: [
      {
        id: "cs1",
        title: "Real-time Collaboration Tool",
        description:
          "Built a WebSocket-powered collaboration platform for remote teams",
        image:
          "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        tags: ["WebSockets", "React", "Node.js"],
        overview:
          "Developed a real-time collaboration platform that allows remote teams to work together efficiently on documents, code, and design files.",
        challenge:
          "Remote teams were struggling with collaboration across time zones, leading to miscommunication and project delays.",
        process: [
          {
            title: "Requirements Gathering",
            description:
              "Collected requirements from stakeholders and potential users to understand collaboration pain points.",
          },
          {
            title: "Technical Architecture",
            description:
              "Designed a scalable architecture using WebSockets for real-time updates and a custom conflict resolution system.",
          },
          {
            title: "Development",
            description:
              "Built the application using React for the frontend, Node.js for the backend, and Socket.io for real-time communication.",
          },
          {
            title: "Testing & Deployment",
            description:
              "Conducted extensive testing with user groups and deployed to AWS using CI/CD pipelines.",
          },
        ],
        results: [
          "Reduced time spent on coordination by 35%",
          "Improved team satisfaction scores by 42%",
          "Successfully deployed to 5 enterprise clients",
        ],
        tools: ["React", "Node.js", "Socket.io", "AWS", "Jest"],
      },
    ],
  },
};

export default function CaseStudyDetails() {
  const { username, caseStudyId } = useParams();

  // If username doesn't exist or case study doesn't exist, show not found message
  const user = username && DUMMY_USERS[username.toLowerCase()];
  const caseStudy = user?.caseStudies.find((cs) => cs.id === caseStudyId);

  if (!user || !caseStudy) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-bold mb-4 dark:text-white">
          Case Study Not Found
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          We couldn't find the requested case study. It may have been removed or
          doesn't exist.
        </p>
        {user ? (
          <Link
            to={`/${username}`}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Back to {user.name}'s Portfolio
          </Link>
        ) : (
          <Link
            to="/"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Return to Home
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="case-study-details-page">
      {/* Hero banner with title */}
      <header className="relative">
        <div className="w-full h-64 md:h-96 bg-gray-800 overflow-hidden">
          <img
            src={caseStudy.image}
            alt={caseStudy.title}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full p-8">
            <div className="container mx-auto">
              <div className="flex flex-col items-start">
                <Link
                  to={`/${username}`}
                  className="text-white/80 hover:text-white mb-2 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back to {user.name}'s portfolio
                </Link>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {caseStudy.title}
                </h1>
                <p className="text-xl text-white/90 max-w-2xl">
                  {caseStudy.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="bg-white dark:bg-neutral-900 py-12">
        <div className="container mx-auto px-4 md:px-8">
          {/* Tags section */}
          <div className="flex flex-wrap gap-2 mb-8">
            {caseStudy.tags &&
              caseStudy.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
          </div>

          {/* Overview section */}
          {caseStudy.overview && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">
                Overview
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                {caseStudy.overview}
              </p>
            </section>
          )}

          {/* Challenge section */}
          {caseStudy.challenge && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">
                The Challenge
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                {caseStudy.challenge}
              </p>
            </section>
          )}

          {/* Process/Timeline section */}
          {caseStudy.process && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 dark:text-white">
                Process
              </h2>
              <div className="space-y-6">
                {caseStudy.process.map((step, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-neutral-800 p-6 rounded-lg"
                  >
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center mr-3">
                        {index + 1}
                      </div>
                      <h3 className="text-xl font-semibold dark:text-white">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 ml-11">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Results section */}
          {caseStudy.results && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 dark:text-white">
                Results
              </h2>
              <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-6">
                <ul className="space-y-3">
                  {caseStudy.results.map((result, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="h-6 w-6 text-green-500 mr-2 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">
                        {result}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Tools & Technologies section */}
          {caseStudy.tools && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">
                Tools & Technologies
              </h2>
              <div className="flex flex-wrap gap-3">
                {caseStudy.tools.map((tool) => (
                  <span
                    key={tool}
                    className="bg-gray-200 dark:bg-neutral-700 px-4 py-2 rounded-lg text-gray-800 dark:text-gray-200"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Navigation links */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-12">
            <div className="flex flex-col sm:flex-row justify-between">
              <Link
                to={`/${username}`}
                className="bg-white dark:bg-neutral-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors mb-4 sm:mb-0 text-center sm:text-left"
              >
                Back to Portfolio
              </Link>
              <Link
                to="/"
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors text-center sm:text-left"
              >
                View More Projects
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
