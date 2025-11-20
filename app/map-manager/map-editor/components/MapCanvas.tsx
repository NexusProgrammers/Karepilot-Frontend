"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Stage, Layer, Rect, Circle, Line, Text, Group } from "react-konva";
import Konva from "konva";
import {
  Minus,
  Plus,
  RotateCcw,
  Undo,
  Redo,
  Trash2,
  Grid3x3,
  Search,
  X,
  Check,
} from "@/icons/Icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetPOIsByFloorPlanQuery, useUpdatePOIMutation } from "@/lib/api/mapEditorPOIApi";
import { MapEditorPOI } from "@/lib/types/map-management/mapEditorPOI";
import { useGetEntrancesByFloorPlanQuery, useUpdateEntranceMutation } from "@/lib/api/mapEditorEntranceApi";
import { MapEditorEntrance } from "@/lib/types/map-management/mapEditorEntrance";
import { useGetElevatorsByFloorPlanQuery, useUpdateElevatorMutation } from "@/lib/api/mapEditorElevatorApi";
import { MapEditorElevator } from "@/lib/types/map-management/mapEditorElevator";
import { useGetPathsByFloorPlanQuery, useCreatePathMutation, useUpdatePathMutation, useDeletePathMutation } from "@/lib/api/mapEditorPathApi";
import { MapEditorPath } from "@/lib/types/map-management/mapEditorPath";
import { useGetRestrictedZonesByFloorPlanQuery, useUpdateRestrictedZoneMutation } from "@/lib/api/mapEditorRestrictedZoneApi";
import { MapEditorRestrictedZone } from "@/lib/types/map-management/mapEditorRestrictedZone";
import { useGetLabelsByFloorPlanQuery, useUpdateLabelMutation } from "@/lib/api/mapEditorLabelApi";
import { MapEditorLabel } from "@/lib/types/map-management/mapEditorLabel";
import { useGetMeasurementsByFloorPlanQuery, useCreateMeasurementMutation, useDeleteMeasurementMutation } from "@/lib/api/mapEditorMeasurementApi";
import { MapEditorMeasurement } from "@/lib/types/map-management/mapEditorMeasurement";
import { useGetAnnotationsByFloorPlanQuery, useUpdateAnnotationMutation } from "@/lib/api/mapEditorAnnotationApi";
import { MapEditorAnnotation } from "@/lib/types/map-management/mapEditorAnnotation";
import toast from "react-hot-toast";

interface MapElement {
  id: string;
  type: "poi" | "path" | "zone" | "label" | "entrance" | "elevator" | "annotation";
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  radius?: number;
  color: string;
  label?: string;
  points?: number[];
  stroke?: string;
  strokeWidth?: number;
  tension?: number;
  pointerLength?: number;
  pointerWidth?: number;
  draggable?: boolean;
}

interface MapCanvasProps {
  floorPlanId?: string;
  onPOIClick?: (coordinates: { x: number; y: number }) => void;
  onRestrictedZoneDraw?: (coordinates: { x: number; y: number; width: number; height: number }) => void;
  selectedTool?: string | null;
}

export function MapCanvas({ floorPlanId, onPOIClick, onRestrictedZoneDraw, selectedTool }: MapCanvasProps) {
  const [zoom, setZoom] = useState(100);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const [showGrid, setShowGrid] = useState(true);
  const [history, setHistory] = useState<MapElement[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showClearAllDialog, setShowClearAllDialog] = useState(false);
  const stageRef = useRef<Konva.Stage>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: pois = [], isLoading: isLoadingPOIs, error: poisError } = useGetPOIsByFloorPlanQuery(
    { floorPlanId: floorPlanId || "", isActive: true },
    { skip: !floorPlanId }
  );
  const { data: entrances = [], isLoading: isLoadingEntrances } = useGetEntrancesByFloorPlanQuery(
    { floorPlanId: floorPlanId || "", isActive: true },
    { skip: !floorPlanId }
  );
  const { data: elevators = [], isLoading: isLoadingElevators } = useGetElevatorsByFloorPlanQuery(
    { floorPlanId: floorPlanId || "", isActive: true },
    { skip: !floorPlanId }
  );
  const { data: paths = [], isLoading: isLoadingPaths } = useGetPathsByFloorPlanQuery(
    { floorPlanId: floorPlanId || "", isActive: true },
    { skip: !floorPlanId }
  );
  const { data: restrictedZones = [], isLoading: isLoadingRestrictedZones } = useGetRestrictedZonesByFloorPlanQuery(
    { floorPlanId: floorPlanId || "", isActive: true },
    { skip: !floorPlanId }
  );
  const { data: labels = [], isLoading: isLoadingLabels } = useGetLabelsByFloorPlanQuery(
    { floorPlanId: floorPlanId || "", isActive: true },
    { skip: !floorPlanId }
  );
  const { data: measurements = [], isLoading: isLoadingMeasurements } = useGetMeasurementsByFloorPlanQuery(
    { floorPlanId: floorPlanId || "", isActive: true },
    { skip: !floorPlanId }
  );
  const { data: annotations = [], isLoading: isLoadingAnnotations } = useGetAnnotationsByFloorPlanQuery(
    { floorPlanId: floorPlanId || "", isActive: true },
    { skip: !floorPlanId }
  );
  const [updatePOI] = useUpdatePOIMutation();
  const [updateEntrance] = useUpdateEntranceMutation();
  const [updateElevator] = useUpdateElevatorMutation();
  const [createPath] = useCreatePathMutation();
  const [updatePath] = useUpdatePathMutation();
  const [deletePath] = useDeletePathMutation();
  const [updateRestrictedZone] = useUpdateRestrictedZoneMutation();
  const [updateLabel] = useUpdateLabelMutation();
  const [createMeasurement] = useCreateMeasurementMutation();
  const [deleteMeasurement] = useDeleteMeasurementMutation();
  const [updateAnnotation] = useUpdateAnnotationMutation();

  const [elements, setElements] = useState<MapElement[]>([]);
  const [drawingPath, setDrawingPath] = useState<{ x: number; y: number }[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isDrawingZone, setIsDrawingZone] = useState(false);
  const [zoneStart, setZoneStart] = useState<{ x: number; y: number } | null>(null);
  const [zoneCurrent, setZoneCurrent] = useState<{ x: number; y: number } | null>(null);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [measureStart, setMeasureStart] = useState<{ x: number; y: number } | null>(null);
  const [measureEnd, setMeasureEnd] = useState<{ x: number; y: number } | null>(null);

  const poiMap = new Map(pois.map((poi: MapEditorPOI) => [poi.id, poi]));
  const entranceMap = new Map(entrances.map((entrance: MapEditorEntrance) => [entrance.id, entrance]));
  const elevatorMap = new Map(elevators.map((elevator: MapEditorElevator) => [elevator.id, elevator]));
  const pathMap = new Map(paths.map((path: MapEditorPath) => [path.id, path]));
  const restrictedZoneMap = new Map(restrictedZones.map((zone: MapEditorRestrictedZone) => [zone.id, zone]));
  const labelMap = new Map(labels.map((label: MapEditorLabel) => [label.id, label]));
  const annotationMap = new Map(annotations.map((annotation: MapEditorAnnotation) => [annotation.id, annotation]));

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        setStageSize({
          width: container.offsetWidth,
          height: container.offsetHeight,
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (history.length === 0 && elements.length > 0) {
      setHistory([[...elements]]);
      setHistoryIndex(0);
    }
  }, [elements, elements.length, history.length]);

  const cancelPathDrawing = useCallback(() => {
    setDrawingPath([]);
    setIsDrawing(false);
  }, []);

  useEffect(() => {
    if (selectedTool !== "path" && isDrawing) {
      cancelPathDrawing();
    }
    if (selectedTool !== "restricted" && isDrawingZone) {
      setIsDrawingZone(false);
      setZoneStart(null);
      setZoneCurrent(null);
    }
    if (selectedTool !== "measure" && isMeasuring) {
      setIsMeasuring(false);
      setMeasureStart(null);
      setMeasureEnd(null);
    }
  }, [selectedTool, isDrawing, isDrawingZone, isMeasuring, cancelPathDrawing]);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 10, 200));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 10, 50));
  const handleReset = () => {
    setZoom(100);
    if (stageRef.current) {
      stageRef.current.scale({ x: 1, y: 1 });
      stageRef.current.position({ x: 0, y: 0 });
    }
  };

  const saveToHistory = (newElements: MapElement[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push([...newElements]);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setElements([...history[historyIndex - 1]]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setElements([...history[historyIndex + 1]]);
    }
  };

  const handleClearAll = () => {
    setShowClearAllDialog(true);
  };

  const confirmClearAll = () => {
    setElements([]);
    saveToHistory([]);
    setShowClearAllDialog(false);
    toast.success("All elements cleared");
  };

  const handleDragEnd = async (id: string, newX: number, newY: number, newWidth?: number, newHeight?: number) => {
    const poi = poiMap.get(id);
    const entrance = entranceMap.get(id);
    const elevator = elevatorMap.get(id);
    const restrictedZone = restrictedZoneMap.get(id);
    const label = labelMap.get(id);
    const annotation = annotationMap.get(id);
    
    if (poi) {
      try {
        await updatePOI({
          id: poi.id,
          data: {
            coordinates: {
              x: Math.round(newX),
              y: Math.round(newY),
            },
          },
        }).unwrap();
        toast.success("POI position updated");
      } catch (error: any) {
        console.error("Failed to update POI position:", error);
        toast.error(error?.data?.message || "Failed to update POI position");
      }
    } else if (entrance) {
      try {
        await updateEntrance({
          id: entrance.id,
          data: {
            coordinates: {
              x: Math.round(newX),
              y: Math.round(newY),
            },
          },
        }).unwrap();
        toast.success("Entrance position updated");
      } catch (error: any) {
        console.error("Failed to update entrance position:", error);
        toast.error(error?.data?.message || "Failed to update entrance position");
      }
    } else if (elevator) {
      try {
        await updateElevator({
          id: elevator.id,
          data: {
            coordinates: {
              x: Math.round(newX),
              y: Math.round(newY),
            },
          },
        }).unwrap();
        toast.success("Elevator position updated");
      } catch (error: any) {
        console.error("Failed to update elevator position:", error);
        toast.error(error?.data?.message || "Failed to update elevator position");
      }
    } else if (restrictedZone) {
      try {
        await updateRestrictedZone({
          id: restrictedZone.id,
          data: {
            coordinates: {
              x: Math.round(newX),
              y: Math.round(newY),
              width: newWidth ? Math.round(newWidth) : restrictedZone.coordinates.width,
              height: newHeight ? Math.round(newHeight) : restrictedZone.coordinates.height,
            },
          },
        }).unwrap();
        toast.success("Restricted zone updated");
      } catch (error: any) {
        console.error("Failed to update restricted zone:", error);
        toast.error(error?.data?.message || "Failed to update restricted zone");
      }
    } else if (label) {
      try {
        await updateLabel({
          id: label.id,
          data: {
            coordinates: {
              x: Math.round(newX),
              y: Math.round(newY),
            },
          },
        }).unwrap();
        toast.success("Label position updated");
      } catch (error: any) {
        console.error("Failed to update label position:", error);
        toast.error(error?.data?.message || "Failed to update label position");
      }
    } else if (annotation) {
      try {
        await updateAnnotation({
          id: annotation.id,
          body: {
            coordinates: {
              x: Math.round(newX),
              y: Math.round(newY),
            },
          },
        }).unwrap();
        toast.success("Annotation position updated");
      } catch (error: any) {
        console.error("Failed to update annotation position:", error);
        toast.error(error?.data?.message || "Failed to update annotation position");
      }
    } else {
      const newElements = elements.map((el) =>
        el.id === id ? { ...el, x: newX, y: newY } : el
      );
      setElements(newElements);
      saveToHistory(newElements);
    }
  };

  const handleStageClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();
    if (!stage) return;

    const pointerPos = stage.getPointerPosition();
    if (!pointerPos) return;

    if (selectedTool === "path") {
      if (!isDrawing) {
        setIsDrawing(true);
        setDrawingPath([{ x: pointerPos.x, y: pointerPos.y }]);
      } else {
        setDrawingPath((prev) => [...prev, { x: pointerPos.x, y: pointerPos.y }]);
      }
    } else if (selectedTool === "restricted") {
      if (!isDrawingZone) {
        setIsDrawingZone(true);
        setZoneStart({ x: pointerPos.x, y: pointerPos.y });
        setZoneCurrent({ x: pointerPos.x, y: pointerPos.y });
      }
    } else if (selectedTool === "measure") {
      if (!isMeasuring) {
        setIsMeasuring(true);
        setMeasureStart({ x: pointerPos.x, y: pointerPos.y });
        setMeasureEnd({ x: pointerPos.x, y: pointerPos.y });
      } else if (measureStart) {
        handleSaveMeasurement({ x: pointerPos.x, y: pointerPos.y });
      }
    } else if ((selectedTool === "poi" || selectedTool === "entrance" || selectedTool === "elevator" || selectedTool === "label" || selectedTool === "annotation") && onPOIClick) {
      onPOIClick({ x: pointerPos.x, y: pointerPos.y });
    }
  };

  const handleSaveMeasurement = async (endPoint: { x: number; y: number }) => {
    if (!measureStart || !floorPlanId) return;

    const distance = Math.sqrt(
      Math.pow(endPoint.x - measureStart.x, 2) + Math.pow(endPoint.y - measureStart.y, 2)
    );

    if (distance < 5) {
      toast.error("Please click further apart to measure distance");
      setIsMeasuring(false);
      setMeasureStart(null);
      setMeasureEnd(null);
      return;
    }

    try {
      await createMeasurement({
        floorPlanId,
        startPoint: measureStart,
        endPoint: endPoint,
        distance: Math.round(distance),
        unit: "meters",
        color: "#2563EB",
        strokeWidth: 2,
      }).unwrap();

      toast.success("Measurement created");
      setIsMeasuring(false);
      setMeasureStart(null);
      setMeasureEnd(null);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create measurement");
    }
  };

  const handleStageMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (selectedTool === "restricted" && isDrawingZone && zoneStart) {
      const stage = e.target.getStage();
      if (!stage) return;

      const pointerPos = stage.getPointerPosition();
      if (!pointerPos) return;

      setZoneCurrent(pointerPos);
    } else if (selectedTool === "measure" && isMeasuring && measureStart) {
      const stage = e.target.getStage();
      if (!stage) return;

      const pointerPos = stage.getPointerPosition();
      if (!pointerPos) return;

      setMeasureEnd(pointerPos);
    }
  };

  const handleStageMouseUp = () => {
    if (selectedTool === "restricted" && isDrawingZone && zoneStart && zoneCurrent && onRestrictedZoneDraw) {
      const x = Math.min(zoneStart.x, zoneCurrent.x);
      const y = Math.min(zoneStart.y, zoneCurrent.y);
      const width = Math.abs(zoneCurrent.x - zoneStart.x);
      const height = Math.abs(zoneCurrent.y - zoneStart.y);

      if (width > 10 && height > 10) {
        onRestrictedZoneDraw({ x, y, width, height });
      }

      setIsDrawingZone(false);
      setZoneStart(null);
      setZoneCurrent(null);
    }
  };

  const handleSavePath = useCallback(async () => {
    if (isDrawing && drawingPath.length >= 2 && floorPlanId) {
      try {
        await createPath({
          floorPlanId,
          points: drawingPath,
          color: "#2563EB",
          strokeWidth: 3,
        }).unwrap();
        toast.success("Path created successfully");
        cancelPathDrawing();
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to create path");
      }
    }
  }, [isDrawing, drawingPath, floorPlanId, createPath, cancelPathDrawing]);

  const handleStageDoubleClick = async (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (selectedTool === "path" && isDrawing && drawingPath.length >= 2 && floorPlanId) {
      await handleSavePath();
    }
  };

  const getPOIColor = (category: string): string => {
    const colorMap: Record<string, string> = {
      Room: "#3D8C6C", 
      Reception: "#2563EB", 
      Toilet: "#DC2626", 
      Elevator: "#7C3AED", 
      "Emergency Exit": "#F59E0B", 
      Cafeteria: "#10B981", 
      Pharmacy: "#EC4899", 
      Laboratory: "#06B6D4", 
    };
    return colorMap[category] || "#6B7280";
  };

  const poiElements: MapElement[] = pois
    .filter((poi: MapEditorPOI) => poi.isActive && poi.coordinates && typeof poi.coordinates.x === 'number' && typeof poi.coordinates.y === 'number')
    .map((poi: MapEditorPOI) => ({
      id: poi.id,
      type: "poi",
      x: poi.coordinates.x,
      y: poi.coordinates.y,
      radius: 8,
      color: poi.color || getPOIColor(poi.category),
      label: poi.name,
      draggable: true,
    }));

  const entranceElements: MapElement[] = entrances
    .filter((entrance: MapEditorEntrance) => entrance.isActive && entrance.coordinates && typeof entrance.coordinates.x === 'number' && typeof entrance.coordinates.y === 'number')
    .map((entrance: MapEditorEntrance) => ({
      id: entrance.id,
      type: "entrance",
      x: entrance.coordinates.x,
      y: entrance.coordinates.y,
      radius: 8,
      color: entrance.color || "#F59E0B",
      label: entrance.name,
      draggable: true,
    }));

  const elevatorElements: MapElement[] = elevators
    .filter((elevator: MapEditorElevator) => elevator.isActive && elevator.coordinates && typeof elevator.coordinates.x === 'number' && typeof elevator.coordinates.y === 'number')
    .map((elevator: MapEditorElevator) => ({
      id: elevator.id,
      type: "elevator",
      x: elevator.coordinates.x,
      y: elevator.coordinates.y,
      radius: 8,
      color: elevator.color || "#7C3AED",
      label: elevator.name,
      draggable: true,
    }));

  const renderElement = (element: MapElement) => {
    switch (element.type) {
      case "zone":
        return (
          <Group
            key={element.id}
            x={element.x}
            y={element.y}
            draggable={element.draggable}
            onDragEnd={(e) =>
              handleDragEnd(element.id, e.target.x(), e.target.y())
            }
          >
            <Rect
              width={element.width || 100}
              height={element.height || 100}
              fill={element.color}
              stroke="#E5E7EB"
              strokeWidth={1}
              cornerRadius={4}
            />
            {element.label && (
              <Text
                text={element.label}
                x={10}
                y={element.height! / 2 - 10}
                fontSize={14}
                fontFamily="Arial"
                fontWeight="bold"
                fill="#374151"
                width={element.width! - 20}
                align="center"
              />
            )}
          </Group>
        );
      case "poi":
        const poiColor = element.color || "#3D8C6C";
        const hexToRgba = (hex: string, alpha: number) => {
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        };
        const lightFill = hexToRgba(poiColor, 0.15);
        const borderColor = hexToRgba(poiColor, 0.4);
        
        const labelWidth = element.label ? element.label.length * 8 + 40 : 120;
        const roomWidth = Math.max(labelWidth, 120);
        const roomHeight = 60;
        
        return (
          <Group
            key={element.id}
            x={element.x}
            y={element.y}
            draggable={element.draggable}
            onDragEnd={(e) =>
              handleDragEnd(element.id, e.target.x(), e.target.y())
            }
          >
            {/* Room/Rectangle background with rounded corners */}
            <Rect
              x={-roomWidth / 2}
              y={-roomHeight / 2}
              width={roomWidth}
              height={roomHeight}
              fill={lightFill}
              stroke={borderColor}
              strokeWidth={2}
              cornerRadius={8}
            />
            
            {/* POI Indicator - Outer ring */}
            <Circle
              x={0}
              y={-8}
              radius={10}
              fill={hexToRgba(poiColor, 0.3)}
            />
            
            {/* POI Indicator - Inner dark circle */}
            <Circle
              x={0}
              y={-8}
              radius={6}
              fill={poiColor}
              stroke="#fff"
              strokeWidth={1.5}
            />
            
            {/* POI Label inside the rectangle */}
            {element.label && (
              <Text
                text={element.label}
                x={-roomWidth / 2 + 10}
                y={roomHeight / 2 - 20}
                fontSize={13}
                fontFamily="Arial"
                fontWeight="500"
                fill="#374151"
                width={roomWidth - 20}
                align="center"
              />
            )}
          </Group>
        );
      case "entrance":
        const entranceColor = element.color || "#F59E0B";
        const entranceHexToRgba = (hex: string, alpha: number) => {
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        };
        const entranceLightFill = entranceHexToRgba(entranceColor, 0.15);
        const entranceBorderColor = entranceHexToRgba(entranceColor, 0.4);
        
        const entranceLabelWidth = element.label ? element.label.length * 8 + 40 : 120;
        const entranceWidth = Math.max(entranceLabelWidth, 120);
        const entranceHeight = 60;
        
        return (
          <Group
            key={element.id}
            x={element.x}
            y={element.y}
            draggable={element.draggable}
            onDragEnd={(e) =>
              handleDragEnd(element.id, e.target.x(), e.target.y())
            }
          >
            <Rect
              x={-entranceWidth / 2}
              y={-entranceHeight / 2}
              width={entranceWidth}
              height={entranceHeight}
              fill={entranceLightFill}
              stroke={entranceBorderColor}
              strokeWidth={2}
              cornerRadius={8}
            />
            <Rect
              x={-10}
              y={-entranceHeight / 2 + 8}
              width={20}
              height={20}
              fill={entranceColor}
              stroke="#fff"
              strokeWidth={2}
              cornerRadius={4}
            />
            {element.label && (
              <Text
                text={element.label}
                x={-entranceWidth / 2 + 10}
                y={entranceHeight / 2 - 20}
                fontSize={13}
                fontFamily="Arial"
                fontWeight="500"
                fill="#374151"
                width={entranceWidth - 20}
                align="center"
              />
            )}
          </Group>
        );
      case "elevator":
        const elevatorColor = element.color || "#7C3AED";
        const elevatorHexToRgba = (hex: string, alpha: number) => {
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        };
        const elevatorLightFill = elevatorHexToRgba(elevatorColor, 0.15);
        const elevatorBorderColor = elevatorHexToRgba(elevatorColor, 0.4);
        
        const elevatorLabelWidth = element.label ? element.label.length * 8 + 40 : 120;
        const elevatorWidth = Math.max(elevatorLabelWidth, 120);
        const elevatorHeight = 60;
        
        return (
          <Group
            key={element.id}
            x={element.x}
            y={element.y}
            draggable={element.draggable}
            onDragEnd={(e) =>
              handleDragEnd(element.id, e.target.x(), e.target.y())
            }
          >
            <Rect
              x={-elevatorWidth / 2}
              y={-elevatorHeight / 2}
              width={elevatorWidth}
              height={elevatorHeight}
              fill={elevatorLightFill}
              stroke={elevatorBorderColor}
              strokeWidth={2}
              cornerRadius={8}
            />
            {/* Elevator icon - vertical rectangle representing elevator shaft */}
            <Rect
              x={-8}
              y={-elevatorHeight / 2 + 8}
              width={16}
              height={24}
              fill={elevatorColor}
              stroke="#fff"
              strokeWidth={2}
              cornerRadius={2}
            />
            {element.label && (
              <Text
                text={element.label}
                x={-elevatorWidth / 2 + 10}
                y={elevatorHeight / 2 - 20}
                fontSize={13}
                fontFamily="Arial"
                fontWeight="500"
                fill="#374151"
                width={elevatorWidth - 20}
                align="center"
              />
            )}
          </Group>
        );
      case "path":
        return (
          <Line
            key={element.id}
            points={element.points || []}
            stroke={element.stroke || element.color}
            strokeWidth={element.strokeWidth || 3}
            tension={element.tension || 0.5}
            lineCap="round"
            lineJoin="round"
            pointerLength={element.pointerLength || 10}
            pointerWidth={element.pointerWidth || 10}
            draggable={element.draggable}
            onDragEnd={(e) => {
              const newPoints =
                element.points?.map((point, index) =>
                  index % 2 === 0 ? point + e.target.x() : point + e.target.y()
                ) || [];
              setElements((prev) =>
                prev.map((el) =>
                  el.id === element.id ? { ...el, points: newPoints } : el
                )
              );
            }}
          />
        );
      case "label":
        return (
          <Text
            key={element.id}
            x={element.x}
            y={element.y}
            text={element.label || ""}
            fontSize={12}
            fontFamily="Arial"
            fill={element.color}
            draggable={element.draggable}
            onDragEnd={(e) =>
              handleDragEnd(element.id, e.target.x(), e.target.y())
            }
          />
        );
      default:
        return null;
    }
  };

  const drawGrid = () => {
    if (!showGrid) return [];
    const gridSize = 20;
    const lines = [];

    for (let i = 0; i < stageSize.width / gridSize; i++) {
      lines.push(
        <Line
          key={`v-${i}`}
          points={[i * gridSize, 0, i * gridSize, stageSize.height]}
          stroke="#e5e7eb"
          strokeWidth={1}
        />
      );
    }

    for (let i = 0; i < stageSize.height / gridSize; i++) {
      lines.push(
        <Line
          key={`h-${i}`}
          points={[0, i * gridSize, stageSize.width, i * gridSize]}
          stroke="#e5e7eb"
          strokeWidth={1}
        />
      );
    }

    return lines;
  };

  return (
    <div className="flex-1 flex flex-col bg-background border border-border rounded-xl overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border-b border-border bg-card gap-3 sm:gap-0">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-8 g:mt-0">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomOut}
              className="w-8 h-8 p-0"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium text-foreground min-w-[50px] sm:min-w-[60px] text-center">
              {zoom}%
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomIn}
              className="w-8 h-8 p-0"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
              onClick={handleReset}
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="w-8 h-8 p-0"
              onClick={handleUndo}
              disabled={historyIndex <= 0}
            >
              <Undo className="w-4 h-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="w-8 h-8 p-0"
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
            >
              <Redo className="w-4 h-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
              onClick={handleClearAll}
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Clear All</span>
            </Button>

            <Button
              variant={showGrid ? "default" : "outline"}
              size="sm"
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
              onClick={() => setShowGrid(!showGrid)}
            >
              <Grid3x3 className="w-4 h-4" />
              <span className="hidden sm:inline">Grid</span>
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="outline" size="sm" className="w-8 h-8 p-0">
            <Search className="w-4 h-4" />
          </Button>
          <span className="text-xs sm:text-sm text-muted-foreground">
            Elements {elements.length + poiElements.length + entranceElements.length + elevatorElements.length + paths.length + restrictedZones.length + labels.length + measurements.length + annotations.length}
          </span>
        </div>
      </div>

      <div 
        ref={containerRef} 
        className="flex-1 relative min-h-0"
          style={{
          cursor: selectedTool === "path" 
            ? (isDrawing ? "crosshair" : "crosshair")
            : selectedTool === "restricted"
            ? (isDrawingZone ? "crosshair" : "crosshair")
            : selectedTool === "measure"
            ? "crosshair"
            : selectedTool === "poi" || selectedTool === "entrance" || selectedTool === "elevator" || selectedTool === "label" || selectedTool === "annotation"
            ? "crosshair"
            : "default"
        }}
      >
        <Stage
          ref={stageRef}
          width={stageSize.width}
          height={stageSize.height}
          className="w-full h-full"
          onClick={handleStageClick}
          onDblClick={handleStageDoubleClick}
          onMouseMove={handleStageMouseMove}
          onMouseUp={handleStageMouseUp}
        >
          <Layer>
            {drawGrid()}
            {elements.map(renderElement)}
            {poiElements.map(renderElement)}
            {entranceElements.map(renderElement)}
            {elevatorElements.map(renderElement)}
            {paths
              .filter((path: MapEditorPath) => path.isActive && path.points && path.points.length >= 2)
              .map((path: MapEditorPath) => {
                const pathPoints = path.points.flatMap((point) => [point.x, point.y]);
                return (
                  <Line
                    key={path.id}
                    points={pathPoints}
                    stroke={path.color || "#2563EB"}
                    strokeWidth={path.strokeWidth || 3}
                    tension={0.5}
                    lineCap="round"
                    lineJoin="round"
                    draggable={false}
                  />
                );
              })}
            {isDrawing && drawingPath.length > 0 && (
              <>
                <Line
                  points={drawingPath.flatMap((point) => [point.x, point.y])}
                  stroke="#2563EB"
                  strokeWidth={3}
                  tension={0.5}
                  lineCap="round"
                  lineJoin="round"
                  dash={[10, 5]}
                />
                {drawingPath.map((point, index) => (
                  <Circle
                    key={`drawing-${index}`}
                    x={point.x}
                    y={point.y}
                    radius={4}
                    fill="#2563EB"
                    stroke="#fff"
                    strokeWidth={1}
                  />
                ))}
              </>
            )}
            {restrictedZones
              .filter((zone: MapEditorRestrictedZone) => zone.isActive && zone.coordinates)
              .map((zone: MapEditorRestrictedZone) => {
                const zoneColor = zone.color || "#EF4444";
                const hexToRgba = (hex: string, alpha: number) => {
                  const r = parseInt(hex.slice(1, 3), 16);
                  const g = parseInt(hex.slice(3, 5), 16);
                  const b = parseInt(hex.slice(5, 7), 16);
                  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
                };
                return (
                  <Group
                    key={zone.id}
                    x={zone.coordinates.x}
                    y={zone.coordinates.y}
                    draggable={true}
                    onDragEnd={(e) =>
                      handleDragEnd(
                        zone.id,
                        e.target.x(),
                        e.target.y(),
                        zone.coordinates.width,
                        zone.coordinates.height
                      )
                    }
                  >
                    <Rect
                      x={0}
                      y={0}
                      width={zone.coordinates.width}
                      height={zone.coordinates.height}
                      fill={hexToRgba(zoneColor, 0.2)}
                      stroke={zoneColor}
                      strokeWidth={2}
                      cornerRadius={4}
                      dash={[5, 5]}
                    />
                    {zone.name && (
                      <Text
                        x={5}
                        y={5}
                        text={zone.name}
                        fontSize={12}
                        fontFamily="Arial"
                        fontWeight="500"
                        fill={zoneColor}
                      />
                    )}
                  </Group>
                );
              })}
            {isDrawingZone && zoneStart && zoneCurrent && (
              <Rect
                x={Math.min(zoneStart.x, zoneCurrent.x)}
                y={Math.min(zoneStart.y, zoneCurrent.y)}
                width={Math.abs(zoneCurrent.x - zoneStart.x)}
                height={Math.abs(zoneCurrent.y - zoneStart.y)}
                fill="rgba(239, 68, 68, 0.2)"
                stroke="#EF4444"
                strokeWidth={2}
                cornerRadius={4}
                dash={[5, 5]}
              />
            )}
            {labels
              .filter((label: MapEditorLabel) => label.isActive && label.coordinates)
              .map((label: MapEditorLabel) => {
                const fontSize = parseInt(label.fontSize?.replace("px", "") || "16");
                const fontWeight = label.fontWeight === "Bold" ? "bold" : "normal";
                return (
                  <Group
                    key={label.id}
                    x={label.coordinates.x}
                    y={label.coordinates.y}
                    draggable={true}
                    onDragEnd={(e) =>
                      handleDragEnd(
                        label.id,
                        e.target.x(),
                        e.target.y()
                      )
                    }
                  >
                    <Text
                      x={0}
                      y={0}
                      text={label.text}
                      fontSize={fontSize}
                      fontFamily="Arial"
                      fontWeight={fontWeight}
                      fill={label.color || "#000000"}
                    />
                  </Group>
                );
              })}
            {measurements
              .filter((measurement: MapEditorMeasurement) => measurement.isActive)
              .map((measurement: MapEditorMeasurement) => {
                const midX = (measurement.startPoint.x + measurement.endPoint.x) / 2;
                const midY = (measurement.startPoint.y + measurement.endPoint.y) / 2;
                return (
                  <Group key={measurement.id}>
                    <Line
                      points={[
                        measurement.startPoint.x,
                        measurement.startPoint.y,
                        measurement.endPoint.x,
                        measurement.endPoint.y,
                      ]}
                      stroke={measurement.color || "#2563EB"}
                      strokeWidth={measurement.strokeWidth || 2}
                      lineCap="round"
                      lineJoin="round"
                    />
                    <Circle
                      x={measurement.startPoint.x}
                      y={measurement.startPoint.y}
                      radius={4}
                      fill={measurement.color || "#2563EB"}
                      stroke="#fff"
                      strokeWidth={1}
                    />
                    <Circle
                      x={measurement.endPoint.x}
                      y={measurement.endPoint.y}
                      radius={4}
                      fill={measurement.color || "#2563EB"}
                      stroke="#fff"
                      strokeWidth={1}
                    />
                    <Text
                      x={midX}
                      y={midY - 20}
                      text={`${measurement.distance} ${measurement.unit}`}
                      fontSize={12}
                      fontFamily="Arial"
                      fontWeight="bold"
                      fill={measurement.color || "#2563EB"}
                      align="center"
                      offsetX={30}
                    />
                  </Group>
                );
              })}
            {isMeasuring && measureStart && measureEnd && (
              <Group>
                <Line
                  points={[
                    measureStart.x,
                    measureStart.y,
                    measureEnd.x,
                    measureEnd.y,
                  ]}
                  stroke="#2563EB"
                  strokeWidth={2}
                  lineCap="round"
                  lineJoin="round"
                  dash={[10, 5]}
                />
                <Circle
                  x={measureStart.x}
                  y={measureStart.y}
                  radius={4}
                  fill="#2563EB"
                  stroke="#fff"
                  strokeWidth={1}
                />
                <Circle
                  x={measureEnd.x}
                  y={measureEnd.y}
                  radius={4}
                  fill="#2563EB"
                  stroke="#fff"
                  strokeWidth={1}
                />
                <Text
                  x={(measureStart.x + measureEnd.x) / 2}
                  y={(measureStart.y + measureEnd.y) / 2 - 20}
                  text={`${Math.round(
                    Math.sqrt(
                      Math.pow(measureEnd.x - measureStart.x, 2) +
                      Math.pow(measureEnd.y - measureStart.y, 2)
                    )
                  )} meters`}
                  fontSize={12}
                  fontFamily="Arial"
                  fontWeight="bold"
                  fill="#2563EB"
                  align="center"
                  offsetX={30}
                />
              </Group>
            )}
            {annotations
              .filter((annotation: MapEditorAnnotation) => annotation.isActive && annotation.coordinates)
              .map((annotation: MapEditorAnnotation) => {
                const annotationColor = annotation.color || "#F59E0B";
                return (
                  <Group
                    key={annotation.id}
                    x={annotation.coordinates.x}
                    y={annotation.coordinates.y}
                    draggable={true}
                    onDragEnd={(e) =>
                      handleDragEnd(
                        annotation.id,
                        e.target.x(),
                        e.target.y()
                      )
                    }
                  >
                    <Circle
                      x={0}
                      y={0}
                      radius={12}
                      fill={annotationColor}
                      stroke="#fff"
                      strokeWidth={2}
                    />
                    <Text
                      x={0}
                      y={0}
                      text="i"
                      fontSize={14}
                      fontFamily="Arial"
                      fontWeight="bold"
                      fill="#fff"
                      align="center"
                      verticalAlign="middle"
                      offsetX={3}
                      offsetY={7}
                    />
                    <Text
                      x={20}
                      y={-8}
                      text={annotation.name}
                      fontSize={12}
                      fontFamily="Arial"
                      fontWeight="500"
                      fill={annotationColor}
                      wrap="none"
                    />
                  </Group>
                );
              })}
          </Layer>
        </Stage>

        <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
          {selectedTool === "path" && isDrawing ? (
            <span className="hidden sm:inline">
              Click to add points, Double-click to finish path
            </span>
          ) : selectedTool === "measure" ? (
            <span className="hidden sm:inline">
              Click two points to measure distance
            </span>
          ) : (
            <>
              <span className="hidden sm:inline">
                Click on map to add POIs + Drag to move elements
              </span>
              <span className="sm:hidden">Click to add POIs</span>
            </>
          )}
        </div>
        {isDrawing && (
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={cancelPathDrawing}
              className="bg-background/80 backdrop-blur-sm"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel Path
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleSavePath}
              disabled={drawingPath.length < 2}
              className="bg-[#3D8C6C] hover:bg-[#3D8C6C]/90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Check className="w-4 h-4 mr-2" />
              Save Path
            </Button>
          </div>
        )}
      </div>

      {/* Clear All Confirmation Dialog */}
      <Dialog open={showClearAllDialog} onOpenChange={setShowClearAllDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-card-foreground">
              Clear All Elements
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground pt-2">
              Are you sure you want to clear all elements from the canvas? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-3 sm:gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowClearAllDialog(false)}
              className="px-5 py-2.5 text-sm font-medium text-muted-foreground bg-transparent border border-border rounded-lg hover:bg-accent transition-colors cursor-pointer flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </Button>
            <Button
              type="button"
              onClick={confirmClearAll}
              className="px-5 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors cursor-pointer flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
