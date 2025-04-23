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
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import HeaderSection from "../../components/CaseStudyEditor/HeaderSection";
import NotificationsSection from "../../components/CaseStudyEditor/NotificationsSection";
import TabNavigation, {
  TabType,
  TABS,
} from "../../components/CaseStudyEditor/TabNavigation";
import { showSuccessToast, showErrorToast } from "../../utils/toast";

// Case study schema with Zod
const caseStudySchema = z.object({
  userId: z.string(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().optional(),
  tags: z.array(z.string()),
  overview: z.string().min(1, "Overview is required"),
  isPublished: z.boolean(),
  gallery: z.array(
    z.object({
      id: z.string(),
      type: z.enum(["image", "video"]),
      url: z.string(),
      caption: z.string().optional(),
      order: z.number(),
    })
  ),
  timeline: z.array(
    z.object({
      id: z.string(),
      title: z.string().min(1, "Title is required"),
      description: z.string().min(1, "Description is required"),
      date: z.string().optional(),
      order: z.number(),
    })
  ),
  tools: z.array(z.string()),
  outcomes: z.object({
    metrics: z.array(z.string()),
    testimonials: z.array(
      z.object({
        id: z.string(),
        quote: z.string().min(1, "Quote is required"),
        author: z.string().min(1, "Author name is required"),
        position: z.string().optional(),
        company: z.string().optional(),
      })
    ),
  }),
});

export type CaseStudyFormValues = z.infer<typeof caseStudySchema>;

export default function CaseStudyEditor() {
  const { currentUser } = useAuth();
  const { caseStudyId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>(TABS.OVERVIEW);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<CaseStudyFormValues>({
    resolver: zodResolver(caseStudySchema),
    defaultValues: {
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
    },
  });

  // Field arrays for dynamic lists
  const {
    fields: galleryFields,
    append: appendGallery,
    remove: removeGallery,
    update: updateGallery,
    move: moveGallery,
  } = useFieldArray({
    control,
    name: "gallery",
  });

  const {
    fields: timelineFields,
    append: appendTimeline,
    remove: removeTimeline,
    update: updateTimeline,
    move: moveTimeline,
  } = useFieldArray({
    control,
    name: "timeline",
  });

  // Using string arrays directly for tools and metrics
  const tools = watch("tools") || [];
  const metrics = watch("outcomes.metrics") || [];

  const {
    fields: testimonialsFields,
    append: appendTestimonial,
    remove: removeTestimonial,
    update: updateTestimonial,
  } = useFieldArray({
    control,
    name: "outcomes.testimonials",
  });

  // Watch values for UI updates
  const watchedValues = watch();

  // Load case study if editing an existing one
  useEffect(() => {
    const loadCaseStudy = async () => {
      if (caseStudyId && caseStudyId !== "new") {
        setIsLoading(true);
        try {
          const data = await getCaseStudy(caseStudyId);
          // Type assertion after validating the response has the required fields
          if (
            typeof data === "object" &&
            data !== null &&
            "title" in data &&
            "description" in data &&
            "tags" in data &&
            "overview" in data &&
            "isPublished" in data &&
            "gallery" in data &&
            "timeline" in data &&
            "tools" in data &&
            "outcomes" in data &&
            "userId" in data
          ) {
            // Use unknown as intermediate type to safely cast
            reset(data as unknown as CaseStudyFormValues);
          } else {
            throw new Error("Invalid case study data format");
          }
        } catch (error) {
          setErrorMessage("Failed to load case study.");
          showErrorToast("Failed to load case study");
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadCaseStudy();
  }, [caseStudyId, reset]);

  // Save the case study
  const handleSave = async (publish = false) => {
    handleSubmit(async (data) => {
      setIsSaving(true);
      setErrorMessage("");
      setSuccessMessage("");

      try {
        const updatedCaseStudy = {
          ...data,
          isPublished: publish || data.isPublished,
        };

        if (caseStudyId && caseStudyId !== "new") {
          await updateCaseStudy(caseStudyId, updatedCaseStudy);
          setSuccessMessage("Case study updated successfully!");
          showSuccessToast("Case study updated successfully!");
        } else {
          const newCaseStudy = await createCaseStudy(updatedCaseStudy);
          navigate(`/dashboard/case-study/${newCaseStudy.id}`);
          setSuccessMessage("Case study created successfully!");
          showSuccessToast("Case study created successfully!");
        }
      } catch (error) {
        setErrorMessage("Failed to save case study.");
        showErrorToast("Failed to save case study");
        console.error(error);
      } finally {
        setIsSaving(false);
      }
    })();
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

      setValue("image", imageUrl, { shouldDirty: true });
    } catch (error) {
      setErrorMessage("Failed to upload image.");
      showErrorToast("Failed to upload image");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Media upload handlers
  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        order: galleryFields.length,
      };

      appendGallery(newMediaItem);
    } catch (error) {
      setErrorMessage("Failed to upload media.");
      showErrorToast("Failed to upload media");
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
      order: galleryFields.length,
    };

    appendGallery(newMediaItem);
  };

  // Tags handlers
  const addTag = (tag: string) => {
    if (tag.trim() && !watchedValues.tags.includes(tag.trim())) {
      setValue("tags", [...watchedValues.tags, tag.trim()], {
        shouldDirty: true,
      });
    }
  };

  const removeTag = (tag: string) => {
    setValue(
      "tags",
      watchedValues.tags.filter((t) => t !== tag),
      { shouldDirty: true }
    );
  };

  // Tools handlers
  const addTool = (tool: string) => {
    if (tool.trim() && !watchedValues.tools.includes(tool.trim())) {
      setValue("tools", [...watchedValues.tools, tool.trim()], {
        shouldDirty: true,
      });
    }
  };

  const removeTool = (tool: string) => {
    setValue(
      "tools",
      watchedValues.tools.filter((t) => t !== tool),
      { shouldDirty: true }
    );
  };

  // Metrics handlers
  const addMetric = (metric: string) => {
    if (
      metric.trim() &&
      !watchedValues.outcomes.metrics.includes(metric.trim())
    ) {
      setValue(
        "outcomes.metrics",
        [...watchedValues.outcomes.metrics, metric.trim()],
        { shouldDirty: true }
      );
    }
  };

  const removeMetric = (metric: string) => {
    setValue(
      "outcomes.metrics",
      watchedValues.outcomes.metrics.filter((m) => m !== metric),
      { shouldDirty: true }
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }

  return (
    <div className="case-study-editor-page pb-12">
      <HeaderSection
        caseStudyId={caseStudyId}
        isPublished={watchedValues.isPublished}
        isSaving={isSaving}
        onSave={handleSave}
      />

      <NotificationsSection
        successMessage={successMessage}
        errorMessage={errorMessage}
      />

      <TabNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        control={control}
        errors={errors}
        watchedValues={watchedValues}
        handleImageUpload={handleImageUpload}
        galleryFields={galleryFields}
        handleMediaUpload={handleMediaUpload}
        addVideoItem={addVideoItem}
        updateMediaCaption={(id: string, caption: string) => {
          const index = galleryFields.findIndex((item) => item.id === id);
          if (index !== -1) {
            updateGallery(index, { ...galleryFields[index], caption });
          }
        }}
        removeMediaItem={(id: string) => {
          const index = galleryFields.findIndex((item) => item.id === id);
          if (index !== -1) {
            removeGallery(index);
          }
        }}
        reorderMedia={(startIndex: number, endIndex: number) => {
          moveGallery(startIndex, endIndex);
          // Update orders after move
          setValue(
            "gallery",
            galleryFields.map((item, index) => ({ ...item, order: index })),
            { shouldDirty: true }
          );
        }}
        timelineFields={timelineFields}
        appendTimeline={(item: Omit<TimelineItem, "id" | "order">) => {
          appendTimeline({
            id: uuidv4(),
            ...item,
            order: timelineFields.length,
          });
        }}
        updateTimelineItem={(
          id: string,
          field: keyof TimelineItem,
          value: string
        ) => {
          const index = timelineFields.findIndex((item) => item.id === id);
          if (index !== -1) {
            const updatedItem = {
              ...timelineFields[index],
              [field]: value,
            };
            updateTimeline(index, updatedItem);
          }
        }}
        removeTimelineItem={(id: string) => {
          const index = timelineFields.findIndex((item) => item.id === id);
          if (index !== -1) {
            removeTimeline(index);
            // Update orders after removal
            setValue(
              "timeline",
              timelineFields
                .filter((_, i) => i !== index)
                .map((item, idx) => ({ ...item, order: idx })),
              { shouldDirty: true }
            );
          }
        }}
        reorderTimelineItem={(startIndex: number, endIndex: number) => {
          moveTimeline(startIndex, endIndex);
          // Update orders after move
          setValue(
            "timeline",
            timelineFields.map((item, idx) => ({ ...item, order: idx })),
            { shouldDirty: true }
          );
        }}
        toolsFields={tools}
        addTool={addTool}
        removeTool={removeTool}
        metricsFields={metrics}
        addMetric={addMetric}
        removeMetric={removeMetric}
        testimonialsFields={testimonialsFields}
        addTestimonial={(testimonial: Omit<TestimonialItem, "id">) => {
          if (!testimonial.quote.trim() || !testimonial.author.trim()) return;
          appendTestimonial({
            id: uuidv4(),
            ...testimonial,
          });
        }}
        updateTestimonial={(
          id: string,
          field: keyof TestimonialItem,
          value: string
        ) => {
          const index = testimonialsFields.findIndex((item) => item.id === id);
          if (index !== -1) {
            const updatedItem = {
              ...testimonialsFields[index],
              [field]: value,
            };
            updateTestimonial(index, updatedItem);
          }
        }}
        removeTestimonial={(id: string) => {
          const index = testimonialsFields.findIndex((item) => item.id === id);
          if (index !== -1) {
            removeTestimonial(index);
          }
        }}
        addTag={addTag}
        removeTag={removeTag}
      />
    </div>
  );
}
