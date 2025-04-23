import React, { useState } from "react";
import { Control, FieldErrors } from "react-hook-form";
import { Button, Input, Textarea } from "@heroui/react";
import { TimelineItem } from "../../types/CaseStudy";
import { CaseStudyFormValues } from "../../pages/dashboard/CaseStudyEditor";

interface TimelineTabProps {
  control: Control<CaseStudyFormValues>;
  errors: FieldErrors<CaseStudyFormValues>;
  timelineFields: TimelineItem[];
  appendTimeline: (item: Omit<TimelineItem, "id" | "order">) => void;
  updateTimelineItem: (
    id: string,
    field: keyof TimelineItem,
    value: string
  ) => void;
  removeTimelineItem: (id: string) => void;
  reorderTimelineItem: (startIndex: number, endIndex: number) => void;
}

const TimelineTab: React.FC<TimelineTabProps> = ({
  timelineFields,
  appendTimeline,
  updateTimelineItem,
  removeTimelineItem,
  reorderTimelineItem,
}) => {
  // New timeline item form state
  const [newTimelineItem, setNewTimelineItem] = useState<
    Omit<TimelineItem, "id" | "order">
  >({
    title: "",
    description: "",
    date: "",
  });

  const handleAddTimelineItem = () => {
    if (!newTimelineItem.title.trim() || !newTimelineItem.description.trim())
      return;

    appendTimeline(newTimelineItem);

    setNewTimelineItem({
      title: "",
      description: "",
      date: "",
    });
  };

  return (
    <div className="mt-6 space-y-6">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white">
        Development Timeline
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Add key milestones in your development process in chronological order.
      </p>

      {/* Add new timeline item form */}
      <div className="bg-gray-50 p-4 rounded-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <h3 className="text-md font-medium text-gray-900 mb-3 dark:text-white">
          Add New Timeline Item
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
          <Input
            label="Title"
            value={newTimelineItem.title}
            onChange={(e) =>
              setNewTimelineItem((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            isRequired
            placeholder="e.g., Research Phase, Wireframing, Testing"
          />
          <Input
            label="Date (Optional)"
            value={newTimelineItem.date || ""}
            onChange={(e) =>
              setNewTimelineItem((prev) => ({
                ...prev,
                date: e.target.value,
              }))
            }
            placeholder="e.g., Jan 2023, Week 1, etc."
          />
        </div>
        <div className="mb-4">
          <Textarea
            label="Description"
            value={newTimelineItem.description}
            onChange={(e) =>
              setNewTimelineItem((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            rows={3}
            isRequired
            placeholder="Describe what happened during this phase of the project..."
          />
        </div>
        <div className="flex justify-end">
          <Button
            color="primary"
            variant="solid"
            onPress={handleAddTimelineItem}
            isDisabled={
              !newTimelineItem.title.trim() ||
              !newTimelineItem.description.trim()
            }
          >
            Add to Timeline
          </Button>
        </div>
      </div>

      {/* Timeline items list */}
      {timelineFields.length > 0 ? (
        <div className="relative border-l-2 border-indigo-200 dark:border-indigo-800 pl-8 pb-6 space-y-6">
          {timelineFields
            .sort((a, b) => a.order - b.order)
            .map((item, index) => (
              <div key={item.id} className="relative">
                {/* Timeline dot */}
                <div className="absolute -left-10 mt-1.5 w-4 h-4 rounded-full bg-indigo-500"></div>

                <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) =>
                          updateTimelineItem(item.id, "title", e.target.value)
                        }
                        className="font-medium text-lg border-0 focus:ring-0 p-0 focus:border-b focus:border-indigo-500 dark:bg-gray-800 dark:text-white"
                      />
                      {item.date && (
                        <input
                          type="text"
                          value={item.date}
                          onChange={(e) =>
                            updateTimelineItem(item.id, "date", e.target.value)
                          }
                          className="text-sm text-gray-500 mt-1 block border-0 focus:ring-0 p-0 focus:border-b focus:border-indigo-500 dark:bg-gray-800 dark:text-gray-400"
                        />
                      )}
                    </div>
                    <div className="flex space-x-1">
                      <button
                        type="button"
                        onClick={() =>
                          reorderTimelineItem(
                            item.order,
                            Math.max(0, item.order - 1)
                          )
                        }
                        disabled={index === 0}
                        className={`text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 ${
                          index === 0 ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          reorderTimelineItem(
                            item.order,
                            Math.min(timelineFields.length - 1, item.order + 1)
                          )
                        }
                        disabled={index === timelineFields.length - 1}
                        className={`text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 ${
                          index === timelineFields.length - 1
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => removeTimelineItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <textarea
                    value={item.description}
                    onChange={(e) =>
                      updateTimelineItem(item.id, "description", e.target.value)
                    }
                    rows={3}
                    className="w-full mt-2 text-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-md dark:border-gray-700">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            No timeline items yet. Add key milestones to showcase your
            development process.
          </p>
        </div>
      )}
    </div>
  );
};

export default TimelineTab;
