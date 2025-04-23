import React from "react";
import AnalyticsDashboard from "../../components/AnalyticsDashboard";

export default function Dashboard() {
  return (
    <div className="dashboard-page p-6">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">
        Portfolio Analytics Dashboard
      </h1>
      <AnalyticsDashboard />
    </div>
  );
}
