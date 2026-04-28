import { useEffect, useMemo, useState } from "react";
import { siteAssets } from "./config/siteAssets";
import { getDemoBySlug, getSolutionBySlug, type DemoSlug, type SolutionSlug } from "./data/siteContent";
import { Header } from "./sections/Header";
import { Footer } from "./sections/Footer";
import { LandingPage } from "./pages/LandingPage";
import { SolutionPage } from "./pages/SolutionPage";
import { DemoPage } from "./pages/DemoPage";
import { BlogPage } from "./pages/BlogPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { AdminPage } from "./pages/AdminPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { I18nProvider, useI18n } from "./i18n/I18nProvider";
import { usePageMetadata } from "./hooks/usePageMetadata";

type Route =
  | { kind: "landing"; path: string }
  | { kind: "solution"; path: string; slug: SolutionSlug }
  | { kind: "demo"; path: string; slug: DemoSlug }
  | { kind: "blog"; path: string }
  | { kind: "blog-post"; path: string; slug: string }
  | { kind: "admin"; path: string; section: "leads" | "appointments" | "newsletter" }
  | { kind: "not-found"; path: string };

function resolveRoute(pathname: string): Route {
  if (pathname === "/" || pathname === "") return { kind: "landing", path: "/" };

  if (pathname === "/blog") return { kind: "blog", path: pathname };

  if (pathname.startsWith("/blog/")) {
    return { kind: "blog-post", path: pathname, slug: pathname.replace("/blog/", "") };
  }

  if (pathname.startsWith("/solutions/")) {
    const slug = pathname.replace("/solutions/", "") as SolutionSlug;
    if (getSolutionBySlug(slug)) return { kind: "solution", path: pathname, slug };
  }

  if (pathname.startsWith("/demo/")) {
    const slug = pathname.replace("/demo/", "") as DemoSlug;
    if (getDemoBySlug(slug)) return { kind: "demo", path: pathname, slug };
  }

  if (pathname === "/admin" || pathname === "/admin/leads") {
    return { kind: "admin", path: pathname, section: "leads" };
  }

  if (pathname === "/admin/appointments") {
    return { kind: "admin", path: pathname, section: "appointments" };
  }

  if (pathname === "/admin/newsletter") {
    return { kind: "admin", path: pathname, section: "newsletter" };
  }

  return { kind: "not-found", path: pathname };
}

function AppContent() {
  const { locale, content } = useI18n();
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const handleNavigation = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", handleNavigation);

    return () => {
      window.removeEventListener("popstate", handleNavigation);
    };
  }, []);

  const route = useMemo(() => resolveRoute(pathname), [pathname]);

  const metadata = useMemo(() => {
    const baseJsonLd = [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "REINPIA",
        url: import.meta.env.VITE_APP_URL || "https://reinpia.com",
        logo: `${import.meta.env.VITE_APP_URL || "https://reinpia.com"}${siteAssets.brand.logo}`,
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "REINPIA",
        url: import.meta.env.VITE_APP_URL || "https://reinpia.com",
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "AI consulting and process reengineering",
        provider: {
          "@type": "Organization",
          name: "REINPIA",
        },
      },
    ];

    if (route.kind === "landing") {
      return {
        title: content.meta.title,
        description: content.meta.description,
        canonicalPath: route.path,
        image: siteAssets.hero.consultoria,
        jsonLd: baseJsonLd,
      };
    }

    if (route.kind === "solution") {
      const solution = getSolutionBySlug(route.slug);
      return {
        title: `${solution?.name ?? "REINPIA"} | REINPIA`,
        description: solution?.description[locale] ?? content.meta.description,
        canonicalPath: route.path,
        image: siteAssets.solutions[route.slug],
        jsonLd: baseJsonLd,
      };
    }

    if (route.kind === "demo") {
      const demo = getDemoBySlug(route.slug);
      return {
        title: `${demo?.title[locale] ?? "Demo"} | REINPIA`,
        description: demo?.description[locale] ?? content.meta.description,
        canonicalPath: route.path,
        image: siteAssets.demos[route.slug],
        jsonLd: baseJsonLd,
      };
    }

    if (route.kind === "blog") {
      return {
        title: `${content.pages.blog.title} | REINPIA`,
        description: content.pages.blog.description,
        canonicalPath: route.path,
        image: siteAssets.hero.consultoria,
        jsonLd: baseJsonLd,
      };
    }

    if (route.kind === "blog-post") {
      return {
        title: `Blog REINPIA | ${route.slug}`,
        description: content.pages.blog.description,
        canonicalPath: route.path,
        image: siteAssets.hero.consultoria,
        type: "article" as const,
        jsonLd: baseJsonLd,
      };
    }

    if (route.kind === "admin") {
      return {
        title: `${content.pages.admin.title} | ${route.section}`,
        description:
          locale === "es"
            ? "Panel base de seguimiento local para leads, citas y newsletter."
            : "Base local tracking panel for leads, appointments and newsletter.",
        canonicalPath: route.path,
        image: siteAssets.brand.logo,
      };
    }

    return {
      title: `REINPIA | ${content.pages.notFound.title}`,
      description: content.pages.notFound.description,
      canonicalPath: route.path,
      image: siteAssets.brand.logo,
    };
  }, [content, locale, route]);

  usePageMetadata(metadata);

  const isAdmin = route.kind === "admin";

  return (
    <div className="app-shell">
      <div className="ambient ambient--one" />
      <div className="ambient ambient--two" />
      {!isAdmin ? <Header /> : null}

      {route.kind === "landing" ? <LandingPage /> : null}
      {route.kind === "solution" ? <SolutionPage slug={route.slug} /> : null}
      {route.kind === "demo" ? <DemoPage slug={route.slug} /> : null}
      {route.kind === "blog" ? <BlogPage /> : null}
      {route.kind === "blog-post" ? <BlogPostPage slug={route.slug} /> : null}
      {route.kind === "admin" ? <AdminPage section={route.section} /> : null}
      {route.kind === "not-found" ? <NotFoundPage /> : null}

      {!isAdmin ? <Footer /> : null}
    </div>
  );
}

function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
}

export default App;
