
export interface MapEditorCoordinates {
  x: number;
  y: number;
}

export interface MapEditorZoneCoordinates extends MapEditorCoordinates {
  width: number;
  height: number;
}

export interface DrawingTool {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface AddPOIModalProps {
  isOpen: boolean;
  onClose: () => void;
  floorPlanId?: string;
  coordinates?: MapEditorCoordinates;
}

export interface MarkEntranceModalProps {
  isOpen: boolean;
  onClose: () => void;
  floorPlanId?: string;
  coordinates?: MapEditorCoordinates;
}

export interface AddElevatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  floorPlanId?: string;
  coordinates?: MapEditorCoordinates;
}

export interface AddLabelModalProps {
  isOpen: boolean;
  onClose: () => void;
  floorPlanId?: string;
  coordinates?: MapEditorCoordinates;
}

export interface AddAnnotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  floorPlanId: string;
  coordinates?: MapEditorCoordinates;
}

export interface AddRestrictedZoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  floorPlanId?: string;
  coordinates?: MapEditorZoneCoordinates;
}

export interface DrawingToolsProps {
  onToolSelect?: (toolId: string) => void;
  selectedTool?: string | null;
}

export interface MapCanvasProps {
  floorPlanId?: string;
  selectedTool?: string | null;
  onPOIClick?: (coordinates: MapEditorCoordinates) => void;
  onRestrictedZoneDraw?: (coordinates: MapEditorZoneCoordinates) => void;
}

