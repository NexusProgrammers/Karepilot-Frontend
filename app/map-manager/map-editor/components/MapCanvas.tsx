"use client";

import { useState, useRef, useEffect } from "react";
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
import toast from "react-hot-toast";

interface MapElement {
  id: string;
  type: "poi" | "path" | "zone" | "label" | "entrance";
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
  selectedTool?: string | null;
}

export function MapCanvas({ floorPlanId, onPOIClick, selectedTool }: MapCanvasProps) {
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

  const [updatePOI] = useUpdatePOIMutation();

  const [elements, setElements] = useState<MapElement[]>([]);

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

  const handleDragEnd = async (id: string, newX: number, newY: number) => {
    const poi = poiMap.get(id);
    
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
    } else {
      const newElements = elements.map((el) =>
        el.id === id ? { ...el, x: newX, y: newY } : el
      );
      setElements(newElements);
      saveToHistory(newElements);
    }
  };

  const handleStageClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (selectedTool === "poi" && onPOIClick) {
      const stage = e.target.getStage();
      if (stage) {
        const pointerPos = stage.getPointerPosition();
        if (pointerPos) {
          onPOIClick({ x: pointerPos.x, y: pointerPos.y });
        }
      }
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

  const poiMap = new Map(pois.map((poi: MapEditorPOI) => [poi.id, poi]));

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
            Elements {elements.length + poiElements.length}
          </span>
        </div>
      </div>

      <div ref={containerRef} className="flex-1 relative min-h-0">
        <Stage
          ref={stageRef}
          width={stageSize.width}
          height={stageSize.height}
          className="w-full h-full"
          onClick={handleStageClick}
        >
          <Layer>
            {drawGrid()}
            {elements.map(renderElement)}
            {poiElements.map(renderElement)}
          </Layer>
        </Stage>

        <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
          <span className="hidden sm:inline">
            Click on map to add POIs + Drag to move elements
          </span>
          <span className="sm:hidden">Click to add POIs</span>
        </div>
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
