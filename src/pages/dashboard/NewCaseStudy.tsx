import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DesignerPortfolio from "../../components/portfolios/DesignerPortfolio";
import DeveloperPortfolio from "../../components/portfolios/DeveloperPortfolio";
import WriterPortfolio from "../../components/portfolios/WriterPortfolio";

// Types
type PortfolioStyle = "designer" | "developer" | "writer";

type Portfolio = {
  id: string;
  style: PortfolioStyle;
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

export default function NewCaseStudy() {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [portfolioStyle, setPortfolioStyle] =
    useState<PortfolioStyle>("designer");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Mock function to fetch portfolio data - replace with actual API call
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        // This would be an actual API call in a real implementation
        // For now, we'll just simulate a delay and then set the portfolio to null
        // to demonstrate the "no portfolio" state
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Uncomment to test with a mock portfolio
        /*
        setPortfolio({
          id: '123',
          style: 'designer',
          userData: {
            name: 'Jane Designer',
            title: 'UX/UI Designer',
            bio: 'Passionate about creating beautiful and functional user experiences.',
            avatar: 'https://via.placeholder.com/150',
            caseStudies: []
          },
          username: 'janedesigner'
        });
        */

        setPortfolio(null); // Set to null to demonstrate the "Create Portfolio" button state
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  const handleCreatePortfolio = () => {
    // Navigate to the CaseStudyEditor
    navigate("/dashboard/case-study/create");
  };

  const handleStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPortfolioStyle(e.target.value as PortfolioStyle);
  };

  const handleSaveDraft = () => {
    alert("Save draft functionality would be implemented here");
  };

  const handlePublish = () => {
    alert("Publish functionality would be implemented here");
  };

  const handleEdit = () => {
    alert("Edit functionality would be implemented here");
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
    if (!portfolio) return null;

    switch (portfolioStyle) {
      case "designer":
        return (
          <DesignerPortfolio
            userData={portfolio.userData}
            username={portfolio.username}
          />
        );
      case "developer":
        return (
          <DeveloperPortfolio
            userData={portfolio.userData}
            username={portfolio.username}
          />
        );
      case "writer":
        return (
          <WriterPortfolio
            userData={portfolio.userData}
            username={portfolio.username}
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
        <h2 className="text-2xl font-semibold mb-4 dark:text-white">
          Portfolio
        </h2>

        {portfolio ? (
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
                className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                onClick={handleSaveDraft}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
              >
                Save Draft
              </button>
              <button
                onClick={handlePublish}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
              >
                Publish
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
