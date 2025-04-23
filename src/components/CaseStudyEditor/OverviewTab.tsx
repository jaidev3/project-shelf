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
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200"
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
              </span>
            ))}
          </div>
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
        </div>
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
