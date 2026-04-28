import type { DemoItem } from "../data/siteContent";
import { Button } from "./Button";
import { ProductPreview } from "./ProductPreview";

type DemoCardProps = {
  demo: DemoItem;
};

export function DemoCard({ demo }: DemoCardProps) {
  const imageMap: Record<DemoItem["preview"], string> = {
    sprintpilot: "/renpia-assets/demo-sprintpilot.png",
    comercia: "/renpia-assets/demo-comercia.png",
  };

  const fallbackMap: Record<DemoItem["preview"], "kanban" | "ecommerce"> = {
    sprintpilot: "kanban",
    comercia: "ecommerce",
  };

  return (
    <article className="demo-card">
      <div className="demo-card__preview">
        <ProductPreview
          image={imageMap[demo.preview]}
          fallbackType={fallbackMap[demo.preview]}
          title={demo.title}
          mode="compact"
        />
      </div>
      <span className="demo-card__badge">{demo.badge}</span>
      <h3>{demo.title}</h3>
      <p>{demo.description}</p>
      <Button href="#agenda">Entrar al demo</Button>
    </article>
  );
}
