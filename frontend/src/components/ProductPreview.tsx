import type { Product } from "../data/siteContent";
import { PlatformMockup } from "./PlatformMockup";

type ProductPreviewProps = {
  variant: Product["preview"];
  mode?: "card" | "compact" | "laptop";
};

export function ProductPreview({ variant, mode = "card" }: ProductPreviewProps) {
  return (
    <div className={`product-preview product-preview--${variant}`}>
      <PlatformMockup variant={variant} mode={mode} />
    </div>
  );
}
