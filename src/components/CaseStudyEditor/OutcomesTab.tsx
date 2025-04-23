import React, { useState } from "react";
import { Control, FieldErrors } from "react-hook-form";
import { Button, Input, Textarea } from "@heroui/react";
import { TestimonialItem } from "../../types/CaseStudy";
import { CaseStudyFormValues } from "../../pages/dashboard/CaseStudyEditor";

interface OutcomesTabProps {
  control: Control<CaseStudyFormValues>;
  errors: FieldErrors<CaseStudyFormValues>;
  metricsFields: string[];
  addMetric: (metric: string) => void;
  removeMetric: (metric: string) => void;
  testimonialsFields: TestimonialItem[];
  addTestimonial: (testimonial: Omit<TestimonialItem, "id">) => void;
  updateTestimonial: (
    id: string,
    field: keyof TestimonialItem,
    value: string
  ) => void;
  removeTestimonial: (id: string) => void;
}

const OutcomesTab: React.FC<OutcomesTabProps> = ({
  metricsFields,
  addMetric,
  removeMetric,
  testimonialsFields,
  addTestimonial,
  updateTestimonial,
  removeTestimonial,
}) => {
  const [metricInput, setMetricInput] = useState("");
  const [newTestimonial, setNewTestimonial] = useState<
    Omit<TestimonialItem, "id">
  >({
    quote: "",
    author: "",
    position: "",
    company: "",
  });

  const handleAddMetric = () => {
    if (metricInput.trim()) {
      addMetric(metricInput);
      setMetricInput("");
    }
  };

  const handleAddTestimonial = () => {
    if (!newTestimonial.quote.trim() || !newTestimonial.author.trim()) return;

    addTestimonial(newTestimonial);

    setNewTestimonial({
      quote: "",
      author: "",
      position: "",
      company: "",
    });
  };

  return (
    <div className="mt-6 space-y-8">
      {/* Metrics section */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Metrics & Results
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Add quantifiable results or key performance indicators that
          demonstrate the success of your project.
        </p>

        <div className="mt-4">
          <div className="flex">
            <Input
              value={metricInput}
              onChange={(e) => setMetricInput(e.target.value)}
              placeholder="Add a metric or result"
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), handleAddMetric())
              }
              className="rounded-r-none"
            />
            <Button
              color="primary"
              variant="solid"
              onPress={handleAddMetric}
              className="rounded-l-none"
            >
              Add
            </Button>
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Examples: "Increased conversion rate by 25%", "Reduced loading time
            by 40%", "Grew user base by 10,000 within 3 months"
          </p>
        </div>

        {metricsFields.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {metricsFields.map((metric) => (
              <li
                key={metric}
                className="flex items-center justify-between p-3 bg-green-50 rounded-md dark:bg-green-900"
              >
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-green-800 dark:text-green-100">
                    {metric}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeMetric(metric)}
                  className="text-green-600 hover:text-green-800 dark:text-green-300 dark:hover:text-green-100"
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
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-4 text-center py-8 border-2 border-dashed border-gray-300 rounded-md dark:border-gray-700">
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
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              No metrics added yet. Showcase the impact of your project with
              measurable results.
            </p>
          </div>
        )}
      </div>

      {/* Testimonials section */}
      <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Testimonials
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Add feedback or testimonials from clients, users, or stakeholders.
        </p>

        {/* Add new testimonial form */}
        <div className="mt-4 bg-gray-50 p-4 rounded-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-md font-medium text-gray-900 mb-3 dark:text-white">
            Add New Testimonial
          </h3>

          <div className="mb-4">
            <Textarea
              label="Quote"
              value={newTestimonial.quote}
              onChange={(e) =>
                setNewTestimonial((prev) => ({
                  ...prev,
                  quote: e.target.value,
                }))
              }
              rows={3}
              isRequired
              placeholder="The testimonial quote..."
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Author Name"
              value={newTestimonial.author}
              onChange={(e) =>
                setNewTestimonial((prev) => ({
                  ...prev,
                  author: e.target.value,
                }))
              }
              isRequired
              placeholder="Name of the person"
            />
            <Input
              label="Position/Title"
              value={newTestimonial.position || ""}
              onChange={(e) =>
                setNewTestimonial((prev) => ({
                  ...prev,
                  position: e.target.value,
                }))
              }
              placeholder="e.g., Product Manager, CEO"
            />
          </div>

          <div className="mt-4">
            <Input
              label="Company/Organization"
              value={newTestimonial.company || ""}
              onChange={(e) =>
                setNewTestimonial((prev) => ({
                  ...prev,
                  company: e.target.value,
                }))
              }
              placeholder="e.g., Acme Inc."
            />
          </div>

          <div className="flex justify-end mt-4">
            <Button
              color="primary"
              variant="solid"
              onPress={handleAddTestimonial}
              isDisabled={
                !newTestimonial.quote.trim() || !newTestimonial.author.trim()
              }
            >
              Add Testimonial
            </Button>
          </div>
        </div>

        {/* Testimonials list */}
        <div className="mt-6 space-y-4">
          {testimonialsFields.length > 0 ? (
            testimonialsFields.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-4 rounded-md shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="flex justify-end mb-2">
                  <button
                    type="button"
                    onClick={() => removeTestimonial(testimonial.id)}
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
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <textarea
                  value={testimonial.quote}
                  onChange={(e) =>
                    updateTestimonial(testimonial.id, "quote", e.target.value)
                  }
                  rows={3}
                  className="w-full italic text-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <div className="mt-3 flex items-center">
                  <div className="text-sm">
                    <input
                      type="text"
                      value={testimonial.author}
                      onChange={(e) =>
                        updateTestimonial(
                          testimonial.id,
                          "author",
                          e.target.value
                        )
                      }
                      className="font-medium text-gray-900 border-0 focus:ring-0 p-0 focus:border-b focus:border-indigo-500 dark:bg-transparent dark:text-white"
                      placeholder="Author name"
                    />
                    <div className="flex space-x-1 text-gray-500 dark:text-gray-400">
                      <input
                        type="text"
                        value={testimonial.position || ""}
                        onChange={(e) =>
                          updateTestimonial(
                            testimonial.id,
                            "position",
                            e.target.value
                          )
                        }
                        className="border-0 focus:ring-0 p-0 focus:border-b focus:border-indigo-500 dark:bg-transparent"
                        placeholder="Position/Title"
                      />
                      {testimonial.position && testimonial.company && (
                        <span>•</span>
                      )}
                      <input
                        type="text"
                        value={testimonial.company || ""}
                        onChange={(e) =>
                          updateTestimonial(
                            testimonial.id,
                            "company",
                            e.target.value
                          )
                        }
                        className="border-0 focus:ring-0 p-0 focus:border-b focus:border-indigo-500 dark:bg-transparent"
                        placeholder="Company"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-md dark:border-gray-700">
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
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                No testimonials added yet. Add feedback from clients or users to
                build credibility.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OutcomesTab;
