"use client";

import { userDemographicsData } from '@/lib/analytics/data';

interface UserDemographicsProps {
  className?: string;
}

export function UserDemographics({ className = "" }: UserDemographicsProps) {
  return (
    <div className={`bg-background border border-border rounded-xl p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">User Demographics</h3>
        <p className="text-sm text-muted-foreground">Most popular features and their usage</p>
      </div>

      <div className="space-y-4">
        {userDemographicsData.map((demographic, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: demographic.color }}
              />
              <span className="text-sm font-medium text-foreground">{demographic.category}</span>
            </div>
            <span className="text-sm text-muted-foreground">{demographic.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}