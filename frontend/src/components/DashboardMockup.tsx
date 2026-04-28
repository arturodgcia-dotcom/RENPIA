import { heroMetrics } from "../data/siteContent";
import { MetricCard } from "./MetricCard";

export function DashboardMockup() {
  return (
    <div className="dashboard-mockup">
      <div className="dashboard-mockup__topbar">
        <span className="status-dot" />
        <span>Dashboard RENPIA</span>
        <strong>Estado operativo</strong>
      </div>

      <div className="dashboard-mockup__hero">
        <div>
          <small>Inteligencia aplicada</small>
          <strong>Operacion, ventas y crecimiento</strong>
        </div>
        <div className="dashboard-mockup__ring" />
      </div>

      <div className="dashboard-mockup__metrics">
        {heroMetrics.map((metric) => (
          <MetricCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            tone={metric.tone}
          />
        ))}
      </div>
    </div>
  );
}
