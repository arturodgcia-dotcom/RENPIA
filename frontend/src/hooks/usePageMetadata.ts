import { useEffect } from "react";

type MetadataConfig = {
  title: string;
  description: string;
  canonicalPath: string;
  image?: string;
  siteName?: string;
  type?: "website" | "article";
  jsonLd?: object[];
};

function ensureMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector(selector) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
}

export function usePageMetadata(config: MetadataConfig) {
  useEffect(() => {
    const appUrl = import.meta.env.VITE_APP_URL || "https://reinpia.com";
    const canonicalUrl = `${appUrl.replace(/\/$/, "")}${config.canonicalPath}`;
    const image = config.image ?? `${appUrl.replace(/\/$/, "")}/renpia-assets/hero-consultoria.png`;

    document.title = config.title;

    ensureMeta('meta[name="description"]', {
      name: "description",
      content: config.description,
    });
    ensureMeta('meta[property="og:title"]', {
      property: "og:title",
      content: config.title,
    });
    ensureMeta('meta[property="og:description"]', {
      property: "og:description",
      content: config.description,
    });
    ensureMeta('meta[property="og:type"]', {
      property: "og:type",
      content: config.type ?? "website",
    });
    ensureMeta('meta[property="og:url"]', {
      property: "og:url",
      content: canonicalUrl,
    });
    ensureMeta('meta[property="og:image"]', {
      property: "og:image",
      content: image,
    });
    ensureMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    ensureMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: config.title,
    });
    ensureMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: config.description,
    });
    ensureMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: image,
    });

    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    const existing = document.head.querySelector("#reinpia-jsonld");
    if (existing) existing.remove();

    if (config.jsonLd?.length) {
      const script = document.createElement("script");
      script.id = "reinpia-jsonld";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(config.jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      const script = document.head.querySelector("#reinpia-jsonld");
      if (script) script.remove();
    };
  }, [config]);
}
