export type FallbackType =
  | "kanban"
  | "ecommerce"
  | "marketing"
  | "hr"
  | "dashboard"
  | "consultoria";

type PlatformMockupProps = {
  fallbackType: FallbackType;
  mode?: "card" | "compact" | "laptop" | "hero";
  title?: string;
};

const labels: Record<FallbackType, string[]> = {
  kanban: ["Backlog", "Sprint", "KPIs"],
  ecommerce: ["Catalogo", "Pedidos", "Carrito"],
  marketing: ["Campanas", "Calendario", "ROI"],
  hr: ["Personal", "Asistencia", "Reportes"],
  dashboard: ["CRM", "Agente IA", "Dashboards"],
  consultoria: ["Workshop", "Proceso", "Insights"],
};

export function PlatformMockup({
  fallbackType,
  mode = "card",
  title,
}: PlatformMockupProps) {
  return (
    <div className={`platform-mockup platform-mockup--${fallbackType} platform-mockup--${mode}`}>
      {title ? <span className="platform-mockup__title">{title}</span> : null}
      <div className="platform-mockup__toolbar">
        <span />
        <span />
        <span />
      </div>
      <div className="platform-mockup__chips">
        {labels[fallbackType].map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
      <div className="platform-mockup__workspace">
        <div className="platform-mockup__sidebar" />
        <div className="platform-mockup__main">
          <div className="platform-mockup__headline" />
          <div className="platform-mockup__grid">
            <span />
            <span />
            <span />
          </div>
          <div className="platform-mockup__chart">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
      {mode === "laptop" ? <div className="platform-mockup__base" /> : null}
    </div>
  );
}
