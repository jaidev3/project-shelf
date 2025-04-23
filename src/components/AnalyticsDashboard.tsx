import React from "react";

// Types for our analytics data
type DailyVisits = {
  date: string;
  visits: number;
};

type CaseStudyAnalytics = {
  id: string;
  title: string;
  views: number;
  avgTimeOnPage: number; // in seconds
  clickThroughRate: number; // percentage
  bounceRate: number; // percentage
};

type PortfolioAnalytics = {
  totalVisits: number;
  uniqueVisitors: number;
  averageEngagementTime: number; // in seconds
  bounceRate: number; // percentage
  trafficSources: Record<string, number>; // source -> percentage
  dailyVisits: DailyVisits[];
  caseStudies: CaseStudyAnalytics[];
};

// Dummy analytics data
const dummyAnalyticsData: PortfolioAnalytics = {
  totalVisits: 1247,
  uniqueVisitors: 892,
  averageEngagementTime: 127, // 2min 7sec
  bounceRate: 32.5,
  trafficSources: {
    Direct: 35,
    "Social Media": 28,
    "Search Engines": 22,
    Referrals: 15,
  },
  dailyVisits: [
    { date: "May 1", visits: 42 },
    { date: "May 2", visits: 38 },
    { date: "May 3", visits: 45 },
    { date: "May 4", visits: 39 },
    { date: "May 5", visits: 47 },
    { date: "May 6", visits: 53 },
    { date: "May 7", visits: 58 },
  ],
  caseStudies: [
    {
      id: "cs1",
      title: "E-commerce Checkout Redesign",
      views: 423,
      avgTimeOnPage: 195, // 3min 15sec
      clickThroughRate: 24.3,
      bounceRate: 28.7,
    },
    {
      id: "cs2",
      title: "Health App User Research",
      views: 312,
      avgTimeOnPage: 142, // 2min 22sec
      clickThroughRate: 18.9,
      bounceRate: 35.2,
    },
    {
      id: "cs3",
      title: "Design System Implementation",
      views: 287,
      avgTimeOnPage: 163, // 2min 43sec
      clickThroughRate: 21.5,
      bounceRate: 30.8,
    },
    {
      id: "cs4",
      title: "E-commerce Platform Migration",
      views: 225,
      avgTimeOnPage: 177, // 2min 57sec
      clickThroughRate: 19.2,
      bounceRate: 33.4,
    },
  ],
};

// Helper function to format seconds as mm:ss
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}m ${secs}s`;
};

export default function AnalyticsDashboard() {
  const data = dummyAnalyticsData;

  return (
    <div className="analytics-dashboard">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-neutral-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
            Total Visits
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {data.totalVisits.toLocaleString()}
          </p>
          <p className="text-sm text-green-600 dark:text-green-400 mt-1">
            +12.5% from last month
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-neutral-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
            Unique Visitors
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {data.uniqueVisitors.toLocaleString()}
          </p>
          <p className="text-sm text-green-600 dark:text-green-400 mt-1">
            +8.2% from last month
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-neutral-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
            Avg. Engagement Time
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatTime(data.averageEngagementTime)}
          </p>
          <p className="text-sm text-green-600 dark:text-green-400 mt-1">
            +15.3% from last month
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-neutral-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
            Bounce Rate
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {data.bounceRate}%
          </p>
          <p className="text-sm text-red-600 dark:text-red-400 mt-1">
            +2.1% from last month
          </p>
        </div>
      </div>

      {/* Traffic Sources & Daily Visits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Traffic Sources */}
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-neutral-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Traffic Sources
          </h3>
          <div className="space-y-4">
            {Object.entries(data.trafficSources).map(([source, percentage]) => (
              <div key={source}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {source}
                  </span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-neutral-700 rounded-full h-2.5">
                  <div
                    className="bg-indigo-600 h-2.5 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Visits Chart */}
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-neutral-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Daily Visits
          </h3>
          <div className="h-64 flex items-end justify-between">
            {data.dailyVisits.map((day) => {
              const height = (day.visits / 60) * 100; // Scale for visualization
              return (
                <div
                  key={day.date}
                  className="flex flex-col items-center flex-1"
                >
                  <div
                    className="w-full bg-indigo-500 dark:bg-indigo-600 rounded-t"
                    style={{ height: `${height}%` }}
                  ></div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                    {day.date}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Case Study Analytics */}
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-neutral-700 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Case Study Performance
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-neutral-900">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Case Study
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Views
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Avg. Time on Page
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Click-Through Rate
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Bounce Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-neutral-800 divide-y divide-gray-200 dark:divide-gray-700">
              {data.caseStudies.map((study) => (
                <tr key={study.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {study.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {study.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {formatTime(study.avgTimeOnPage)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {study.clickThroughRate}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {study.bounceRate}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
