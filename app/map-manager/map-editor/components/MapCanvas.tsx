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
} from "@/icons/Icons";
import { Button } from "@/components/ui/button";

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

export function MapCanvas() {
  const [zoom, setZoom] = useState(100);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const stageRef = useRef<Konva.Stage>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [elements, setElements] = useState<MapElement[]>([
    {
      id: "zone1",
      type: "zone",
      x: 100,
      y: 100,
      width: 150,
      height: 80,
      color: "#D4EDDA",
      label: "Zone 1",
      draggable: true,
    },
    {
      id: "zone2",
      type: "zone",
      x: 600,
      y: 100,
      width: 150,
      height: 80,
      color: "#F8D7DA",
      label: "Zone 2",
      draggable: true,
    },
    {
      id: "zone3",
      type: "zone",
      x: 600,
      y: 450,
      width: 150,
      height: 80,
      color: "#FFEECF",
      label: "Zone 3",
      draggable: true,
    },
    {
      id: "toilet",
      type: "zone",
      x: 100,
      y: 450,
      width: 120,
      height: 70,
      color: "#FFEECF",
      label: "Toilet",
      draggable: true,
    },
    {
      id: "cafeteria",
      type: "zone",
      x: 350,
      y: 250,
      width: 180,
      height: 100,
      color: "#D1ECF1",
      label: "Cafeteria",
      draggable: true,
    },
    {
      id: "meeting-room",
      type: "zone",
      x: 550,
      y: 280,
      width: 160,
      height: 80,
      color: "#FFEECF",
      label: "Meeting Room",
      draggable: true,
    },
    {
      id: "office-space",
      type: "zone",
      x: 150,
      y: 280,
      width: 180,
      height: 80,
      color: "#FFEECF",
      label: "Office Space",
      draggable: true,
    },
    {
      id: "reception",
      type: "zone",
      x: 150,
      y: 380,
      width: 180,
      height: 80,
      color: "#FFEECF",
      label: "Reception",
      draggable: true,
    },

    {
      id: "poi1",
      type: "poi",
      x: 200,
      y: 200,
      radius: 8,
      color: "red",
      draggable: true,
    },
    {
      id: "poi2",
      type: "poi",
      x: 650,
      y: 400,
      radius: 8,
      color: "black",
      draggable: true,
    },

    {
      id: "label1",
      type: "label",
      x: 120,
      y: 530,
      color: "black",
      label: "Entry Point",
      draggable: true,
    },
    {
      id: "label2",
      type: "label",
      x: 620,
      y: 420,
      color: "black",
      label: "Main Road",
      draggable: true,
    },

    {
      id: "path1",
      type: "path",
      points: [100, 520, 100, 550, 300, 550, 300, 350, 400, 350],
      color: "#007bff",
      stroke: "#007bff",
      strokeWidth: 3,
      tension: 0.5,
      pointerLength: 10,
      pointerWidth: 10,
      draggable: true,
    },
  ]);

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

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 10, 200));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 10, 50));

  const handleDragEnd = (id: string, newX: number, newY: number) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, x: newX, y: newY } : el))
    );
  };

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
        return (
          <Circle
            key={element.id}
            x={element.x}
            y={element.y}
            radius={element.radius || 8}
            fill={element.color}
            stroke="#fff"
            strokeWidth={2}
            draggable={element.draggable}
            onDragEnd={(e) =>
              handleDragEnd(element.id, e.target.x(), e.target.y())
            }
          />
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
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset</span>
            </Button>

            <Button variant="outline" size="sm" className="w-8 h-8 p-0">
              <Undo className="w-4 h-4" />
            </Button>

            <Button variant="outline" size="sm" className="w-8 h-8 p-0">
              <Redo className="w-4 h-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
              onClick={() => setElements([])}
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Clear All</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
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
            Elements {elements.length}
          </span>
        </div>
      </div>

      <div ref={containerRef} className="flex-1 relative min-h-0">
        <Stage
          ref={stageRef}
          width={stageSize.width}
          height={stageSize.height}
          className="w-full h-full"
        >
          <Layer>
            {drawGrid()}
            {elements.map(renderElement)}
          </Layer>
        </Stage>

        <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
          <span className="hidden sm:inline">
            Click on map to add POIs + Drag to move elements
          </span>
          <span className="sm:hidden">Click to add POIs</span>
        </div>
      </div>
    </div>
  );
}
