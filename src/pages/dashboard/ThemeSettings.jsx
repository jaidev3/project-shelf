import React from "react";
import { useTheme } from "../../hooks/useTheme";
import { ThemeToggle } from "../../components/ThemeToggle";

export default function ThemeSettings() {
  const { currentTheme } = useTheme();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Theme Settings</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-medium">Current Theme</h2>
            <p className="text-gray-600">{currentTheme.name} Mode</p>
          </div>
          <ThemeToggle />
        </div>

        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Colors</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(currentTheme.colors).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <div
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: value }}
                  />
                  <span className="text-sm">
                    {key}: {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
