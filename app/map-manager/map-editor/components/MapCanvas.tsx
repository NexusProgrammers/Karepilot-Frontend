"use client";

import { useState, useRef, useEffect } from "react";
import { Stage, Layer, Rect, Circle, Line } from "react-konva";
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
  type: "poi" | "path" | "zone" | "label";
  x: number;
  y: number;
  width?: number;
  height?: number;
  color: string;
  label?: string;
}

export function MapCanvas() {
  const [zoom, setZoom] = useState(100);
  const [elements, setElements] = useState<MapElement[]>([]);
  const [selectedTool] = useState<string>("poi");
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const stageRef = useRef<Konva.Stage>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const handleStageClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (selectedTool === "poi") {
      const stage = e.target.getStage();
      const pointerPosition = stage?.getPointerPosition();

      if (pointerPosition) {
        const newElement: MapElement = {
          id: `poi-${Date.now()}`,
          type: "poi",
          x: pointerPosition.x,
          y: pointerPosition.y,
          color: "#3D8C6C",
          label: "New POI",
        };
        setElements((prev) => [...prev, newElement]);
      }
    }
  };

  const renderElement = (element: MapElement) => {
    switch (element.type) {
      case "poi":
        return (
          <Circle
            key={element.id}
            x={element.x}
            y={element.y}
            radius={8}
            fill={element.color}
            stroke="#fff"
            strokeWidth={2}
            draggable
            onDragEnd={(e) => {
              const newX = e.target.x();
              const newY = e.target.y();
              setElements((prev) =>
                prev.map((el) =>
                  el.id === element.id ? { ...el, x: newX, y: newY } : el
                )
              );
            }}
          />
        );
      case "zone":
        return (
          <Rect
            key={element.id}
            x={element.x}
            y={element.y}
            width={element.width || 100}
            height={element.height || 100}
            fill={element.color}
            opacity={0.3}
            stroke={element.color}
            strokeWidth={2}
            draggable
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border-b border-border bg-card gap-3 sm:gap-0 mt-10 md:mt-0">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
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
          onClick={handleStageClick}
          className="w-full h-full"
        >
          <Layer>
            {drawGrid()}
            {elements.map(renderElement)}
          </Layer>
        </Stage>

        <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
          <span className="hidden sm:inline">Click on map to add POIs + Drag to move elements</span>
          <span className="sm:hidden">Click to add POIs</span>
        </div>
      </div>
    </div>
  );
}
