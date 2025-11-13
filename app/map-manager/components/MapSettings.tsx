"use client";

import { useState } from "react";
import { ToggleSwitch } from "@/components/common/ToggleSwitch";

export default function MapSettings() {
  const [autoPublish, setAutoPublish] = useState(false);
  const [highResThumbnails, setHighResThumbnails] = useState(true);
  const [versionControl, setVersionControl] = useState(true);

  return (
    <div className="bg-card rounded-3xl border border-border p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-card-foreground mb-2">Map Settings</h2>
        <p className="text-sm text-muted-foreground">
          Configure map display and processing options
        </p>
      </div>

      <div className="space-y-6">
        <div className="border-b border-border pb-6">
          <ToggleSwitch
            checked={autoPublish}
            onChange={setAutoPublish}
            label="Auto-publish updates"
            description="Automatically publish maps after editing"
          />
        </div>

        <div className="border-b border-border pb-6">
          <ToggleSwitch
            checked={highResThumbnails}
            onChange={setHighResThumbnails}
            label="High-res thumbnails"
            description="Generate high-resolution preview images"
          />
        </div>

        <div>
          <ToggleSwitch
            checked={versionControl}
            onChange={setVersionControl}
            label="Version control"
            description="Keep previous versions of maps"
          />
        </div>
      </div>
    </div>
  );
}