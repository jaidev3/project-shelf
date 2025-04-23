import React from "react";
import { Link } from "react-router-dom";

// Developer portfolio type definition
export type DeveloperPortfolioProps = {
  userData: {
    name: string;
    title: string;
    bio: string;
    avatar: string;
    caseStudies: Array<{
      id: string;
      title: string;
      description: string;
      image: string;
      tags: string[];
    }>;
  };
  username: string;
};

export default function DeveloperPortfolio({
  userData,
  username,
}: DeveloperPortfolioProps) {
  return (
    <div className="developer-portfolio">
      {/* Terminal-inspired header */}
      <header className="bg-gray-900 text-green-400 py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="border border-gray-700 rounded-lg overflow-hidden max-w-4xl mx-auto bg-black p-4 md:p-8">
            <div className="flex items-center mb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="ml-4 text-gray-400 text-sm">
                {username}@portfolio ~
              </div>
            </div>
            <div className="font-mono">
              <p>
                <span className="text-blue-400">const</span>{" "}
                <span className="text-yellow-300">developer</span> = {`{`}
              </p>
              <p className="ml-4">
                <span className="text-purple-400">name:</span>{" "}
                <span className="text-green-300">"{userData.name}"</span>,
              </p>
              <p className="ml-4">
                <span className="text-purple-400">title:</span>{" "}
                <span className="text-green-300">"{userData.title}"</span>,
              </p>
              <p className="ml-4 text-purple-400">
                bio:{" "}
                <span className="text-gray-300 font-normal">
                  "{userData.bio}"
                </span>
              </p>
              <p>{`}`};</p>
              <p className="mt-4 text-white">
                {">"} <span className="animate-pulse">_</span>
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Technical projects section */}
      <section className="py-16 bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold mb-8 dark:text-white">
            <span className="text-blue-600 dark:text-blue-400">function</span>
            <span className="ml-2">getProjects()</span>
            <span className="text-gray-400"> {`{`}</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userData.caseStudies.map((study) => (
              <div
                key={study.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-48 bg-gray-100 dark:bg-gray-800 relative">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-black/80 text-xs text-white px-2 py-1 font-mono">
                    main.project
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 dark:text-white font-mono">
                    {study.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {study.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/${username}/case-study/${study.id}`}
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    view.details()
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <p className="text-gray-400 mt-6 font-mono dark:text-gray-500">{`};`}</p>
        </div>
      </section>

      {/* Tech stack section */}
      <section className="py-16 bg-gray-50 dark:bg-neutral-800">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold mb-10 dark:text-white">
            <span className="text-purple-600 dark:text-purple-400">const</span>
            <span className="ml-2">techStack</span>
            <span className="text-gray-400"> = [</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              "JavaScript",
              "TypeScript",
              "React",
              "Node.js",
              "Python",
              "MongoDB",
              "AWS",
              "Docker",
              "GraphQL",
              "Git",
              "CI/CD",
              "Jest",
            ].map((tech) => (
              <div
                key={tech}
                className="p-4 bg-white dark:bg-neutral-700 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="font-mono text-lg font-medium dark:text-white">
                  {tech}
                </div>
              </div>
            ))}
          </div>

          <p className="text-gray-400 mt-6 font-mono dark:text-gray-500">{`];`}</p>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-16 bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6 dark:text-white font-mono">
            <span className="text-green-600 dark:text-green-400">function</span>{" "}
            contactMe() {`{`}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Looking for a developer to build your next digital product? Let's
            discuss how I can help turn your ideas into reality.
          </p>
          <a
            href="#"
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors inline-block font-mono"
          >
            initiate.contact()
          </a>
          <p className="text-gray-400 mt-6 font-mono dark:text-gray-500">{`}`}</p>
        </div>
      </section>
    </div>
  );
}
