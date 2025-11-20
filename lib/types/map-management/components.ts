export interface DrawingTool {
  id: string;
  name: string;
  icon: any;
  description: string;
}

export interface DrawingToolsProps {
  selectedTool: string | null;
  onToolSelect: (toolId: string) => void;
}

export interface Layer {
  id: string;
  name: string;
  visible: boolean;
  locked: boolean;
}

export interface MapEditorContentProps {
  floorPlanId: string;
}

export interface MapElement {
  id: string;
  type: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
  points?: number[];
  fill?: string;
  stroke?: string;
  text?: string;
  [key: string]: any;
}

export interface MapCanvasProps {
  floorPlanUrl: string;
  selectedTool: string | null;
  onElementAdd: (element: MapElement) => void;
}

export interface EntranceData {
  name: string;
  type: string;
  description: string;
  accessLevel: string;
}

export interface MarkEntranceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: EntranceData) => void;
}

export interface RestrictedZoneData {
  name: string;
  restrictionLevel: string;
  description: string;
}

export interface AddRestrictedZoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: RestrictedZoneData) => void;
}

export interface AddPOIModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

export interface LabelData {
  text: string;
  fontSize: string;
  fontWeight: string;
  color: string;
}

export interface AddLabelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: LabelData) => void;
}

export interface ElevatorData {
  name: string;
  floors: string;
  capacity: string;
}

export interface AddElevatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ElevatorData) => void;
}

export interface AnnotationData {
  text: string;
  type: string;
  color: string;
}

export interface AddAnnotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: AnnotationData) => void;
}

export interface FloorPlanGridProps {
  floorPlans: any[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface MapManagerSearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  buildingFilter: string;
  onBuildingFilterChange: (value: string) => void;
}

export interface AddBuildingModalProps {
  isOpen: boolean;
  onClose: () => void;
  buildingId?: string | null;
  mode?: "create" | "edit";
}
