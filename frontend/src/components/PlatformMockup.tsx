type PlatformVariant =
  | "sprintpilot"
  | "comercia"
  | "nervia"
  | "jornada360"
  | "custom"
  | "consultoria";

type PlatformMockupProps = {
  variant: PlatformVariant;
  mode?: "card" | "compact" | "laptop";
};

const labels: Record<PlatformVariant, string[]> = {
  sprintpilot: ["Backlog", "Sprint", "KPIs"],
  comercia: ["Catalogo", "Pedidos", "Carrito"],
  nervia: ["Campanas", "Calendario", "ROI"],
  jornada360: ["Personal", "Asistencia", "Reportes"],
  custom: ["CRM", "Agente IA", "Dashboards"],
  consultoria: ["Workshop", "Proceso", "Insights"],
};

export function PlatformMockup({ variant, mode = "card" }: PlatformMockupProps) {
  return (
    <div className={`platform-mockup platform-mockup--${variant} platform-mockup--${mode}`}>
      <div className="platform-mockup__toolbar">
        <span />
        <span />
        <span />
      </div>
      <div className="platform-mockup__chips">
        {labels[variant].map((label) => (
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
