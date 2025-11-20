
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

export interface Layer {
  id: string;
  name: string;
  visible: boolean;
}

export interface MapEditorContentProps {
  floorPlanId?: string;
}

export interface MapElement {
  id: string;
  type: "poi" | "path" | "zone" | "label" | "entrance" | "elevator" | "annotation" | "measurement";
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  radius?: number;
  color: string;
  label?: string;
  points?: { x: number; y: number }[];
  startPoint?: { x: number; y: number };
  endPoint?: { x: number; y: number };
  distance?: number;
  unit?: string;
  text?: string;
  fontSize?: number;
  fontWeight?: string;
}

