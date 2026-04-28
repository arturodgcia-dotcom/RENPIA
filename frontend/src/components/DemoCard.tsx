import { siteAssets } from "../config/siteAssets";
import type { Demo } from "../data/siteContent";
import { useI18n } from "../i18n/I18nProvider";
import { Button } from "./Button";
import { ProductPreview } from "./ProductPreview";

type DemoCardProps = {
  demo: Demo;
};

export function DemoCard({ demo }: DemoCardProps) {
  const { locale, content } = useI18n();

  const fallbackMap: Record<Demo["slug"], "kanban" | "ecommerce"> = {
    sprintpilot: "kanban",
    comercia: "ecommerce",
  };

  return (
    <article className="demo-card">
      <div className="demo-card__preview">
        <ProductPreview
          image={siteAssets.demos[demo.slug]}
          fallbackType={fallbackMap[demo.slug]}
          title={demo.title[locale]}
          mode="compact"
          alt={`${demo.title[locale]} demo`}
        />
      </div>
      <span className="demo-card__badge">{demo.badge[locale]}</span>
      <h3>{demo.title[locale]}</h3>
      <p>{demo.description[locale]}</p>
      <Button href={demo.path}>{content.demos.button}</Button>
    </article>
  );
}
