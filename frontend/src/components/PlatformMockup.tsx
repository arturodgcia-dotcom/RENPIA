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
  kanban: ["Dashboard", "Sprint", "Proyectos"],
  ecommerce: ["Tienda", "Catalogo", "Ventas"],
  marketing: ["Campanas", "Calendario", "Metricas"],
  hr: ["Empleados", "Asistencia", "Reportes"],
  dashboard: ["CRM", "Agente IA", "Dashboards"],
  consultoria: ["Workshop", "Proceso", "Insights"],
};

const modules: Record<FallbackType, string[]> = {
  kanban: ["Dashboard principal", "Scrumboard o tablero de sprints", "Vista de proyectos"],
  ecommerce: ["Landing o tienda", "Catalogo de productos", "Dashboard comercial"],
  marketing: ["Campanas", "Calendario de publicaciones", "Reportes o metricas"],
  hr: ["Panel de empleados", "Control de asistencia", "Reportes laborales"],
  dashboard: ["CRM personalizado", "Agente IA atencion 24/7", "Dashboards inteligentes"],
  consultoria: ["Workshop", "Proceso", "Insights"],
};

export function PlatformMockup({
  fallbackType,
  mode = "card",
  title,
}: PlatformMockupProps) {
  const currentModules = modules[fallbackType];
  const isConsultoria = fallbackType === "consultoria";

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
        <div className="platform-mockup__sidebar">
          {currentModules.map((module) => (
            <span key={module} className="platform-mockup__sidebar-item">
              {module}
            </span>
          ))}
        </div>
        <div className="platform-mockup__main">
          <div className="platform-mockup__headline" />
          <div className="platform-mockup__grid">
            {isConsultoria
              ? (
                <>
                  <span />
                  <span />
                  <span />
                </>
              )
              : currentModules.map((module) => (
                  <article key={module} className="platform-mockup__module">
                    <strong className="platform-mockup__module-title">{module}</strong>
                    <span className="platform-mockup__module-line platform-mockup__module-line--strong" />
                    <span className="platform-mockup__module-line" />
                    <span className="platform-mockup__module-line platform-mockup__module-line--short" />
                  </article>
                ))}
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
