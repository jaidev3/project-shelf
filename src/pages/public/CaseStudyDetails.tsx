import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { getCaseStudy } from "../../apis/caseStudyService";
import {
  CaseStudy as CaseStudyType,
  MediaItem,
  TimelineItem,
  TestimonialItem,
} from "../../types/CaseStudy";

// Define types for the dummy data
interface DummyProcessItem {
  title: string;
  description: string;
}

interface DummyCaseStudy {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  overview?: string;
  challenge?: string;
  process?: DummyProcessItem[];
  results?: string[];
  tools?: string[];
}

interface DummyUser {
  name: string;
  title: string;
  caseStudies: DummyCaseStudy[];
}

// Import the dummy data (in real app, this would be from a central data store)
// Using a smaller dataset for simplicity
const DUMMY_USERS: Record<string, DummyUser> = {
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
  carol: {
    name: "Carol Martinez",
    title: "Content Strategist & Writer",
    caseStudies: [
      {
        id: "cs1",
        title: "SaaS Content Marketing Strategy",
        description:
          "Developed a content strategy that increased organic traffic by 140%",
        image:
          "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        tags: ["Content Strategy", "SaaS", "SEO"],
        overview:
          "The client, a SaaS company in the project management space, was struggling to generate organic traffic and quality leads. I developed a comprehensive content strategy focused on solving user pain points.",
        challenge:
          "The client had minimal organic visibility and was relying heavily on paid acquisition channels, resulting in high CAC and limited reach.",
        process: [
          {
            title: "Audience Research",
            description:
              "Conducted customer interviews and surveyed existing users to understand their challenges, motivations, and search behaviors.",
          },
          {
            title: "Keyword & Competitive Analysis",
            description:
              "Performed comprehensive keyword research and analyzed content strategies of top competitors to identify content gaps and opportunities.",
          },
          {
            title: "Content Framework Development",
            description:
              "Created a content pillar structure with supporting topics mapped to the buyer's journey and key user personas.",
          },
          {
            title: "Content Calendar & Production",
            description:
              "Developed a 6-month content calendar and produced a mix of blog posts, guides, and resource pages optimized for search intent.",
          },
        ],
        results: [
          "Increased organic traffic by 140% in six months",
          "Reduced customer acquisition cost by 37%",
          "Improved conversion rate from organic traffic by 28%",
          "Generated 43 high-quality backlinks from industry publications",
        ],
        tools: [
          "SEMrush",
          "Ahrefs",
          "Clearscope",
          "Google Analytics",
          "Hotjar",
        ],
      },
    ],
  },
};

export default function CaseStudyDetails() {
  const { username, caseStudyId } = useParams<{
    username: string;
    caseStudyId: string;
  }>();
  const location = useLocation();
  const [caseStudy, setCaseStudy] = useState<CaseStudyType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Determine if we're in the example route or regular route
  const isExampleRoute = location.pathname.startsWith("/example/");
  const routePrefix = isExampleRoute ? `/example/${username}` : `/${username}`;

  useEffect(() => {
    async function fetchCaseStudy() {
      if (!caseStudyId || !username) return;

      try {
        // If in example route, use dummy data
        if (isExampleRoute) {
          const dummyUser = DUMMY_USERS[username.toLowerCase()];
          if (dummyUser) {
            const dummyCaseStudy = dummyUser.caseStudies.find(
              (cs) => cs.id === caseStudyId
            );

            if (dummyCaseStudy) {
              // Create a dummy case study object that matches the CaseStudy type
              const fullDummyCaseStudy: CaseStudyType = {
                id: dummyCaseStudy.id,
                userId: "dummy-user-id",
                username: username,
                title: dummyCaseStudy.title,
                description: dummyCaseStudy.description,
                image: dummyCaseStudy.image,
                tags: dummyCaseStudy.tags,
                overview: dummyCaseStudy.overview || "No overview available",
                isPublished: true,
                portfolioStyle:
                  username.toLowerCase() === "alice"
                    ? "designer"
                    : username.toLowerCase() === "bob"
                    ? "developer"
                    : username.toLowerCase() === "carol"
                    ? "writer"
                    : "designer",
                gallery: [],
                timeline: dummyCaseStudy.process
                  ? dummyCaseStudy.process.map((item, index) => ({
                      id: `step-${index}`,
                      title: item.title,
                      description: item.description,
                      order: index,
                    }))
                  : [],
                tools: dummyCaseStudy.tools || [],
                outcomes: {
                  metrics: dummyCaseStudy.results || [],
                  testimonials: [],
                },
              };

              setCaseStudy(fullDummyCaseStudy);
            }
          }
          setLoading(false);
          return;
        }

        // If not in example route, get real data
        const fetchedCaseStudy = (await getCaseStudy(
          caseStudyId
        )) as CaseStudyType;

        // Verify the case study belongs to the username in the URL and is published
        if (
          !fetchedCaseStudy ||
          fetchedCaseStudy.username !== username ||
          !fetchedCaseStudy.isPublished
        ) {
          setError(
            "This case study doesn't exist or isn't publicly available."
          );
          setLoading(false);
          return;
        }

        setCaseStudy(fetchedCaseStudy);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching case study:", error);
        setError(
          "Failed to load case study details. The study may not exist or isn't published."
        );
        setLoading(false);
      }
    }

    fetchCaseStudy();
  }, [caseStudyId, username, isExampleRoute]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="text-xl dark:text-white">Loading case study...</div>
      </div>
    );
  }

  if (error || !caseStudy) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-bold mb-4 dark:text-white">
          Case Study Not Found
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          {error ||
            "We couldn't find the requested case study. It may have been removed or doesn't exist."}
        </p>
        {username ? (
          <Link
            to={`${routePrefix}`}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Back to Portfolio
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

  // Add copy URL functionality
  const handleCopyUrl = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("URL copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy URL: ", err);
      });
  };

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
                  to={`${routePrefix}`}
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
                  Back to portfolio
                </Link>
                <div className="flex justify-between items-center w-full">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {caseStudy.title}
                  </h1>
                  <button
                    onClick={handleCopyUrl}
                    className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-sm flex items-center"
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
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                      />
                    </svg>
                    Share
                  </button>
                </div>
                <p className="text-xl text-white/90 max-w-2xl">
                  {caseStudy.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="py-12 bg-white dark:bg-neutral-900">
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

          {/* Process/Timeline section */}
          {caseStudy.timeline && caseStudy.timeline.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 dark:text-white">
                Process
              </h2>
              <div className="space-y-6">
                {caseStudy.timeline.map((step, index) => (
                  <div
                    key={step.id || index}
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
          {caseStudy.outcomes &&
            caseStudy.outcomes.metrics &&
            caseStudy.outcomes.metrics.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6 dark:text-white">
                  Results
                </h2>
                <div className="bg-gray-50 dark:bg-neutral-800 p-6 rounded-lg">
                  <ul className="space-y-3 list-disc list-inside text-gray-700 dark:text-gray-300">
                    {caseStudy.outcomes.metrics.map((result, index) => (
                      <li key={index} className="pl-2">
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

          {/* Tools section */}
          {caseStudy.tools && caseStudy.tools.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">
                Tools & Technologies
              </h2>
              <div className="flex flex-wrap gap-2">
                {caseStudy.tools.map((tool) => (
                  <span
                    key={tool}
                    className="bg-gray-200 dark:bg-neutral-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Image gallery */}
          {caseStudy.gallery && caseStudy.gallery.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 dark:text-white">
                Gallery
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {caseStudy.gallery.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="bg-gray-200 dark:bg-neutral-700 rounded-lg overflow-hidden"
                  >
                    <img
                      src={item.url}
                      alt={item.caption || `Gallery image ${index + 1}`}
                      className="w-full h-48 object-cover"
                    />
                    {item.caption && (
                      <div className="p-3">
                        <h3 className="font-medium dark:text-white">
                          {item.caption}
                        </h3>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Testimonials */}
          {caseStudy.outcomes &&
            caseStudy.outcomes.testimonials &&
            caseStudy.outcomes.testimonials.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6 dark:text-white">
                  Testimonials
                </h2>
                <div className="space-y-6">
                  {caseStudy.outcomes.testimonials.map((testimonial, index) => (
                    <blockquote
                      key={testimonial.id || index}
                      className="bg-gray-50 dark:bg-neutral-800 p-6 rounded-lg border-l-4 border-indigo-500"
                    >
                      <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                        "{testimonial.quote}"
                      </p>
                      <footer className="flex items-center">
                        <div>
                          <p className="font-medium dark:text-white">
                            {testimonial.author}
                          </p>
                          {testimonial.position && testimonial.company && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {testimonial.position}, {testimonial.company}
                            </p>
                          )}
                        </div>
                      </footer>
                    </blockquote>
                  ))}
                </div>
              </section>
            )}

          <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-12">
            <div className="flex flex-col sm:flex-row justify-between">
              <Link
                to={`${routePrefix}`}
                className="bg-white dark:bg-neutral-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors mb-4 sm:mb-0 text-center sm:text-left"
              >
                Back to Portfolio
              </Link>
              <button
                onClick={handleCopyUrl}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors text-center sm:text-left flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                  />
                </svg>
                Share Case Study
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
