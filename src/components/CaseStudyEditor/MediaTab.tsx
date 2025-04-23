import React from "react";
import { Button } from "@heroui/react";
import { MediaItem } from "../../types/CaseStudy";

interface MediaTabProps {
  galleryFields: MediaItem[];
  handleMediaUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  addVideoItem: () => void;
  updateMediaCaption: (id: string, caption: string) => void;
  removeMediaItem: (id: string) => void;
  reorderMedia: (startIndex: number, endIndex: number) => void;
}

const MediaTab: React.FC<MediaTabProps> = ({
  galleryFields,
  handleMediaUpload,
  addVideoItem,
  updateMediaCaption,
  removeMediaItem,
  reorderMedia,
}) => {
  return (
    <div className="mt-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Media Gallery
        </h2>
        <div className="flex space-x-2">
          <label className="cursor-pointer px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
            <span>Upload Image</span>
            <input
              type="file"
              className="sr-only"
              accept="image/*"
              onChange={handleMediaUpload}
            />
          </label>
          <Button variant="bordered" onPress={addVideoItem}>
            Add Video Link
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {galleryFields.length > 0 ? (
          galleryFields
            .sort((a, b) => a.order - b.order)
            .map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-md overflow-hidden dark:border-gray-700"
              >
                <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                  {item.type === "image" ? (
                    <img
                      src={item.url}
                      alt={item.caption || "Gallery item"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="bg-indigo-100 text-indigo-800 p-3 rounded-full dark:bg-indigo-900 dark:text-indigo-200">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => removeMediaItem(item.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
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
                <div className="p-3">
                  <input
                    type="text"
                    value={item.caption || ""}
                    onChange={(e) =>
                      updateMediaCaption(item.id, e.target.value)
                    }
                    placeholder="Add a caption..."
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <div className="flex justify-between mt-2">
                    <button
                      type="button"
                      onClick={() =>
                        reorderMedia(item.order, Math.max(0, item.order - 1))
                      }
                      disabled={item.order === 0}
                      className={`text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 ${
                        item.order === 0 ? "opacity-50 cursor-not-allowed" : ""
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
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        reorderMedia(
                          item.order,
                          Math.min(galleryFields.length - 1, item.order + 1)
                        )
                      }
                      disabled={item.order === galleryFields.length - 1}
                      className={`text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 ${
                        item.order === galleryFields.length - 1
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
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <div className="col-span-3 text-center py-12 border-2 border-dashed border-gray-300 rounded-md dark:border-gray-700">
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
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              No media items yet. Add images or videos to showcase your project.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaTab;
