import React from "react";
import { Link } from "react-router-dom";

// Writer portfolio type definition
export type WriterPortfolioProps = {
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

export default function WriterPortfolio({
  userData,
  username,
}: WriterPortfolioProps) {
  return (
    <div className="writer-portfolio font-serif">
      {/* Elegant header with serif typography */}
      <header className="bg-amber-50 text-gray-800 py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <img
                src={userData.avatar}
                alt={userData.name}
                className="w-24 h-24 rounded-full mx-auto border-2 border-amber-800"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {userData.name}
            </h1>
            <div className="w-16 h-1 bg-amber-800 mx-auto mb-6"></div>
            <h2 className="text-xl italic mb-6">{userData.title}</h2>
            <p className="text-lg leading-relaxed">{userData.bio}</p>
          </div>
        </div>
      </header>

      {/* Featured Work Section - Book/Magazine Style */}
      <section className="py-16 bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center dark:text-white">
              Featured Work
            </h2>

            {userData.caseStudies.map((study, index) => (
              <div key={study.id} className="mb-16">
                <div
                  className={`flex flex-col ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } gap-8`}
                >
                  <div className="md:w-1/2">
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-full h-64 object-cover rounded-lg shadow-md"
                    />
                  </div>
                  <div className="md:w-1/2 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-3 dark:text-white">
                      {study.title}
                    </h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                      {study.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {study.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={`/${username}/case-study/${study.id}`}
                      className="inline-block border-b-2 border-amber-800 text-amber-800 hover:border-amber-600 hover:text-amber-600 transition-colors font-medium"
                    >
                      Read the full story
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Writer's approach section */}
      <section className="py-16 bg-amber-50 dark:bg-neutral-800">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center dark:text-white">
              My Writing Process
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-block p-4 bg-white dark:bg-neutral-700 rounded-full shadow-sm mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-amber-800 dark:text-amber-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 dark:text-white">
                  Research
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  I dive deep into subject matter to develop authoritative and
                  accurate content that engages readers.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-block p-4 bg-white dark:bg-neutral-700 rounded-full shadow-sm mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-amber-800 dark:text-amber-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 dark:text-white">
                  Craft
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  I carefully structure narratives and content to deliver your
                  message with clarity and impact.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-block p-4 bg-white dark:bg-neutral-700 rounded-full shadow-sm mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-amber-800 dark:text-amber-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 dark:text-white">
                  Refine
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  I polish each piece through careful editing to ensure every
                  word serves your message and resonates with readers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center dark:text-white">
              What Clients Say
            </h2>

            <div className="bg-gray-50 dark:bg-neutral-800 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <p className="text-xl italic mb-6 text-gray-700 dark:text-gray-300">
                "Working with {userData.name.split(" ")[0]} was a transformative
                experience for our brand. Their ability to capture our voice
                while elevating our message resulted in content that truly
                connects with our audience."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-amber-800 font-bold">JD</span>
                </div>
                <div>
                  <p className="font-bold dark:text-white">Jane Doe</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Marketing Director, Example Co.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-16 bg-amber-50 dark:bg-neutral-800">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">
              Let's Collaborate
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              Have a story that needs telling? I'd love to help craft content
              that captivates your audience and delivers results.
            </p>
            <a
              href="#"
              className="inline-block bg-amber-800 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition-colors"
            >
              Start a Conversation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
