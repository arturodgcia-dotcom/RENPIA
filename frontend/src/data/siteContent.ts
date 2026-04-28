export type Product = {
  name: string;
  description: string;
  badge?: string;
  audience: string;
  highlight: string;
  preview: "sprintpilot" | "comercia" | "nervia" | "jornada360";
};

export type DemoItem = {
  title: string;
  description: string;
  badge: string;
  preview: "sprintpilot" | "comercia";
};

export type NewsItem = {
  title: string;
  description: string;
  category: string;
  date: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const heroMetrics = [
  { label: "Ingresos", value: "+32.4%", tone: "cyan" },
  { label: "Productividad", value: "+28.7%", tone: "violet" },
  { label: "Tiempo de ciclo", value: "-41%", tone: "emerald" },
  { label: "Automatizaciones activas", value: "24", tone: "cyan" },
  { label: "Agentes IA activos", value: "12", tone: "violet" },
  { label: "Procesos optimizados", value: "58", tone: "emerald" },
] as const;

export const whatWeDo = [
  {
    title: "Consultoria estrategica",
    text: "Traducimos objetivos de negocio en hojas de ruta accionables con prioridades, riesgos y oportunidades claras.",
  },
  {
    title: "Reingenieria de procesos",
    text: "Redisenamos la operacion para eliminar fricciones, acelerar ciclos y mejorar la trazabilidad de punta a punta.",
  },
  {
    title: "Automatizacion con IA",
    text: "Orquestamos agentes, flujos, analitica y automatizaciones que liberan tiempo y elevan la capacidad del equipo.",
  },
  {
    title: "Desarrollo de sistemas a la medida",
    text: "Construimos software alineado a procesos, sectores y metas especificas cuando el negocio necesita algo unico.",
  },
] as const;

export const products: Product[] = [
  {
    name: "SprintPilot",
    description:
      "Plataforma para gestion agil, seguimiento de proyectos, tableros, sprints y operacion con vision ejecutiva.",
    badge: "Demo disponible",
    audience: "Operacion y direccion",
    highlight: "Tableros + seguimiento",
    preview: "sprintpilot",
  },
  {
    name: "ComerCia",
    description:
      "Ecosistema de comercio digital para marcas y empresas con enfoque en ventas, catalogos, operaciones y crecimiento.",
    badge: "Demo disponible",
    audience: "Comercial y growth",
    highlight: "Ventas + catalogos",
    preview: "comercia",
  },
  {
    name: "Nervia",
    description:
      "Plataforma para estrategia de marketing, campanas, contenido, automatizacion y crecimiento comercial con IA.",
    audience: "Marketing inteligente",
    highlight: "Contenido + automatizacion",
    preview: "nervia",
  },
  {
    name: "JornadaLaboral360",
    description:
      "Solucion para control laboral, seguimiento operativo, gestion del personal y procesos de RH.",
    audience: "RH y operacion",
    highlight: "Control + talento",
    preview: "jornada360",
  },
];

export const customDevelopmentItems = [
  "CRM y gestion comercial",
  "Portales y extranet",
  "Marketplaces y e-commerce",
  "Dashboards ejecutivos",
  "Agentes de IA personalizados",
  "Automatizacion de atencion",
  "Integraciones Google Suite",
  "Integraciones con sistemas empresariales",
] as const;

export const demos: DemoItem[] = [
  {
    title: "Demo SprintPilot",
    description: "Vista ejecutiva para sprints, proyectos, seguimiento operativo y control de avance.",
    badge: "Disponible ahora",
    preview: "sprintpilot",
  },
  {
    title: "Demo ComerCia",
    description: "Recorre pipeline comercial, catalogos, ritmo de conversion y operacion digital conectada.",
    badge: "Disponible ahora",
    preview: "comercia",
  },
];

export const newsItems: NewsItem[] = [
  {
    title: "Como la IA esta redefiniendo la productividad empresarial",
    description: "De asistentes operativos a agentes especializados: el impacto ya se mide en velocidad, foco y capacidad.",
    category: "Productividad",
    date: "28 abril 2026",
  },
  {
    title: "Ventajas competitivas de automatizar procesos con IA",
    description: "Automatizar no es solo ahorrar tiempo; es responder mejor, vender antes y operar con menos perdida.",
    category: "Automatizacion",
    date: "27 abril 2026",
  },
  {
    title: "Tendencias de agentes inteligentes para empresas",
    description: "Los equipos estan adoptando agentes conectados a datos, calendarios, ventas y servicio para ganar contexto.",
    category: "Agentes IA",
    date: "26 abril 2026",
  },
  {
    title: "IA aplicada a comercio, marketing y operacion interna",
    description: "La ventaja surge cuando marketing, ventas y operacion trabajan con una misma capa de inteligencia.",
    category: "Transformacion digital",
    date: "25 abril 2026",
  },
];

export const agendaOptions = [
  "Llamada de diagnostico",
  "Demo SprintPilot",
  "Demo ComerCia",
  "Cotizacion para desarrollo a la medida",
  "Videollamada",
] as const;

export const faqItems: FaqItem[] = [
  {
    question: "Que hace RENPIA?",
    answer:
      "RENPIA ayuda a empresas a mejorar procesos, ventas, servicio y crecimiento con consultoria, automatizacion, agentes de IA y software a la medida.",
  },
  {
    question: "Que tipo de soluciones desarrolla?",
    answer:
      "Desarrolla plataformas propias, automatizaciones, integraciones, dashboards ejecutivos, agentes personalizados y sistemas hechos para procesos especificos.",
  },
  {
    question: "Puedo comprar una plataforma por separado?",
    answer:
      "Si. Soluciones como SprintPilot y ComerCia pueden presentarse como productos independientes, ademas de formar parte de una estrategia integral.",
  },
  {
    question: "RENPIA desarrolla sistemas personalizados?",
    answer:
      "Si. Cuando el negocio necesita una operacion unica, RENPIA disena y construye software a la medida con enfoque estrategico y operativo.",
  },
  {
    question: "Que demos estan disponibles?",
    answer:
      "Actualmente la landing destaca las demos de SprintPilot y ComerCia como puntos de entrada para conocer el ecosistema RENPIA.",
  },
  {
    question: "Como ayuda la IA a mi empresa?",
    answer:
      "La IA ayuda a acelerar tareas, mejorar seguimiento, enriquecer decisiones, automatizar atencion y reducir tiempos de ciclo con mayor consistencia.",
  },
] as const;
