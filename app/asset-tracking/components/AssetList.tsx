import { Asset } from "@/lib/asset-tracking/types";
import { AssetCard } from "./AssetCard";

interface AssetListProps {
  assets: Asset[];
}

export function AssetList({ assets }: AssetListProps) {
  return (
    <div className="space-y-4">
      {assets.map((asset) => (
        <AssetCard key={asset.id} asset={asset} />
      ))}
    </div>
  );
}
