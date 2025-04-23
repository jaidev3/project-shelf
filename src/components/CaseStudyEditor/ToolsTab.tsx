import React, { useState } from "react";
import { Button, Input } from "@heroui/react";

interface ToolsTabProps {
  toolsFields: string[];
  addTool: (tool: string) => void;
  removeTool: (tool: string) => void;
}

const ToolsTab: React.FC<ToolsTabProps> = ({
  toolsFields,
  addTool,
  removeTool,
}) => {
  const [toolInput, setToolInput] = useState("");

  const handleAddTool = () => {
    if (toolInput.trim()) {
      addTool(toolInput);
      setToolInput("");
    }
  };

  return (
    <div className="mt-6 space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Tools & Technologies
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          List the tools, technologies, frameworks, or methodologies used in
          this project.
        </p>
      </div>

      {/* Add tools form */}
      <div>
        <div className="mb-3">
          <div className="flex">
            <Input
              value={toolInput}
              onChange={(e) => setToolInput(e.target.value)}
              placeholder="Add a tool or technology"
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), handleAddTool())
              }
              className="rounded-r-none"
            />
            <Button
              color="primary"
              variant="solid"
              onPress={handleAddTool}
              className="rounded-l-none"
            >
              Add
            </Button>
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Examples: React, Figma, Adobe XD, Agile methodology, TypeScript,
            etc.
          </p>
        </div>
      </div>

      {/* Tools display */}
      {toolsFields.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {toolsFields.map((tool) => (
            <div
              key={tool}
              className="flex items-center justify-between px-4 py-3 bg-indigo-50 rounded-md dark:bg-indigo-900"
            >
              <span className="text-indigo-800 font-medium dark:text-indigo-200">
                {tool}
              </span>
              <button
                type="button"
                onClick={() => removeTool(tool)}
                className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-md dark:border-gray-700">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            No tools added yet. Add the technologies, frameworks, or
            methodologies used in your project.
          </p>
        </div>
      )}

      {/* Tool categories suggestion */}
      <div className="bg-gray-50 p-4 rounded-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Common Tool Categories
        </h3>
        <div className="space-y-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            <span className="font-medium">Design:</span> Figma, Sketch, Adobe
            XD, Photoshop, Illustrator
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            <span className="font-medium">Frontend:</span> React, Vue, Angular,
            JavaScript, TypeScript, HTML, CSS, Tailwind CSS
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            <span className="font-medium">Backend:</span> Node.js, Express,
            Python, Django, Ruby on Rails, PHP, Java
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            <span className="font-medium">Database:</span> MongoDB, PostgreSQL,
            MySQL, Firebase, Supabase
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            <span className="font-medium">DevOps:</span> Docker, Kubernetes,
            AWS, Azure, GCP, CI/CD
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            <span className="font-medium">Methodologies:</span> Agile, Scrum,
            Kanban, Waterfall, Design Thinking
          </p>
        </div>
      </div>
    </div>
  );
};

export default ToolsTab;
