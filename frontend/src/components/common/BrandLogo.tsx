import { siteAssets } from "../../config/siteAssets";

type BrandLogoProps = {
  compact?: boolean;
};

export function BrandLogo({ compact = false }: BrandLogoProps) {
  return (
    <span className={`brand-lockup ${compact ? "brand-lockup--compact" : ""}`}>
      <span className="brand-lockup__image-wrap">
        <img
          className="brand-lockup__image"
          src={siteAssets.brand.logo}
          alt="Logo REINPIA"
          loading="eager"
          decoding="async"
        />
      </span>
      <span>
        <strong>REINPIA</strong>
        <small>AI-driven process reengineering</small>
      </span>
    </span>
  );
}
