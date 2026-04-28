import { useI18n } from "../i18n/I18nProvider";

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

const labels = {
  kanban: {
    es: ["Dashboard", "Sprint", "Proyectos"],
    en: ["Dashboard", "Sprint", "Projects"],
  },
  ecommerce: {
    es: ["Tienda", "Catalogo", "Ventas"],
    en: ["Store", "Catalog", "Sales"],
  },
  marketing: {
    es: ["Campanas", "Calendario", "Metricas"],
    en: ["Campaigns", "Calendar", "Metrics"],
  },
  hr: {
    es: ["Empleados", "Asistencia", "Reportes"],
    en: ["Employees", "Attendance", "Reports"],
  },
  dashboard: {
    es: ["CRM", "Agente IA", "Dashboards"],
    en: ["CRM", "AI agent", "Dashboards"],
  },
  consultoria: {
    es: ["Workshop", "Proceso", "Insights"],
    en: ["Workshop", "Process", "Insights"],
  },
};

const modules = {
  kanban: {
    es: ["Dashboard principal", "Scrumboard o tablero de sprints", "Vista de proyectos"],
    en: ["Executive dashboard", "Scrum board", "Project view"],
  },
  ecommerce: {
    es: ["Landing o tienda", "Catalogo de productos", "Dashboard comercial"],
    en: ["Storefront", "Product catalog", "Commercial dashboard"],
  },
  marketing: {
    es: ["Campanas", "Calendario de publicaciones", "Reportes o metricas"],
    en: ["Campaigns", "Publishing calendar", "Reports and metrics"],
  },
  hr: {
    es: ["Panel de empleados", "Control de asistencia", "Reportes laborales"],
    en: ["Employee panel", "Attendance control", "Workforce reports"],
  },
  dashboard: {
    es: ["CRM personalizado", "Agente IA atencion 24/7", "Dashboards inteligentes"],
    en: ["Custom CRM", "24/7 AI agent", "Smart dashboards"],
  },
  consultoria: {
    es: ["Workshop", "Proceso", "Insights"],
    en: ["Workshop", "Process", "Insights"],
  },
};

export function PlatformMockup({
  fallbackType,
  mode = "card",
  title,
}: PlatformMockupProps) {
  const { locale } = useI18n();
  const currentModules = modules[fallbackType][locale];
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
        {labels[fallbackType][locale].map((label) => (
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
