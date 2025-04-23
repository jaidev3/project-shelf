import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DesignerPortfolio from "../../components/portfolios/DesignerPortfolio";
import DeveloperPortfolio from "../../components/portfolios/DeveloperPortfolio";
import WriterPortfolio from "../../components/portfolios/WriterPortfolio";
import {
  getUserCaseStudies,
  updateCaseStudy,
} from "../../apis/caseStudyService";
import { getCurrentUser } from "../../apis/authService";
import { CaseStudy } from "../../types/CaseStudy";
import { showSuccessToast, showErrorToast } from "../../utils/toast";

// Define a type that matches what the portfolio components expect
interface PortfolioData {
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
}

export default function NewCaseStudy() {
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(
    null
  );
  const [portfolioStyle, setPortfolioStyle] = useState<
    "designer" | "developer" | "writer"
  >("designer");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user's case study and create portfolio data
  useEffect(() => {
    const fetchCaseStudy = async () => {
      try {
        const currentUser = getCurrentUser();
        if (!currentUser) {
          console.error("No user logged in");
          setIsLoading(false);
          return;
        }

        const userCaseStudies = await getUserCaseStudies(currentUser.uid);
        if (userCaseStudies.length > 0) {
          // Store the raw case study data
          setCaseStudy(userCaseStudies[0] as CaseStudy);

          // Create portfolio data from the case study
          const caseStudyData = userCaseStudies[0] as any;
          setPortfolioData({
            userData: {
              name: currentUser.displayName || "User",
              title: "Professional",
              bio: caseStudyData.description || "No bio available",
              avatar: currentUser.photoURL || "https://via.placeholder.com/150",
              caseStudies: [
                {
                  id: caseStudyData.id || "1",
                  title: caseStudyData.title || "Untitled",
                  description: caseStudyData.description || "No description",
                  image:
                    caseStudyData.image ||
                    "https://via.placeholder.com/600x400",
                  tags: caseStudyData.tags || [],
                },
              ],
            },
            username: currentUser.uid,
          });
        }
      } catch (error) {
        console.error("Error fetching case study:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCaseStudy();
  }, []);

  const handleCreatePortfolio = () => {
    // Navigate to the CaseStudyEditor
    navigate("/dashboard/case-study/create");
  };

  const handleStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPortfolioStyle(e.target.value as "designer" | "developer" | "writer");
  };

  const handlePublishToggle = async () => {
    if (caseStudy && caseStudy.id) {
      try {
        const newPublishStatus = !caseStudy.isPublished;

        // Update in the database
        await updateCaseStudy(caseStudy.id, { isPublished: newPublishStatus });

        // Update in local state
        setCaseStudy({
          ...caseStudy,
          isPublished: newPublishStatus,
        });

        // Show success toast notification
        showSuccessToast(
          `Case study ${
            newPublishStatus ? "published" : "moved to draft"
          } successfully`
        );
      } catch (error) {
        console.error("Error updating publish status:", error);
        showErrorToast("Failed to update publish status. Please try again.");
      }
    } else {
      console.error("No case study selected or case study has no ID");
    }
  };

  const handleEdit = () => {
    if (caseStudy && caseStudy.id) {
      // Navigate to the CaseStudyEditor with the current case study ID
      navigate(`/dashboard/case-study/${caseStudy.id}`);
    } else {
      console.error("No case study selected or case study has no ID");
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this portfolio?")) {
      alert("Delete functionality would be implemented here");
    }
  };

  // Display loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // Render portfolio based on style
  const renderPortfolio = () => {
    if (!portfolioData) return null;

    switch (portfolioStyle) {
      case "designer":
        return (
          <DesignerPortfolio
            userData={portfolioData.userData}
            username={portfolioData.username}
          />
        );
      case "developer":
        return (
          <DeveloperPortfolio
            userData={portfolioData.userData}
            username={portfolioData.username}
          />
        );
      case "writer":
        return (
          <WriterPortfolio
            userData={portfolioData.userData}
            username={portfolioData.username}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">
        New Case Study
      </h1>

      {/* Portfolio Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold dark:text-white">Portfolio</h2>

          {/* Status Badge */}
          {caseStudy && (
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                caseStudy.isPublished
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
              }`}
            >
              {caseStudy.isPublished ? "Published" : "Draft"}
            </span>
          )}
        </div>

        {portfolioData ? (
          <div>
            {/* Portfolio Style Dropdown */}
            <div className="mb-4">
              <label
                htmlFor="portfolioStyle"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Portfolio Style
              </label>
              <select
                id="portfolioStyle"
                value={portfolioStyle}
                onChange={handleStyleChange}
                className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="designer">Designer</option>
                <option value="developer">Developer</option>
                <option value="writer">Writer</option>
              </select>
            </div>

            {/* Portfolio Preview */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4 max-h-[600px] overflow-auto">
              {renderPortfolio()}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleEdit}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Edit
              </button>
              <button
                onClick={handlePublishToggle}
                className={`text-white px-4 py-2 rounded-md transition ${
                  caseStudy?.isPublished
                    ? "bg-yellow-600 hover:bg-yellow-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {caseStudy?.isPublished ? "Move to Draft" : "Publish"}
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
              No portfolio is associated with this case study yet. Create a
              portfolio to showcase your work.
            </p>
            <button
              onClick={handleCreatePortfolio}
              className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition"
            >
              Create Portfolio
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
