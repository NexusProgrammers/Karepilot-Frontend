/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface LineData {
  [key: string]: string | number;
}

interface LineConfig {
  dataKey: string;
  stroke: string;
  strokeWidth?: number;
  strokeDasharray?: string;
  dot?: any;
  name: string;
}

interface LineChartComponentProps {
  data: LineData[];
  lines: LineConfig[];
  height?: number;
  yAxisFormatter?: (value: number) => string;
  yAxisDomain?: [number, number];
}

export function LineChartComponent({
  data,
  lines,
  height = 320,
  yAxisFormatter = (value) => `${value}M`,
  yAxisDomain = [0, 30],
}: LineChartComponentProps) {
  return (
    <div style={{ height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis
            dataKey={Object.keys(data[0])[0]}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            domain={yAxisDomain}
            tickFormatter={yAxisFormatter}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              color: "hsl(var(--popover-foreground))",
              fontSize: "12px",
            }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: "20px",
              fontSize: "12px",
            }}
          />
          {lines.map((line, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.stroke}
              strokeWidth={line.strokeWidth || 2}
              strokeDasharray={line.strokeDasharray}
              dot={line.dot || { fill: line.stroke, strokeWidth: 2, r: 4 }}
              name={line.name}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
