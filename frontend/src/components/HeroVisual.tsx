import { DashboardMockup } from "./DashboardMockup";
import { ProductPreview } from "./ProductPreview";
import { siteAssets } from "../config/siteAssets";
import { useI18n } from "../i18n/I18nProvider";

const productPills = [
  "SprintPilot",
  "ComerCia",
  "Nervia",
  "JornadaLaboral360",
] as const;

export function HeroVisual() {
  const { content } = useI18n();

  return (
    <div className="hero-visual">
      <div className="hero-visual__scene">
        <ProductPreview
          image={siteAssets.hero.consultoria}
          fallbackType="consultoria"
          mode="hero"
          title="Consultoria REINPIA"
          alt="Equipo de consultoria REINPIA trabajando con tecnologia"
        />
        <div className="hero-visual__floating hero-visual__floating--left">
          <span>{content.hero.floatingLeftLabel}</span>
          <strong>{content.hero.floatingLeftValue}</strong>
        </div>
        <div className="hero-visual__floating hero-visual__floating--right">
          <span>{content.hero.floatingRightLabel}</span>
          <strong>{content.hero.floatingRightValue}</strong>
        </div>
      </div>

      <div className="hero-visual__dashboard">
        <DashboardMockup />
      </div>

      <div className="hero-visual__pills">
        {productPills.map((pill) => (
          <span key={pill}>{pill}</span>
        ))}
      </div>
    </div>
  );
}
