import { AssetDownloadSection } from "@/components/AssetDownloadSection";
import { brandAssets, brandAssetsZip } from "@/lib/brandAssets";

export function BrandAssetsList() {
  return (
    <AssetDownloadSection
      id="brand-assets"
      title="Jivah brand assets"
      description="Logos and the bar mark for partners, press and presentations. Use on white or brand-colour backgrounds; do not stretch or recolour without approval."
      assets={brandAssets}
      zip={brandAssetsZip}
    />
  );
}
