import { CustomInput } from "@/components/common/CustomInput";
import { CustomSelect } from "@/components/common/CustomSelect";
import { CustomTextarea } from "@/components/common/CustomTextarea";
import { ToggleSwitch } from "@/components/common/ToggleSwitch";
import { CreatePIOIcon } from "@/icons/dashboard";
import { buildings, categories, floors } from "@/lib/dashboard/data";
import { MapPin, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface CreatePOIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreatePOIModal({ isOpen, onClose }: CreatePOIModalProps) {
  const [poiName, setPoiName] = useState("");
  const [category, setCategory] = useState("");
  const [building, setBuilding] = useState("");
  const [floor, setFloor] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [operatingHours, setOperatingHours] = useState("");
  const [wheelchairAccessible, setWheelchairAccessible] = useState(false);
  const [hearingLoop, setHearingLoop] = useState(false);
  const [visualAidSupport, setVisualAidSupport] = useState(false);
  const [roomNumberAlt, setRoomNumberAlt] = useState("");
  const [xCoordinate, setXCoordinate] = useState("");
  const [yCoordinate, setYCoordinate] = useState("");

  const handleSubmit = () => {
    console.log({
      poiName,
      category,
      building,
      floor,
      roomNumber,
      description,
      tags,
      email,
      phone,
      operatingHours,
      wheelchairAccessible,
      hearingLoop,
      visualAidSupport,
      roomNumberAlt,
      xCoordinate,
      yCoordinate,
    });
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-[700px] relative max-h-[90vh] overflow-hidden flex flex-col">
        <div className="px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-start justify-between mb-2">
            <h2 className="text-xl font-semibold text-card-foreground">
              Create Point of Interest
            </h2>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground transition-colors -mt-1 cursor-pointer p-1 h-auto"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Add a new location or service to help visitors navigate
          </p>
        </div>

        <div className="px-6 py-6 overflow-y-auto flex-1">
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-card-foreground mb-1">
              POI Details
            </h3>
            <p className="text-xs text-muted-foreground">
              Provide information about this point of interest
            </p>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CustomInput
                value={poiName}
                onChange={setPoiName}
                placeholder="e.g. Emergency Department"
                label="POI Name"
                required
              />

              <CustomSelect
                value={category}
                onChange={setCategory}
                options={categories}
                placeholder="Select category"
                label="Category"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <CustomSelect
                value={building}
                onChange={setBuilding}
                options={buildings}
                placeholder="Select building"
                label="Building"
                required
              />

              <CustomSelect
                value={floor}
                onChange={setFloor}
                options={floors}
                placeholder="Select floor"
                label="Floor"
                required
              />
              <CustomInput
                value={roomNumber}
                onChange={setRoomNumber}
                placeholder="e.g. ED-001"
                label="Room Number"
                required
              />
            </div>

            <CustomTextarea
              value={description}
              onChange={setDescription}
              placeholder="Brief description of the location or service"
              label="Description"
            />

            <CustomInput
              value={tags}
              onChange={setTags}
              placeholder="e.g. emergency, 24/7, trauma (comma-separated)"
              label="Tags"
            />

            <div className="pt-4 border-t border-border">
              <h3 className="text-sm font-semibold text-card-foreground mb-4">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <CustomInput
                  value={phone}
                  onChange={setPhone}
                  placeholder="+1-555-012-4353"
                  label="Phone"
                  type="tel"
                />

                <CustomInput
                  value={email}
                  onChange={setEmail}
                  placeholder="email@example.com"
                  label="Email"
                  type="email"
                />
                <CustomInput
                  value={operatingHours}
                  onChange={setOperatingHours}
                  placeholder="9:00 AM - 5:00 PM"
                  label="Operating Hours"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <h3 className="text-sm font-semibold text-card-foreground mb-4">
                Accessibility Features
              </h3>
              <div className="space-y-3">
                <ToggleSwitch
                  checked={wheelchairAccessible}
                  onChange={setWheelchairAccessible}
                  label="Wheelchair Accessible"
                  description="Full wheelchair accessibility"
                />
                <ToggleSwitch
                  checked={hearingLoop}
                  onChange={setHearingLoop}
                  label="Hearing Loop"
                  description="Hearing assistance available"
                />
                <ToggleSwitch
                  checked={visualAidSupport}
                  onChange={setVisualAidSupport}
                  label="Visual Aid Support"
                  description="Visual aids available"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <CustomInput
                  value={roomNumberAlt}
                  onChange={setRoomNumberAlt}
                  placeholder="e.g. ED-001"
                  label="Room Number"
                  required
                />

                <CustomInput
                  value={xCoordinate}
                  onChange={setXCoordinate}
                  placeholder="X: 0"
                  label="Coordinates"
                />

                <CustomInput
                  value={yCoordinate}
                  onChange={setYCoordinate}
                  placeholder="Y: 0"
                  label="(Click on map to Set POI location)"
                />
              </div>
            </div>

            <div className="pt-2">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Click on the map to set POI location
                </p>
                <p className="text-xs text-muted-foreground">
                  Coordinates will be set automatically by tapping a spot
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-border bg-muted/50">
          <Button
            onClick={onClose}
            variant="outline"
            className="px-5 py-2.5 cursor-pointer text-sm font-medium text-muted-foreground bg-background border border-border rounded-lg hover:bg-accent transition-colors flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="px-5 flex gap-2 py-2.5 text-sm cursor-pointer font-medium text-white bg-[#3D8C6C] rounded-lg transition-colors hover:bg-[#3D8C6C]/90"
          >
            <CreatePIOIcon />
            Create POI
          </Button>
        </div>
      </div>
    </div>
  );
}
