"use client";

import { Button } from "@/components/ui/button";
import { CloudUpload } from "@/icons/Icons";

export function ActionButtons() {
  const handleCancel = () => {
    console.log("Cancel clicked");
  };

  const handleSaveDraft = () => {
    console.log("Save Draft clicked");
  };

  const handlePreview = () => {
    console.log("Preview clicked");
  };

  const handlePublishMap = () => {
    console.log("Publish Map clicked");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mt-6">
      <div className="flex flex-col sm:flex-row  items-center gap-3">
        <Button
          variant="outline"
          onClick={handleCancel}
          className="px-6 py-2"
        >
          Cancel
        </Button>
        
        <Button
          variant="outline"
          onClick={handleSaveDraft}
          className="px-6 py-2"
        >
          Save Draft
        </Button>
        
        <Button
          variant="outline"
          onClick={handlePreview}
          className="px-6 py-2"
        >
          Preview
        </Button>
      </div>

      <Button
        onClick={handlePublishMap}
        className="bg-[#3D8C6C] hover:bg-[#3D8C6C]/90 text-white px-6 py-2 flex items-center gap-2"
      >
        <CloudUpload className="w-4 h-4" />
        Publish Map
      </Button>
    </div>
  );
}
