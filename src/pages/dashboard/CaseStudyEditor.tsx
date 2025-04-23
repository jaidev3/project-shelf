import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { v4 as uuidv4 } from "uuid";
import {
  getCaseStudy,
  createCaseStudy,
  updateCaseStudy,
  uploadCaseStudyImage,
} from "../../apis/caseStudyService";
import {
  CaseStudy,
  MediaItem,
  TimelineItem,
  TestimonialItem,
} from "../../types/CaseStudy";

// Tabs for the editor
const TABS = {
  OVERVIEW: "overview",
  MEDIA: "media",
  TIMELINE: "timeline",
  TOOLS: "tools",
  OUTCOMES: "outcomes",
} as const;

type TabType = (typeof TABS)[keyof typeof TABS];

export default function CaseStudyEditor() {
  const { currentUser } = useAuth();
  const { caseStudyId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>(TABS.OVERVIEW);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Case Study state
  const [caseStudy, setCaseStudy] = useState<CaseStudy>({
    userId: currentUser?.uid || "",
    title: "",
    description: "",
    image: "",
    tags: [],
    overview: "",
    isPublished: false,
    gallery: [],
    timeline: [],
    tools: [],
    outcomes: {
      metrics: [],
      testimonials: [],
    },
  });

  // Form state
  const [tagInput, setTagInput] = useState("");
  const [toolInput, setToolInput] = useState("");
  const [metricInput, setMetricInput] = useState("");

  // Timeline management
  const [newTimelineItem, setNewTimelineItem] = useState<
    Omit<TimelineItem, "id" | "order">
  >({
    title: "",
    description: "",
    date: "",
  });

  // Outcomes management - Metrics
  const addMetric = () => {
    if (
      metricInput.trim() &&
      !caseStudy.outcomes.metrics.includes(metricInput.trim())
    ) {
      setCaseStudy((prev) => ({
        ...prev,
        outcomes: {
          ...prev.outcomes,
          metrics: [...prev.outcomes.metrics, metricInput.trim()],
        },
      }));
      setMetricInput("");
    }
  };

  const removeMetric = (metric: string) => {
    setCaseStudy((prev) => ({
      ...prev,
      outcomes: {
        ...prev.outcomes,
        metrics: prev.outcomes.metrics.filter((m) => m !== metric),
      },
    }));
  };

  // Outcomes management - Testimonials
  const [newTestimonial, setNewTestimonial] = useState<
    Omit<TestimonialItem, "id">
  >({
    quote: "",
    author: "",
    position: "",
    company: "",
  });

  const addTestimonial = () => {
    if (!newTestimonial.quote.trim() || !newTestimonial.author.trim()) return;

    const testimonialItem: TestimonialItem = {
      id: uuidv4(),
      ...newTestimonial,
    };

    setCaseStudy((prev) => ({
      ...prev,
      outcomes: {
        ...prev.outcomes,
        testimonials: [...prev.outcomes.testimonials, testimonialItem],
      },
    }));

    setNewTestimonial({
      quote: "",
      author: "",
      position: "",
      company: "",
    });
  };

  const updateTestimonial = (
    id: string,
    field: keyof TestimonialItem,
    value: string
  ) => {
    setCaseStudy((prev) => ({
      ...prev,
      outcomes: {
        ...prev.outcomes,
        testimonials: prev.outcomes.testimonials.map((item) =>
          item.id === id ? { ...item, [field]: value } : item
        ),
      },
    }));
  };

  const removeTestimonial = (id: string) => {
    setCaseStudy((prev) => ({
      ...prev,
      outcomes: {
        ...prev.outcomes,
        testimonials: prev.outcomes.testimonials.filter(
          (item) => item.id !== id
        ),
      },
    }));
  };

  // Load case study if editing an existing one
  useEffect(() => {
    const loadCaseStudy = async () => {
      if (caseStudyId && caseStudyId !== "new") {
        setIsLoading(true);
        try {
          const data = await getCaseStudy(caseStudyId);
          setCaseStudy(data as CaseStudy);
        } catch (error) {
          setErrorMessage("Failed to load case study.");
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadCaseStudy();
  }, [caseStudyId]);

  // Save the case study
  const handleSave = async (publish = false) => {
    setIsSaving(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const updatedCaseStudy = {
        ...caseStudy,
        isPublished: publish || caseStudy.isPublished,
      };

      if (caseStudyId && caseStudyId !== "new") {
        await updateCaseStudy(caseStudyId, updatedCaseStudy);
        setSuccessMessage("Case study updated successfully!");
      } else {
        const newCaseStudy = await createCaseStudy(updatedCaseStudy);
        navigate(`/dashboard/case-study/${newCaseStudy.id}`);
        setSuccessMessage("Case study created successfully!");
      }
    } catch (error) {
      setErrorMessage("Failed to save case study.");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  // Field update handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCaseStudy((prev) => ({ ...prev, [name]: value }));
  };

  // Tag management
  const addTag = () => {
    if (tagInput.trim() && !caseStudy.tags.includes(tagInput.trim())) {
      setCaseStudy((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setCaseStudy((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  // Image upload handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;

    const file = e.target.files[0];

    try {
      setIsLoading(true);
      const imageUrl = await uploadCaseStudyImage(
        currentUser?.uid || "",
        caseStudyId || "new",
        file
      );

      setCaseStudy((prev) => ({ ...prev, image: imageUrl }));
    } catch (error) {
      setErrorMessage("Failed to upload image.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Media gallery management
  const addMediaItem = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;

    const file = e.target.files[0];

    try {
      setIsLoading(true);
      const imageUrl = await uploadCaseStudyImage(
        currentUser?.uid || "",
        caseStudyId || "new",
        file
      );

      const newMediaItem: MediaItem = {
        id: uuidv4(),
        type: "image",
        url: imageUrl,
        caption: "",
        order: caseStudy.gallery.length,
      };

      setCaseStudy((prev) => ({
        ...prev,
        gallery: [...prev.gallery, newMediaItem],
      }));
    } catch (error) {
      setErrorMessage("Failed to upload media.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addVideoItem = () => {
    const videoUrl = prompt("Enter the video URL (YouTube, Vimeo, etc.):");
    if (!videoUrl) return;

    const newMediaItem: MediaItem = {
      id: uuidv4(),
      type: "video",
      url: videoUrl,
      caption: "",
      order: caseStudy.gallery.length,
    };

    setCaseStudy((prev) => ({
      ...prev,
      gallery: [...prev.gallery, newMediaItem],
    }));
  };

  const updateMediaCaption = (id: string, caption: string) => {
    setCaseStudy((prev) => ({
      ...prev,
      gallery: prev.gallery.map((item) =>
        item.id === id ? { ...item, caption } : item
      ),
    }));
  };

  const removeMediaItem = (id: string) => {
    setCaseStudy((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((item) => item.id !== id),
    }));
  };

  const reorderMedia = (startIndex: number, endIndex: number) => {
    const result = Array.from(caseStudy.gallery);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    const reordered = result.map((item, index) => ({
      ...item,
      order: index,
    }));

    setCaseStudy((prev) => ({
      ...prev,
      gallery: reordered,
    }));
  };

  // Timeline management
  const addTimelineItem = () => {
    if (!newTimelineItem.title.trim()) return;

    const newItem: TimelineItem = {
      id: uuidv4(),
      ...newTimelineItem,
      order: caseStudy.timeline.length,
    };

    setCaseStudy((prev) => ({
      ...prev,
      timeline: [...prev.timeline, newItem],
    }));

    setNewTimelineItem({
      title: "",
      description: "",
      date: "",
    });
  };

  const updateTimelineItem = (
    id: string,
    field: keyof TimelineItem,
    value: string
  ) => {
    setCaseStudy((prev) => ({
      ...prev,
      timeline: prev.timeline.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const removeTimelineItem = (id: string) => {
    setCaseStudy((prev) => ({
      ...prev,
      timeline: prev.timeline
        .filter((item) => item.id !== id)
        .map((item, index) => ({ ...item, order: index })),
    }));
  };

  const reorderTimelineItem = (startIndex: number, endIndex: number) => {
    const result = Array.from(caseStudy.timeline);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    const reordered = result.map((item, index) => ({
      ...item,
      order: index,
    }));

    setCaseStudy((prev) => ({
      ...prev,
      timeline: reordered,
    }));
  };

  // Tools management
  const addTool = () => {
    if (toolInput.trim() && !caseStudy.tools.includes(toolInput.trim())) {
      setCaseStudy((prev) => ({
        ...prev,
        tools: [...prev.tools, toolInput.trim()],
      }));
      setToolInput("");
    }
  };

  const removeTool = (tool: string) => {
    setCaseStudy((prev) => ({
      ...prev,
      tools: prev.tools.filter((t) => t !== tool),
    }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }

  // Render the Overview tab
  const renderOverviewTab = () => (
    <div className="mt-6 space-y-6">
      {/* Title & Description */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={caseStudy.title}
            onChange={handleChange}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Short Description <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="description"
            id="description"
            required
            value={caseStudy.description}
            onChange={handleChange}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>

      {/* Cover Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Cover Image
        </label>
        <div className="mt-1 flex items-center">
          {caseStudy.image ? (
            <div className="relative">
              <img
                src={caseStudy.image}
                alt="Cover"
                className="w-32 h-32 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => setCaseStudy((prev) => ({ ...prev, image: "" }))}
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
            {caseStudy.tags.map((tag) => (
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
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-l-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Add a tag"
              onKeyPress={(e) => e.key === "Enter" && addTag()}
            />
            <button
              type="button"
              onClick={addTag}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-r-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-800 dark:text-indigo-100 dark:hover:bg-indigo-700"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Overview */}
      <div>
        <label
          htmlFor="overview"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Project Overview <span className="text-red-500">*</span>
        </label>
        <div className="mt-1">
          <textarea
            id="overview"
            name="overview"
            rows={5}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Describe your project, goals, and context..."
            value={caseStudy.overview}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );

  // Render the Media Gallery tab
  const renderMediaTab = () => (
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
              onChange={addMediaItem}
            />
          </label>
          <button
            type="button"
            onClick={addVideoItem}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            Add Video Link
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {caseStudy.gallery.length > 0 ? (
          caseStudy.gallery
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
                          Math.min(caseStudy.gallery.length - 1, item.order + 1)
                        )
                      }
                      disabled={item.order === caseStudy.gallery.length - 1}
                      className={`text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 ${
                        item.order === caseStudy.gallery.length - 1
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

  // Render the Timeline tab
  const renderTimelineTab = () => (
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
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newTimelineItem.title}
              onChange={(e) =>
                setNewTimelineItem((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="e.g., Research Phase, Wireframing, Testing"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Date (Optional)
            </label>
            <input
              type="text"
              value={newTimelineItem.date || ""}
              onChange={(e) =>
                setNewTimelineItem((prev) => ({
                  ...prev,
                  date: e.target.value,
                }))
              }
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="e.g., Jan 2023, Week 1, etc."
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={newTimelineItem.description}
            onChange={(e) =>
              setNewTimelineItem((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            rows={3}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Describe what happened during this phase of the project..."
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={addTimelineItem}
            disabled={
              !newTimelineItem.title.trim() ||
              !newTimelineItem.description.trim()
            }
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add to Timeline
          </button>
        </div>
      </div>

      {/* Timeline items list */}
      {caseStudy.timeline.length > 0 ? (
        <div className="relative border-l-2 border-indigo-200 dark:border-indigo-800 pl-8 pb-6 space-y-6">
          {caseStudy.timeline
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
                            Math.min(
                              caseStudy.timeline.length - 1,
                              item.order + 1
                            )
                          )
                        }
                        disabled={index === caseStudy.timeline.length - 1}
                        className={`text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 ${
                          index === caseStudy.timeline.length - 1
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

  // Render the Tools tab
  const renderToolsTab = () => (
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
            <input
              type="text"
              value={toolInput}
              onChange={(e) => setToolInput(e.target.value)}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-l-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Add a tool or technology"
              onKeyPress={(e) => e.key === "Enter" && addTool()}
            />
            <button
              type="button"
              onClick={addTool}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add
            </button>
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Examples: React, Figma, Adobe XD, Agile methodology, TypeScript,
            etc.
          </p>
        </div>
      </div>

      {/* Tools display */}
      {caseStudy.tools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {caseStudy.tools.map((tool) => (
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

  // Render the Outcomes tab
  const renderOutcomesTab = () => (
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
            <input
              type="text"
              value={metricInput}
              onChange={(e) => setMetricInput(e.target.value)}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-l-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Add a metric or result"
              onKeyPress={(e) => e.key === "Enter" && addMetric()}
            />
            <button
              type="button"
              onClick={addMetric}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add
            </button>
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Examples: "Increased conversion rate by 25%", "Reduced loading time
            by 40%", "Grew user base by 10,000 within 3 months"
          </p>
        </div>

        {caseStudy.outcomes.metrics.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {caseStudy.outcomes.metrics.map((metric) => (
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Quote <span className="text-red-500">*</span>
            </label>
            <textarea
              value={newTestimonial.quote}
              onChange={(e) =>
                setNewTestimonial((prev) => ({
                  ...prev,
                  quote: e.target.value,
                }))
              }
              rows={3}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="The testimonial quote..."
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Author Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newTestimonial.author}
                onChange={(e) =>
                  setNewTestimonial((prev) => ({
                    ...prev,
                    author: e.target.value,
                  }))
                }
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Name of the person"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Position/Title
              </label>
              <input
                type="text"
                value={newTestimonial.position || ""}
                onChange={(e) =>
                  setNewTestimonial((prev) => ({
                    ...prev,
                    position: e.target.value,
                  }))
                }
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="e.g., Product Manager, CEO"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Company/Organization
            </label>
            <input
              type="text"
              value={newTestimonial.company || ""}
              onChange={(e) =>
                setNewTestimonial((prev) => ({
                  ...prev,
                  company: e.target.value,
                }))
              }
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="e.g., Acme Inc."
            />
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={addTestimonial}
              disabled={
                !newTestimonial.quote.trim() || !newTestimonial.author.trim()
              }
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Testimonial
            </button>
          </div>
        </div>

        {/* Testimonials list */}
        <div className="mt-6 space-y-4">
          {caseStudy.outcomes.testimonials.length > 0 ? (
            caseStudy.outcomes.testimonials.map((testimonial) => (
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

  return (
    <div className="case-study-editor-page pb-12">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold dark:text-white">
          {caseStudyId === "new" ? "Create New Case Study" : "Edit Case Study"}
        </h1>
        <div className="flex gap-3">
          <button
            type="button"
            className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => handleSave()}
            disabled={isSaving}
          >
            Save Draft
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => handleSave(true)}
            disabled={isSaving}
          >
            {caseStudy.isPublished ? "Update & Publish" : "Publish"}
          </button>
        </div>
      </div>

      {/* Success and error messages */}
      {successMessage && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-400"
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
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">{successMessage}</p>
            </div>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Tabs navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {Object.values(TABS).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === tab
                    ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                }
              `}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab content */}
      <div className="tab-content">
        {activeTab === TABS.OVERVIEW && renderOverviewTab()}
        {activeTab === TABS.MEDIA && renderMediaTab()}
        {activeTab === TABS.TIMELINE && renderTimelineTab()}
        {activeTab === TABS.TOOLS && renderToolsTab()}
        {activeTab === TABS.OUTCOMES && renderOutcomesTab()}
      </div>
    </div>
  );
}
