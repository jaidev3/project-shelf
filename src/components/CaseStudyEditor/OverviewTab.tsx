import React, { useState } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Input, Textarea, Button } from "@heroui/react";
import { CaseStudyFormValues } from "../../pages/dashboard/CaseStudyEditor";

interface OverviewTabProps {
  control: Control<CaseStudyFormValues>;
  errors: FieldErrors<CaseStudyFormValues>;
  tags: string[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  coverImage: string;
  removeCoverImage: () => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  control,
  errors,
  tags,
  addTag,
  removeTag,
  handleImageUpload,
  coverImage,
  removeCoverImage,
}) => {
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = () => {
    if (tagInput.trim()) {
      addTag(tagInput);
      setTagInput("");
    }
  };

  return (
    <div className="mt-6 space-y-6">
      {/* Title & Description */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Title"
              isRequired
              errorMessage={errors.title?.message}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Short Description"
              isRequired
              errorMessage={errors.description?.message}
            />
          )}
        />
      </div>

      {/* Cover Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Cover Image
        </label>
        <div className="mt-1 flex items-center">
          {coverImage ? (
            <div className="relative">
              <img
                src={coverImage}
                alt="Cover"
                className="w-32 h-32 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={removeCoverImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
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
          ) : (
            <div className="flex justify-center items-center border-2 border-dashed border-gray-300 rounded-md w-32 h-32">
              <label htmlFor="file-upload" className="cursor-pointer">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Tags
        </label>
        <div className="mt-1">
          <div className="flex">
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add a tag"
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), handleAddTag())
              }
              className="rounded-r-none"
            />
            <Button
              color="primary"
              variant="solid"
              onPress={handleAddTag}
              className="rounded-l-none"
            >
              Add
            </Button>
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Examples: Web Development, Mobile App, UI/UX, Branding, Marketing,
            etc.
          </p>
        </div>

        {/* Tags display */}
        {tags.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {tags.map((tag) => (
              <div
                key={tag}
                className="flex items-center justify-between px-4 py-3 bg-indigo-50 rounded-md dark:bg-indigo-900"
              >
                <span className="text-indigo-800 font-medium dark:text-indigo-200">
                  {tag}
                </span>
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
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
          <div className="text-center py-6 border-2 border-dashed border-gray-300 rounded-md mt-4 dark:border-gray-700">
            <svg
              className="mx-auto h-8 w-8 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              No tags added yet. Add tags to categorize your case study.
            </p>
          </div>
        )}
      </div>

      {/* Overview */}
      <div>
        <Controller
          name="overview"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              label="Project Overview"
              isRequired
              placeholder="Describe your project, goals, and context..."
              rows={5}
              errorMessage={errors.overview?.message}
            />
          )}
        />
      </div>
    </div>
  );
};

export default OverviewTab;
