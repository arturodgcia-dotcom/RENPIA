import { DashboardMockup } from "./DashboardMockup";

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
        <div className="hero-visual__label">Consultoria RENPIA</div>
        <div className="hero-visual__people">
          <div className="hero-visual__person hero-visual__person--one" />
          <div className="hero-visual__person hero-visual__person--two" />
        </div>
        <div className="hero-visual__desk" />
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
