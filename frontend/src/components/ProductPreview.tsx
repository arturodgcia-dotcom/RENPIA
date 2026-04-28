import { useEffect, useState } from "react";
import { PlatformMockup, type FallbackType } from "./PlatformMockup";

type ProductPreviewProps = {
  image?: string;
  fallbackType: FallbackType;
  title: string;
  mode?: "card" | "compact" | "laptop" | "hero";
  alt?: string;
};

export function ProductPreview({
  image,
  fallbackType,
  title,
  mode = "card",
  alt,
}: ProductPreviewProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [image]);

  return (
    <div className={`product-preview product-preview--${mode} product-preview--${fallbackType}`}>
      {image && !hasError ? (
        <img
          className="product-preview__image"
          src={image}
          alt={alt ?? title}
          loading={mode === "hero" ? "eager" : "lazy"}
          decoding="async"
          onError={() => setHasError(true)}
        />
      ) : (
        <PlatformMockup fallbackType={fallbackType} mode={mode} title={title} />
      )}
    </div>
  );
}
