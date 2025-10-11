"use client";

import { featureUsageData, geoChartData, geoChartOptions } from "@/lib/analytics/data";
import React from "react";
import { Chart } from "react-google-charts";

export default function FeatureUsageChart() {
  
  return (
    <div className="bg-background border border-border rounded-xl p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">
          Feature Usage
        </h3>
        <p className="text-sm text-muted-foreground">
          Most popular features and their usage
        </p>
      </div>

      <div className="mb-6">
        <div className="h-48 rounded-lg overflow-hidden border border-border bg-muted/20">
          <Chart
            chartType="GeoChart"
            width="100%"
            height="100%"
            data={geoChartData}
            options={geoChartOptions}
          />
        </div>
      </div>

      <div className="space-y-4">
        {featureUsageData.map((feature, index) => {
          const percentage = (feature.value / feature.max) * 100;

          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-foreground">
                  {feature.name}:
                </span>
                <span className="text-sm text-muted-foreground">
                  {feature.name.includes("Map Views")
                    ? feature.value
                    : `${feature.value}%`}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-blue-500 h-1 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
