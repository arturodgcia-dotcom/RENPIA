import { useI18n } from "../i18n/I18nProvider";
import { MetricCard } from "./MetricCard";

export function DashboardMockup() {
  const { locale } = useI18n();
  const heroMetrics = [
    {
      label: locale === "es" ? "Ingresos" : "Revenue",
      value: "+32.4%",
      tone: "cyan" as const,
    },
    {
      label: locale === "es" ? "Productividad" : "Productivity",
      value: "+28.7%",
      tone: "violet" as const,
    },
    {
      label: locale === "es" ? "Tiempo de ciclo" : "Cycle time",
      value: "-41%",
      tone: "emerald" as const,
    },
    {
      label: locale === "es" ? "Automatizaciones activas" : "Active automations",
      value: "24",
      tone: "cyan" as const,
    },
    {
      label: locale === "es" ? "Agentes IA activos" : "Active AI agents",
      value: "12",
      tone: "violet" as const,
    },
    {
      label: locale === "es" ? "Procesos optimizados" : "Optimized processes",
      value: "58",
      tone: "emerald" as const,
    },
  ];

  return (
    <div className="dashboard-mockup">
      <div className="dashboard-mockup__topbar">
        <span className="status-dot" />
        <span>Dashboard REINPIA</span>
        <strong>{locale === "es" ? "Estado operativo" : "Operational status"}</strong>
      </div>

      <div className="dashboard-mockup__hero">
        <div>
          <small>{locale === "es" ? "Inteligencia aplicada" : "Applied intelligence"}</small>
          <strong>{locale === "es" ? "Operacion, ventas y crecimiento" : "Operations, sales and growth"}</strong>
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
