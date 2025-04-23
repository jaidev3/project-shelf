import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AnalyticsDashboard from "../../components/AnalyticsDashboard";
import { getUserCaseStudies } from "../../apis/caseStudyService";
import { useAuth } from "../../contexts/AuthContext";
import { CaseStudy } from "../../types/CaseStudy";
import { showSuccessToast, showErrorToast } from "../../utils/toast";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCaseStudies() {
      if (!currentUser) return;

      try {
        const studies = await getUserCaseStudies(currentUser.uid);
        setCaseStudies(studies as CaseStudy[]);
      } catch (error) {
        console.error("Error fetching case studies:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCaseStudies();
  }, [currentUser]);

  const handleShareCaseStudy = (caseStudy: CaseStudy) => {
    if (!caseStudy.isPublished) {
      showErrorToast("You need to publish this case study before sharing it");
      return;
    }

    const baseUrl = window.location.origin;
    const shareUrl = `${baseUrl}/${caseStudy.username}/case-study/${caseStudy.id}`;

    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        showSuccessToast("Share link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy URL: ", err);
        showErrorToast("Failed to copy URL to clipboard");
      });
  };

  return (
    <div className="dashboard-page p-6">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">
        Portfolio Analytics Dashboard
      </h1>
      <AnalyticsDashboard />

      {/* Case Studies Section */}
      <div className="mt-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold dark:text-white">
            Your Case Studies
          </h2>
          <Link
            to="/dashboard/case-study/create"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Create New
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading your case studies...</div>
        ) : caseStudies.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              You haven't created any case studies yet. Create your first one to
              showcase your work!
            </p>
            <Link
              to="/dashboard/case-study/create"
              className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition"
            >
              Create First Case Study
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <div
                key={study.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
              >
                <div className="h-48 bg-gray-200 dark:bg-gray-700 relative">
                  {study.image ? (
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                      No image
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        study.isPublished
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      }`}
                    >
                      {study.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-2 dark:text-white">
                    {study.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {study.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {study.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {study.tags.length > 3 && (
                      <span className="text-xs text-gray-500 dark:text-gray-400 self-center">
                        +{study.tags.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <Link
                      to={`/dashboard/case-study/${study.id}`}
                      className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleShareCaseStudy(study)}
                      className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline text-sm flex items-center"
                      disabled={!study.isPublished}
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
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        />
                      </svg>
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
