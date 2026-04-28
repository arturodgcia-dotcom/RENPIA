import type { DemoItem } from "../data/siteContent";
import { Button } from "./Button";
import { ProductPreview } from "./ProductPreview";

type DemoCardProps = {
  demo: DemoItem;
};

export function DemoCard({ demo }: DemoCardProps) {
  return (
    <article className="demo-card">
      <div className="demo-card__preview">
        <ProductPreview variant={demo.preview} mode="compact" />
      </div>
      <span className="demo-card__badge">{demo.badge}</span>
      <h3>{demo.title}</h3>
      <p>{demo.description}</p>
      <Button href="#agenda">Entrar al demo</Button>
    </article>
  );
}
