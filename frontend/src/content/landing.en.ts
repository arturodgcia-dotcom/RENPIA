import type { LandingContent } from "./landing.es";

export const landingEn = {
  meta: {
    title: "REINPIA | Process Reengineering with Artificial Intelligence",
    description:
      "REINPIA drives process reengineering with artificial intelligence, automation, AI agents, SaaS platforms and custom software for modern companies.",
    siteName: "REINPIA",
    ogTitle: "REINPIA | Consulting, automation and intelligent software",
    ogDescription:
      "Strategic consulting, automation, AI agents, proprietary platforms and custom software to improve operations, sales and growth.",
  },
  nav: {
    menu: [
      { label: "Home", href: "/#inicio" },
      { label: "Solutions", href: "/#soluciones" },
      { label: "Demos", href: "/#demos" },
      { label: "AI News", href: "/#noticias" },
      { label: "Custom development", href: "/#desarrollo-medida" },
      { label: "Contact", href: "/#contacto" },
    ],
    primaryCta: "Request assessment",
    secondaryCta: "Schedule a call",
    localeLabel: "Language",
  },
  hero: {
    eyebrow: "Process reengineering powered by applied intelligence",
    title: "Process Reengineering with Artificial Intelligence to",
    highlight: "boost your business",
    description:
      "At REINPIA we transform operations, sales, service and growth through strategic consulting, automation, AI agents and custom development.",
    bullets: [
      "Consulting + development + automation",
      "Solutions ready to implement",
      "Custom development built to scale",
    ],
    primaryCta: "Explore solutions",
    secondaryCta: "I need a proposal",
    floatingLeftLabel: "Architecture",
    floatingLeftValue: "Assessment + roadmap",
    floatingRightLabel: "Operations",
    floatingRightValue: "Automation in motion",
    stats: [
      { value: "58", label: "optimized processes" },
      { value: "24", label: "active automations" },
      { value: "12", label: "active AI agents" },
    ],
  },
  services: {
    eyebrow: "What we do at REINPIA",
    title: "We connect technology, business and automation to help companies operate better.",
    description:
      "REINPIA has evolved into a more integrated solutions company, connecting technology, business logic and automation so companies can operate better, sell more and make better decisions.",
    items: [
      {
        title: "Strategic consulting",
        text: "We translate business goals into an actionable roadmap with clear priorities, expected impact and better-informed decisions.",
      },
      {
        title: "Process reengineering",
        text: "We redesign operations to remove friction, reduce cycle times and improve traceability across teams and outcomes.",
      },
      {
        title: "AI automation",
        text: "We orchestrate agents, workflows and automations to free operational time and expand team capacity.",
      },
      {
        title: "Custom systems development",
        text: "We build software aligned with your processes, your industry and the business outcomes that truly matter.",
      },
    ],
    architectTitle: "Solutions architect",
    architectDescription:
      "We design the ideal functional, operational and technical structure for every project before we build.",
  },
  solutions: {
    eyebrow: "Featured solutions",
    title: "Proprietary platforms and ready-to-deploy solutions to accelerate business transformation.",
    description:
      "Every REINPIA product is rooted in real operating logic, growth needs and commercial follow-up, with a premium presentation ready to scale.",
    primaryCta: "View landing",
    secondaryCta: "Request proposal",
  },
  customDevelopment: {
    eyebrow: "Custom development",
    title:
      "If your company needs something unique, REINPIA designs and builds tailored solutions.",
    description:
      "We think from the process, the team experience and the business need. That is how we build software that is more useful, connected and sustainable.",
    capabilities: [
      "CRM and commercial management",
      "Portals and extranets",
      "Marketplace and ecommerce",
      "Dashboards and analytics",
      "Custom AI agents",
      "Department automation",
      "Google Suite integrations",
      "Enterprise system integrations",
    ],
    cta: "Request a custom solution",
  },
  demos: {
    eyebrow: "Available demos",
    title: "Explore key capabilities before implementation.",
    description:
      "SprintPilot and ComerCia demos show a real product experience, executive dashboards and commercial flows ready for presentation.",
    note: "Demo access lets you explore core functionality before moving into implementation.",
    button: "Enter demo",
  },
  news: {
    eyebrow: "AI News & REINPIA Blog",
    title: "News, trends and real-world advantages of AI today",
    description:
      "Our REINPIA editorial agent publishes content around automation, productivity, sales, customer service, innovation and digital transformation.",
    editorialBadge: "REINPIA Editorial Agent",
    editorialTitle: "Commercial and informative content ready for SEO and AEO",
    editorialPoints: [
      "Daily publishing structure prepared for future growth",
      "Up to 30 active stories and automatic archiving",
      "Suggested editorial cleanup every 7 months",
      "Built-in CTA to talk with REINPIA on every post",
    ],
    footnote:
      "Daily publishing ready | up to 30 active stories | automatic archive | suggested cleanup every 7 months",
    primaryCta: "View blog",
    secondaryCta: "Talk with REINPIA",
  },
  newsletter: {
    eyebrow: "Newsletter",
    title: "Receive ideas, news and opportunities with AI",
    description:
      "Subscribe to receive trends, use cases and automation opportunities tailored to your business.",
    placeholder: "Your business email",
    consent:
      "I agree to receive content from REINPIA and understand I can unsubscribe at any time.",
    button: "Subscribe",
    success: "Your subscription was saved. The next phase can send a confirmation email automatically.",
    errorEmpty: "Enter your business email to continue.",
    errorInvalid: "We need a valid email address to save your subscription.",
    errorConsent: "We need your consent to save this subscription.",
    chips: ["Useful content", "No spam", "Business focus"],
  },
  leadForm: {
    eyebrow: "Smart lead form",
    title: "Initial assessment for real opportunities",
    description:
      "Capture strategic information to understand need, urgency, viability and the type of solution your company requires.",
    button: "I want my assessment",
    success:
      "Request saved locally. The next phase can send it to the backend and notify Telegram or email automatically.",
    throttled: "You recently submitted a request. Please wait a moment before trying again.",
    invalidBusinessEmail: "We need a business email to continue.",
    invalidVerification: "The security validation was not approved.",
    invalidConsent: "We need your contact authorization to continue.",
    fields: {
      fullName: "Full name",
      company: "Company",
      position: "Role",
      email: "Business email",
      whatsapp: "WhatsApp",
      companyType: "Company type",
      companySize: "Company size",
      mainNeed: "Main need",
      budget: "Estimated budget",
      implementationTime: "Desired implementation timeframe",
      challenge: "Briefly describe your need",
      verification: "Verification question: 3 + 4 =",
      consent: "I authorize REINPIA to contact me by email, phone or WhatsApp for follow-up.",
    },
    options: {
      companyTypes: [
        "SMB",
        "Corporate",
        "Startup",
        "Industry / manufacturing",
        "Commerce / retail",
        "Services",
      ],
      companySizes: ["1 to 10", "11 to 50", "51 to 200", "201 to 500", "500+"],
      budgets: [
        "Up to MXN 50k",
        "MXN 50k to 150k",
        "MXN 150k to 500k",
        "MXN 500k to 1M",
        "More than MXN 1M",
      ],
      timelines: ["Immediate", "1 to 3 months", "3 to 6 months", "Later"],
    },
    securityEyebrow: "Security filter for real prospects",
    securityTitle: "Pre-validation",
    securityChecks: {
      businessEmail: "Business email required",
      antiBot: "Anti-bot validation",
      verification: "Verification answer",
      consent: "Contact authorization",
    },
    classes: {
      curious: "Curious visitor",
      initial: "Initial prospect",
      potential: "Qualified prospect",
      expansion: "Expansion opportunity",
    },
  },
  appointment: {
    eyebrow: "Schedule",
    title: "Schedule a call with REINPIA",
    description:
      "If your company is ready to improve processes, automate tasks, deploy AI agents or build a custom solution, schedule a call with our team.",
    intro:
      "Our intelligent assistant will review your request, classify your need and help you find the best available slot with Arturo or Isa.",
    reasonLabel: "Reason",
    responsibleLabel: "With",
    dateLabel: "Date",
    slotLabel: "Available slot",
    note:
      "If the meeting requires a video call, the REINPIA team will send the access link later by email or WhatsApp.",
    button: "Schedule a call with REINPIA",
    success:
      "The appointment was saved locally and is ready for future Telegram, email and calendar integrations.",
    error: "Choose a reason, owner, date and time slot to continue.",
    availabilityTitle: "Guided availability",
  },
  faq: {
    eyebrow: "FAQ SEO / AEO",
    title: "Frequently asked questions built for clarity, trust and discoverability.",
    description:
      "The landing answers key questions with direct business language, ready to support FAQ schema and generative answers.",
  },
  finalCta: {
    eyebrow: "Next step",
    title: "Turn processes into growth with REINPIA",
    description:
      "Consulting, automation and intelligent software for companies ready to evolve with clearer execution and better returns.",
    primary: "Schedule a call",
    secondary: "Request proposal",
    tertiary: "View solutions",
  },
  footer: {
    description:
      "Consulting, automation and intelligent software for companies that want to evolve through better-designed processes.",
    legal: {
      privacy: "Privacy",
      terms: "Terms",
      legal: "Legal notice",
    },
    bottom: "REINPIA | Process Reengineering with Artificial Intelligence",
  },
  pages: {
    blog: {
      title: "Blog and AI trends",
      description:
        "Content around automation, AI agents, productivity, sales, service and digital transformation.",
    },
    solution: {
      ctaPrimary: "Request proposal",
      ctaSecondary: "Back to landing",
      modulesTitle: "Core modules",
      benefitsTitle: "Business benefits",
      routeLabel: "Featured solution",
    },
    demo: {
      badge: "Demo access",
      titleSuffix: "ready for commercial exploration",
      description:
        "This demo acts as a clean placeholder while a real authenticated or shared environment is connected.",
      ctaPrimary: "Request guided demo",
      ctaSecondary: "Back to solutions",
    },
    admin: {
      title: "REINPIA base panel",
      leads: "Leads",
      appointments: "Appointments",
      newsletter: "Newsletter",
      empty: "There are no stored records in this category yet.",
    },
    notFound: {
      title: "We could not find that page",
      description:
        "The requested route does not exist yet or has been moved. You can go back to the main landing and continue from there.",
      button: "Back to home",
    },
  },
} satisfies LandingContent;
