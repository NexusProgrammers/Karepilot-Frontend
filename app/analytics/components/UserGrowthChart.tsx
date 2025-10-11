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

const userGrowthData = [
  { month: "Jan", currentWeek: 9, previousWeek: 12 },
  { month: "Feb", currentWeek: 15, previousWeek: 14 },
  { month: "Mar", currentWeek: 17, previousWeek: 16 },
  { month: "Apr", currentWeek: 19, previousWeek: 18 },
  { month: "May", currentWeek: 21, previousWeek: 20 },
  { month: "Jun", currentWeek: 19, previousWeek: 22 },
];

interface UserGrowthChartProps {
  className?: string;
}

export function UserGrowthChart({ className = "" }: UserGrowthChartProps) {
  return (
    <div className={`bg-background border border-border rounded-xl p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">User Growth</h3>
        <p className="text-sm text-muted-foreground">Monthly active user growth</p>
      </div>

      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-green-500 rounded-full"></div>
          <span className="text-sm text-foreground">Current Week: $50,211</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-foreground">Previous Week: $60,768</span>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={userGrowthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis
              dataKey="month"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              domain={[0, 30]}
              tickFormatter={(value) => `${value}M`}
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
                fontSize: "12px"
              }}
            />
            <Line
              type="monotone"
              dataKey="currentWeek"
              stroke="#10b981"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
              name="→ Current Week"
            />
            <Line
              type="monotone"
              dataKey="previousWeek"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
              name="→ Previous Week"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
