import React from "react";
import { Button } from "@heroui/react";

interface HeaderSectionProps {
  caseStudyId?: string;
  isPublished: boolean;
  isSaving: boolean;
  onSave: (publish?: boolean) => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  caseStudyId,
  isPublished,
  isSaving,
  onSave,
}) => {
  return (
    <div className="mb-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold dark:text-white">
        {caseStudyId === "new" ? "Create New Case Study" : "Edit Case Study"}
      </h1>
      <div className="flex gap-3">
        <Button
          variant="bordered"
          onPress={() => onSave()}
          isDisabled={isSaving}
        >
          Save Draft
        </Button>
        <Button
          variant="solid"
          color="primary"
          onPress={() => onSave(true)}
          isDisabled={isSaving}
          isLoading={isSaving}
        >
          {isPublished ? "Update & Publish" : "Publish"}
        </Button>
      </div>
    </div>
  );
};

export default HeaderSection;
