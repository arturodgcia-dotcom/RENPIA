export const siteAssets = {
  brand: {
    logo: "/renpia-assets/reinpia-logo.jpeg",
  },
  hero: {
    consultoria: "/renpia-assets/hero-consultoria.png",
  },
  solutions: {
    sprintpilot: "/renpia-assets/sprintpilot-preview.png",
    comercia: "/renpia-assets/comercia-preview.png",
    nervia: "/renpia-assets/nervia-preview.png",
    jornadalaboral360: "/renpia-assets/jornada360-preview.png",
    customDevelopment: "/renpia-assets/desarrollo-medida.png",
  },
  demos: {
    sprintpilot: "/renpia-assets/demo-sprintpilot.png",
    comercia: "/renpia-assets/demo-comercia.png",
  },
} as const;

export type SolutionAssetKey = keyof typeof siteAssets.solutions;
export type DemoAssetKey = keyof typeof siteAssets.demos;
