import { Asset } from "@/lib/asset-tracking/types";
import { Building2 } from "lucide-react";

interface AssetCardProps {
  asset: Asset;
}

export function AssetCard({ asset }: AssetCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-100 text-green-800 dark:bg-green-950/20 dark:text-green-300";
      case "offline":
        return "bg-red-100 text-red-800 dark:bg-red-950/20 dark:text-red-300";
      case "low-battery":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/20 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-950/20 dark:text-gray-300";
    }
  };

  const getBatteryColor = (level: number) => {
    if (level > 50) return "bg-green-500";
    if (level > 20) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <h4 className="text-base font-semibold text-card-foreground mb-2">
              {asset.name}
            </h4>
          </div>
        </div>
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(asset.status)}`}
        >
          {asset.status === "low-battery" ? "Low Battery" : asset.status.charAt(0).toUpperCase() + asset.status.slice(1)}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div>
            <p className="text-sm font-medium text-card-foreground">
              {asset.location}
            </p>
            <p className="text-xs text-muted-foreground">
              {asset.building} • {asset.floor}
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">Battery</span>
            <span className="text-xs font-medium text-card-foreground">
              {asset.batteryLevel}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${getBatteryColor(asset.batteryLevel)}`}
              style={{ width: `${asset.batteryLevel}%` }}
            />
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Last seen: {asset.lastSeen}
        </p>
      </div>
    </div>
  );
}
