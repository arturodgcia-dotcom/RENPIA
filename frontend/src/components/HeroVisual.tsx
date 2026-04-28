import { DashboardMockup } from "./DashboardMockup";
import { ProductPreview } from "./ProductPreview";

const productPills = [
  "SprintPilot",
  "ComerCia",
  "Nervia",
  "JornadaLaboral360",
] as const;

export function HeroVisual() {
  return (
    <div className="hero-visual">
      <div className="hero-visual__scene">
        <ProductPreview
          image="/renpia-assets/hero-consultoria.png"
          fallbackType="consultoria"
          mode="hero"
          title="Consultoria RENPIA"
          alt="Equipo de consultoria RENPIA trabajando con tecnologia"
        />
        <div className="hero-visual__floating hero-visual__floating--left">
          <span>Diagnostico</span>
          <strong>Procesos + IA</strong>
        </div>
        <div className="hero-visual__floating hero-visual__floating--right">
          <span>Automatizacion</span>
          <strong>24 flujos activos</strong>
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
