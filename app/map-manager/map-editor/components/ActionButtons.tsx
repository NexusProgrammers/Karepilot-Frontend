"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CloudUpload } from "@/icons/Icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUpdateFloorPlanStatusMutation } from "@/lib/api/floorPlansApi";
import { ActionButtonsProps } from "@/lib/types/map-editor/components";
import toast from "react-hot-toast";

export function ActionButtons({ floorPlanId }: ActionButtonsProps) {
  const router = useRouter();
  const [updateFloorPlanStatus, { isLoading }] = useUpdateFloorPlanStatusMutation();
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const [showPublishDialog, setShowPublishDialog] = useState(false);

  const handleCancel = () => {
    router.push("/map-manager");
  };

  const handleSaveDraft = async () => {
    if (!floorPlanId) {
      toast.error("Floor plan ID is required");
      return;
    }

    try {
      await updateFloorPlanStatus({
        id: floorPlanId,
        status: "Draft",
      }).unwrap();
      toast.success("Map saved as draft successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to save draft");
    }
  };

  const handlePreview = () => {
    setShowPreviewDialog(true);
  };

  const handlePublishMap = async () => {
    if (!floorPlanId) {
      toast.error("Floor plan ID is required");
      return;
    }

    try {
      await updateFloorPlanStatus({
        id: floorPlanId,
        status: "Published",
      }).unwrap();
      toast.success("Map published successfully!");
      setShowPublishDialog(false);
      router.push("/map-manager");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to publish map");
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mt-6">
        <div className="flex flex-col sm:flex-row items-center gap-3">
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
            disabled={isLoading || !floorPlanId}
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
          onClick={() => setShowPublishDialog(true)}
          disabled={!floorPlanId}
          className="bg-[#3D8C6C] hover:bg-[#3D8C6C]/90 text-white px-6 py-2 flex items-center gap-2"
        >
          <CloudUpload className="w-4 h-4" />
          Publish Map
        </Button>
      </div>

      <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Preview Map</DialogTitle>
            <DialogDescription>
              Preview feature is coming soon. This will show you how the map will look to end users.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPreviewDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showPublishDialog} onOpenChange={setShowPublishDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Publish Map</DialogTitle>
            <DialogDescription>
              Are you sure you want to publish this map? Once published, it will be visible to all users.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPublishDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handlePublishMap}
              disabled={isLoading}
              className="bg-[#3D8C6C] hover:bg-[#3D8C6C]/90 text-white"
            >
              {isLoading ? "Publishing..." : "Publish"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
