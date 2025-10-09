import { Map, Building, Users } from "lucide-react";

interface AssetMapProps {
  selectedBuilding: string;
}

export function AssetMap({ selectedBuilding }: AssetMapProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-card-foreground mb-1">
          Real-time Asset Map
        </h3>
        <p className="text-sm text-muted-foreground">
          Live tracking of assets across hospital buildings
        </p>
      </div>

      <div className="relative bg-muted/30 rounded-lg h-[400px] border border-border overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Map className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-sm text-muted-foreground">
              Interactive asset tracking map
            </p>
          </div>
        </div>

        <div className="absolute top-6 left-6">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
            <Building className="w-3 h-3 text-white" />
          </div>
        </div>

        <div className="absolute top-16 right-12">
          <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
            <Users className="w-3 h-3 text-white" />
          </div>
        </div>

        <div className="absolute bottom-20 left-1/3">
          <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
            <Building className="w-3 h-3 text-white" />
          </div>
        </div>

        <div className="absolute top-1/2 right-8">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
            <Users className="w-3 h-3 text-white" />
          </div>
        </div>

        <div className="absolute bottom-12 right-1/4">
          <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
            <Building className="w-3 h-3 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
