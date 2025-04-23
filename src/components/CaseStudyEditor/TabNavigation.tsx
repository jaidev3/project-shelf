import React from "react";
import { Tabs, Tab } from "@heroui/react";
import { Control, FieldErrors } from "react-hook-form";
import { CaseStudyFormValues } from "../../pages/dashboard/CaseStudyEditor";
import OverviewTab from "./OverviewTab";
import MediaTab from "./MediaTab";
import TimelineTab from "./TimelineTab";
import ToolsTab from "./ToolsTab";
import OutcomesTab from "./OutcomesTab";
import {
  MediaItem,
  TimelineItem,
  TestimonialItem,
} from "../../types/CaseStudy";

// Tab constants
export const TABS = {
  OVERVIEW: "overview",
  MEDIA: "media",
  TIMELINE: "timeline",
  TOOLS: "tools",
  OUTCOMES: "outcomes",
} as const;

export type TabType = (typeof TABS)[keyof typeof TABS];

interface TabNavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  control: Control<CaseStudyFormValues>;
  errors: FieldErrors<CaseStudyFormValues>;
  watchedValues: CaseStudyFormValues;
  // Overview tab props
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  // Media tab props
  galleryFields: any[];
  handleMediaUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  addVideoItem: () => void;
  updateMediaCaption: (id: string, caption: string) => void;
  removeMediaItem: (id: string) => void;
  reorderMedia: (startIndex: number, endIndex: number) => void;
  // Timeline tab props
  timelineFields: any[];
  appendTimeline: (item: Omit<TimelineItem, "id" | "order">) => void;
  updateTimelineItem: (
    id: string,
    field: keyof TimelineItem,
    value: string
  ) => void;
  removeTimelineItem: (id: string) => void;
  reorderTimelineItem: (startIndex: number, endIndex: number) => void;
  // Tools tab props
  toolsFields: string[];
  addTool: (tool: string) => void;
  removeTool: (tool: string) => void;
  // Outcomes tab props
  metricsFields: string[];
  addMetric: (metric: string) => void;
  removeMetric: (metric: string) => void;
  testimonialsFields: any[];
  addTestimonial: (testimonial: Omit<TestimonialItem, "id">) => void;
  updateTestimonial: (
    id: string,
    field: keyof TestimonialItem,
    value: string
  ) => void;
  removeTestimonial: (id: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
  control,
  errors,
  watchedValues,
  // Overview
  handleImageUpload,
  // Media
  galleryFields,
  handleMediaUpload,
  addVideoItem,
  updateMediaCaption,
  removeMediaItem,
  reorderMedia,
  // Timeline
  timelineFields,
  appendTimeline,
  updateTimelineItem,
  removeTimelineItem,
  reorderTimelineItem,
  // Tools
  toolsFields,
  addTool,
  removeTool,
  // Outcomes
  metricsFields,
  addMetric,
  removeMetric,
  testimonialsFields,
  addTestimonial,
  updateTestimonial,
  removeTestimonial,
}) => {
  return (
    <Tabs
      selectedKey={activeTab}
      onSelectionChange={(key) => setActiveTab(key as TabType)}
      className="mt-4"
    >
      <Tab key={TABS.OVERVIEW} title="Overview">
        <OverviewTab
          control={control}
          errors={errors}
          tags={watchedValues.tags}
          addTag={(tag: string) => {
            if (tag.trim() && !watchedValues.tags.includes(tag.trim())) {
              // This would be handled by the parent component
            }
          }}
          removeTag={(tag: string) => {
            // This would be handled by the parent component
          }}
          handleImageUpload={handleImageUpload}
          coverImage={watchedValues.image || ""}
          removeCoverImage={() => {
            // This would be handled by the parent component
          }}
        />
      </Tab>
      <Tab key={TABS.MEDIA} title="Media">
        <MediaTab
          galleryFields={galleryFields}
          handleMediaUpload={handleMediaUpload}
          addVideoItem={addVideoItem}
          updateMediaCaption={updateMediaCaption}
          removeMediaItem={removeMediaItem}
          reorderMedia={reorderMedia}
        />
      </Tab>
      <Tab key={TABS.TIMELINE} title="Timeline">
        <TimelineTab
          control={control}
          errors={errors}
          timelineFields={timelineFields}
          appendTimeline={appendTimeline}
          updateTimelineItem={updateTimelineItem}
          removeTimelineItem={removeTimelineItem}
          reorderTimelineItem={reorderTimelineItem}
        />
      </Tab>
      <Tab key={TABS.TOOLS} title="Tools">
        <ToolsTab
          toolsFields={toolsFields}
          addTool={addTool}
          removeTool={removeTool}
        />
      </Tab>
      <Tab key={TABS.OUTCOMES} title="Outcomes">
        <OutcomesTab
          control={control}
          errors={errors}
          metricsFields={metricsFields}
          addMetric={addMetric}
          removeMetric={removeMetric}
          testimonialsFields={testimonialsFields}
          addTestimonial={addTestimonial}
          updateTestimonial={updateTestimonial}
          removeTestimonial={removeTestimonial}
        />
      </Tab>
    </Tabs>
  );
};

export default TabNavigation;
