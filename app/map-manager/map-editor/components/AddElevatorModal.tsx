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

interface ElevatorData {
  label: string;
  connectsToFloors: string[];
}

interface AddElevatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddElevator: (elevatorData: ElevatorData) => void;
}

export function AddElevatorModal({
  isOpen,
  onClose,
  onAddElevator,
}: AddElevatorModalProps) {
  const [formData, setFormData] = useState({
    label: "",
    connectsToFloors: ["Basement", "Floor 1"], // Default checked floors
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddElevator(formData);
    onClose();
    setFormData({
      label: "",
      connectsToFloors: ["Basement", "Floor 1"],
    });
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
            >
              <ArrowUpDown />
              Add Elevator
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
