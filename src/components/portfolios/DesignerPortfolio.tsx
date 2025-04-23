import React from "react";
import { Link, useLocation } from "react-router-dom";

// Designer portfolio type definition
export type DesignerPortfolioProps = {
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

export default function DesignerPortfolio({
  userData,
  username,
}: DesignerPortfolioProps) {
  const location = useLocation();

  // Determine if we're in the example route or regular route
  const isExampleRoute = location.pathname.startsWith("/example/");
  const routePrefix = isExampleRoute ? `/example/${username}` : `/${username}`;

  return (
    <div className="designer-portfolio">
      {/* Header with large visual impact */}
      <header className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg order-1 md:order-2">
              <img
                src={userData.avatar}
                alt={userData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center md:text-left max-w-2xl order-2 md:order-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                {userData.name}
              </h1>
              <h2 className="text-2xl mb-5 font-light">{userData.title}</h2>
              <p className="text-lg leading-relaxed opacity-90">
                {userData.bio}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Visual Portfolio Grid with large images */}
      <section className="py-16 bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center dark:text-white">
            Design Portfolio
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {userData.caseStudies.map((study) => (
              <div key={study.id} className="group">
                <div className="relative overflow-hidden rounded-xl shadow-lg mb-4 aspect-video">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{study.title}</h3>
                      <p className="text-white/80">{study.description}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  to={`${routePrefix}/case-study/${study.id}`}
                  className="inline-block bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  View Project
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Process Section */}
      <section className="py-16 bg-gray-50 dark:bg-neutral-800">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8 dark:text-white">
            My Design Process
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="p-6 bg-white dark:bg-neutral-700 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-pink-600 text-2xl font-bold">01</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">
                Research
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Understanding user needs through interviews and data analysis
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-neutral-700 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-pink-600 text-2xl font-bold">02</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">
                Ideate
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Sketching solutions and exploring possibilities
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-neutral-700 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-pink-600 text-2xl font-bold">03</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">
                Design
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Creating high-fidelity designs and interactive prototypes
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-neutral-700 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-pink-600 text-2xl font-bold">04</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">
                Test
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Validating solutions through user testing and refining
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-16 bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">
            Let's Create Something Amazing
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Interested in collaborating on your next design project? I'd love to
            hear about it.
          </p>
          <a
            href="#"
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity inline-block"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}
