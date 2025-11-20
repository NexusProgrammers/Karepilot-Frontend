"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CustomInput } from "@/components/common/CustomInput";
import { Checkbox } from "@/components/ui/checkbox";
import { X, ArrowUpDown } from "@/icons/Icons";
import { useCreateElevatorMutation } from "@/lib/api/mapEditorElevatorApi";
import { AddElevatorModalProps } from "@/lib/types/map-editor/components";
import toast from "react-hot-toast";

export function AddElevatorModal({
  isOpen,
  onClose,
  floorPlanId,
  coordinates,
}: AddElevatorModalProps) {
  const [createElevator, { isLoading }] = useCreateElevatorMutation();
  const [formData, setFormData] = useState({
    label: "",
    connectsToFloors: ["Basement", "Floor 1"],
  });

  const floors = [
    "Basement",
    "Ground Floor",
    "Floor 1",
    "Floor 2",
    "Floor 3",
    "Floor 4",
    "Floor 5",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!floorPlanId) {
      toast.error("Floor plan ID is required");
      return;
    }

    if (!coordinates) {
      toast.error("Please click on the map to select a location");
      return;
    }

    if (!formData.label.trim()) {
      toast.error("Elevator label is required");
      return;
    }

    if (formData.connectsToFloors.length === 0) {
      toast.error("Please select at least one floor connection");
      return;
    }

    try {
      await createElevator({
        floorPlanId,
        name: formData.label.trim(),
        coordinates,
        connectsToFloors: formData.connectsToFloors,
        color: "#7C3AED",
        isAccessible: true,
      }).unwrap();

      toast.success("Elevator created successfully");
      setFormData({
        label: "",
        connectsToFloors: ["Basement", "Floor 1"],
      });
      onClose();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create elevator");
    }
  };

  const handleFloorToggle = (floor: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      connectsToFloors: checked
        ? [...prev.connectsToFloors, floor]
        : prev.connectsToFloors.filter((f) => f !== floor),
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Add Elevator
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Place an elevator with floor connections
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <CustomInput
            label="Elevator Label"
            placeholder="e.g. Elevator A"
            value={formData.label}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, label: value }))
            }
            required
          />

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">
              Connects to Floors
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {floors.map((floor) => (
                <div key={floor} className="flex items-center space-x-3">
                  <Checkbox
                    id={floor}
                    checked={formData.connectsToFloors.includes(floor)}
                    onCheckedChange={(checked) =>
                      handleFloorToggle(floor, checked as boolean)
                    }
                    className="data-[state=checked]:bg-[#3D8C6C] data-[state=checked]:border-[#3D8C6C] data-[state=checked]:text-white"
                  />
                  <label
                    htmlFor={floor}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {floor}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="cursor-pointer"
            >
              <X />
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#3D8C6C] hover:bg-[#3D8C6C]/90 cursor-pointer"
              disabled={isLoading || !floorPlanId}
            >
              <ArrowUpDown />
              {isLoading ? "Adding..." : "Add Elevator"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
