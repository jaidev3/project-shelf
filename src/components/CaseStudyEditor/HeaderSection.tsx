import React from "react";
import { Button } from "@heroui/react";
import { showSuccessToast, showErrorToast } from "../../utils/toast";

interface HeaderSectionProps {
  caseStudyId?: string;
  username?: string;
  isPublished: boolean;
  isSaving: boolean;
  onSave: (publish?: boolean) => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  caseStudyId,
  username,
  isPublished,
  isSaving,
  onSave,
}) => {
  const handleShareCaseStudy = () => {
    if (!isPublished || !caseStudyId || !username) {
      showErrorToast("You need to publish this case study before sharing it");
      return;
    }

    const baseUrl = window.location.origin;
    const shareUrl = `${baseUrl}/${username}/case-study/${caseStudyId}`;

    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        showSuccessToast("Share link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy URL: ", err);
        showErrorToast("Failed to copy URL to clipboard");
      });
  };

  return (
    <div className="mb-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold dark:text-white">
        {caseStudyId === "new" ? "Create New Case Study" : "Edit Case Study"}
      </h1>
      <div className="flex gap-3">
        {isPublished && caseStudyId !== "new" && (
          <Button
            variant="flat"
            color="secondary"
            onPress={handleShareCaseStudy}
            startContent={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
            }
          >
            Share
          </Button>
        )}
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
