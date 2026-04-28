import type { LocalizedText } from "../i18n/types";

export type BlogPost = {
  slug: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  category: LocalizedText;
  publishedAt: string;
  readTime: LocalizedText;
  cover:
    | "hero-consultoria"
    | "sprintpilot"
    | "comercia"
    | "nervia"
    | "jornadalaboral360"
    | "custom-development";
  paragraphs: LocalizedText[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "como-la-ia-esta-redefiniendo-la-productividad-empresarial",
    title: {
      es: "Como la IA esta redefiniendo la productividad empresarial",
      en: "How AI is redefining business productivity",
    },
    excerpt: {
      es: "De asistentes operativos a agentes especializados: la productividad ahora se mide por capacidad de respuesta, seguimiento y aprendizaje.",
      en: "From operational assistants to specialized agents: productivity is now measured through responsiveness, follow-up and continuous learning.",
    },
    category: {
      es: "Productividad",
      en: "Productivity",
    },
    publishedAt: "2026-04-28",
    readTime: {
      es: "4 min de lectura",
      en: "4 min read",
    },
    cover: "hero-consultoria",
    paragraphs: [
      {
        es: "La productividad empresarial ya no depende solo de trabajar mas rapido. Depende de eliminar fricciones, automatizar seguimiento y elevar la calidad de las decisiones del equipo.",
        en: "Business productivity no longer depends only on working faster. It depends on removing friction, automating follow-up and improving decision quality across the team.",
      },
      {
        es: "Cuando una empresa combina reingenieria de procesos con inteligencia artificial, obtiene visibilidad operativa, capacidad de respuesta y una base mas solida para crecer.",
        en: "When a company combines process reengineering with artificial intelligence, it gains operational visibility, responsiveness and a stronger foundation for growth.",
      },
    ],
  },
  {
    slug: "ventajas-competitivas-de-automatizar-procesos-con-ia",
    title: {
      es: "Ventajas competitivas de automatizar procesos con IA",
      en: "Competitive advantages of automating processes with AI",
    },
    excerpt: {
      es: "Automatizar no es solo reducir tiempos: tambien mejora consistencia, trazabilidad y experiencia para clientes y equipos.",
      en: "Automation is not just about saving time: it also improves consistency, traceability and experiences for clients and teams.",
    },
    category: {
      es: "Automatizacion",
      en: "Automation",
    },
    publishedAt: "2026-04-27",
    readTime: {
      es: "5 min de lectura",
      en: "5 min read",
    },
    cover: "custom-development",
    paragraphs: [
      {
        es: "Las organizaciones que automatizan seguimiento, reportes y atencion liberan tiempo para tareas de mayor valor y elevan la calidad de su operacion.",
        en: "Organizations that automate follow-up, reporting and customer service free up time for higher-value tasks and strengthen operational quality.",
      },
      {
        es: "La ventaja competitiva aparece cuando la automatizacion se conecta con datos, responsables y resultados del negocio.",
        en: "Competitive advantage appears when automation is connected to business data, ownership and outcomes.",
      },
    ],
  },
  {
    slug: "tendencias-de-agentes-inteligentes-para-empresas",
    title: {
      es: "Tendencias de agentes inteligentes para empresas",
      en: "Trends in intelligent agents for business",
    },
    excerpt: {
      es: "Los agentes conectados a procesos, datos y equipos ya estan cambiando ventas, servicio y operaciones.",
      en: "Agents connected to workflows, data and teams are already changing sales, service and operations.",
    },
    category: {
      es: "Agentes IA",
      en: "AI agents",
    },
    publishedAt: "2026-04-26",
    readTime: {
      es: "4 min de lectura",
      en: "4 min read",
    },
    cover: "nervia",
    paragraphs: [
      {
        es: "La nueva generacion de agentes no solo responde preguntas: coordina tareas, interpreta contexto y acelera decisiones operativas.",
        en: "The new generation of agents does more than answer questions: it coordinates tasks, interprets context and accelerates operational decisions.",
      },
      {
        es: "Su valor real aparece cuando forman parte de una arquitectura funcional bien disenada para el negocio.",
        en: "Their real value appears when they become part of a well-designed business architecture.",
      },
    ],
  },
  {
    slug: "ia-aplicada-a-operacion-marketing-y-ventas",
    title: {
      es: "IA aplicada a operacion, marketing y ventas",
      en: "AI applied to operations, marketing and sales",
    },
    excerpt: {
      es: "La mayor rentabilidad aparece cuando marketing, ventas y operacion comparten una misma capa de inteligencia.",
      en: "The strongest ROI appears when marketing, sales and operations share the same intelligence layer.",
    },
    category: {
      es: "Transformacion digital",
      en: "Digital transformation",
    },
    publishedAt: "2026-04-25",
    readTime: {
      es: "6 min de lectura",
      en: "6 min read",
    },
    cover: "comercia",
    paragraphs: [
      {
        es: "Las empresas mas competitivas ya no separan por completo la inteligencia comercial y la operativa. Conectan sus datos para actuar mas rapido.",
        en: "The most competitive businesses no longer separate commercial and operational intelligence. They connect data so they can act faster.",
      },
      {
        es: "Eso permite priorizar oportunidades, mejorar servicio y reducir tiempos muertos en toda la cadena de valor.",
        en: "That makes it possible to prioritize opportunities, improve service and reduce idle time across the value chain.",
      },
    ],
  },
  {
    slug: "como-empezar-una-estrategia-de-automatizacion-empresarial",
    title: {
      es: "Como empezar una estrategia de automatizacion empresarial",
      en: "How to start an enterprise automation strategy",
    },
    excerpt: {
      es: "El primer paso no es comprar herramientas. Es entender procesos, puntos de friccion y prioridades reales del negocio.",
      en: "The first step is not buying tools. It is understanding processes, friction points and real business priorities.",
    },
    category: {
      es: "Estrategia",
      en: "Strategy",
    },
    publishedAt: "2026-04-24",
    readTime: {
      es: "5 min de lectura",
      en: "5 min read",
    },
    cover: "hero-consultoria",
    paragraphs: [
      {
        es: "Antes de automatizar, conviene disenar la arquitectura funcional: responsables, datos, decisiones y salidas esperadas.",
        en: "Before automating, it helps to design the functional architecture: owners, data, decisions and expected outcomes.",
      },
      {
        es: "Ese enfoque evita automatizar desorden y crea una base mas util para escalar con IA.",
        en: "That approach prevents automating chaos and creates a stronger base for scaling with AI.",
      },
    ],
  },
  {
    slug: "ia-y-atencion-al-cliente-mas-velocidad-mejor-experiencia",
    title: {
      es: "IA y atencion al cliente: mas velocidad, mejor experiencia",
      en: "AI and customer service: faster responses, better experiences",
    },
    excerpt: {
      es: "La combinacion de automatizacion, agentes y seguimiento permite atender mejor sin perder cercania ni control.",
      en: "The combination of automation, agents and follow-up improves customer care without losing proximity or control.",
    },
    category: {
      es: "Servicio",
      en: "Service",
    },
    publishedAt: "2026-04-23",
    readTime: {
      es: "4 min de lectura",
      en: "4 min read",
    },
    cover: "custom-development",
    paragraphs: [
      {
        es: "Cuando una empresa documenta procesos de atencion y los conecta con IA, puede responder mas rapido y con mejor contexto.",
        en: "When a company documents service workflows and connects them with AI, it can respond faster and with better context.",
      },
      {
        es: "El objetivo no es reemplazar personas, sino elevar la capacidad del equipo y cuidar la experiencia del cliente.",
        en: "The goal is not to replace people, but to expand team capacity and protect the client experience.",
      },
    ],
  },
  {
    slug: "reingenieria-de-procesos-donde-empezar",
    title: {
      es: "Reingenieria de procesos: donde empezar",
      en: "Process reengineering: where to start",
    },
    excerpt: {
      es: "Una buena transformacion empieza por mapear decisiones, tiempos muertos, cuellos de botella y puntos de contacto.",
      en: "A strong transformation starts by mapping decisions, dead time, bottlenecks and customer touchpoints.",
    },
    category: {
      es: "Reingenieria",
      en: "Reengineering",
    },
    publishedAt: "2026-04-22",
    readTime: {
      es: "5 min de lectura",
      en: "5 min read",
    },
    cover: "sprintpilot",
    paragraphs: [
      {
        es: "Reingenieria no significa redibujar organigramas. Significa redisenar la forma en que el trabajo fluye y genera resultados.",
        en: "Reengineering is not about redrawing org charts. It is about redesigning how work flows and produces outcomes.",
      },
      {
        es: "Con tecnologia adecuada, esa mejora se vuelve medible y sostenible.",
        en: "With the right technology, that improvement becomes measurable and sustainable.",
      },
    ],
  },
  {
    slug: "integracion-de-ia-en-negocios-pequenos-y-medianos",
    title: {
      es: "Integracion de IA en negocios pequenos y medianos",
      en: "Integrating AI into small and medium-sized businesses",
    },
    excerpt: {
      es: "La IA tambien puede generar ventaja en empresas medianas cuando se implementa con foco comercial y operativo.",
      en: "AI can also create an advantage in medium-sized businesses when implemented with commercial and operational focus.",
    },
    category: {
      es: "Pymes",
      en: "SMBs",
    },
    publishedAt: "2026-04-21",
    readTime: {
      es: "4 min de lectura",
      en: "4 min read",
    },
    cover: "jornadalaboral360",
    paragraphs: [
      {
        es: "No hace falta una gran estructura para empezar. Lo importante es seleccionar procesos con impacto claro en tiempo, seguimiento o ventas.",
        en: "You do not need a massive structure to get started. The key is selecting workflows with clear impact on time, follow-up or sales.",
      },
      {
        es: "Una hoja de ruta bien priorizada permite capturar resultados tempranos y construir confianza para la siguiente fase.",
        en: "A well-prioritized roadmap helps capture early wins and build confidence for the next phase.",
      },
    ],
  },
];
