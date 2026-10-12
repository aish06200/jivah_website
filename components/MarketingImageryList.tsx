import { AssetDownloadSection } from "@/components/AssetDownloadSection";
import { marketingAssets, marketingAssetsZip } from "@/lib/marketingAssets";

export function MarketingImageryList() {
  return (
    <AssetDownloadSection
      id="homepage-imagery"
      title="Homepage imagery"
      description="Hero and active-project card photos as shown on the homepage."
      assets={marketingAssets}
      zip={marketingAssetsZip}
    />
  );
}
