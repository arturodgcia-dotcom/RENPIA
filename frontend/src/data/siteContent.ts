import type { LocalizedText } from "../i18n/types";

export type SolutionSlug =
  | "sprintpilot"
  | "comercia"
  | "nervia"
  | "jornadalaboral360";

export type DemoSlug = "sprintpilot" | "comercia";

export type Solution = {
  slug: SolutionSlug;
  name: string;
  description: LocalizedText;
  audience: LocalizedText;
  highlight: LocalizedText;
  modules: LocalizedText[];
  benefits: LocalizedText[];
  badge?: LocalizedText;
  path: string;
  proposalPath: string;
  demoPath?: string;
};

export type Demo = {
  slug: DemoSlug;
  title: LocalizedText;
  description: LocalizedText;
  badge: LocalizedText;
  path: string;
};

export type FaqItem = {
  question: LocalizedText;
  answer: LocalizedText;
};

export type TeamMember = {
  slug: "arturo" | "isa" | "available";
  name: string;
  role: LocalizedText;
};

export const solutions: Solution[] = [
  {
    slug: "sprintpilot",
    name: "SprintPilot",
    description: {
      es: "Plataforma para gestion agil, seguimiento de proyectos, tableros, backlog y operacion basada en objetivos.",
      en: "Platform for agile management, project tracking, sprint boards, backlogs and goal-based execution.",
    },
    audience: {
      es: "Operacion y direccion",
      en: "Operations and leadership",
    },
    highlight: {
      es: "Gestion agil con foco ejecutivo",
      en: "Agile execution with executive visibility",
    },
    modules: [
      {
        es: "Dashboard principal",
        en: "Executive dashboard",
      },
      {
        es: "Scrumboard o tablero de sprints",
        en: "Scrum board and sprint workspace",
      },
      {
        es: "Vista de proyectos",
        en: "Project portfolio view",
      },
    ],
    benefits: [
      {
        es: "Mayor trazabilidad por sprint y por iniciativa",
        en: "Better visibility by sprint and initiative",
      },
      {
        es: "Seguimiento de objetivos, backlog y velocidad del equipo",
        en: "Track objectives, backlog and team velocity",
      },
      {
        es: "Paneles claros para operacion y direccion",
        en: "Clear dashboards for operations and leadership",
      },
    ],
    badge: {
      es: "Demo disponible",
      en: "Demo available",
    },
    path: "/solutions/sprintpilot",
    proposalPath: "/#contacto",
    demoPath: "/demo/sprintpilot",
  },
  {
    slug: "comercia",
    name: "ComerCia",
    description: {
      es: "Plataforma de ecommerce y marketplace para ventas online, catalogos, operacion comercial y crecimiento digital.",
      en: "Ecommerce and marketplace platform for online sales, product catalogs, commercial operations and digital growth.",
    },
    audience: {
      es: "Comercial y growth",
      en: "Sales and growth",
    },
    highlight: {
      es: "Canales digitales con control comercial",
      en: "Digital channels with commercial control",
    },
    modules: [
      {
        es: "Landing o tienda",
        en: "Storefront or landing store",
      },
      {
        es: "Catalogo de productos",
        en: "Product catalog",
      },
      {
        es: "Dashboard comercial",
        en: "Commercial dashboard",
      },
    ],
    benefits: [
      {
        es: "Operacion centralizada para ventas, pedidos y clientes",
        en: "Centralized operations for sales, orders and customers",
      },
      {
        es: "Catalogos visuales con enfoque en conversion",
        en: "Visual catalogs built for conversion",
      },
      {
        es: "Analitica comercial para decisiones rapidas",
        en: "Commercial analytics for faster decisions",
      },
    ],
    badge: {
      es: "Demo disponible",
      en: "Demo available",
    },
    path: "/solutions/comercia",
    proposalPath: "/#contacto",
    demoPath: "/demo/comercia",
  },
  {
    slug: "nervia",
    name: "Nervia",
    description: {
      es: "Plataforma para estrategia y automatizacion de marketing, campanas, contenido, analitica y apoyo con IA.",
      en: "Platform for marketing strategy and automation, campaigns, content, analytics and AI-assisted execution.",
    },
    audience: {
      es: "Marketing y crecimiento",
      en: "Marketing and growth",
    },
    highlight: {
      es: "Contenido, campanas y analitica con IA",
      en: "Content, campaigns and analytics with AI",
    },
    modules: [
      {
        es: "Campanas",
        en: "Campaigns",
      },
      {
        es: "Calendario de publicaciones",
        en: "Publishing calendar",
      },
      {
        es: "Reportes o metricas",
        en: "Reports and metrics",
      },
    ],
    benefits: [
      {
        es: "Planeacion de marketing con visibilidad multicanal",
        en: "Marketing planning with multichannel visibility",
      },
      {
        es: "Automatizacion de tareas repetitivas y seguimiento",
        en: "Automate repetitive tasks and follow-up",
      },
      {
        es: "Metricas claras para tomar decisiones comerciales",
        en: "Clear metrics for commercial decisions",
      },
    ],
    path: "/solutions/nervia",
    proposalPath: "/#contacto",
  },
  {
    slug: "jornadalaboral360",
    name: "JornadaLaboral360",
    description: {
      es: "Solucion para gestion laboral, empleados, jornadas, cumplimiento, control operativo y administracion empresarial.",
      en: "Solution for workforce management, employees, schedules, compliance, operational control and business administration.",
    },
    audience: {
      es: "RH y operacion",
      en: "HR and operations",
    },
    highlight: {
      es: "Control laboral con cumplimiento y trazabilidad",
      en: "Workforce control with compliance and traceability",
    },
    modules: [
      {
        es: "Panel de empleados",
        en: "Employee panel",
      },
      {
        es: "Control de asistencia",
        en: "Attendance control",
      },
      {
        es: "Reportes laborales",
        en: "Workforce reporting",
      },
    ],
    benefits: [
      {
        es: "Monitoreo operativo y cumplimiento por area",
        en: "Operational monitoring and compliance by area",
      },
      {
        es: "Registros claros para asistencia y jornadas",
        en: "Clear attendance and shift records",
      },
      {
        es: "Informacion util para direccion y RH",
        en: "Useful insights for leadership and HR",
      },
    ],
    path: "/solutions/jornadalaboral360",
    proposalPath: "/#contacto",
  },
];

export const demos: Demo[] = [
  {
    slug: "sprintpilot",
    title: {
      es: "Demo SprintPilot",
      en: "SprintPilot demo",
    },
    description: {
      es: "Explora seguimiento agil, scrumboard, backlog y metricas ejecutivas en un entorno demostrativo.",
      en: "Explore agile tracking, scrum board, backlog and executive metrics in a guided demo environment.",
    },
    badge: {
      es: "Disponible ahora",
      en: "Available now",
    },
    path: "/demo/sprintpilot",
  },
  {
    slug: "comercia",
    title: {
      es: "Demo ComerCia",
      en: "ComerCia demo",
    },
    description: {
      es: "Recorre catalogo, pedidos, dashboard comercial y experiencia de tienda en una vista funcional.",
      en: "Walk through the catalog, orders, commercial dashboard and store experience in a functional demo view.",
    },
    badge: {
      es: "Disponible ahora",
      en: "Available now",
    },
    path: "/demo/comercia",
  },
];

export const faqItems: FaqItem[] = [
  {
    question: {
      es: "Que hace REINPIA?",
      en: "What does REINPIA do?",
    },
    answer: {
      es: "REINPIA ayuda a empresas a mejorar procesos, ventas, servicio y crecimiento con consultoria, automatizacion, agentes de IA y software a la medida.",
      en: "REINPIA helps companies improve processes, sales, service and growth through consulting, automation, AI agents and custom software.",
    },
  },
  {
    question: {
      es: "Que tipo de soluciones desarrolla?",
      en: "What kinds of solutions does REINPIA build?",
    },
    answer: {
      es: "Desarrolla plataformas propias, automatizaciones, dashboards, integraciones, agentes personalizados y sistemas hechos para procesos especificos.",
      en: "It builds proprietary platforms, automations, dashboards, integrations, custom AI agents and systems designed for specific business processes.",
    },
  },
  {
    question: {
      es: "Puedo comprar una plataforma por separado?",
      en: "Can I buy a platform separately?",
    },
    answer: {
      es: "Si. Soluciones como SprintPilot y ComerCia pueden contratarse como productos independientes o como parte de una estrategia integral.",
      en: "Yes. Solutions such as SprintPilot and ComerCia can be acquired as standalone products or as part of a broader transformation strategy.",
    },
  },
  {
    question: {
      es: "REINPIA desarrolla sistemas personalizados?",
      en: "Does REINPIA build custom systems?",
    },
    answer: {
      es: "Si. Cuando el negocio necesita una operacion unica, REINPIA disena y construye software a la medida con enfoque estrategico y operativo.",
      en: "Yes. When a business needs a unique operation, REINPIA designs and builds custom software with a strategic and operational focus.",
    },
  },
  {
    question: {
      es: "Que demos estan disponibles?",
      en: "Which demos are available?",
    },
    answer: {
      es: "Actualmente estan disponibles las demos de SprintPilot y ComerCia como puertas de entrada al ecosistema REINPIA.",
      en: "SprintPilot and ComerCia demos are currently available as entry points into the REINPIA ecosystem.",
    },
  },
  {
    question: {
      es: "Como ayuda la IA a mi empresa?",
      en: "How can AI help my company?",
    },
    answer: {
      es: "La IA ayuda a acelerar tareas, enriquecer decisiones, automatizar seguimiento, mejorar la atencion y reducir tiempos de ciclo con mayor consistencia.",
      en: "AI helps accelerate tasks, enrich decision-making, automate follow-up, improve service and reduce cycle time with greater consistency.",
    },
  },
];

export const appointmentReasons: LocalizedText[] = [
  {
    es: "Llamada de diagnostico",
    en: "Discovery call",
  },
  {
    es: "Demo SprintPilot",
    en: "SprintPilot demo",
  },
  {
    es: "Demo ComerCia",
    en: "ComerCia demo",
  },
  {
    es: "Cotizacion para desarrollo a la medida",
    en: "Custom development quote",
  },
  {
    es: "Videollamada",
    en: "Video call",
  },
];

export const teamMembers: TeamMember[] = [
  {
    slug: "arturo",
    name: "Arturo",
    role: {
      es: "Diagnostico, arquitectura y desarrollo",
      en: "Discovery, architecture and development",
    },
  },
  {
    slug: "isa",
    name: "Isa",
    role: {
      es: "Demos, seguimiento y relacion comercial",
      en: "Demos, follow-up and commercial relationship",
    },
  },
  {
    slug: "available",
    name: "Disponible",
    role: {
      es: "Asignacion automatica segun disponibilidad",
      en: "Automatic assignment based on availability",
    },
  },
];

export function getSolutionBySlug(slug: string) {
  return solutions.find((solution) => solution.slug === slug);
}

export function getDemoBySlug(slug: string) {
  return demos.find((demo) => demo.slug === slug);
}
