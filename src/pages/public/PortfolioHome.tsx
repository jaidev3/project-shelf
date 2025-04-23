import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import DesignerPortfolio from "../../components/portfolios/DesignerPortfolio";
import DeveloperPortfolio from "../../components/portfolios/DeveloperPortfolio";
import WriterPortfolio from "../../components/portfolios/WriterPortfolio";

// Updated type definition for users
type User = {
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

// Dummy data for portfolios
const DUMMY_USERS: Record<string, User> = {
  alice: {
    name: "Alice Cooper",
    title: "UX Designer & Researcher",
    bio: "I create user-centered digital experiences that solve real problems. With 5+ years of experience in the field, I specialize in research-driven design that delivers measurable results.",
    avatar: "https://randomuser.me/api/portraits/women/24.jpg",
    caseStudies: [
      {
        id: "cs1",
        title: "E-commerce Checkout Redesign",
        description:
          "Increased conversion rates by 27% through a streamlined checkout experience",
        image:
          "https://images.unsplash.com/photo-1661956602139-ec64991b8b16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=665&q=80",
        tags: ["UX Design", "E-commerce", "Conversion Optimization"],
      },
      {
        id: "cs2",
        title: "Health App User Research",
        description:
          "Conducted user interviews to identify key pain points in healthcare app",
        image:
          "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        tags: ["User Research", "Healthcare", "Mobile App"],
      },
      {
        id: "cs3",
        title: "Design System Implementation",
        description: "Created a scalable design system for a fintech platform",
        image:
          "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        tags: ["Design Systems", "Fintech", "Component Library"],
      },
    ],
  },
  bob: {
    name: "Bob Johnson",
    title: "Full Stack Developer",
    bio: "I build modern web applications with React, Node.js and cloud technologies. Focused on creating clean, efficient code that scales with your business needs.",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    caseStudies: [
      {
        id: "cs1",
        title: "Real-time Collaboration Tool",
        description:
          "Built a WebSocket-powered collaboration platform for remote teams",
        image:
          "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        tags: ["WebSockets", "React", "Node.js"],
      },
      {
        id: "cs2",
        title: "E-commerce Platform Migration",
        description:
          "Migrated legacy shop to a modern headless commerce architecture",
        image:
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        tags: ["API Development", "E-commerce", "Migration"],
      },
    ],
  },
  carol: {
    name: "Carol Martinez",
    title: "Content Strategist & Writer",
    bio: "I craft compelling content strategies and engaging copy that connects brands with their audiences. Specializing in storytelling that drives measurable engagement.",
    avatar: "https://randomuser.me/api/portraits/women/67.jpg",
    caseStudies: [
      {
        id: "cs1",
        title: "SaaS Content Marketing Strategy",
        description:
          "Developed a content strategy that increased organic traffic by 140%",
        image:
          "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        tags: ["Content Strategy", "SaaS", "SEO"],
      },
      {
        id: "cs2",
        title: "Brand Voice Development",
        description: "Created a distinctive brand voice for a wellness company",
        image:
          "https://images.unsplash.com/photo-1493836512294-502baa1986e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1190&q=80",
        tags: ["Brand Identity", "Copywriting", "Wellness"],
      },
      {
        id: "cs3",
        title: "Email Marketing Campaign",
        description:
          "Designed a 5-part email sequence with 42% open rate and 12% conversion",
        image:
          "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
        tags: ["Email Marketing", "Conversion", "Campaign Strategy"],
      },
    ],
  },
};

export default function PortfolioHome() {
  const { username } = useParams<{ username: string }>();
  const location = useLocation();

  // Determine if we're in the example route or regular route
  const isExampleRoute = location.pathname.startsWith("/example/");
  const routePrefix = isExampleRoute ? `/example/${username}` : `/${username}`;

  // If username doesn't exist in our dummy data, show a not found message
  const userData = username ? DUMMY_USERS[username.toLowerCase()] : undefined;

  if (!userData) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-bold mb-4 dark:text-white">
          Portfolio Not Found
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          We couldn't find a portfolio for "{username}". This user might not
          exist or hasn't created a portfolio yet.
        </p>
        <Link
          to="/"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  // Determine which portfolio component to use based on user's title/profession
  const userProfession = userData.title.toLowerCase();
  const isDesigner =
    userProfession.includes("design") ||
    userProfession.includes("ux") ||
    userProfession.includes("ui");
  const isDeveloper =
    userProfession.includes("develop") ||
    userProfession.includes("engineer") ||
    userProfession.includes("code") ||
    userProfession.includes("stack");
  const isWriter =
    userProfession.includes("writ") ||
    userProfession.includes("content") ||
    userProfession.includes("copy") ||
    userProfession.includes("editor");

  // Return the appropriate portfolio component
  if (isDesigner) {
    return <DesignerPortfolio userData={userData} username={username || ""} />;
  } else if (isDeveloper) {
    return <DeveloperPortfolio userData={userData} username={username || ""} />;
  } else if (isWriter) {
    return <WriterPortfolio userData={userData} username={username || ""} />;
  }

  // Fallback to generic portfolio layout
  return (
    <div className="portfolio-home-page">
      {/* Header section with user info */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src={userData.avatar}
                alt={userData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {userData.name}
              </h1>
              <h2 className="text-xl mb-4 opacity-90">{userData.title}</h2>
              <p className="max-w-2xl text-md md:text-lg opacity-80">
                {userData.bio}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Case studies section */}
      <section className="py-16 bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 dark:text-white">
            Case Studies
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userData.caseStudies.map((study) => (
              <div
                key={study.id}
                className="bg-gray-50 dark:bg-neutral-800 rounded-lg overflow-hidden shadow-md"
              >
                <div className="h-48 bg-gray-200 dark:bg-gray-700">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">
                    {study.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {study.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`${routePrefix}/case-study/${study.id}`}
                    className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline inline-flex items-center"
                  >
                    View case study
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
        </div>
      </section>

      {/* Contact section */}
      <section className="py-16 bg-gray-50 dark:bg-neutral-800">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 dark:text-white">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Interested in working together? Feel free to reach out for
            collaborations or just a friendly hello.
          </p>
          <a
            href="#"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors inline-block"
          >
            Contact {userData.name.split(" ")[0]}
          </a>
        </div>
      </section>
    </div>
  );
}
